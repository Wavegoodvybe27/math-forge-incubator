
import React from 'react';
import { Button } from '@/components/ui/button';

interface CalculatorActionsProps {
  handleCalculate: () => void;
  clearCalculator: () => void;
}

export const CalculatorActions: React.FC<CalculatorActionsProps> = ({ 
  handleCalculate, 
  clearCalculator 
}) => {
  return (
    <div className="grid grid-cols-2 gap-2">
      <Button onClick={handleCalculate} className="bg-primary">Calculate</Button>
      <Button onClick={clearCalculator} variant="destructive">Clear</Button>
    </div>
  );
};
