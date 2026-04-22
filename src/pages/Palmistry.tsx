import React, { useState } from "react";
import { motion } from "motion/react";
import { geminiService } from "@/src/services/geminiService";
import { PenTool, Loader2, Sparkles, AlertCircle } from "lucide-react";
import ReactMarkdown from "react-markdown";

export function Palmistry() {
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [reading, setReading] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await geminiService.getCosmicReading({
        type: 'palmistry',
        data: { description }
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
             className="inline-flex p-3 bg-green-50 rounded-2xl mb-6 border border-green-100"
          >
            <PenTool className="w-8 h-8 text-green-800" />
          </motion.div>
          <h1 className="section-title text-gray-800">हस्तरेखा <span className="text-green-900 font-hindi">विश्लेषण</span></h1>
          <p className="text-gray-500">Describe your palm lines and mounts for an AI-guided Hasta Samudrika analysis.</p>
        </div>

        {!reading ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="soft-card p-8 md:p-12"
          >
            <div className="flex items-start gap-4 p-4 bg-green-50 border border-green-100 rounded-xl mb-8">
              <AlertCircle className="w-6 h-6 text-green-800 shrink-0 mt-1" />
              <p className="text-sm text-green-900 font-medium leading-relaxed">
                <span className="font-bold">Tip:</span> Describe the length and shape of your Life line, Heart line, and Head line. 
                Mention any prominent marks for the most accurate research output.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <textarea
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Ex: My life line is long and clear..."
                className="w-full h-48 bg-stone-50 border border-border-soft rounded-xl px-6 py-4 text-gray-800 focus:outline-none focus:border-accent-orange transition-colors resize-none"
              />
              <button
                disabled={loading}
                className="w-full py-5 bg-orange-900 text-white font-extrabold rounded-2xl flex items-center justify-center gap-3 shadow-lg shadow-orange-900/20 hover:opacity-90 transition-all disabled:opacity-50 active:scale-[0.98]"
              >
                {loading ? <Loader2 className="animate-spin" /> : <><Sparkles className="w-5 h-5" /> Analyze Palm Lines</>}
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
                  className="mt-12 text-gray-400 font-bold px-6 py-2 border border-border-soft rounded-full hover:bg-stone-50 transition-all"
               >
                 ← Back to Input
               </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
