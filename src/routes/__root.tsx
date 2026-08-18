import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";

import appCss from "../styles.css?url";
import { Toaster } from "../components/ui/sonner";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">
          Page not found
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back
          home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()(
  {
    head: () => ({
      meta: [
        { title: "Sandesh Rimal | Flutter Developer in Nepal" },
        {
          name: "description",
          content:
            "Sandesh Rimal is a Flutter developer in Nepal specializing in mobile app development, backend systems, UI/UX, and scalable digital products.",
        },
        {
          name: "keywords",
          content:
            "Sandesh Rimal, Flutter developer in Nepal, mobile app developer Nepal, Dart developer, full-stack developer Nepal, Flutter app developer",
        },
        { name: "robots", content: "index,follow" },
        { name: "author", content: "Sandesh Rimal" },
        { property: "og:type", content: "website" },
        {
          property: "og:title",
          content: "Sandesh Rimal | Flutter Developer in Nepal",
        },
        {
          property: "og:description",
          content:
            "Flutter developer in Nepal building high-performing mobile apps, modern digital experiences, and scalable backend solutions.",
        },
        { property: "og:url", content: "https://sandeshrimal.com.np/" },
        {
          property: "og:image",
          content: "https://sandeshrimal.com.np/og-image.svg",
        },
        { property: "twitter:card", content: "summary_large_image" },
        {
          property: "twitter:title",
          content: "Sandesh Rimal | Flutter Developer in Nepal",
        },
        {
          property: "twitter:description",
          content:
            "Flutter developer in Nepal designing and building amazing mobile experiences.",
        },
        {
          property: "twitter:image",
          content: "https://sandeshrimal.com.np/og-image.svg",
        },
      ],
      links: [
        { rel: "canonical", href: "https://sandeshrimal.com.np/" },
        { rel: "icon", type: "image/png", href: "/favicon.png" },
        { rel: "stylesheet", href: appCss },
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        {
          rel: "preconnect",
          href: "https://fonts.gstatic.com",
          crossOrigin: "anonymous",
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap",
        },
      ],
    }),
    shellComponent: RootShell,
    component: RootComponent,
    notFoundComponent: NotFoundComponent,
    errorComponent: ErrorComponent,
  },
);

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
      <Toaster />
    </QueryClientProvider>
  );
}
