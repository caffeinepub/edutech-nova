import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Zap, RefreshCw, Quote, Sparkles } from 'lucide-react';
import { useMotivation } from '@/hooks/useMotivation';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

export default function Motivation() {
  const { message, isLoading, isError, fetchNew, hasFetched } = useMotivation();

  // Auto-fetch on mount
  useEffect(() => {
    fetchNew();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-[calc(100vh-8rem)] flex flex-col items-center justify-center py-12 px-4">
      {/* Background decoration */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-10 blur-3xl"
          style={{ background: 'oklch(0.62 0.14 185)' }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full opacity-10 blur-3xl"
          style={{ background: 'oklch(0.72 0.19 52)' }}
        />
      </div>

      <div className="relative z-10 w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="w-20 h-20 rounded-2xl gradient-teal flex items-center justify-center mx-auto mb-5 shadow-glow-teal">
            <img
              src="/assets/generated/motivation-icon.dim_128x128.png"
              alt="Motivation"
              className="w-12 h-12 object-contain"
            />
          </div>
          <h1 className="font-display font-bold text-4xl md:text-5xl text-foreground mb-3">
            Daily <span className="text-teal">Motivation</span>
          </h1>
          <p className="text-muted-foreground text-lg">
            A spark of inspiration to fuel your learning journey.
          </p>
        </div>

        {/* Message Card */}
        <div className="bg-card rounded-3xl p-8 md:p-12 border border-border shadow-card mb-8 relative overflow-hidden">
          {/* Decorative quote mark */}
          <Quote
            className="absolute top-6 left-6 w-12 h-12 opacity-10 text-teal"
            strokeWidth={1}
          />
          <Quote
            className="absolute bottom-6 right-6 w-12 h-12 opacity-10 text-amber rotate-180"
            strokeWidth={1}
          />

          <div className="relative z-10 min-h-[120px] flex items-center justify-center">
            {isLoading ? (
              <div className="w-full space-y-3">
                <Skeleton className="h-6 w-full rounded-lg" />
                <Skeleton className="h-6 w-4/5 rounded-lg mx-auto" />
                <Skeleton className="h-6 w-3/5 rounded-lg mx-auto" />
              </div>
            ) : isError && !hasFetched ? (
              <div className="text-center">
                <p className="text-destructive font-semibold mb-2">Failed to load message</p>
                <p className="text-muted-foreground text-sm">Please try again.</p>
              </div>
            ) : message ? (
              <blockquote className="text-center animate-fade-in">
                <p className="font-display font-bold text-2xl md:text-3xl text-foreground leading-relaxed">
                  "{message}"
                </p>
              </blockquote>
            ) : (
              <div className="text-center text-muted-foreground">
                <Sparkles className="w-8 h-8 mx-auto mb-3 animate-pulse-soft text-teal" />
                <p className="font-semibold">Loading your motivation...</p>
              </div>
            )}
          </div>
        </div>

        {/* Teal accent bar */}
        <div className="h-1.5 w-24 rounded-full gradient-teal mx-auto mb-8" />

        {/* Action Button */}
        <div className="flex justify-center">
          <Button
            size="lg"
            onClick={fetchNew}
            disabled={isLoading}
            className={cn(
              'gradient-teal text-white font-bold text-lg px-10 py-6 rounded-2xl shadow-glow-teal hover:scale-105 transition-all duration-200 border-0 h-auto',
              isLoading && 'opacity-80 cursor-not-allowed'
            )}
          >
            {isLoading ? (
              <>
                <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
                Loading...
              </>
            ) : (
              <>
                <Zap className="w-5 h-5 mr-2" />
                New Motivation
              </>
            )}
          </Button>
        </div>

        {/* Tip */}
        <p className="text-center text-muted-foreground text-sm mt-6">
          Click the button to get a fresh dose of inspiration ✨
        </p>
      </div>
    </div>
  );
}
