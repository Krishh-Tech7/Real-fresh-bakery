// ═══════════════════════════════════════
// CrumbleCo — Homepage
// ═══════════════════════════════════════

import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ArrowRight, Truck, Leaf, Award, Clock, ChevronLeft, ChevronRight,
  Star, Mail, Sparkles
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { ProductCard } from '@/components/shared/ProductCard';
import { StarRating } from '@/components/ui/StarRating';
import { mockProducts, mockTestimonials } from '@/data/mockData';
import { BRAND, CATEGORIES, MARQUEE_TEXT, ROUTES } from '@/constants';

/* ─── Hero Section ─── */
const HeroSection: React.FC = () => (
  <section className="relative min-h-screen flex items-center overflow-hidden pt-20" id="hero">
    {/* Background gradient */}
    <div className="absolute inset-0 bg-gradient-to-br from-cream-100 via-cream-50 to-amber-50" />
    <div className="absolute top-20 right-0 w-[600px] h-[600px] bg-amber-200/20 rounded-full blur-3xl" />
    <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-rose-200/15 rounded-full blur-3xl" />

    <div className="container-app relative z-10 grid lg:grid-cols-2 gap-12 items-center py-12">
      {/* Left: Content */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="space-y-8"
      >
        {/* Fresh Daily Badge */}
        <motion.div
          animate={{ rotate: [0, 2, -2, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="inline-flex items-center gap-2 px-4 py-2 bg-amber-100 rounded-full"
        >
          <Sparkles size={16} className="text-amber-500" />
          <span className="text-sm font-bold text-amber-600 font-body">Fresh Daily</span>
        </motion.div>

        <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-espresso-500 leading-[1.1]">
          Baked Fresh.{' '}
          <span className="text-amber-400">Delivered</span>{' '}
          with Love.
        </h1>

        <p className="text-lg text-espresso-300 max-w-lg font-body leading-relaxed">
          Artisan breads, handcrafted cakes, flaky pastries — made with love and the finest natural
          ingredients. From our oven to your door.
        </p>

        <div className="flex flex-wrap items-center gap-4">
          <Link to={ROUTES.PRODUCTS}>
            <Button size="lg" icon={<ArrowRight size={18} />} iconPosition="right">
              Shop Now
            </Button>
          </Link>
          <a href="#about">
            <Button variant="outline" size="lg">
              Our Story
            </Button>
          </a>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-8 pt-4">
          {[
            { value: '500+', label: 'Daily Orders' },
            { value: '12+', label: 'Years Baking' },
            { value: '4.9★', label: 'Avg Rating' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-2xl font-bold text-espresso-500 font-display">{stat.value}</p>
              <p className="text-xs text-espresso-200 uppercase tracking-wider">{stat.label}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Right: Floating images */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative hidden lg:block"
      >
        <div className="relative w-full h-[550px]">
          {/* Main image */}
          <motion.div
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-8 left-12 w-72 h-72 rounded-3xl overflow-hidden shadow-warm-xl rotate-3"
          >
            <img
              src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500&h=500&fit=crop"
              alt="Chocolate cake"
              className="w-full h-full object-cover"
              width={500} height={500}
            />
          </motion.div>

          {/* Second image */}
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            className="absolute top-32 right-4 w-56 h-56 rounded-3xl overflow-hidden shadow-warm-lg -rotate-6"
          >
            <img
              src="https://images.unsplash.com/photo-1555507036-ab1f4038024a?w=400&h=400&fit=crop"
              alt="Croissant"
              className="w-full h-full object-cover"
              width={400} height={400}
            />
          </motion.div>

          {/* Third image */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
            className="absolute bottom-8 left-24 w-48 h-48 rounded-3xl overflow-hidden shadow-warm-lg rotate-6"
          >
            <img
              src="https://images.unsplash.com/photo-1585478259715-876acc5be8eb?w=400&h=400&fit=crop"
              alt="Sourdough bread"
              className="w-full h-full object-cover"
              width={400} height={400}
            />
          </motion.div>

          {/* Decorative circles */}
          <div className="absolute top-0 right-20 w-20 h-20 bg-amber-200/30 rounded-full" />
          <div className="absolute bottom-20 right-0 w-12 h-12 bg-rose-200/40 rounded-full" />
        </div>
      </motion.div>
    </div>
  </section>
);

/* ─── Category Pills ─── */
const CategorySection: React.FC = () => (
  <section className="py-8 border-b border-cream-200 bg-white/50" id="categories">
    <div className="container-app">
      <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide snap-x snap-mandatory">
        {CATEGORIES.map((cat) => (
          <Link
            key={cat.id}
            to={cat.id === 'all' ? ROUTES.PRODUCTS : `/products?category=${cat.slug}`}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-cream-300 hover:border-amber-400 hover:bg-amber-50 transition-all whitespace-nowrap snap-start shrink-0 group"
          >
            <span className="text-lg">{cat.icon}</span>
            <span className="text-sm font-medium text-espresso-400 group-hover:text-amber-600 transition-colors">
              {cat.name}
            </span>
          </Link>
        ))}
      </div>
    </div>
  </section>
);

/* ─── Featured Products ─── */
const FeaturedProducts: React.FC = () => {
  const featured = mockProducts.filter((p) => p.featured).slice(0, 8);
  return (
    <section className="py-20 bg-cream-50" id="featured">
      <div className="container-app">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="font-accent text-amber-400 text-xl mb-2">Freshly Baked</p>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-espresso-500 mb-4">
            Featured Delights
          </h2>
          <div className="flourish max-w-xs mx-auto">
            <span className="text-amber-400">✦</span>
          </div>
          <p className="text-espresso-300 mt-4 max-w-md mx-auto">
            Handpicked favorites from our kitchen — made fresh every morning with premium ingredients.
          </p>
        </motion.div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>

        {/* View All */}
        <div className="text-center mt-12">
          <Link to={ROUTES.PRODUCTS}>
            <Button variant="outline" size="lg" icon={<ArrowRight size={18} />} iconPosition="right">
              View All Products
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

/* ─── Marquee Banner ─── */
const MarqueeBanner: React.FC = () => (
  <section className="py-4 bg-espresso-500 overflow-hidden">
    <div className="relative">
      <div className="animate-marquee whitespace-nowrap flex items-center gap-8">
        {Array.from({ length: 4 }).map((_, i) => (
          <span key={i} className="text-cream-200 font-body text-sm tracking-wider flex items-center gap-8">
            {MARQUEE_TEXT.split('•').map((segment, j) => (
              <React.Fragment key={j}>
                <span>{segment.trim()}</span>
                {j < MARQUEE_TEXT.split('•').length - 1 && (
                  <span className="text-amber-400">✦</span>
                )}
              </React.Fragment>
            ))}
          </span>
        ))}
      </div>
    </div>
  </section>
);

/* ─── About / Story Section ─── */
const AboutSection: React.FC = () => (
  <section className="py-20 bg-white" id="about">
    <div className="container-app">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        {/* Left: Image */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="golden-frame"
        >
          <img
            src="https://images.unsplash.com/photo-1556217477-d325251ece38?w=600&h=450&fit=crop"
            alt="Artisan baker at work"
            className="w-full h-[400px] object-cover rounded-xl"
            width={600} height={450}
            loading="lazy"
          />
        </motion.div>

        {/* Right: Content */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          <p className="font-accent text-amber-400 text-xl">Our Story</p>
          <h2 className="font-display text-4xl font-bold text-espresso-500">
            Crafted with Passion, Baked with Love
          </h2>
          <p className="text-espresso-300 leading-relaxed">
            Since 2012, CrumbleCo has been on a mission to bring the finest
            artisan baked goods to your doorstep. We believe every ingredient
            matters — from the organic flour we source locally to the premium
            European butter in our croissants.
          </p>
          <p className="text-espresso-300 leading-relaxed">
            Our bakers start at 4 AM every day, crafting each loaf, cake, and
            pastry by hand. No shortcuts, no preservatives — just honest,
            soulful baking.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 pt-4">
            {[
              { icon: <Truck size={24} />, value: '500+', label: 'Daily Orders' },
              { icon: <Clock size={24} />, value: '12+', label: 'Years Baking' },
              { icon: <Leaf size={24} />, value: '100%', label: 'Natural Ingredients' },
            ].map((stat) => (
              <div key={stat.label} className="text-center p-4 bg-cream-50 rounded-2xl">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-amber-100 text-amber-600 rounded-xl mb-3">
                  {stat.icon}
                </div>
                <p className="text-2xl font-bold text-espresso-500 font-display">{stat.value}</p>
                <p className="text-xs text-espresso-200 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

/* ─── Testimonials Carousel ─── */
const TestimonialsSection: React.FC = () => {
  const [current, setCurrent] = React.useState(0);
  const total = mockTestimonials.length;

  React.useEffect(() => {
    const timer = setInterval(() => setCurrent((c) => (c + 1) % total), 5000);
    return () => clearInterval(timer);
  }, [total]);

  return (
    <section className="py-20 bg-cream-100 grain-overlay" id="testimonials">
      <div className="container-app relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="font-accent text-amber-400 text-xl mb-2">Happy Customers</p>
          <h2 className="font-display text-4xl font-bold text-espresso-500">What People Say</h2>
        </motion.div>

        {/* Carousel */}
        <div className="max-w-2xl mx-auto">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="bg-white rounded-3xl p-8 shadow-card text-center"
          >
            <div className="flex justify-center mb-4">
              <StarRating rating={mockTestimonials[current].rating} size={20} />
            </div>
            <p className="text-espresso-400 text-lg leading-relaxed mb-6 font-body italic">
              "{mockTestimonials[current].comment}"
            </p>
            <div className="flex items-center justify-center gap-3">
              <img
                src={mockTestimonials[current].avatar}
                alt={mockTestimonials[current].name}
                className="w-12 h-12 rounded-full object-cover ring-2 ring-amber-200"
                width={48} height={48}
              />
              <div className="text-left">
                <p className="font-semibold text-espresso-500">{mockTestimonials[current].name}</p>
                {mockTestimonials[current].isVerified && (
                  <div className="flex items-center gap-1 text-xs text-emerald-600">
                    <Award size={12} /> Verified Buyer
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          {/* Dots & Arrows */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={() => setCurrent((c) => (c - 1 + total) % total)}
              className="p-2 hover:bg-white rounded-full transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={20} className="text-espresso-300" />
            </button>
            <div className="flex items-center gap-2">
              {mockTestimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    i === current ? 'bg-amber-400 w-6' : 'bg-espresso-200/30'
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>
            <button
              onClick={() => setCurrent((c) => (c + 1) % total)}
              className="p-2 hover:bg-white rounded-full transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight size={20} className="text-espresso-300" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ─── Newsletter Section ─── */
const NewsletterSection: React.FC = () => {
  const [email, setEmail] = React.useState('');
  const [submitted, setSubmitted] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) { setSubmitted(true); setEmail(''); }
  };

  return (
    <section className="py-20 bg-gradient-to-br from-espresso-500 via-espresso-400 to-espresso-500 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-32 h-32 bg-amber-400 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-rose-300 rounded-full blur-3xl" />
      </div>

      <div className="container-app relative z-10 text-center max-w-xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-400/20 rounded-2xl mb-2">
            <Mail size={28} className="text-amber-400" />
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-cream-50">
            Stay in the Loop
          </h2>
          <p className="text-cream-300 font-body">
            No spam. Only fresh recipes, exclusive discounts & early access to seasonal specials.
          </p>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-emerald-500/20 text-emerald-300 px-6 py-4 rounded-2xl font-medium"
            >
              🎉 You're in! Watch your inbox for something delicious.
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="flex gap-3 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className="flex-1 px-5 py-3.5 bg-white/10 border border-cream-200/20 rounded-xl text-cream-50 placeholder:text-cream-400 focus:outline-none focus:ring-2 focus:ring-amber-400 font-body backdrop-blur-sm"
                aria-label="Email address"
              />
              <Button type="submit" size="md">
                Subscribe
              </Button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
};

/* ─── WhatsApp Widget ─── */
const WhatsAppWidget: React.FC = () => (
  <a
    href={`https://wa.me/${BRAND.whatsapp}?text=Hi%20CrumbleCo!%20I'd%20like%20to%20place%20an%20order.`}
    target="_blank"
    rel="noopener noreferrer"
    className="fixed bottom-6 right-6 z-30 w-14 h-14 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all group"
    aria-label="Chat on WhatsApp"
  >
    <svg viewBox="0 0 24 24" className="w-7 h-7 text-white fill-current" xmlns="http://www.w3.org/2000/svg">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
    <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full animate-pulse" />
  </a>
);

/* ─── Main Homepage ─── */
const HomePage: React.FC = () => {
  return (
    <main id="main-content">
      <HeroSection />
      <CategorySection />
      <FeaturedProducts />
      <MarqueeBanner />
      <AboutSection />
      <TestimonialsSection />
      <NewsletterSection />
      <WhatsAppWidget />
    </main>
  );
};

export default HomePage;
