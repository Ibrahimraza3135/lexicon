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
} from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';

interface HomeProps {
  onNavigate: (page: string) => void;
}

export default function Home({ onNavigate }: HomeProps) {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = ['Notability', 'Research', 'Draft', 'Review', 'Submit', 'Monitor'];

  const benefits = [
    {
      icon: CheckCircle,
      title: 'Credibility That Lasts',
      description:
        'Establish a permanent digital presence with a Wikipedia article that enhances trust and authority.',
    },
    {
      icon: Users,
      title: 'Expert Wikipedia Editors',
      description:
        'Our professional editors strictly follow Wikipedia notability and editorial guidelines.',
    },
    {
      icon: FileCheck,
      title: 'Reliable Source Research',
      description:
        'We identify and cite credible secondary sources required for Wikipedia approval.',
    },
    {
      icon: Shield,
      title: 'Policy-Compliant Writing',
      description:
        'Every article is written in a neutral, encyclopedic tone to meet Wikipedia standards.',
    },
    {
      icon: TrendingUp,
      title: 'Transparent Process',
      description:
        'You get full visibility into research, drafting, submission, and monitoring.',
    },
    {
      icon: Clock,
      title: 'Fast Delivery Options',
      description:
        'Expedited Wikipedia services available for urgent publishing needs.',
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % steps.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen">
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
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-whi
