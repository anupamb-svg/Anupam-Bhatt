import React, { useState } from "react";
import { motion } from "motion/react";
import { geminiService } from "@/src/services/geminiService";
import { LayoutGrid, Loader2, Sparkles, Hash } from "lucide-react";
import ReactMarkdown from "react-markdown";

export function Numerology() {
  const [formData, setFormData] = useState({ name: "", dob: "" });
  const [loading, setLoading] = useState(false);
  const [reading, setReading] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await geminiService.getCosmicReading({
        type: 'numerology',
        data: formData
      });
      setReading(result || "");
    } catch (error) {
       console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-20 natural-gradient text-gray-800">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <motion.div
             initial={{ opacity: 0, scale: 0.9 }}
             animate={{ opacity: 1, scale: 1 }}
             className="inline-flex p-3 bg-orange-50 rounded-2xl mb-6 border border-orange-100"
          >
            <Hash className="w-8 h-8 text-orange-900" />
          </motion.div>
          <h1 className="section-title text-gray-800">अंकशास्त्र <span className="text-orange-900 font-hindi">कैलकुलेटर</span></h1>
          <p className="text-gray-500">Discover the vibration of your name and birth date through ancient systems.</p>
        </div>

        {!reading ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="soft-card p-8 md:p-12"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-400">नाम (अभिलेखों के अनुसार)</label>
                  <input
                    required
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-stone-50 border border-border-soft rounded-xl px-6 py-4 text-gray-800 focus:border-accent-orange transition-colors"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-400">जन्म तिथि</label>
                  <input
                    required
                    type="date"
                    value={formData.dob}
                    onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                    className="w-full bg-stone-50 border border-border-soft rounded-xl px-6 py-4 text-gray-800 focus:border-accent-orange transition-colors"
                  />
                </div>
              </div>
              <button
                disabled={loading}
                className="w-full py-5 bg-orange-900 text-white font-extrabold rounded-2xl flex items-center justify-center gap-3 shadow-lg shadow-orange-900/20 hover:opacity-90 transition-all disabled:opacity-50 active:scale-[0.98]"
              >
                {loading ? <Loader2 className="animate-spin" /> : <><Sparkles className="w-5 h-5" /> Calculate Vibrations</>}
              </button>
            </form>
          </motion.div>
        ) : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
            <div className="soft-card p-8 md:p-12">
               <div className="prose prose-stone max-w-none prose-headings:text-gray-800">
                  <div className="markdown-body">
                    <ReactMarkdown>{reading}</ReactMarkdown>
                  </div>
               </div>
               <button 
                  onClick={() => setReading(null)}
                  className="mt-12 text-gray-400 hover:text-accent-orange font-bold transition-all"
               >
                 ← New Calculation
               </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
