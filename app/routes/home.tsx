import type { Route } from "./+types/home";
import { Layout } from "~/components/ui/layout";
import { Link } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Terminal Brew Guide | Coffee Recipes" },
    {
      name: "description",
      content: "Brewing recipes for Terminal.shop coffees",
    },
  ];
}

export default function Home() {
  return (
    <Layout className="flex flex-col items-center justify-center">
      <div className="max-w-3xl mx-auto space-y-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight text-primary font-mono">
            Terminal Brew Guide
          </h1>
          <p className="text-xl leading-relaxed text-muted-foreground mt-4 font-mono">
            Tailored recipes for brewing your favorite Terminal.shop coffees
          </p>
        </div>

        <div className="border border-muted rounded-md overflow-hidden bg-black/50">
          <div className="flex items-center px-4 py-2 bg-muted/10 border-b border-muted">
            <div className="flex space-x-2">
              <div className="w-3 h-3 rounded-full bg-destructive"></div>
              <div className="w-3 h-3 rounded-full bg-accent"></div>
              <div className="w-3 h-3 rounded-full bg-primary"></div>
            </div>
            <p className="ml-4 text-xs text-muted-foreground font-mono">
              terminal -- brew --help
            </p>
          </div>

          <div className="p-6 font-mono text-foreground">
            <p className="text-primary mb-1">$ brew --help</p>

            <div className="mb-4 mt-4">
              <p className="text-accent mb-1">USAGE:</p>
              <p className="pl-4">brew [METHOD] [COFFEE]</p>
            </div>

            <div className="mb-4">
              <p className="text-accent mb-1">EXAMPLES:</p>
              <p className="pl-4">brew chemex flow</p>
              <p className="pl-4">brew v60 "dark mode"</p>
              <p className="pl-4">brew aeropress --inverted segfault</p>
            </div>

            <div className="mb-4">
              <p className="text-accent mb-1">AVAILABLE METHODS:</p>
              <div className="pl-4 grid grid-cols-2">
                <p>chemex</p>
                <p>v60</p>
                <p>aeropress</p>
                <p>french-press</p>
                <p>barista-express</p>
                <p>la-marzocco</p>
              </div>
            </div>

            <div className="mb-4">
              <p className="text-accent mb-1">AVAILABLE COFFEES:</p>
              <div className="pl-4 grid grid-cols-2">
                <p>flow</p>
                <p>artisan</p>
                <p>object-object</p>
                <p>segfault</p>
                <p>dark-mode</p>
                <p>404</p>
              </div>
            </div>

            <p className="text-xs text-muted-foreground mt-6">
              Don't Brew from terminal!
              <br />
              Get started by exploring our coffees and methods below.
            </p>
            <p className="text-xs text-muted-foreground mt-6"></p>
            <p className="text-primary mt-1 animate-pulse">_</p>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/coffees"
            className="px-8 py-3 rounded-sm bg-primary text-primary-foreground hover:bg-primary/90 font-semibold flex-1 text-center font-mono"
          >
            $ cd /coffees
          </Link>
          <Link
            to="/methods"
            className="px-8 py-3 rounded-sm bg-secondary text-secondary-foreground hover:bg-secondary/90 font-semibold flex-1 text-center font-mono"
          >
            $ cd /methods
          </Link>
        </div>
      </div>
    </Layout>
  );
}
