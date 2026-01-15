import { Helmet } from 'react-helmet-async';
import { Shield, Lightbulb, Target, Users, Award, Lock } from 'lucide-react';
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
        'Our reputation is built on creating compliant, high-quality Wikipedia content that stands the test of time.',
    },
    {
      icon: Lightbulb,
      title: 'Knowledge',
      description:
        'Deep expertise in Wikipedia policies, editorial standards, and digital encyclopedic publishing.',
    },
    {
      icon: Lock,
      title: 'Confidentiality',
      description:
        'Your information and collaboration are handled with strict professional discretion.',
    },
    {
      icon: Target,
      title: 'Client Success',
      description:
        'We succeed only when your Wikipedia presence achieves lasting recognition.',
    },
  ];

  const stats = [
    { number: '500+', label: 'Wikipedia Articles Created' },
    { number: '95%', label: 'Approval Rate' },
    { number: '10+', label: 'Years of Experience' },
    { number: '50+', label: 'Industries Served' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 pt-24 pb-12">

      {/* ================= SEO ================= */}
      <Helmet>
        <title>About Lexicon Digital | Wikipedia Page Creation Experts</title>

        <meta
          name="description"
          content="Learn about Lexicon
