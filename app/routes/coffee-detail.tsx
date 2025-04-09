import { Link, useParams } from "react-router";
import { Layout } from "~/components/ui/layout";
import { useCoffee, useRecipesByCoffee } from "~/lib/hooks";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";

export function meta({ params }: { params: { id: string } }) {
  return [
    { title: `Coffee | Terminal Brew Guide` },
    { name: "description", content: "Coffee brewing recipes" },
  ];
}

export default function CoffeeDetail() {
  const { id } = useParams();
  const coffee = useCoffee(id || "");
  const recipes = useRecipesByCoffee(id || "");
  
  if (!coffee) {
    return (
      <Layout>
        <div className="max-w-4xl mx-auto text-center py-12">
          <h1 className="text-3xl font-bold text-primary mb-4">Coffee Not Found</h1>
          <p className="text-muted-foreground mb-6">
            We couldn't find the coffee you're looking for.
          </p>
          <Link 
            to="/coffees"
            className="px-6 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 font-semibold"
          >
            Browse Coffees
          </Link>
        </div>
      </Layout>
    );
  }
  
  // Group recipes by method type
  const methodTypes = recipes.reduce((types, recipe) => {
    const methodId = recipe.methodId;
    const methodType = methodId.includes('express') || methodId.includes('marzocco') 
      ? 'espresso' 
      : methodId === 'french-press' 
        ? 'immersion' 
        : methodId === 'aeropress' 
          ? 'hybrid' 
          : 'filter';
    
    if (!types[methodType]) {
      types[methodType] = [];
    }
    types[methodType].push(recipe);
    return types;
  }, {} as Record<string, typeof recipes>);
  
  return (
    <Layout>
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center gap-2 mb-6 text-muted-foreground">
          <Link to="/coffees" className="hover:text-primary">
            Coffees
          </Link>
          <span>/</span>
          <span className="text-foreground">{coffee.name}</span>
        </div>
        
        <div className="flex flex-col gap-10">
          <div className="bg-card border border-muted rounded-md p-6">
            <h1 className="text-3xl font-bold text-primary mb-4">{coffee.name}</h1>
            <p className="text-muted-foreground mb-6 font-mono">{coffee.description}</p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
              <div className="border border-muted p-3 rounded-sm bg-background/50">
                <h3 className="text-xs uppercase tracking-wider font-medium text-primary mb-1">Price</h3>
                <p className="font-mono text-foreground">{coffee.price}</p>
              </div>
              
              <div className="border border-muted p-3 rounded-sm bg-background/50">
                <h3 className="text-xs uppercase tracking-wider font-medium text-primary mb-1">Type</h3>
                <p className="font-mono text-foreground">{coffee.type}, {coffee.size} {coffee.form}</p>
              </div>
              
              <div className="border border-muted p-3 rounded-sm bg-background/50">
                <h3 className="text-xs uppercase tracking-wider font-medium text-primary mb-1">Origin</h3>
                <p className="font-mono text-foreground">{coffee.origin}</p>
              </div>
              
              {coffee.region && (
                <div className="border border-muted p-3 rounded-sm bg-background/50">
                  <h3 className="text-xs uppercase tracking-wider font-medium text-primary mb-1">Region</h3>
                  <p className="font-mono text-foreground">{coffee.region}</p>
                </div>
              )}
            </div>
            
            <div className="border border-muted p-4 rounded-sm bg-background/50 mt-4 mb-4">
              <h3 className="text-xs uppercase tracking-wider font-medium text-primary mb-2">Flavor Profile</h3>
              <div className="flex flex-wrap gap-1 mt-1">
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
            
            {coffee.collaboration && (
              <div className="border border-muted p-3 rounded-sm bg-background/50">
                <h3 className="text-xs uppercase tracking-wider font-medium text-primary mb-1">Collaboration</h3>
                <p className="font-mono text-foreground">{coffee.collaboration}</p>
              </div>
            )}
          </div>
          
          <div>
            <h2 className="text-2xl font-bold text-primary mb-4">Brewing Recipes</h2>
            
            <div className="space-y-8">
              
              {Object.entries(methodTypes).map(([type, typeRecipes]) => (
                <div key={type} className="mb-8">
                  <h3 className="text-xl font-semibold text-primary mb-4 capitalize">
                    {type} Brewing
                  </h3>
                  
                  <Accordion type="single" collapsible className="space-y-4">
                    {typeRecipes.map(recipe => {
                      const methodName = recipe.methodId
                        .split('-')
                        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                        .join(' ');
                      
                      return (
                        <AccordionItem 
                          key={recipe.id} 
                          value={recipe.id}
                        >
                          <AccordionTrigger>
                            <div className="flex items-center gap-2">
                              <h4 className="text-lg font-semibold font-mono">
                                {methodName}
                              </h4>
                              <div className="flex items-center gap-1 ml-3">
                                <span className="px-2 py-0.5 bg-accent/20 text-accent text-xs font-mono rounded-sm">{recipe.parameters.grindSize}</span>
                                <span className="px-2 py-0.5 bg-primary/20 text-primary text-xs font-mono rounded-sm">{recipe.parameters.dose}</span>
                              </div>
                            </div>
                          </AccordionTrigger>
                          
                          <AccordionContent>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6 font-mono">
                              <div className="border border-muted/50 p-2 rounded-sm bg-background/50">
                                <h5 className="text-xs text-primary font-medium mb-1">Grind Size</h5>
                                <p>{recipe.parameters.grindSize}</p>
                              </div>
                              <div className="border border-muted/50 p-2 rounded-sm bg-background/50">
                                <h5 className="text-xs text-primary font-medium mb-1">Dose</h5>
                                <p>{recipe.parameters.dose}</p>
                              </div>
                              {recipe.parameters.water && (
                                <div className="border border-muted/50 p-2 rounded-sm bg-background/50">
                                  <h5 className="text-xs text-primary font-medium mb-1">Water</h5>
                                  <p>{recipe.parameters.water}</p>
                                </div>
                              )}
                              {recipe.parameters.yield && (
                                <div className="border border-muted/50 p-2 rounded-sm bg-background/50">
                                  <h5 className="text-xs text-primary font-medium mb-1">Yield</h5>
                                  <p>{recipe.parameters.yield}</p>
                                </div>
                              )}
                              {recipe.parameters.waterTemp && (
                                <div className="border border-muted/50 p-2 rounded-sm bg-background/50">
                                  <h5 className="text-xs text-primary font-medium mb-1">Water Temp</h5>
                                  <p>{recipe.parameters.waterTemp}</p>
                                </div>
                              )}
                              {recipe.parameters.temp && (
                                <div className="border border-muted/50 p-2 rounded-sm bg-background/50">
                                  <h5 className="text-xs text-primary font-medium mb-1">Temperature</h5>
                                  <p>{recipe.parameters.temp}</p>
                                </div>
                              )}
                              <div className="border border-muted/50 p-2 rounded-sm bg-background/50">
                                <h5 className="text-xs text-primary font-medium mb-1">Brew Time</h5>
                                <p>{recipe.parameters.brewTime}</p>
                              </div>
                              {recipe.parameters.preinfusion && (
                                <div className="border border-muted/50 p-2 rounded-sm bg-background/50">
                                  <h5 className="text-xs text-primary font-medium mb-1">Pre-infusion</h5>
                                  <p>{recipe.parameters.preinfusion}</p>
                                </div>
                              )}
                              {recipe.parameters.pressure && (
                                <div className="border border-muted/50 p-2 rounded-sm bg-background/50">
                                  <h5 className="text-xs text-primary font-medium mb-1">Pressure</h5>
                                  <p>{recipe.parameters.pressure}</p>
                                </div>
                              )}
                            </div>
                            
                            <div className="mb-4 border border-muted rounded-sm p-3 bg-background/50">
                              <h5 className="text-sm font-medium text-primary mb-2">$ brew {methodName.toLowerCase()} {coffee.name.toLowerCase()}</h5>
                              <ol className="pl-6 space-y-2 list-decimal font-mono text-sm">
                                {recipe.parameters.steps.map((step, index) => (
                                  <li key={index}>{step}</li>
                                ))}
                              </ol>
                            </div>
                            
                            <div className="mt-3 p-3 border border-muted rounded-sm bg-muted/20 text-sm font-mono">
                              <span className="text-accent font-semibold">// Tasting Notes:</span> {recipe.notes}
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      );
                    })}
                  </Accordion>
                </div>
              ))}
              
              {recipes.length === 0 && (
                <div className="p-6 border border-muted rounded-lg text-center">
                  <p className="text-muted-foreground mb-4">
                    No brewing recipes available for this coffee yet.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}