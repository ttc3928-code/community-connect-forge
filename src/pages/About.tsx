import React from 'react';
import { motion } from 'framer-motion';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShieldIcon } from '@/components/icons/ShieldIcon';
import { Heart, Users, Target, ArrowRight, Cross } from 'lucide-react';
import { Link } from '@/lib/router-compat';

const About = () => {
  const pillars = [
    {
      icon: Heart,
      title: 'Faith-Centered',
      description: 'Every tool, prayer, and resource is grounded in Scripture and designed to draw you closer to Christ.',
    },
    {
      icon: Users,
      title: 'Brotherhood',
      description: 'True accountability happens in relationship. We connect you with men who understand your struggle.',
    },
    {
      icon: Target,
      title: 'Proven Methods',
      description: 'Habit tracking, daily prayer, and structured accountability that\'s helped thousands find freedom.',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Hero */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <ShieldIcon className="w-16 h-16 text-primary mx-auto mb-6" />
            <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">
              About <span className="text-gradient">Iron Sharpens Iron</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              We believe that men were never meant to fight alone. Rooted in the truth of Proverbs 27:17
              —"As iron sharpens iron, so one person sharpens another"—we exist to help Christian men 
              find lasting freedom from pornography, lust, and destructive habits through the power of 
              brotherhood and God's grace.
            </p>
          </motion.div>

          {/* Pillars */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20"
          >
            {pillars.map((pillar, index) => (
              <Card key={pillar.title} variant="feature" className="text-center">
                <CardContent className="pt-8 pb-6">
                  <div className="w-14 h-14 mx-auto mb-4 rounded-lg bg-primary/10 flex items-center justify-center">
                    <pillar.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="font-heading text-xl font-semibold mb-2">{pillar.title}</h3>
                  <p className="text-muted-foreground text-sm">{pillar.description}</p>
                </CardContent>
              </Card>
            ))}
          </motion.div>

          {/* Our Story */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-3xl mx-auto mb-20"
          >
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-center mb-8">
              Our <span className="text-primary">Story</span>
            </h2>
            
            <div className="space-y-6 text-muted-foreground">
              <p>
                Iron Sharpens Iron was born out of personal struggle. Our founders know firsthand 
                the shame, isolation, and hopelessness that comes with addiction. They also know 
                the transformative power of confession, community, and God's relentless grace.
              </p>
              
              <p>
                What started as a small group of men meeting weekly for prayer and accountability 
                has grown into a digital platform serving thousands of warriors across the globe—men 
                who refuse to let their struggles define them and who choose daily to walk in the light.
              </p>
              
              <p>
                This isn't about perfection. It's about progress. It's about showing up, being honest, 
                and letting brothers lift you up when you fall. It's about the slow, steady work of 
                sanctification—one day at a time, one prayer at a time, one victory at a time.
              </p>
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-center py-16 hero-bg rounded-2xl"
          >
            <Cross className="w-8 h-8 text-primary mx-auto mb-4" />
            <p className="text-sm text-primary font-medium mb-4">JOIN THE FIGHT</p>
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-8">
              Your Freedom Story Starts Today
            </h2>
            <Link to="/auth?mode=signup">
              <Button variant="hero" size="xl">
                Join the Brotherhood
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

export default About;
