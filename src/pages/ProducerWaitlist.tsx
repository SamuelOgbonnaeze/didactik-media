import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";


interface FormData {
  fullName: string;
  productionCompany: string;
  email: string;
  phone: string;
  featureFilms: string;
  shortFilms: string;
  series: string;
  episodesPerSeries: string;
  privacyConsent: boolean;
}

const initialFormData: FormData = {
  fullName: "",
  productionCompany: "",
  email: "",
  phone: "",
  featureFilms: "",
  shortFilms: "",
  series: "",
  episodesPerSeries: "",
  privacyConsent: false,
};

const benefits = [
  {
    icon: "☁️",
    title: "Free Uploads. Permanent Storage.",
    description:
      "Upload your films for free and store them safely — forever. Your master files remain yours, always re-downloadable.",
  },
  {
    icon: "🤖",
    title: "AI Makes You Discoverable.",
    description:
      "Our AI applies culturally-informed metadata tags so broadcasters can find your content by theme, language, location, and more.",
  },
  {
    icon: "🤝",
    title: "Direct Deals. No Gatekeepers.",
    description:
      "Local and international broadcasters license directly from our platform — no middlemen, no 'thank you' fees. You keep the lion's share.",
  },
  {
    icon: "🔒",
    title: "You Own Your Rights.",
    description:
      "We're custodians, not gatekeepers. Your IP stays yours. Every deal is transparent and enforceable.",
  },
];

export default function ProducerWaitlist() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");

    const scriptUrl = import.meta.env.VITE_GOOGLE_SCRIPT_WAITLIST_URL;

    try {
      await fetch(scriptUrl, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          fullName: formData.fullName,
          productionCompany: formData.productionCompany,
          email: formData.email,
          phone: formData.phone,
          featureFilms: formData.featureFilms || "—",
          shortFilms: formData.shortFilms || "—",
          series: formData.series || "—",
          episodesPerSeries: formData.episodesPerSeries || "—",
        }).toString(),
      });

      setStatus("success");
      setFormData(initialFormData);
    } catch (err) {
      console.error("Submission error:", err);
      setStatus("error");
    }
  };

  return (
    <div>
      <Helmet>
        <title>Producer Waitlist — Didactik Media</title>
        <meta
          name="description"
          content="Join 150+ filmmakers on the Didactik Media waitlist. Free uploads, AI discoverability, direct licensing to local and international broadcasters. No gatekeepers."
        />
        <link rel="canonical" href="https://www.didactikmedia.com/waitlist" />
      </Helmet>

      {/* ── Hero ── */}
      <section className="pt-6 pb-16 md:pt-10 md:pb-24 bg-gradient-to-b from-gray-950 to-gray-900 text-white">
        <div className="container">
          <div className="max-w-3xl">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-xs font-bold tracking-widest uppercase text-secondary mb-4"
            >
              For Filmmakers & Producers
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-6 leading-tight"
            >
              Your film deserves{" "}
              <span className="bg-gradient-to-r from-secondary to-blue-400 bg-clip-text text-transparent">
                to be found.
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg md:text-xl text-gray-300 leading-relaxed mb-8"
            >
              150+ films are already on the waitlist. Join Africa's first open
              licensing marketplace — free to upload, AI-powered discovery,
              transparent deals. No gatekeepers. No upfront fees.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap gap-6 text-sm"
            >
              <div className="flex items-center gap-2 text-gray-400">
                <span className="text-secondary font-bold">✓</span>
                Free to upload
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <span className="text-secondary font-bold">✓</span>
                You own your files
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <span className="text-secondary font-bold">✓</span>
                Direct broadcaster licensing
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <span className="text-secondary font-bold">✓</span>
                No middlemen
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Benefits ── */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">
            What you get on the platform
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="bg-bg-alt rounded-xl p-6 text-center"
              >
                <div className="text-4xl mb-3">{benefit.icon}</div>
                <h3 className="font-bold text-gray-900 mb-2 text-sm">{benefit.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Waitlist Form ── */}
      <section className="py-12 md:py-20 bg-bg-alt">
        <div className="container">
          <div className="max-w-2xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 md:p-12"
            >
              <h2 className="text-2xl md:text-3xl font-serif font-bold mb-2 text-center">
                Join the Waitlist
              </h2>
              <p className="text-gray-500 text-center mb-8">
                Secure your spot on Africa's first open film licensing marketplace.
              </p>

              {status === "success" ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8"
                >
                  <div className="text-5xl mb-4">🎬</div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">You're on the list!</h3>
                  <p className="text-gray-600 leading-relaxed">
                    We've received your details and will be in touch soon. Welcome to the
                    future of African film licensing.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                  {/* Contact Details */}
                  <div className="pb-2">
                    <h3 className="font-semibold text-gray-800 mb-4">
                      Contact Details
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="fullName" className="block text-sm font-semibold text-gray-700 mb-1.5">
                          Full Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          id="fullName"
                          name="fullName"
                          type="text"
                          required
                          value={formData.fullName}
                          onChange={handleChange}
                          placeholder="e.g. Chidinma Okafor"
                          className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                        />
                      </div>

                      <div>
                        <label htmlFor="productionCompany" className="block text-sm font-semibold text-gray-700 mb-1.5">
                          Production Company <span className="text-red-500">*</span>
                        </label>
                        <input
                          id="productionCompany"
                          name="productionCompany"
                          type="text"
                          required
                          value={formData.productionCompany}
                          onChange={handleChange}
                          placeholder="e.g. Silverbird Productions"
                          className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-1.5">
                            Email Address <span className="text-red-500">*</span>
                          </label>
                          <input
                            id="email"
                            name="email"
                            type="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="you@company.com"
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                          />
                        </div>
                        <div>
                          <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-1.5">
                            Phone Number <span className="text-red-500">*</span>
                          </label>
                          <input
                            id="phone"
                            name="phone"
                            type="tel"
                            required
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="+234 800 000 0000"
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Project Commitment */}
                  <div className="pt-2 border-t border-gray-100">
                    <h3 className="font-semibold text-gray-800 mb-1">
                      Project Commitment
                    </h3>
                    <p className="text-xs text-gray-400 mb-4">
                      How much content are you committing to the platform? (Optional — give us your best estimate)
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="featureFilms" className="block text-sm font-semibold text-gray-700 mb-1.5">
                          Feature Films
                        </label>
                        <input
                          id="featureFilms"
                          name="featureFilms"
                          type="number"
                          min="0"
                          value={formData.featureFilms}
                          onChange={handleChange}
                          placeholder="0"
                          className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                        />
                      </div>
                      <div>
                        <label htmlFor="shortFilms" className="block text-sm font-semibold text-gray-700 mb-1.5">
                          Short Films
                        </label>
                        <input
                          id="shortFilms"
                          name="shortFilms"
                          type="number"
                          min="0"
                          value={formData.shortFilms}
                          onChange={handleChange}
                          placeholder="0"
                          className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                        />
                      </div>
                      <div>
                        <label htmlFor="series" className="block text-sm font-semibold text-gray-700 mb-1.5">
                          Series / Shows
                        </label>
                        <input
                          id="series"
                          name="series"
                          type="number"
                          min="0"
                          value={formData.series}
                          onChange={handleChange}
                          placeholder="0"
                          className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                        />
                      </div>
                      <div>
                        <label htmlFor="episodesPerSeries" className="block text-sm font-semibold text-gray-700 mb-1.5">
                          Avg. Episodes per Series
                        </label>
                        <input
                          id="episodesPerSeries"
                          name="episodesPerSeries"
                          type="number"
                          min="0"
                          value={formData.episodesPerSeries}
                          onChange={handleChange}
                          placeholder="0"
                          className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Privacy consent */}
                  <div className="pt-2">
                    <label className="flex items-start gap-3 cursor-pointer group">
                      <input
                        id="privacyConsent"
                        name="privacyConsent"
                        type="checkbox"
                        required
                        checked={formData.privacyConsent}
                        onChange={handleChange}
                        className="mt-0.5 w-4 h-4 accent-primary flex-shrink-0"
                      />
                      <span className="text-sm text-gray-500 leading-relaxed">
                        I agree to Didactik Media's{" "}
                        <a href="/privacy" className="text-primary underline hover:no-underline">
                          Privacy Policy
                        </a>
                        . I understand my details will be used to contact me about the platform waitlist.{" "}
                        <span className="text-red-500">*</span>
                      </span>
                    </label>
                  </div>

                  {/* Error */}
                  {status === "error" && (
                    <p className="text-red-500 text-sm text-center bg-red-50 rounded-lg py-3 px-4">
                      Something went wrong. Please try again or email us directly at{" "}
                      <a href="mailto:onboarding@didactikmedia.com" className="underline">
                        onboarding@didactikmedia.com
                      </a>
                    </p>
                  )}

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={status === "sending" || !formData.privacyConsent}
                    className="w-full cta-button disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {status === "sending" ? (
                      <>
                        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        Submitting...
                      </>
                    ) : (
                      "Request Early Access"
                    )}
                  </button>

                  <p className="text-xs text-gray-400 text-center">
                    150+ films already waitlisted. Platform launches soon.
                  </p>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
