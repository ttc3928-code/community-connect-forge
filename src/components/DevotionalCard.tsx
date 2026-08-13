import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Video, FileText, GraduationCap, Clock, ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DevotionalArticle } from '@/data/devotionalContent';

interface DevotionalCardProps {
  devotional: DevotionalArticle;
  onRead?: (id: string) => void;
  onTagClick?: (tag: string) => void;
  compact?: boolean;
}



const categoryIcons = {
  devotional: BookOpen,
  article: FileText,
  video: Video,
  study: GraduationCap,
};

const categoryColors = {
  devotional: 'bg-primary/10 text-primary',
  article: 'bg-blue-500/10 text-blue-400',
  video: 'bg-purple-500/10 text-purple-400',
  study: 'bg-green-500/10 text-green-400',
};

export const DevotionalCard: React.FC<DevotionalCardProps> = ({ 
  devotional, 
  onRead,
  onTagClick,
  compact = false,
}) => {
  const Icon = categoryIcons[devotional.category];
  const colorClass = categoryColors[devotional.category];

  if (compact) {
    return (
      <div 
        className="flex items-center gap-3 p-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors cursor-pointer group"
        onClick={() => onRead?.(devotional.id)}
      >
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${colorClass}`}>
          <Icon className="w-5 h-5" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="font-medium text-sm truncate group-hover:text-primary transition-colors">
            {devotional.title}
          </p>
          <p className="text-xs text-muted-foreground flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {devotional.duration}
          </p>
        </div>
        <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors opacity-0 group-hover:opacity-100" />
      </div>
    );
  }



  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="h-full hover:border-primary/50 transition-colors cursor-pointer group">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${colorClass}`}>
              <Icon className="w-6 h-6" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2">
                <span className={`px-2 py-0.5 rounded text-xs font-medium capitalize ${colorClass}`}>
                  {devotional.category}
                </span>
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {devotional.duration}
                </span>
              </div>
              <h3 className="font-heading font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                {devotional.title}
              </h3>
              <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                {devotional.excerpt}
              </p>
              {devotional.scripture && (
                <p className="text-xs text-primary mb-4">📖 {devotional.scripture}</p>
              )}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {devotional.tags.map((tag) => (
                  <span
                    key={tag}
                    role="button"
                    tabIndex={0}
                    onClick={(e) => {
                      e.stopPropagation();
                      onTagClick?.(tag);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.stopPropagation();
                        onTagClick?.(tag);
                      }
                    }}
                    className="px-2 py-0.5 rounded-full text-xs bg-secondary text-secondary-foreground hover:bg-primary/20 hover:text-primary transition-colors cursor-pointer"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                onClick={() => onRead?.(devotional.id)}
              >
                {devotional.category === 'video' ? 'Watch Now' : 'Read More'}
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>

            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
