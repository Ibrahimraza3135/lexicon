import {
  CheckCircle,
  AlertCircle,
  Shield,
  BookOpen,
  TrendingUp,
  Eye,
  ArrowRight,
} from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';
import { Helmet } from 'react-helmet-async';

interface WhyProps {
  onNavigate: (page: string) => void;
}

export default function Why({ onNavigate }: WhyProps) {
  const reasons = [
    {
      icon: BookOpen,
      title: 'We understand notability policies',
      description:
        'Wikipedia has strict criteria for what qualifies as notable. We know exactly what makes a subject eligible and how to present it properly.',
    },
    {
      icon: Shield,
      title: 'We write in a strict neutral tone',
      description:
        'Wikipedia requires neutral point of view (NPOV). Our writers are trained to eliminate promotional language and maintain encyclopedic standards.',
    },
    {
      icon: AlertCircle,
      title: 'We know what Wikipedia allows (and rejects)',
      description:
        "From acceptable sources to prohibited content types, we navigate Wikipedia's complex guidelines to avoid common pitfalls.",
    },
    {
      icon: CheckCircle,
      title: 'We use only reliable, secondary references',
      description:
        'Primary sources and unreliable citations get articles rejected. We identify and cite only credible, independent sources.',
    },
    {
      icon: TrendingUp,
      title: 'We maximize page survival rate after publishing',
      description:
        'Many Wikipedia articles get deleted within weeks. Our strategic approach ensures long-term stability and compliance.',
    },
    {
      icon: Eye,
      title: 'We defend your reputation through monitoring',
      description:
        'Wikipedia pages can be edited by anyone. Our monitoring service protects against vandalism and maintains accuracy.',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 pt-24 pb-12">

      {/* ================= SEO ================= */}
      <Helmet>
        <title>Why Choose Lexicon Digital | Wikipedia Experts</title>
        <meta
          name="description"
          content="Learn why Lexicon Digital is the leading Wikipedia service provider. We ensure your page is compliant, accurate, and maximizes survival chances."
        />
        <link rel="canonical" href="https://lexicondigital.net/why" />

        {/* Open Graph */}
        <meta property="og:title" content="Why Choose Lexicon Digital | Wikipedia Experts" />
        <meta
          property="og:description"
          content="Expert Wikipedia services for individuals and brands. Understand notability, neutral tone, and content compliance."
        />
        <meta property="og:type" content="website" />
      </Helmet>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Why Do You Need a <span className="text-blue-600">Wikipedia Expert</span>?
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Because Wikipedia Is More Than Just Writing. It’s Rules, Citations & Reputation.
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={200}>
          <div className="max-w-5xl mx-auto mb-20">
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-3xl p-8 md:p-12 text-white shadow-2xl">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Wikipedia Is Not Like Other Platforms
              </h2>
              <p className="text-lg md:text-xl leading-relaxed mb-6">
                Creating a Wikipedia page requires deep knowledge of complex
                policies, citation standards, and editorial guidelines. A single
                mistake can result in rejection.
              </p>
              <p className="text-lg md:text-xl leading-relaxed">
                Our team has years of experience navigating these challenges,
                ensuring your article meets every requirement for approval and
                long-term stability.
              </p>
            </div>
          </div>
        </AnimatedSection>

        <div className="mb-20">
          <AnimatedSection>
            <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
              What Sets Us Apart
            </h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {reasons.map((reason, index) => (
              <AnimatedSection key={index} delay={index * 100}>
                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 group">
                  <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-600 transition-all duration-300">
                    <reason.icon className="w-8 h-8 text-blue-600 group-hover:text-white transition-colors duration-300" />
                  </div>
                  <div className="flex items-start gap-3 mb-4">
                    <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <h3 className="text-xl font-bold text-gray-900">
                      {reason.title}
                    </h3>
                  </div>
                  <p className="text-gray-600 leading-relaxed">
                    {reason.description}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>

        <AnimatedSection>
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              The Cost of Amateur Mistakes
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              <div className="p-6">
                <div className="text-4xl font-bold text-red-600 mb-2">78%</div>
                <p className="text-gray-600">
                  of amateur Wikipedia articles get deleted within 30 days
                </p>
              </div>
              <div className="p-6">
                <div className="text-4xl font-bold text-red-600 mb-2">
                  Weeks
                </div>
                <p className="text-gray-600">
                  wasted on rejected drafts without expert guidance
                </p>
              </div>
              <div className="p-6">
                <div className="text-4xl font-bold text-red-600 mb-2">
                  Permanent
                </div>
                <p className="text-gray-600">
                  damage to your reputation from poorly written content
                </p>
              </div>
            </div>
            <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto">
              Don't risk your reputation with trial and error. Get it right the
              first time with professional expertise.
            </p>
            <button
              onClick={() => onNavigate('contact')}
              className="px-10 py-5 bg-blue-600 text-white rounded-lg font-bold text-xl hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl inline-flex items-center gap-2"
            >
              Talk to an Expert
              <ArrowRight className="w-6 h-6" />
            </button>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
}
