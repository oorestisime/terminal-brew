// Data hooks for fetching coffees and recipes
import coffeesData from '../data/coffees.json';
import recipesData from '../data/recipes.json';

export interface Coffee {
  id: string;
  name: string;
  category: string;
  type: string;
  size: string;
  form: string;
  price: string;
  origin: string;
  region?: string;
  description: string;
  flavorNotes: string[];
  collaboration?: string;
  flavorProfile?: string;
  varietals?: string[];
  specialFeatures?: string[];
  regionFeatures?: string;
  processing?: string;
}

export interface Recipe {
  id: string;
  coffeeId: string;
  methodId: string;
  parameters: {
    grindSize: string;
    dose: string;
    water?: string;
    waterTemp?: string;
    brewTime: string;
    yield?: string;
    temp?: string;
    preinfusion?: string;
    pressure?: string;
    steps: string[];
  };
  notes: string;
}

// Method types are: espresso, filter, immersion, hybrid
export interface Method {
  id: string;
  name: string;
  type: string;
}

// Simple method of getting typed data
export const useCoffees = (): Coffee[] => {
  return coffeesData as Coffee[];
};

export const useCoffee = (id: string): Coffee | undefined => {
  return (coffeesData as Coffee[]).find(coffee => coffee.id === id);
};

export const useRecipes = (): Recipe[] => {
  return recipesData as Recipe[];
};

export const useRecipesByCoffee = (coffeeId: string): Recipe[] => {
  return (recipesData as Recipe[]).filter(recipe => recipe.coffeeId === coffeeId);
};

export const useRecipesByMethod = (methodId: string): Recipe[] => {
  return (recipesData as Recipe[]).filter(recipe => recipe.methodId === methodId);
};

export const useRecipe = (id: string): Recipe | undefined => {
  return (recipesData as Recipe[]).find(recipe => recipe.id === id);
};

export const useMethods = (): Method[] => {
  // Extract unique methods from recipes
  const methodIds = [...new Set((recipesData as Recipe[]).map(recipe => recipe.methodId))];
  
  return methodIds.map(id => {
    const methodNames: Record<string, { name: string, type: string }> = {
      'chemex': { name: 'Chemex', type: 'filter' },
      'v60': { name: 'V60', type: 'filter' },
      'aeropress': { name: 'AeroPress', type: 'hybrid' },
      'french-press': { name: 'French Press', type: 'immersion' },
      'barista-express': { name: 'Barista Express', type: 'espresso' },
      'la-marzocco': { name: 'La Marzocco', type: 'espresso' }
    };
    
    return {
      id,
      name: methodNames[id]?.name || id,
      type: methodNames[id]?.type || 'unknown'
    };
  });
};