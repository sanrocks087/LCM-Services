import { useState, useEffect } from 'react';
import {
  Phone,
  Mail,
  MapPin,
  Menu,
  X,
  CheckCircle,
  Star,
  ChevronDown,
  ChevronUp,
  MessageCircle,
  Clock,
  Users,
  Shield,
  Sparkles,
  Wrench,
  Droplets,
  Zap,
  Hammer,
  Brush,
  Truck,
  Home,
  ArrowRight,
  Send,
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  Heart,
  AlertCircle,
  ThumbsUp,
  Calendar,
  Settings,
  PhoneCall,
} from 'lucide-react';
import logo from './assets/LCM_Logo.jpeg';
import ContactForm from "./components/ContactForm";

const WHATSAPP_NUMBER1 = '918796538504';
const WHATSAPP_NUMBER2 = '918796428504';
const EMAIL_ADDRESS = 'contact@lcmservices.in';
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER1}?text=Hi%20LCM%20Services!%20I'm%20interested%20in%20your%20maintenance%20services.`;

interface PricingPlan {
  id: string;
  name: string;
  price: string;
  popular?: boolean;
  description: string;
  features: string[];
  bestFor: string;
}

const pricingPlans: PricingPlan[] = [
  {
    id: 'basic',
    name: 'Basic Plan',
    price: '3,499',
    description: 'Perfect for small builder floors looking for essential maintenance coverage.',
    features: [
      'Parking area cleaning three times per week',
      'Staircase cleaning to maintain hygiene and appearance',
      'Dedicated maintenance support phone number',
      'Assistance arrangement for Plumbing work',
      'Assistance arrangement for Electrical work',
      'Assistance arrangement for Masonry work',
      'Assistance arrangement for Carpentry work',
      'Sewage overflow assistance in parking areas',
      'Response within 2 hours of service request',
    ],
    bestFor: 'Builder floors that need regular cleaning and occasional maintenance support.',
  },
  {
    id: 'standard',
    name: 'Standard Plan',
    price: '5,499',
    popular: true,
    description: 'Our Most Popular Plan. Everything in Basic plus preventive maintenance.',
    features: [
      'Parking cleaning on alternate days',
      'Staircase cleaning on alternate days',
      'Everything included in Basic Plan',
      'Common area light maintenance and replacement coordination',
      'One submersible pump repair coordination per year/coverage cycle',
      'One sewage overflow issue resolution coordination',
      'One complete water tank cleaning service',
      'Vendor coordination and work supervision',
      'Transparent repair estimates before work begins',
    ],
    bestFor: 'Medium-sized builder floors that want preventive maintenance and reduced resident involvement.',
  },
  {
    id: 'premium',
    name: 'Premium Plan',
    price: '7,499',
    description: 'Complete Peace-of-Mind Maintenance Package.',
    features: [
      'Everything included in Standard Plan',
      'Two submersible pump repair coordinations',
      'Two sewage overflow issue resolutions',
      'Main gate painting support',
      'Diwali / Christmas decorative lighting coordination',
      'Priority maintenance response',
      'Enhanced vendor supervision and coordination',
      'Improved building appearance throughout the year',
      'All Standard features with enhanced coverage',
    ],
    bestFor: 'Builder floors seeking a premium maintenance experience with minimal resident involvement.',
  },
];

const services = [
  { icon: Truck, title: 'Parking Cleaning', description: 'Regular parking area cleaning to maintain hygiene and appearance' },
  { icon: Home, title: 'Stair Cleaning', description: 'Clean and presentable staircases for a pleasant building experience' },
  { icon: Zap, title: 'Electrical Maintenance', description: 'Prompt electrical repairs and maintenance coordination' },
  { icon: Droplets, title: 'Plumbing Assistance', description: 'Quick resolution of plumbing issues and leak repairs' },
  { icon: Hammer, title: 'Masonry Assistance', description: 'Expert masonry work for structural repairs' },
  { icon: Wrench, title: 'Carpentry Assistance', description: 'Quality carpentry services for doors, windows, and more' },
  { icon: Droplets, title: 'Water Tank Cleaning', description: 'Periodic water tank cleaning for clean water supply' },
  { icon: AlertCircle, title: 'Sewage Overflow Support', description: 'Immediate assistance for sewage issues' },
  { icon: Users, title: 'Vendor Supervision', description: 'Professional supervision of repair workers' },
  { icon: Calendar, title: 'Contribution Coordination', description: 'Hassle-free maintenance contribution management' },
];

const problems = [
  { icon: AlertCircle, title: 'Nobody wants to collect maintenance money', description: 'No more uncomfortable conversations about collecting funds from neighbors' },
  { icon: Sparkles, title: 'Common areas become dirty', description: 'Regular cleaning schedules keep your building presentable' },
  { icon: Users, title: 'Residents argue about repairs', description: 'We coordinate and communicate, reducing conflicts' },
  { icon: Clock, title: 'No one wants to supervise workers', description: 'Professional vendor supervision without taking leave from work' },
  { icon: Wrench, title: 'Maintenance issues remain unresolved', description: 'Faster resolution through dedicated maintenance partner' },
];

const reviews = [
  {
    name: 'Rajesh Kumar',
    location: 'Dwarka Mor, Delhi',
    rating: 5,
    text: 'LCM Services has transformed our building. No more arguments about maintenance collection. Everything runs smoothly now.',
  },
  {
    name: 'Priya Sharma',
    location: 'Uttam Nagar West',
    rating: 5,
    text: 'Finally, someone reliable to handle all building maintenance. Our common areas have never been cleaner.',
  },
  {
    name: 'Amit Verma',
    location: 'Janakpuri',
    rating: 5,
    text: 'The team is professional and responsive. Water tank cleaning, electrical issues - everything is handled promptly.',
  },
  {
    name: 'Sunita Gupta',
    location: 'Mohan Garden',
    rating: 5,
    text: 'Peace of mind at last! They coordinate with vendors and supervise work. We just approve and relax.',
  },
];

const faqs = [
  {
    question: 'What areas do you service?',
    answer: 'We currently serve all builder floor societies across Delhi NCR including Delhi, Gurgaon, Noida, Faridabad, and Ghaziabad.',
  },
  {
    question: 'How quickly can I expect a response?',
    answer: 'We respond to all service requests within 2 hours. For urgent issues like sewage overflow, we aim for immediate assistance.',
  },
  {
    question: 'Do I need to supervise the repair work?',
    answer: 'No, that is our job. We inspect issues, provide transparent estimates, and supervise vendors. You only need to approve the work.',
  },
  {
    question: 'How are maintenance contributions collected?',
    answer: 'We assist in coordinating contributions from flat owners, making the process transparent and hassle-free for everyone.',
  },
  {
    question: 'What if we need services beyond our plan?',
    answer: 'We offer flexible add-on services. Contact us for any specific requirements and we will provide transparent pricing.',
  },
  {
    question: 'Can I upgrade or downgrade my plan?',
    answer: 'Yes, you can change your plan at the end of your billing cycle. Contact our support team for assistance.',
  },
];

const whyChooseUs = [
  { icon: ThumbsUp, title: 'No more uncomfortable conversations about maintenance collection' },
  { icon: Clock, title: 'No need to take leave from work to supervise workers' },
  { icon: Sparkles, title: 'Common areas stay clean and presentable' },
  { icon: Zap, title: 'Faster issue resolution through dedicated partner' },
  { icon: Users, title: 'Professional coordination with service providers' },
  { icon: Heart, title: 'Reduced conflicts among flat owners' },
  { icon: Shield, title: 'Improved property appearance and satisfaction' },
  { icon: Star, title: 'Transparent estimates before work begins' },
];

const howItWorks = [
  { step: 1, title: 'Contact Us', description: 'Reach out via phone, WhatsApp, or our contact form' },
  { step: 2, title: 'Site Assessment', description: 'We visit your building to understand requirements' },
  { step: 3, title: 'Choose Your Plan', description: 'Select the plan that fits your needs' },
  { step: 4, title: 'Start Service', description: 'We begin maintenance from day one' },
  { step: 5, title: 'Enjoy Peace of Mind', description: 'Sit back while we handle everything' },
];

function Logo() {
  return (
    <div className="flex items-center gap-2">
      <div className="w-12 h-12 bg-gradient-to-br to-secondary-500 rounded-full flex items-center justify-center">
        <img src={logo} alt="LCM Services Logo"/>
      </div>
      <div>
        <span className="text-xl font-bold text-gray-900">LCM Services</span>
        <p className="text-xs text-gray-500 -mt-0.5">Lotus Cleaning & Maintenance</p>
      </div>
    </div>
  );
}

function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Services', href: '#services' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'About', href: '#why-us' },
    { name: 'Reviews', href: '#reviews' },
    { name: 'FAQ', href: '#faq' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-lg' : 'bg-white/95 backdrop-blur-sm'}`}>
      <div className="section-container">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Logo />

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a key={link.name} href={link.href} className="text-gray-600 hover:text-primary-600 transition-colors font-medium">
                {link.name}
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4">
            <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="btn-whatsapp">
              <MessageCircle className="w-5 h-5" />
              WhatsApp
            </a>
          </div>

          <button className="md:hidden p-2" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden pb-4 animate-slide-up">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="block py-2 text-gray-600 hover:text-primary-600 font-medium"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="btn-whatsapp mt-4 justify-center">
              <MessageCircle className="w-5 h-5" />
              WhatsApp Us
            </a>
          </div>
        )}
      </div>
    </nav>
  );
}

function HeroSection() {
  return (
    <section className="pt-20 md:pt-28 pb-16 md:pb-24 bg-gradient-to-br from-primary-50 via-white to-secondary-50 overflow-hidden">
      <div className="section-container">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in">
            <div className="inline-flex items-center gap-2 bg-primary-100 text-primary-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              <span>Happy Neighbors</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
              Tired of Being the <span className="gradient-text">Only Neighbor</span> Who Cares About Building Maintenance?
            </h1>

            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Every builder floor has the same story. Dirty parking areas, neglected staircases, broken lights,
              and those uncomfortable conversations about collecting maintenance money. <strong className="text-gray-800">LCM Services solves this for you.</strong>
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="btn-whatsapp justify-center text-lg px-8 py-4">
                <MessageCircle className="w-6 h-6" />
                Chat on WhatsApp
              </a>
              <a href="#pricing" className="btn-secondary justify-center text-lg px-8 py-4">
                View Plans
              </a>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {[
                'Response within 2 hours',
                'Professional coordination',
                'Transparent estimates',
                'No supervision needed',
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 text-gray-700">
                  <CheckCircle className="w-5 h-5 text-primary-500 flex-shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative animate-slide-in-right hidden lg:block">
            <div className="relative w-full aspect-square">
              <div className="absolute inset-0 bg-gradient-to-br from-primary-400 to-secondary-400 rounded-3xl transform rotate-6 opacity-20"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-3xl opacity-90 flex items-center justify-center">
                <div className="text-center text-white p-8">
                  <div className="mb-6">
                    <Home className="w-24 h-24 mx-auto mb-4 opacity-90" />
                  </div>
                  <p className="text-2xl font-bold mb-2">One Call. One Team.</p>
                  <p className="text-xl">Complete Peace of Mind</p>
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 bg-white rounded-xl shadow-xl p-4 animate-float">
                <div className="flex items-center gap-3">
                  <div className="bg-[#25D366] rounded-full p-2">
                    <MessageCircle className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Quick Response</p>
                    <p className="text-sm text-gray-500">Within 2 hours</p>
                  </div>
                </div>
              </div>
              <div className="absolute -top-4 -left-4 bg-white rounded-xl shadow-xl p-4 animate-float" style={{ animationDelay: '0.5s' }}>
                <div className="flex items-center gap-3">
                  <div className="bg-primary-500 rounded-full p-2">
                    <CheckCircle className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">100+ Buildings</p>
                    <p className="text-sm text-gray-500">Served in Delhi NCR</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function WhyChooseUsSection() {
  return (
    <section id="why-us" className="py-16 md:py-24 bg-white">
      <div className="section-container">
        <h2 className="section-title">Why Flat Owners Choose <span className="gradient-text">LCM Services</span></h2>
        <p className="section-subtitle">
          We become your dedicated maintenance partner, so you can focus on living, not managing.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {whyChooseUs.map((item, idx) => (
            <div
              key={idx}
              className="card p-6 hover:bg-primary-50 transition-colors duration-300 group"
              style={{ animationDelay: `${idx * 50}ms` }}
            >
              <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <item.icon className="w-6 h-6 text-white" />
              </div>
              <p className="text-gray-700 font-medium">{item.title}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProblemsSection() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-gray-50 to-primary-50">
      <div className="section-container">
        <h2 className="section-title">Problems We <span className="text-red-500">Solve</span></h2>
        <p className="section-subtitle">
          Every builder floor faces these common challenges. We handle them all.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {problems.map((problem, idx) => (
            <div key={idx} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="w-14 h-14 bg-red-100 rounded-xl flex items-center justify-center mb-4">
                <problem.icon className="w-7 h-7 text-red-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{problem.title}</h3>
              <p className="text-gray-600">{problem.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="btn-whatsapp inline-flex text-lg">
            <MessageCircle className="w-6 h-6" />
            Discuss Your Building Needs
          </a>
        </div>
      </div>
    </section>
  );
}

function ServicesSection() {
  return (
    <section id="services" className="py-16 md:py-24 bg-white">
      <div className="section-container">
        <h2 className="section-title">Our <span className="gradient-text">Services</span></h2>
        <p className="section-subtitle">
          Comprehensive maintenance solutions for builder floor residents in Delhi NCR.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {services.map((service, idx) => (
            <div
              key={idx}
              className="card p-6 text-center hover:bg-gradient-to-br hover:from-primary-50 hover:to-secondary-50 transition-all duration-300 group"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <service.icon className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{service.title}</h3>
              <p className="text-sm text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorksSection() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-primary-600 to-secondary-600 text-white">
      <div className="section-container">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">How It Works</h2>
        <p className="text-lg text-white/80 text-center max-w-3xl mx-auto mb-12">
          Getting started with LCM Services is simple. Here's how we ensure smooth maintenance.
        </p>

        <div className="grid md:grid-cols-5 gap-8">
          {howItWorks.map((step, idx) => (
            <div key={idx} className="text-center relative">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <span className="text-2xl font-bold gradient-text">{step.step}</span>
              </div>
              <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
              <p className="text-white/80 text-sm">{step.description}</p>
              {idx < howItWorks.length - 1 && (
                <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-0.5 bg-white/30">
                  <ArrowRight className="absolute top-1/2 right-0 -translate-y-1/2 text-white/60" />
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 bg-white/10 rounded-2xl p-6 md:p-8">
          <h3 className="text-xl font-semibold mb-4 text-center">How Assistance Services Work</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              'A resident contacts LCM Services',
              'We inspect or evaluate the issue',
              'A transparent estimate is shared',
              'After approval, work is scheduled',
              'We supervise the vendor and monitor quality',
              'Labour and material costs collected separately',
            ].map((item, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-sm font-bold text-primary-600">{idx + 1}</span>
                </div>
                <p className="text-white/90">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function PricingCard({ plan, onViewDetails }: { plan: typeof pricingPlans[0]; onViewDetails: () => void }) {
  return (
    <div className={`card p-8 relative ${plan.popular ? 'ring-2 ring-primary-500 scale-105' : ''}`}>
      {plan.popular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
          <span className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-4 py-1 rounded-full text-sm font-medium">
            Most Popular
          </span>
        </div>
      )}

      <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
      <div className="flex items-baseline gap-1 mb-4">
        <span className="text-4xl font-bold gradient-text">₹{plan.price}</span>
        <span className="text-gray-600">/month</span>
      </div>

      <p className="text-gray-600 mb-6">{plan.description}</p>

      <button
        onClick={onViewDetails}
        className="w-full btn-secondary mb-4 flex items-center justify-center gap-2"
      >
        View Details
        <ChevronDown className="w-4 h-4" />
      </button>

      <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="btn-whatsapp w-full justify-center">
        <MessageCircle className="w-5 h-5" />
        Get Started
      </a>
    </div>
  );
}

function PricingModal({ plan, isOpen, onClose }: { plan: PricingPlan | null; isOpen: boolean; onClose: () => void }) {
  if (!isOpen || !plan) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in" onClick={onClose}>
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-slide-up" onClick={(e) => e.stopPropagation()}>
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between rounded-t-3xl">
          <div>
            <h3 className="text-2xl font-bold text-gray-900">{plan.name}</h3>
            <p className="text-gray-500">₹{plan.price}/month</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-2xl p-6 mb-6">
            <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
              <Star className="w-5 h-5 text-primary-500" />
              Best For
            </h4>
            <p className="text-gray-700">{plan.bestFor}</p>
          </div>

          <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-primary-500" />
            Included Services
          </h4>

          <div className="space-y-3">
            {plan.features.map((feature, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl hover:bg-primary-50 transition-colors group"
                style={{ animationDelay: `${idx * 50}ms` }}
              >
                <div className="w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <CheckCircle className="w-4 h-4 text-white" />
                </div>
                <span className="text-gray-700">{feature}</span>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="btn-whatsapp flex-1 justify-center">
              <MessageCircle className="w-5 h-5" />
              Book Now
            </a>
            <button onClick={onClose} className="btn-secondary flex-1">
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function PricingSection() {
  const [selectedPlan, setSelectedPlan] = useState<PricingPlan | null>(null);

  return (
    <section id="pricing" className="py-16 md:py-24 bg-gradient-to-br from-gray-50 to-primary-50">
      <div className="section-container">
        <h2 className="section-title">Simple, Transparent <span className="gradient-text">Pricing</span></h2>
        <p className="section-subtitle">
          Choose the plan that fits your building's needs. No hidden charges.
        </p>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {pricingPlans.map((plan) => (
            <PricingCard key={plan.id} plan={plan} onViewDetails={() => setSelectedPlan(plan)} />
          ))}
        </div>
      </div>

      <PricingModal plan={selectedPlan} isOpen={!!selectedPlan} onClose={() => setSelectedPlan(null)} />
    </section>
  );
}

function ReviewsSection() {
  return (
    <section id="reviews" className="py-16 md:py-24 bg-white">
      <div className="section-container">
        <h2 className="section-title">What Our <span className="gradient-text">Customers Say</span></h2>
        <p className="section-subtitle">
          Real feedback from builder floor residents across Delhi NCR.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviews.map((review, idx) => (
            <div key={idx} className="card p-6 hover:-translate-y-1 transition-all duration-300">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <p className="text-gray-600 mb-4 italic">"{review.text}"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-primary-400 to-secondary-400 rounded-full flex items-center justify-center text-white font-semibold">
                  {review.name.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{review.name}</p>
                  <p className="text-sm text-gray-500">{review.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex items-center justify-between text-left hover:bg-gray-50 transition-colors px-4"
      >
        <span className="font-semibold text-gray-900 text-lg">{question}</span>
        {isOpen ? <ChevronUp className="w-5 h-5 text-primary-500" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
      </button>
      {isOpen && (
        <div className="pb-6 px-4 animate-fade-in">
          <p className="text-gray-600 leading-relaxed">{answer}</p>
        </div>
      )}
    </div>
  );
}

function FAQSection() {
  return (
    <section id="faq" className="py-16 md:py-24 bg-gradient-to-br from-gray-50 to-secondary-50">
      <div className="section-container max-w-3xl">
        <h2 className="section-title">Frequently Asked <span className="gradient-text">Questions</span></h2>
        <p className="section-subtitle">
          Have questions? We have answers. If you do not find what you are looking for, reach out to us.
        </p>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {faqs.map((faq, idx) => (
            <FAQItem key={idx} question={faq.question} answer={faq.answer} />
          ))}
        </div>

        <div className="mt-8 text-center">
          <p className="text-gray-600 mb-4">Still have questions?</p>
          <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="btn-whatsapp inline-flex">
            <MessageCircle className="w-5 h-5" />
            Ask Us on WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <> 
    <section id="contact" className="py-16 md:py-24 bg-white">
      <div className="section-container">
        <h2 className="section-title">Get in <span className="gradient-text">Touch</span></h2>
        <p className="section-subtitle">
          Ready to transform your building maintenance? Contact us today.
        </p>
        
        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <div className="bg-gradient-to-br from-primary-50 to-secondary-50 rounded-3xl p-8 h-full">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Phone</p>
                    <a href={`tel:${WHATSAPP_NUMBER1}`} className="text-gray-600 hover:text-primary-600">+91 {WHATSAPP_NUMBER1}</a>, &nbsp;
                    <a href={`tel:${WHATSAPP_NUMBER2}`} className="text-gray-600 hover:text-primary-600">+91 {WHATSAPP_NUMBER2}</a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-secondary-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Email</p>
                    <a href={`mailto:${EMAIL_ADDRESS}`} className="text-gray-600 hover:text-primary-600">{EMAIL_ADDRESS}</a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-accent-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Service Area</p>
                    <p className="text-gray-600">Delhi NCR (Delhi, Gurgaon, Noida, Faridabad, Ghaziabad)</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#25D366] rounded-xl flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">WhatsApp</p>
                    <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-[#25D366]">
                      Chat with us instantly
                    </a>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="btn-whatsapp w-full justify-center text-lg py-4">
                  <MessageCircle className="w-6 h-6" />
                  WhatsApp Us Now
                </a>
              </div>
            </div>
          </div>
          <ContactForm />
         
        </div>
      </div>
    </section>
    </>
  );
}

function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="section-container">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">L</span>
              </div>
              <div>
                <span className="text-xl font-bold">LCM Services</span>
                <p className="text-xs text-gray-400 -mt-0.5">Lotus Cleaning & Maintenance</p>
              </div>
            </div>
            <p className="text-gray-400 mb-4 max-w-md">
              Your dedicated maintenance partner for builder floors in Delhi NCR. We handle cleaning, repairs,
              and coordination so you don't have to.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-primary-600 rounded-full flex items-center justify-center transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-primary-600 rounded-full flex items-center justify-center transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-primary-600 rounded-full flex items-center justify-center transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-primary-600 rounded-full flex items-center justify-center transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {['Services', 'Pricing', 'Reviews', 'FAQ', 'Contact'].map((link) => (
                <li key={link}>
                  <a href={`#${link.toLowerCase()}`} className="text-gray-400 hover:text-white transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-gray-400">
                <Phone className="w-4 h-4" />
                <span>+91 {WHATSAPP_NUMBER1}</span>
              </li>
               <li className="flex items-center gap-2 text-gray-400">
                <Phone className="w-4 h-4" />
                <span>+91 {WHATSAPP_NUMBER2}</span>
              </li>
              <li className="flex items-center gap-2 text-gray-400">
                <Mail className="w-4 h-4" />
                <span>{EMAIL_ADDRESS}</span>
              </li>
              <li className="flex items-center gap-2 text-gray-400">
                <MapPin className="w-4 h-4" />
                <span>Delhi NCR</span>
              </li>
            </ul>
            <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="btn-whatsapp mt-4 text-sm">
              <MessageCircle className="w-4 h-4" />
              WhatsApp Us
            </a>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} LCM Services. All rights reserved.
          </p>
          <p className="text-gray-500 text-sm flex items-center gap-1">
            Made with <Heart className="w-4 h-4 text-red-500 fill-red-500" /> for Delhi NCR Residents
          </p>
        </div>
      </div>
    </footer>
  );
}

function FloatingWhatsApp() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <a
      href={WHATSAPP_LINK}
      target="_blank"
      rel="noopener noreferrer"
      className={`fixed bottom-6 right-6 z-40 bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="w-6 h-6" />
      <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full animate-bounce-subtle">
        1
      </span>
    </a>
  );
}

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <HeroSection />
      <WhyChooseUsSection />
      <ProblemsSection />
      <ServicesSection />
      <HowItWorksSection />
      <PricingSection />
      <ReviewsSection />
      <FAQSection />
      <ContactSection />
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}

export default App;
