import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from '@/lib/router-compat';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { VerseCard } from '@/components/VerseCard';
import { DevotionalCard } from '@/components/DevotionalCard';
import { getFeaturedDevotionals } from '@/data/devotionalContent';
import { useBibleVerse } from '@/hooks/useBibleVerse';
import { useAuth } from '@/contexts/AuthContext';
import { useHabits, useHabitCompletions, useToggleHabitCompletion } from '@/hooks/useHabits';
import { useProfile } from '@/hooks/useProfile';
import { startOfWeek, addDays, format } from 'date-fns';
import { 
  Heart, 
  Target, 
  TrendingUp, 
  Clock, 
  BookOpen,
  Lock,
  CheckCircle,
  Flame,
  Loader2
} from 'lucide-react';
import { ShieldIcon } from '@/components/icons/ShieldIcon';

const Dashboard = () => {
  const [prayerComplete, setPrayerComplete] = useState(false);
  const { verse } = useBibleVerse('daily');
  const featuredDevotionals = getFeaturedDevotionals();
  const { user } = useAuth();
  const { data: profile } = useProfile();
  const { data: habits = [] } = useHabits();
  
  const currentWeekStart = startOfWeek(new Date(), { weekStartsOn: 1 });
  const { data: completions = [], isLoading: completionsLoading } = useHabitCompletions(currentWeekStart);

  const weekDays = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
  const today = format(new Date(), 'yyyy-MM-dd');
  
  const completedDays = weekDays.map((_, i) => {
    const date = format(addDays(currentWeekStart, i), 'yyyy-MM-dd');
    if (date > today) return 'future';
    // Check if ALL habits were completed on this day
    if (habits.length === 0) return 'missed';
    const allDone = habits.every(h => 
      completions.some(c => c.habit_id === h.id && c.completed_date === date)
    );
    return allDone ? 'completed' : 'missed';
  });

  const toggleCompletion = useToggleHabitCompletion();
  const handleToggle = (habitId: string, date: string, done: boolean) => {
    toggleCompletion.mutate({ habitId, date, isCompleted: done });
  };

  const streakCount = profile?.streak_count ?? 0;
  const longestStreak = profile?.longest_streak ?? 0;


  // Success rate: completions this week / (habits * days so far)
  const daysSoFar = weekDays.filter((_, i) => format(addDays(currentWeekStart, i), 'yyyy-MM-dd') <= today).length;
  const totalPossible = habits.length * daysSoFar;
  const totalCompleted = completions.length;
  const successRate = totalPossible > 0 ? Math.round((totalCompleted / totalPossible) * 100) : 0;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex items-center gap-3 mb-2">
              <ShieldIcon className="w-8 h-8 text-primary" />
              <h1 className="font-heading text-3xl md:text-4xl font-bold">Your Dashboard</h1>
            </div>
            <p className="text-muted-foreground">Welcome{profile?.display_name ? `, ${profile.display_name}` : ', warrior'}. Here's your battle station for today.</p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content - Left 2 columns */}
            <div className="lg:col-span-2 space-y-6">
              {/* Daily Prayer Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <Card variant="glow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                          <Heart className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <CardTitle>Daily Prayer</CardTitle>
                          <p className="text-sm text-muted-foreground">Start your day grounded in faith</p>
                        </div>
                      </div>
                      <span className="text-sm text-muted-foreground">📅 Today</span>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <VerseCard mode="daily" showRefresh={false} compact={true} />

                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Flame className="w-4 h-4 text-primary" />
                        <span className="font-semibold">Today's Prayer</span>
                      </div>
                      <p className="text-muted-foreground text-sm">
                        Heavenly Father, I acknowledge my weakness and my need for Your strength today. 
                        When temptation comes, remind me that You are faithful. Help me to take the way 
                        of escape You provide. Guard my eyes, my heart, and my mind. I choose to walk 
                        in Your light today. In Jesus' name, Amen.
                      </p>
                    </div>

                    <div className="bg-muted/50 rounded-lg p-3">
                      <p className="text-sm text-muted-foreground">
                        <span className="font-medium text-foreground">Reflection:</span> What specific 
                        situation might you face today where you'll need God's strength?
                      </p>
                    </div>

                    <Button 
                      variant={prayerComplete ? "success" : "default"} 
                      className="w-full"
                      onClick={() => setPrayerComplete(!prayerComplete)}
                    >
                      {prayerComplete ? (
                        <>
                          <CheckCircle className="w-5 h-5" />
                          Prayer Complete
                        </>
                      ) : (
                        <>
                          Mark Prayer Complete
                          <CheckCircle className="w-5 h-5" />
                        </>
                      )}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Accountability Circle */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Card variant="locked" className="relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-muted/50 to-transparent" />
                  <CardContent className="relative py-12 text-center">
                    <Lock className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="font-heading text-xl font-semibold mb-2">Premium Feature</h3>
                    <p className="text-muted-foreground mb-6 max-w-sm mx-auto">
                      Join an accountability circle with trusted brothers who will walk with you.
                    </p>
                    <Link to="/auth?mode=signin">
                      <Button variant="outline">Unlock with Account</Button>
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Sidebar - Right column */}
            <div className="space-y-6">
              {/* Habit Tracker */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Target className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <CardTitle>Quick Check-In</CardTitle>
                        <p className="text-sm text-muted-foreground">Today's victories, one tap away</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Streak Counter */}
                    <div className="text-center">
                      <div className="streak-display w-20 h-20 mx-auto mb-2">
                        <Flame className="w-10 h-10 text-primary animate-flame" />
                      </div>
                      <div className="font-heading text-4xl font-bold text-primary">{streakCount}</div>
                      <p className="text-sm text-muted-foreground">Day Streak</p>
                    </div>

                    {/* Today's check-in list */}
                    {habits.length === 0 ? (
                      <p className="text-sm text-muted-foreground text-center py-2">
                        No habits yet. Add your first one to start tracking.
                      </p>
                    ) : (
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium">Today</p>
                          <p className="text-xs text-muted-foreground">
                            {habits.filter((h) => completions.some((c) => c.habit_id === h.id && c.completed_date === today)).length}
                            /{habits.length} done
                          </p>
                        </div>
                        {habits.slice(0, 5).map((habit) => {
                          const done = completions.some(
                            (c) => c.habit_id === habit.id && c.completed_date === today
                          );
                          return (
                            <button
                              type="button"
                              key={habit.id}
                              disabled={toggleCompletion.isPending}
                              aria-pressed={done}
                              aria-label={`${done ? 'Uncheck' : 'Check in'} ${habit.name} today`}
                              onClick={() => handleToggle(habit.id, today, done)}
                              className={`w-full flex items-center gap-3 rounded-lg px-3 py-2 text-left transition-colors ${
                                done ? 'bg-primary/10 text-foreground' : 'bg-secondary/50 hover:bg-secondary'
                              }`}
                            >
                              <CheckCircle
                                className={`w-5 h-5 shrink-0 ${done ? 'text-primary' : 'text-muted-foreground/50'}`}
                              />
                              <span className={`text-sm truncate ${done ? 'line-through text-muted-foreground' : ''}`}>
                                {habit.name}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    )}

                    <Link to="/habits" className="block">
                      <Button variant="outline" className="w-full">
                        {habits.length > 5 ? `View All ${habits.length} Habits & Stats →` : 'View Full Tracker & Stats →'}
                      </Button>
                    </Link>

                  </CardContent>
                </Card>
              </motion.div>

              {/* Content Library */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <BookOpen className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <CardTitle>Content Library</CardTitle>
                        <p className="text-sm text-muted-foreground">Resources for your journey</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {featuredDevotionals.map((devotional) => (
                      <DevotionalCard 
                        key={devotional.id}
                        devotional={devotional}
                        compact={true}
                      />
                    ))}
                    <Link to="/devotionals">
                      <Button variant="outline" className="w-full mt-2">Browse All Resources</Button>
                    </Link>
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

export default Dashboard;
