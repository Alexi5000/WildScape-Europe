import { motion } from "framer-motion";
import { Phone } from "lucide-react";
import { ScrollIndicator } from "./ScrollIndicator";

interface MountainHeroProps {
  onExploreClick: () => void;
}

export const MountainHero = (_props: MountainHeroProps) => {
  const destinations = [
    { name: "Norway", highlight: true },
    { name: "Iceland", highlight: false },
    { name: "Scotland", highlight: false },
    { name: "Alps Region", highlight: false },
    { name: "Scandinavia", highlight: false },
    { name: "Pyrenees", highlight: false },
    { name: "Croatia", highlight: false },
  ];

  return (
    <section className="relative min-h-screen bg-[#E8E3DB] overflow-hidden">
      {/* Header Navigation */}
      <motion.header
        className="absolute top-0 left-0 right-0 z-50 py-6 px-8 flex items-center justify-between"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="flex items-center gap-2">
          <div className="w-12 h-12">
            <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
              <path
                d="M24 8L32 24L24 40L16 24L24 8Z"
                stroke="#3E2723"
                strokeWidth="2"
                fill="#8B7355"
              />
              <circle cx="24" cy="24" r="3" fill="#3E2723" />
            </svg>
          </div>
          <span className="text-sm text-[#3E2723] font-medium">WILDSCAPE</span>
        </div>

        <nav className="hidden md:flex items-center gap-8 text-sm text-[#6B5B47]">
          <a href="#" className="hover:text-[#3E2723] transition-colors">
            Destinations
          </a>
          <a href="#" className="hover:text-[#3E2723] transition-colors">
            Map
          </a>
          <a href="#" className="hover:text-[#3E2723] transition-colors">
            About
          </a>
          <a href="#" className="hover:text-[#3E2723] transition-colors">
            Contact
          </a>
        </nav>

        <div className="flex items-center gap-2 text-[#3E2723]">
          <Phone size={18} />
          <span className="text-sm font-medium">+47 224-17-97</span>
        </div>
      </motion.header>

      {/* Main Hero Content */}
      <div className="container mx-auto px-8 pt-32 pb-20 flex items-center min-h-screen">
        <div className="grid lg:grid-cols-2 gap-16 items-center w-full">
          {/* Left Content */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1
              className="text-6xl md:text-7xl font-bold text-[#3E2723] leading-tight tracking-tight"
              style={{ fontFamily: "'Bitter', serif" }}
            >
              Wild camping
              <br />
              across Europe
            </h1>

            {/* Destination Grid */}
            <div className="grid grid-cols-2 gap-3 pt-4 max-w-md">
              {destinations.map((dest, index) => (
                <motion.div
                  key={dest.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                >
                  <a
                    href="#"
                    className={`block text-base ${
                      dest.highlight
                        ? "text-[#C85A54] font-semibold border-b-2 border-[#C85A54] pb-1"
                        : "text-[#3E2723] hover:text-[#C85A54] transition-colors"
                    }`}
                  >
                    {dest.name}
                  </a>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Hero Image */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            <div className="relative">
              {/* Main Image with Organic Shape */}
              <div
                className="relative overflow-hidden"
                style={{
                  clipPath: "polygon(0% 0%, 100% 0%, 100% 85%, 50% 100%, 0% 85%)",
                }}
              >
                <img
                  src="https://images.pexels.com/photos/1687845/pexels-photo-1687845.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Wild camping adventure across Europe"
                  className="w-full h-[600px] object-cover"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#3E2723]/40 to-transparent" />
              </div>

              {/* Decorative Mountain Silhouette */}
              <div className="absolute -bottom-10 left-0 right-0 pointer-events-none">
                <svg
                  viewBox="0 0 800 100"
                  className="w-full h-auto text-[#E8E3DB]"
                  fill="currentColor"
                >
                  <path d="M0,50 Q100,20 200,40 T400,30 Q500,20 600,45 T800,40 L800,100 L0,100 Z" />
                </svg>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Decorative Wavy Bottom */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
        <svg viewBox="0 0 1440 120" className="w-full h-auto text-[#F5F2ED]" fill="currentColor">
          <path d="M0,60 Q360,10 720,60 T1440,60 L1440,120 L0,120 Z" />
        </svg>
      </div>

      {/* Scroll Indicator */}
      <ScrollIndicator />
    </section>
  );
};
