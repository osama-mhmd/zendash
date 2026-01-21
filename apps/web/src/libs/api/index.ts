interface Options {
  method?: RequestInit["method"];
  body?: Record<string, any>;
}

export default async function api(url: string, options: Options = {}) {
  const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/${url}`, {
    method: options.method ?? "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: options.body ? JSON.stringify(options.body) : undefined,
  });

  const json = await res.json();

  return json;
}
