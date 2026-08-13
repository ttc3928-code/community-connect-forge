import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from '@/lib/router-compat';
import { useSOS } from '@/contexts/SOSContext';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { AddHabitOverlay, PresetHabit } from '@/components/AddHabitOverlay';
import { CustomHabitModal } from '@/components/CustomHabitModal';
import { 
  Heart, 
  BookOpen, 
  Shield, 
  Dumbbell, 
  Moon,
  CigaretteOff,
  Smartphone,
  Hand,
  Droplets,
  Utensils,
  Brain,
  Music,
  Timer,
  Target,
  MonitorOff,
  ScrollText,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  X,
  Flame,
  Lightbulb,
  Users,
  Plus,
  Loader2,
  Lock,
  Trash2,
  AlertTriangle,
  Check,
  StickyNote,
  Save,
  Wine,
  Cookie,
  Bed,
  Sun,
  Coffee,
  MessageCircle,
  Headphones,
  HandHeart,
  PersonStanding,
  PenLine,
  PhoneOff,
  Leaf,
  UtensilsCrossed,
  Frown,
  Gamepad2
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useHabits, useHabitCompletions, useCreateHabit, useDeleteHabit, useToggleHabitCompletion, useUpdateHabitNote } from '@/hooks/useHabits';
import { startOfWeek, addDays, format, addWeeks, subWeeks } from 'date-fns';
import { toast } from 'sonner';
import NotificationSettings from '@/components/NotificationSettings';

// Preset habits for quick selection - Good habits to build
const goodHabitPresets: PresetHabit[] = [
  { name: 'Read Bible', icon: 'book', IconComponent: BookOpen, color: 'text-amber-400', bg: 'bg-amber-400/10' },
  { name: 'Pray daily', icon: 'heart', IconComponent: HandHeart, color: 'text-rose-400', bg: 'bg-rose-400/10' },
  { name: 'Exercise', icon: 'dumbbell', IconComponent: PersonStanding, color: 'text-green-400', bg: 'bg-green-400/10' },
  { name: 'Good sleep', icon: 'moon', IconComponent: Moon, color: 'text-indigo-400', bg: 'bg-indigo-400/10' },
  { name: 'Journal urges', icon: 'scroll', IconComponent: PenLine, color: 'text-teal-400', bg: 'bg-teal-400/10' },
  { name: 'Call brother', icon: 'users', IconComponent: Users, color: 'text-blue-400', bg: 'bg-blue-400/10' },
  { name: 'Gratitude list', icon: 'sparkles', IconComponent: Heart, color: 'text-pink-400', bg: 'bg-pink-400/10' },
  { name: 'No phone 10pm', icon: 'smartphone', IconComponent: PhoneOff, color: 'text-purple-400', bg: 'bg-purple-400/10' },
];

// Preset habits for quick selection - Stop bad habits
const badHabitPresets: PresetHabit[] = [
  { name: 'Porn', icon: 'monitor-off', IconComponent: MonitorOff, color: 'text-red-400', bg: 'bg-red-400/10' },
  { name: 'Social media', icon: 'smartphone', IconComponent: PhoneOff, color: 'text-red-400', bg: 'bg-red-400/10' },
  { name: 'Alcohol', icon: 'wine', IconComponent: Wine, color: 'text-red-400', bg: 'bg-red-400/10' },
  { name: 'Cannabis', icon: 'leaf', IconComponent: Leaf, color: 'text-red-400', bg: 'bg-red-400/10' },
  { name: 'Smoking', icon: 'cigarette-off', IconComponent: CigaretteOff, color: 'text-red-400', bg: 'bg-red-400/10' },
  { name: 'Binge eating', icon: 'utensils', IconComponent: UtensilsCrossed, color: 'text-red-400', bg: 'bg-red-400/10' },
  { name: 'Anger outbursts', icon: 'hand', IconComponent: Frown, color: 'text-red-400', bg: 'bg-red-400/10' },
  { name: 'Gaming', icon: 'target', IconComponent: Gamepad2, color: 'text-red-400', bg: 'bg-red-400/10' },
];

// Available icons for habit picker
const availableIcons = [
  { key: 'heart', Icon: Heart, label: 'Prayer', color: 'text-red-400', bg: 'bg-red-400/10' },
  { key: 'book', Icon: BookOpen, label: 'Bible', color: 'text-blue-400', bg: 'bg-blue-400/10' },
  { key: 'shield', Icon: Shield, label: 'Purity', color: 'text-emerald-400', bg: 'bg-emerald-400/10' },
  { key: 'dumbbell', Icon: Dumbbell, label: 'Exercise', color: 'text-amber-500', bg: 'bg-amber-500/10' },
  { key: 'moon', Icon: Moon, label: 'Sleep', color: 'text-purple-400', bg: 'bg-purple-400/10' },
  { key: 'cigarette-off', Icon: CigaretteOff, label: 'No Smoking', color: 'text-orange-400', bg: 'bg-orange-400/10' },
  { key: 'smartphone', Icon: Smartphone, label: 'Social Media', color: 'text-sky-400', bg: 'bg-sky-400/10' },
  { key: 'utensils', Icon: Utensils, label: 'Fasting', color: 'text-yellow-400', bg: 'bg-yellow-400/10' },
  { key: 'droplets', Icon: Droplets, label: 'Water', color: 'text-cyan-400', bg: 'bg-cyan-400/10' },
  { key: 'scroll', Icon: ScrollText, label: 'Journal', color: 'text-teal-400', bg: 'bg-teal-400/10' },
  { key: 'brain', Icon: Brain, label: 'Meditation', color: 'text-violet-400', bg: 'bg-violet-400/10' },
  { key: 'music', Icon: Music, label: 'Worship', color: 'text-fuchsia-400', bg: 'bg-fuchsia-400/10' },
  { key: 'timer', Icon: Timer, label: 'Routine', color: 'text-slate-300', bg: 'bg-slate-300/10' },
  { key: 'target', Icon: Target, label: 'Goals', color: 'text-lime-400', bg: 'bg-lime-400/10' },
  { key: 'monitor-off', Icon: MonitorOff, label: 'Screen Time', color: 'text-indigo-400', bg: 'bg-indigo-400/10' },
  { key: 'hand', Icon: Hand, label: 'Discipline', color: 'text-rose-400', bg: 'bg-rose-400/10' },
  { key: 'flame', Icon: Flame, label: 'Fire', color: 'text-orange-500', bg: 'bg-orange-500/10' },
  { key: 'sparkles', Icon: Sparkles, label: 'Other', color: 'text-pink-400', bg: 'bg-pink-400/10' },
];

// Icon, color mappings for habits - matches by lowercase includes or stored icon key.
const habitIconMap = [
  // Core "Iron Sharpens Iron" habits (match screenshot)
  { keywords: ['prayer', 'pray'], Icon: Heart, color: 'text-red-400', bg: 'bg-red-400/10' },
  { keywords: ['bible', 'scripture', 'devotion', 'reading'], Icon: BookOpen, color: 'text-blue-400', bg: 'bg-blue-400/10' },
  { keywords: ['porn', 'purity'], Icon: Shield, color: 'text-emerald-400', bg: 'bg-emerald-400/10' },
  { keywords: ['exercise', 'workout', 'gym', 'run', 'fitness'], Icon: Dumbbell, color: 'text-amber-500', bg: 'bg-amber-500/10' },
  { keywords: ['sleep', 'rest', 'bed'], Icon: Moon, color: 'text-purple-400', bg: 'bg-purple-400/10' },

  // Common "stop" habits seen in your screenshot
  { keywords: ['smoking', 'cigarette', 'nicotine'], Icon: CigaretteOff, color: 'text-orange-400', bg: 'bg-orange-400/10' },
  { keywords: ['social media', 'social', 'scroll'], Icon: Smartphone, color: 'text-sky-400', bg: 'bg-sky-400/10' },

  // Extras (still unique + recognizable)
  { keywords: ['fast', 'fasting'], Icon: Utensils, color: 'text-yellow-400', bg: 'bg-yellow-400/10' },
  { keywords: ['hydrate', 'water'], Icon: Droplets, color: 'text-cyan-400', bg: 'bg-cyan-400/10' },
  { keywords: ['journal', 'write', 'gratitude'], Icon: ScrollText, color: 'text-teal-400', bg: 'bg-teal-400/10' },
  { keywords: ['meditat', 'quiet', 'silence', 'mind'], Icon: Brain, color: 'text-violet-400', bg: 'bg-violet-400/10' },
  { keywords: ['music', 'worship'], Icon: Music, color: 'text-fuchsia-400', bg: 'bg-fuchsia-400/10' },
  { keywords: ['timer', 'time', 'routine'], Icon: Timer, color: 'text-slate-300', bg: 'bg-slate-300/10' },
  { keywords: ['goal', 'target'], Icon: Target, color: 'text-lime-400', bg: 'bg-lime-400/10' },
  { keywords: ['no screen', 'screen', 'phone'], Icon: MonitorOff, color: 'text-indigo-400', bg: 'bg-indigo-400/10' },
  { keywords: ['discipline', 'self control', 'control'], Icon: Hand, color: 'text-rose-400', bg: 'bg-rose-400/10' },
];

const fallbackStyles = [
  { Icon: Sparkles, color: 'text-rose-400', bg: 'bg-rose-400/10' },
  { Icon: Target, color: 'text-sky-400', bg: 'bg-sky-400/10' },
  { Icon: Flame, color: 'text-amber-500', bg: 'bg-amber-500/10' },
  { Icon: Brain, color: 'text-violet-400', bg: 'bg-violet-400/10' },
  { Icon: Droplets, color: 'text-cyan-400', bg: 'bg-cyan-400/10' },
  { Icon: Timer, color: 'text-teal-400', bg: 'bg-teal-400/10' },
];

// Check if icon value is a URL (custom uploaded image)
const isIconUrl = (icon?: string | null): boolean => {
  if (!icon) return false;
  return icon.startsWith('http://') || icon.startsWith('https://');
};

const getHabitStyle = (habitName: string, iconKey?: string | null) => {
  // Check if it's a custom uploaded image URL
  if (isIconUrl(iconKey)) {
    return { 
      Icon: null, 
      customImageUrl: iconKey, 
      color: 'text-white', 
      bg: 'bg-slate-700/50' 
    };
  }
  
  // First check if there's a stored icon key
  if (iconKey) {
    const iconFromKey = availableIcons.find(i => i.key === iconKey);
    if (iconFromKey) {
      return { Icon: iconFromKey.Icon, customImageUrl: null, color: iconFromKey.color, bg: iconFromKey.bg };
    }
  }
  
  // Fall back to keyword matching
  const nameLower = habitName.toLowerCase();
  const match = habitIconMap.find((h) => h.keywords.some((k) => nameLower.includes(k)));
  if (match) return { Icon: match.Icon, customImageUrl: null, color: match.color, bg: match.bg };

  // Deterministic fallback (so every habit still gets a different icon)
  const hash = habitName.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const fallback = fallbackStyles[hash % fallbackStyles.length];
  return { ...fallback, customImageUrl: null };
};

const MyHabits = () => {
  const { user, loading: authLoading } = useAuth();
  const [currentWeekStart, setCurrentWeekStart] = useState(() => startOfWeek(new Date(), { weekStartsOn: 1 }));
  const [showPresetOverlay, setShowPresetOverlay] = useState(false);
  const { openSOS } = useSOS();
  const [showCustomHabitModal, setShowCustomHabitModal] = useState(false);
  const [newHabitName, setNewHabitName] = useState('');
  const [newHabitIcon, setNewHabitIcon] = useState('heart');
  const [newHabitType, setNewHabitType] = useState<'build' | 'stop'>('build');
  const [showIconPicker, setShowIconPicker] = useState(false);
  const [newlyAddedHabitId, setNewlyAddedHabitId] = useState<string | null>(null);
  
  // Ref for scrolling to habits grid
  const habitsGridRef = React.useRef<HTMLDivElement>(null);
  
  // Note dialog state
  const [noteDialogOpen, setNoteDialogOpen] = useState(false);
  const [noteHabitId, setNoteHabitId] = useState<string | null>(null);
  const [noteDate, setNoteDate] = useState<string | null>(null);
  const [noteText, setNoteText] = useState('');

  const { data: habits = [], isLoading: habitsLoading } = useHabits();
  const { data: completions = [], isLoading: completionsLoading } = useHabitCompletions(currentWeekStart);
  const createHabit = useCreateHabit();
  const deleteHabit = useDeleteHabit();
  const toggleCompletion = useToggleHabitCompletion();
  const updateNote = useUpdateHabitNote();

  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const date = addDays(currentWeekStart, i);
    return {
      day: format(date, 'EEE'),
      date: format(date, 'd'),
      fullDate: format(date, 'yyyy-MM-dd'),
    };
  });

  const isCompleted = (habitId: string, date: string) => {
    return completions.some(c => c.habit_id === habitId && c.completed_date === date);
  };

  const getCompletionNote = (habitId: string, date: string) => {
    const completion = completions.find(c => c.habit_id === habitId && c.completed_date === date);
    return completion?.note || '';
  };

  const getHabitProgress = (habitId: string) => {
    const completed = weekDays.filter(d => isCompleted(habitId, d.fullDate)).length;
    return `${completed}/7`;
  };

  const getHabitPercentage = (habitId: string) => {
    const completed = weekDays.filter(d => isCompleted(habitId, d.fullDate)).length;
    return Math.round((completed / 7) * 100);
  };

  const getTotalWeeklyProgress = () => {
    if (habits.length === 0) return 0;
    const totalPossible = habits.length * 7;
    const totalCompleted = habits.reduce((acc, habit) => {
      return acc + weekDays.filter(d => isCompleted(habit.id, d.fullDate)).length;
    }, 0);
    return Math.round((totalCompleted / totalPossible) * 100);
  };

  const getHabitStreakCounts = () => {
    return habits.map(habit => {
      const completed = weekDays.filter(d => isCompleted(habit.id, d.fullDate)).length;
      const style = getHabitStyle(habit.name, habit.icon);
      return { name: habit.name, count: completed, Icon: style.Icon, color: style.color };
    });
  };

  const handleToggleCompletion = async (habitId: string, date: string) => {
    const completed = isCompleted(habitId, date);
    try {
      await toggleCompletion.mutateAsync({ habitId, date, isCompleted: completed });
    } catch (error) {
      toast.error('Failed to update habit');
    }
  };

  const handleCustomHabitSave = async (name: string, icon: string, type: 'build' | 'stop') => {
    // For "stop" habits, prepend "Stop " if not already there
    let finalName = name;
    if (type === 'stop' && !finalName.toLowerCase().startsWith('stop ')) {
      finalName = `Stop ${finalName}`;
    }

    await createHabit.mutateAsync({ name: finalName, icon, type });
    
    // Show success toast with habit name
    toast.success(`${finalName} added ✓`, {
      duration: 2000,
      className: 'animate-scale-in',
    });
    
    setShowCustomHabitModal(false);
    
    // Scroll to grid after a short delay
    setTimeout(() => {
      habitsGridRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 300);
  };

  const handleSelectPreset = async (preset: PresetHabit, type: 'build' | 'stop') => {
    let finalName = preset.name;
    if (type === 'stop' && !finalName.toLowerCase().startsWith('stop ')) {
      finalName = `Stop ${finalName}`;
    }

    try {
      // Keep the overlay open so multiple habits can be added in a row
      await createHabit.mutateAsync({ name: finalName, icon: preset.icon, type });

      toast.success(`${finalName} added ✓`, {
        duration: 2000,
        className: 'animate-scale-in',
      });
    } catch (error) {
      toast.error('Failed to add habit');
    }
  };


  const handleOpenCustomHabit = () => {
    setShowPresetOverlay(false);
    setNewHabitName('');
    setNewHabitType('build');
    setNewHabitIcon('heart');
    setShowCustomHabitModal(true);
  };

  const handleDeleteHabit = async (habitId: string) => {
    try {
      await deleteHabit.mutateAsync(habitId);
      toast.success('Habit deleted');
    } catch (error) {
      toast.error('Failed to delete habit');
    }
  };

  const openNoteDialog = (habitId: string, date: string) => {
    const existingNote = getCompletionNote(habitId, date);
    setNoteHabitId(habitId);
    setNoteDate(date);
    setNoteText(existingNote);
    setNoteDialogOpen(true);
  };

  const handleSaveNote = async () => {
    if (!noteHabitId || !noteDate) return;
    
    // If not completed yet, complete it first
    if (!isCompleted(noteHabitId, noteDate)) {
      try {
        await toggleCompletion.mutateAsync({ habitId: noteHabitId, date: noteDate, isCompleted: false });
      } catch (error) {
        toast.error('Failed to mark habit as complete');
        return;
      }
    }
    
    try {
      await updateNote.mutateAsync({ habitId: noteHabitId, date: noteDate, note: noteText });
      toast.success('Note saved!');
      setNoteDialogOpen(false);
      setNoteHabitId(null);
      setNoteDate(null);
      setNoteText('');
    } catch (error) {
      toast.error('Failed to save note');
    }
  };

  const getSelectedHabitName = () => {
    if (!noteHabitId) return '';
    const habit = habits.find(h => h.id === noteHabitId);
    return habit?.name || '';
  };

  // Show sign-in prompt if not authenticated
  if (!authLoading && !user) {
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
                Track Your Habits
              </h1>
              <p className="text-muted-foreground text-lg mb-8">
                Sign in to start building holy disciplines and tracking your progress.
              </p>
              <Link to="/auth?mode=signin">
                <Button variant="hero" size="xl">
                  Sign In to Start Tracking
                </Button>
              </Link>
            </motion.div>
          </div>
        </main>
      <Footer />
      </div>
    );
  }

  const isLoading = habitsLoading || completionsLoading;
  const weeklyProgress = getTotalWeeklyProgress();
  const streakCounts = getHabitStreakCounts();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-start justify-between mb-8"
          >
            <div>
              <h1 className="font-heading text-3xl md:text-4xl font-bold uppercase tracking-wide">My Habits</h1>
              <p className="text-muted-foreground">Build holy disciplines, one day at a time</p>
            </div>
            <div className="flex items-center gap-3">
              <Button onClick={() => setShowPresetOverlay(true)} variant="outline" className="hidden md:flex">
                <Plus className="w-4 h-4 mr-2" />
                Add Habit
              </Button>
              <Button variant="destructive" className="gap-2" onClick={() => openSOS()}>
                <AlertTriangle className="w-4 h-4" />
                <span className="hidden sm:inline">Emergency Mend</span>
              </Button>
            </div>
          </motion.div>

          {/* Mobile Add Button */}
          <Button onClick={() => setShowPresetOverlay(true)} className="w-full mb-6 md:hidden">
            <Plus className="w-4 h-4 mr-2" />
            Add Habit
          </Button>

          {/* Progress Summary Card */}
          {!isLoading && habits.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card className="mb-6 bg-card border-border">
                <CardContent className="py-5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="text-4xl font-bold text-primary">{weeklyProgress}%</div>
                      <div>
                        <p className="text-foreground font-medium flex items-center gap-2">
                          Don't give up – His mercies are new every morning! 
                          <span className="text-lg">💪</span>
                        </p>
                        <p className="text-sm text-muted-foreground">Week of {format(currentWeekStart, 'MMM d')}</p>
                      </div>
                    </div>
                    {/* Streak counts */}
                    <div className="hidden md:flex items-center gap-4">
                      {streakCounts.slice(0, 4).map((streak, idx) => (
                        <div key={idx} className="flex items-center gap-1 text-sm">
                          <span className="text-muted-foreground">{streak.count}</span>
                          {streak.Icon ? <streak.Icon className={`w-4 h-4 ${streak.color}`} /> : null}
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Insight Card */}
          {!isLoading && habits.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
            >
              <Card className="mb-6 border-l-4 border-l-amber-500 bg-amber-500/5">
                <CardContent className="py-4">
                  <div className="flex items-start gap-3">
                    <Lightbulb className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="text-amber-500 font-semibold">Insight</span>
                      <p className="text-sm text-muted-foreground mt-1">
                        Evenings seem tough – try prayer before bed and limiting screen time after 9 PM.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Preset Habit Overlay */}
          <AddHabitOverlay
            isOpen={showPresetOverlay}
            onClose={() => setShowPresetOverlay(false)}
            onSelectPreset={handleSelectPreset}
            onCustomHabit={handleOpenCustomHabit}
            addedHabitNames={habits.map((h) => h.name)}


            goodHabits={goodHabitPresets}
            badHabits={badHabitPresets}
          />

          {/* Custom Habit Modal */}
          <CustomHabitModal
            isOpen={showCustomHabitModal}
            onClose={() => setShowCustomHabitModal(false)}
            onSave={handleCustomHabitSave}
            isPending={createHabit.isPending}
          />

          {/* Loading State */}
          {isLoading && (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          )}

          {/* Empty State */}
          {!isLoading && habits.length === 0 && (
            <Card className="text-center py-12 mb-6">
              <CardContent>
                <Flame className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-heading text-xl font-semibold mb-2">No habits yet</h3>
                <p className="text-muted-foreground mb-4">Start by adding your first habit to track.</p>
                <Button onClick={() => setShowPresetOverlay(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add First Habit
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Week Navigation & Grid */}
          {/* Week Navigation & Grid */}
          {!isLoading && habits.length > 0 && (
            <motion.div
              ref={habitsGridRef}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="mb-6">
                <CardContent className="py-4">
                  {/* Week Navigation */}
                  <div className="flex items-center justify-between mb-6">
                    <Button variant="ghost" size="sm" onClick={() => setCurrentWeekStart(subWeeks(currentWeekStart, 1))} className="text-muted-foreground hover:text-foreground">
                      <ChevronLeft className="w-4 h-4 mr-1" />
                      Previous
                    </Button>
                    <span className="font-semibold text-foreground">
                      {format(currentWeekStart, 'MMMM d')} - {format(addDays(currentWeekStart, 6), 'MMMM d, yyyy')}
                    </span>
                    <Button variant="ghost" size="sm" onClick={() => setCurrentWeekStart(addWeeks(currentWeekStart, 1))} className="text-muted-foreground hover:text-foreground">
                      Next
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                  </div>

                  {/* Habit Grid */}
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="text-sm text-muted-foreground border-b border-border">
                          <th className="text-left py-3 px-3 font-medium min-w-[150px]">Habit</th>
                          {weekDays.map((day) => (
                            <th key={day.fullDate} className="text-center py-3 px-2 font-medium min-w-[60px]">
                              <div className="text-muted-foreground text-xs">{day.day}</div>
                              <div className="text-foreground font-bold text-lg">{day.date}</div>
                            </th>
                          ))}
                          <th className="text-right py-3 px-3 font-medium min-w-[80px]">Progress</th>
                          <th className="w-10"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {habits.map((habit) => {
                          const { Icon, customImageUrl, color } = getHabitStyle(habit.name, habit.icon);
                          
                          return (
                            <tr key={habit.id} className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                              <td className="py-4 px-3">
                                <div className="flex items-center gap-3">
                                  {customImageUrl ? (
                                    <div className="w-5 h-5 rounded overflow-hidden flex-shrink-0">
                                      <img 
                                        src={customImageUrl} 
                                        alt={habit.name} 
                                        className="w-full h-full object-cover"
                                      />
                                    </div>
                                  ) : Icon ? (
                                    <Icon className={`w-5 h-5 ${color}`} />
                                  ) : null}
                                  <span className="font-medium">{habit.name}</span>
                                </div>
                              </td>
                              {weekDays.map((day) => {
                                const completed = isCompleted(habit.id, day.fullDate);
                                const hasNote = !!getCompletionNote(habit.id, day.fullDate);
                                const today = format(new Date(), 'yyyy-MM-dd');
                                const isPast = day.fullDate <= today;
                                
                                return (
                                  <td key={day.fullDate} className="text-center py-4 px-2">
                                    <div className="flex flex-col items-center gap-1">
                                      <button 
                                        onClick={() => handleToggleCompletion(habit.id, day.fullDate)}
                                        disabled={toggleCompletion.isPending || !isPast}
                                        className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all cursor-pointer ${
                                          completed
                                            ? 'bg-primary text-primary-foreground border-2 border-primary'
                                            : isPast
                                              ? 'bg-muted/30 border-2 border-border hover:bg-muted/50 hover:border-muted-foreground/50'
                                              : 'bg-muted/10 border border-border/30 cursor-not-allowed opacity-50'
                                        }`}
                                      >
                                        {completed && <Check className="w-5 h-5" />}
                                      </button>
                                      {isPast && (
                                        <button 
                                          onClick={() => openNoteDialog(habit.id, day.fullDate)}
                                          className={`text-[10px] hover:text-primary cursor-pointer flex items-center gap-0.5 ${
                                            hasNote ? 'text-primary' : 'text-muted-foreground/50'
                                          }`}
                                        >
                                          {hasNote ? <StickyNote className="w-2.5 h-2.5" /> : null}
                                          {hasNote ? 'note' : '+note'}
                                        </button>
                                      )}
                                    </div>
                                  </td>
                                );
                              })}
                              <td className="text-right py-4 px-3">
                                <div className="flex items-center justify-end gap-2">
                                  <div className="w-20 h-1.5 bg-muted rounded-full overflow-hidden">
                                    <div 
                                      className="h-full bg-muted-foreground/50 rounded-full transition-all"
                                      style={{ width: `${getHabitPercentage(habit.id)}%` }}
                                    />
                                  </div>
                                  <span className="text-sm font-medium text-muted-foreground w-8">{getHabitProgress(habit.id)}</span>
                                </div>
                              </td>
                              <td className="py-4 px-2">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8 text-muted-foreground hover:text-destructive"
                                  onClick={() => handleDeleteHabit(habit.id)}
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Individual Habit Progress Cards */}
          {!isLoading && habits.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="mb-6"
            >
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                {habits.map((habit) => {
                  const { Icon, color, bg: bgColor } = getHabitStyle(habit.name, habit.icon);
                  const percentage = getHabitPercentage(habit.id);

                    const style = getHabitStyle(habit.name, habit.icon);

                    return (
                      <Card key={habit.id} className={`${bgColor} border border-border`}>
                        <CardContent className="py-4 text-center">
                          {style.customImageUrl ? (
                            <div className="w-6 h-6 rounded overflow-hidden mx-auto mb-2">
                              <img src={style.customImageUrl} alt={habit.name} className="w-full h-full object-cover" />
                            </div>
                          ) : Icon ? (
                            <Icon className={`w-6 h-6 ${color} mx-auto mb-2`} />
                          ) : null}
                          <p className="text-xs text-muted-foreground mb-1 truncate">{habit.name}</p>
                          <p className="text-2xl font-bold text-foreground">{percentage}%</p>
                        </CardContent>
                      </Card>
                    );
                })}
              </div>
            </motion.div>
          )}

          {/* Notification Settings */}
          {user && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="mb-6"
            >
              <NotificationSettings />
            </motion.div>
          )}

          {/* Accountability Partners */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <Users className="w-5 h-5 text-primary" />
                <h2 className="font-heading text-xl font-bold uppercase tracking-wide">Accountability Partners</h2>
              </div>
              <Button variant="outline" size="sm">Manage Partners</Button>
            </div>
            <Card>
              <CardContent className="py-12">
                <div className="text-center">
                  <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground mb-4">Sign in to manage accountability partners</p>
                  <Link to="/auth?mode=signin">
                    <Button variant="outline">Sign In</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>

      {/* Note Dialog */}
      <Dialog open={noteDialogOpen} onOpenChange={setNoteDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <StickyNote className="w-5 h-5 text-primary" />
              Add Note for {getSelectedHabitName()}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <p className="text-sm text-muted-foreground">
              {noteDate && format(new Date(noteDate), 'EEEE, MMMM d, yyyy')}
            </p>
            <Textarea
              placeholder="How did it go? Any reflections..."
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
              className="min-h-[120px]"
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setNoteDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveNote} disabled={updateNote.isPending}>
              {updateNote.isPending ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Save Note
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

export default MyHabits;
