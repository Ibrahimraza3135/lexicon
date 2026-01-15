import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export default function Header({ currentPage, onNavigate }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', page: 'home' },
    { name: 'Services', page: 'services' },
    { name: 'Why Hire Experts', page: 'why' },
    { name: 'FAQ', page: 'faq' },
    { name: 'About', page: 'about' },
    { name: 'Contact', page: 'contact' },
  ];

  // SEO info per page
  const pageMeta = {
    home: {
      title: 'LexiconDigital – Professional Wikipedia Page Services',
      description: 'We help brands and individuals create credible Wikipedia pages following Wikipedia guidelines.',
    },
    services: {
      title: 'Our Services – LexiconDigital',
      description: 'Notability assessment, Wikipedia page creation, upgrades, and maintenance.',
    },
    why: {
      title: 'Why Hire Wikipedia Experts – LexiconDigital',
      description: 'Expert guidance to maximize your Wikipedia page survival and credibility.',
    },
    faq: {
      title: 'FAQ – LexiconDigital',
      description: 'Frequently asked questions about Wikipedia page creation and maintenance.',
    },
    about: {
      title: 'About LexiconDigital',
      description: 'Learn about our mission, team, and core values for Wikipedia page creation.',
    },
    contact: {
      title: 'Contact LexiconDigital',
      description: 'Get in touch for a free Wikipedia consultation and notability assessment.',
    },
  };

  return (
    <>
      {/* SEO Meta Tags */}
      <Helmet>
        <title>{pageMeta[currentPage]?.title || 'LexiconDigital'}</title>
        <meta name="description" content={pageMeta[currentPage]?.description || ''} />
        <link rel="canonical" href={`https://lexicondigital.net/${currentPage}`} />
        <meta property="og:title" content={pageMeta[currentPage]?.title} />
        <meta property="og:description" content={pageMeta[currentPage]?.description} />
        <meta property="og:url" content={`https://lexicondigital.net/${currentPage}`} />
      </Helmet>

      {/* Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-white shadow-md py-4' : 'bg-transparent py-6'
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <button
              onClick={() => onNavigate('home')}
              className="text-2xl font-bold text-blue-600 hover:text-blue-700 transition-colors"
            >
              LexiconDigital
            </button>

            <nav className="hidden md:flex space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.page}
                  onClick={() => onNavigate(item.page)}
                  className={`text-sm font-medium transition-colors ${
                    currentPage === item.page
                      ? 'text-blue-600'
                      : isScrolled
                      ? 'text-gray-700 hover:text-blue-600'
                      : 'text-gray-800 hover:text-blue-600'
                  }`}
                >
                  {item.name}
                </button>
              ))}
            </nav>

            <button
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {isMobileMenuOpen && (
            <nav className="md:hidden mt-4 py-4 bg-white rounded-lg shadow-lg">
              {navItems.map((item) => (
                <button
                  key={item.page}
                  onClick={() => {
                    onNavigate(item.page);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`block w-full text-left px-4 py-2 text-sm font-medium transition-colors ${
                    currentPage === item.page
                      ? 'text-blue-600 bg-blue-50'
                      : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                  }`}
                >
                  {item.name}
                </button>
              ))}
            </nav>
          )}
        </div>
      </header>
    </>
  );
}
