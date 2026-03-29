import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { Brain, ChevronLeft, ChevronRight, Upload, ImageIcon, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { vehicleTypes, fuelTypes, transmissionTypes } from "@/lib/vehicleData";
import { simulatePrediction, type VehicleInput } from "@/services/predictionService";

const steps = ["Vehicle Type", "Vehicle Details", "Condition & Image"];

const PredictPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [form, setForm] = useState({
    vehicleType: "",
    brand: "",
    model: "",
    year: 2020,
    kmsDriven: 30000,
    fuelType: "",
    transmission: "",
    owners: 1,
    conditionRating: 7,
  });

  const updateField = (field: string, value: string | number) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  }, []);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const canNext = () => {
    if (step === 0) return !!form.vehicleType;
    if (step === 1) return !!form.brand && !!form.model && !!form.fuelType && !!form.transmission;
    return true;
  };

  const handleSubmit = async () => {
    setLoading(true);
    // Simulate API delay
    await new Promise((r) => setTimeout(r, 2000));
    const input: VehicleInput = { ...form, image: image || undefined };
    const result = simulatePrediction(input);
    setLoading(false);
    navigate("/results", { state: { result, input, imagePreview } });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <nav className="fixed top-0 w-full z-50 glass-strong">
        <div className="container mx-auto flex items-center justify-between py-4 px-6">
          <Link to="/" className="flex items-center gap-2">
            <Brain className="h-7 w-7 text-primary" />
            <span className="text-xl font-bold text-foreground">AutoIntel <span className="text-gradient">AI</span></span>
          </Link>
        </div>
      </nav>

      <div className="pt-28 pb-16 container mx-auto px-6 max-w-2xl">
        {/* Progress */}
        <div className="flex items-center justify-between mb-10">
          {steps.map((s, i) => (
            <div key={s} className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-colors ${
                i <= step ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"
              }`}>
                {i + 1}
              </div>
              <span className={`text-sm hidden sm:inline ${i <= step ? "text-foreground" : "text-muted-foreground"}`}>{s}</span>
              {i < steps.length - 1 && <div className={`w-12 sm:w-20 h-0.5 mx-2 ${i < step ? "bg-primary" : "bg-border"}`} />}
            </div>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="glass glow p-16 text-center"
            >
              <div className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-6" />
              <h3 className="text-xl font-semibold mb-2">Analyzing Vehicle...</h3>
              <p className="text-muted-foreground">Our AI is evaluating your vehicle data</p>
            </motion.div>
          ) : (
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="glass p-8"
            >
              {step === 0 && (
                <div>
                  <h2 className="text-2xl font-bold mb-6">Select Vehicle Type</h2>
                  <div className="grid grid-cols-3 gap-3">
                    {vehicleTypes.map((vt) => (
                      <button
                        key={vt.value}
                        onClick={() => updateField("vehicleType", vt.value)}
                        className={`p-4 rounded-xl border text-center text-sm font-medium transition-all ${
                          form.vehicleType === vt.value
                            ? "border-primary bg-primary/10 text-foreground glow"
                            : "border-border bg-secondary/50 text-muted-foreground hover:border-primary/50"
                        }`}
                      >
                        {vt.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {step === 1 && (
                <div className="space-y-5">
                  <h2 className="text-2xl font-bold mb-6">Vehicle Details</h2>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-muted-foreground mb-1.5 block">Brand</Label>
                      <Input value={form.brand} onChange={(e) => updateField("brand", e.target.value)} placeholder="e.g. Toyota" className="bg-secondary/50 border-border" />
                    </div>
                    <div>
                      <Label className="text-muted-foreground mb-1.5 block">Model</Label>
                      <Input value={form.model} onChange={(e) => updateField("model", e.target.value)} placeholder="e.g. Camry" className="bg-secondary/50 border-border" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-muted-foreground mb-1.5 block">Year</Label>
                      <Input type="number" value={form.year} onChange={(e) => updateField("year", parseInt(e.target.value) || 2020)} className="bg-secondary/50 border-border" />
                    </div>
                    <div>
                      <Label className="text-muted-foreground mb-1.5 block">KMs Driven</Label>
                      <Input type="number" value={form.kmsDriven} onChange={(e) => updateField("kmsDriven", parseInt(e.target.value) || 0)} className="bg-secondary/50 border-border" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-muted-foreground mb-1.5 block">Fuel Type</Label>
                      <Select value={form.fuelType} onValueChange={(v) => updateField("fuelType", v)}>
                        <SelectTrigger className="bg-secondary/50 border-border"><SelectValue placeholder="Select" /></SelectTrigger>
                        <SelectContent>{fuelTypes.map((f) => <SelectItem key={f.value} value={f.value}>{f.label}</SelectItem>)}</SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="text-muted-foreground mb-1.5 block">Transmission</Label>
                      <Select value={form.transmission} onValueChange={(v) => updateField("transmission", v)}>
                        <SelectTrigger className="bg-secondary/50 border-border"><SelectValue placeholder="Select" /></SelectTrigger>
                        <SelectContent>{transmissionTypes.map((t) => <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>)}</SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div>
                    <Label className="text-muted-foreground mb-1.5 block">Number of Owners</Label>
                    <Input type="number" min={1} max={10} value={form.owners} onChange={(e) => updateField("owners", parseInt(e.target.value) || 1)} className="bg-secondary/50 border-border" />
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold mb-6">Condition & Image</h2>
                  <div>
                    <Label className="text-muted-foreground mb-3 block">
                      Condition Rating: <span className="text-foreground font-semibold">{form.conditionRating}/10</span>
                    </Label>
                    <Slider
                      value={[form.conditionRating]}
                      onValueChange={([v]) => updateField("conditionRating", v)}
                      max={10}
                      min={1}
                      step={1}
                      className="py-2"
                    />
                  </div>

                  <div>
                    <Label className="text-muted-foreground mb-3 block">Upload Vehicle Image (optional)</Label>
                    {imagePreview ? (
                      <div className="relative rounded-xl overflow-hidden border border-border">
                        <img src={imagePreview} alt="Vehicle" className="w-full h-48 object-cover" />
                        <button
                          onClick={() => { setImage(null); setImagePreview(null); }}
                          className="absolute top-2 right-2 p-1.5 rounded-full bg-background/80 text-foreground hover:bg-destructive hover:text-destructive-foreground transition-colors"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ) : (
                      <div
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={handleImageDrop}
                        className="border-2 border-dashed border-border rounded-xl p-10 text-center cursor-pointer hover:border-primary/50 transition-colors"
                      >
                        <input type="file" accept="image/*" onChange={handleImageSelect} className="hidden" id="img-upload" />
                        <label htmlFor="img-upload" className="cursor-pointer">
                          <ImageIcon className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
                          <p className="text-sm text-muted-foreground">Drag & drop or click to upload</p>
                        </label>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Navigation */}
              <div className="flex justify-between mt-8">
                <Button
                  variant="outline"
                  onClick={() => step === 0 ? navigate("/") : setStep((s) => s - 1)}
                  className="border-border text-foreground"
                >
                  <ChevronLeft className="mr-1 h-4 w-4" />
                  {step === 0 ? "Home" : "Back"}
                </Button>

                {step < 2 ? (
                  <Button onClick={() => setStep((s) => s + 1)} disabled={!canNext()} className="bg-primary text-primary-foreground hover:bg-primary/90">
                    Next <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                ) : (
                  <Button onClick={handleSubmit} className="bg-primary text-primary-foreground hover:bg-primary/90 glow">
                    <Upload className="mr-2 h-4 w-4" /> Analyze Vehicle
                  </Button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default PredictPage;
