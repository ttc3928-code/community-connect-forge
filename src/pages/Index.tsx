import React, { useRef } from 'react';
import { Link, useNavigate, Navigate } from '@/lib/router-compat';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ShieldIcon } from '@/components/icons/ShieldIcon';
import { 
  Heart, 
  Target, 
  Users, 
  BookOpen, 
  Lock, 
  CheckCircle2, 
  ArrowRight,
  Flame,
  ChevronDown
} from 'lucide-react';
import heroBg from '@/assets/hero-bg.jpg';
import { useAuth } from '@/contexts/AuthContext';

const Index = () => {
  const featuresRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { user, loading } = useAuth();

  const scrollToFeatures = () => {
    featuresRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToSignup = () => {
    ctaRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const features = [
    {
      icon: Heart,
      title: 'Daily Prayer',
      description: 'Start each day grounded in Scripture with guided prayers for strength, purity, and peace.',
      locked: false,
      path: '/surrender',
    },
    {
      icon: Target,
      title: 'Habit Tracker',
      description: 'Track your victories and setbacks. Build streaks, identify triggers, and see your growth.',
      locked: false,
      path: '/habits',
    },
    {
      icon: Users,
      title: 'Accountability Circle',
      description: 'Connect with trusted brothers who will walk with you, pray for you, and hold you accountable.',
      locked: true,
      path: '/my-circle',
    },
    {
      icon: BookOpen,
      title: 'Content Library',
      description: 'Access devotionals, video teachings, and resources from pastors and counselors.',
      locked: false,
      path: '/dashboard',
    },
  ];

  const testimonials = [
    {
      quote: "I was trapped for 15 years. This app and my accountability partner helped me find freedom I never thought possible.",
      author: "Michael, 38",
    },
    {
      quote: "The daily prayers and habit tracking kept me focused when temptation was strongest.",
      author: "David, 42",
    },
    {
      quote: "Iron Sharpens Iron gave me the brotherhood I was missing. We're fighting together.",
      author: "James, 29",
    },
  ];

  const handleFeatureClick = (feature: typeof features[0]) => {
    navigate(feature.path);
  };

  // Signed-in users go straight to their daily routine
  if (!loading && user) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-16">
        {/* Background Image */}
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url(${heroBg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center top',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="flex justify-center mb-6"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
                <Flame className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-primary">Proverbs 27:17</span>
              </div>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="font-heading text-5xl md:text-7xl font-bold mb-6"
            >
              Iron <span className="text-gradient">Sharpens</span> Iron
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-xl md:text-2xl text-muted-foreground mb-4"
            >
              A Brotherhood for Men Seeking Freedom in Christ
            </motion.p>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-lg text-muted-foreground/80 mb-10 max-w-2xl mx-auto"
            >
              Break free from porn, lust, and destructive habits. You don't have to fight alone. 
              Join thousands of men finding victory through prayer, accountability, and God's grace.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button 
                variant="hero" 
                size="xl"
                onClick={scrollToSignup}
              >
                Join the Waitlist
                <ArrowRight className="w-5 h-5" />
              </Button>
              <Button 
                variant="heroOutline" 
                size="xl"
                onClick={scrollToFeatures}
              >
                Learn More
                <ChevronDown className="w-5 h-5" />
              </Button>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap items-center justify-center gap-6 md:gap-8 mt-12 text-sm text-muted-foreground"
            >
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary" />
                <span>100% Confidential</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary" />
                <span>Free to Start</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary" />
                <span>Christ-Centered</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section ref={featuresRef} className="py-24 bg-background relative scroll-mt-16">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/30 to-transparent" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4">
              Your Path to <span className="text-primary">Freedom</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Four pillars designed to support your journey toward lasting change and spiritual growth.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card 
                  variant={feature.locked ? 'locked' : 'feature'}
                  className="relative group cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-lg h-full"
                  onClick={() => handleFeatureClick(feature)}
                >
                  {feature.locked && (
                    <div className="absolute top-4 right-4 flex items-center gap-1 text-xs text-muted-foreground">
                      <Lock className="w-3 h-3" />
                      <span>Premium</span>
                    </div>
                  )}
                  <CardHeader>
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${feature.locked ? 'bg-muted' : 'bg-primary/10 group-hover:bg-primary/20'} transition-colors`}>
                      <feature.icon className={`w-6 h-6 ${feature.locked ? 'text-muted-foreground' : 'text-primary'}`} />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-sm">{feature.description}</CardDescription>
                    <div className="mt-4 flex items-center text-primary text-sm font-medium group-hover:gap-2 transition-all">
                      <span>Explore</span>
                      <ArrowRight className="w-4 h-4 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 hero-bg">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {[
              { value: '10K+', label: 'Men in the Brotherhood' },
              { value: '85%', label: 'Report Significant Progress' },
              { value: '50K+', label: 'Prayers Offered' },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="space-y-2 group cursor-default"
              >
                <div className="font-heading text-5xl font-bold text-primary transition-all duration-300 group-hover:scale-110">
                  {stat.value}
                </div>
                <p className="text-muted-foreground">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-card">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4">
              Stories of <span className="text-primary">Victory</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              Real men finding real freedom through faith and accountability.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card variant="gradient" className="relative hover:scale-[1.02] transition-transform duration-300 h-full">
                  <CardContent className="pt-8">
                    <div className="absolute top-4 left-6 text-primary/20">
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M11.192 15.757c0-.88-.23-1.618-.69-2.217-.326-.412-.768-.683-1.327-.812-.55-.128-1.07-.137-1.54-.028-.16-.95.1-1.956.76-3.022.66-1.065 1.515-1.867 2.558-2.403L9.373 5c-.8.396-1.56.898-2.26 1.505-.71.607-1.34 1.305-1.9 2.094s-.98 1.68-1.25 2.69-.346 2.04-.217 3.1c.168 1.4.62 2.52 1.356 3.35.735.84 1.652 1.26 2.748 1.26.965 0 1.766-.29 2.4-.878.628-.576.94-1.365.94-2.368l.002.003zm9.124 0c0-.88-.23-1.618-.69-2.217-.326-.42-.77-.692-1.327-.817-.56-.124-1.074-.13-1.54-.022-.16-.94.09-1.95.75-3.02.66-1.06 1.514-1.86 2.557-2.4L18.49 5c-.8.396-1.555.898-2.26 1.505-.708.607-1.34 1.305-1.894 2.094-.556.79-.97 1.68-1.24 2.69-.273 1-.345 2.04-.217 3.1.165 1.4.615 2.52 1.35 3.35.732.833 1.646 1.25 2.742 1.25.967 0 1.768-.29 2.402-.876.627-.576.942-1.365.942-2.368v.01z" />
                      </svg>
                    </div>
                    <p className="text-foreground/90 mb-6 italic">"{testimonial.quote}"</p>
                    <p className="text-sm text-muted-foreground font-medium">— {testimonial.author}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section ref={ctaRef} className="py-24 relative overflow-hidden scroll-mt-16">
        <div className="absolute inset-0 hero-bg" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5" />
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <ShieldIcon className="w-16 h-16 text-primary mx-auto mb-6" />
            <h2 className="font-heading text-4xl md:text-5xl font-bold mb-6">
              Ready to Fight for Your Freedom?
            </h2>
            <p className="text-xl text-muted-foreground mb-10">
              The battle is real, but you don't have to face it alone. 
              Join a brotherhood of men committed to walking in the light.
            </p>
            <Link to="/auth?mode=signup">
              <Button variant="hero" size="xl" className="animate-pulse-glow">
                Start Your Journey Today
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
