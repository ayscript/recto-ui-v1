import React from "react";
import {
  Wand2,
  Layout,
  Image as ImageIcon,
  Zap,
  CheckCircle2,
  ArrowRight,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";

// --- Components ---

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="shrink-0 flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">R</span>
            </div>
            <span className="font-bold text-xl tracking-tight text-slate-900">
              RECTO
            </span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            <a
              href="#features"
              className="text-gray-600 hover:text-indigo-600 transition-colors"
            >
              Features
            </a>
            <a
              href="#showcase"
              className="text-gray-600 hover:text-indigo-600 transition-colors"
            >
              Showcase
            </a>
            <a
              href="#pricing"
              className="text-gray-600 hover:text-indigo-600 transition-colors"
            >
              Pricing
            </a>
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="text-gray-900 font-medium hover:text-indigo-600 px-3 py-2">
              Sign In
            </button>
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-lg font-medium transition-all shadow-lg shadow-indigo-600/20">
              Get Started
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 p-4 space-y-4">
          <a href="#features" className="block text-gray-600">
            Features
          </a>
          <a href="#showcase" className="block text-gray-600">
            Showcase
          </a>
          <button className="w-full text-left text-gray-900 font-medium py-2">
            Sign In
          </button>
          <button className="w-full bg-indigo-600 text-white px-5 py-2.5 rounded-lg font-medium">
            Get Started
          </button>
        </div>
      )}
    </nav>
  );
};

const Hero = () => {
  return (
    <section className="pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <div className="inline-flex items-center px-3 py-1 rounded-full border border-indigo-100 bg-indigo-50 text-indigo-600 text-sm font-medium mb-8">
          <Zap className="w-4 h-4 mr-2 fill-indigo-600" />
          <span>Beta Version is now live with quality generation</span>
        </div>

        {/* Headline */}
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-slate-900 tracking-tight mb-6">
          Design anything. <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-600 to-purple-600">
            Just describe it.
          </span>
        </h1>

        {/* Subhead */}
        <p className="max-w-2xl mx-auto text-xl text-gray-600 mb-10 leading-relaxed">
          Recto AI turns your text into professional designs instantly. From
          concert flyers to business cards, let our AI handle the pixels while
          you handle the ideas.
        </p>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <button className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all shadow-xl shadow-indigo-600/25 hover:scale-105">
            <Wand2 className="w-5 h-5" />
            Start Creating for Free
          </button>
          <button className="flex items-center justify-center gap-2 bg-white border border-gray-200 hover:border-indigo-600 hover:text-indigo-600 text-gray-700 px-8 py-4 rounded-xl font-semibold text-lg transition-all">
            View Gallery
          </button>
        </div>

        {/* Dashboard Mockup Container */}
        <div className="relative mx-auto max-w-5xl">
          {/* Decorative gradients */}
          <div className="absolute -top-12 -left-12 w-64 h-64 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
          <div className="absolute -top-12 -right-12 w-64 h-64 bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>

          {/* Main Image Wrapper */}
          <div className="relative rounded-2xl bg-gray-900/5 p-2 lg:p-4 backdrop-blur-sm border border-gray-200/50">
            <div className="rounded-xl overflow-hidden shadow-2xl border border-gray-200 bg-white">
              {/* PLACEHOLDER: Replace src with your screenshot (image_b710b6.png) */}
              <img
                src="/landingpage.png"
                alt="Recto AI Dashboard Interface"
                className="w-full h-auto object-cover"
              />

              {/* Simulated UI Overlay (Optional - to mimic your screenshot structure if image missing) */}
              <div className="absolute inset-0 flex items-center justify-center bg-gray-50/50 pointer-events-none opacity-0">
                <span className="bg-white px-4 py-2 rounded shadow">
                  Dashboard Screenshot Goes Here
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Features = () => {
  const features = [
    {
      icon: <Layout className="w-6 h-6 text-indigo-600" />,
      title: "Versatile Templates",
      desc: "Whether it's a birthday card, a book cover, or a restaurant menu, our AI understands the context and structure.",
    },
    {
      icon: <Wand2 className="w-6 h-6 text-indigo-600" />,
      title: "Smart Prompts",
      desc: "Don't know design jargon? Just talk naturally. 'A spooky poster for a halloween party' is all you need.",
    },
    {
      icon: <ImageIcon className="w-6 h-6 text-indigo-600" />,
      title: "High-Res Export",
      desc: "Download your creations in print-ready formats (PDF, PNG, JPG) with zero pixelation.",
    },
  ];

  return (
    <section id="features" className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            Why designers (and non-designers) love Recto
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Stop wrestling with complicated design software. Focus on the
            vision.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 bg-indigo-50 rounded-lg flex items-center justify-center mb-6">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const UseCases = () => {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
              From concept to finished design in{" "}
              <span className="text-indigo-600">minutes</span>.
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Recto doesn't just place random images. It understands typography,
              spacing, and composition.
            </p>

            <ul className="space-y-4">
              {[
                "Marketing Flyers & Posters",
                "Social Media Posts (Instagram, LinkedIn)",
                "Book Covers & Album Art",
                "Business Cards & Letterheads",
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
                  <span className="text-slate-800 font-medium">{item}</span>
                </li>
              ))}
            </ul>

            <button className="mt-10 flex items-center gap-2 text-indigo-600 font-bold hover:gap-3 transition-all">
              See all use cases <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Abstract representations of designs */}
            <div className="space-y-4 translate-y-8">
              <div className="h-64 bg-slate-100 rounded-2xl p-4 flex flex-col justify-end">
                <span className="text-sm font-bold text-slate-400">
                  Concert Flyer
                </span>
              </div>
              <div className="h-48 bg-indigo-50 rounded-2xl p-4 flex flex-col justify-end">
                <span className="text-sm font-bold text-indigo-300">
                  Biz Card
                </span>
              </div>
            </div>
            <div className="space-y-4">
              <div className="h-48 bg-purple-50 rounded-2xl p-4 flex flex-col justify-end">
                <span className="text-sm font-bold text-purple-300">
                  Instagram
                </span>
              </div>
              <div className="h-64 bg-slate-800 rounded-2xl p-4 flex flex-col justify-end">
                <span className="text-sm font-bold text-slate-500">
                  Book Cover
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const CTA = () => {
  return (
    <section className="py-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-indigo-600 rounded-3xl p-10 md:p-16 text-center text-white relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute top-0 left-0 w-full h-full opacity-10">
            <div className="w-64 h-64 bg-white rounded-full absolute -top-10 -left-10 blur-3xl"></div>
            <div className="w-64 h-64 bg-white rounded-full absolute bottom-0 right-0 blur-3xl"></div>
          </div>

          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to create your next masterpiece?
            </h2>
            <p className="text-indigo-100 text-lg mb-10 max-w-2xl mx-auto">
              Join thousands of creators using Recto AI to speed up their
              workflow. No credit card required for free trial.
            </p>
            <button className="bg-white text-indigo-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-50 transition-colors shadow-lg">
              Launch Recto Dashboard
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 py-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <span className="text-white font-bold text-2xl tracking-tight block mb-4">
              RECTO
            </span>
            <p className="text-sm text-slate-400">
              AI-powered design for everyone.
              <br />© 2024 Recto AI Inc.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Product</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Features
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  API
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Careers
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Privacy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Terms
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default function RectoLandingPage() {
  return (
    <div className="min-h-screen bg-white font-sans text-slate-900">
      <Navbar />
      <Hero />
      <Features />
      <UseCases />
      <CTA />
      <Footer />
    </div>
  );
}
