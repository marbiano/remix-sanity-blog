export default function getHeaders(): Headers {
  const headers = new Headers();
  headers.set("Cache-Control", "public, max-age=0, s-maxage=3600");
  return headers;
}
