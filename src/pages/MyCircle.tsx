import React from 'react';
import { Link } from '@/lib/router-compat';
import { motion } from 'framer-motion';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Lock, ArrowRight, Users, Loader2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const MyCircle = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  // Show authenticated view
  if (user) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        
        <main className="pt-24 pb-16">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-2xl mx-auto text-center"
            >
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
                <Users className="w-10 h-10 text-primary" />
              </div>
              
              <h1 className="font-heading text-3xl md:text-4xl font-bold mb-4">
                My Circle
              </h1>
              
              <p className="text-muted-foreground text-lg mb-8">
                This feature is coming soon! You'll be able to connect with accountability partners and join prayer circles.
              </p>

              <Card variant="glow" className="text-left">
                <CardContent className="py-6">
                  <h3 className="font-heading font-semibold mb-4">Coming Features:</h3>
                  <ul className="space-y-3 text-muted-foreground">
                    <li className="flex items-center gap-3">
                      <span className="text-primary">✓</span>
                      Invite accountability partners via unique codes
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="text-primary">✓</span>
                      Share prayer requests within your circle
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="text-primary">✓</span>
                      See each other's streaks and progress
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="text-primary">✓</span>
                      Send encouragement messages
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </main>

        <Footer />
      </div>
    );
  }

  // Show sign-in prompt
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16 flex items-center justify-center min-h-[60vh]">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-md mx-auto text-center"
          >
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-muted/50 flex items-center justify-center">
              <Lock className="w-10 h-10 text-muted-foreground" />
            </div>
            
            <h1 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              Join the Brotherhood
            </h1>
            
            <p className="text-muted-foreground text-lg mb-8">
              Sign in to access My Circle and connect with brothers in Christ.
            </p>
            
            <Link to="/auth?mode=signin">
              <Button variant="hero" size="xl">
                Sign In
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default MyCircle;
