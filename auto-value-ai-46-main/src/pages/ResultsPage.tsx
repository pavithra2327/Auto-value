import { useLocation, Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Brain, CheckCircle2, XCircle, ChevronRight, ArrowLeft, TrendingUp, TrendingDown, DollarSign, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { PredictionResult, VehicleInput } from "@/services/predictionService";

const ConditionMeter = ({ score }: { score: number }) => {
  const circumference = 2 * Math.PI * 54;
  const offset = circumference - (score / 100) * circumference;
  const color = score >= 70 ? "hsl(var(--success))" : score >= 40 ? "hsl(var(--warning))" : "hsl(var(--destructive))";

  return (
    <div className="relative w-36 h-36 mx-auto">
      <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
        <circle cx="60" cy="60" r="54" fill="none" stroke="hsl(var(--border))" strokeWidth="8" />
        <motion.circle
          cx="60" cy="60" r="54" fill="none" stroke={color} strokeWidth="8" strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.span
          className="text-3xl font-bold"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {score}
        </motion.span>
      </div>
    </div>
  );
};

const ResultsPage = () => {
  const location = useLocation();
  const state = location.state as { result: PredictionResult; input: VehicleInput; imagePreview: string | null } | null;

  if (!state) return <Navigate to="/predict" replace />;

  const { result, input, imagePreview } = state;

  const recColor = result.recommendation === "Good Deal"
    ? "bg-success/20 text-success"
    : result.recommendation === "Negotiate"
    ? "bg-warning/20 text-warning"
    : "bg-destructive/20 text-destructive";

  const fadeUp = (i: number) => ({
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { delay: i * 0.1, duration: 0.5 },
  });

  return (
    <div className="min-h-screen bg-background">
      <nav className="fixed top-0 w-full z-50 glass-strong">
        <div className="container mx-auto flex items-center justify-between py-4 px-6">
          <Link to="/" className="flex items-center gap-2">
            <Brain className="h-7 w-7 text-primary" />
            <span className="text-xl font-bold text-foreground">AutoIntel <span className="text-gradient">AI</span></span>
          </Link>
          <Link to="/predict">
            <Button size="sm" variant="outline" className="border-border">
              New Analysis
            </Button>
          </Link>
        </div>
      </nav>

      <div className="pt-28 pb-16 container mx-auto px-6">
        <motion.div {...fadeUp(0)} className="mb-6">
          <Link to="/predict" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="mr-1 h-4 w-4" /> Back to form
          </Link>
        </motion.div>

        <motion.h1 {...fadeUp(0)} className="text-3xl font-bold mb-2">
          Analysis Results
        </motion.h1>
        <motion.p {...fadeUp(1)} className="text-muted-foreground mb-8">
          {input.brand} {input.model} · {input.year} · {input.kmsDriven.toLocaleString()} km
        </motion.p>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image + Price */}
            <div className="grid sm:grid-cols-2 gap-6">
              {imagePreview && (
                <motion.div {...fadeUp(2)} className="glass overflow-hidden">
                  <img src={imagePreview} alt="Vehicle" className="w-full h-56 object-cover" />
                </motion.div>
              )}
              <motion.div {...fadeUp(3)} className="glass glow p-6 flex flex-col justify-center">
                <div className="flex items-center gap-2 text-muted-foreground mb-2">
                  <DollarSign className="h-4 w-4 text-primary" />
                  <span className="text-sm">Predicted Price</span>
                </div>
                <div className="text-4xl font-bold text-gradient mb-4">
                  ${result.predictedPrice.toLocaleString()}
                </div>
                <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-semibold ${recColor} w-fit`}>
                  <Shield className="h-4 w-4" />
                  {result.recommendation}
                </div>
              </motion.div>
            </div>

            {/* Negotiation Range */}
            <motion.div {...fadeUp(4)} className="glass p-6">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" /> Negotiation Range
              </h3>
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <div className="flex justify-between text-sm text-muted-foreground mb-2">
                    <span className="flex items-center gap-1"><TrendingDown className="h-3 w-3" /> Low</span>
                    <span className="flex items-center gap-1">High <TrendingUp className="h-3 w-3" /></span>
                  </div>
                  <div className="h-3 bg-secondary rounded-full relative overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-primary/60 via-primary to-primary/60 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 1, ease: "easeOut" }}
                    />
                  </div>
                  <div className="flex justify-between text-sm font-semibold mt-2">
                    <span>${result.negotiationRange.low.toLocaleString()}</span>
                    <span>${result.negotiationRange.high.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Pros & Cons */}
            <div className="grid sm:grid-cols-2 gap-6">
              <motion.div {...fadeUp(5)} className="glass p-6">
                <h3 className="font-semibold mb-4 text-success">Pros</h3>
                <ul className="space-y-3">
                  {result.pros.map((p, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-success mt-0.5 shrink-0" />
                      <span className="text-muted-foreground">{p}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
              <motion.div {...fadeUp(6)} className="glass p-6">
                <h3 className="font-semibold mb-4 text-destructive">Cons</h3>
                <ul className="space-y-3">
                  {result.cons.map((c, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <XCircle className="h-4 w-4 text-destructive mt-0.5 shrink-0" />
                      <span className="text-muted-foreground">{c}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>

          {/* Right column */}
          <div className="space-y-6">
            <motion.div {...fadeUp(3)} className="glass p-6 text-center">
              <h3 className="font-semibold mb-4">Condition Score</h3>
              <ConditionMeter score={result.conditionScore} />
              <p className="text-sm text-muted-foreground mt-4">
                {result.conditionScore >= 70 ? "Excellent condition" : result.conditionScore >= 40 ? "Average condition" : "Below average"}
              </p>
            </motion.div>

            <motion.div {...fadeUp(4)} className="glass p-6">
              <h3 className="font-semibold mb-3">Vehicle Summary</h3>
              <div className="space-y-2 text-sm">
                {[
                  ["Type", input.vehicleType],
                  ["Brand", input.brand],
                  ["Model", input.model],
                  ["Year", input.year],
                  ["KMs Driven", input.kmsDriven.toLocaleString()],
                  ["Fuel", input.fuelType],
                  ["Transmission", input.transmission],
                  ["Owners", input.owners],
                ].map(([label, val]) => (
                  <div key={label as string} className="flex justify-between">
                    <span className="text-muted-foreground">{label}</span>
                    <span className="font-medium capitalize">{val}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <Link to="/predict">
              <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                Analyze Another Vehicle <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsPage;
