import { motion } from "framer-motion";
import { Mountain, Waves, Tent, Footprints, Camera } from "lucide-react";

interface TourFiltersProps {
  onFilterSelect?: (filter: string) => void;
}

export const TourFilters = ({ onFilterSelect }: TourFiltersProps) => {
  const filters = [
    { id: "mountain", label: "Mountain Sites", icon: Mountain },
    { id: "lake", label: "Lakes & Rivers", icon: Waves },
    { id: "coastal", label: "Coastal Camps", icon: Tent },
    { id: "forest", label: "Forest Camping", icon: Footprints },
    { id: "aurora", label: "Aurora Viewing", icon: Camera },
  ];

  return (
    <section className="relative py-20 bg-[#F5F2ED]">
      <div className="container mx-auto px-8">
        <motion.h2
          className="text-5xl font-bold text-[#3E2723] mb-16 text-center font-serif"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Find your campsite
        </motion.h2>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 max-w-5xl mx-auto">
          {filters.map((filter, index) => {
            const IconComponent = filter.icon;
            return (
              <motion.button
                key={filter.id}
                onClick={() => onFilterSelect?.(filter.id)}
                className="group flex flex-col items-center gap-4 p-6 rounded-2xl hover:bg-white transition-all duration-300"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="relative">
                  {/* Icon Circle */}
                  <div className="w-20 h-20 rounded-full bg-white border-2 border-[#D4C4B0] flex items-center justify-center group-hover:border-[#C85A54] group-hover:bg-[#C85A54]/5 transition-all duration-300">
                    <IconComponent
                      size={32}
                      className="text-[#6B5B47] group-hover:text-[#C85A54] transition-colors"
                    />
                  </div>

                  {/* Simple line decoration */}
                  <svg
                    className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-16 h-4 text-[#D4C4B0] opacity-0 group-hover:opacity-100 transition-opacity"
                    viewBox="0 0 64 16"
                    fill="none"
                  >
                    <path d="M0,8 Q32,0 64,8" stroke="currentColor" strokeWidth="1.5" fill="none" />
                  </svg>
                </div>

                <span className="text-sm text-[#3E2723] font-medium text-center group-hover:text-[#C85A54] transition-colors">
                  {filter.label}
                </span>
              </motion.button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
