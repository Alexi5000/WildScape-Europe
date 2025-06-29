import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Heart, MapPin, Star, TrendingUp, Clock } from 'lucide-react';
import { enhancedApiService } from '@/services/enhancedApi';
import { Campsite } from '@/types/campsite';

export const UserDashboard: React.FC = () => {
  const [userBookings, setUserBookings] = useState<any[]>([]);
  const [recommendations, setRecommendations] = useState<Campsite[]>([]);
  const [recentlyViewed, setRecentlyViewed] = useState<string[]>([]);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadDashboardData = async () => {
      setIsLoading(true);
      try {
        const [bookings, recs, recent, history] = await Promise.all([
          enhancedApiService.getUserBookings('current_user'),
          enhancedApiService.getPersonalizedRecommendations('current_user'),
          enhancedApiService.getRecentlyViewed(),
          enhancedApiService.getSearchHistory()
        ]);

        setUserBookings(bookings);
        setRecommendations(recs);
        setRecentlyViewed(recent);
        setSearchHistory(history);
      } catch (error) {
        console.error('Failed to load dashboard data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-dark flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold mb-2">Welcome back, Explorer!</h1>
          <p className="text-gray-400">Your adventure dashboard</p>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
            <div className="flex items-center gap-3 mb-2">
              <Calendar className="w-6 h-6 text-primary" />
              <span className="text-sm text-gray-400">Total Bookings</span>
            </div>
            <p className="text-2xl font-bold">{userBookings.length}</p>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
            <div className="flex items-center gap-3 mb-2">
              <Heart className="w-6 h-6 text-red-500" />
              <span className="text-sm text-gray-400">Wishlist</span>
            </div>
            <p className="text-2xl font-bold">12</p>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
            <div className="flex items-center gap-3 mb-2">
              <MapPin className="w-6 h-6 text-secondary" />
              <span className="text-sm text-gray-400">Places Visited</span>
            </div>
            <p className="text-2xl font-bold">8</p>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
            <div className="flex items-center gap-3 mb-2">
              <Star className="w-6 h-6 text-yellow-500" />
              <span className="text-sm text-gray-400">Avg Rating</span>
            </div>
            <p className="text-2xl font-bold">4.8</p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Bookings */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-primary" />
                Recent Bookings
              </h2>
              
              {userBookings.length === 0 ? (
                <div className="text-center py-8 text-gray-400">
                  <Calendar className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No bookings yet</p>
                  <p className="text-sm">Start exploring to make your first booking!</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {userBookings.map((booking) => (
                    <div
                      key={booking.id}
                      className="bg-white/5 rounded-lg p-4 border border-white/10"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold">{booking.campsiteName}</h3>
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          booking.status === 'confirmed' 
                            ? 'bg-green-500/20 text-green-400'
                            : booking.status === 'pending'
                            ? 'bg-yellow-500/20 text-yellow-400'
                            : 'bg-red-500/20 text-red-400'
                        }`}>
                          {booking.status}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-400">
                        <span>{booking.startDate} - {booking.endDate}</span>
                        <span>{booking.guests} guests</span>
                        <span>€{booking.totalPrice}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {/* Search History */}
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5 text-secondary" />
                Recent Searches
              </h3>
              
              {searchHistory.length === 0 ? (
                <p className="text-gray-400 text-sm">No recent searches</p>
              ) : (
                <div className="space-y-2">
                  {searchHistory.slice(0, 5).map((search, index) => (
                    <button
                      key={index}
                      className="w-full text-left p-2 text-sm text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                    >
                      {search}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Quick Stats */}
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-accent" />
                Your Stats
              </h3>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400">Countries Visited</span>
                  <span className="font-semibold">5</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Total Nights</span>
                  <span className="font-semibold">24</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Favorite Activity</span>
                  <span className="font-semibold">Hiking</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Next Trip</span>
                  <span className="font-semibold text-primary">15 days</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Personalized Recommendations */}
        <motion.div
          className="mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h2 className="text-2xl font-bold mb-6">Recommended for You</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {recommendations.slice(0, 4).map((campsite) => (
              <div
                key={campsite.id}
                className="bg-white/10 backdrop-blur-md rounded-xl overflow-hidden border border-white/20 hover:border-primary/50 transition-all duration-300 cursor-pointer group"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={campsite.images[0]}
                    alt={campsite.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3">
                    <h3 className="font-semibold text-white mb-1">{campsite.name}</h3>
                    <p className="text-xs text-gray-300">{campsite.location.region}, {campsite.location.country}</p>
                  </div>
                </div>
                
                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="text-sm">{campsite.rating}</span>
                    </div>
                    <span className="text-primary font-semibold">€{campsite.price_per_night}/night</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};