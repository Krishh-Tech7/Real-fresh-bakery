// ═══════════════════════════════════════
// CrumbleCo — Footer Component
// ═══════════════════════════════════════

import React from 'react';
import { Link } from 'react-router-dom';
import { Camera, Globe, MessageCircle, Mail, Phone, MapPin } from 'lucide-react';
import { BRAND, ROUTES } from '@/constants';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-espresso-500 text-cream-100 relative overflow-hidden">
      {/* Decorative top wave */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 via-rose-300 to-amber-400" />

      <div className="container-app py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <span className="text-3xl">🥐</span>
              <span className="font-display text-2xl font-bold text-cream-50">{BRAND.name}</span>
            </Link>
            <p className="text-cream-300 text-sm leading-relaxed font-body">
              {BRAND.description}
            </p>
            <p className="font-accent text-amber-400 text-lg">{BRAND.tagline}</p>
            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              <a href={BRAND.instagram} target="_blank" rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-espresso-400 hover:bg-amber-400 hover:text-espresso-500 flex items-center justify-center transition-all duration-200"
                aria-label="Instagram"
              >
                <Camera size={18} />
              </a>
              <a href={BRAND.facebook} target="_blank" rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-espresso-400 hover:bg-amber-400 hover:text-espresso-500 flex items-center justify-center transition-all duration-200"
                aria-label="Facebook"
              >
                <Globe size={18} />
              </a>
              <a href={`https://wa.me/${BRAND.whatsapp}`} target="_blank" rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-espresso-400 hover:bg-green-500 hover:text-white flex items-center justify-center transition-all duration-200"
                aria-label="WhatsApp"
              >
                <MessageCircle size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display font-bold text-lg text-cream-50 mb-4">Quick Links</h3>
            <ul className="space-y-3">
              {[
                { label: 'Home', path: ROUTES.HOME },
                { label: 'Our Menu', path: ROUTES.PRODUCTS },
                { label: 'Cake Customizer', path: ROUTES.CUSTOMIZE },
                { label: 'My Account', path: ROUTES.ACCOUNT },
                { label: 'Track Order', path: ROUTES.ACCOUNT_ORDERS },
              ].map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="text-cream-300 hover:text-amber-400 transition-colors text-sm font-body">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-display font-bold text-lg text-cream-50 mb-4">Categories</h3>
            <ul className="space-y-3">
              {['Artisan Breads', 'Cakes', 'Pastries', 'Cookies', 'Seasonal Specials', 'Gluten-Free'].map((cat) => (
                <li key={cat}>
                  <Link to={`/products?category=${cat.toLowerCase().replace(/\s+/g, '-')}`}
                    className="text-cream-300 hover:text-amber-400 transition-colors text-sm font-body"
                  >
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-display font-bold text-lg text-cream-50 mb-4">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-amber-400 mt-0.5 shrink-0" />
                <span className="text-cream-300 text-sm">42 Baker Street, Koramangala, Bangalore 560034</span>
              </li>
              <li>
                <a href={`tel:${BRAND.phone}`} className="flex items-center gap-3 text-cream-300 hover:text-amber-400 transition-colors text-sm">
                  <Phone size={18} className="text-amber-400 shrink-0" />
                  {BRAND.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${BRAND.email}`} className="flex items-center gap-3 text-cream-300 hover:text-amber-400 transition-colors text-sm">
                  <Mail size={18} className="text-amber-400 shrink-0" />
                  {BRAND.email}
                </a>
              </li>
            </ul>
            {/* Payment Icons */}
            <div className="mt-6">
              <p className="text-xs text-espresso-200 mb-2 uppercase tracking-wider">We Accept</p>
              <div className="flex items-center gap-3 text-cream-300">
                <span className="text-xs bg-espresso-400 px-2 py-1 rounded">VISA</span>
                <span className="text-xs bg-espresso-400 px-2 py-1 rounded">MC</span>
                <span className="text-xs bg-espresso-400 px-2 py-1 rounded">UPI</span>
                <span className="text-xs bg-espresso-400 px-2 py-1 rounded">RPay</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-espresso-400 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-cream-400 text-sm">© {new Date().getFullYear()} {BRAND.name}. All rights reserved.</p>
          <div className="flex items-center gap-6 text-sm">
            <a href="#" className="text-cream-400 hover:text-amber-400 transition-colors">Privacy Policy</a>
            <a href="#" className="text-cream-400 hover:text-amber-400 transition-colors">Terms of Service</a>
            <a href="#" className="text-cream-400 hover:text-amber-400 transition-colors">Refund Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
