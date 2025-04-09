import { Layout } from "~/components/ui/layout";

export function meta() {
  return [
    { title: "About | Terminal Brew Guide" },
    { name: "description", content: "About the Terminal Brew Guide project" },
  ];
}

export default function About() {
  return (
    <Layout>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-primary mb-6">About Terminal Brew Guide</h1>
        
        <div className="space-y-6 prose text-foreground">
          <p>
            Terminal Brew Guide is an open-source collection of coffee brewing recipes specifically 
            for coffees sold on <a href="https://www.terminal.shop" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Terminal.shop</a>.
          </p>
          
          <h2 className="text-2xl font-bold text-foreground mt-8">Contributing</h2>
          <p>
            This project is open source and contributions are welcome! If you'd like to add:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>A new recipe for an existing coffee</li>
            <li>A new coffee type</li>
            <li>A new brewing method</li>
          </ul>
          
          <p className="mt-4">
            Please create a Pull Request on our <a href="https://github.com/username/terminal-recipes" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">GitHub repository</a>.
          </p>
          
          <h2 className="text-2xl font-bold text-foreground mt-8">Links</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <a href="https://www.terminal.shop" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                Terminal.shop
              </a>
            </li>
            <li>
              <a href="https://github.com/username/terminal-recipes" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                GitHub Repository
              </a>
            </li>
            <li>
              <a href="https://github.com/username/terminal-recipes/issues" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                Report an Issue
              </a>
            </li>
          </ul>
          
          <div className="p-6 border border-accent rounded-lg bg-card mt-10 text-center">
            <p className="font-mono text-primary">$ brew --enjoy</p>
          </div>
        </div>
      </div>
    </Layout>
  );
}