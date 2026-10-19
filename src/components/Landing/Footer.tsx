import { motion } from "framer-motion";
import { Mail, Code2, ExternalLink } from "lucide-react";

export const Footer = () => {
  const footerLinks = {
    tours: [
      "Mountain Campsites",
      "Coastal Camping",
      "Forest Retreats",
      "Aurora Viewing",
      "Lake Camping",
    ],
    company: [
      "About Release 1.0",
      "Featured Sites",
      "Safety Guidelines",
      "Responsible Travel",
      "Lab Notes",
    ],
    support: ["FAQ", "Booking Policy", "Session Data", "Production Support", "Contact"],
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
                  <path
                    d="M24 8L32 24L24 40L16 24L24 8Z"
                    stroke="white"
                    strokeWidth="2"
                    fill="#8B7355"
                  />
                  <circle cx="24" cy="24" r="3" fill="white" />
                </svg>
              </div>
              <span className="text-lg font-bold">WILDSCAPE</span>
            </div>
            <p className="text-white/70 text-sm leading-relaxed">
              WildScape Europe Release 1.0 is a working camping discovery and planning app for
              European wilderness travel, combining campsite search, terrain context, weather-aware
              planning, booking readiness, and persistent session state.
            </p>
            <div className="flex gap-4">
              <motion.a
                href="https://github.com/Alexi5000/WildScape-Europe"
                aria-label="WildScape source on GitHub"
                className="p-3 rounded-full bg-white/10"
                whileHover={{ scale: 1.1 }}
              >
                <Code2 size={18} />
              </motion.a>
              <motion.a
                href="https://linkedin.com/in/alexcinovoj"
                aria-label="Project maintainer on LinkedIn"
                className="p-3 rounded-full bg-white/10"
                whileHover={{ scale: 1.1 }}
              >
                <ExternalLink size={18} />
              </motion.a>
            </div>
          </div>

          {/* Destinations Column */}
          <div>
            <h3 className="text-lg font-bold text-white mb-6">Destinations</h3>
            <ul className="space-y-3">
              {footerLinks.tours.map((link) => (
                <li key={link}>
                  <a
                    href="#destinations"
                    className="text-white/70 hover:text-[#C85A54] transition-colors text-sm"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h3 className="text-lg font-bold text-white mb-6">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link, index) => (
                <li key={link}>
                  <a
                    href={index === 1 ? "#destinations" : `#info-${[0, 0, 1, 4, 2][index]}`}
                    className="text-white/70 hover:text-[#C85A54] transition-colors text-sm"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h3 className="text-lg font-bold text-white mb-6">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3" id="contact">
                <Code2 size={18} className="mt-1 flex-shrink-0" />
                <a
                  href="https://github.com/Alexi5000/WildScape-Europe/issues"
                  className="text-white/80 hover:text-white text-sm"
                >
                  Report an issue or ask a question
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Mail size={18} className="mt-1 flex-shrink-0" />
                <a
                  href="mailto:alex@techtideai.io"
                  className="text-white/80 hover:text-white text-sm"
                >
                  Contact the maintainer
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/50 text-sm">
            © 2026 WildScape Europe Release 1.0 by Alex Cinovoj | TechTideAI. Production build.
          </p>
          <div className="flex gap-6 text-sm">
            <a href="#info-2" className="text-white/50 hover:text-white transition-colors">
              Session Data
            </a>
            <a
              href="https://github.com/Alexi5000/WildScape-Europe/blob/main/LICENSE"
              className="text-white/50 hover:text-white transition-colors"
            >
              License
            </a>
            <a
              href="https://github.com/Alexi5000/WildScape-Europe"
              className="text-white/50 hover:text-white transition-colors"
            >
              Source
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
