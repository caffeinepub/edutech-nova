import { Button } from "@/components/ui/button";
import { MOTIVATIONS } from "@/data/quizData";
import { cn } from "@/lib/utils";
import { Quote, RefreshCw, Sparkles, Zap } from "lucide-react";
import { useState } from "react";

export default function Motivation() {
  const [currentIndex, setCurrentIndex] = useState<number>(
    Math.floor(Math.random() * MOTIVATIONS.length),
  );
  const [isRefreshing, setIsRefreshing] = useState(false);

  const message = MOTIVATIONS[currentIndex];

  const fetchNew = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      let nextIndex: number;
      do {
        nextIndex = Math.floor(Math.random() * MOTIVATIONS.length);
      } while (nextIndex === currentIndex && MOTIVATIONS.length > 1);
      setCurrentIndex(nextIndex);
      setIsRefreshing(false);
    }, 400);
  };

  return (
    <div className="min-h-[calc(100vh-8rem)] flex flex-col items-center justify-center py-16 px-4">
      {/* Background decoration */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full opacity-8 blur-[80px]"
          style={{ background: "oklch(0.55 0.16 185)" }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full opacity-8 blur-[80px]"
          style={{ background: "oklch(0.72 0.19 52)" }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full opacity-5 blur-3xl"
          style={{ background: "oklch(0.42 0.22 265)" }}
        />
      </div>

      <div className="relative z-10 w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="w-20 h-20 rounded-2xl gradient-teal flex items-center justify-center mx-auto mb-6 shadow-glow-teal animate-float">
            <Sparkles className="w-10 h-10 text-white" />
          </div>
          <h1 className="font-display font-extrabold text-4xl md:text-5xl text-foreground mb-3">
            Daily{" "}
            <span
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.38 0.16 185), oklch(0.55 0.16 185))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Motivation
            </span>
          </h1>
          <p className="text-muted-foreground text-lg leading-relaxed">
            A spark of inspiration to fuel your learning journey.
          </p>
        </div>

        {/* Message Card */}
        <div
          className="rounded-3xl p-8 md:p-12 mb-8 relative overflow-hidden"
          style={{
            background: "oklch(1 0 0)",
            border: "1px solid oklch(0.88 0.03 265 / 0.6)",
            boxShadow:
              "0 8px 40px -8px oklch(0.18 0.08 265 / 0.12), 0 2px 8px -2px oklch(0.18 0.08 265 / 0.06)",
          }}
        >
          {/* Left accent bar */}
          <div
            className="absolute left-0 top-6 bottom-6 w-1 rounded-full"
            style={{
              background:
                "linear-gradient(to bottom, oklch(0.42 0.22 265), oklch(0.55 0.16 185), oklch(0.72 0.19 52))",
            }}
          />

          {/* Decorative quote marks */}
          <Quote
            className="absolute top-5 left-6 w-10 h-10 opacity-8"
            strokeWidth={1.5}
            style={{ color: "oklch(0.55 0.16 185)" }}
          />
          <Quote
            className="absolute bottom-5 right-6 w-10 h-10 opacity-8 rotate-180"
            strokeWidth={1.5}
            style={{ color: "oklch(0.72 0.19 52)" }}
          />

          <div className="relative z-10 min-h-[140px] flex items-center justify-center pl-4">
            <blockquote
              className={cn(
                "text-center transition-opacity duration-300",
                isRefreshing ? "opacity-0" : "opacity-100 animate-fade-in",
              )}
            >
              <p
                className="font-display font-bold text-2xl md:text-3xl leading-relaxed"
                style={{ color: "oklch(0.18 0.06 265)" }}
              >
                "{message}"
              </p>
            </blockquote>
          </div>
        </div>

        {/* Dot indicators */}
        <div className="flex justify-center gap-2 mb-6">
          {MOTIVATIONS.map((_msg, i) => (
            <button
              // biome-ignore lint/suspicious/noArrayIndexKey: static list, order never changes
              key={i}
              type="button"
              onClick={() => setCurrentIndex(i)}
              className="w-2 h-2 rounded-full transition-all duration-200"
              style={{
                background:
                  i === currentIndex
                    ? "oklch(0.55 0.16 185)"
                    : "oklch(0.88 0.03 265)",
                transform: i === currentIndex ? "scale(1.4)" : "scale(1)",
              }}
              aria-label={`Motivation ${i + 1}`}
            />
          ))}
        </div>

        {/* Gradient accent bar */}
        <div
          className="h-1 w-28 rounded-full mx-auto mb-8"
          style={{
            background:
              "linear-gradient(90deg, oklch(0.42 0.22 265), oklch(0.55 0.16 185), oklch(0.72 0.19 52))",
          }}
        />

        {/* Action Button */}
        <div className="flex justify-center">
          <Button
            data-ocid="motivation.primary_button"
            size="lg"
            onClick={fetchNew}
            disabled={isRefreshing}
            className={cn(
              "gradient-teal text-white font-bold text-lg px-10 py-6 rounded-2xl shadow-glow-teal hover:scale-105 transition-all duration-200 border-0 h-auto",
              isRefreshing && "opacity-80 cursor-not-allowed",
            )}
          >
            {isRefreshing ? (
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
