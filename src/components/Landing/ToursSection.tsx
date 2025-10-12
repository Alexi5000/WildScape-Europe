import { motion } from 'framer-motion';
import { TourCard } from './TourCard';

export const ToursSection = () => {
  const tours = [
    {
      image: 'https://images.pexels.com/photos/2422915/pexels-photo-2422915.jpeg?auto=compress&cs=tinysrgb&w=800',
      title: 'Aurora Valley Wilderness',
      date: 'Available Now',
      duration: 'Lofoten Islands',
      price: '45',
      category: 'NORWAY'
    },
    {
      image: 'https://images.pexels.com/photos/1761279/pexels-photo-1761279.jpeg?auto=compress&cs=tinysrgb&w=800',
      title: 'Highland Loch Retreat',
      date: 'Year Round',
      duration: 'Scottish Highlands',
      price: '38',
      category: 'SCOTLAND'
    },
    {
      image: 'https://images.pexels.com/photos/1108701/pexels-photo-1108701.jpeg?auto=compress&cs=tinysrgb&w=800',
      title: 'Alpine Mountain Base',
      date: 'Seasonal',
      duration: 'Swiss Alps',
      price: '52',
      category: 'SWITZERLAND'
    },
    {
      image: 'https://images.pexels.com/photos/1687845/pexels-photo-1687845.jpeg?auto=compress&cs=tinysrgb&w=800',
      title: 'Fjord Edge Sanctuary',
      date: 'Summer Peak',
      duration: 'Norway Fjords',
      price: '48',
      category: 'NORWAY'
    }
  ];

  return (
    <section className="relative py-20 bg-[#E8E3DB]">
      {/* Decorative Wave Top */}
      <div className="absolute top-0 left-0 right-0 pointer-events-none transform -translate-y-1">
        <svg viewBox="0 0 1440 60" className="w-full h-auto text-[#F5F2ED]" fill="currentColor">
          <path d="M0,20 Q360,50 720,20 T1440,20 L1440,0 L0,0 Z" />
        </svg>
      </div>

      <div className="container mx-auto px-8 relative z-10">
        {/* Grid Layout */}
        <div className="grid md:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {tours.map((tour, index) => (
            <TourCard key={index} {...tour} index={index} />
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <motion.button
            className="px-12 py-4 bg-[#C85A54] text-white rounded-full font-medium text-lg hover:bg-[#A84843] transition-all duration-300 shadow-lg"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            View all campsites
          </motion.button>
        </motion.div>
      </div>

      {/* Decorative Wave Bottom */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none transform translate-y-1">
        <svg viewBox="0 0 1440 60" className="w-full h-auto text-[#F5F2ED]" fill="currentColor">
          <path d="M0,40 Q360,10 720,40 T1440,40 L1440,60 L0,60 Z" />
        </svg>
      </div>
    </section>
  );
};

