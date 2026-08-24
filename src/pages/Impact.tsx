import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

export default function Impact() {
  return (
    <div>
      <Helmet>
        <title>Our Impact — Didactik Media</title>
        <meta name="description" content="150+ films waitlisted, 15+ institutional clients, MVP complete. See the measurable cultural and economic impact of Didactik Media." />
        <link rel="canonical" href="https://www.didactikmedia.com/impact" />
      </Helmet>

      {/* Header */}
      <section className="pt-4 pb-12 md:pt-8 md:pb-16 bg-gradient-to-b from-bg-alt to-white">
        <div className="container">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-4"
          >
            Why{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              This Matters.
            </span>
          </motion.h1>
        </div>
      </section>

      {/* Two-Column Impact */}
      <section className="py-4 lg:py-16 bg-white">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-2xl md:text-3xl font-serif font-bold mb-3 md:mb-4 text-primary">
                The Cultural Imperative
              </h2>
              <div className="space-y-3 md:space-y-4 text-base md:text-lg text-gray-700 leading-normal md:leading-relaxed">
                <p>Preventing the permanent loss of history — 70%+ of pre-2000 Nigerian TV content is already gone.</p>
                <p>Building a credible, searchable record for research, education, and future production.</p>
                <p>Safeguarding the narratives that define us for generations that haven't been born yet.</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-2xl md:text-3xl font-serif font-bold mb-3 md:mb-4 text-primary">
                The Economic Engine
              </h2>
              <div className="space-y-3 md:space-y-4 text-base md:text-lg text-gray-700 leading-normal md:leading-relaxed">
                <p>Turning dead storage into revenue — reviving billions in creative IP that currently sits idle on hard drives.</p>
                <p>Enabling licensing, syndication, and new productions on local and international streaming platforms.</p>
                <p>Professionalizing the creative industry's assets — producers currently lose 15–30% of potential revenue from inaccessible archives.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Traction Numbers */}
      <section className="py-4 lg:py-16 bg-bg-alt">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-10"
          >
            <span className="inline-block bg-secondary/10 text-secondary px-4 py-1.5 rounded-full text-sm font-semibold tracking-wide uppercase mb-4">
              Traction
            </span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold">
              The market has already spoken.
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-4xl mx-auto">
            {[
              { stat: "150+", label: "Films Waitlisted, Ready to Upload" },
              { stat: "15+", label: "Institutional Clients Served" },
              { stat: "MVP", label: "Platform Build Complete & Live" },
              { stat: "2", label: "Active Institutional Partnerships (NCAC & WTO)" },
            ].map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="text-center bg-white rounded-xl p-5 md:p-6 shadow-sm border border-gray-100"
              >
                <div className="text-3xl md:text-4xl font-bold text-secondary mb-2">{item.stat}</div>
                <div className="text-xs text-gray-500 leading-snug">{item.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Quote */}
      <section className="py-4 lg:py-16 bg-gray-950 text-white">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center px-4"
          >
            <div className="text-5xl md:text-6xl text-secondary mb-2 md:mb-4 leading-none">"</div>
            <blockquote className="text-xl md:text-3xl font-serif italic text-white mb-4 leading-normal md:leading-relaxed">
              Let's build the archive that future generations will thank us for.
            </blockquote>
            <p className="text-gray-400 text-lg">- Emem Attah, Founder & CEO</p>
          </motion.div>

          <div className="mt-10 text-center">
            <Link to="/about" className="inline-block bg-white text-primary font-bold py-3 px-6 rounded-lg hover:bg-gray-100 transition-colors">
              Meet Our Team
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
