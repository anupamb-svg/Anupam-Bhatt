import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { geminiService } from "@/src/services/geminiService";
import { BookOpen, Search, Loader2, Sparkles, ArrowRight } from "lucide-react";
import ReactMarkdown from "react-markdown";

const featuredTopics = [
  "Understanding Saturn's Sade Sati",
  "The Science of Gemstones",
  "Daily Planetary Transits",
  "Astrology in Modern Science",
  "Mythology of Nakshatras"
];

export function Blog() {
  const [topic, setTopic] = useState("");
  const [content, setContent] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async (selectedTopic?: string) => {
    const t = selectedTopic || topic;
    if (!t) return;
    setLoading(true);
    try {
      const result = await geminiService.generateBlogContent(t);
      setContent(result);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-20 natural-gradient text-gray-800">
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="section-title text-gray-800">नवीनतम <span className="text-orange-900 font-hindi">ब्लॉग</span></h1>
          <p className="text-gray-500 font-hindi font-bold">डॉ. शर्मा और विशेषज्ञों द्वारा प्रमाणित शोध-लेख</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-8">
            <div className="soft-card p-6">
              <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Search className="w-4 h-4 text-accent-orange" /> खोजें
              </h3>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="विषय खोजें..."
                  className="flex-1 bg-stone-50 border border-border-soft rounded-lg px-4 py-2 text-sm text-gray-800 focus:outline-none focus:border-accent-orange"
                />
                <button
                  onClick={() => handleGenerate()}
                  className="p-2 bg-orange-900 text-white rounded-lg shadow-lg shadow-orange-900/20 transition-all hover:opacity-90"
                >
                  <Sparkles className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="soft-card p-6 bg-stone-800 text-stone-100">
              <h3 className="font-bold mb-6 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-orange-400" /> महत्वपूर्ण शोध
              </h3>
              <div className="space-y-4">
                {featuredTopics.map((t) => (
                  <button
                    key={t}
                    onClick={() => {
                        setTopic(t);
                        handleGenerate(t);
                    }}
                    className="w-full text-left p-4 rounded-xl border border-white/5 bg-stone-700/50 hover:bg-stone-700 hover:border-orange-400/30 transition-all group flex items-center justify-between"
                  >
                    <span className="text-sm text-stone-200 group-hover:text-orange-300 font-hindi">{t}</span>
                    <ArrowRight className="w-4 h-4 text-orange-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Content Area */}
          <div className="lg:col-span-2">
            {!content ? (
              <div className="soft-card p-12 text-center flex flex-col items-center justify-center min-h-[400px]">
                <div className="w-20 h-20 bg-stone-50 rounded-full flex items-center justify-center mb-6">
                  <BookOpen className="w-10 h-10 text-stone-200" />
                </div>
                <h2 className="text-2xl font-bold text-gray-400 mb-2">अपनी पसंद का विषय चुनें</h2>
                <p className="text-gray-300 text-sm">Our AI Researcher will pull data from classical texts for you.</p>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="soft-card p-8 md:p-12 relative overflow-hidden"
              >
                {loading && (
                  <div className="absolute inset-0 bg-white/60 backdrop-blur-sm z-50 flex items-center justify-center flex-col gap-4">
                    <Loader2 className="w-10 h-10 text-orange-800 animate-spin" />
                    <p className="text-orange-900 font-bold tracking-widest text-xs uppercase animate-pulse">पौराणिक सूत्रों का विश्लेषण...</p>
                  </div>
                )}
                <div className="prose prose-stone max-w-none prose-headings:text-gray-800">
                   <div className="markdown-body">
                      <ReactMarkdown>{content}</ReactMarkdown>
                   </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
