import { Link, useParams } from "react-router";
import { Layout } from "~/components/ui/layout";
import { useCoffees, useRecipesByMethod } from "~/lib/hooks";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "~/components/ui/accordion";

export function meta({ params }: { params: { id: string } }) {
  return [
    { title: `Brewing Method | Terminal Brew Guide` },
    { name: "description", content: "Coffee brewing method and recipes" },
  ];
}

export default function MethodDetail() {
  const { id } = useParams();
  const recipes = useRecipesByMethod(id || "");
  const allCoffees = useCoffees();
  
  if (recipes.length === 0) {
    return (
      <Layout>
        <div className="max-w-4xl mx-auto text-center py-12">
          <h1 className="text-3xl font-bold text-primary mb-4">Method Not Found</h1>
          <p className="text-muted-foreground mb-6">
            We couldn't find any recipes for this brewing method.
          </p>
          <Link 
            to="/methods"
            className="px-6 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 font-semibold"
          >
            Browse Methods
          </Link>
        </div>
      </Layout>
    );
  }
  
  // Get the method name based on the first recipe
  const methodName = id
    ?.split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
  
  // Get method type from ID
  const methodType = id?.includes('express') || id?.includes('marzocco') 
    ? 'espresso' 
    : id === 'french-press' 
      ? 'immersion' 
      : id === 'aeropress' 
        ? 'hybrid' 
        : 'filter';
  
  // Method-specific general advice
  const methodAdvice: Record<string, string> = {
    'chemex': 'Use a medium-coarse grind and always pre-wet the filter to remove paper taste. The thick filter creates a clean, bright cup.',
    'v60': 'Use a medium-fine grind and a steady pour with a gooseneck kettle for even extraction.',
    'aeropress': 'Versatile brewer that can use various grind sizes. Standard or inverted methods both work well.',
    'french-press': 'Use a coarse grind to prevent sediment and allow at least 4 minutes of brewing time.',
    'barista-express': 'Warm up machine for at least 20 minutes before use. Use freshly roasted beans for best results.',
    'la-marzocco': 'Professional-grade espresso machine that requires precise dial-in. Excellent temperature stability.'
  };
  
  // Get the coffees that have recipes for this method
  const coffeesWithRecipes = recipes.map(recipe => {
    const coffee = allCoffees.find(coffee => coffee.id === recipe.coffeeId);
    return {
      coffee,
      recipe
    };
  });
  
  return (
    <Layout>
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center gap-2 mb-6 text-muted-foreground">
          <Link to="/methods" className="hover:text-primary">
            Methods
          </Link>
          <span>/</span>
          <span className="text-foreground">{methodName}</span>
        </div>
        
        <header className="mb-10">
          <h1 className="text-3xl font-bold text-primary mb-2">{methodName}</h1>
          <div className="flex items-center gap-2 mb-4">
            <span 
              className="text-xs px-2 py-1 rounded-full bg-secondary text-secondary-foreground"
            >
              {methodType}
            </span>
          </div>
          <p className="text-muted-foreground">
            {methodAdvice[id || ''] || 'Brewing method for coffee enthusiasts.'}
          </p>
        </header>
        
        <div className="space-y-8 mb-10">
          <div>
            <div className="border border-muted rounded-sm overflow-hidden bg-card mb-8">
              <div className="bg-card border-b border-muted p-4">
                <h2 className="text-lg font-mono font-semibold text-primary flex items-center gap-2">
                  <span className="text-accent">cat</span> {methodName}/README.md
                </h2>
              </div>
              <div className="p-5">
                {methodAdvice[id || ''] && (
                  <div className="border border-muted rounded-sm p-3 font-mono bg-background/40 mb-6">
                    <p className="text-foreground">{methodAdvice[id || '']}</p>
                  </div>
                )}
                
                <h3 className="text-md font-medium text-accent mb-4 font-mono">// General Parameters</h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 font-mono">
                  <div className="border border-muted/50 p-3 rounded-sm bg-background/40">
                    <h4 className="text-xs text-primary font-medium mb-1">Grind Size</h4>
                    <p>
                      {methodType === 'espresso' ? 'Fine' : 
                       methodType === 'filter' ? 'Medium' : 
                       methodType === 'immersion' ? 'Coarse' : 'Medium-Fine'}
                    </p>
                  </div>
                  
                  <div className="border border-muted/50 p-3 rounded-sm bg-background/40">
                    <h4 className="text-xs text-primary font-medium mb-1">Water Temperature</h4>
                    <p>
                      {methodType === 'espresso' ? '90-94°C' : '90-96°C'}
                    </p>
                  </div>
                  
                  <div className="border border-muted/50 p-3 rounded-sm bg-background/40">
                    <h4 className="text-xs text-primary font-medium mb-1">Brew Time</h4>
                    <p>
                      {methodType === 'espresso' ? '25-35 seconds' : 
                       methodType === 'filter' ? '2:30-4:00' : 
                       methodType === 'immersion' ? '4:00-5:00' : '1:30-2:00'}
                    </p>
                  </div>
                  
                  <div className="border border-muted/50 p-3 rounded-sm bg-background/40">
                    <h4 className="text-xs text-primary font-medium mb-1">Coffee-to-Water Ratio</h4>
                    <p>
                      {methodType === 'espresso' ? '1:2 - 1:2.5' : '1:15 - 1:17'}
                    </p>
                  </div>
                </div>
                
                <div className="border border-muted rounded-sm p-4 font-mono bg-background/40">
                  <h3 className="text-md font-medium text-accent mb-3">/**
                   * Pro Tips for {methodName}
                   */</h3>
                  <ul className="pl-5 space-y-3 text-sm list-none">
                    {methodType === 'espresso' && (
                      <>
                        <li><span className="text-primary">1.</span> Always warm up your machine and portafilter thoroughly.</li>
                        <li><span className="text-primary">2.</span> Use a distribution tool for even extraction.</li>
                        <li><span className="text-primary">3.</span> Purge the group head before attaching the portafilter.</li>
                        <li><span className="text-primary">4.</span> Clean your machine regularly to prevent flavor contamination.</li>
                      </>
                    )}
                    
                    {methodType === 'filter' && (
                      <>
                        <li><span className="text-primary">1.</span> Always use a gooseneck kettle for precise pouring.</li>
                        <li><span className="text-primary">2.</span> Pre-wet the filter to remove paper taste.</li>
                        <li><span className="text-primary">3.</span> Start with a bloom phase (30-45 seconds) to degas the coffee.</li>
                        <li><span className="text-primary">4.</span> Pour in concentric circles to ensure even extraction.</li>
                      </>
                    )}
                    
                    {methodType === 'immersion' && (
                      <>
                        <li><span className="text-primary">1.</span> Preheat your brewing vessel with hot water.</li>
                        <li><span className="text-primary">2.</span> Stir gently after adding coffee to ensure all grounds are saturated.</li>
                        <li><span className="text-primary">3.</span> Use a timer to achieve consistent results.</li>
                        <li><span className="text-primary">4.</span> Press the plunger slowly to minimize sediment.</li>
                      </>
                    )}
                    
                    {methodType === 'hybrid' && (
                      <>
                        <li><span className="text-primary">1.</span> Experiment with both standard and inverted methods.</li>
                        <li><span className="text-primary">2.</span> Try different water temperatures for different flavor profiles.</li>
                        <li><span className="text-primary">3.</span> Press with steady, gentle pressure.</li>
                        <li><span className="text-primary">4.</span> Clean the rubber seal regularly for better extraction.</li>
                      </>
                    )}
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-primary mb-4">Compatible Coffees</h2>
            </div>
            
            <Accordion type="single" collapsible className="space-y-4">
              {coffeesWithRecipes.map(({ coffee, recipe }) => {
                if (!coffee) return null;
                
                return (
                  <AccordionItem 
                    key={recipe.id} 
                    value={coffee.id}
                  >
                    <AccordionTrigger className="font-mono">
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-semibold">
                          {coffee.name}
                        </h3>
                        <div className="flex items-center gap-1 ml-3">
                          <span className="px-2 py-0.5 bg-accent/20 text-accent text-xs font-mono rounded-sm">{recipe.parameters.grindSize}</span>
                          <span className="px-2 py-0.5 bg-primary/20 text-primary text-xs font-mono rounded-sm">{recipe.parameters.dose}</span>
                          <span className="px-2 py-0.5 bg-secondary/20 text-secondary-foreground text-xs font-mono rounded-sm">{coffee.type}</span>
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="grid sm:grid-cols-2 gap-6">
                        <div>
                          <div className="mb-4 font-mono">
                            <p className="text-muted-foreground mb-2">
                              {coffee.origin}{coffee.region ? `, ${coffee.region}` : ''}
                            </p>
                            <p>{coffee.description}</p>
                          </div>
                          
                          <div className="mb-2">
                            <h4 className="text-sm text-primary font-medium mb-1">Flavor Notes</h4>
                            <div className="flex flex-wrap gap-1">
                              {coffee.flavorNotes.map((note, index) => (
                                <span 
                                  key={index}
                                  className="text-xs px-2 py-1 rounded-sm bg-accent text-accent-foreground font-mono"
                                >
                                  {note}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                        
                        <div className="border border-muted rounded-sm p-3 bg-background/40 font-mono">
                          <h4 className="text-sm text-primary font-medium mb-2">$ brew {methodName.toLowerCase()} {coffee.name.toLowerCase()}</h4>
                          <ol className="pl-6 space-y-2 list-decimal text-sm">
                            {recipe.parameters.steps.map((step, index) => (
                              <li key={index}>{step}</li>
                            ))}
                          </ol>
                          
                          <div className="mt-4 p-2 border-t border-muted pt-3">
                            <span className="text-accent font-semibold">// Tasting Notes:</span> {recipe.notes}
                          </div>
                          
                          <div className="mt-4 flex justify-end">
                            <Link
                              to={`/coffee/${coffee.id}`}
                              className="px-3 py-1 text-xs rounded-sm bg-primary text-primary-foreground hover:bg-primary/90"
                            >
                              View Coffee
                            </Link>
                          </div>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                );
              })}
            </Accordion>
          </div>
        </div>
      </div>
    </Layout>
  );
}