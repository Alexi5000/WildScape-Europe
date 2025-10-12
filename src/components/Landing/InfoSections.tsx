import { motion } from 'framer-motion';
import { Shield, Users, Mountain, Heart } from 'lucide-react';

export const InfoSections = () => {
  const sections = [
    {
      title: 'Choose Your Perfect Campsite',
      description: 'Discover over 500 handpicked camping locations across Europe. From mountain peaks to coastal shores, lakeside retreats to forest sanctuaries. Each site is carefully vetted for safety, accessibility, and natural beauty.',
      image: 'https://images.pexels.com/photos/2422262/pexels-photo-2422262.jpeg?auto=compress&cs=tinysrgb&w=800',
      icon: Mountain,
      accent: '#C85A54'
    },
    {
      title: 'Real-Time Weather & Conditions',
      description: 'Plan your camping trip with confidence using live weather data, aurora predictions for Nordic sites, and seasonal recommendations. Our 3D terrain maps help you understand elevation and accessibility.',
      image: 'https://images.pexels.com/photos/2398220/pexels-photo-2398220.jpeg?auto=compress&cs=tinysrgb&w=800',
      icon: Shield,
      accent: '#8B7355'
    },
    {
      title: 'Book with Confidence',
      description: 'Secure your camping spot with our easy booking system. Check real-time availability, read verified reviews from fellow campers, and access detailed site information including amenities and facilities.',
      image: 'https://images.pexels.com/photos/1365425/pexels-photo-1365425.jpeg?auto=compress&cs=tinysrgb&w=800',
      icon: Users,
      accent: '#6B8E7F'
    },
    {
      title: 'Leave No Trace Camping',
      description: 'Join our community of responsible outdoor enthusiasts. We promote sustainable camping practices, respect for local ecosystems, and support for conservation efforts across Europe\'s wilderness areas.',
      image: 'https://images.pexels.com/photos/1001682/pexels-photo-1001682.jpeg?auto=compress&cs=tinysrgb&w=800',
      icon: Heart,
      accent: '#9B7653'
    }
  ];

  return (
    <section className="py-20 bg-[#F5F2ED]">
      <div className="container mx-auto px-8">
        <div className="space-y-32">
          {sections.map((section, index) => {
            const IconComponent = section.icon;
            const isEven = index % 2 === 0;

            return (
              <motion.div
                key={index}
                className={`grid md:grid-cols-2 gap-12 items-center ${isEven ? '' : 'md:flex-row-reverse'}`}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                {/* Image Side - with organic shape */}
                <motion.div
                  className={`relative ${isEven ? 'md:order-2' : 'md:order-1'}`}
                  initial={{ opacity: 0, x: isEven ? 50 : -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                >
                  <div 
                    className="relative overflow-hidden rounded-[40px] shadow-2xl"
                    style={{
                      clipPath: isEven 
                        ? 'polygon(0% 5%, 100% 0%, 100% 100%, 0% 95%)' 
                        : 'polygon(0% 0%, 100% 5%, 100% 95%, 0% 100%)'
                    }}
                  >
                    <img
                      src={section.image}
                      alt={section.title}
                      className="w-full h-[500px] object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/50 to-transparent" />
                    
                    {/* Icon Badge */}
                    <div className="absolute top-8 right-8 w-16 h-16 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center shadow-lg">
                      <IconComponent size={32} style={{ color: section.accent }} />
                    </div>
                  </div>

                  {/* Decorative Shape */}
                  <div className="absolute -z-10 top-10 left-10 w-full h-full rounded-[40px] opacity-20" 
                    style={{ backgroundColor: section.accent }}
                  />
                </motion.div>

                {/* Text Side */}
                <motion.div
                  className={`space-y-6 ${isEven ? 'md:order-1' : 'md:order-2'}`}
                  initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  <div className="inline-block px-4 py-2 rounded-full text-xs font-medium tracking-wider"
                    style={{ backgroundColor: `${section.accent}20`, color: section.accent }}
                  >
                    WILDSCAPE ADVANTAGE
                  </div>
                  
                  <h2 className="text-5xl font-bold text-[#3E2723] leading-tight font-serif">
                    {section.title}
                  </h2>
                  
                  <p className="text-lg text-[#6B5B47] leading-relaxed">
                    {section.description}
                  </p>

                  <motion.button
                    className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-medium transition-all duration-300"
                    style={{ 
                      backgroundColor: section.accent,
                      color: 'white'
                    }}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Learn More
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M1 8h14M8 1l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </motion.button>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

