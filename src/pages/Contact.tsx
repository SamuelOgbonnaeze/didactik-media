import { motion } from "framer-motion";
import { useState, type FormEvent } from "react";
import { Helmet } from "react-helmet-async";
import {
  FaLinkedin,
  FaInstagram,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { LegalDrawer } from "../components/ui/LegalDrawer";
import { PrivacyPolicyContent } from "../components/PrivacyPolicyContent";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    organization: "",
    email: "",
    message: "",
    consented: false,
  });
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!formData.consented) return;

    setIsSubmitting(true);
    setSubmitStatus("idle");

    const scriptUrl = import.meta.env.VITE_GOOGLE_SCRIPT_CONTACT_URL;

    try {
      await fetch(scriptUrl, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          name: formData.name,
          organization: formData.organization,
          email: formData.email,
          message: formData.message,
        }).toString(),
      });

      setIsSubmitting(false);
      setSubmitStatus("success");
      setFormData({ name: "", organization: "", email: "", message: "", consented: false });
      setTimeout(() => setSubmitStatus("idle"), 5000);
    } catch (error) {
      console.error("Form submission error:", error);
      setIsSubmitting(false);
      setSubmitStatus("error");
      setTimeout(() => setSubmitStatus("idle"), 5000);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value, type } = e.target;
    const val = type === "checkbox" ? (e.target as HTMLInputElement).checked : value;
    setFormData({ ...formData, [name]: val });
  };

  return (
    <div>
      <Helmet>
        <title>Contact Didactik Media</title>
        <meta name="description" content="Reach out to Didactik Media to discuss archival partnerships, digitization projects, and collaboration." />
        <link rel="canonical" href="https://www.didactikmedia.com/contact" />
      </Helmet>

      {/* Header */}
      <section className="pt-4 pb-12 md:pt-8 md:pb-16 bg-gradient-to-b from-bg-alt to-white">
        <div className="container">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-serif font-bold mb-4"
          >
            Secure Your Legacy.
          </motion.h1>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-4 md:py-8 lg:py-12 bg-white">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl font-serif font-bold mb-4">Get In Touch</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-1">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label htmlFor="organization" className="block text-sm font-medium mb-1">
                    Organization *
                  </label>
                  <input
                    type="text"
                    id="organization"
                    name="organization"
                    value={formData.organization}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-1">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-all resize-none"
                  />
                </div>

                <div className="flex items-start gap-3 mt-4">
                  <input
                    id="consented"
                    name="consented"
                    type="checkbox"
                    checked={formData.consented}
                    onChange={handleChange}
                    required
                    className="mt-1 h-4 w-4 rounded border-gray-300 text-secondary focus:ring-secondary"
                  />
                  <label htmlFor="consented" className="text-sm text-gray-700 cursor-pointer">
                    I consent to Didactik Media processing my information to respond to my inquiry,
                    in accordance with the{" "}
                    <button
                      type="button"
                      onClick={() => setIsDrawerOpen(true)}
                      className="text-secondary hover:underline font-medium"
                    >
                      Privacy Policy
                    </button>
                    .
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || !formData.consented}
                  className="w-full cta-button disabled:opacity-50 disabled:cursor-not-allowed mt-2"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>

                {submitStatus === "success" && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-green-600 text-center"
                  >
                    Thank you! We'll be in touch soon.
                  </motion.p>
                )}

                {submitStatus === "error" && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-600 text-center"
                  >
                    Failed to send message. Please try again or email us directly.
                  </motion.p>
                )}
              </form>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl font-serif font-bold mb-4">Contact Information</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-2 flex items-center gap-2">
                    <FaEnvelope className="text-primary" />
                    Email
                  </h3>
                  <a
                    href="mailto:onboarding@didactikmedia.com"
                    className="mt-1 text-gray-500 hover:text-primary transition-colors"
                  >
                    onboarding@didactikmedia.com
                  </a>
                </div>

                <div>
                  <h3 className="font-semibold mb-2 flex items-center gap-2">
                    <FaMapMarkerAlt className="text-primary" />
                    Location
                  </h3>
                  <p className="text-gray-600 ml-6">Lagos, Nigeria</p>
                </div>

                <div>
                  <h3 className="font-semibold mb-4">Connect With Us</h3>
                  <div className="space-y-3">
                    <p>
                      <a
                        href="https://www.linkedin.com/company/didactik-media/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-secondary hover:text-primary transition-colors flex items-center gap-2"
                      >
                        <FaLinkedin className="text-primary text-xl" />
                        Didactik Media
                      </a>
                    </p>
                    <p>
                      <a
                        href="https://instagram.com/didactikmedia"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-secondary hover:text-primary transition-colors flex items-center gap-2"
                      >
                        <FaInstagram className="text-primary text-xl" />
                        @didactikmedia
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <LegalDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}>
        <PrivacyPolicyContent />
      </LegalDrawer>
    </div>
  );
}
