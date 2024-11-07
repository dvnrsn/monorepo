import {
  installPWAGlobals,
} from "@remix-pwa/sw";
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import { usePWAManager } from "@remix-pwa/client";
import { ManifestLink } from "@remix-pwa/manifest";
// import { msg } from "virtual:sw"
// import { routes } from 'virtual:pwa-entry-module';

import './tailwind.css';
import { useLocalStorage } from "usehooks-ts";
import { cn } from "./lib/utils";
import { Button } from "./components/ui/button";
import { Moon, Sun } from "lucide-react";

// const usePWAHMR = () => {
//   const [currentHash, setCurrentHash] = useState<string | null>(null);

//   useEffect(() => {
//     if (import.meta && import.meta.hot) {
//       import.meta.hot.on('pwa:worker-reload', (data) => {
//         if (data.newHash !== currentHash) setCurrentHash(data.newHash);
//       })
//     }

//     return () => {
//       if (import.meta && import.meta.hot) {
//         import.meta.hot.off('pwa:worker-reload');
//       }
//     }
//   }, []);

//   useEffect(() => {
//     if (!currentHash) return;

//     console.log('New worker incomiong!')
//     // Force reload, kill, massacre and murder whatever process
//     // you want over here.
//   }, [currentHash]);
// }

export default function App() {
  installPWAGlobals()
  const { updateAvailable } = usePWAManager();
  const [theme, setTheme] = useLocalStorage("theme", "light");

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  }

  // logger.log("App rendered", msg);
  // useEffect(() => {
  //   console.log(updateAvailable);
  // }, [updateAvailable]);

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <ManifestLink href="/manifest.json" />
        <Links />
        <script type="module" dangerouslySetInnerHTML={{
          __html: `
          (() => {
           if (typeof window !== 'undefined') {
            if (!('theme' in localStorage)) {
              localStorage.setItem('theme', window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
            }

            document.documentElement.classList.toggle(
              'dark',
              localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
            )
           }
          })();
          `
        }}
        />
      </head>
      <body className={cn("min-h-screen bg-background transition-colors duration-300", theme)}>
        <header className="max-w-7xl mx-auto w-full sticky top-0 z-50 flex justify-between items-center shadow-foreground/10 text-foreground">
          <h2 className="text-2xl font-bold py-4">📦 Sandbox</h2>
          {/* Theme Toggle */}
          <div className="py-4 flex justify-end">
            <Button
              variant="outline"
              size="icon"
              onClick={toggleTheme}
              aria-label={theme === "dark" ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {theme === "dark" ? <Sun className="h-[1.2rem] w-[1.2rem]" /> : <Moon className="h-[1.2rem] w-[1.2rem]" />}
            </Button>
          </div>
        </header>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
