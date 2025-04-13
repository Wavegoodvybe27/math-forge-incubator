
import { PageHeader } from "@/components/PageHeader";
import { Calculator } from "@/components/Calculator";

export default function CalculatorPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Calculator"
        description="Perform mathematical calculations and evaluations"
      />
      
      <Calculator />
    </div>
  );
}
