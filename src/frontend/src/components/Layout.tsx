import { Link } from "@tanstack/react-router";
import { Heart } from "lucide-react";
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
      {/* Header — premium glass morphism */}
      <header
        className="sticky top-0 z-50 backdrop-blur-xl shadow-sm"
        style={{
          background:
            "linear-gradient(to bottom, oklch(1 0 0 / 0.90), oklch(0.98 0.006 260 / 0.94))",
          borderBottom: "1px solid oklch(0.88 0.03 265 / 0.3)",
        }}
      >
        {/* Subtle top accent gradient line */}
        <div
          className="absolute top-0 left-0 right-0 h-0.5"
          style={{
            background:
              "linear-gradient(90deg, transparent, oklch(0.42 0.22 265 / 0.7) 30%, oklch(0.72 0.19 52 / 0.9) 60%, transparent)",
          }}
        />

        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-2.5 group"
            data-ocid="nav.link"
          >
            <div className="relative">
              <div
                className="absolute inset-0 rounded-lg blur-md opacity-0 group-hover:opacity-50 transition-opacity duration-300"
                style={{ background: "oklch(0.42 0.22 265 / 0.35)" }}
              />
              <img
                src="/assets/uploads/file_00000000c20072088a751f25cebbaf19-1.png"
                alt="EduTech Nova Logo"
                className="relative w-9 h-9 object-contain group-hover:scale-105 transition-transform drop-shadow-md"
              />
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-display font-extrabold text-lg tracking-tight text-foreground">
                EduTech{" "}
                <span
                  style={{
                    background:
                      "linear-gradient(135deg, oklch(0.78 0.18 70), oklch(0.72 0.19 52))",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  Nova
                </span>
              </span>
              <span className="text-xs text-muted-foreground font-medium tracking-wide hidden sm:block">
                Learn · Grow · Excel
              </span>
            </div>
          </Link>

          <nav className="flex items-center gap-1 flex-wrap justify-end">
            <Link
              to="/quiz"
              data-ocid="nav.link"
              className="relative px-3 py-2 rounded-xl text-sm font-semibold text-muted-foreground hover:text-foreground transition-all duration-200 hover:bg-muted/50"
              activeProps={{
                className:
                  "relative px-3 py-2 rounded-xl text-sm font-semibold transition-all duration-200",
                style: {
                  color: "oklch(0.42 0.22 265)",
                  background: "oklch(0.42 0.22 265 / 0.08)",
                },
              }}
              activeOptions={{ includeSearch: false }}
            >
              📝 JEE
              <ActiveDot />
            </Link>
            <Link
              to="/neet-quiz"
              data-ocid="nav.link"
              className="relative px-3 py-2 rounded-xl text-sm font-semibold text-muted-foreground hover:text-foreground transition-all duration-200 hover:bg-muted/50"
              activeProps={{
                className:
                  "relative px-3 py-2 rounded-xl text-sm font-semibold transition-all duration-200",
                style: {
                  color: "oklch(0.40 0.18 145)",
                  background: "oklch(0.40 0.18 145 / 0.08)",
                },
              }}
              activeOptions={{ includeSearch: false }}
            >
              🌿 NEET
              <ActiveDot />
            </Link>
            <Link
              to="/motivation"
              data-ocid="nav.link"
              className="relative px-3 py-2 rounded-xl text-sm font-semibold text-muted-foreground hover:text-foreground transition-all duration-200 hover:bg-muted/50"
              activeProps={{
                className:
                  "relative px-3 py-2 rounded-xl text-sm font-semibold transition-all duration-200",
                style: {
                  color: "oklch(0.38 0.16 185)",
                  background: "oklch(0.55 0.16 185 / 0.08)",
                },
              }}
            >
              ⚡ Motivation
              <ActiveDot />
            </Link>
            <Link
              to="/ape-ai"
              data-ocid="nav.link"
              className="relative px-2 py-1.5 rounded-xl text-sm font-semibold transition-all duration-200"
              style={{
                background: "oklch(0.72 0.22 295 / 0.12)",
                border: "1px solid oklch(0.72 0.22 295 / 0.35)",
                color: "oklch(0.72 0.22 295)",
              }}
              activeProps={{
                className:
                  "relative px-2 py-1.5 rounded-xl text-sm font-semibold transition-all duration-200",
                style: {
                  color: "oklch(0.82 0.22 295)",
                  background: "oklch(0.72 0.22 295 / 0.22)",
                  border: "1px solid oklch(0.72 0.22 295 / 0.7)",
                  boxShadow: "0 0 12px oklch(0.72 0.22 295 / 0.3)",
                },
              }}
            >
              🤖 APE AI
              <ActiveDot />
            </Link>
          </nav>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1">{children}</main>

      {/* Footer — premium */}
      <footer
        className="border-t py-8"
        style={{
          borderColor: "oklch(0.88 0.03 265 / 0.4)",
          background:
            "linear-gradient(to bottom, oklch(0.97 0.01 265), oklch(0.95 0.02 265))",
        }}
      >
        <div className="container mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Brand */}
          <div className="flex items-center gap-2">
            <img
              src="/assets/uploads/file_00000000c20072088a751f25cebbaf19-1.png"
              alt="EduTech Nova Logo"
              className="w-6 h-6 object-contain"
            />
            <div>
              <span className="font-display font-bold text-sm text-foreground">
                EduTech Nova
              </span>
              <span className="text-muted-foreground text-sm ml-1">
                © {new Date().getFullYear()}
              </span>
            </div>
          </div>

          {/* Caffeine attribution */}
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <span>Built with</span>
            <Heart className="w-3.5 h-3.5 fill-amber text-amber" />
            <span>using</span>
            <a
              href={`https://caffeine.ai/?utm_source=caffeine-footer&utm_medium=referral&utm_content=${appId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold hover:underline transition-colors"
              style={{ color: "oklch(0.42 0.22 265)" }}
            >
              caffeine.ai
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Small indicator dot — shown via CSS when parent link is active
function ActiveDot() {
  return (
    <span
      className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full opacity-0 [a[data-status='active']_&]:opacity-100"
      style={{ background: "currentColor" }}
    />
  );
}
