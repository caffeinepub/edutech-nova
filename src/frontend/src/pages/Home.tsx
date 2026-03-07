import { Button } from "@/components/ui/button";
import { useNavigate } from "@tanstack/react-router";
import { ArrowRight, Brain, Sparkles, Star, Zap } from "lucide-react";

// Floating particle positions for the hero
const PARTICLES = [
  {
    top: "18%",
    left: "8%",
    size: 10,
    delay: "0s",
    color: "oklch(0.72 0.19 52 / 0.7)",
  },
  {
    top: "65%",
    left: "12%",
    size: 6,
    delay: "1.2s",
    color: "oklch(0.68 0.20 265 / 0.6)",
  },
  {
    top: "30%",
    right: "10%",
    size: 8,
    delay: "0.6s",
    color: "oklch(0.55 0.16 185 / 0.7)",
  },
  {
    top: "72%",
    right: "8%",
    size: 12,
    delay: "1.8s",
    color: "oklch(0.72 0.19 52 / 0.5)",
  },
  {
    top: "50%",
    left: "5%",
    size: 5,
    delay: "2.2s",
    color: "oklch(0.55 0.16 185 / 0.5)",
  },
  {
    top: "20%",
    right: "20%",
    size: 7,
    delay: "0.4s",
    color: "oklch(0.68 0.20 265 / 0.45)",
  },
];

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden gradient-hero py-20 md:py-32">
        {/* Deep background blobs */}
        <div
          className="absolute top-[-10%] left-[-5%] w-96 h-96 rounded-full opacity-30 blur-3xl"
          style={{ background: "oklch(0.42 0.22 265)" }}
        />
        <div
          className="absolute bottom-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full opacity-20 blur-3xl"
          style={{ background: "oklch(0.52 0.24 285)" }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full opacity-10 blur-3xl"
          style={{ background: "oklch(0.72 0.19 52)" }}
        />

        {/* Floating particles */}
        {PARTICLES.map((p, i) => (
          <div
            // biome-ignore lint/suspicious/noArrayIndexKey: static decorative elements
            key={i}
            className="absolute rounded-full pointer-events-none"
            style={{
              top: p.top,
              left: "left" in p ? p.left : undefined,
              right: "right" in p ? (p as { right: string }).right : undefined,
              width: p.size,
              height: p.size,
              background: p.color,
              boxShadow: `0 0 ${p.size * 3}px ${p.color}`,
              animation: `float ${4 + i * 0.5}s ease-in-out ${p.delay} infinite`,
            }}
          />
        ))}

        {/* Subtle grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              "linear-gradient(oklch(1 0 0 / 0.15) 1px, transparent 1px), linear-gradient(90deg, oklch(1 0 0 / 0.15) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            {/* Badge */}
            <div
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-white/85 text-sm font-semibold mb-8 animate-fade-in"
              style={{
                background: "oklch(1 0 0 / 0.10)",
                border: "1px solid oklch(1 0 0 / 0.18)",
                backdropFilter: "blur(8px)",
              }}
            >
              <Sparkles
                className="w-4 h-4"
                style={{ color: "oklch(0.78 0.18 70)" }}
              />
              Your Premium Learning Companion
            </div>

            {/* Title with text shadow for depth */}
            <h1
              className="font-display font-extrabold text-5xl md:text-7xl text-white mb-6 leading-[1.05] tracking-tight animate-fade-in"
              style={{ textShadow: "0 4px 24px oklch(0.12 0.08 265 / 0.5)" }}
            >
              📚 EDUTECH{" "}
              <span
                className="inline-block"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.88 0.18 70), oklch(0.72 0.19 52))",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  filter: "drop-shadow(0 2px 8px oklch(0.72 0.19 52 / 0.4))",
                }}
              >
                NOVA
              </span>
            </h1>

            <p className="text-white/70 text-lg md:text-xl mb-10 leading-relaxed animate-fade-in max-w-2xl mx-auto">
              Challenge your knowledge with JEE-level quizzes and fuel your
              study sessions with powerful motivational messages. Earn your
              certificate on completion!
            </p>

            {/* Hero Image */}
            <div
              className="relative mx-auto max-w-2xl mb-10 rounded-2xl overflow-hidden shadow-premium animate-scale-in"
              style={{ border: "1px solid oklch(1 0 0 / 0.12)" }}
            >
              <img
                src="/assets/generated/edutech-hero-premium.dim_800x400.png"
                alt="EduTech Nova — Learn, Grow, Succeed"
                className="w-full h-auto object-cover"
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to top, oklch(0.15 0.06 270 / 0.5) 0%, transparent 50%)",
                }}
              />
              {/* Shimmer overlay */}
              <div
                className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500"
                style={{
                  background:
                    "linear-gradient(105deg, transparent 40%, oklch(1 0 0 / 0.05) 50%, transparent 60%)",
                  backgroundSize: "200% 100%",
                  animation: "shimmer 3s ease-in-out infinite",
                }}
              />
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
              <Button
                data-ocid="home.quiz.primary_button"
                size="lg"
                onClick={() => navigate({ to: "/quiz" })}
                className="gradient-amber text-white font-bold text-lg px-8 py-6 rounded-2xl border-0 h-auto animate-pulse-glow transition-all duration-200 hover:scale-105 hover:shadow-glow"
              >
                <Brain className="w-5 h-5 mr-2" />
                Start Quiz
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>

              <Button
                data-ocid="home.motivation.secondary_button"
                size="lg"
                variant="outline"
                onClick={() => navigate({ to: "/motivation" })}
                className="border-2 font-bold text-lg px-8 py-6 rounded-2xl hover:scale-105 transition-all duration-200 h-auto"
                style={{
                  borderColor: "oklch(0.55 0.16 185 / 0.7)",
                  color: "oklch(0.80 0.12 185)",
                  background: "oklch(0.55 0.16 185 / 0.08)",
                }}
              >
                <Zap className="w-5 h-5 mr-2" />
                Get Motivated
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-28 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <div
              className="inline-block px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-4"
              style={{
                background: "oklch(0.42 0.22 265 / 0.08)",
                color: "oklch(0.42 0.22 265)",
                border: "1px solid oklch(0.42 0.22 265 / 0.15)",
              }}
            >
              Features
            </div>
            <h2 className="font-display font-extrabold text-3xl md:text-5xl text-foreground mb-4">
              Everything You Need to{" "}
              <span
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.68 0.20 52), oklch(0.78 0.18 70))",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Excel
              </span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto leading-relaxed">
              Two powerful tools designed to supercharge your learning journey.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* Quiz Card */}
            <button
              type="button"
              data-ocid="home.quiz.card"
              className="group text-left cursor-pointer rounded-3xl p-8 border transition-all duration-300 hover:-translate-y-1.5"
              style={{
                background: "oklch(1 0 0)",
                border: "1px solid oklch(0.88 0.03 265 / 0.8)",
                boxShadow:
                  "0 4px 24px -4px oklch(0.18 0.08 265 / 0.10), 0 2px 8px -2px oklch(0.18 0.08 265 / 0.06)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow =
                  "0 12px 40px -6px oklch(0.42 0.22 265 / 0.18), 0 4px 16px -4px oklch(0.42 0.22 265 / 0.10)";
                (e.currentTarget as HTMLElement).style.borderColor =
                  "oklch(0.42 0.22 265 / 0.3)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow =
                  "0 4px 24px -4px oklch(0.18 0.08 265 / 0.10), 0 2px 8px -2px oklch(0.18 0.08 265 / 0.06)";
                (e.currentTarget as HTMLElement).style.borderColor =
                  "oklch(0.88 0.03 265 / 0.8)";
              }}
              onClick={() => navigate({ to: "/quiz" })}
            >
              <div className="w-16 h-16 rounded-2xl gradient-amber flex items-center justify-center mb-5 shadow-glow group-hover:scale-110 transition-transform duration-300">
                <img
                  src="/assets/generated/quiz-icon.dim_128x128.png"
                  alt="Quiz"
                  className="w-10 h-10 object-contain"
                />
              </div>
              <h3 className="font-display font-bold text-2xl text-foreground mb-3">
                JEE Interactive Quiz
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-5 text-sm">
                25 Physics, Chemistry &amp; Mathematics questions at JEE-level
                difficulty. Get instant feedback and a downloadable certificate
                upon completion.
              </p>
              <div
                className="flex items-center gap-2 font-semibold text-sm"
                style={{ color: "oklch(0.72 0.19 52)" }}
              >
                Start Quiz{" "}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>

            {/* Motivation Card */}
            <button
              type="button"
              data-ocid="home.motivation.card"
              className="group text-left cursor-pointer rounded-3xl p-8 border transition-all duration-300 hover:-translate-y-1.5"
              style={{
                background: "oklch(1 0 0)",
                border: "1px solid oklch(0.88 0.03 265 / 0.8)",
                boxShadow:
                  "0 4px 24px -4px oklch(0.18 0.08 265 / 0.10), 0 2px 8px -2px oklch(0.18 0.08 265 / 0.06)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow =
                  "0 12px 40px -6px oklch(0.55 0.16 185 / 0.18), 0 4px 16px -4px oklch(0.55 0.16 185 / 0.10)";
                (e.currentTarget as HTMLElement).style.borderColor =
                  "oklch(0.55 0.16 185 / 0.3)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow =
                  "0 4px 24px -4px oklch(0.18 0.08 265 / 0.10), 0 2px 8px -2px oklch(0.18 0.08 265 / 0.06)";
                (e.currentTarget as HTMLElement).style.borderColor =
                  "oklch(0.88 0.03 265 / 0.8)";
              }}
              onClick={() => navigate({ to: "/motivation" })}
            >
              <div className="w-16 h-16 rounded-2xl gradient-teal flex items-center justify-center mb-5 shadow-glow-teal group-hover:scale-110 transition-transform duration-300">
                <img
                  src="/assets/generated/motivation-icon.dim_128x128.png"
                  alt="Motivation"
                  className="w-10 h-10 object-contain"
                />
              </div>
              <h3 className="font-display font-bold text-2xl text-foreground mb-3">
                Daily Motivation
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-5 text-sm">
                Fuel your study sessions with powerful, hand-picked motivational
                messages to keep your momentum strong every day.
              </p>
              <div
                className="flex items-center gap-2 font-semibold text-sm"
                style={{ color: "oklch(0.55 0.16 185)" }}
              >
                Get Inspired{" "}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>
          </div>

          {/* Stats row */}
          <div className="flex flex-wrap justify-center gap-10 mt-16">
            {[
              {
                icon: <Brain className="w-5 h-5" />,
                value: "25",
                label: "JEE Questions",
                color: "oklch(0.72 0.19 52)",
                bg: "oklch(0.95 0.06 85)",
              },
              {
                icon: <Star className="w-5 h-5" />,
                value: "∞",
                label: "Motivational Quotes",
                color: "oklch(0.55 0.16 185)",
                bg: "oklch(0.92 0.06 185)",
              },
              {
                icon: <Sparkles className="w-5 h-5" />,
                value: "🏅",
                label: "Certificate Included",
                color: "oklch(0.42 0.22 265)",
                bg: "oklch(0.92 0.05 265)",
              },
            ].map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col items-center gap-2 text-center"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-1 font-bold text-lg"
                  style={{ background: stat.bg, color: stat.color }}
                >
                  {stat.icon}
                </div>
                <span
                  className="font-display font-extrabold text-2xl"
                  style={{ color: stat.color }}
                >
                  {stat.value}
                </span>
                <span className="text-muted-foreground text-sm font-medium">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
