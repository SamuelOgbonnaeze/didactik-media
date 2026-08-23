import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";

interface FormData {
  contactName: string;
  companyName: string;
  email: string;
  phone: string;
  platformType: string;
  contentTypes: string[];
  regions: string[];
  titlesPerYear: string;
  privacyConsent: boolean;
}

const initialFormData: FormData = {
  contactName: "",
  companyName: "",
  email: "",
  phone: "",
  platformType: "",
  contentTypes: [],
  regions: [],
  titlesPerYear: "",
  privacyConsent: false,
};

const PLATFORM_TYPES = [
  "SVOD (Subscription Streaming)",
  "AVOD (Ad-Supported Streaming)",
  "FAST Channel",
  "Broadcast Network (TV)",
  "Cable / Pay TV",
  "Film Distributor",
  "Other",
];

const CONTENT_TYPES = [
  "Feature Films",
  "Short Films",
  "Drama Series",
  "Documentary",
  "Animation",
  "Reality / Unscripted",
];

const REGIONS = [
  "Nigeria",
  "Ghana",
  "East Africa",
  "Southern Africa",
  "Francophone Africa",
  "Pan-African",
  "International / Global",
];

const benefits = [
  {
    icon: "🎬",
    title: "150+ Catalogued Titles — Growing Daily",
    description:
      "Access a curated, AI-tagged library of African films and series — properly cleared, culturally contextualised, and ready for licensing.",
  },
  {
    icon: "⚡",
    title: "Direct Licensing. No Middlemen.",
    description:
      "Deal directly with rights holders through our transparent marketplace. Faster clearance, lower overhead, no opaque intermediary fees.",
  },
  {
    icon: "🌍",
    title: "Culturally Intelligent Discovery",
    description:
      "Search by language, theme, location, era, and cultural context — not just genre. Find exactly the content your audience wants.",
  },
  {
    icon: "📋",
    title: "Rights-Ready from Day One",
    description:
      "Every title on the platform is submitted with full rights documentation. We verify before it goes live — so you don't have to.",
  },
];

export default function BroadcasterWaitlist() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      if (name === "privacyConsent") {
        setFormData((prev) => ({ ...prev, privacyConsent: checked }));
      } else if (name === "contentTypes") {
        setFormData((prev) => ({
          ...prev,
          contentTypes: checked
            ? [...prev.contentTypes, value]
            : prev.contentTypes.filter((v) => v !== value),
        }));
      } else if (name === "regions") {
        setFormData((prev) => ({
          ...prev,
          regions: checked
            ? [...prev.regions, value]
            : prev.regions.filter((v) => v !== value),
        }));
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");

    const scriptUrl = import.meta.env.VITE_GOOGLE_SCRIPT_BROADCASTERS_URL;

    try {
      await fetch(scriptUrl, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          contactName: formData.contactName,
          companyName: formData.companyName,
          email: formData.email,
          phone: formData.phone,
          platformType: formData.platformType,
          contentTypes: formData.contentTypes.join(", ") || "—",
          regions: formData.regions.join(", ") || "—",
          titlesPerYear: formData.titlesPerYear || "—",
        }).toString(),
      });

      setStatus("success");
      setFormData(initialFormData);
    } catch (err) {
      console.error("Submission error:", err);
      setStatus("error");
    }
  };

  const inputClass =
    "w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors";
  const labelClass = "block text-sm font-semibold text-gray-700 mb-1.5";

  return (
    <div>
      <Helmet>
        <title>For Broadcasters & Streaming Services — Didactik Media</title>
        <meta
          name="description"
          content="License African films and series directly from rights holders. AI-powered discovery, rights-ready titles, no middlemen. Join the Didactik Media broadcaster waitlist."
        />
        <link rel="canonical" href="https://www.didactikmedia.com/for-broadcasters" />
      </Helmet>

      {/* ── Hero ── */}
      <section className="pt-6 pb-16 md:pt-10 md:pb-24 bg-gradient-to-b from-gray-950 to-gray-900 text-white">
        <div className="container">
          <div className="max-w-3xl">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-sm font-semibold text-secondary mb-4"
            >
              For Broadcasters & Streaming Services
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-6 leading-tight"
            >
              Africa's most{" "}
              <span className="bg-gradient-to-r from-secondary to-blue-400 bg-clip-text text-transparent">
                licensable catalogue.
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg md:text-xl text-gray-300 leading-relaxed mb-8"
            >
              Stop hunting for African content across fragmented intermediaries.
              Didactik Media is building the first rights-verified, AI-tagged
              library of African film and series — available directly to platforms
              like yours.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap gap-6 text-sm"
            >
              {["Rights-verified titles", "AI-powered search", "Direct from rights holders", "Pan-African library"].map((t) => (
                <div key={t} className="flex items-center gap-2 text-gray-400">
                  <span className="text-secondary font-bold">✓</span>
                  {t}
                </div>
              ))}
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

      {/* ── Form ── */}
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
                Request Early Access
              </h2>
              <p className="text-gray-500 text-center mb-8">
                Join the broadcaster waitlist. We'll reach out when your content categories are live.
              </p>

              {status === "success" ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8"
                >
                  <div className="text-5xl mb-4">📡</div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">You're on the list!</h3>
                  <p className="text-gray-600 leading-relaxed">
                    We'll be in touch as soon as titles matching your content profile are available.
                    Welcome to the future of African film licensing.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6" noValidate>

                  {/* Contact Details */}
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-4">
                      Contact Details
                    </h3>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="contactName" className={labelClass}>
                            Contact Name <span className="text-red-500">*</span>
                          </label>
                          <input
                            id="contactName"
                            name="contactName"
                            type="text"
                            required
                            value={formData.contactName}
                            onChange={handleChange}
                            placeholder="e.g. Amara Okonkwo"
                            className={inputClass}
                          />
                        </div>
                        <div>
                          <label htmlFor="companyName" className={labelClass}>
                            Company / Platform <span className="text-red-500">*</span>
                          </label>
                          <input
                            id="companyName"
                            name="companyName"
                            type="text"
                            required
                            value={formData.companyName}
                            onChange={handleChange}
                            placeholder="e.g. Showmax Africa"
                            className={inputClass}
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="email" className={labelClass}>
                            Email Address <span className="text-red-500">*</span>
                          </label>
                          <input
                            id="email"
                            name="email"
                            type="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="you@platform.com"
                            className={inputClass}
                          />
                        </div>
                        <div>
                          <label htmlFor="phone" className={labelClass}>
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
                            className={inputClass}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Platform Type */}
                  <div className="pt-2 border-t border-gray-100">
                    <h3 className="font-semibold text-gray-800 mb-4">
                      Platform Details
                    </h3>
                    <div>
                      <label htmlFor="platformType" className={labelClass}>
                        Platform Type <span className="text-red-500">*</span>
                      </label>
                      <select
                        id="platformType"
                        name="platformType"
                        required
                        value={formData.platformType}
                        onChange={handleChange}
                        className={`${inputClass} bg-white`}
                      >
                        <option value="" disabled>Select your platform type</option>
                        {PLATFORM_TYPES.map((type) => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Content Types */}
                  <div>
                    <label className={labelClass}>Content Types You're Looking For</label>
                    <p className="text-xs text-gray-400 mb-3">Select all that apply</p>
                    <div className="grid grid-cols-2 gap-2">
                      {CONTENT_TYPES.map((type) => (
                        <label key={type} className="flex items-center gap-2.5 cursor-pointer group">
                          <input
                            type="checkbox"
                            name="contentTypes"
                            value={type}
                            checked={formData.contentTypes.includes(type)}
                            onChange={handleChange}
                            className="w-4 h-4 accent-primary flex-shrink-0"
                          />
                          <span className="text-sm text-gray-700 group-hover:text-gray-900 transition-colors">
                            {type}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Target Regions */}
                  <div>
                    <label className={labelClass}>Target Regions</label>
                    <p className="text-xs text-gray-400 mb-3">Select all that apply</p>
                    <div className="grid grid-cols-2 gap-2">
                      {REGIONS.map((region) => (
                        <label key={region} className="flex items-center gap-2.5 cursor-pointer group">
                          <input
                            type="checkbox"
                            name="regions"
                            value={region}
                            checked={formData.regions.includes(region)}
                            onChange={handleChange}
                            className="w-4 h-4 accent-primary flex-shrink-0"
                          />
                          <span className="text-sm text-gray-700 group-hover:text-gray-900 transition-colors">
                            {region}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Volume */}
                  <div>
                    <label htmlFor="titlesPerYear" className={labelClass}>
                      Titles Needed per Year (estimate)
                    </label>
                    <input
                      id="titlesPerYear"
                      name="titlesPerYear"
                      type="number"
                      min="0"
                      value={formData.titlesPerYear}
                      onChange={handleChange}
                      placeholder="e.g. 50"
                      className={inputClass}
                    />
                  </div>

                  {/* Privacy Consent */}
                  <div className="pt-2 border-t border-gray-100">
                    <label className="flex items-start gap-3 cursor-pointer">
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
                        . I understand my details will be used to contact me about the broadcaster waitlist.{" "}
                        <span className="text-red-500">*</span>
                      </span>
                    </label>
                  </div>

                  {/* Error */}
                  {status === "error" && (
                    <p className="text-red-500 text-sm text-center bg-red-50 rounded-lg py-3 px-4">
                      Something went wrong. Please try again or email{" "}
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
                    Platform launches soon. Early access partners get priority onboarding.
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
