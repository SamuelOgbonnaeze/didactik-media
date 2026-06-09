import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { PrivacyPolicyContent } from "../components/PrivacyPolicyContent";

export default function PrivacyPolicyPage() {
  return (
    <div>
      <Helmet>
        <title>Privacy Policy — Didactik Media</title>
        <meta name="description" content="Read the Didactik Media Privacy Policy to understand how we collect, use, and protect your data." />
        <link rel="canonical" href="https://www.didactikmedia.com/privacy" />
      </Helmet>

      {/* Header */}
      <section className="py-4 md:py-8 lg:py-12 bg-gradient-to-b from-bg-alt to-white">
        <div className="container">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-serif font-bold text-center"
          >
            Privacy{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text">
              Policy
            </span>
          </motion.h1>
        </div>
      </section>

      {/* Content */}
      <section className="py-8 md:py-16 bg-white">
        <div className="container px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <PrivacyPolicyContent />
          </motion.div>
        </div>
      </section>
    </div>
  );
}
