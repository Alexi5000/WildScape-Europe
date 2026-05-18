import { motion } from "framer-motion";
import { CalendarCheck, CloudSun, Database, Mountain, ShieldCheck } from "lucide-react";

export const InfoSections = () => {
  const sections = [
    {
      label: "ABOUT WILDSCAPE EUROPE",
      title: "Built for Real European Outdoor Planning",
      description:
        "WildScape Europe Release 1.0 is a lab-built camping intelligence application for discovering, comparing, and planning stays across curated European wilderness destinations. The experience combines destination discovery, booking readiness, field condition awareness, and responsible travel guidance in one production interface.",
      image:
        "https://images.pexels.com/photos/2422262/pexels-photo-2422262.jpeg?auto=compress&cs=tinysrgb&w=800",
      icon: Mountain,
      accent: "#C85A54",
    },
    {
      label: "FIELD CONDITIONS",
      title: "Weather, Terrain, and Route Context",
      description:
        "The application surfaces real-time style weather conditions, terrain elevation context, seasonal access notes, and aurora-aware Nordic planning cues so travelers can evaluate a site before they commit to a route.",
      image:
        "https://images.pexels.com/photos/2398220/pexels-photo-2398220.jpeg?auto=compress&cs=tinysrgb&w=800",
      icon: CloudSun,
      accent: "#8B7355",
    },
    {
      label: "SESSION AND DATA MODEL",
      title: "Persistent Planning State",
      description:
        "Release 1.0 keeps search filters, selected campsites, favorites, booking drafts, dashboard activity, and interface preferences in a deterministic session model designed for reliable local-first use and straightforward backend integration.",
      image:
        "https://images.pexels.com/photos/1365425/pexels-photo-1365425.jpeg?auto=compress&cs=tinysrgb&w=800",
      icon: Database,
      accent: "#6B8E7F",
    },
    {
      label: "BOOKING WORKFLOW",
      title: "Plan, Review, and Reserve with Confidence",
      description:
        "Travelers can inspect campsite details, review amenities, compare availability, prepare booking details, and track journey activity through a focused dashboard that supports the full planning flow from inspiration to reservation readiness.",
      image:
        "https://images.pexels.com/photos/1001682/pexels-photo-1001682.jpeg?auto=compress&cs=tinysrgb&w=800",
      icon: CalendarCheck,
      accent: "#9B7653",
    },
    {
      label: "RESPONSIBLE TRAVEL",
      title: "Conservation-Aware Exploration",
      description:
        "WildScape Europe promotes low-impact outdoor travel through safety guidance, site context, sustainability messaging, and Leave No Trace planning principles aligned with respectful use of European wilderness areas.",
      image:
        "https://images.pexels.com/photos/1001682/pexels-photo-1001682.jpeg?auto=compress&cs=tinysrgb&w=800",
      icon: ShieldCheck,
      accent: "#7A8F5A",
    },
  ];

  return (
    <section id="about" className="py-20 bg-[#F5F2ED]">
      <div className="container mx-auto px-8">
        <motion.div
          className="max-w-4xl mx-auto text-center mb-20"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-sm font-semibold tracking-[0.35em] text-[#C85A54] uppercase mb-4">
            Release 1.0 Production Build
          </p>
          <h2 className="text-5xl md:text-6xl font-bold text-[#3E2723] leading-tight font-serif mb-6">
            About WildScape Europe
          </h2>
          <p className="text-lg text-[#6B5B47] leading-relaxed">
            A working camping discovery and planning application built in a product lab by a human
            engineering workflow. Release 1.0 focuses on the complete outdoor planning loop:
            discover destinations, evaluate conditions, manage session state, prepare bookings, and
            travel responsibly.
          </p>
        </motion.div>

        <div className="space-y-32">
          {sections.map((section, index) => {
            const IconComponent = section.icon;
            const isEven = index % 2 === 0;

            return (
              <motion.div
                key={section.title}
                className={`grid md:grid-cols-2 gap-12 items-center ${isEven ? "" : "md:flex-row-reverse"}`}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                {/* Image Side - with organic shape */}
                <motion.div
                  className={`relative ${isEven ? "md:order-2" : "md:order-1"}`}
                  initial={{ opacity: 0, x: isEven ? 50 : -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                >
                  <div
                    className="relative overflow-hidden rounded-[40px] shadow-2xl"
                    style={{
                      clipPath: isEven
                        ? "polygon(0% 5%, 100% 0%, 100% 100%, 0% 95%)"
                        : "polygon(0% 0%, 100% 5%, 100% 95%, 0% 100%)",
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
                  <div
                    className="absolute -z-10 top-10 left-10 w-full h-full rounded-[40px] opacity-20"
                    style={{ backgroundColor: section.accent }}
                  />
                </motion.div>

                {/* Text Side */}
                <motion.div
                  className={`space-y-6 ${isEven ? "md:order-1" : "md:order-2"}`}
                  initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  <div
                    className="inline-block px-4 py-2 rounded-full text-xs font-medium tracking-wider"
                    style={{ backgroundColor: `${section.accent}20`, color: section.accent }}
                  >
                    {section.label}
                  </div>

                  <h2 className="text-5xl font-bold text-[#3E2723] leading-tight font-serif">
                    {section.title}
                  </h2>

                  <p className="text-lg text-[#6B5B47] leading-relaxed">{section.description}</p>

                  <motion.a
                    href="#about"
                    className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-medium transition-all duration-300"
                    style={{
                      backgroundColor: section.accent,
                      color: "white",
                    }}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Explore Release 1.0
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path
                        d="M1 8h14M8 1l7 7-7 7"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </motion.a>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
