import { useState } from 'react';
import { Mail, MapPin, Clock } from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';
import { Helmet } from 'react-helmet-async';

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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 pt-24 pb-12">

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
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Let's Talk About Your{' '}
              <span className="text-blue-600">Wikipedia Page</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Ready to establish your credibility on Wikipedia? Contact us for a
              free consultation and notability assessment.
            </p>
          </div>
        </AnimatedSection>

        {/* Info Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <AnimatedSection delay={100}>
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <Mail className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Email Us</h3>
              <a
                href="mailto:info@lexicondigital.net"
                className="text-blue-600 font-medium hover:underline"
              >
                info@lexicondigital.net
              </a>
              <p className="text-sm text-gray-500">
                We typically respond within 24 hours
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={200}>
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <MapPin className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Our Office</h3>
              <p className="text-gray-600 mb-2">Manchester, United Kingdom</p>
              <p className="text-sm text-gray-500">
                Serving clients worldwide remotely
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={300}>
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <Clock className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Business Hours
              </h3>
              <p className="text-gray-600 mb-2">Monday – Friday</p>
              <p className="text-sm text-gray-500">10:00 AM – 6:00 PM GMT</p>
            </div>
          </AnimatedSection>
        </div>

      </div>
    </div>
  );
}
