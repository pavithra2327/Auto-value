import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Brain, Upload, BarChart3, Shield, Zap, TrendingUp, ChevronRight, Car, Bike, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroBg from "@/assets/hero-bg.jpg";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: "easeOut" as const },
  }),
};

const Landing = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <nav className="fixed top-0 w-full z-50 glass-strong">
        <div className="container mx-auto flex items-center justify-between py-4 px-6">
          <Link to="/" className="flex items-center gap-2">
            <Brain className="h-7 w-7 text-primary" />
            <span className="text-xl font-bold text-foreground">AutoIntel <span className="text-gradient">AI</span></span>
          </Link>
          <Link to="/predict">
            <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
              Get Started <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0">
          <img src={heroBg} alt="" className="w-full h-full object-cover opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/40" />
        </div>

        <div className="relative container mx-auto px-6 text-center">
          <motion.div initial="hidden" animate="visible" className="max-w-4xl mx-auto">
            <motion.div variants={fadeUp} custom={0} className="inline-flex items-center gap-2 glass px-4 py-2 mb-8">
              <Zap className="h-4 w-4 text-primary" />
              <span className="text-sm text-muted-foreground">AI-Powered Vehicle Intelligence</span>
            </motion.div>

            <motion.h1 variants={fadeUp} custom={1} className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
              Know the <span className="text-gradient">True Value</span> of Any Vehicle
            </motion.h1>

            <motion.p variants={fadeUp} custom={2} className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
              From cycles to heavy trucks — get instant AI price predictions, condition scoring, and smart buy/sell recommendations.
            </motion.p>

            <motion.div variants={fadeUp} custom={3} className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/predict">
                <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 glow text-lg px-8 py-6">
                  Analyze Your Vehicle
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </motion.div>

            <motion.div variants={fadeUp} custom={4} className="mt-16 flex items-center justify-center gap-8 text-muted-foreground">
              <div className="flex items-center gap-2">
                <Car className="h-5 w-5 text-primary" />
                <span className="text-sm">Cars & SUVs</span>
              </div>
              <div className="flex items-center gap-2">
                <Bike className="h-5 w-5 text-primary" />
                <span className="text-sm">Bikes & Scooters</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="h-5 w-5 text-primary" />
                <span className="text-sm">Trucks & Heavy</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 relative">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">Three simple steps to get comprehensive vehicle intelligence</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { icon: Upload, title: "Upload Details", desc: "Enter vehicle specs and upload photos for AI analysis", step: "01" },
              { icon: Brain, title: "AI Analysis", desc: "Our models evaluate condition, market trends, and pricing data", step: "02" },
              { icon: BarChart3, title: "Get Results", desc: "Receive price prediction, condition score, and buy recommendation", step: "03" },
            ].map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="glass p-8 text-center group hover:glow transition-shadow duration-500"
              >
                <div className="text-xs font-bold text-primary mb-4">{item.step}</div>
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-5 group-hover:bg-primary/20 transition-colors">
                  <item.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 relative">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Platform Features</h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { icon: Brain, title: "AI Price Prediction", desc: "ML models trained on market data for accurate valuations" },
              { icon: Shield, title: "Condition Scoring", desc: "0-100 score based on age, mileage, and condition" },
              { icon: TrendingUp, title: "Negotiation Range", desc: "Smart ±10% price range for negotiations" },
              { icon: BarChart3, title: "Pros & Cons Analysis", desc: "Automated vehicle strength and weakness assessment" },
              { icon: Zap, title: "Instant Results", desc: "Get comprehensive analysis in seconds" },
              { icon: Upload, title: "Image Analysis", desc: "Upload photos for visual condition assessment" },
            ].map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="glass p-6 group hover:glow transition-shadow duration-500"
              >
                <f.icon className="h-6 w-6 text-primary mb-3" />
                <h3 className="font-semibold mb-1">{f.title}</h3>
                <p className="text-sm text-muted-foreground">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="glass-strong glow p-12 md:p-16 text-center max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
              Analyze any vehicle in seconds with our AI-powered platform.
            </p>
            <Link to="/predict">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 text-lg px-8 py-6">
                Start Free Analysis <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="container mx-auto px-6 text-center text-sm text-muted-foreground">
          © 2026 AutoIntel AI. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Landing;
