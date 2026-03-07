import { Link, useRouter } from "@tanstack/react-router";
import { BookOpen, Heart } from "lucide-react";
import type { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const appId =
    typeof window !== "undefined"
      ? encodeURIComponent(window.location.hostname)
      : "edutech-nova";

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-card/80 backdrop-blur-md shadow-xs">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl gradient-amber flex items-center justify-center shadow-glow group-hover:scale-105 transition-transform">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <span className="font-display font-bold text-xl tracking-tight text-foreground">
              EduTech <span className="text-amber">Nova</span>
            </span>
          </Link>

          <nav className="flex items-center gap-1">
            <Link
              to="/quiz"
              className="px-4 py-2 rounded-lg text-sm font-semibold text-muted-foreground hover:text-foreground hover:bg-accent transition-all duration-150"
              activeProps={{
                className:
                  "px-4 py-2 rounded-lg text-sm font-semibold text-amber bg-amber-light/50",
              }}
            >
              Quiz
            </Link>
            <Link
              to="/motivation"
              className="px-4 py-2 rounded-lg text-sm font-semibold text-muted-foreground hover:text-foreground hover:bg-accent transition-all duration-150"
              activeProps={{
                className:
                  "px-4 py-2 rounded-lg text-sm font-semibold text-teal bg-teal-light/50",
              }}
            >
              Motivation
            </Link>
          </nav>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="border-t border-border bg-card py-6">
        <div className="container mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <BookOpen className="w-4 h-4 text-amber" />
            <span className="font-semibold text-foreground">EduTech Nova</span>
            <span>© {new Date().getFullYear()}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span>Built with</span>
            <Heart className="w-4 h-4 fill-amber text-amber" />
            <span>using</span>
            <a
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${appId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-amber hover:underline"
            >
              caffeine.ai
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
