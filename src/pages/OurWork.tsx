import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

export default function OurWork() {
  const moves = [
    {
      number: "01",
      title: "Upload for Free. Store Forever.",
      description:
        "Filmmakers upload their work for free. We store it safely in secure, managed cloud environments. They can always re-download their master files — and over time, we build the cloud-based national film archive Nigeria has never had.",
    },
    {
      number: "02",
      title: "AI Tags So You're Found.",
      description:
        "Our AI applies culturally-informed metadata taxonomy — making content searchable by people, themes, locations, languages, Nigerian idioms, and more. Broadcasters find exactly what they need, without the gatekeepers.",
    },
    {
      number: "03",
      title: "Broadcasters Find and License.",
      description:
        "Broadcasters license with one click — directly from the platform. No middlemen, no hidden fees, no 'thank you' payments. Just transparent, enforceable deals. We take a commission only when a deal closes.",
    },
  ];

  const services = [
    { title: "Archival Audits", description: "Assess your content library and preservation needs" },
    { title: "Full Digitization", description: "Legacy format rescue (Betacam, U-matic, VHS, film)" },
    { title: "AI Metadata & Cataloging", description: "Culturally-informed, searchable taxonomy built for African content" },
    { title: "Subtitling & Localization", description: "Multi-language, platform-compliant subtitles" },
    { title: "Digital Asset Management", description: "Secure storage, access control, rights management" },
    { title: "Licensing & Distribution", description: "Direct pipeline to Showmax, Amazon Prime, and broadcast networks" },
  ];

  return (
    <div>
      <Helmet>
        <title>The Platform — Didactik Media</title>
        <meta name="description" content="One platform. Three moves. Filmmakers upload free, AI tags their content, broadcasters license directly. How Didactik Media connects Africa's creative economy." />
        <link rel="canonical" href="https://www.didactikmedia.com/our-work" />
      </Helmet>

      {/* Header */}
      <section className="pt-4 pb-12 md:pt-8 md:pb-16 bg-gradient-to-b from-bg-alt to-white">
        <div className="container">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm text-secondary font-semibold mb-3"
          >
            Preserve. Discover. Monetize.
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-4 max-w-3xl leading-tight"
          >
            One Platform.{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Three Moves.
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-gray-600 max-w-2xl"
          >
            We solve both sides of Africa's content pipeline problem — simultaneously.
            Makers get free, permanent storage and a direct channel to buyers.
            Buyers get instant access to a rich, searchable catalogue of African content.
          </motion.p>
        </div>
      </section>

      {/* Three Moves */}
      <section className="py-4 lg:py-16 bg-white">
        <div className="container">
          <div className="space-y-8 md:space-y-10">
            {moves.map((move, index) => (
              <motion.div
                key={move.number}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8 }}
                className="flex flex-col md:flex-row items-start gap-3 md:gap-6"
              >
                <div className="text-5xl md:text-7xl font-bold bg-gradient-to-br from-primary/20 to-secondary/20 bg-clip-text font-serif leading-none">
                  {move.number}
                </div>
                <div className="flex-1 pt-1 md:pt-2">
                  <h3 className="text-2xl md:text-3xl font-serif font-semibold mb-2 text-primary">
                    {move.title}
                  </h3>
                  <p className="text-base md:text-lg text-gray-600 leading-normal md:leading-relaxed">
                    {move.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Didactik is Different */}
      <section className="py-4 lg:py-16 bg-gray-950 text-white">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Nobody is building like this for Africa.
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
              {[
                {
                  label: "Zero Upfront Fees",
                  body: "Unlike global aggregators that charge up to $2,400+ per year, we charge nothing to upload or store. We only earn when you do.",
                },
                {
                  label: "Open to All Filmmakers",
                  body: "Not just the 5% with the right connections. Any independent filmmaker can upload, get tagged, and be discovered by broadcasters.",
                },
                {
                  label: "You Own Your Files",
                  body: "Master files remain yours. You retain full access, always. We're custodians — not gatekeepers.",
                },
              ].map((item) => (
                <div key={item.label} className="border border-gray-800 rounded-xl p-6">
                  <h3 className="font-bold text-secondary mb-2">{item.label}</h3>
                  <p className="text-gray-400 leading-relaxed">{item.body}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services */}
      <section className="py-4 lg:py-16 bg-bg-alt">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6 md:mb-8 text-primary">
            Our Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="card hover:border-secondary/20"
              >
                <h3 className="text-xl font-semibold mb-2 text-primary">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </motion.div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link to="/impact" className="cta-button">See Our Impact</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
