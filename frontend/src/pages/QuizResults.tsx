import { useNavigate, useSearch } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Trophy, RotateCcw, Home, Star, Target } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function QuizResults() {
  const navigate = useNavigate();
  const search = useSearch({ strict: false }) as { score?: number; total?: number };
  const score = search.score ?? 0;
  const total = search.total ?? 0;
  const percentage = total > 0 ? Math.round((score / total) * 100) : 0;

  const getGrade = () => {
    if (percentage >= 90) return { label: 'Outstanding! 🏆', color: 'text-amber' };
    if (percentage >= 75) return { label: 'Great Job! 🌟', color: 'text-teal' };
    if (percentage >= 60) return { label: 'Good Effort! 👍', color: 'text-amber' };
    if (percentage >= 40) return { label: 'Keep Practicing! 💪', color: 'text-muted-foreground' };
    return { label: 'Keep Studying! 📚', color: 'text-muted-foreground' };
  };

  const grade = getGrade();

  const getScoreColor = () => {
    if (percentage >= 75) return 'text-amber';
    if (percentage >= 50) return 'text-teal';
    return 'text-muted-foreground';
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-lg">
      <div className="bg-card rounded-3xl p-8 md:p-10 border border-border shadow-card text-center animate-scale-in">
        {/* Trophy Icon */}
        <div className="w-20 h-20 rounded-full gradient-amber flex items-center justify-center mx-auto mb-6 shadow-glow">
          <Trophy className="w-10 h-10 text-white" />
        </div>

        <h1 className="font-display font-bold text-3xl md:text-4xl text-foreground mb-2">
          Quiz Complete!
        </h1>
        <p className={cn('text-xl font-bold mb-8', grade.color)}>{grade.label}</p>

        {/* Score Circle */}
        <div className="relative w-40 h-40 mx-auto mb-8">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50" cy="50" r="42"
              fill="none"
              stroke="oklch(0.88 0.02 85)"
              strokeWidth="8"
            />
            <circle
              cx="50" cy="50" r="42"
              fill="none"
              stroke="oklch(0.72 0.19 52)"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 42}`}
              strokeDashoffset={`${2 * Math.PI * 42 * (1 - percentage / 100)}`}
              className="transition-all duration-1000"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className={cn('font-display font-bold text-4xl', getScoreColor())}>
              {percentage}%
            </span>
            <span className="text-xs text-muted-foreground font-semibold">Score</span>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-muted/50 rounded-2xl p-4">
            <div className="flex items-center justify-center mb-1">
              <Target className="w-5 h-5 text-amber" />
            </div>
            <p className="font-display font-bold text-2xl text-foreground">{total}</p>
            <p className="text-xs text-muted-foreground font-semibold">Total</p>
          </div>
          <div className="bg-teal-light/30 rounded-2xl p-4">
            <div className="flex items-center justify-center mb-1">
              <Star className="w-5 h-5 text-teal" />
            </div>
            <p className="font-display font-bold text-2xl text-teal">{score}</p>
            <p className="text-xs text-muted-foreground font-semibold">Correct</p>
          </div>
          <div className="bg-destructive/10 rounded-2xl p-4">
            <div className="flex items-center justify-center mb-1">
              <span className="text-destructive text-lg">✗</span>
            </div>
            <p className="font-display font-bold text-2xl text-destructive">{total - score}</p>
            <p className="text-xs text-muted-foreground font-semibold">Wrong</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-3">
          <Button
            size="lg"
            onClick={() => navigate({ to: '/quiz' })}
            className="w-full gradient-amber text-white font-bold text-base py-5 rounded-2xl shadow-glow hover:scale-[1.02] transition-all duration-200 border-0 h-auto"
          >
            <RotateCcw className="w-5 h-5 mr-2" />
            Try Again
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={() => navigate({ to: '/' })}
            className="w-full font-bold text-base py-5 rounded-2xl h-auto border-2"
          >
            <Home className="w-5 h-5 mr-2" />
            Back to Home
          </Button>
        </div>
      </div>
    </div>
  );
}
