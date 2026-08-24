import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import LogoMarquee from "../components/LogoMarquee";
import SustainabilityStrip from "../components/SustainabilityStrip";
import ImageWithSkeleton from "../components/ImageWithSkeleton";

export default function Home() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div>
      <Helmet>
        <title>Didactik Media — Preserve. Discover. Monetize.</title>
        <meta
          name="description"
          content="The operating system for African creative memory. We connect Africa's filmmakers directly with broadcasters — free to upload, AI-tagged, licensed with one click."
        />
        <link rel="canonical" href="https://www.didactikmedia.com/" />
      </Helmet>

      {/* ── Hero ── */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="pt-10 pb-20 md:pt-16 md:pb-32 bg-gradient-to-b from-white to-bg-alt flex items-center"
      >
        <div className="container relative flex items-start min-h-[80vh]">
          <div className="flex-1 max-w-2xl lg:max-w-3xl relative z-10">
            <motion.p
              variants={itemVariants}
              className="text-sm sm:text-base font-semibold text-secondary mb-4"
            >
              Preserve. Discover. Monetize.
            </motion.p>

            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold mb-6 leading-tight"
            >
              The Operating System for{" "}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                African Creative Memory.
              </span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl leading-relaxed"
            >
              Africa's filmmakers and producers sit on thousands of hours of
              untapped stories. Local broadcasters and international streaming
              services are actively onboarding new content. We connect both —
              directly, fairly, and at scale.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-4 mb-10"
            >
              <Link to="/waitlist" className="cta-button">
                Filmmaker Waitlist
              </Link>
              <Link
                to="/for-broadcasters"
                className="inline-flex items-center px-6 py-3 bg-primary text-white font-bold rounded-lg hover:bg-primary/90 transition-colors"
              >
                Broadcaster Waitlist
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:border-primary hover:text-primary transition-colors"
              >
                Talk to Us
              </Link>
            </motion.div>

          </div>
          
          <motion.div
            initial={{ opacity: 0, x: 50, rotate: 5 }}
            animate={{ opacity: 0.2, x: 0, rotate: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="absolute right-0 top-1/2 -translate-y-1/2 hidden lg:block z-0 w-[60%]"
          >
            <motion.div
              animate={{
                y: [0, -15, 0],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <ImageWithSkeleton
                src="/images/film-reel-hero.webp"
                alt="Vintage film reel artistic illustration"
                className="w-full h-auto object-contain drop-shadow-2xl ml-auto"
              />
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* ── Logo Marquee ── */}
      <section className="py-6 bg-white border-y border-gray-100">
        <div className="container">
          <p className="text-sm font-medium text-gray-500 text-center mb-4">
            Providing archival services to
          </p>
          <LogoMarquee />
        </div>
      </section>

      {/* ── Preservation / Knowledge / Access ── */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                title: "Preservation",
                description: "Rescue and digitize at-risk film & broadcast archives before they are gone for good.",
              },
              {
                title: "Knowledge",
                description: "Apply intelligent, culturally-informed cataloging so Africa's stories are searchable and findable.",
              },
              {
                title: "Access",
                description: "Enable discovery, distribution, and new revenue streams for creators and institutions alike.",
              },
            ].map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                className="card hover:border-primary/20"
              >
                <h3 className="text-2xl font-serif font-semibold mb-4 text-primary">
                  {value.title}
                </h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── The Problem ── */}
      <section className="py-16 md:py-24 bg-gray-950 text-white">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8 }}
            className="max-w-5xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-12 leading-tight">
              A $6.4B industry with{" "}
              <span className="bg-gradient-to-r from-secondary to-blue-400 bg-clip-text text-transparent">
                no pipeline.
              </span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {[
                {
                  label: "The Maker",
                  body: "Creates the film. Most don't archive — they see no immediate return. Without industry access, their work never reaches buyers.",
                },
                {
                  label: "The Buyer",
                  body: "Needs fresh content. Can't find anyone outside their personal network. Local broadcasters and international streaming services are actively searching.",
                },
                {
                  label: "The Cost",
                  body: "Thousands of hours of great stories sit on hard drives. No one gets paid. Over 70% of pre-2000 Nigerian television is already gone — forever.",
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="border border-gray-800 rounded-xl p-6 hover:border-secondary/40 transition-colors"
                >
                  <h3 className="text-lg font-bold text-secondary mb-3">{item.label}</h3>
                  <p className="text-gray-400 leading-relaxed text-sm md:text-base">{item.body}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── One Platform. Three Moves. ── */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7 }}
            className="text-center mb-14"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
              Earning{" "}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                and Preserving.
              </span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We solve both sides of the problem simultaneously — connecting
              Africa's filmmakers directly with the broadcasters who need their stories.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              {
                number: "01",
                title: "Upload for Free. Store Forever.",
                description:
                  "Filmmakers upload for free. We store it safely. They always retain full access to their master files — and together we build the cloud-based national film archive Nigeria has never had.",
                bgClass: "bg-primary text-white",
                numClass: "text-white/30",
                bodyClass: "text-white/70",
              },
              {
                number: "02",
                title: "AI Tags So You're Found.",
                description:
                  "Our AI tags content with culturally-informed metadata — searchable by themes, people, location, and language. Broadcasters find exactly what they need, instantly.",
                bgClass: "bg-gray-900 text-white",
                numClass: "text-white/20",
                bodyClass: "text-white/70",
              },
              {
                number: "03",
                title: "Broadcasters Find and License.",
                description:
                  "Broadcasters and streaming services license with just one click. No gatekeepers. No hidden fees. Just direct, transparent deals — and creators keep the lion's share.",
                bgClass: "bg-gray-100 text-gray-900",
                numClass: "text-gray-300",
                bodyClass: "text-gray-600",
              },
            ].map((move, index) => (
              <motion.div
                key={move.number}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: index * 0.15, duration: 0.6 }}
                className={`rounded-2xl p-8 ${move.bgClass}`}
              >
                <div className={`text-5xl font-bold mb-4 ${move.numClass}`}>{move.number}.</div>
                <h3 className="text-xl font-bold mb-3">{move.title}</h3>
                <p className={`leading-relaxed text-sm md:text-base ${move.bodyClass}`}>{move.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Traction ── */}
      <section className="py-16 md:py-24 bg-bg-alt">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-12"
          >
            <span className="inline-block bg-secondary/10 text-secondary px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
              Traction
            </span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
              The proof is already here.
            </h2>
            <p className="text-lg text-gray-600 max-w-xl mx-auto">
              We didn't wait to validate. We built, served clients, and the market responded.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-4xl mx-auto">
            {[
              { stat: "150+", label: "Films Waitlisted & Ready to Upload" },
              { stat: "15+", label: "Institutional Clients Served" },
              { stat: "MVP", label: "Build Complete & Live" },
              { stat: "2", label: "Active Institutional Partnerships" },
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

      {/* ── Dual CTA ── */}
      <section className="py-16 md:py-24 bg-gray-950 text-white">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="bg-primary rounded-2xl p-8 md:p-10 flex flex-col"
            >
              <span className="text-sm font-semibold text-white/60 mb-4">For Investors</span>
              <h3 className="text-2xl md:text-3xl font-bold mb-4 leading-tight">
                Ready to back Africa's creative infrastructure?
              </h3>
              <p className="text-white/70 leading-relaxed mb-8 flex-1">
                We're building the pipeline that a $6.4B industry has never had. If you want to be part of it, let's talk.
              </p>
              <Link
                to="/contact"
                className="inline-block bg-white text-primary font-bold py-3 px-6 rounded-lg text-center hover:bg-gray-100 transition-colors"
              >
                Get In Touch
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="bg-gray-800 rounded-2xl p-8 md:p-10 flex flex-col border border-gray-700"
            >
              <span className="text-sm font-semibold text-secondary mb-4">For Filmmakers & Producers</span>
              <h3 className="text-2xl md:text-3xl font-bold mb-4 leading-tight">
                Your film deserves to be found.
              </h3>
              <p className="text-white/70 leading-relaxed mb-8 flex-1">
                150+ films are already on the waitlist. Secure your place in Africa's first open licensing marketplace — free to upload, transparent on every deal.
              </p>
              <Link
                to="/waitlist"
                className="inline-block bg-secondary text-white font-bold py-3 px-6 rounded-lg text-center hover:bg-secondary/90 transition-colors"
              >
                Join the Waitlist
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Sustainability Strip ── */}
      <SustainabilityStrip />

      {/* ── Featured In The News ── */}
      <section className="py-12 md:py-20 bg-bg-alt">
        <div className="container">
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="w-full lg:w-5/12"
            >
              <div className="relative rounded-xl overflow-hidden shadow-2xl border-4 border-white transform hover:scale-[1.02] transition-transform duration-500">
                <ImageWithSkeleton
                  src="/images/guardian-feature.png"
                  alt="Didactik Media featured in The Guardian"
                  className="w-full h-auto object-cover"
                  skeletonClassName="rounded-xl"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="w-full lg:w-6/12 lg:ml-auto"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="bg-secondary/10 text-secondary px-3 py-1 rounded-full text-sm font-semibold">
                  Featured Story
                </span>
                <span className="text-gray-400 text-sm">|</span>
                <span className="text-gray-500 font-serif italic">The Guardian</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4 text-primary leading-tight">
                Preserving Nigeria's Cultural Legacy
              </h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Read about our vision and impact in this feature by The Guardian,
                highlighting how Didactik Media is saving the nation's
                film history before it's lost.
              </p>
              <a
                href="https://guardian.ng/art/preserving-nigerias-cultural-legacy-vision-impact-of-didactik-media/"
                target="_blank"
                rel="noopener noreferrer"
                className="cta-button inline-flex items-center gap-2"
              >
                Read Full Article
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Vision Closing ── */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <blockquote className="text-2xl md:text-4xl lg:text-5xl font-serif font-bold text-gray-900 leading-snug mb-6">
              "Let's build the archive that future generations will thank us for."
            </blockquote>
            <p className="text-gray-500 text-lg mb-10">— Emem Attah, Founder & CEO</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/contact" className="cta-button">Talk to Us</Link>
              <Link
                to="/waitlist"
                className="inline-flex items-center px-6 py-3 border-2 border-secondary text-secondary font-semibold rounded-lg hover:bg-secondary hover:text-white transition-all"
              >
                Join the Waitlist
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
