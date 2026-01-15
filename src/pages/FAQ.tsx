import { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';
import { Helmet } from 'react-helmet-async';

interface FAQProps {
  onNavigate: (page: string) => void;
}

export default function FAQ({ onNavigate }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: 'Can anyone have a Wikipedia page?',
      answer:
        'No. Only subjects with significant coverage from reliable sources can be approved. Wikipedia has strict notability guidelines that require substantial third-party coverage in reputable publications. Our notability assessment service can determine if you qualify.',
    },
    {
      question: 'How long does it take to create a Wikipedia page?',
      answer:
        'Typically 2–6 weeks depending on research availability and review times. The timeline includes comprehensive research (1-2 weeks), professional writing and citation (1-2 weeks), and submission/review process (1-2 weeks). Complex subjects with extensive coverage may take longer to ensure thoroughness.',
    },
    {
      question: 'Can you update an existing Wikipedia page?',
      answer:
        'Yes, we offer rewrite and maintenance plans for existing Wikipedia pages. Whether your page needs better citations, content updates, neutrality improvements, or structure optimization, our team can enhance it to meet current Wikipedia standards. We also offer ongoing monitoring to keep your page current.',
    },
    {
      question: 'How much does it cost to create a Wikipedia page?',
      answer:
        'Pricing varies based on the complexity of the subject, amount of research required, and turnaround time needed. We offer different service tiers from basic notability assessment to full-service creation and ongoing monitoring. Contact us for a personalized quote based on your specific needs.',
    },
    {
      question: 'What makes your sources "reliable" for Wikipedia?',
      answer:
        'Wikipedia requires secondary sources from independent, reputable publications with editorial oversight. This includes major newspapers, magazines, academic journals, books from established publishers, and recognized industry publications. We avoid blogs, press releases, social media, and other sources that Wikipedia considers unreliable.',
    },
    {
      question: 'Can I write my own Wikipedia page?',
      answer:
        'Wikipedia strongly discourages subjects from writing their own pages due to conflict of interest. Articles written by subjects often contain promotional language, lack neutrality, and violate guidelines. Even if technically allowed, self-written pages face much higher scrutiny and deletion rates. Professional editing ensures compliance and objectivity.',
    },
  ];

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 pt-24 pb-12">

      {/* ================= SEO ================= */}
      <Helmet>
        <title>FAQ | Lexicon Digital Wikipedia Services</title>
        <meta
          name="description"
          content="Frequently Asked Questions about Wikipedia page creation, editing, and notability assessment by Lexicon Digital."
        />
        <link rel="canonical" href="https://lexicondigital.net/faq" />

        {/* Open Graph */}
        <meta property="og:title" content="FAQ | Lexicon Digital" />
        <meta
          property="og:description"
          content="All your questions answered about creating, editing, and maintaining a Wikipedia page."
        />
        <meta property="og:type" content="website" />

        {/* Structured Data */}
        <script type="application/ld+json">
          {`
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "name": "Lexicon Digital FAQ",
            "description": "Frequently Asked Questions about professional Wikipedia services."
          }
        `}
        </script>
      </Helmet>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="text-center mb-16">
            <HelpCircle className="w-16 h-16 text-blue-600 mx-auto mb-6" />
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to know about creating and maintaining your
              Wikipedia presence.
            </p>
          </div>
        </AnimatedSection>

        <div className="max-w-4xl mx-auto mb-12">
          {faqs.map((faq, index) => (
            <AnimatedSection key={index} delay={index * 50}>
              <div className="mb-4">
                <button
                  onClick={() => toggleAccordion(index)}
                  className="w-full bg-white rounded-2xl p-6 text-left hover:shadow-lg transition-all duration-300 group"
                >
                  <div className="flex justify-between items-start gap-4">
                    <h3 className="text-lg md:text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors flex-1">
                      {faq.question}
                    </h3>
                    <ChevronDown
                      className={`w-6 h-6 text-blue-600 flex-shrink-0 transition-transform duration-300 ${
                        openIndex === index ? 'rotate-180' : ''
                      }`}
                    />
                  </div>
                  <div
                    className={`overflow-hidden transition-all duration-500 ${
                      openIndex === index
                        ? 'max-h-96 opacity-100 mt-4'
                        : 'max-h-0 opacity-0'
                    }`}
                  >
                    <p className="text-gray-700 leading-relaxed text-base md:text-lg">
                      {faq.answer}
                    </p>
                  </div>
                </button>
              </div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection delay={300}>
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-3xl p-8 md:p-12 text-center text-white shadow-2xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Still Have Questions?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Our team is here to provide personalized answers and guidance for
              your specific situation.
            </p>
            <button
              onClick={() => onNavigate('contact')}
              className="px-10 py-4 bg-white text-blue-600 rounded-lg font-bold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-xl"
            >
              Get in Touch
            </button>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
}
