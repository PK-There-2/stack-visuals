import React from 'react';
import { cn } from '@/lib/utils';

interface StackItem {
  id: string;
  value: string;
  isAnimating?: boolean;
  animationType?: 'push' | 'pop';
}

interface StackVisualizationProps {
  stack: StackItem[];
  className?: string;
}

export const StackVisualization: React.FC<StackVisualizationProps> = ({ 
  stack, 
  className 
}) => {
  return (
    <div className={cn("flex flex-col-reverse items-center gap-2 min-h-[400px] p-4", className)}>
      {/* Stack base */}
      <div className="w-48 h-4 bg-gradient-primary rounded-lg shadow-primary relative mb-4">
        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs text-primary font-semibold whitespace-nowrap">
          STACK BASE
        </div>
      </div>
      
      {/* Stack items */}
      {stack.map((item, index) => (
        <div
          key={item.id}
          className={cn(
            "w-44 h-16 bg-gradient-card border border-card-border rounded-lg flex items-center justify-center shadow-card transition-all duration-300",
            "text-lg font-bold text-foreground relative",
            {
              "animate-stack-push": item.animationType === 'push',
              "animate-stack-pop": item.animationType === 'pop',
              "shadow-glow animate-glow-pulse": index === stack.length - 1 && !item.isAnimating,
            }
          )}
        >
          <span className="select-none">{item.value}</span>
          {index === stack.length - 1 && (
            <div className="absolute -right-14 text-xs text-primary font-semibold">
              TOP
            </div>
          )}
        </div>
      ))}
      
      {/* Empty stack message */}
      {stack.length === 0 && (
        <div className="flex flex-col items-center justify-center h-32 text-muted-foreground animate-fade-slide-up">
          <div className="text-xl font-semibold mb-2">Stack is Empty</div>
          <div className="text-sm">Push elements to get started</div>
        </div>
      )}
      
      {/* Stack pointer indicator */}
      <div className="text-sm text-muted-foreground font-medium mt-4">
        Size: <span className="text-primary font-bold">{stack.length}</span>
      </div>
    </div>
  );
};