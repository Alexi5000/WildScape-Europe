import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, Heart, Share2, Clock, TrendingUp } from 'lucide-react';

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
    engagement: 0
  });

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Simulate real-time metrics
    const interval = setInterval(() => {
      setMetrics(prev => ({
        views: prev.views + Math.floor(Math.random() * 3),
        likes: prev.likes + Math.floor(Math.random() * 2),
        shares: prev.shares + (Math.random() > 0.8 ? 1 : 0),
        timeSpent: prev.timeSpent + 1,
        engagement: Math.min(100, prev.engagement + Math.random() * 0.5)
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const metricItems = [
    { icon: Eye, label: 'Views', value: metrics.views.toLocaleString(), color: 'text-blue-600' },
    { icon: Heart, label: 'Likes', value: metrics.likes.toLocaleString(), color: 'text-red-500' },
    { icon: Share2, label: 'Shares', value: metrics.shares.toLocaleString(), color: 'text-green-600' },
    { icon: Clock, label: 'Avg. Time', value: `${Math.floor(metrics.timeSpent / 60)}:${(metrics.timeSpent % 60).toString().padStart(2, '0')}`, color: 'text-purple-600' },
    { icon: TrendingUp, label: 'Engagement', value: `${metrics.engagement.toFixed(1)}%`, color: 'text-orange-600' }
  ];

  return (
    <motion.div
      className="fixed bottom-4 right-4 z-40"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: isVisible ? 1 : 0.7, scale: 1 }}
      onHoverStart={() => setIsVisible(true)}
      onHoverEnd={() => setIsVisible(false)}
    >
      <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
        <h4 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
          <TrendingUp className="w-4 h-4" />
          Live Metrics
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
              <div className="text-xs text-white/80">{item.label}</div>
              <div className="text-sm font-semibold text-white">{item.value}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

// Hook for tracking user engagement
export const useEngagementTracking = () => {
  useEffect(() => {
    let startTime = Date.now();
    let scrollDepth = 0;
    let interactions = 0;

    const trackScroll = () => {
      const depth = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
      scrollDepth = Math.max(scrollDepth, depth);
    };

    const trackInteraction = () => {
      interactions++;
    };

    const trackEngagement = () => {
      const timeSpent = Date.now() - startTime;
      const engagementData = {
        timeSpent: Math.round(timeSpent / 1000),
        scrollDepth,
        interactions,
        timestamp: new Date().toISOString()
      };
      
      // Send to analytics service
      console.log('Engagement data:', engagementData);
    };

    window.addEventListener('scroll', trackScroll);
    window.addEventListener('click', trackInteraction);
    window.addEventListener('beforeunload', trackEngagement);

    return () => {
      window.removeEventListener('scroll', trackScroll);
      window.removeEventListener('click', trackInteraction);
      window.removeEventListener('beforeunload', trackEngagement);
    };
  }, []);
};