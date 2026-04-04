// ═══════════════════════════════════════
// CrumbleCo — 404 Not Found Page
// ═══════════════════════════════════════

import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Home } from 'lucide-react';
import { Button } from '@/components/ui/Button';

const NotFoundPage: React.FC = () => {
  return (
    <main className="min-h-screen flex items-center justify-center bg-cream-50 px-4" id="main-content">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-md"
      >
        {/* Big 404 */}
        <motion.div
          animate={{ rotate: [0, -5, 5, -5, 0] }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
          className="text-8xl sm:text-9xl font-display font-bold text-amber-400/30 mb-4"
        >
          404
        </motion.div>

        <div className="text-6xl mb-6">🧁</div>

        <h1 className="font-display text-3xl font-bold text-espresso-500 mb-3">
          Oops! This page got eaten.
        </h1>
        <p className="text-espresso-200 mb-8 leading-relaxed">
          Looks like someone had a sweet tooth! The page you're looking for
          doesn't exist or has been moved.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/">
            <Button icon={<Home size={16} />}>
              Go Home
            </Button>
          </Link>
          <Link to="/products">
            <Button variant="outline" icon={<ArrowLeft size={16} />}>
              Browse Menu
            </Button>
          </Link>
        </div>
      </motion.div>
    </main>
  );
};

export default NotFoundPage;
