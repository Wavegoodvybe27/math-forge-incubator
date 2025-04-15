
import React from 'react';

interface CalculationHistoryProps {
  history: Array<{operation: string, result: number | string}>;
}

export const CalculationHistory: React.FC<CalculationHistoryProps> = ({ history }) => {
  return (
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
  );
};
