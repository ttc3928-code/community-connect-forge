import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, RefreshCw, Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useBibleVerse } from '@/hooks/useBibleVerse';

interface VerseCardProps {
  mode?: 'daily' | 'random';
  showRefresh?: boolean;
  compact?: boolean;
}

export const VerseCard: React.FC<VerseCardProps> = ({ 
  mode = 'daily', 
  showRefresh = true,
  compact = false 
}) => {
  const { verse, isLoading, refreshVerse } = useBibleVerse(mode);

  if (compact) {
    return (
      <div className="bg-gradient-to-br from-secondary/50 to-secondary/30 rounded-lg p-4 sm:p-6 border-l-4 border-primary">
        {isLoading ? (
          <div className="flex items-center justify-center py-4">
            <Loader2 className="w-6 h-6 text-primary animate-spin" />
          </div>
        ) : (
          <>
            <p className="text-foreground text-base sm:text-lg italic leading-relaxed">
              {verse?.text}
            </p>
            <div className="flex items-center justify-between mt-4">
              <p className="text-primary font-medium">— {verse?.reference}</p>
              {showRefresh && (
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={refreshVerse}
                  className="h-8 w-8"
                >
                  <RefreshCw className="w-4 h-4" />
                </Button>
              )}
            </div>
          </>
        )}
      </div>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <BookOpen className="w-5 h-5 text-primary" />
            <CardTitle>Verse of the Day</CardTitle>
          </div>
          {showRefresh && (
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={refreshVerse}
              disabled={isLoading}
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="w-8 h-8 text-primary animate-spin" />
          </div>
        ) : (
          <motion.div
            key={verse?.reference}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-secondary/50 to-secondary/30 rounded-lg p-6 border-l-4 border-primary"
          >
            <p className="text-foreground text-lg italic leading-relaxed">
              {verse?.text}
            </p>
            <p className="text-primary font-medium mt-4">— {verse?.reference}</p>
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
};
