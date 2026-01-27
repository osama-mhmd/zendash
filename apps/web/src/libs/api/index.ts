interface Options {
  method?: RequestInit["method"];
  body?: Record<string, any>;
}

interface AuthenticatedResult {
  authenticated: boolean;
  user: any; // fix: Add User Type
}

interface API {
  (url: string, options?: Options): Promise<any>;
  authenticated: () => Promise<AuthenticatedResult>;
}

const _api = async (url: string, options: Options = {}) => {
  const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/${url}`, {
    method: options.method ?? "POST",
    credentials: "include",
    headers: {
      ...(options.body && { "Content-Type": "application/json" }),
    },
    ...(options.method !== "GET" &&
      options.body && {
        body: JSON.stringify(options.body),
      }),
  });

  const json = await res.json();

  return json;
};

const api = _api as API;

api.authenticated = async () => {
  const result = await _api("auth/me");
  console.log(result);

  return { authenticated: result.ok, user: result.user };
};

export default api;
