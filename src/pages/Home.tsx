import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { Star, PenTool, LayoutGrid, ArrowRight, CheckCircle2, Quote, Sparkles } from "lucide-react";
import { cn } from "@/src/lib/utils";

const services = [
  {
    title: "Vedic Kundli",
    description: "Deep-dive Parashar analysis of your birth charts with AI precision.",
    icon: Star,
    path: "/kundli",
    color: "text-celestial-gold",
    bg: "bg-celestial-gold/10"
  },
  {
    title: "Hastrekha",
    description: "Palmistry reimagined. Detailed line analysis for future foresight.",
    icon: PenTool,
    path: "/palmistry",
    color: "text-ethereal-blue",
    bg: "bg-ethereal-blue/10"
  },
  {
    title: "Numerology",
    description: "Unlock the secrets hidden in your name and date of birth.",
    icon: LayoutGrid,
    path: "/numerology",
    color: "text-starlight",
    bg: "bg-white/5"
  }
];

const testimonials = [
  {
    name: "Anupam Sharma",
    role: "Entrepreneur",
    content: "The AI analysis is surprisingly deep. It caught nuances that traditional charts often miss.",
    avatar: "https://i.pravatar.cc/150?u=anupam"
  },
  {
    name: "Priya Verma",
    role: "Career Coach",
    content: "AB Kundli's research section on career transitions was spot on. Highly recommended.",
    avatar: "https://i.pravatar.cc/150?u=priya"
  }
];

export function Home() {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 natural-gradient opacity-100" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/sandpaper.png')] opacity-20" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-50 border border-orange-100 mb-8">
              <Sparkles className="w-4 h-4 text-accent-orange" />
              <span className="text-xs font-bold tracking-widest uppercase text-accent-orange">पाराशर रिसर्च लैब द्वारा प्रमाणित</span>
            </div>
            
            <h1 className="section-title md:text-7xl lg:text-8xl text-gray-800">
              Ancient Wisdom <br />
              <span className="text-accent-orange font-hindi">AI Powered</span>
            </h1>
            
            <p className="max-w-2xl mx-auto text-gray-500 text-lg md:text-xl mb-12 leading-relaxed">
              Experience the future of astrology. AB Kundli combines traditional Parashar principles 
              with deep AI research for 99.9% accurate calculations.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/kundli"
                className="w-full sm:w-auto px-10 py-4 bg-orange-900 text-white font-bold rounded-full shadow-xl shadow-orange-900/20 hover:opacity-90 transition-all transform hover:-translate-y-1"
              >
                कुंडली देखें
              </Link>
              <Link
                to="/blog"
                className="w-full sm:w-auto px-10 py-4 soft-card text-gray-700 font-bold hover:bg-stone-50 transition-all flex items-center justify-center gap-2"
              >
                Read Research <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-32 bg-natural-bg relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="section-title">पाराशर कुंडली और सेवाएं</h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              AI-सक्षम गणना के साथ सटीक ग्रह स्थिति और पौराणिक सूत्रों का संगम।
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, i) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="soft-card p-10 hover:border-accent-orange/30 transition-all group cursor-pointer"
              >
                <div className={cn("w-16 h-16 rounded-2xl flex items-center justify-center mb-8 transition-transform group-hover:scale-110", 
                  service.title === "Vedic Kundli" ? "bg-orange-50" : 
                  service.title === "Hastrekha" ? "bg-green-50" : "bg-stone-50")}>
                  <service.icon className={cn("w-8 h-8", 
                    service.title === "Vedic Kundli" ? "text-orange-800" : 
                    service.title === "Hastrekha" ? "text-green-800" : "text-stone-800")} />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-800">{service.title}</h3>
                <p className="text-gray-500 mb-8 leading-relaxed">
                  {service.description}
                </p>
                <Link to={service.path} className="inline-flex items-center gap-2 font-bold text-accent-orange hover:gap-3 transition-all">
                  Analyze Now <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why AB Kundli */}
      <section className="py-32 bg-stone-surface relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="flex-1">
              <h2 className="section-title text-gray-800 mb-8">Difference from Others?</h2>
              <div className="space-y-6">
                {[
                  "99.9% accurate calculations via Parashar Engine",
                  "Clean UI (No clutter, No aggressive ads)",
                  "Verified Vedic Research & AI Insights",
                  "Hindi/English Bilingual Context",
                  "Ethical guidance and psychological remedies"
                ].map((item) => (
                  <div key={item} className="flex items-start gap-4">
                    <div className="mt-1 p-1 bg-green-100 rounded-full">
                      <CheckCircle2 className="w-4 h-4 text-green-700" />
                    </div>
                    <span className="text-gray-600 text-lg">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex-1 w-full flex justify-center">
              <div className="relative w-full max-w-md aspect-square rounded-3xl soft-card flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-stone-100/40 z-10" />
                <img 
                  src="https://images.unsplash.com/photo-1515940175183-6798529cb860?auto=format&fit=crop&q=80&w=800" 
                  alt="Professional Astrology"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute z-20 text-center px-6">
                  <div className="bg-white/90 p-6 rounded-2xl border border-border-soft backdrop-blur-sm">
                    <p className="font-hindi text-xl text-accent-orange mb-2 italic">\"AI-सक्षम गणना का संगम\"</p>
                    <p className="text-xs font-bold uppercase text-gray-400 tracking-widest">Techno-Vedic Excellence</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-32 bg-natural-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20 text-gray-800">
             <h2 className="section-title">उपयोगकर्ता अनुभव</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((t) => (
              <div key={t.name} className="soft-card p-10 relative overflow-hidden">
                <Quote className="absolute top-10 right-10 w-12 h-12 text-stone-100" />
                <div className="absolute top-0 left-0 w-2 h-full bg-accent-orange opacity-20" />
                <p className="text-xl text-gray-600 italic mb-8 relative z-10 leading-relaxed">"{t.content}"</p>
                <div className="flex items-center gap-4">
                  <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full border-2 border-border-soft" referrerPolicy="no-referrer" />
                  <div>
                    <h4 className="font-bold text-gray-800">{t.name}</h4>
                    <p className="text-sm text-gray-400">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
