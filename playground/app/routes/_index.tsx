import { usePWAManager } from "@remix-pwa/client";
import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { Route, Database, RotateCw, Wifi, LayoutDashboard, Smartphone, Download, Bell, Share2, Moon, Sun } from "lucide-react";
import { useLocalStorage } from "usehooks-ts";
import { Button } from "~/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "~/components/ui/hover-card";

export const loader: LoaderFunction = () => {
  return json({ message: "Hello from the server!" });
}

export const meta = () => {
  return [
    { title: "📦 Remix PWA Sandbox" },
    { name: "description", content: "Progressive web apps proof of concept" },
  ];
};

const links = [
  {
    title: "Route Worker Modules",
    description: "Learn how to integrate our tools with your app",
    href: "/worker-modules",
    icon: Route,
    gradient: "from-pink-500 via-purple-500 to-pink-500",
    details: "Our comprehensive documentation covers everything from quick starts to advanced topics. Find tutorials, API references, and best practices all in one place."
  },
  {
    title: "Caching",
    description: "A complete API reference for our libraries",
    href: "#",
    icon: Database,
    gradient: "from-orange-400 via-pink-600 to-orange-400",
    details: "Dive deep into our API documentation. Explore endpoints, request/response formats, authentication methods, and example code snippets for seamless integration."
  },
  {
    title: "Background Sync",
    description: "Installation guides that cover popular setups",
    href: "#",
    icon: RotateCw,
    gradient: "from-green-400 via-cyan-500 to-green-400",
    details: "Step-by-step guides for various setups and use cases. Whether you're a beginner or an expert, find tailored instructions for your specific needs."
  },
  {
    title: "Offline",
    description: "Read our latest news and articles",
    href: "#",
    icon: Wifi,
    gradient: "from-blue-400 via-indigo-500 to-blue-400",
    details: "Stay up-to-date with our latest features, industry insights, and success stories. Our blog is a hub for learning, inspiration, and community engagement."
  },
  {
    title: "Layout Routes",
    description: "Read our latest news and articles",
    href: "#",
    icon: LayoutDashboard,
    gradient: "from-purple-500 via-violet-600 to-indigo-500",
    details: "Stay up-to-date with our latest features, industry insights, and success stories. Our blog is a hub for learning, inspiration, and community engagement."
  },
  {
    title: "Device Features",
    description: "Read our latest news and articles",
    href: "#",
    icon: Smartphone,
    gradient: "from-lime-500 via-amber-500 to-lime-500",
    details: "Stay up-to-date with our latest features, industry insights, and success stories. Our blog is a hub for learning, inspiration, and community engagement."
  },
  {
    title: "Installability",
    description: "Read our latest news and articles",
    href: "#",
    icon: Download,
    gradient: "from-sky-400 via-indigo-600 to-sky-400",
    details: "Stay up-to-date with our latest features, industry insights, and success stories. Our blog is a hub for learning, inspiration, and community engagement."
  },
  {
    title: "Push Notifications",
    description: "Read our latest news and articles",
    href: "#",
    icon: Bell,
    gradient: "from-amber-400 via-orange-500 to-red-500",
    details: "Stay up-to-date with our latest features, industry insights, and success stories. Our blog is a hub for learning, inspiration, and community engagement."
  },
  {
    title: "Web Share",
    description: "Read our latest news and articles",
    href: "#",
    icon: Share2,
    gradient: "from-cyan-400 via-sky-500 to-blue-500",
    details: "Stay up-to-date with our latest features, industry insights, and success stories. Our blog is a hub for learning, inspiration, and community engagement."
  },
]

export default function Index() {
  const { promptInstall } = usePWAManager();
  const [theme, setTheme] = useLocalStorage("theme", "light");

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  }

  return (
    <div className="mx-auto max-w-7xl">
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

      <div className="container mx-auto px-4">
        <main className="flex-1">
          <section className="py-20 text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl mb-4 text-foreground">
              📦 Remix PWA Sandbox
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              A free-for-all sandbox playground for testing out Remix PWA features in Remix SSR apps.
            </p>
          </section>

          <section className="py-12">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {links.map((link, index) => (
                <HoverCard key={index} closeDelay={200}>
                  <HoverCardTrigger asChild>
                    <Link to={link.href} className="block group">
                      <Card className="transition-all duration-300 hover:shadow-lg relative overflow-hidden h-full">
                        <div className={`absolute inset-0 bg-gradient-to-r ${link.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                        <div className="absolute inset-[3px] bg-card rounded-lg" />
                        <CardHeader className="p-6 relative">
                          <div className="flex items-center space-x-4">
                            <div className={`p-3 rounded-full bg-gradient-to-br ${link.gradient} text-white relative`}>
                              <link.icon size={24} />
                            </div>
                            <div>
                              <CardTitle className="text-2xl mb-2">{link.title}</CardTitle>
                              <CardDescription className="text-base">{link.description}</CardDescription>
                            </div>
                          </div>
                        </CardHeader>
                      </Card>
                    </Link>
                  </HoverCardTrigger>
                  <HoverCardContent className="w-96 md:w-[350.4px] lg:w-[478.4px] xl:w-[393px] z-50" sideOffset={8}>
                    <div className="space-y-2">
                      <h4 className="text-sm font-semibold">{link.title}</h4>
                      <p className="text-sm">{link.description}</p>
                      <p className="text-sm text-muted-foreground">{link.details}</p>
                      <div className="pt-2">
                        <Button variant="outline" size="sm">
                          Learn More
                        </Button>
                      </div>
                    </div>
                  </HoverCardContent>
                </HoverCard>
              ))}
            </div>
          </section>
        </main>
      </div>
      <style>{`
        @keyframes gradient-animation {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        .group:hover .bg-gradient-to-r {
          animation: gradient-animation 3s ease infinite;
          background-size: 200% 200%;
        }
      `}</style>
    </div>
  );
}
