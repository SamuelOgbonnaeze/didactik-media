import { motion } from "framer-motion";

export default function SustainabilityStrip() {
  return (
    <section
      id="sustainability"
      className="py-4 md:py-3 lg:py-12 bg-gradient-to-br from-green-50 to-emerald-50"
    >
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center"
        >
          <div className="inline-block mb-6">
            <div className="flex items-center gap-3 bg-green-100 text-green-800 px-6 py-3 rounded-full font-semibold">
              <span className="text-2xl">🗄️</span>
              <span>Nigeria's First Cloud-Based Digital Archive</span>
            </div>
          </div>

          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">
            Nigeria's first cloud-based digital media archive.
          </h2>

          <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
            We are building Nigeria's first cloud-based digital archive — preserving film and
            broadcast heritage using cloud technology, making it accessible to filmmakers,
            researchers, and institutions around the world, for generations to come.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
