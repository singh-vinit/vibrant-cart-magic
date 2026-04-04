import React from "react";
import { Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import FilterSidebar, { type Filters } from "./FilterSidebar";

interface FilterSheetProps {
  filters: Filters;
  onChange: (filters: Filters) => void;
}

const FilterSheet: React.FC<FilterSheetProps> = ({ filters, onChange }) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm" className="md:hidden">
          <Filter className="h-4 w-4 mr-1" /> Filters
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Filters</SheetTitle>
        </SheetHeader>
        <div className="mt-4">
          <FilterSidebar filters={filters} onChange={onChange} />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default FilterSheet;
