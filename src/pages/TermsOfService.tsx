import React from 'react';
import { motion } from 'framer-motion';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollText } from 'lucide-react';

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <ScrollText className="w-16 h-16 text-primary mx-auto mb-4" />
            <h1 className="font-heading text-4xl md:text-5xl font-bold uppercase tracking-wide mb-4">
              Terms of Service
            </h1>
            <p className="text-muted-foreground">
              Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card>
              <CardContent className="py-8 prose prose-invert max-w-none">
                <h2 className="text-xl font-semibold text-foreground mb-4">Welcome to Iron Sharpens Iron</h2>
                <p className="text-muted-foreground mb-6">
                  By using our platform, you agree to these Terms of Service. Please read them carefully 
                  as they govern your use of our services.
                </p>

                <h3 className="text-lg font-semibold text-foreground mb-3">1. Acceptance of Terms</h3>
                <p className="text-muted-foreground mb-6">
                  By accessing or using Iron Sharpens Iron, you agree to be bound by these Terms. 
                  If you disagree with any part of the terms, you may not access the service.
                </p>

                <h3 className="text-lg font-semibold text-foreground mb-3">2. Use of Service</h3>
                <p className="text-muted-foreground mb-4">
                  Iron Sharpens Iron is designed to help men build holy habits and find freedom from destructive patterns. 
                  You agree to:
                </p>
                <ul className="text-muted-foreground mb-6 space-y-2 list-disc list-inside">
                  <li>Use the service for its intended purpose of personal growth and accountability</li>
                  <li>Provide accurate information when creating your account</li>
                  <li>Maintain the confidentiality of your account credentials</li>
                  <li>Respect other users and maintain appropriate boundaries</li>
                </ul>

                <h3 className="text-lg font-semibold text-foreground mb-3">3. User Content</h3>
                <p className="text-muted-foreground mb-6">
                  You retain ownership of content you create (journal entries, notes, etc.). 
                  By sharing content with accountability partners, you grant them permission to view 
                  that content within the platform.
                </p>

                <h3 className="text-lg font-semibold text-foreground mb-3">4. Community Guidelines</h3>
                <ul className="text-muted-foreground mb-6 space-y-2 list-disc list-inside">
                  <li>Treat all users with respect and dignity</li>
                  <li>Maintain confidentiality of information shared by accountability partners</li>
                  <li>Do not share inappropriate or harmful content</li>
                  <li>Report any concerning behavior to our support team</li>
                </ul>

                <h3 className="text-lg font-semibold text-foreground mb-3">5. Disclaimer</h3>
                <p className="text-muted-foreground mb-6">
                  Iron Sharpens Iron is a tool to support your journey but is not a substitute for 
                  professional counseling, therapy, or medical treatment. If you are struggling with 
                  addiction or mental health issues, please seek professional help.
                </p>

                <h3 className="text-lg font-semibold text-foreground mb-3">6. Changes to Terms</h3>
                <p className="text-muted-foreground">
                  We may update these Terms from time to time. We will notify you of any changes by 
                  posting the new Terms on this page and updating the "Last updated" date.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default TermsOfService;
