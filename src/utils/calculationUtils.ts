
export const calculateResult = (n1: number, n2: number, op: string): number | string => {
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

export const getOperationSymbol = (op: string): string => {
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

export const operations = [
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
