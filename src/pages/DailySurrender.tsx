import React, { useState, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from '@/lib/router-compat';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { VerseCard } from '@/components/VerseCard';
import { 
  Flame,
  Play,
  Pause,
  Square,
  Heart,
  CheckCircle,
  Frown,
  Meh,
  Smile,
  PartyPopper,
  Check,
  Shuffle

} from 'lucide-react';
import { toast } from 'sonner';
import { useCreateJournalEntry } from '@/hooks/useJournalEntries';
import { useAuth } from '@/contexts/AuthContext';
import { getDailyPrayers, getRandomPrayers } from '@/data/prayers';

const DailySurrender = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [journalNote, setJournalNote] = useState('');
  const [isSaved, setIsSaved] = useState(false);
  const [prayerStarted, setPrayerStarted] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  
  const createJournalEntry = useCreateJournalEntry();

  const handleSaveToJournal = async () => {
    if (!user) {
      toast.error('Please sign in to save journal entries');
      return;
    }

    if (!selectedMood && !journalNote.trim()) {
      toast.error('Please select a mood or write a note');
      return;
    }

    const moodLabel = moods.find(m => m.id === selectedMood)?.label || '';
    const title = `Daily Surrender - ${moodLabel || 'Reflection'}`;
    const content = journalNote.trim() || `Mood: ${moodLabel}`;

    try {
      await createJournalEntry.mutateAsync({
        title,
        content,
        category: 'surrender'
      });
      setIsSaved(true);
      toast.success('Saved to journal!');
    } catch (error) {
      toast.error('Failed to save journal entry');
    }
  };

  const handleListenToPrayer = useCallback(() => {
    if (!('speechSynthesis' in window)) {
      toast.error('Text-to-speech is not supported in your browser');
      return;
    }

    if (isSpeaking && !isPaused) {
      // Pause
      window.speechSynthesis.pause();
      setIsPaused(true);
      return;
    }

    if (isPaused) {
      // Resume
      window.speechSynthesis.resume();
      setIsPaused(false);
      return;
    }

    // Start new speech
    window.speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(prayerText);
    utterance.rate = 0.9;
    utterance.pitch = 1;
    
    // Try to find a good voice
    const voices = window.speechSynthesis.getVoices();
    const preferredVoice = voices.find(v => 
      v.name.includes('Google') || v.name.includes('Natural') || v.lang.startsWith('en')
    );
    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }

    utterance.onstart = () => {
      setIsSpeaking(true);
      setIsPaused(false);
    };

    utterance.onend = () => {
      setIsSpeaking(false);
      setIsPaused(false);
    };

    utterance.onerror = () => {
      setIsSpeaking(false);
      setIsPaused(false);
      toast.error('Error playing prayer audio');
    };

    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  }, [isSpeaking, isPaused]);

  const handleStopPrayer = useCallback(() => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
    setIsPaused(false);
  }, []);

  const [prayers, setPrayers] = useState(() => getDailyPrayers(3));
  const [selectedPrayer, setSelectedPrayer] = useState(prayers[0]);

  const handleShufflePrayers = useCallback(() => {
    if (window.speechSynthesis) window.speechSynthesis.cancel();
    setIsSpeaking(false);
    setIsPaused(false);
    const next = getRandomPrayers(3, prayers.map((p) => p.id));
    setPrayers(next);
    setSelectedPrayer(next[0]);
  }, [prayers]);

  const prayerText = selectedPrayer.text;


  const scriptureBadges = [
    { verse: 'Be strong and courageous', ref: 'Joshua 1:9', streak: 3 },
    { verse: 'He gives strength to the weary', ref: 'Isaiah 40:29', streak: 7 },
    { verse: 'More than conquerors', ref: 'Romans 8:37', streak: 14 },
    { verse: 'New creation in Christ', ref: '2 Cor 5:17', streak: 21 },
    { verse: 'Run and not grow weary', ref: 'Isaiah 40:31', streak: 30 },
  ];

  const moods = [
    { id: 'anxious', label: 'Anxious', icon: Frown, color: 'text-red-400' },
    { id: 'struggling', label: 'Struggling', icon: Meh, color: 'text-orange-400' },
    { id: 'neutral', label: 'Neutral', icon: Meh, color: 'text-yellow-400' },
    { id: 'hopeful', label: 'Hopeful', icon: Smile, color: 'text-green-400' },
    { id: 'peaceful', label: 'Peaceful', icon: PartyPopper, color: 'text-primary' },
  ];

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
              <Flame className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Daily Surrender</span>
            </div>
            <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">
              Surrender Today <span className="text-gradient">to God</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Start your day grounded in prayer. Give your battles to the One who fights for you.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Verse of the Day */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <VerseCard mode="daily" showRefresh={true} />
              </motion.div>

              {/* Guided Prayer */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Card variant="glow">
                  <CardHeader>
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <Flame className="w-5 h-5 text-primary" />
                        <div>
                          <CardTitle>{selectedPrayer.duration} Guided Prayer</CardTitle>
                          <p className="text-sm text-muted-foreground">{selectedPrayer.title} • {selectedPrayer.ref}</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" onClick={handleShufflePrayers}>
                        <Shuffle className="w-4 h-4 mr-2" />
                        Shuffle
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                      {prayers.map((prayer) => (
                        <button 
                          key={prayer.id}
                          onClick={() => {
                            if (isSpeaking) {
                              handleStopPrayer();
                            }
                            setSelectedPrayer(prayer);
                          }}
                          className={`px-3 py-1 rounded-full text-sm transition-colors ${
                            selectedPrayer.id === prayer.id 
                              ? 'bg-primary text-primary-foreground' 
                              : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                          }`}
                        >
                          {prayer.ref}
                        </button>
                      ))}
                    </div>


                    <div className="bg-secondary/30 rounded-lg p-4 border-l-2 border-primary/50 max-h-64 overflow-y-auto">
                      <p className="text-foreground/90 whitespace-pre-line leading-relaxed">
                        {prayerText}
                      </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3">
                      <Button 
                        variant="outline" 
                        className="flex-1"
                        onClick={handleListenToPrayer}
                      >
                        {isSpeaking && !isPaused ? (
                          <Pause className="w-4 h-4 mr-2" />
                        ) : (
                          <Play className="w-4 h-4 mr-2" />
                        )}
                        {isSpeaking && !isPaused ? 'Pause' : isPaused ? 'Resume' : 'Listen to Prayer'}
                        <span className="ml-2 text-xs text-muted-foreground">
                          {isSpeaking ? (isPaused ? 'Paused' : 'Playing...') : `${selectedPrayer.duration} • Read aloud`}
                        </span>
                      </Button>
                      {isSpeaking && (
                        <Button 
                          variant="outline" 
                          size="icon"
                          onClick={handleStopPrayer}
                        >
                          <Square className="w-4 h-4" />
                        </Button>
                      )}
                    </div>

                    <Button 
                      variant={prayerStarted ? 'success' : 'hero'}
                      className="w-full transition-all"
                      onClick={() => {
                        if (!prayerStarted) {
                          setPrayerStarted(true);
                          toast.success('Prayer complete. Go win the day.');
                        }
                      }}
                    >
                      {prayerStarted ? (
                        <motion.span
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          className="flex items-center gap-2"
                        >
                          <CheckCircle className="w-5 h-5" />
                          Prayer Complete!
                        </motion.span>
                      ) : (
                        <span className="flex items-center gap-2">
                          <Heart className="w-5 h-5" />
                          I Prayed – Start My Day
                        </span>
                      )}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Mood Check */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <span className="text-xl">✏️</span>
                      <CardTitle>How are you feeling?</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">Select your current state:</p>
                    <div className="grid grid-cols-5 gap-2">
                    {moods.map((mood) => (
                        <button
                          key={mood.id}
                          onClick={() => {
                            setSelectedMood(mood.id);
                            setIsSaved(false);
                          }}
                          disabled={isSaved}
                          className={`flex flex-col items-center gap-2 p-3 rounded-lg border transition-all ${
                            selectedMood === mood.id 
                              ? 'bg-primary/10 border-primary' 
                              : 'bg-secondary/30 border-border hover:bg-secondary/50'
                          } ${isSaved ? 'opacity-60 cursor-not-allowed' : ''}`}
                        >
                          <mood.icon className={`w-6 h-6 ${selectedMood === mood.id ? 'text-primary' : mood.color}`} />
                          <span className="text-xs">{mood.label}</span>
                        </button>
                      ))}
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm text-muted-foreground">
                        Quick journal note <span className="text-muted-foreground/60">(optional)</span>:
                      </label>
                      <textarea 
                        className="w-full h-24 px-4 py-3 rounded-lg bg-input border border-border text-foreground placeholder:text-muted-foreground resize-none focus:outline-none focus:ring-2 focus:ring-primary/50"
                        placeholder="What's on your heart today? Any struggles or victories to note..."
                        value={journalNote}
                        onChange={(e) => {
                          setJournalNote(e.target.value);
                          setIsSaved(false);
                        }}
                        disabled={isSaved}
                      />
                    </div>

                    <Button 
                      variant={isSaved ? "default" : "outline"} 
                      className="w-full"
                      onClick={handleSaveToJournal}
                      disabled={createJournalEntry.isPending || isSaved}
                    >
                      {isSaved ? (
                        <>
                          <Check className="w-4 h-4 mr-2" />
                          Saved!
                        </>
                      ) : createJournalEntry.isPending ? (
                        'Saving...'
                      ) : (
                        'Save to Journal'
                      )}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Streak Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Card>
                  <CardContent className="pt-6 text-center">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                      <Flame className="w-8 h-8 text-primary animate-flame" />
                    </div>
                    <div className="font-heading text-5xl font-bold text-primary mb-1">0</div>
                    <p className="text-muted-foreground mb-6">Day Streak</p>

                    <div className="space-y-3">
                      <p className="text-sm font-medium">This Week</p>
                      <div className="grid grid-cols-7 gap-2">
                        {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, index) => (
                          <div 
                            key={index}
                            className="week-day future"
                          >
                            <span className="text-xs">{day}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <Button
                      variant="outline"
                      className="w-full mt-6"
                      onClick={() => navigate(user ? '/habits' : '/auth')}
                    >
                      Start your journey today!
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Scripture Badges */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <span className="text-xl">🏆</span>
                      <CardTitle>Scripture Badges</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {scriptureBadges.map((badge, index) => (
                      <div 
                        key={index}
                        className="flex items-center gap-3 p-3 rounded-lg bg-secondary/30 opacity-50"
                      >
                        <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                          <span className="text-lg">🔒</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{badge.verse}</p>
                          <p className="text-xs text-muted-foreground">{badge.ref} • {badge.streak} days</p>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default DailySurrender;
