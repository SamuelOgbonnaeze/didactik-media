import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import ImageWithSkeleton from "../components/ImageWithSkeleton";
import { Link } from "react-router-dom";

export default function About() {
  const values = [
    { title: "Truth", description: "We tell honest stories about African creative history — no myths, no erasure." },
    { title: "Stewardship", description: "Responsible guardianship of the cultural assets entrusted to us." },
    { title: "Innovation", description: "Applying AI and modern technology to heritage that deserves to endure." },
    { title: "Equity", description: "Building infrastructure that works for every filmmaker, not just the 5% with connections." },
  ];

  const vision2030 = [
    { stat: "50,000+", label: "Active creators & institutions on the platform" },
    { stat: "5M+", label: "Hours of African content preserved & licensing-ready" },
    { stat: "$25M", label: "Revenue returned to creators annually" },
    { stat: "$100M", label: "Value generated for the African creative economy" },
  ];

  return (
    <div>
      <Helmet>
        <title>About Didactik Media — Architects of African Creative Memory</title>
        <meta name="description" content="Meet Emem Attah and the team building Africa's operating system for creative memory — the marketplace connecting filmmakers with broadcasters across the continent." />
        <link rel="canonical" href="https://www.didactikmedia.com/about" />
      </Helmet>

      {/* Header */}
      <section className="pt-4 pb-12 md:pt-8 md:pb-16 bg-gradient-to-b from-bg-alt to-white">
        <div className="container">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-serif font-bold -mb-2"
          >
            Architects of{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Memory.
            </span>
          </motion.h1>
        </div>
      </section>

      {/* Founder's Bio */}
      <section className="py-4 md:py-8 lg:py-12 bg-white">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-6xl mx-auto"
          >
            <h2 className="text-3xl font-serif font-bold mb-8">Founder's Bio</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative"
              >
                <ImageWithSkeleton
                  src="/images/emem.png"
                  alt="Ememobong Attah, Founder & CEO"
                  className="w-full h-auto rounded-2xl shadow-2xl border-4 border-white"
                  skeletonClassName="rounded-2xl"
                />
              </motion.div>

              <div className="space-y-4 md:space-y-6 text-base md:text-lg text-gray-700 leading-normal md:leading-relaxed">
                <div className="mb-4">
                  <h3 className="text-2xl font-serif font-semibold mb-2">Emem Attah | Founder & CEO</h3>
                  <p className="text-base italic text-gray-600">
                    LL.B (Babcock University) | Intellectual Property & Media Strategist |
                    CP Innovate Grant 2024 (Finalist) | Deji Alli ARM Young Talent Award —
                    Top 63 High-Potential Founders, 2026
                  </p>
                </div>
                <p>
                  Emem holds the distinction of being the youngest-ever TV Producer for
                  Africa Magic (Multichoice), where she managed high-volume media lifecycles
                  for major African productions. Trained as a lawyer, she saw firsthand how
                  much of our history and creative labour was undocumented, poorly preserved,
                  or lost entirely.
                </p>
                <p>
                  After leaving production, she founded Didactik Media to respond to that
                  absence. Leveraging her legal expertise in Intellectual Property and
                  Copyright Law, Emem architected Didactik's AI-powered African Cultural
                  Taxonomy — a defensible IP asset that meets international archival standards
                  while protecting African data sovereignty.
                </p>
                <p>
                  She is currently leading Didactik's transition from Nigeria's premier
                  digitization service into a scalable tech platform for the continent's
                  audiovisual memory — connecting filmmakers directly with broadcasters,
                  and creating sustainable economic opportunity for Africa's creative sector.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-4 md:py-8 lg:py-12 bg-bg-alt">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-3xl font-serif font-bold mb-8 text-center">Our Story</h2>
            <div className="space-y-4 md:space-y-6 text-base md:text-lg text-gray-700 leading-normal md:leading-relaxed">
              <p>
                Didactik Media was founded to address a critical gap in Africa's creative
                economy: the systematic loss of audiovisual heritage. Decades of cultural
                production were disappearing — taking with them not just content, but the
                raw material for future creativity, research, and economic opportunity.
              </p>
              <p>
                We started as Nigeria's premier archival and digitization service — working
                with broadcasters, production companies, and cultural institutions to rescue,
                preserve, and catalog their archives. With 15+ institutional clients and
                partnerships with Showmax, Amazon Prime Video, and national bodies like the
                National Council for Arts & Culture, we validated both the need and the model.
              </p>
              <p>
                Today, we're evolving into something bigger: the operating system for African
                creative memory. A platform where filmmakers upload for free, our AI makes
                their work discoverable, and broadcasters license directly — no gatekeepers,
                no hidden fees, just transparent deals that return fair value to creators.
              </p>
              <p>
                We believe that preserving Africa's audiovisual heritage is not just about
                looking backward — it's about building the foundation for a thriving creative
                economy that can compete globally while remaining rooted in authentic African
                narratives.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Vision 2030 */}
      <section className="py-4 md:py-8 lg:py-12 bg-gray-950 text-white">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-5xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Vision 2030</h2>
            <p className="text-gray-400 text-lg mb-10 max-w-2xl">
              We are building the infrastructure that Africa's film industry runs on. By 2030:
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {vision2030.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className="text-center"
                >
                  <div className="text-3xl md:text-4xl font-bold text-secondary mb-2">{item.stat}</div>
                  <div className="text-sm text-gray-400 leading-snug">{item.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-4 md:py-8 lg:py-12 bg-white">
        <div className="container">
          <h2 className="text-4xl font-serif font-bold mb-12 text-center">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="text-center"
              >
                <h3 className="text-2xl font-serif font-semibold mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <Link to="/contact" className="cta-button">Get In Touch</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
