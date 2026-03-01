import { useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { BookOpen, Zap, Star, ArrowRight, Brain, Sparkles } from 'lucide-react';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden gradient-hero py-20 md:py-32">
        {/* Decorative blobs */}
        <div className="absolute top-0 left-0 w-72 h-72 rounded-full opacity-20 blur-3xl"
          style={{ background: 'oklch(0.72 0.19 52)' }} />
        <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full opacity-15 blur-3xl"
          style={{ background: 'oklch(0.62 0.14 185)' }} />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/20 bg-white/10 text-white/80 text-sm font-semibold mb-6 animate-fade-in">
              <Sparkles className="w-4 h-4 text-amber" />
              Your Learning Companion
            </div>

            {/* Title */}
            <h1 className="font-display font-bold text-5xl md:text-7xl text-white mb-6 leading-tight animate-fade-in">
              📚 EDUTECH{' '}
              <span className="text-amber">NOVA</span>
            </h1>

            <p className="text-white/70 text-lg md:text-xl mb-10 leading-relaxed animate-fade-in">
              Challenge your knowledge with interactive quizzes and fuel your study sessions with powerful motivational messages.
            </p>

            {/* Hero Image */}
            <div className="relative mx-auto max-w-2xl mb-10 rounded-2xl overflow-hidden shadow-2xl animate-scale-in">
              <img
                src="/assets/generated/edutech-hero.dim_800x400.png"
                alt="EduTech Nova — Learn, Grow, Succeed"
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
              <Button
                size="lg"
                onClick={() => navigate({ to: '/quiz' })}
                className="gradient-amber text-white font-bold text-lg px-8 py-6 rounded-2xl shadow-glow hover:shadow-glow hover:scale-105 transition-all duration-200 border-0 h-auto"
              >
                <Brain className="w-5 h-5 mr-2" />
                Start Quiz
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>

              <Button
                size="lg"
                variant="outline"
                onClick={() => navigate({ to: '/motivation' })}
                className="border-2 border-teal text-teal bg-transparent font-bold text-lg px-8 py-6 rounded-2xl hover:bg-teal/10 hover:shadow-glow-teal hover:scale-105 transition-all duration-200 h-auto"
              >
                <Zap className="w-5 h-5 mr-2" />
                Get Motivated
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground mb-3">
              Everything You Need to <span className="text-amber">Excel</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Two powerful tools designed to boost your learning journey.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* Quiz Card */}
            <div
              className="group cursor-pointer bg-card rounded-3xl p-8 border border-border shadow-card card-hover"
              onClick={() => navigate({ to: '/quiz' })}
            >
              <div className="w-16 h-16 rounded-2xl gradient-amber flex items-center justify-center mb-5 shadow-glow group-hover:scale-110 transition-transform">
                <img
                  src="/assets/generated/quiz-icon.dim_128x128.png"
                  alt="Quiz"
                  className="w-10 h-10 object-contain"
                />
              </div>
              <h3 className="font-display font-bold text-2xl text-foreground mb-3">
                Interactive Quiz
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-5">
                Test your knowledge with multiple-choice questions. Get instant feedback and track your score as you go.
              </p>
              <div className="flex items-center gap-2 text-amber font-semibold text-sm">
                Start Quiz <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Motivation Card */}
            <div
              className="group cursor-pointer bg-card rounded-3xl p-8 border border-border shadow-card card-hover"
              onClick={() => navigate({ to: '/motivation' })}
            >
              <div className="w-16 h-16 rounded-2xl gradient-teal flex items-center justify-center mb-5 shadow-glow-teal group-hover:scale-110 transition-transform">
                <img
                  src="/assets/generated/motivation-icon.dim_128x128.png"
                  alt="Motivation"
                  className="w-10 h-10 object-contain"
                />
              </div>
              <h3 className="font-display font-bold text-2xl text-foreground mb-3">
                Daily Motivation
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-5">
                Fuel your study sessions with powerful, hand-picked motivational messages to keep you going strong.
              </p>
              <div className="flex items-center gap-2 text-teal font-semibold text-sm">
                Get Inspired <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>

          {/* Stats row */}
          <div className="flex flex-wrap justify-center gap-8 mt-16">
            {[
              { icon: <Brain className="w-5 h-5" />, label: 'Quiz Questions', color: 'text-amber' },
              { icon: <Star className="w-5 h-5" />, label: 'Motivational Messages', color: 'text-teal' },
              { icon: <Zap className="w-5 h-5" />, label: 'Instant Feedback', color: 'text-amber' },
            ].map((stat, i) => (
              <div key={i} className="flex items-center gap-2 text-muted-foreground">
                <span className={stat.color}>{stat.icon}</span>
                <span className="font-semibold">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
