import { Link } from "react-router";
import { Layout } from "~/components/ui/layout";
import { useMethods } from "~/lib/hooks";

export function meta() {
  return [
    { title: "Brewing Methods | Terminal Brew Guide" },
    { name: "description", content: "Coffee brewing methods and techniques" },
  ];
}

export default function Methods() {
  const methods = useMethods();
  
  const methodCharacteristics: Record<string, string> = {
    'chemex': 'Clean, bright, medium-bodied',
    'v60': 'Clarity, nuanced, balanced',
    'aeropress': 'Versatile, rich, smooth',
    'french-press': 'Full-bodied, robust, textured',
    'barista-express': 'Concentrated, intense, layered',
    'la-marzocco': 'Professional, precise, flavorful'
  };
  
  return (
    <Layout>
      <div className="max-w-6xl mx-auto">
        <header className="mb-10">
          <h1 className="text-3xl font-bold text-primary mb-2">Brewing Methods</h1>
          <p className="text-muted-foreground">
            Different brewing methods highlight different characteristics of coffee. Browse recipes by method.
          </p>
        </header>
        
        <div className="overflow-hidden border border-muted rounded-md">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-card text-left">
                <th className="p-4 font-mono text-primary">Name</th>
                <th className="p-4 font-mono text-primary hidden md:table-cell">Type</th>
                <th className="p-4 font-mono text-primary">Characteristics</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-muted">
              {methods.map((method) => (
                <tr 
                  key={method.id} 
                  className="group hover:bg-muted/30 transition-colors"
                >
                  <td className="p-4 font-mono">
                    <Link 
                      to={`/method/${method.id}`}
                      className="font-semibold hover:text-primary group-hover:underline"
                    >
                      {method.name}
                    </Link>
                  </td>
                  <td className="p-4 font-mono hidden md:table-cell">
                    <span className="px-2 py-0.5 rounded-sm bg-secondary text-secondary-foreground text-xs">
                      {method.type}
                    </span>
                  </td>
                  <td className="p-4 font-mono">
                    <div className="flex flex-wrap gap-1">
                      {methodCharacteristics[method.id].split(', ').map((trait, index) => (
                        <span 
                          key={index}
                          className="text-xs px-2 py-0.5 rounded-sm bg-accent text-accent-foreground"
                        >
                          {trait}
                        </span>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
}