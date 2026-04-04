import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import TeamTree from "../components/TeamTree";

export default function Team() {
  return (
    <div>
      <Helmet>
        <title>The Team — Didactik Media</title>
        <meta name="description" content="Meet the team of archivists, technologists, and media professionals at Didactik Media." />
        <link rel="canonical" href="https://www.didactikmedia.com/team" />
      </Helmet>
      {/* Header */}
      <section className="py-16 bg-gradient-to-b from-bg-alt to-white">
        <div className="container">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-serif font-bold mb-4"
          >
            Meet{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text">
              Our Team.
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-600 max-w-3xl"
          >
            A dedicated group of archivists, coordinators, and cultural
            preservation specialists committed to securing Africa's audiovisual
            heritage.
          </motion.p>
        </div>
      </section>

      {/* Team Tree */}
      <TeamTree />

      {/* Team Stats */}
      <section className="py-16 bg-white">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-3xl font-serif font-bold mb-8 text-center">
              Team Impact
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold text-primary mb-2">
                  99.5%
                </div>
                <p className="text-gray-600">On-Time Delivery Rate</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary mb-2">100%</div>
                <p className="text-gray-600">Client Retention</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary mb-2">30%</div>
                <p className="text-gray-600">Active Projects Managed</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-bg-alt">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-3xl font-serif font-bold mb-6">
              Join Our Mission
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              We're always looking for passionate individuals who share our
              commitment to preserving Africa's cultural heritage.
            </p>
            <Link to="/contact" className="cta-button">
              Get In Touch
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
