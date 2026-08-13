import React from 'react';
import { motion } from 'framer-motion';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Shield } from 'lucide-react';

const PrivacyPolicy = () => {
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
            <Shield className="w-16 h-16 text-primary mx-auto mb-4" />
            <h1 className="font-heading text-4xl md:text-5xl font-bold uppercase tracking-wide mb-4">
              Privacy Policy
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
                <h2 className="text-xl font-semibold text-foreground mb-4">Your Privacy Matters</h2>
                <p className="text-muted-foreground mb-6">
                  At Iron Sharpens Iron, we understand that your journey toward freedom is deeply personal. 
                  We are committed to protecting your privacy and ensuring that your data is handled with 
                  the utmost care and respect.
                </p>

                <h3 className="text-lg font-semibold text-foreground mb-3">Information We Collect</h3>
                <ul className="text-muted-foreground mb-6 space-y-2 list-disc list-inside">
                  <li>Account information (email, display name)</li>
                  <li>Habit tracking data and completion records</li>
                  <li>Journal entries and personal reflections</li>
                  <li>Accountability partner connections</li>
                </ul>

                <h3 className="text-lg font-semibold text-foreground mb-3">How We Use Your Information</h3>
                <ul className="text-muted-foreground mb-6 space-y-2 list-disc list-inside">
                  <li>To provide and improve our services</li>
                  <li>To track your progress and provide insights</li>
                  <li>To facilitate accountability partnerships</li>
                  <li>To send important notifications and reminders</li>
                </ul>

                <h3 className="text-lg font-semibold text-foreground mb-3">Data Security</h3>
                <p className="text-muted-foreground mb-6">
                  We use industry-standard encryption and security measures to protect your personal data. 
                  Your habit data, journal entries, and personal reflections are encrypted and stored securely. 
                  Only you and your chosen accountability partners can access your information.
                </p>

                <h3 className="text-lg font-semibold text-foreground mb-3">Your Rights</h3>
                <ul className="text-muted-foreground mb-6 space-y-2 list-disc list-inside">
                  <li>Access and download your data at any time</li>
                  <li>Request deletion of your account and all associated data</li>
                  <li>Opt out of non-essential communications</li>
                  <li>Control who can see your progress and journey</li>
                </ul>

                <h3 className="text-lg font-semibold text-foreground mb-3">Contact Us</h3>
                <p className="text-muted-foreground">
                  If you have any questions about this Privacy Policy or how we handle your data, 
                  please reach out through our Help Center.
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

export default PrivacyPolicy;
