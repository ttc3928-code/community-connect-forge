import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { VerseCard } from '@/components/VerseCard';
import { DevotionalCard } from '@/components/DevotionalCard';
import { 
  devotionalContent, 
  DevotionalArticle,
  getTodaysDevotional,
  getRotatedLibrary,
  getRandomDevotionals
} from '@/data/devotionalContent';
import { 
  BookOpen, 
  Video, 
  FileText, 
  GraduationCap, 
  X,
  ArrowLeft,
  Flame,
  Shuffle,
  Tag,
  FilterX
} from 'lucide-react';


type Category = 'all' | DevotionalArticle['category'];

const categories: { id: Category; label: string; icon: React.ElementType }[] = [
  { id: 'all', label: 'All', icon: BookOpen },
  { id: 'devotional', label: 'Devotionals', icon: Flame },
  { id: 'article', label: 'Articles', icon: FileText },
  { id: 'video', label: 'Videos', icon: Video },
  { id: 'study', label: 'Bible Studies', icon: GraduationCap },
];

const Devotionals = () => {
  const [activeCategory, setActiveCategory] = useState<Category>('all');
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<DevotionalArticle | null>(null);
  const [library, setLibrary] = useState<DevotionalArticle[]>(() => getRotatedLibrary());
  const todaysDevotional = getTodaysDevotional();

  const filteredContent = library.filter(item => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    const matchesTag = !activeTag || item.tags.includes(activeTag);
    return matchesCategory && matchesTag;
  });

  const handleShuffle = () => {
    setLibrary(getRandomDevotionals(devotionalContent.length));
  };

  const handleRead = (id: string) => {
    const article = devotionalContent.find(item => item.id === id);
    if (article) {
      setSelectedArticle(article);
    }
  };

  const handleTagClick = (tag: string) => {
    setActiveTag(tag);
    setSelectedArticle(null);
  };

  const clearTagFilter = () => {
    setActiveTag(null);
  };


  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <BookOpen className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Devotional Library</span>
            </div>
            <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">
              Grow in <span className="text-gradient">Faith & Freedom</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Curated resources to strengthen your walk, deepen your understanding, and equip you for victory.
            </p>
          </motion.div>

          {/* Verse of the Day */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-12"
          >
            <VerseCard mode="daily" showRefresh={true} />
          </motion.div>

          {/* Today's Featured */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-12"
          >
            <h2 className="font-heading text-2xl font-bold mb-6 flex items-center gap-2">
            <Flame className="w-6 h-6 text-primary" />
              Today's Daily Devotional
            </h2>
            <DevotionalCard devotional={todaysDevotional} onRead={handleRead} onTagClick={handleTagClick} />
          </motion.div>

          {/* Category Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap gap-2 mb-8"
          >
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={activeCategory === category.id ? 'default' : 'outline'}
                size="sm"
                onClick={() => setActiveCategory(category.id)}
                className="gap-2"
              >
                <category.icon className="w-4 h-4" />
                {category.label}
              </Button>
            ))}
            <Button
              variant="ghost"
              size="sm"
              onClick={handleShuffle}
              className="gap-2 ml-auto"
            >
              <Shuffle className="w-4 h-4" />
              Shuffle
            </Button>
          </motion.div>

          {/* Active Tag Filter */}
          {activeTag && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 mb-6"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-sm">
                <Tag className="w-3.5 h-3.5 text-primary" />
                <span className="font-medium text-primary">{activeTag}</span>
                <button
                  onClick={clearTagFilter}
                  className="ml-1 p-0.5 rounded-full hover:bg-primary/20 transition-colors"
                  aria-label="Clear tag filter"
                >
                  <FilterX className="w-3.5 h-3.5 text-primary" />
                </button>
              </div>
              <span className="text-xs text-muted-foreground">
                {filteredContent.length} result{filteredContent.length !== 1 ? 's' : ''}
              </span>
            </motion.div>
          )}

          {/* Content Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredContent.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                <DevotionalCard devotional={item} onRead={handleRead} onTagClick={handleTagClick} />
              </motion.div>
            ))}
          </motion.div>


          {filteredContent.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-3">
                {activeTag ? `No content found for "${activeTag}".` : 'No content found in this category.'}
              </p>
              {activeTag && (
                <Button variant="outline" size="sm" onClick={clearTagFilter} className="gap-2">
                  <FilterX className="w-4 h-4" />
                  Clear tag filter
                </Button>
              )}
            </div>
          )}

        </div>
      </main>

      {/* Article Modal */}
      <AnimatePresence>
        {selectedArticle && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
            onClick={() => setSelectedArticle(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-card border border-border rounded-xl max-w-3xl w-full max-h-[85vh] overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="sticky top-0 bg-card border-b border-border p-4 flex items-center justify-between">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setSelectedArticle(null)}
                  className="gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => setSelectedArticle(null)}
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>

              {/* Modal Content */}
              <div className="p-6 overflow-y-auto max-h-[calc(85vh-80px)]">
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-2 py-1 rounded text-xs font-medium capitalize bg-primary/10 text-primary">
                      {selectedArticle.category}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {selectedArticle.duration}
                    </span>
                  </div>
                  <h2 className="font-heading text-2xl md:text-3xl font-bold mb-2">
                    {selectedArticle.title}
                  </h2>
                  {selectedArticle.scripture && (
                    <p className="text-primary font-medium mb-4">
                      📖 {selectedArticle.scripture}
                    </p>
                  )}
                  <p className="text-muted-foreground text-sm">
                    By {selectedArticle.author} • {new Date(selectedArticle.date).toLocaleDateString()}
                  </p>
                </div>

                <div className="prose prose-invert max-w-none">
                  {selectedArticle.content.split('\n\n').map((paragraph, index) => {
                    if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                      return (
                        <h3 key={index} className="font-heading text-lg font-semibold text-foreground mt-6 mb-3">
                          {paragraph.replace(/\*\*/g, '')}
                        </h3>
                      );
                    }
                    if (paragraph.startsWith('**')) {
                      const parts = paragraph.split('**');
                      return (
                        <p key={index} className="text-foreground/90 mb-4 leading-relaxed">
                          {parts.map((part, i) => 
                            i % 2 === 1 ? <strong key={i} className="text-foreground">{part}</strong> : part
                          )}
                        </p>
                      );
                    }
                    if (paragraph.startsWith('-')) {
                      const items = paragraph.split('\n').filter(l => l.startsWith('-'));
                      return (
                        <ul key={index} className="list-disc list-inside space-y-1 mb-4 text-foreground/90">
                          {items.map((item, i) => (
                            <li key={i}>{item.replace(/^-\s*/, '')}</li>
                          ))}
                        </ul>
                      );
                    }
                    if (paragraph.match(/^\d+\./)) {
                      const items = paragraph.split('\n').filter(l => l.match(/^\d+\./));
                      return (
                        <ol key={index} className="list-decimal list-inside space-y-1 mb-4 text-foreground/90">
                          {items.map((item, i) => (
                            <li key={i}>{item.replace(/^\d+\.\s*/, '')}</li>
                          ))}
                        </ol>
                      );
                    }
                    return (
                      <p key={index} className="text-foreground/90 mb-4 leading-relaxed">
                        {paragraph}
                      </p>
                    );
                  })}
                </div>

                {/* Tags */}
                {selectedArticle.tags.length > 0 && (
                  <div className="mt-8 pt-6 border-t border-border">
                    <p className="text-sm text-muted-foreground mb-2">Topics:</p>
                    <div className="flex flex-wrap gap-2">
                      {selectedArticle.tags.map((tag) => (
                        <button
                          key={tag}
                          onClick={() => handleTagClick(tag)}
                          className="px-3 py-1 rounded-full text-xs bg-secondary text-secondary-foreground hover:bg-primary/20 hover:text-primary transition-colors"
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
};

export default Devotionals;
