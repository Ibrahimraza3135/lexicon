import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import {
  CheckCircle,
  Users,
  FileCheck,
  Shield,
  TrendingUp,
  Clock,
  ArrowRight,
  ArrowDown,
  Star,
} from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';
import WikipediaGlobe from '../components/WikipediaGlobe';

interface HomeProps {
  onNavigate: (page: string) => void;
}

export default function Home({ onNavigate }: HomeProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const steps = [
    'Notability',
    'Research',
    'Draft',
    'Review',
    'Submit',
    'Monitor',
  ];

  const benefits = [
    {
      icon: CheckCircle,
      title: 'Credibility That Lasts',
      description:
        'Establish permanent digital presence that enhances your reputation',
    },
    {
      icon: Users,
      title: 'Expert Wikipedia Editors',
      description:
        'Our team understands Wikipedia guidelines and compliance standards',
    },
    {
      icon: FileCheck,
      title: 'Reliable Source Research',
      description:
        'We identify and cite only the most credible secondary sources',
    },
    {
      icon: Shield,
      title: 'Compliance Guaranteed',
      description:
        'Every article meets strict Wikipedia neutrality and notability rules',
    },
    {
      icon: TrendingUp,
      title: 'Transparent Process',
      description:
        'Full visibility into every stage of research, writing, and submission',
    },
    {
      icon: Clock,
      title: 'Fast Delivery Options',
      description: 'Expedited services available for urgent publishing needs',
    },
  ];

  const testimonials = [
    {
      name: 'Sarah Mitchell',
      role: 'CEO, TechVentures Inc.',
      content:
        'LexiconDigital helped us establish credibility in our industry. Their expertise with Wikipedia guidelines was invaluable.',
      rating: 5,
    },
    {
      name: 'Dr. James Richardson',
      role: 'Author & Speaker',
      content:
        'Professional, thorough, and transparent throughout the entire process. My Wikipedia page has significantly boosted my visibility.',
      rating: 5,
    },
    {
      name: 'Maria Santos',
      role: 'Founder, GreenTech Solutions',
      content:
        'They conducted a thorough notability assessment and delivered a perfectly compliant Wikipedia article. Highly recommended!',
      rating: 5,
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % steps.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-ash-white">
      {/* ================= SEO ================= */}
      <Helmet>
        <title>Professional Wikipedia Page Creation Services | Lexicon Digital</title>
        <meta
          name="description"
          content="Lexicon Digital offers professional Wikipedia page creation, editing, and notability assessment services that fully comply with Wikipedia guidelines."
        />
        <link rel="canonical" href="https://lexicondigital.net/" />

        {/* Open Graph */}
        <meta property="og:title" content="Professional Wikipedia Page Creation Services" />
        <meta
          property="og:description"
          content="Get professionally written, Wikipedia-compliant articles created by expert editors."
        />
        <meta property="og:url" content="https://lexicondigital.net/" />
        <meta property="og:type" content="website" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />

        {/* Schema.org */}
        <script type="application/ld+json">
          {`
          {
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Lexicon Digital",
            "url": "https://lexicondigital.net",
            "description": "Professional Wikipedia page creation and consulting services.",
            "serviceType": "Wikipedia Page Creation"
          }
        `}
        </script>
      </Helmet>

      {/* ================= HERO ================= */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-[#FAF9F6] to-amber-50/30 pt-28 pb-12 overflow-hidden border-b border-gray-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Call to Action & Copy */}
            <div className="lg:col-span-7 text-left">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 mb-6 tracking-tight leading-none animate-fade-in">
                Professional Wikipedia Page Creation,{' '}
                <span className="text-gold-gradient drop-shadow-sm font-extrabold block lg:inline">Built For You</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed">
                Establish credibility and global recognition with a
                professionally-crafted Wikipedia article that meets official
                guidelines.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-4">
                <button
                  onClick={() => onNavigate('contact')}
                  className="px-8 py-4 bg-black text-amber-400 hover:text-amber-300 border border-amber-500/30 rounded-lg font-semibold text-lg hover:bg-zinc-900 transition-all duration-300 transform hover:scale-105 shadow-xl"
                >
                  Start Your Notability Assessment
                </button>
                <button
                  onClick={() => onNavigate('contact')}
                  className="px-8 py-4 bg-white text-black border-2 border-black rounded-lg font-semibold text-lg hover:bg-black hover:text-white transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  Book a Free Consultation
                </button>
              </div>
            </div>

            {/* Right Column: 3D Rotating Wikipedia Globe */}
            <div className="lg:col-span-5 flex justify-center items-center relative">
              <div className="absolute w-72 h-72 bg-amber-500/5 rounded-full filter blur-3xl -z-10 animate-pulse"></div>
              <WikipediaGlobe />
            </div>
          </div>

          {/* Interactive process section */}
          <div className="bg-white/80 border border-amber-500/10 backdrop-blur-sm rounded-2xl p-8 gold-shadow max-w-5xl mx-auto mt-16">
            <h3 className="text-sm font-semibold tracking-wider text-amber-800 uppercase mb-6 text-center">
              Our Interactive Process
            </h3>
            <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-4 w-full">
              {steps.map((step, index) => (
                <div key={index} className="flex flex-col md:flex-row items-center w-full md:w-auto">
                  <div
                    className={`px-6 py-3 rounded-full font-semibold transition-all duration-500 text-center w-full md:w-auto ${
                      index === currentStep
                        ? 'bg-black text-amber-400 border border-amber-500/50 scale-105 md:scale-110 shadow-lg'
                        : index < currentStep
                        ? 'bg-amber-500/10 text-amber-700 border border-amber-500/10'
                        : 'bg-gray-100 text-gray-400'
                    }`}
                  >
                    {step}
                  </div>
                  {index < steps.length - 1 && (
                    <>
                      <ArrowRight
                        className={`hidden md:block w-6 h-6 mx-2 transition-colors duration-500 ${
                          index < currentStep ? 'text-amber-500' : 'text-gray-300'
                        }`}
                      />
                      <ArrowDown
                        className={`block md:hidden w-6 h-6 my-2 transition-colors duration-500 ${
                          index < currentStep ? 'text-amber-500' : 'text-gray-300'
                        }`}
                      />
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================= WHY CHOOSE US ================= */}
      <AnimatedSection>
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
                Why Choose LexiconDigital?
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                We combine expert knowledge of Wikipedia guidelines with
                professional research and writing services.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {benefits.map((benefit, index) => (
                <AnimatedSection key={index} delay={index * 100}>
                  <div className="group p-8 bg-[#FAF9F6] border border-transparent rounded-2xl hover:bg-white transition-all duration-300 cursor-pointer gold-shadow-hover">
                    <benefit.icon className="w-12 h-12 text-amber-600 mb-4 group-hover:scale-110 transition-transform duration-300" />
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      {benefit.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* ================= STEP-BY-STEP PROCESS ================= */}
      <AnimatedSection>
        <section className="py-24 bg-gradient-to-br from-zinc-950 to-black text-white border-t border-b border-amber-500/20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
                Our Step-by-Step Process
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                From initial assessment to ongoing monitoring, we handle
                everything.
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="space-y-6">
                {[
                  {
                    step: '1',
                    title: 'Notability Check',
                    description:
                      'Expert review of eligibility based on Wikipedia criteria',
                  },
                  {
                    step: '2',
                    title: 'Research',
                    description:
                      'Comprehensive collection of reliable secondary sources',
                  },
                  {
                    step: '3',
                    title: 'Draft Creation',
                    description:
                      'Professional writing in neutral, encyclopedic tone',
                  },
                  {
                    step: '4',
                    title: 'Submission',
                    description:
                      'Strategic publishing following Wikipedia best practices',
                  },
                  {
                    step: '5',
                    title: 'Monitoring',
                    description:
                      'Ongoing updates and protection against deletion risks',
                  },
                ].map((item, index) => (
                  <AnimatedSection key={index} delay={index * 150}>
                    <div className="flex items-start gap-6 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-amber-500/20 rounded-2xl p-6 transition-all duration-300">
                      <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-amber-400 to-yellow-600 text-black rounded-full flex items-center justify-center text-xl font-bold">
                        {item.step}
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-white mb-2">
                          {item.title}
                        </h3>
                        <p className="text-gray-300 text-lg">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </AnimatedSection>
                ))}
              </div>
            </div>
          </div>
        </section>
      </AnimatedSection>



      {/* ================= CTA ================= */}
      <AnimatedSection>
        <section className="py-24 bg-gradient-to-br from-zinc-950 to-black text-white text-center border-t border-amber-500/20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6 tracking-tight">
              Ready to Get Published on Wikipedia?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
              Let's establish your credibility with a professionally crafted
              Wikipedia presence.
            </p>
            <button
              onClick={() => onNavigate('contact')}
              className="px-12 py-5 bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 text-black rounded-lg font-bold text-xl transition-all duration-300 transform hover:scale-105 shadow-2xl inline-flex items-center gap-2"
            >
              Start Now
              <ArrowRight className="w-6 h-6" />
            </button>
          </div>
        </section>
      </AnimatedSection>
    </div>
  );
}
