import { Link } from "react-router";
import { Layout } from "~/components/ui/layout";
import { useCoffees } from "~/lib/hooks";

export function meta() {
  return [
    { title: "Coffees | Terminal Brew Guide" },
    { name: "description", content: "Browse coffees from Terminal.shop" },
  ];
}

export default function Coffees() {
  const coffees = useCoffees();
  
  return (
    <Layout>
      <div className="max-w-6xl mx-auto">
        <header className="mb-10">
          <h1 className="text-3xl font-bold text-primary mb-2">Coffees</h1>
          <p className="text-muted-foreground">
            Browse coffees from Terminal.shop and find brewing recipes for your preferred method.
          </p>
        </header>
        
        <div className="overflow-hidden border border-muted rounded-md">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-card text-left">
                <th className="p-4 font-mono text-primary">Name</th>
                <th className="p-4 font-mono text-primary hidden md:table-cell">Type</th>
                <th className="p-4 font-mono text-primary hidden md:table-cell">Origin</th>
                <th className="p-4 font-mono text-primary">Flavor Notes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-muted">
              {coffees.map((coffee) => (
                <tr 
                  key={coffee.id} 
                  className="group hover:bg-muted/30 transition-colors"
                >
                  <td className="p-4 font-mono">
                    <Link 
                      to={`/coffee/${coffee.id}`}
                      className="font-semibold hover:text-primary group-hover:underline"
                    >
                      {coffee.name}
                    </Link>
                  </td>
                  <td className="p-4 font-mono hidden md:table-cell">
                    <span className="px-2 py-0.5 rounded-sm bg-secondary text-secondary-foreground text-xs">
                      {coffee.type}
                    </span>
                  </td>
                  <td className="p-4 font-mono hidden md:table-cell">{coffee.origin}</td>
                  <td className="p-4 font-mono">
                    <div className="flex flex-wrap gap-1">
                      {coffee.flavorNotes.map((note, index) => (
                        <span 
                          key={index}
                          className="text-xs px-2 py-0.5 rounded-sm bg-accent text-accent-foreground"
                        >
                          {note}
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