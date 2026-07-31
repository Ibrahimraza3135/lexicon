import { Shield, Lightbulb, Target, Users, Award, Lock } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import AnimatedSection from '../components/AnimatedSection';

interface AboutProps {
  onNavigate: (page: string) => void;
}

export default function About({ onNavigate }: AboutProps) {
  const values = [
    {
      icon: Shield,
      title: 'Transparency',
      description:
        'We maintain complete honesty about the Wikipedia process, including limitations and realistic expectations for every client.',
    },
    {
      icon: Award,
      title: 'Credibility',
      description:
        'Our reputation is built on creating compliant, high-quality Wikipedia content that stands the test of time and editorial scrutiny.',
    },
    {
      icon: Lightbulb,
      title: 'Knowledge',
      description:
        'Deep expertise in Wikipedia policies, editorial standards, and the evolving landscape of online encyclopedic content.',
    },
    {
      icon: Lock,
      title: 'Confidentiality',
      description:
        'Your information and our collaboration remain strictly confidential, handled with the utmost professional discretion.',
    },
    {
      icon: Target,
      title: 'Client Success',
      description:
        'Your goals drive our work. We succeed only when your Wikipedia presence achieves lasting recognition and credibility.',
    },
  ];

  const stats = [
    { number: '500+', label: 'Articles Created' },
    { number: '95%', label: 'Approval Rate' },
    { number: '10+', label: 'Years Experience' },
    { number: '50+', label: 'Industries Served' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-[#FAF9F6] to-amber-50/20 pt-24 pb-12">
      {/* ================= SEO ================= */}
      <Helmet>
        <title>About Lexicon Digital | Wikipedia Page Creation Experts</title>
        <meta
          name="description"
          content="Learn about Lexicon Digital's mission, team, and values. We are professional Wikipedia writers and editors helping brands build digital credibility."
        />
        <link rel="canonical" href="https://lexicondigital.net/about" />

        {/* Open Graph */}
        <meta property="og:title" content="About Lexicon Digital | Wikipedia Page Creation Experts" />
        <meta
          property="og:description"
          content="Get to know the team behind Lexicon Digital and our commitment to Wikipedia policy compliance."
        />
        <meta property="og:url" content="https://lexicondigital.net/about" />
        <meta property="og:type" content="website" />
      </Helmet>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6 tracking-tight">
              We Build Your Reputation  <span className="text-gold-gradient font-extrabold">The Right Way</span>
            </h1>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={100}>
          <div className="max-w-4xl mx-auto mb-20">
            <div className="bg-white border border-amber-500/10 rounded-3xl p-8 md:p-12 shadow-xl gold-shadow">
              <div className="space-y-6 text-lg md:text-xl text-gray-700 leading-relaxed">
                <p className="animate-slide-in-1">
                  <strong className="text-gray-900">LexiconDigital</strong> is a
                  dedicated team of professional writers, editors, and research
                  analysts specializing in Wikipedia compliance.
                </p>
                <p className="animate-slide-in-2">
                  We ensure every article meets the highest standards of{' '}
                  <strong className="text-amber-600 font-semibold">neutrality</strong>,{' '}
                  <strong className="text-amber-600 font-semibold">accuracy</strong>, and{' '}
                  <strong className="text-amber-600 font-semibold">credibility</strong>.
                </p>
                <p className="animate-slide-in-3">
                  Our team brings together expertise in journalism, academic
                  research, and digital content strategy to navigate Wikipedia's
                  complex editorial environment with precision and professionalism.
                </p>
              </div>
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={200}>
          <div className="bg-gradient-to-br from-zinc-950 to-black border border-amber-500/20 rounded-3xl p-8 md:p-12 text-white text-center mb-20 shadow-2xl">
            <Users className="w-16 h-16 mx-auto mb-6 text-amber-500" />
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4 tracking-tight">Our Mission</h2>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed italic text-gray-300">
              "To help notable brands and individuals gain global recognition
              through reliable digital presence."
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection>
          <div className="mb-20">
            <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-12 tracking-tight">
              Our Core Values
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {values.map((value, index) => (
                <AnimatedSection key={index} delay={index * 100}>
                  <div className="bg-white border border-transparent rounded-2xl p-8 shadow-lg hover:shadow-2xl hover:border-amber-500/10 transition-all duration-500 transform hover:-translate-y-2 group">
                    <div className="w-16 h-16 bg-amber-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-black group-hover:border group-hover:border-amber-500/20 transition-all duration-300">
                      <value.icon className="w-8 h-8 text-amber-600 group-hover:text-amber-400 transition-colors duration-300" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                      {value.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={300}>
          <div className="bg-gradient-to-br from-zinc-950 to-black border border-amber-500/20 rounded-3xl p-8 md:p-12 mb-20 shadow-2xl">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white text-center mb-12 tracking-tight">
              Our Track Record
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl md:text-5xl font-extrabold text-gold-gradient mb-2">
                    {stat.number}
                  </div>
                  <div className="text-gray-400 text-lg font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={400}>
          <div className="bg-white border border-amber-500/10 rounded-3xl p-8 md:p-12 shadow-xl mb-12 gold-shadow">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 text-center mb-8 tracking-tight">
              Why We're Different
            </h2>
            <div className="space-y-6 max-w-4xl mx-auto">
              {[
                {
                  num: '1',
                  title: 'Selective Client Acceptance',
                  desc: "We don't accept every inquiry. We conduct thorough notability assessments and only work with clients who genuinely qualify for Wikipedia inclusion."
                },
                {
                  num: '2',
                  title: 'Realistic Expectations',
                  desc: "We're honest about what we can and cannot guarantee. Wikipedia editors make final decisions, and we focus on maximizing your chances through expert preparation."
                },
                {
                  num: '3',
                  title: 'Long-Term Partnership',
                  desc: "Our relationship doesn't end at publication. We offer ongoing monitoring and maintenance to protect and enhance your Wikipedia presence over time."
                }
              ].map((diff) => (
                <div key={diff.num} className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-black text-amber-400 border border-amber-500/20 rounded-full flex items-center justify-center font-bold">
                    {diff.num}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {diff.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {diff.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={500}>
          <div className="bg-amber-500/5 border-l-4 border-amber-500 rounded-r-lg p-6 max-w-4xl mx-auto mb-12">
            <p className="text-gray-700 text-center text-lg">
              <strong>Important Note:</strong> We accept only eligible clients —
              because your reputation matters. If you don't meet Wikipedia's
              notability criteria, we'll tell you honestly and suggest alternative
              strategies.
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={600}>
          <div className="text-center bg-gradient-to-br from-zinc-950 to-black border border-amber-500/20 rounded-3xl p-12 text-white shadow-2xl">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-6 tracking-tight">
              Ready to Work Together?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
              Let's discuss your Wikipedia goals and determine if we're the right
              fit for your needs.
            </p>
            <button
              onClick={() => onNavigate('contact')}
              className="px-10 py-4 bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 text-black rounded-lg font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-xl"
            >
              Start the Conversation
            </button>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
}
