type ApiResult = Promise<[null, Error] | [any, null]>;

interface Options {
  method?: RequestInit["method"];
  body?: Record<string, any>;
}

export default async function api(
  url: string,
  options: Options = {},
): ApiResult {
  const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/${url}`, {
    method: options.method ?? "POST",
    credentials: "include",
    body: JSON.stringify(options.body ?? {}),
  });

  if (!res.ok) {
    console.log(res);
    return [null, new Error("Something went wrong")];
  }

  const json = await res.json();

  return [json, null];
}
