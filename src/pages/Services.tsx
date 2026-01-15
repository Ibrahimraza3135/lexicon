import {
  ClipboardCheck,
  FileText,
  RefreshCw,
  Bell,
  ArrowRight,
} from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';
import { Helmet } from 'react-helmet-async';

interface ServicesProps {
  onNavigate: (page: string) => void;
}

export default function Services({ onNavigate }: ServicesProps) {
  const services = [
    {
      id: 1,
      icon: ClipboardCheck,
      title: 'Notability Assessment',
      description:
        "6–12 hour expert review of your subject's eligibility based on Wikipedia's strict notability criteria. We analyze existing coverage and provide honest feedback.",
      features: [
        'Comprehensive media coverage analysis',
        'Expert evaluation report',
        'Detailed recommendations',
        'Quick turnaround (6-12 hours)',
      ],
      action: 'Check My Notability',
      color: 'blue',
    },
    {
      id: 2,
      icon: FileText,
      title: 'Wikipedia Page Creation',
      description:
        'Full-service Wikipedia article creation from research to submission. We handle every aspect of the process with professional expertise and attention to detail.',
      features: [
        'Comprehensive research & source gathering',
        'Professional encyclopedic writing',
        'Proper citation formatting',
        'Strategic submission process',
      ],
      action: 'Create My Wiki Page',
      color: 'green',
    },
    {
      id: 3,
      icon: RefreshCw,
      title: 'Page Upgrades & Rewrite',
      description:
        'Transform existing Wikipedia pages with improved content, better citations, and enhanced compliance. Perfect for outdated or poorly written articles.',
      features: [
        'Content quality improvement',
        'Citation updates & additions',
        'Neutrality compliance fixes',
        'Structure optimization',
      ],
      action: 'Revamp My Page',
      color: 'purple',
    },
    {
      id: 4,
      icon: Bell,
      title: 'Wikipedia Monitoring & Maintenance',
      description:
        'Ongoing protection for your Wikipedia presence. We monitor changes, address deletion risks, and keep your article current and compliant.',
      features: [
        'Monthly page monitoring',
        'Content update management',
        'Vandalism protection',
      ],
      action: 'Subscribe for Monitoring',
      color: 'orange',
    },
  ];

  const colorClasses = {
    blue: {
      bg: 'bg-blue-50',
      hover: 'group-hover:bg-blue-600',
      text: 'text-blue-600',
      button: 'bg-blue-600 hover:bg-blue-700',
    },
    green: {
      bg: 'bg-green-50',
      hover: 'group-hover:bg-green-600',
      text: 'text-green-600',
      button: 'bg-green-600 hover:bg-green-700',
    },
    purple: {
      bg: 'bg-violet-50',
      hover: 'group-hover:bg-violet-600',
      text: 'text-violet-600',
      button: 'bg-violet-600 hover:bg-violet-700',
    },
    orange: {
      bg: 'bg-orange-50',
      hover: 'group-hover:bg-orange-600',
      text: 'text-orange-600',
      button: 'bg-orange-600 hover:bg-orange-700',
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 pt-24 pb-12">

      {/* ================= SEO ================= */}
      <Helmet>
        <title>Services | Lexicon Digital Wikipedia Services</title>
        <meta
          name="description"
          content="Explore Lexicon Digital's professional Wikipedia services: Notability Assessment, Page Creation, Page Rewrite, and Monitoring & Maintenance."
        />
        <link rel="canonical" href="https://lexicondigital.net/services" />

        {/* Open Graph */}
        <meta property="og:title" content="Services | Lexicon Digital" />
        <meta
          property="og:description"
          content="Professional Wikipedia services for brands and individuals. Ensure your page is compliant, accurate, and visible."
        />
        <meta property="og:type" content="website" />
      </Helmet>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              What We Do For You
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              LexiconDigital is a full-service Wikipedia content agency. We
              handle every aspect of creating and maintaining your Wikipedia
              presence with professional expertise.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {services.map((service, index) => {
            const colors = colorClasses[service.color as keyof typeof colorClasses];
            return (
              <AnimatedSection key={service.id} delay={index * 150}>
                <div
                  className={`group ${colors.bg} rounded-3xl p-8 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 cursor-pointer border-2 border-transparent hover:border-gray-200`}
                >
                  <div
                    className={`w-16 h-16 ${colors.bg} rounded-2xl flex items-center justify-center mb-6 transition-all duration-500 ${colors.hover}`}
                  >
                    <service.icon
                      className={`w-8 h-8 ${colors.text} group-hover:text-white transition-colors duration-500`}
                    />
                  </div>

                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                    {service.title}
                  </h3>

                  <p className="text-gray-700 text-lg mb-6 leading-relaxed">
                    {service.description}
                  </p>

                  <ul className="space-y-3 mb-8">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-6 h-6 bg-white rounded-full flex items-center justify-center mt-0.5">
                          <ArrowRight
                            className={`w-4 h-4 ${colors.text}`}
                          />
                        </div>
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => onNavigate('contact')}
                    className={`w-full py-4 ${colors.button} text-white rounded-xl font-semibold text-lg transition-all duration-300 transform group-hover:scale-105 shadow-lg hover:shadow-xl`}
                  >
                    {service.action}
                  </button>
                </div>
              </AnimatedSection>
            );
          })}
        </div>

        <AnimatedSection delay={200}>
          <div className="mt-20 text-center bg-white rounded-3xl p-12 shadow-xl">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Not Sure Which Service You Need?
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Let's discuss your goals and determine the best approach for your
              Wikipedia presence.
            </p>
            <button
              onClick={() => onNavigate('contact')}
              className="px-10 py-4 bg-blue-600 text-white rounded-lg font-semibold text-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl inline-flex items-center gap-2"
            >
              Schedule a Free Consultation
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
}
