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
  
  // Group methods by type
  const methodsByType = methods.reduce((grouped, method) => {
    if (!grouped[method.type]) {
      grouped[method.type] = [];
    }
    grouped[method.type].push(method);
    return grouped;
  }, {} as Record<string, typeof methods>);
  
  const typeIcons: Record<string, string> = {
    espresso: "⚡️",
    filter: "🕸️",
    immersion: "🌊",
    hybrid: "🔄",
  };
  
  const typeDescriptions: Record<string, string> = {
    espresso: "High-pressure brewing that forces hot water through finely ground coffee to create a concentrated, rich coffee.",
    filter: "Water passes through coffee grounds and a filter, resulting in a clean cup with clarity of flavor.",
    immersion: "Coffee grounds steep in water for an extended period, creating a full-bodied brew.",
    hybrid: "Combines aspects of both immersion and pressure or filter methods for unique brewing characteristics.",
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
        
        {Object.entries(methodsByType).map(([type, typeMethods]) => (
          <section key={type} className="mb-12">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">{typeIcons[type] || "☕️"}</span>
              <h2 className="text-2xl font-bold text-foreground capitalize">{type} Brewing</h2>
            </div>
            
            <p className="text-muted-foreground mb-6">{typeDescriptions[type]}</p>
            
            <div className="overflow-hidden border border-muted rounded-md">
              <table className="w-full font-mono">
                <thead>
                  <tr className="bg-card">
                    <th className="p-4 text-left text-primary">Name</th>
                    <th className="p-4 text-left text-primary hidden md:table-cell">Type</th>
                    <th className="p-4 text-left text-primary">Characteristics</th>
                    <th className="p-4 text-left text-primary">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-muted">
                  {typeMethods.map((method) => (
                    <tr 
                      key={method.id}
                      className="group hover:bg-muted/30 transition-colors"
                    >
                      <td className="p-4 font-semibold">
                        {method.name}
                      </td>
                      <td className="p-4 hidden md:table-cell">
                        <span className="px-2 py-0.5 rounded-sm bg-secondary text-secondary-foreground text-xs">
                          {method.type}
                        </span>
                      </td>
                      <td className="p-4">
                        {method.id === 'chemex' && 'Clean, bright, medium-bodied'}
                        {method.id === 'v60' && 'Clarity, nuanced, balanced'}
                        {method.id === 'aeropress' && 'Versatile, rich, smooth'}
                        {method.id === 'french-press' && 'Full-bodied, robust, textured'}
                        {method.id === 'barista-express' && 'Concentrated, intense, layered'}
                        {method.id === 'la-marzocco' && 'Professional, precise, flavorful'}
                      </td>
                      <td className="p-4">
                        <Link 
                          to={`/method/${method.id}`}
                          className="px-3 py-1 bg-primary text-primary-foreground text-sm rounded-sm hover:bg-primary/90 font-semibold"
                        >
                          Explore
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        ))}
      </div>
    </Layout>
  );
}