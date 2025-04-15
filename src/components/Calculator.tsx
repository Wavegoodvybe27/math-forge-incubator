import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';

const operations = [
  { value: 'add', label: 'Addition (+)' },
  { value: 'subtract', label: 'Subtraction (-)' },
  { value: 'multiply', label: 'Multiplication (×)' },
  { value: 'divide', label: 'Division (÷)' },
  { value: 'power', label: 'Power (^)' },
  { value: 'root', label: 'Root (√)' },
  { value: 'log', label: 'Logarithm (log)' },
  { value: 'sin', label: 'Sine (sin)' },
  { value: 'cos', label: 'Cosine (cos)' },
  { value: 'tan', label: 'Tangent (tan)' },
];

export const Calculator: React.FC = () => {
  const [num1, setNum1] = useState<string>('0');
  const [num2, setNum2] = useState<string>('0');
  const [operation, setOperation] = useState('add');
  const [result, setResult] = useState<number | string>(0);
  const [memory, setMemory] = useState<number>(0);
  const [history, setHistory] = useState<Array<{operation: string, result: number | string}>>([]);

  const calculateResult = (n1: number, n2: number, op: string): number | string => {
    switch (op) {
      case 'add':
        return n1 + n2;
      case 'subtract':
        return n1 - n2;
      case 'multiply':
        return n1 * n2;
      case 'divide':
        return n2 !== 0 ? n1 / n2 : 'Error: Division by zero';
      case 'power':
        return Math.pow(n1, n2);
      case 'root':
        return n2 !== 0 ? Math.pow(n1, 1/n2) : 'Error: Invalid operation';
      case 'log':
        return n2 > 0 ? Math.log(n2) / Math.log(n1) : 'Error: Invalid input for logarithm';
      case 'sin':
        return Math.sin(n1);
      case 'cos':
        return Math.cos(n1);
      case 'tan':
        return Math.tan(n1);
      default:
        return 0;
    }
  };

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

  const getOperationSymbol = (op: string): string => {
    switch (op) {
      case 'add': return '+';
      case 'subtract': return '-';
      case 'multiply': return '×';
      case 'divide': return '÷';
      case 'power': return '^';
      case 'root': return '√';
      case 'log': return 'log';
      case 'sin': return 'sin';
      case 'cos': return 'cos';
      case 'tan': return 'tan';
      default: return '';
    }
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
        
        <div className="grid grid-cols-5 gap-2">
          <Button onClick={() => handleMemoryOperation('MC')} variant="outline">MC</Button>
          <Button onClick={() => handleMemoryOperation('MR')} variant="outline">MR</Button>
          <Button onClick={() => handleMemoryOperation('M+')} variant="outline">M+</Button>
          <Button onClick={() => handleMemoryOperation('M-')} variant="outline">M-</Button>
          <Button onClick={() => handleMemoryOperation('MS')} variant="outline">MS</Button>
        </div>
        
        <div className="grid grid-cols-2 gap-2">
          <Button onClick={handleCalculate} className="bg-primary">Calculate</Button>
          <Button onClick={clearCalculator} variant="destructive">Clear</Button>
        </div>
      </CardContent>
      
      <CardFooter className="flex-col">
        <div className="w-full">
          <h4 className="text-sm font-medium mb-2">Calculation History</h4>
          {history.length > 0 ? (
            <div className="text-sm space-y-1 max-h-40 overflow-y-auto">
              {history.map((item, index) => (
                <div key={index} className="p-1 border-b last:border-b-0">
                  {item.operation}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">No calculation history yet</p>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

export default Calculator;
