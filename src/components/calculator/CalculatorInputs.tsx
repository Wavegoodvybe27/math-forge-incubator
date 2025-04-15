
import React from 'react';
import { Input } from '@/components/ui/input';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { operations } from '@/utils/calculationUtils';

interface CalculatorInputsProps {
  num1: string;
  setNum1: (value: string) => void;
  num2: string;
  setNum2: (value: string) => void;
  operation: string;
  setOperation: (value: string) => void;
  result: number | string;
  needsSecondNumber: boolean;
}

export const CalculatorInputs: React.FC<CalculatorInputsProps> = ({
  num1,
  setNum1,
  num2,
  setNum2,
  operation,
  setOperation,
  result,
  needsSecondNumber
}) => {
  return (
    <div className="grid grid-cols-1 gap-4">
      <div className="space-y-2">
        <label htmlFor="num1" className="text-sm font-medium">First Number</label>
        <Input
          id="num1"
          type="text"
          value={num1}
          onChange={(e) => setNum1(e.target.value)}
          className="text-right"
        />
      </div>
      
      <div className="space-y-2">
        <label htmlFor="operation" className="text-sm font-medium">Operation</label>
        <Select value={operation} onValueChange={setOperation}>
          <SelectTrigger>
            <SelectValue placeholder="Select operation" />
          </SelectTrigger>
          <SelectContent>
            {operations.map((op) => (
              <SelectItem key={op.value} value={op.value}>
                {op.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      {needsSecondNumber && (
        <div className="space-y-2">
          <label htmlFor="num2" className="text-sm font-medium">Second Number</label>
          <Input
            id="num2"
            type="text"
            value={num2}
            onChange={(e) => setNum2(e.target.value)}
            className="text-right"
          />
        </div>
      )}
      
      <div className="space-y-2">
        <label className="text-sm font-medium">Result</label>
        <div className="bg-muted p-2 rounded text-right h-10 flex items-center justify-end">
          {result}
        </div>
      </div>
    </div>
  );
};
