import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useNavigate, useSearch } from "@tanstack/react-router";
import {
  Award,
  Download,
  Home,
  RotateCcw,
  Star,
  Target,
  Trophy,
} from "lucide-react";
import { useEffect, useRef } from "react";

export default function QuizResults() {
  const navigate = useNavigate();
  const search = useSearch({ strict: false }) as {
    score?: number;
    total?: number;
    name?: string;
  };
  const score = search.score ?? 0;
  const total = search.total ?? 0;
  const name = search.name?.trim() || "Student";
  const percentage = total > 0 ? Math.round((score / total) * 100) : 0;
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const getGrade = () => {
    if (percentage >= 90)
      return { label: "Outstanding! 🏆", color: "text-amber" };
    if (percentage >= 75) return { label: "Great Job! 🌟", color: "text-teal" };
    if (percentage >= 60)
      return { label: "Good Effort! 👍", color: "text-amber" };
    if (percentage >= 40)
      return { label: "Keep Practicing! 💪", color: "text-muted-foreground" };
    return { label: "Keep Studying! 📚", color: "text-muted-foreground" };
  };

  const grade = getGrade();

  const getScoreColor = () => {
    if (percentage >= 75) return "text-amber";
    if (percentage >= 50) return "text-teal";
    return "text-muted-foreground";
  };

  // Draw the certificate on canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const W = 1000;
    const H = 700;
    canvas.width = W;
    canvas.height = H;

    const loadImage = (src: string): Promise<HTMLImageElement> =>
      new Promise((resolve) => {
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.onload = () => resolve(img);
        img.onerror = () => resolve(img); // resolve even on error to not block drawing
        img.src = src;
      });

    Promise.all([
      loadImage(
        "/assets/generated/edutech-nova-stamp-transparent.dim_300x300.png",
      ),
      loadImage(
        "/assets/generated/apatra-signature-transparent.dim_300x100.png",
      ),
    ]).then(([stampImg, sigImg]) => {
      // Background — premium cream/ivory
      ctx.fillStyle = "#FFFDF5";
      ctx.fillRect(0, 0, W, H);

      // Subtle diagonal pattern for texture
      ctx.save();
      ctx.strokeStyle = "rgba(201, 168, 76, 0.07)";
      ctx.lineWidth = 1;
      for (let x = -H; x < W + H; x += 30) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x + H, H);
        ctx.stroke();
      }
      ctx.restore();

      // Outer border — deep navy double-line
      ctx.strokeStyle = "#1B2A6B";
      ctx.lineWidth = 3;
      ctx.strokeRect(20, 20, W - 40, H - 40);
      ctx.lineWidth = 1.5;
      ctx.strokeRect(30, 30, W - 60, H - 60);

      // Corner ornaments
      const drawCorner = (cx: number, cy: number, rot: number) => {
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(rot);
        ctx.strokeStyle = "#C9A84C";
        ctx.lineWidth = 2;
        // L-shape ornament
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(40, 0);
        ctx.moveTo(0, 0);
        ctx.lineTo(0, 40);
        ctx.stroke();
        // Diamond
        ctx.fillStyle = "#C9A84C";
        ctx.beginPath();
        ctx.arc(0, 0, 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      };
      drawCorner(38, 38, 0);
      drawCorner(W - 38, 38, Math.PI / 2);
      drawCorner(W - 38, H - 38, Math.PI);
      drawCorner(38, H - 38, -Math.PI / 2);

      // Header — navy filled rectangle
      ctx.fillStyle = "#1B2A6B";
      ctx.fillRect(20, 20, W - 40, 110);

      // Gold divider line under header
      ctx.fillStyle = "#C9A84C";
      ctx.fillRect(20, 130, W - 40, 3);

      // Header text — "EDUTECH NOVA"
      ctx.fillStyle = "#C9A84C";
      ctx.font = "bold 42px Georgia, serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.letterSpacing = "4px";
      ctx.fillText("EDUTECH NOVA", W / 2, 70);

      // Header sub-text — "Certificate of Achievement"
      ctx.font = "italic 22px Georgia, serif";
      ctx.fillStyle = "#F5E6C0";
      ctx.fillText("Certificate of Achievement", W / 2, 108);

      // Body content
      const bodyY = 200;

      // "This is to certify that"
      ctx.font = "italic 20px Georgia, serif";
      ctx.fillStyle = "#888888";
      ctx.fillText("This is to certify that", W / 2, bodyY);

      // Student name — large bold
      ctx.font = "bold 54px Georgia, serif";
      ctx.fillStyle = "#1B2A6B";
      ctx.fillText(name, W / 2, bodyY + 75);

      // Gold underline under name
      const nameMetrics = ctx.measureText(name);
      const nameWidth = Math.min(nameMetrics.width + 40, W - 160);
      const nameUnderlineX = (W - nameWidth) / 2;
      ctx.fillStyle = "#C9A84C";
      ctx.fillRect(nameUnderlineX, bodyY + 97, nameWidth, 3);

      // "has successfully completed the quiz with a score of"
      ctx.font = "italic 20px Georgia, serif";
      ctx.fillStyle = "#888888";
      ctx.fillText(
        "has successfully completed the quiz with a score of",
        W / 2,
        bodyY + 130,
      );

      // Score display
      ctx.font = "bold 36px Georgia, serif";
      ctx.fillStyle = "#1B2A6B";
      ctx.fillText(`${score} / ${total}  (${percentage}%)`, W / 2, bodyY + 178);

      // Date
      const dateStr = new Date().toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
      ctx.font = "16px Georgia, serif";
      ctx.fillStyle = "#999999";
      ctx.fillText(`Date: ${dateStr}`, W / 2, bodyY + 218);

      // Divider line above bottom section
      ctx.strokeStyle = "rgba(27, 42, 107, 0.18)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(60, H - 185);
      ctx.lineTo(W - 60, H - 185);
      ctx.stroke();

      // ---- LEFT SIDE — Stamp ----
      const stampX = 100;
      const stampY = H - 175;
      if (stampImg.complete && stampImg.naturalWidth > 0) {
        ctx.drawImage(stampImg, stampX, stampY, 120, 120);
      } else {
        // Fallback: draw a circle seal
        ctx.beginPath();
        ctx.arc(stampX + 60, stampY + 60, 55, 0, Math.PI * 2);
        ctx.strokeStyle = "#1B2A6B";
        ctx.lineWidth = 3;
        ctx.stroke();
        ctx.font = "bold 10px Georgia, serif";
        ctx.fillStyle = "#1B2A6B";
        ctx.fillText("OFFICIAL SEAL", stampX + 60, stampY + 60);
      }
      ctx.font = "13px Georgia, serif";
      ctx.fillStyle = "#999999";
      ctx.textAlign = "center";
      ctx.fillText("Official Seal", stampX + 60, stampY + 135);

      // ---- RIGHT SIDE — Compact Signature ----
      const sigX = 690;
      const sigLineY = H - 85;

      // Small compact signature image (140x46)
      if (sigImg.complete && sigImg.naturalWidth > 0) {
        ctx.drawImage(sigImg, sigX, sigLineY - 85, 140, 46);
      } else {
        // Fallback: elegant cursive script
        ctx.font = "italic bold 22px 'Palatino Linotype', Georgia, serif";
        ctx.fillStyle = "#1B2A6B";
        ctx.textAlign = "left";
        ctx.fillText("Apatra", sigX + 10, sigLineY - 55);
      }

      // Thin horizontal divider line under signature
      ctx.strokeStyle = "#1B2A6B";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(sigX, sigLineY - 28);
      ctx.lineTo(sigX + 160, sigLineY - 28);
      ctx.stroke();

      // Signature name
      ctx.font = "bold 13px Georgia, serif";
      ctx.fillStyle = "#1B2A6B";
      ctx.textAlign = "center";
      ctx.fillText("Apatra", sigX + 80, sigLineY - 14);

      // Title line — Founder
      ctx.font = "11px Georgia, serif";
      ctx.fillStyle = "#555555";
      ctx.fillText("Founder, EduTech Nova", sigX + 80, sigLineY + 1);

      // "— Signature of Founder —" label at bottom
      ctx.font = "italic 10px Georgia, serif";
      ctx.fillStyle = "#999999";
      ctx.fillText("— Signature of Founder —", sigX + 80, sigLineY + 16);
    });
  }, [name, score, total, percentage]);

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dataUrl = canvas.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = dataUrl;
    a.download = "EduTechNova_Certificate.png";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      {/* Certificate Section */}
      <div
        className="rounded-3xl p-6 md:p-8 border mb-8 animate-fade-in"
        style={{
          background: "oklch(1 0 0)",
          border: "1px solid oklch(0.88 0.03 265 / 0.7)",
          boxShadow:
            "0 8px 40px -8px oklch(0.18 0.08 265 / 0.14), 0 2px 8px -2px oklch(0.18 0.08 265 / 0.06)",
        }}
      >
        {/* Certificate Heading */}
        <div className="flex items-center gap-3 mb-6">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center shadow-glow"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.68 0.20 52), oklch(0.78 0.18 70))",
            }}
          >
            <Award className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="font-display font-bold text-xl text-foreground">
              Your Certificate
            </h2>
            <p className="text-xs text-muted-foreground">
              Download and share your achievement
            </p>
          </div>
        </div>

        {/* Canvas Preview */}
        <div
          data-ocid="certificate.canvas_target"
          className="overflow-auto rounded-2xl border shadow-inner"
          style={{
            maxHeight: "420px",
            background: "oklch(0.96 0.01 265 / 0.5)",
            borderColor: "oklch(0.88 0.03 265 / 0.4)",
          }}
        >
          <canvas
            ref={canvasRef}
            style={{
              maxWidth: "100%",
              height: "auto",
              display: "block",
              margin: "0 auto",
            }}
          />
        </div>

        {/* Download Button */}
        <Button
          data-ocid="certificate.download_button"
          size="lg"
          onClick={handleDownload}
          className="w-full mt-5 text-white font-bold text-base py-5 rounded-2xl shadow-glow hover:scale-[1.02] transition-all duration-200 border-0 h-auto animate-pulse-glow"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.68 0.20 52), oklch(0.78 0.18 70))",
          }}
        >
          <Download className="w-5 h-5 mr-2" />
          Download Certificate
        </Button>
      </div>

      {/* Results Card */}
      <div
        className="rounded-3xl p-8 md:p-10 border text-center animate-scale-in"
        style={{
          background: "oklch(1 0 0)",
          border: "1px solid oklch(0.88 0.03 265 / 0.7)",
          boxShadow:
            "0 8px 40px -8px oklch(0.18 0.08 265 / 0.14), 0 2px 8px -2px oklch(0.18 0.08 265 / 0.06)",
        }}
      >
        {/* Trophy Icon */}
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-glow animate-float"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.68 0.20 52), oklch(0.78 0.18 70))",
          }}
        >
          <Trophy className="w-10 h-10 text-white" />
        </div>

        <h1 className="font-display font-extrabold text-3xl md:text-4xl text-foreground mb-2">
          Quiz Complete!
        </h1>
        {name !== "Student" && (
          <p className="text-muted-foreground text-base mb-1">
            Well done, <span className="font-bold text-foreground">{name}</span>
            !
          </p>
        )}
        <p className={cn("text-xl font-bold mb-8", grade.color)}>
          {grade.label}
        </p>

        {/* Score Circle */}
        <div className="relative w-40 h-40 mx-auto mb-8">
          <svg
            className="w-full h-full -rotate-90"
            viewBox="0 0 100 100"
            aria-hidden="true"
          >
            <circle
              cx="50"
              cy="50"
              r="42"
              fill="none"
              stroke="oklch(0.92 0.03 265)"
              strokeWidth="8"
            />
            <circle
              cx="50"
              cy="50"
              r="42"
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
            <span
              className={cn("font-display font-bold text-4xl", getScoreColor())}
            >
              {percentage}%
            </span>
            <span className="text-xs text-muted-foreground font-semibold">
              Score
            </span>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div
            className="rounded-2xl p-4"
            style={{ background: "oklch(0.95 0.02 265 / 0.6)" }}
          >
            <div className="flex items-center justify-center mb-1">
              <Target className="w-5 h-5 text-indigo" />
            </div>
            <p className="font-display font-bold text-2xl text-foreground">
              {total}
            </p>
            <p className="text-xs text-muted-foreground font-semibold">Total</p>
          </div>
          <div
            className="rounded-2xl p-4"
            style={{ background: "oklch(0.92 0.06 185 / 0.5)" }}
          >
            <div className="flex items-center justify-center mb-1">
              <Star className="w-5 h-5 text-teal" />
            </div>
            <p className="font-display font-bold text-2xl text-teal">{score}</p>
            <p className="text-xs text-muted-foreground font-semibold">
              Correct
            </p>
          </div>
          <div
            className="rounded-2xl p-4"
            style={{ background: "oklch(0.56 0.22 27 / 0.08)" }}
          >
            <div className="flex items-center justify-center mb-1">
              <span className="text-destructive text-lg font-bold">✗</span>
            </div>
            <p className="font-display font-bold text-2xl text-destructive">
              {total - score}
            </p>
            <p className="text-xs text-muted-foreground font-semibold">Wrong</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-3">
          <Button
            data-ocid="results.primary_button"
            size="lg"
            onClick={() => navigate({ to: "/quiz" })}
            className="w-full text-white font-bold text-base py-5 rounded-2xl shadow-glow-indigo hover:scale-[1.02] transition-all duration-200 border-0 h-auto"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.42 0.22 265), oklch(0.52 0.24 285))",
            }}
          >
            <RotateCcw className="w-5 h-5 mr-2" />
            Try Again
          </Button>
          <Button
            data-ocid="results.secondary_button"
            size="lg"
            variant="outline"
            onClick={() => navigate({ to: "/" })}
            className="w-full font-bold text-base py-5 rounded-2xl h-auto border-2"
            style={{
              borderColor: "oklch(0.88 0.03 265 / 0.8)",
            }}
          >
            <Home className="w-5 h-5 mr-2" />
            Back to Home
          </Button>
        </div>
      </div>
    </div>
  );
}
