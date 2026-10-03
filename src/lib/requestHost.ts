// Host checks shared by server components and route handlers.

type HeaderReader = { get(name: string): string | null };

/** The public host of a request (Netlify forwards it in x-forwarded-host). */
export function getRequestHost(headers: HeaderReader, fallback = "") {
  return (headers.get("x-forwarded-host") || headers.get("host") || fallback)
    .split(",")[0]
    .trim();
}

/** A Netlify deploy preview, e.g. deploy-preview-12--site.netlify.app. */
export function isDeployPreviewHost(host: string) {
  return /^deploy-preview-\d+--[^.]+\.netlify\.app$/.test(host);
}

/** Local development or a deploy preview, where example content is shown. */
export function isPreviewHost(host: string) {
  return /^localhost(:\d+)?$/.test(host) || isDeployPreviewHost(host);
}
