
import React from 'react';
import { Button } from '@/components/ui/button';

interface MemoryOperationsProps {
  handleMemoryOperation: (action: string) => void;
}

export const MemoryOperations: React.FC<MemoryOperationsProps> = ({ handleMemoryOperation }) => {
  return (
    <div className="grid grid-cols-5 gap-2">
      <Button onClick={() => handleMemoryOperation('MC')} variant="outline">MC</Button>
      <Button onClick={() => handleMemoryOperation('MR')} variant="outline">MR</Button>
      <Button onClick={() => handleMemoryOperation('M+')} variant="outline">M+</Button>
      <Button onClick={() => handleMemoryOperation('M-')} variant="outline">M-</Button>
      <Button onClick={() => handleMemoryOperation('MS')} variant="outline">MS</Button>
    </div>
  );
};
