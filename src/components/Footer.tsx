import {
  FaLinkedin,
  FaInstagram,
  FaEnvelope,
  FaMapMarkerAlt,
  FaPhone,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[#1a1a1a] text-white py-12 mt-auto">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-serif font-bold mb-4">
              Didactik Media
            </h3>
            <p className="text-gray-500 text-sm">
              The operating system for African creative memory.
              Preserve. Discover. Monetize.
            </p>
          </div>

          {/* Contact */}
          <nav aria-label="Contact information">
            <h4 className="font-semibold mb-4">Contact</h4>
            <div className="space-y-2 text-sm text-gray-500">
              <p>
                <a
                  href="mailto:admin@didactikmedia.com"
                  className="hover:text-secondary transition-colors flex items-center gap-2"
                >
                  <FaEnvelope className="text-secondary" />
                  admin@didactikmedia.com
                </a>
              </p>
              <p className="flex items-center gap-2">
                <FaPhone className="text-secondary" />
                <a href="tel:+2349155002840" className="hover:text-secondary transition-colors">
                  09155002840
                </a>
              </p>
              <p className="flex items-center gap-2">
                <FaMapMarkerAlt className="text-secondary" />
                Lagos, Nigeria
              </p>
              <p className="mt-4 pt-2 border-t border-gray-700/50">
                <a href="/privacy" className="hover:text-secondary transition-colors">
                  Privacy Policy
                </a>
              </p>
            </div>
          </nav>

          {/* Social Links */}
          <nav aria-label="Social media links">
            <h4 className="font-semibold mb-4">Connect</h4>
            <div className="space-y-2 text-sm">
              <p>
                <a
                  href="https://www.linkedin.com/company/didactik-media/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-secondary transition-colors flex items-center gap-2"
                >
                  <FaLinkedin className="text-secondary text-lg" />
                  Didactik Media
                </a>
              </p>

              <p>
                <a
                  href="https://instagram.com/didactikmedia"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-secondary transition-colors flex items-center gap-2"
                >
                  <FaInstagram className="text-secondary text-lg" />
                  @didactikmedia
                </a>
              </p>
            </div>
          </nav>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 pt-8 text-center text-sm text-gray-400">
          <p>
            &copy; {new Date().getFullYear()} Didactik Media. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
