import { Mail } from 'lucide-react';
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
              "email": "alex@lexicondigital.net",
              "contactType": "customer support",
              "availableLanguage": "English"
            }
          })}
        </script>
      </Helmet>

      <footer className="bg-black text-gray-400 text-center border-t border-amber-500/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-center justify-items-center">
            {/* Company Info */}
            <div>
              <h3 className="text-xl font-extrabold text-white mb-4 tracking-tight">
                Lexicon<span className="text-amber-600">Digital</span>
              </h3>
              <p className="text-sm max-w-xs leading-relaxed">
                Professional Wikipedia pages built for you. Establishing
                credibility and global recognition.
              </p>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-lg font-bold text-white mb-4 tracking-tight">Services</h4>
              <ul className="space-y-2">
                {[
                  "Page Creation",
                  "Page Upgrades",
                  "Monitoring & Maintenance"
                ].map((service) => (
                  <li key={service}>
                    <button
                      onClick={() => onNavigate('services')}
                      className="text-sm hover:text-amber-400 transition-colors duration-300"
                    >
                      {service}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-lg font-bold text-white mb-4 tracking-tight">Connect</h4>
              <div className="flex justify-center space-x-4 mb-4">
                <a
                  href="mailto:alex@lexicondigital.net"
                  className="p-2 bg-zinc-900 border border-amber-500/20 text-amber-500 rounded-full hover:bg-amber-500 hover:text-black transition-all duration-300 transform hover:scale-110"
                >
                  <Mail className="w-5 h-5" />
                </a>
              </div>

              <p className="text-sm">
                <strong>Email:</strong>{' '}
                <a
                  href="mailto:alex@lexicondigital.net"
                  className="hover:text-amber-400 transition-colors duration-300"
                >
                  info@lexicondigital.net
                </a>
              </p>

              <p className="text-sm mt-2">
                <strong>Office:</strong> Manchester, United Kingdom
              </p>
              <p className="text-sm mt-1">Mon – Fri: 10 AM – 6 PM GMT</p>
            </div>
          </div>

          <div className="border-t border-zinc-900 mt-10 pt-6 text-center text-sm">
            <p className="text-gray-500">
              &copy; {currentYear} LexiconDigital. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
