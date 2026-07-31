import { useState } from 'react';
import { Mail, MapPin, Clock, Send, CheckCircle } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import AnimatedSection from '../components/AnimatedSection';

export default function Contact() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    subject: '',
    coverage: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    await new Promise((resolve) => setTimeout(resolve, 1500));

    console.log('Form submitted:', formData);
    setIsSubmitted(true);
    setIsSubmitting(false);

    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        fullName: '',
        email: '',
        subject: '',
        coverage: '',
        message: '',
      });
    }, 5000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-[#FAF9F6] to-amber-50/20 pt-24 pb-12">
      {/* ================= SEO ================= */}
      <Helmet>
        <title>Contact Lexicon Digital | Wikipedia Page Consultation</title>
        <meta
          name="description"
          content="Get in touch with Lexicon Digital for professional Wikipedia page creation, editing, and notability assessment services."
        />
        <link rel="canonical" href="https://lexicondigital.net/contact" />

        {/* Open Graph */}
        <meta property="og:title" content="Contact Lexicon Digital" />
        <meta
          property="og:description"
          content="Reach out for expert Wikipedia consulting, article creation, and page monitoring services."
        />
        <meta property="og:url" content="https://lexicondigital.net/contact" />
        <meta property="og:type" content="website" />

        {/* Structured Data */}
        <script type="application/ld+json">
          {`
          {
            "@context": "https://schema.org",
            "@type": "ContactPage",
            "name": "Contact Lexicon Digital",
            "description": "Professional Wikipedia consulting services contact page."
          }
        `}
        </script>
      </Helmet>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Heading */}
        <AnimatedSection>
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6 tracking-tight animate-fade-in">
              Let's Talk About Your{' '}
              <span className="text-gold-gradient font-extrabold">Wikipedia Page</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Ready to establish your credibility on Wikipedia? Contact us for a
              free consultation and notability assessment.
            </p>
          </div>
        </AnimatedSection>

        {/* Info Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <AnimatedSection delay={100}>
            <div className="bg-white border border-transparent rounded-2xl p-8 shadow-lg hover:shadow-xl hover:border-amber-500/10 transition-all duration-300 transform hover:-translate-y-2 group">
              <Mail className="w-12 h-12 text-amber-600 mb-4 group-hover:scale-110 transition-transform duration-300" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Email Us</h3>
              <a
                href="mailto:alex@lexicondigital.net"
                className="text-amber-600 font-semibold hover:text-amber-700 transition-colors"
              >
                info@lexicondigital.net
              </a>
              <p className="text-sm text-gray-500 mt-2">
                We typically respond within 24 hours
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={200}>
            <div className="bg-white border border-transparent rounded-2xl p-8 shadow-lg hover:shadow-xl hover:border-amber-500/10 transition-all duration-300 transform hover:-translate-y-2 group">
              <MapPin className="w-12 h-12 text-amber-600 mb-4 group-hover:scale-110 transition-transform duration-300" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Our Office</h3>
              <p className="text-gray-600 mb-1">Manchester, United Kingdom</p>
              <p className="text-sm text-gray-500">
                Serving clients worldwide remotely
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={300}>
            <div className="bg-white border border-transparent rounded-2xl p-8 shadow-lg hover:shadow-xl hover:border-amber-500/10 transition-all duration-300 transform hover:-translate-y-2 group">
              <Clock className="w-12 h-12 text-amber-600 mb-4 group-hover:scale-110 transition-transform duration-300" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Business Hours
              </h3>
              <p className="text-gray-600 mb-1">Monday – Friday</p>
              <p className="text-sm text-gray-500">10:00 AM – 6:00 PM GMT</p>
            </div>
          </AnimatedSection>
        </div>



        {/* Next Steps Callout */}
        <AnimatedSection delay={500}>
          <div className="mt-12 bg-amber-500/5 border-l-4 border-amber-500 rounded-r-lg p-6 max-w-3xl mx-auto">
            <h3 className="font-bold text-lg text-gray-900 mb-2">
              What Happens Next?
            </h3>
            <ol className="list-decimal list-inside space-y-2 text-gray-700">
              <li>We review your inquiry and existing coverage within 24 hours</li>
              <li>Our team conducts a preliminary notability assessment</li>
              <li>We schedule a consultation call to discuss your eligibility</li>
              <li>If qualified, we provide a detailed proposal and timeline</li>
            </ol>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
}
