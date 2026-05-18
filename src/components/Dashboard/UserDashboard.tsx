import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Calendar, MapPin, Heart, Star, TrendingUp, Clock } from "lucide-react";
import { enhancedApiService } from "@/services/enhancedApi";
import type { BookingSummary } from "@/types/api";
import type { Campsite } from "@/types/campsite";

export const UserDashboard: React.FC = () => {
  const [userBookings, setUserBookings] = useState<BookingSummary[]>([]);
  const [recommendations, setRecommendations] = useState<Campsite[]>([]);
  const [recentlyViewed, setRecentlyViewed] = useState<string[]>([]);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        const [bookings, recs, recent, history] = await Promise.all([
          enhancedApiService.getUserBookings("current_user"),
          enhancedApiService.getPersonalizedRecommendations("current_user"),
          enhancedApiService.getRecentlyViewed(),
          enhancedApiService.getSearchHistory(),
        ]);

        setUserBookings(bookings);
        setRecommendations(recs);
        setRecentlyViewed(recent);
        setSearchHistory(history);
      } catch (error) {
        console.error("Failed to load dashboard data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-500" />
      </div>
    );
  }

  const stats = [
    { label: "Total Bookings", value: userBookings.length, icon: Calendar, color: "text-blue-500" },
    { label: "Countries Visited", value: "8", icon: MapPin, color: "text-green-500" },
    { label: "Wishlist Items", value: "12", icon: Heart, color: "text-red-500" },
    { label: "Reviews Given", value: "24", icon: Star, color: "text-yellow-500" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-green-900 to-slate-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Welcome back, Explorer!</h1>
          <p className="text-gray-300">
            Track your adventures and discover new wilderness experiences.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-300 text-sm">{stat.label}</p>
                    <p className="text-3xl font-bold">{stat.value}</p>
                  </div>
                  <Icon className={`w-8 h-8 ${stat.color}`} />
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 mb-8"
            >
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Calendar className="w-6 h-6" /> Recent Bookings
              </h2>
              <div className="space-y-4">
                {userBookings.map((booking) => (
                  <div
                    key={booking.id}
                    className="bg-white/5 rounded-lg p-4 flex items-center justify-between"
                  >
                    <div>
                      <h3 className="font-semibold">{booking.campsiteName}</h3>
                      <p className="text-gray-300 text-sm">
                        {booking.startDate} - {booking.endDate}
                      </p>
                      <p className="text-gray-400 text-sm">
                        {booking.guests} guests • €{booking.totalPrice}
                      </p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${booking.status === "confirmed" ? "bg-green-500/20 text-green-300" : "bg-yellow-500/20 text-yellow-300"}`}
                    >
                      {booking.status}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20"
            >
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <TrendingUp className="w-6 h-6" /> Recommended for You
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {recommendations.slice(0, 4).map((campsite) => (
                  <div key={campsite.id} className="bg-white/5 rounded-lg overflow-hidden">
                    <img
                      src={campsite.images[0]}
                      alt={campsite.name}
                      className="w-full h-32 object-cover"
                    />
                    <div className="p-4">
                      <h3 className="font-semibold mb-1">{campsite.name}</h3>
                      <p className="text-gray-300 text-sm mb-2">{campsite.location.country}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-yellow-400 flex items-center gap-1">
                          <Star className="w-4 h-4 fill-current" />
                          {campsite.rating}
                        </span>
                        <span className="font-bold">€{campsite.price_per_night}/night</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20"
            >
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5" /> Recent Searches
              </h2>
              <div className="space-y-2">
                {searchHistory.length > 0 ? (
                  searchHistory.map((search) => (
                    <div key={search} className="bg-white/5 rounded-lg p-3 text-sm">
                      {search}
                    </div>
                  ))
                ) : (
                  <p className="text-gray-400 text-sm">No recent searches</p>
                )}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20"
            >
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5" /> Recently Viewed
              </h2>
              <div className="space-y-2">
                {recentlyViewed.length > 0 ? (
                  recentlyViewed.map((campsiteId) => (
                    <div key={campsiteId} className="bg-white/5 rounded-lg p-3 text-sm">
                      {campsiteId}
                    </div>
                  ))
                ) : (
                  <p className="text-gray-400 text-sm">No campsites viewed yet</p>
                )}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20"
            >
              <h2 className="text-xl font-bold mb-4">Adventure Stats</h2>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-300">Nights Camped</span>
                  <span className="font-bold">47</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Distance Hiked</span>
                  <span className="font-bold">324 km</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Photos Taken</span>
                  <span className="font-bold">1,247</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Aurora Sightings</span>
                  <span className="font-bold">3</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};
