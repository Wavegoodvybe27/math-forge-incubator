
import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { calculateResult, getOperationSymbol } from '@/utils/calculationUtils';
import { CalculatorInputs } from './calculator/CalculatorInputs';
import { MemoryOperations } from './calculator/MemoryOperations';
import { CalculatorActions } from './calculator/CalculatorActions';
import { CalculationHistory } from './calculator/CalculationHistory';

const Calculator: React.FC = () => {
  const [num1, setNum1] = useState<string>('0');
  const [num2, setNum2] = useState<string>('0');
  const [operation, setOperation] = useState('add');
  const [result, setResult] = useState<number | string>(0);
  const [memory, setMemory] = useState<number>(0);
  const [history, setHistory] = useState<Array<{operation: string, result: number | string}>>([]);

  const handleCalculate = () => {
    const n1 = parseFloat(num1);
    const n2 = parseFloat(num2);
    
    if (isNaN(n1) || isNaN(n2)) {
      setResult('Error: Invalid input');
      return;
    }
    
    const calculatedResult = calculateResult(n1, n2, operation);
    setResult(calculatedResult);
    
    // Add to history
    setHistory(prev => [
      { operation: `${n1} ${getOperationSymbol(operation)} ${n2} = ${calculatedResult}`, result: calculatedResult },
      ...prev.slice(0, 9) // Keep only last 10 items
    ]);
  };

  const clearCalculator = () => {
    setNum1('0');
    setNum2('0');
    setResult(0);
  };

  const handleMemoryOperation = (action: string) => {
    switch (action) {
      case 'MC': // Memory Clear
        setMemory(0);
        break;
      case 'MR': // Memory Recall
        if (typeof result === 'number') {
          setNum1(memory.toString());
        }
        break;
      case 'M+': // Memory Add
        if (typeof result === 'number') {
          setMemory(memory + result);
        }
        break;
      case 'M-': // Memory Subtract
        if (typeof result === 'number') {
          setMemory(memory - result);
        }
        break;
      case 'MS': // Memory Store
        if (typeof result === 'number') {
          setMemory(result);
        }
        break;
    }
  };

  const needsSecondNumber = !['sin', 'cos', 'tan'].includes(operation);

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Scientific Calculator</CardTitle>
        <CardDescription>Perform various mathematical operations</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <CalculatorInputs
          num1={num1}
          setNum1={setNum1}
          num2={num2}
          setNum2={setNum2}
          operation={operation}
          setOperation={setOperation}
          result={result}
          needsSecondNumber={needsSecondNumber}
        />
        
        <MemoryOperations handleMemoryOperation={handleMemoryOperation} />
        
        <CalculatorActions 
          handleCalculate={handleCalculate} 
          clearCalculator={clearCalculator} 
        />
      </CardContent>
      
      <CardFooter className="flex-col">
        <CalculationHistory history={history} />
      </CardFooter>
    </Card>
  );
};

export default Calculator;
