import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "remix";
import type { MetaFunction, LinksFunction } from "remix";
import tailwindStyles from "~/styles/tailwind.css";
import appStyles from "~/styles/app.css";
import Header from "~/components/Header";

export const meta: MetaFunction = () => {
  return { title: "New Remix App" };
};

export let links: LinksFunction = () => {
  return [
    { rel: "stylesheet", href: tailwindStyles },
    {
      rel: "stylesheet",
      href: appStyles,
    },
  ];
};

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Header />
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV === "development" && <LiveReload />}
      </body>
    </html>
  );
}
