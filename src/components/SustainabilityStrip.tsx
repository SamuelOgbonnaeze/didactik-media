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
            Built to Last. Open to the World.
          </h2>

          <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-8">
            We are building Nigeria's first cloud-based digital archive —
            preserving film and broadcast heritage in cold storage that lasts
            over 50 years, and making it accessible to filmmakers, researchers,
            and institutions across the globe.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <div className="bg-white p-2 md:p-4 lg:p-6 rounded-lg shadow-md">
              <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-green-600 mb-2">90%</div>
              <p className="text-xs md:text-sm lg:text-base text-gray-600">Carbon Reduction vs Physical Vaults</p>
            </div>
            <div className="bg-white p-2 md:p-4 lg:p-6 rounded-lg shadow-md">
              <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-green-600 mb-2">LTO</div>
              <p className="text-xs md:text-sm lg:text-base text-gray-600">Cold Storage Technology</p>
            </div>
            <div className="bg-white p-2 md:p-4 lg:p-6 rounded-lg shadow-md">
              <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-green-600 mb-2">50+</div>
              <p className="text-xs md:text-sm lg:text-base text-gray-600">Years Archive Lifespan</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
