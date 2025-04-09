import { Link } from "react-router";
import { cn } from "~/lib/utils";

export function Layout({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className="min-h-screen bg-background font-mono">
      <header className="border-b border-muted py-3 px-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="text-xl font-bold text-primary">
            <span className="text-accent">brew@terminal</span>:
            <span className="text-foreground">~</span>
            <span className="text-primary">$</span>
          </Link>
          <nav className="space-x-6">
            <Link to="/coffees" className="text-foreground hover:text-primary">
              <span className="text-accent">cd</span> /coffees
            </Link>
            <Link to="/methods" className="text-foreground hover:text-primary">
              <span className="text-accent">cd</span> /methods
            </Link>
            <Link to="/about" className="text-foreground hover:text-primary">
              <span className="text-accent">cat</span> about.md
            </Link>
          </nav>
        </div>
      </header>
      <main className={cn("container mx-auto p-6", className)}>{children}</main>
      <footer className="border-t border-muted p-4">
        <div className="container mx-auto text-center text-sm text-muted-foreground">
          <p>
            <span className="text-accent">git clone</span>{" "}
            https://github.com/oorestisime/terminal-brew.git |{" "}
            <a
              href="https://www.terminal.shop"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              Terminal.shop
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
