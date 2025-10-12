import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter } from 'lucide-react';

export const Footer = () => {
  const footerLinks = {
    tours: ['Mountain Campsites', 'Coastal Camping', 'Forest Retreats', 'Aurora Viewing', 'Lake Camping'],
    company: ['About WildScape', 'Featured Sites', 'Safety Guidelines', 'Reviews', 'Blog'],
    support: ['FAQ', 'Booking Policy', 'Cancellation', 'Travel Insurance', 'Contact']
  };

  return (
    <footer className="relative bg-[#3E2723] text-white">
      {/* Decorative Wave Top */}
      <div className="absolute top-0 left-0 right-0 transform -translate-y-1">
        <svg viewBox="0 0 1440 60" className="w-full h-auto text-[#3E2723]" fill="currentColor">
          <path d="M0,20 Q360,50 720,20 T1440,20 L1440,0 L0,0 Z" />
        </svg>
      </div>

      <div className="container mx-auto px-8 pt-20 pb-8">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand Column */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10">
                <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
                  <path d="M24 8L32 24L24 40L16 24L24 8Z" stroke="white" strokeWidth="2" fill="#8B7355"/>
                  <circle cx="24" cy="24" r="3" fill="white"/>
                </svg>
              </div>
              <span className="text-lg font-bold">WILDSCAPE</span>
            </div>
            <p className="text-white/70 text-sm leading-relaxed">
              Discover Europe's most breathtaking wild camping locations. From Nordic fjords to Alpine peaks, experience nature with 3D terrain maps and real-time weather.
            </p>
            <div className="flex gap-4">
              <motion.a 
                href="#" 
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#C85A54] transition-colors"
                whileHover={{ scale: 1.1 }}
              >
                <Facebook size={18} />
              </motion.a>
              <motion.a 
                href="#" 
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#C85A54] transition-colors"
                whileHover={{ scale: 1.1 }}
              >
                <Instagram size={18} />
              </motion.a>
              <motion.a 
                href="#" 
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#C85A54] transition-colors"
                whileHover={{ scale: 1.1 }}
              >
                <Twitter size={18} />
              </motion.a>
            </div>
          </div>

          {/* Destinations Column */}
          <div>
            <h3 className="text-lg font-bold mb-6">Destinations</h3>
            <ul className="space-y-3">
              {footerLinks.tours.map((link) => (
                <li key={link}>
                  <a href="#" className="text-white/70 hover:text-[#C85A54] transition-colors text-sm">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h3 className="text-lg font-bold mb-6">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link}>
                  <a href="#" className="text-white/70 hover:text-[#C85A54] transition-colors text-sm">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h3 className="text-lg font-bold mb-6">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Phone size={18} className="text-[#C85A54] mt-1 flex-shrink-0" />
                <div>
                  <p className="text-white/70 text-sm">+47 224-17-97</p>
                  <p className="text-white/50 text-xs">24/7 Support Available</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail size={18} className="text-[#C85A54] mt-1 flex-shrink-0" />
                <a href="mailto:explore@wildscape-europe.com" className="text-white/70 hover:text-[#C85A54] transition-colors text-sm">
                  explore@wildscape-europe.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-[#C85A54] mt-1 flex-shrink-0" />
                <p className="text-white/70 text-sm">
                  Nordic Wilderness Center<br />
                  Oslo, Norway
                </p>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/50 text-sm">
            © 2024 WildScape Europe. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <a href="#" className="text-white/50 hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="text-white/50 hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="text-white/50 hover:text-white transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

