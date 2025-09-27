import React, { useState, useCallback } from 'react';
import { StackVisualization } from '@/components/StackVisualization';
import { StackControls } from '@/components/StackControls';
import { useToast } from '@/hooks/use-toast';

interface StackItem {
  id: string;
  value: string;
  isAnimating?: boolean;
  animationType?: 'push' | 'pop';
}

export const StackSimulator: React.FC = () => {
  const [stack, setStack] = useState<StackItem[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const { toast } = useToast();
  const MAX_STACK_SIZE = 8; // Maximum capacity for the stack

  const generateId = () => Math.random().toString(36).substr(2, 9);

  const push = useCallback((value: string) => {
    if (isAnimating || stack.length >= MAX_STACK_SIZE) return;
    
    const newItem: StackItem = {
      id: generateId(),
      value,
      isAnimating: true,
      animationType: 'push',
    };

    setIsAnimating(true);
    setStack(prev => [...prev, newItem]);

    // Remove animation after completion
    setTimeout(() => {
      setStack(prev => 
        prev.map(item => 
          item.id === newItem.id 
            ? { ...item, isAnimating: false, animationType: undefined }
            : item
        )
      );
      setIsAnimating(false);
      
      toast({
        title: "Push Operation",
        description: `Successfully pushed "${value}" to the stack`,
      });
    }, 600);
  }, [isAnimating, toast]);

  const pop = useCallback(() => {
    if (isAnimating || stack.length === 0) return;

    const topItem = stack[stack.length - 1];
    
    setIsAnimating(true);
    setStack(prev => 
      prev.map((item, index) =>
        index === prev.length - 1
          ? { ...item, isAnimating: true, animationType: 'pop' }
          : item
      )
    );

    setTimeout(() => {
      setStack(prev => prev.slice(0, -1));
      setIsAnimating(false);
      
      toast({
        title: "Pop Operation",
        description: `Successfully popped "${topItem.value}" from the stack`,
      });
    }, 600);
  }, [stack, isAnimating, toast]);

  const peek = useCallback(() => {
    if (stack.length === 0) {
      toast({
        title: "Peek Operation",
        description: "Stack is empty - nothing to peek",
        variant: "destructive",
      });
      return;
    }

    const topValue = stack[stack.length - 1].value;
    toast({
      title: "Peek Operation",
      description: `Top element is "${topValue}"`,
    });
  }, [stack, toast]);

  const isEmpty = useCallback(() => {
    const empty = stack.length === 0;
    toast({
      title: "isEmpty Operation", 
      description: `Stack is ${empty ? 'empty' : 'not empty'}`,
    });
  }, [stack, toast]);

  const isFull = useCallback(() => {
    const full = stack.length >= MAX_STACK_SIZE;
    toast({
      title: "isFull Operation",
      description: `Stack is ${full ? 'full' : 'not full'} (${stack.length}/${MAX_STACK_SIZE})`,
    });
  }, [stack, MAX_STACK_SIZE, toast]);

  const handleReturn = () => {
    // In a real app, this would navigate back to the main lab page
    toast({
      title: "Navigation",
      description: "Returning to Virtual Lab homepage",
    });
  };

  const peekValue = stack.length > 0 ? stack[stack.length - 1].value : null;
  const stackIsEmpty = stack.length === 0;
  const stackIsFull = stack.length >= MAX_STACK_SIZE;

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-8 animate-fade-slide-up">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Stack Data Structure
            <span className="block text-lg font-normal text-primary mt-2">
              Interactive Visualization
            </span>
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore the Last-In-First-Out (LIFO) behavior of stacks through this interactive simulator. 
            Push elements onto the stack, pop them off, and observe how the data structure operates.
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {/* Stack Visualization */}
          <div className="order-2 lg:order-1">
            <div className="sticky top-8">
              <div className="bg-gradient-card border border-card-border rounded-xl p-6 shadow-card">
                <h2 className="text-2xl font-bold text-center text-foreground mb-6">
                  Stack Visualization
                </h2>
                <StackVisualization 
                  stack={stack}
                  className="animate-fade-slide-up"
                />
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="order-1 lg:order-2">
            <StackControls
              onPush={push}
              onPop={pop}
              onPeek={peek}
              onIsEmpty={isEmpty}
              onIsFull={isFull}
              onReturn={handleReturn}
              stackSize={stack.length}
              maxSize={MAX_STACK_SIZE}
              peekValue={peekValue}
              isEmpty={stackIsEmpty}
              isFull={stackIsFull}
              disabled={isAnimating}
            />
          </div>
        </div>

        {/* Educational Information */}
        <div className="mt-12 max-w-4xl mx-auto">
          <div className="bg-gradient-card border border-card-border rounded-xl p-6 shadow-card animate-fade-slide-up">
            <h3 className="text-2xl font-bold text-foreground mb-4">About Stack Operations</h3>
            <div className="grid md:grid-cols-2 gap-6 text-muted-foreground">
              <div>
                <h4 className="text-lg font-semibold text-primary mb-2">Push</h4>
                <p>Adds an element to the top of the stack. The stack grows upward with each push operation.</p>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-destructive mb-2">Pop</h4>
                <p>Removes and returns the top element from the stack. The stack shrinks with each pop operation.</p>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-secondary mb-2">Peek</h4>
                <p>Returns the top element without removing it from the stack. Useful for inspection.</p>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-success mb-2">isEmpty</h4>
                <p>Checks if the stack contains any elements. Returns true if empty, false otherwise.</p>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-secondary mb-2">isFull</h4>
                <p>Checks if the stack has reached its maximum capacity. Returns true when full (8 elements).</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default StackSimulator;