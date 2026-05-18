import { useEffect } from 'react';
// Hook for tracking user engagement
export const useEngagementTracking = () => {
  useEffect(() => {
    const startTime = Date.now();
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
