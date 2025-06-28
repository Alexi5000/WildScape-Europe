import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Users, Check } from 'lucide-react';
import { Campsite } from '@/types/campsite';

interface BookingPanelProps {
  campsite: Campsite;
}

export const BookingPanel: React.FC<BookingPanelProps> = ({ campsite }) => {
  const [selectedDates, setSelectedDates] = useState<string[]>([]);
  const [guests, setGuests] = useState(2);
  const [isBooking, setIsBooking] = useState(false);

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
    // Simulate booking process
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsBooking(false);
    alert('Booking confirmed! You will receive a confirmation email shortly.');
  };

  return (
    <motion.div
      className="bg-white rounded-xl shadow-xl p-6 sticky top-6"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
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
                  : 'bg-gray-50 hover:bg-gray-100 border-gray-200'
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
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
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
    </motion.div>
  );
};