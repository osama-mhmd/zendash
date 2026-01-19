import type { NewSession as Session } from "@/db/schemas/sessions";
import Sessions from "@app/repositories/sessions.repository";

interface SessionWithToken extends Session {
  token: string;
}

const sessionExpiresInSeconds = 60 * 60 * 24;

function generateSecureRandomString(): string {
  const alphabet = "abcdefghijkmnpqrstuvwxyz23456789";
  const bytes = new Uint8Array(24);
  crypto.getRandomValues(bytes);
  let id = "";
  for (let i = 0; i < bytes.length; i++) {
    id += alphabet[bytes[i] >> 3];
  }
  return id;
}

async function createSession(): Promise<SessionWithToken> {
  const id = generateSecureRandomString();
  const secret = generateSecureRandomString();
  const secretHash = (await hashSecret(secret)).toString();

  const token = id + "." + secret;

  const session: SessionWithToken = {
    id,
    secretHash,
    token,
  };

  Sessions.create(session);

  return session;
}

async function validateSessionToken(token: string): Promise<Session | null> {
  const tokenParts = token.split(".");
  if (tokenParts.length !== 2) {
    return null;
  }
  const sessionId = tokenParts[0];
  const sessionSecret = tokenParts[1];

  const session = await Sessions.getById(sessionId);
  if (!session) {
    return null;
  }

  const now = Date.now();

  if (now - session.createdAt.getTime() >= sessionExpiresInSeconds * 1000) {
    await Sessions.delete(sessionId);
    return null;
  }
  const secretHash = Uint8Array.from(session.secretHash);

  const tokenSecretHash = await hashSecret(sessionSecret);
  const validSecret = constantTimeEqual(tokenSecretHash, secretHash);
  if (!validSecret) {
    return null;
  }

  return session;
}

async function hashSecret(secret: string): Promise<Uint8Array> {
  const secretBytes = new TextEncoder().encode(secret);
  const secretHashBuffer = await crypto.subtle.digest("SHA-256", secretBytes);
  return new Uint8Array(secretHashBuffer);
}
function constantTimeEqual(a: Uint8Array, b: Uint8Array): boolean {
  if (a.byteLength !== b.byteLength) {
    return false;
  }
  let c = 0;
  for (let i = 0; i < a.byteLength; i++) {
    c |= a[i] ^ b[i];
  }
  return c === 0;
}

const Session = {
  validate: validateSessionToken,
  create: createSession,
};

export default Session;
