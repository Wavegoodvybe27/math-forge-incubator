
import { PageHeader } from "@/components/PageHeader";
import { Calculator } from "@/components/Calculator";

export default function CalculatorPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Advanced Scientific Calculator"
        description="Perform complex mathematical calculations and function evaluations"
      />
      
      <Calculator />
    </div>
  );
}
