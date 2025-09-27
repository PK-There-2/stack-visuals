import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Minus, Eye, CheckCircle, ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StackControlsProps {
  onPush: (value: string) => void;
  onPop: () => void;
  onPeek: () => void;
  onIsEmpty: () => void;
  onIsFull: () => void;
  onReturn: () => void;
  stackSize: number;
  maxSize: number;
  peekValue: string | null;
  isEmpty: boolean;
  isFull: boolean;
  disabled?: boolean;
}

export const StackControls: React.FC<StackControlsProps> = ({
  onPush,
  onPop,
  onPeek,
  onIsEmpty,
  onIsFull,
  onReturn,
  stackSize,
  maxSize,
  peekValue,
  isEmpty,
  isFull,
  disabled = false,
}) => {
  const [pushValue, setPushValue] = useState('');
  const [showPeekResult, setShowPeekResult] = useState(false);
  const [showEmptyResult, setShowEmptyResult] = useState(false);
  const [showFullResult, setShowFullResult] = useState(false);

  const handlePush = () => {
    if (pushValue.trim()) {
      onPush(pushValue.trim());
      setPushValue('');
    }
  };

  const handlePeek = () => {
    onPeek();
    setShowPeekResult(true);
    setTimeout(() => setShowPeekResult(false), 3000);
  };

  const handleIsEmpty = () => {
    onIsEmpty();
    setShowEmptyResult(true);
    setTimeout(() => setShowEmptyResult(false), 3000);
  };

  const handleIsFull = () => {
    onIsFull();
    setShowFullResult(true);
    setTimeout(() => setShowFullResult(false), 3000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handlePush();
    }
  };

  return (
    <div className="space-y-6">
      {/* Return Button */}
      <div className="flex justify-start">
        <Button
          variant="lab-outline"
          onClick={onReturn}
          className="gap-2"
        >
          <ArrowLeft size={16} />
          Return to Lab
        </Button>
      </div>

      {/* Main Controls */}
      <Card className="bg-gradient-card border-card-border shadow-card">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-center text-foreground">
            Stack Operations
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Push Section */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-primary">Push Element</h3>
            <div className="flex gap-3">
              <Input
                value={pushValue}
                onChange={(e) => setPushValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Enter value to push"
                className="flex-1 bg-muted border-border"
                disabled={disabled}
              />
              <Button
                variant="lab"
                onClick={handlePush}
                disabled={!pushValue.trim() || disabled || isFull}
                className="gap-2 min-w-[100px]"
              >
                <Plus size={16} />
                Push
              </Button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <Button
              variant="destructive"
              onClick={onPop}
              disabled={isEmpty || disabled}
              className="gap-2 font-semibold"
            >
              <Minus size={16} />
              Pop
            </Button>
            
            <Button
              variant="lab-purple"
              onClick={handlePeek}
              disabled={isEmpty || disabled}
              className="gap-2"
            >
              <Eye size={16} />
              Peek
            </Button>
            
            <Button
              variant="lab-success"
              onClick={handleIsEmpty}
              disabled={disabled}
              className="gap-2"
            >
              <CheckCircle size={16} />
              isEmpty
            </Button>
            
            <Button
              variant="secondary"
              onClick={handleIsFull}
              disabled={disabled}
              className="gap-2 font-semibold"
            >
              <CheckCircle size={16} />
              isFull
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Results Display */}
      <div className="space-y-3">
        {/* Peek Result */}
        {showPeekResult && (
          <Card className={cn(
            "bg-secondary/20 border-secondary animate-fade-slide-up",
            "transition-all duration-300"
          )}>
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-sm text-muted-foreground mb-1">Peek Result:</div>
                <div className="text-lg font-bold text-secondary">
                  {peekValue || 'Stack is empty'}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* isEmpty Result */}
        {showEmptyResult && (
          <Card className={cn(
            "border-success animate-fade-slide-up",
            isEmpty ? "bg-success/20" : "bg-muted/20"
          )}>
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-sm text-muted-foreground mb-1">isEmpty Result:</div>
                <div className={cn(
                  "text-lg font-bold",
                  isEmpty ? "text-success" : "text-muted-foreground"
                )}>
                  {isEmpty ? 'true' : 'false'}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* isFull Result */}
        {showFullResult && (
          <Card className={cn(
            "border-secondary animate-fade-slide-up",
            isFull ? "bg-secondary/20" : "bg-muted/20"
          )}>
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-sm text-muted-foreground mb-1">isFull Result:</div>
                <div className={cn(
                  "text-lg font-bold",
                  isFull ? "text-secondary" : "text-muted-foreground"
                )}>
                  {isFull ? 'true' : 'false'}
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Stack Info */}
      <Card className="bg-muted/10 border-muted">
        <CardContent className="p-4">
          <div className="text-center space-y-2">
            <div className="text-sm text-muted-foreground">Stack Status</div>
            <div className="flex justify-center gap-4">
              <div className="text-center">
                <div className="text-lg font-bold text-primary">{stackSize}</div>
                <div className="text-xs text-muted-foreground">Current</div>
              </div>
              <div className="text-muted-foreground">/</div>
              <div className="text-center">
                <div className="text-lg font-bold text-secondary">{maxSize}</div>
                <div className="text-xs text-muted-foreground">Max</div>
              </div>
            </div>
            {isFull && (
              <div className="text-xs text-secondary font-semibold mt-2">Stack is Full!</div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};