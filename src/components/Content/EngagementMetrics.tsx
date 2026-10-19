import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Eye, Heart, Share2, Clock, TrendingUp } from "lucide-react";

interface MetricData {
  views: number;
  likes: number;
  shares: number;
  timeSpent: number;
  engagement: number;
}

export const EngagementMetrics: React.FC = () => {
  const [metrics, setMetrics] = useState<MetricData>({
    views: 0,
    likes: 0,
    shares: 0,
    timeSpent: 0,
    engagement: 0,
  });

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Simulate real-time metrics
    const interval = setInterval(() => {
      setMetrics((prev) => ({
        views: prev.views + Math.floor(Math.random() * 3),
        likes: prev.likes + Math.floor(Math.random() * 2),
        shares: prev.shares + (Math.random() > 0.8 ? 1 : 0),
        timeSpent: prev.timeSpent + 1,
        engagement: Math.min(100, prev.engagement + Math.random() * 0.5),
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const metricItems = [
    { icon: Eye, label: "Views", value: metrics.views.toLocaleString(), color: "text-blue-600" },
    { icon: Heart, label: "Likes", value: metrics.likes.toLocaleString(), color: "text-red-500" },
    {
      icon: Share2,
      label: "Shares",
      value: metrics.shares.toLocaleString(),
      color: "text-green-600",
    },
    {
      icon: Clock,
      label: "Avg. Time",
      value: `${Math.floor(metrics.timeSpent / 60)}:${(metrics.timeSpent % 60).toString().padStart(2, "0")}`,
      color: "text-purple-600",
    },
    {
      icon: TrendingUp,
      label: "Engagement",
      value: `${metrics.engagement.toFixed(1)}%`,
      color: "text-orange-600",
    },
  ];

  return (
    <motion.div
      className="fixed bottom-4 right-4 z-40"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: isVisible ? 1 : 0.7, scale: 1 }}
    >
      <div className="bg-white text-slate-900 rounded-xl p-3 shadow-lg max-w-[calc(100vw-2rem)]">
        <button
          type="button"
          aria-expanded={isVisible}
          onClick={() => setIsVisible(!isVisible)}
          className="text-sm font-semibold"
        >
          {isVisible ? "Close sample metrics" : "Sample metrics"}
        </button>
        {isVisible && (
          <>
            <h4 className="text-sm font-semibold text-slate-900 mb-3 flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Simulated metrics
            </h4>

            <div className="grid grid-cols-2 gap-3">
              {metricItems.map((item, index) => (
                <motion.div
                  key={item.label}
                  className="text-center"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <item.icon className={`w-4 h-4 mx-auto mb-1 ${item.color}`} />
                  <div className="text-xs text-slate-600">{item.label}</div>
                  <div className="text-sm font-semibold text-slate-900">{item.value}</div>
                </motion.div>
              ))}
            </div>
          </>
        )}
      </div>
    </motion.div>
  );
};
