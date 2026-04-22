import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { geminiService } from "@/src/services/geminiService";
import { Sparkles, Loader2, Calendar, Clock, MapPin, User, ChevronRight, Star } from "lucide-react";
import { cn } from "@/src/lib/utils";
import ReactMarkdown from "react-markdown";

import { NorthIndianChart } from '../components/NorthIndianChart';

export function Kundli() {
  const [formData, setFormData] = useState({
    name: "",
    dob: "",
    time: "",
    location: ""
  });
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState<{ chart?: any; reading: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResultData(null);
    try {
      const result = await geminiService.getCosmicReading({
        type: 'kundli',
        data: formData
      });
      
      if (result) {
        // Simple extraction of JSON from markdown
        const jsonMatch = result.match(/\{[\s\S]*?\}/);
        let chartData = null;
        let cleanReading = result;

        if (jsonMatch) {
          try {
            chartData = JSON.parse(jsonMatch[0]);
            cleanReading = result.replace(jsonMatch[0], '').trim();
          } catch (e) {
            console.error("JSON parse error", e);
          }
        }
        setResultData({ chart: chartData, reading: cleanReading });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-20 natural-gradient">
      <div className="max-w-6xl mx-auto px-4 text-gray-800">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex p-3 bg-orange-50 rounded-2xl mb-6 border border-orange-100"
          >
            <Sparkles className="w-8 h-8 text-orange-800" />
          </motion.div>
          <h1 className="section-title text-gray-800">पाराशर कुंडली <span className="text-orange-900 font-hindi">कैलकुलेटर</span></h1>
          <p className="text-gray-500">Ancient Parashar Principles meets Modern AI Research.</p>
        </div>

        {!resultData ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="soft-card p-8 md:p-12 max-w-4xl mx-auto"
          >
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase text-gray-400 flex items-center gap-2">
                    <User className="w-4 h-4" /> पूरा नाम
                  </label>
                  <input
                    required
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="नाम दर्ज करें"
                    className="w-full bg-stone-50 border border-border-soft rounded-xl px-6 py-4 text-gray-800 focus:outline-none focus:border-accent-orange transition-colors"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase text-gray-400 flex items-center gap-2">
                    <Calendar className="w-4 h-4" /> जन्म तिथि
                  </label>
                  <input
                    required
                    type="date"
                    value={formData.dob}
                    onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                    className="w-full bg-stone-50 border border-border-soft rounded-xl px-6 py-4 text-gray-800 focus:outline-none focus:border-accent-orange transition-colors"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase text-gray-400 flex items-center gap-2">
                    <Clock className="w-4 h-4" /> जन्म समय
                  </label>
                  <input
                    required
                    type="time"
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="w-full bg-stone-50 border border-border-soft rounded-xl px-6 py-4 text-gray-800 focus:outline-none focus:border-accent-orange transition-colors"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase text-gray-400 flex items-center gap-2">
                    <MapPin className="w-4 h-4" /> जन्म स्थान
                  </label>
                  <input
                    required
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="शहर का नाम"
                    className="w-full bg-stone-50 border border-border-soft rounded-xl px-6 py-4 text-gray-800 focus:outline-none focus:border-accent-orange transition-colors"
                  />
                </div>
              </div>

              <button
                disabled={loading}
                type="submit"
                className="w-full py-5 bg-orange-900 text-white font-extrabold rounded-2xl flex items-center justify-center gap-3 shadow-lg shadow-orange-900/20 hover:opacity-90 transition-all disabled:opacity-50 active:scale-[0.98]"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-6 h-6 animate-spin" /> Analyzing 1,40,000+ Sutras...
                  </>
                ) : (
                  <> विस्तृत कुंडली देखें <ChevronRight className="w-6 h-6" /> </>
                )}
              </button>
            </form>
          </motion.div>
        ) : (
          <motion.div
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             className="space-y-12"
          >
            {/* Charts Section */}
            {resultData.chart && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="soft-card p-6">
                   <NorthIndianChart 
                    title="लग्न कुंडली (L1)" 
                    rashiMap={resultData.chart.rashi_map || [1,2,3,4,5,6,7,8,9,10,11,12]} 
                    planets={resultData.chart.planets || []}
                   />
                </div>
                <div className="soft-card p-6 bg-stone-800 text-stone-100">
                  <h3 className="text-xl font-bold mb-6 font-hindi text-orange-400">Planetary Positions</h3>
                  <div className="space-y-3">
                    {resultData.chart.planets?.map((p: any) => (
                      <div key={p.name} className="flex justify-between items-center border-b border-white/5 pb-2">
                        <span className="font-bold">{p.name}</span>
                        <div className="text-right">
                          <span className="text-xs text-orange-300 block">{p.rashi} {p.degree}</span>
                          <span className="text-[10px] opacity-40 uppercase">House {p.house} {p.isRetro ? '• Retro' : ''} {p.isCombust ? '• Comb' : ''}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Reading Content */}
            <div className="soft-card p-8 md:p-12 overflow-hidden relative">
              <div className="prose prose-stone max-w-none prose-headings:text-gray-800">
                <div className="markdown-body">
                   <ReactMarkdown>{resultData.reading}</ReactMarkdown>
                </div>
              </div>
              
              <div className="mt-12 pt-8 border-t border-border-soft flex justify-between items-center">
                <button 
                  onClick={() => setResultData(null)}
                  className="text-gray-400 hover:text-accent-orange transition-colors text-sm font-bold"
                >
                  ← New Analysis
                </button>
                <div className="flex gap-4">
                  <button 
                    className="px-6 py-2 border border-accent-orange/30 text-accent-orange rounded-full text-sm font-bold hover:bg-orange-50 transition-all"
                    onClick={() => window.print()}
                  >
                    Download Detailed Report
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
