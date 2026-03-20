import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useNavigate, useSearch } from "@tanstack/react-router";
import {
  Award,
  Download,
  Home,
  Leaf,
  RotateCcw,
  Star,
  Target,
  Trophy,
} from "lucide-react";
import { useEffect, useRef } from "react";

export default function NeetQuizResults() {
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

  const getGrade = (): { label: string; letter: string; color: string } => {
    if (percentage >= 90)
      return { label: "Outstanding! 🏆", letter: "A+", color: "text-amber" };
    if (percentage >= 75)
      return { label: "Excellent! 🌟", letter: "A", color: "text-amber" };
    if (percentage >= 60)
      return { label: "Good Effort! 👍", letter: "B", color: "text-teal" };
    if (percentage >= 45)
      return {
        label: "Keep Practicing! 💪",
        letter: "C",
        color: "text-muted-foreground",
      };
    if (percentage >= 30)
      return {
        label: "Need More Study 📚",
        letter: "D",
        color: "text-muted-foreground",
      };
    return {
      label: "Keep Studying! 📖",
      letter: "F",
      color: "text-destructive",
    };
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
    const H = 720;
    canvas.width = W;
    canvas.height = H;

    const loadImage = (src: string): Promise<HTMLImageElement> =>
      new Promise((resolve) => {
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.onload = () => resolve(img);
        img.onerror = () => resolve(img);
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
      ctx.strokeStyle = "rgba(64, 150, 80, 0.06)";
      ctx.lineWidth = 1;
      for (let x = -H; x < W + H; x += 30) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x + H, H);
        ctx.stroke();
      }
      ctx.restore();

      // Outer border — deep green double-line
      ctx.strokeStyle = "#1A5C2A";
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
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(40, 0);
        ctx.moveTo(0, 0);
        ctx.lineTo(0, 40);
        ctx.stroke();
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

      // Header — deep green filled rectangle
      ctx.fillStyle = "#1A5C2A";
      ctx.fillRect(20, 20, W - 40, 120);

      // Gold divider line under header
      ctx.fillStyle = "#C9A84C";
      ctx.fillRect(20, 140, W - 40, 3);

      // Header text — "EDUTECH NOVA"
      ctx.fillStyle = "#C9A84C";
      ctx.font = "bold 38px Georgia, serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("EDUTECH NOVA", W / 2, 68);

      // Subtitle — "NEET Challenge"
      ctx.font = "italic 20px Georgia, serif";
      ctx.fillStyle = "#F5E6C0";
      ctx.fillText("NEET Challenge — Certificate of Achievement", W / 2, 105);

      // Body
      const bodyY = 205;

      ctx.font = "italic 20px Georgia, serif";
      ctx.fillStyle = "#888888";
      ctx.fillText("This is to certify that", W / 2, bodyY);

      // Student name
      ctx.font = "bold 52px Georgia, serif";
      ctx.fillStyle = "#1A5C2A";
      ctx.fillText(name, W / 2, bodyY + 72);

      // Gold underline under name
      const nameMetrics = ctx.measureText(name);
      const nameWidth = Math.min(nameMetrics.width + 40, W - 160);
      const nameUnderlineX = (W - nameWidth) / 2;
      ctx.fillStyle = "#C9A84C";
      ctx.fillRect(nameUnderlineX, bodyY + 95, nameWidth, 3);

      ctx.font = "italic 20px Georgia, serif";
      ctx.fillStyle = "#888888";
      ctx.fillText(
        "has successfully completed the NEET Quiz with a score of",
        W / 2,
        bodyY + 130,
      );

      // Score
      ctx.font = "bold 36px Georgia, serif";
      ctx.fillStyle = "#1A5C2A";
      ctx.fillText(`${score} / ${total}  (${percentage}%)`, W / 2, bodyY + 175);

      // Grade badge area
      const gradeLetterDisplay = grade.letter;
      ctx.font = "bold 28px Georgia, serif";
      ctx.fillStyle = "#C9A84C";
      ctx.fillText(`Grade: ${gradeLetterDisplay}`, W / 2, bodyY + 215);

      // Date
      const dateStr = new Date().toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
      ctx.font = "16px Georgia, serif";
      ctx.fillStyle = "#999999";
      ctx.fillText(`Date: ${dateStr}`, W / 2, bodyY + 250);

      // Divider
      ctx.strokeStyle = "rgba(26, 92, 42, 0.18)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(60, H - 185);
      ctx.lineTo(W - 60, H - 185);
      ctx.stroke();

      // ---- LEFT — Stamp ----
      const stampX = 100;
      const stampY = H - 175;
      if (stampImg.complete && stampImg.naturalWidth > 0) {
        ctx.drawImage(stampImg, stampX, stampY, 120, 120);
      } else {
        ctx.beginPath();
        ctx.arc(stampX + 60, stampY + 60, 55, 0, Math.PI * 2);
        ctx.strokeStyle = "#1A5C2A";
        ctx.lineWidth = 3;
        ctx.stroke();
        ctx.font = "bold 10px Georgia, serif";
        ctx.fillStyle = "#1A5C2A";
        ctx.fillText("OFFICIAL SEAL", stampX + 60, stampY + 60);
      }
      ctx.font = "13px Georgia, serif";
      ctx.fillStyle = "#999999";
      ctx.textAlign = "center";
      ctx.fillText("Official Seal", stampX + 60, stampY + 135);

      // ---- RIGHT — Signature ----
      const sigX = 690;
      const sigLineY = H - 85;

      if (sigImg.complete && sigImg.naturalWidth > 0) {
        ctx.drawImage(sigImg, sigX, sigLineY - 85, 140, 46);
      } else {
        ctx.font = "italic bold 22px 'Palatino Linotype', Georgia, serif";
        ctx.fillStyle = "#1A5C2A";
        ctx.textAlign = "left";
        ctx.fillText("Apatra", sigX + 10, sigLineY - 55);
      }

      ctx.strokeStyle = "#1A5C2A";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(sigX, sigLineY - 28);
      ctx.lineTo(sigX + 160, sigLineY - 28);
      ctx.stroke();

      ctx.font = "bold 13px Georgia, serif";
      ctx.fillStyle = "#1A5C2A";
      ctx.textAlign = "center";
      ctx.fillText("Apatra", sigX + 80, sigLineY - 14);

      ctx.font = "11px Georgia, serif";
      ctx.fillStyle = "#555555";
      ctx.fillText("Founder, EduTech Nova", sigX + 80, sigLineY + 1);

      ctx.font = "italic 10px Georgia, serif";
      ctx.fillStyle = "#999999";
      ctx.fillText("— Signature of Founder —", sigX + 80, sigLineY + 16);
    });
  }, [name, score, total, percentage, grade.letter]);

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dataUrl = canvas.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = dataUrl;
    a.download = "EduTechNova_NEET_Certificate.png";
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
          border: "1px solid oklch(0.88 0.04 145 / 0.7)",
          boxShadow:
            "0 8px 40px -8px oklch(0.18 0.08 145 / 0.14), 0 2px 8px -2px oklch(0.18 0.08 145 / 0.06)",
        }}
      >
        <div className="flex items-center gap-3 mb-6">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.68 0.20 52), oklch(0.78 0.18 70))",
              boxShadow: "0 4px 12px -2px oklch(0.68 0.20 52 / 0.4)",
            }}
          >
            <Award className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="font-display font-bold text-xl text-foreground">
              Your NEET Certificate
            </h2>
            <p className="text-xs text-muted-foreground">
              Download and share your achievement
            </p>
          </div>
        </div>

        {/* Canvas Preview */}
        <div
          data-ocid="neet.certificate.canvas_target"
          className="overflow-auto rounded-2xl border shadow-inner"
          style={{
            maxHeight: "420px",
            background: "oklch(0.96 0.01 145 / 0.5)",
            borderColor: "oklch(0.88 0.04 145 / 0.4)",
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
          data-ocid="neet.certificate.download_button"
          size="lg"
          onClick={handleDownload}
          className="w-full mt-5 text-white font-bold text-base py-5 rounded-2xl hover:scale-[1.02] transition-all duration-200 border-0 h-auto"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.68 0.20 52), oklch(0.78 0.18 70))",
            boxShadow: "0 4px 20px -4px oklch(0.68 0.20 52 / 0.4)",
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
          border: "1px solid oklch(0.88 0.04 145 / 0.7)",
          boxShadow:
            "0 8px 40px -8px oklch(0.18 0.08 145 / 0.14), 0 2px 8px -2px oklch(0.18 0.08 145 / 0.06)",
        }}
      >
        {/* Trophy */}
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-glow animate-float"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.40 0.18 145), oklch(0.52 0.20 160))",
          }}
        >
          <Trophy className="w-10 h-10 text-white" />
        </div>

        <h1 className="font-display font-extrabold text-3xl md:text-4xl text-foreground mb-2">
          NEET Quiz Complete!
        </h1>
        {name !== "Student" && (
          <p className="text-muted-foreground text-base mb-1">
            Well done, <span className="font-bold text-foreground">{name}</span>
            !
          </p>
        )}
        <p className={cn("text-xl font-bold mb-4", grade.color)}>
          {grade.label}
        </p>

        {/* Grade Badge */}
        <div className="flex justify-center mb-6">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center font-display font-extrabold text-2xl text-white shadow-glow"
            style={{
              background:
                percentage >= 75
                  ? "linear-gradient(135deg, oklch(0.68 0.20 52), oklch(0.78 0.18 70))"
                  : percentage >= 45
                    ? "linear-gradient(135deg, oklch(0.40 0.18 145), oklch(0.52 0.20 160))"
                    : "linear-gradient(135deg, oklch(0.55 0.16 185), oklch(0.42 0.22 265))",
            }}
          >
            {grade.letter}
          </div>
        </div>

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
              stroke="oklch(0.92 0.04 145)"
              strokeWidth="8"
            />
            <circle
              cx="50"
              cy="50"
              r="42"
              fill="none"
              stroke="oklch(0.40 0.18 145)"
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
            style={{ background: "oklch(0.95 0.03 145 / 0.6)" }}
          >
            <div className="flex items-center justify-center mb-1">
              <Target
                className="w-5 h-5"
                style={{ color: "oklch(0.40 0.18 145)" }}
              />
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
            data-ocid="neet.results.primary_button"
            size="lg"
            onClick={() => navigate({ to: "/neet-quiz" })}
            className="w-full text-white font-bold text-base py-5 rounded-2xl hover:scale-[1.02] transition-all duration-200 border-0 h-auto"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.40 0.18 145), oklch(0.52 0.20 160))",
              boxShadow: "0 4px 20px -4px oklch(0.40 0.18 145 / 0.4)",
            }}
          >
            <RotateCcw className="w-5 h-5 mr-2" />
            Try Again
          </Button>
          <Button
            data-ocid="neet.results.secondary_button"
            size="lg"
            variant="outline"
            onClick={() => navigate({ to: "/" })}
            className="w-full font-bold text-base py-5 rounded-2xl h-auto border-2"
            style={{
              borderColor: "oklch(0.88 0.04 145 / 0.8)",
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
