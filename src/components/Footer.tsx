import { Facebook, Twitter, Linkedin, Mail } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

interface FooterProps {
  onNavigate: (page: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <>
      {/* SEO Structured Data */}
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "LexiconDigital",
            "url": "https://lexicondigital.net",
            "logo": "https://lexicondigital.net/logo.png", // replace with actual logo
            "sameAs": [
              "https://www.facebook.com/lexicondigital",
              "https://twitter.com/lexicondigital",
              "https://www.linkedin.com/company/lexicondigital"
            ],
            "contactPoint": {
              "@type": "ContactPoint",
              "email": "info@lexicondigital.net",
              "contactType": "customer support",
              "availableLanguage": "English"
            }
          })}
        </script>
      </Helmet>

      <footer className="bg-gray-900 text-gray-300 text-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-center justify-items-center">
            {/* Company Info */}
            <div>
              <h3 className="text-xl font-bold text-white mb-4">LexiconDigital</h3>
              <p className="text-sm max-w-xs">
                Professional Wikipedia pages built for you. Establishing
                credibility and global recognition.
              </p>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Services</h4>
              <ul className="space-y-2">
                {[
                  "Page Creation",
                  "Page Upgrades",
                  "Monitoring & Maintenance"
                ].map((service) => (
                  <li key={service}>
                    <button
                      onClick={() => onNavigate('services')}
                      className="text-sm hover:text-blue-400 transition-colors"
                    >
                      {service}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Connect</h4>
              <div className="flex justify-center space-x-4 mb-4">
                <a
                  href="mailto:info@lexicondigital.net"
                  className="p-2 bg-gray-800 rounded-full hover:bg-blue-500 transition-all duration-300 transform hover:scale-110"
                >
                  <Mail className="w-5 h-5" />
                </a>
              </div>

              <p className="text-sm">
                <strong>Email:</strong>{' '}
                <a
                  href="mailto:info@lexicondigital.net"
                  className="hover:text-blue-400 transition-colors"
                >
                  info@lexicondigital.net
                </a>
              </p>

              <p className="text-sm mt-2">
                <strong>Office:</strong> Manchester, United Kingdom
              </p>
              <p className="text-sm">Mon – Fri: 10 AM – 6 PM</p>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-10 pt-6 text-center text-sm">
            <p>
              &copy; {currentYear} LexiconDigital. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
