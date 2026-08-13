import React from 'react';
import { motion } from 'framer-motion';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { HelpCircle, Mail, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const faqs = [
  {
    question: "How do I track my habits?",
    answer: "Navigate to 'My Habits' from the main menu. You can add new habits, mark them complete each day, and add personal notes to reflect on your journey."
  },
  {
    question: "What is the Daily Surrender feature?",
    answer: "Daily Surrender is an emergency support tool for moments of temptation. It provides scripture, prayer prompts, and accountability resources to help you stay strong."
  },
  {
    question: "How do accountability partners work?",
    answer: "You can invite trusted brothers to be your accountability partners. They can see your progress and provide encouragement and support on your journey."
  },
  {
    question: "Can I use the app offline?",
    answer: "Some features are available offline, but for full functionality including habit syncing and accountability features, an internet connection is required."
  },
  {
    question: "How do I reset my password?",
    answer: "Click 'Sign In' and then select 'Forgot Password'. Enter your email address and we'll send you a link to reset your password."
  },
];

const HelpCenter = () => {
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
            <HelpCircle className="w-16 h-16 text-primary mx-auto mb-4" />
            <h1 className="font-heading text-4xl md:text-5xl font-bold uppercase tracking-wide mb-4">
              Help Center
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Find answers to common questions and get the support you need on your journey.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Frequently Asked Questions</CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {faqs.map((faq, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                      <AccordionTrigger className="text-left">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Still Need Help?</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="flex items-start gap-4 p-4 rounded-lg bg-muted/30">
                    <Mail className="w-8 h-8 text-primary flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold mb-1">Email Support</h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        Get help from our team within 24 hours.
                      </p>
                      <Button variant="outline" size="sm">
                        Contact Us
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 rounded-lg bg-muted/30">
                    <MessageCircle className="w-8 h-8 text-primary flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold mb-1">Community</h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        Connect with other brothers on the journey.
                      </p>
                      <Button variant="outline" size="sm">
                        Join Community
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default HelpCenter;
