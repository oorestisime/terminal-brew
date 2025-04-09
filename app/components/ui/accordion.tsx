import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDownIcon } from "lucide-react";

import { cn } from "~/lib/utils";

function Accordion({
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Root>) {
  return <AccordionPrimitive.Root data-slot="accordion" {...props} />;
}

function AccordionItem({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Item>) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn(
        "border border-muted rounded-sm overflow-hidden bg-card mb-2",
        className
      )}
      {...props}
    />
  );
}

function AccordionTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          "group focus-visible:border-ring focus-visible:ring-ring/50 flex flex-1 items-center justify-between gap-4 px-4 py-3 text-left font-medium transition-all outline-none hover:bg-muted/30 hover:no-underline focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 border-b border-muted",
          className
        )}
        {...props}
      >
        {children}
        <div className="text-primary text-xl pointer-events-none">
          <span className="block group-data-[state=closed]:block group-data-[state=open]:hidden">
            +
          </span>
          <span className="block group-data-[state=closed]:hidden group-data-[state=open]:block">
            −
          </span>
        </div>
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

function AccordionContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content
      data-slot="accordion-content"
      className="data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down data-[state=open]:block overflow-hidden text-sm"
      {...props}
    >
      <div className={cn("p-4 border-t border-muted", className)}>
        {children}
      </div>
    </AccordionPrimitive.Content>
  );
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
