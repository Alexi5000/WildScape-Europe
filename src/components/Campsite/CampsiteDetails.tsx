import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, Star, Euro, Users, Mountain, Calendar, Check } from 'lucide-react';
import { Campsite } from '@/types/campsite';
import { WeatherIcon } from '../UI/WeatherIcon';

interface CampsiteDetailsProps {
  campsite: Campsite;
  onClose: () => void;
}

export const CampsiteDetails: React.FC<CampsiteDetailsProps> = ({ campsite, onClose }) => {
  const [selectedDates, setSelectedDates] = React.useState<string[]>([]);
  const [guests, setGuests] = React.useState(2);
  const [isBooking, setIsBooking] = React.useState(false);

  const availableDates = Object.entries(campsite.availability)
    .filter(([_, available]) => available)
    .map(([date]) => date);

  const totalPrice = selectedDates.length * campsite.price_per_night;

  const handleDateSelect = (date: string) => {
    setSelectedDates(prev => 
      prev.includes(date) 
        ? prev.filter(d => d !== date)
        : [...prev, date].sort()
    );
  };

  const handleBooking = async () => {
    setIsBooking(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsBooking(false);
    alert('Booking confirmed! You will receive a confirmation email shortly.');
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="bg-white rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden shadow-2xl grid grid-cols-1 lg:grid-cols-3"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Left side - Details */}
          <div className="lg:col-span-2 overflow-y-auto">
            {/* Header */}
            <div className="relative h-64 overflow-hidden">
              <img
                src={campsite.images[0]}
                alt={campsite.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 bg-white/20 hover:bg-white/30 rounded-full backdrop-blur-sm transition-colors"
              >
                <X className="w-6 h-6 text-white" />
              </button>

              <div className="absolute bottom-6 left-6 right-6">
                <h1 className="text-3xl font-bold text-white mb-2">{campsite.name}</h1>
                <div className="flex items-center gap-2 text-white/90">
                  <MapPin className="w-5 h-5" />
                  <span>{campsite.location.region}, {campsite.location.country}</span>
                  <span className="mx-2">•</span>
                  <Mountain className="w-5 h-5" />
                  <span>{campsite.location.elevation}m elevation</span>
                </div>
              </div>
            </div>

            <div className="p-6">
              {/* Quick Info */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-gray-50 rounded-lg p-4 text-center">
                  <Star className="w-6 h-6 text-yellow-500 mx-auto mb-2" />
                  <div className="font-semibold">{campsite.rating}</div>
                  <div className="text-sm text-gray-600">{campsite.reviews.length} reviews</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 text-center">
                  <Euro className="w-6 h-6 text-primary mx-auto mb-2" />
                  <div className="font-semibold">€{campsite.price_per_night}</div>
                  <div className="text-sm text-gray-600">per night</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 text-center">
                  <Users className="w-6 h-6 text-secondary mx-auto mb-2" />
                  <div className="font-semibold">{campsite.capacity}</div>
                  <div className="text-sm text-gray-600">max capacity</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 text-center">
                  <WeatherIcon 
                    condition={campsite.weather.current} 
                    temperature={campsite.weather.temperature}
                    className="mx-auto mb-2"
                  />
                  <div className="font-semibold">{campsite.weather.temperature}°C</div>
                  <div className="text-sm text-gray-600 capitalize">{campsite.weather.current}</div>
                </div>
              </div>

              {/* Description */}
              <div className="mb-6">
                <h2 className="text-xl font-bold mb-3">About this campsite</h2>
                <p className="text-gray-700 leading-relaxed">{campsite.description}</p>
              </div>

              {/* Features */}
              <div className="mb-6">
                <h2 className="text-xl font-bold mb-3">Features</h2>
                <div className="grid grid-cols-2 gap-3">
                  {Object.entries(campsite.features).map(([key, value]) => (
                    <div key={key} className={`flex items-center gap-2 p-2 rounded-lg ${value ? 'bg-green-50 text-green-800' : 'bg-gray-50 text-gray-500'}`}>
                      <span className={value ? 'text-green-600' : 'text-gray-400'}>
                        {value ? '✓' : '✗'}
                      </span>
                      <span className="capitalize text-sm">{key.replace('has_', '').replace('_', ' ')}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Amenities */}
              <div className="mb-6">
                <h2 className="text-xl font-bold mb-3">Amenities</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {campsite.amenities.map((amenity) => (
                    <div key={amenity} className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                      <span className="text-primary">✓</span>
                      <span className="capitalize text-sm">{amenity.replace('_', ' ')}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Reviews */}
              <div className="mb-6">
                <h2 className="text-xl font-bold mb-3">Reviews</h2>
                <div className="space-y-4">
                  {campsite.reviews.map((review) => (
                    <div key={review.id} className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold">{review.user}</span>
                        <div className="flex items-center gap-1">
                          {Array.from({ length: review.rating }).map((_, i) => (
                            <Star key={i} className="w-4 h-4 text-yellow-500 fill-current" />
                          ))}
                        </div>
                      </div>
                      <p className="text-gray-700 text-sm mb-2">{review.comment}</p>
                      <span className="text-xs text-gray-500">{review.date}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Booking Panel */}
          <div className="bg-gray-50 p-6 flex flex-col">
            <div className="sticky top-0">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">Book Your Stay</h3>
                <div className="text-right">
                  <div className="text-2xl font-bold text-primary">€{campsite.price_per_night}</div>
                  <div className="text-sm text-gray-600">per night</div>
                </div>
              </div>

              {/* Date Selection */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  <Calendar className="w-4 h-4 inline mr-2" />
                  Select Dates
                </label>
                <div className="grid grid-cols-3 gap-2 max-h-32 overflow-y-auto">
                  {availableDates.map((date) => (
                    <button
                      key={date}
                      onClick={() => handleDateSelect(date)}
                      className={`p-2 text-xs rounded-lg border transition-colors ${
                        selectedDates.includes(date)
                          ? 'bg-primary text-white border-primary'
                          : 'bg-white hover:bg-gray-100 border-gray-200'
                      }`}
                    >
                      {new Date(date).toLocaleDateString('en-US', { 
                        month: 'short', 
                        day: 'numeric' 
                      })}
                    </button>
                  ))}
                </div>
              </div>

              {/* Guest Selection */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  <Users className="w-4 h-4 inline mr-2" />
                  Guests
                </label>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setGuests(Math.max(1, guests - 1))}
                    className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                  >
                    -
                  </button>
                  <span className="font-medium">{guests}</span>
                  <button
                    onClick={() => setGuests(Math.min(campsite.capacity, guests + 1))}
                    className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                  >
                    +
                  </button>
                  <span className="text-sm text-gray-600 ml-2">
                    (max {campsite.capacity})
                  </span>
                </div>
              </div>

              {/* Booking Summary */}
              {selectedDates.length > 0 && (
                <div className="mb-6 p-4 bg-white rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600">
                      €{campsite.price_per_night} × {selectedDates.length} nights
                    </span>
                    <span className="font-medium">€{totalPrice}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm text-gray-600">
                    <span>Service fee</span>
                    <span>€{Math.round(totalPrice * 0.1)}</span>
                  </div>
                  <hr className="my-2" />
                  <div className="flex justify-between items-center font-bold">
                    <span>Total</span>
                    <span>€{totalPrice + Math.round(totalPrice * 0.1)}</span>
                  </div>
                </div>
              )}

              {/* Booking Button */}
              <button
                onClick={handleBooking}
                disabled={selectedDates.length === 0 || isBooking}
                className={`w-full py-3 rounded-lg font-semibold transition-all duration-300 ${
                  selectedDates.length === 0
                    ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                    : 'bg-primary hover:bg-primary/90 text-white hover:shadow-lg'
                }`}
              >
                {isBooking ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Processing...
                  </div>
                ) : selectedDates.length === 0 ? (
                  'Select dates to book'
                ) : (
                  <div className="flex items-center justify-center gap-2">
                    <Check className="w-4 h-4" />
                    Book Now
                  </div>
                )}
              </button>

              <p className="text-xs text-gray-500 text-center mt-3">
                You won't be charged yet. Free cancellation up to 24 hours before check-in.
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};