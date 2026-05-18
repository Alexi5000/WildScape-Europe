import { motion } from "framer-motion";
import { Calendar, Users, ArrowRight } from "lucide-react";

interface TourCardProps {
  image: string;
  title: string;
  date: string;
  duration: string;
  price: string;
  category?: string;
  index?: number;
}

export const TourCard = ({
  image,
  title,
  date,
  duration,
  price,
  category = "HIKING",
  index = 0,
}: TourCardProps) => {
  return (
    <motion.div
      className="group relative overflow-hidden rounded-3xl shadow-lg cursor-pointer"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      whileHover={{ y: -10, scale: 1.02 }}
    >
      {/* Image Container */}
      <div className="relative h-96 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/90 via-[#1A1A1A]/40 to-transparent" />

        {/* Category Badge */}
        <div className="absolute top-6 left-6">
          <span className="px-4 py-2 bg-white/20 backdrop-blur-md rounded-full text-white text-xs font-medium tracking-wider border border-white/30">
            {category}
          </span>
        </div>

        {/* Content Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-3xl font-bold text-white mb-4 font-serif leading-tight">{title}</h3>

            <div className="flex items-center gap-6 text-white/90 text-sm mb-4">
              <div className="flex items-center gap-2">
                <Calendar size={16} />
                <span>{date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users size={16} />
                <span>{duration}</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <span className="text-white text-3xl font-bold">€{price}</span>
                <span className="text-white/80 text-lg ml-1">/night</span>
              </div>

              <motion.div
                className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 group-hover:bg-[#C85A54] group-hover:border-[#C85A54] transition-all duration-300"
                whileHover={{ scale: 1.1 }}
              >
                <ArrowRight size={20} className="text-white" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Hover Effect Border */}
      <div className="absolute inset-0 border-2 border-transparent group-hover:border-[#C85A54]/50 rounded-3xl transition-all duration-300 pointer-events-none" />
    </motion.div>
  );
};
