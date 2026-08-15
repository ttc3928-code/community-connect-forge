import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from '@/lib/router-compat';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { toast } from 'sonner';
import {
  User,
  Mail,
  KeyRound,
  LogOut,
  LifeBuoy,
  Bell,
  ShieldCheck,
  Download,
  Trash2,
  Loader2,
  MapPin,
  Smartphone,
  MessageSquare,
  Send,
  Check,
  AlertCircle,
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useProfile, useUpdateProfile } from '@/hooks/useProfile';
import {
  useNotificationPreferences,
  useUpdateNotificationPreferences,
} from '@/hooks/useNotificationPreferences';
import { communityClient as supabase } from '@/lib/community-client';

const SectionCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  description?: string;
  children: React.ReactNode;
}> = ({ icon, title, description, children }) => (
  <Card className="border-border/60 bg-card/60 backdrop-blur-sm">
    <CardHeader className="pb-3">
      <CardTitle className="flex items-center gap-2 font-heading text-lg">
        <span className="text-primary">{icon}</span>
        {title}
      </CardTitle>
      {description && (
        <p className="text-sm text-muted-foreground">{description}</p>
      )}
    </CardHeader>
    <CardContent className="space-y-4">{children}</CardContent>
  </Card>
);

const Profile: React.FC = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const { data: profile, isLoading } = useProfile();
  const updateProfile = useUpdateProfile();
  const { data: prefs } = useNotificationPreferences();
  const updatePrefs = useUpdateNotificationPreferences();

  const [displayName, setDisplayName] = useState('');
  const [partnerName, setPartnerName] = useState('');
  const [partnerPhone, setPartnerPhone] = useState('');
  const [attachLocation, setAttachLocation] = useState(false);
  const [reminderTime, setReminderTime] = useState('07:00');
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [sosTouched, setSosTouched] = useState(false);
  const [sosSaved, setSosSaved] = useState(false);
  const [reminderSaved, setReminderSaved] = useState(false);

  useEffect(() => {
    if (!profile) return;
    setDisplayName(profile.display_name ?? '');
    setPartnerName((profile as any).partner_name ?? '');
    setPartnerPhone((profile as any).partner_phone ?? '');
    setAttachLocation(Boolean((profile as any).sos_attach_location));
  }, [profile]);

  useEffect(() => {
    if (prefs?.reminder_time) setReminderTime(prefs.reminder_time.slice(0, 5));
  }, [prefs]);

  const handleSaveAccount = () => {
    updateProfile.mutate(
      { display_name: displayName.trim() || null } as any,
      {
        onSuccess: () => toast.success('Account info updated'),
        onError: () => toast.error('Could not update account info'),
      },
    );
  };

  const digitCount = partnerPhone.replace(/\D/g, '').length;
  const phoneError = !partnerPhone.trim()
    ? 'Phone number is required for 1-tap SOS alerts.'
    : !/^\+?[\d\s()\-.]+$/.test(partnerPhone.trim())
      ? 'Only digits, spaces, +, -, ( ) and . are allowed.'
      : digitCount < 7
        ? 'Phone number is too short — include the area code.'
        : digitCount > 15
          ? 'Phone number is too long.'
          : null;
  const nameError = !partnerName.trim()
    ? 'Partner name is required so the alert is personal.'
    : partnerName.trim().length < 2
      ? 'Enter at least 2 characters.'
      : null;
  const sosValid = !phoneError && !nameError;

  const reminderError = !/^([01]\d|2[0-3]):[0-5]\d$/.test(reminderTime)
    ? 'Pick a valid time (HH:MM).'
    : null;

  const handleSaveSOS = () => {
    setSosTouched(true);
    if (!sosValid) {
      toast.error(nameError ?? phoneError ?? 'Check your emergency settings');
      return;
    }
    updateProfile.mutate(
      {
        partner_name: partnerName.trim() || null,
        partner_phone: partnerPhone.trim() || null,
        sos_attach_location: attachLocation,
      } as any,
      {
        onSuccess: () => {
          setSosSaved(true);
          setTimeout(() => setSosSaved(false), 2500);
          toast.success('Emergency settings saved');
        },
        onError: () => toast.error('Could not save emergency settings'),
      },
    );
  };

  const partnerFallback = partnerName.trim() || 'Brother';
  const sampleLocation = 'https://maps.google.com/?q=53.5461,-113.4938';
  const smsPreview = attachLocation
    ? `Hey ${partnerFallback}, I'm using the SOS tool on Iron Sharpens Iron. Facing a strong urge right now and need support. Location: ${sampleLocation}`
    : `Hey ${partnerFallback}, I'm using the SOS tool on Iron Sharpens Iron. Facing a strong urge right now and could use a quick call or text.`;

  const handleTestSMS = () => {
    const body = encodeURIComponent(`[TEST] ${smsPreview}`);
    const to = phoneError ? '' : partnerPhone.trim().replace(/[^\d+]/g, '');
    const separator = /iPhone|iPad|Macintosh/.test(navigator.userAgent) ? '&' : '?';
    window.location.href = `sms:${to}${separator}body=${body}`;
  };

  const handleSaveReminder = () => {
    if (reminderError) {
      toast.error(reminderError);
      return;
    }
    updatePrefs.mutate(
      { reminder_time: `${reminderTime}:00`, habit_reminders_enabled: true },
      {
        onSuccess: () => {
          setReminderSaved(true);
          setTimeout(() => setReminderSaved(false), 2500);
          toast.success(`Morning reminder set for ${reminderTime}`);
        },
        onError: () => toast.error('Could not save reminder time'),
      },
    );
  };

  const handleChangePassword = async () => {
    if (!user?.email) return;
    const { error } = await supabase.auth.resetPasswordForEmail(user.email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    if (error) toast.error('Could not send reset email');
    else toast.success('Password reset link sent to your email');
  };

  const handleSignOut = async () => {
    await signOut();
    toast.success('Signed out successfully');
    navigate('/');
  };

  const handleExport = async () => {
    if (!user) return;
    try {
      const [journal, habits, completions] = await Promise.all([
        supabase.from('journal_entries').select('*').eq('user_id', user.id),
        supabase.from('habits').select('*').eq('user_id', user.id),
        supabase.from('habit_completions').select('*').eq('user_id', user.id),
      ]);
      const payload = {
        exported_at: new Date().toISOString(),
        profile,
        journal_entries: journal.data ?? [],
        habits: habits.data ?? [],
        habit_completions: completions.data ?? [],
      };
      const blob = new Blob([JSON.stringify(payload, null, 2)], {
        type: 'application/json',
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `iron-sharpens-iron-export-${new Date().toISOString().slice(0, 10)}.json`;
      a.click();
      URL.revokeObjectURL(url);
      toast.success('Your data has been exported');
    } catch {
      toast.error('Export failed. Please try again.');
    }
  };

  const handleDeleteAccount = async () => {
    if (!user) return;
    try {
      await Promise.all([
        supabase.from('journal_entries').delete().eq('user_id', user.id),
        supabase.from('habit_completions').delete().eq('user_id', user.id),
        supabase.from('habits').delete().eq('user_id', user.id),
        supabase.from('notification_preferences').delete().eq('user_id', user.id),
        supabase.from('push_subscriptions').delete().eq('user_id', user.id),
      ]);
      await supabase.from('profiles').delete().eq('user_id', user.id);
      await signOut();
      setDeleteOpen(false);
      toast.success('Your data has been deleted');
      navigate('/');
    } catch {
      toast.error('Could not delete account. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto max-w-3xl px-4 pt-24 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="font-heading text-3xl font-bold">
            Profile <span className="text-primary">&amp; Settings</span>
          </h1>
          <p className="mt-1 text-muted-foreground">
            Manage your account, emergency plan, and privacy.
          </p>
        </motion.div>

        {isLoading ? (
          <div className="flex justify-center py-16">
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
          </div>
        ) : (
          <div className="space-y-6">
            <SectionCard icon={<User className="h-5 w-5" />} title="Account Info">
              <div className="space-y-2">
                <Label htmlFor="displayName">Display Name</Label>
                <Input
                  id="displayName"
                  value={displayName}
                  maxLength={60}
                  onChange={(e) => setDisplayName(e.target.value)}
                  placeholder="Your name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="flex items-center gap-2 rounded-lg border border-border bg-muted/40 px-3 py-2 text-sm text-muted-foreground">
                  <Mail className="h-4 w-4" />
                  <span className="truncate">{user?.email}</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 pt-1">
                <Button onClick={handleSaveAccount} disabled={updateProfile.isPending}>
                  Save Changes
                </Button>
                <Button variant="outline" onClick={handleChangePassword}>
                  <KeyRound className="mr-2 h-4 w-4" />
                  Change Password
                </Button>
                <Button variant="ghost" onClick={handleSignOut}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Log Out
                </Button>
              </div>
            </SectionCard>

            <SectionCard
              icon={<LifeBuoy className="h-5 w-5" />}
              title="Emergency SOS Settings"
              description="Your 1-tap lifeline when an urge hits."
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="partnerName">Accountability Partner Name</Label>
                  <Input
                    id="partnerName"
                    value={partnerName}
                    maxLength={60}
                    onBlur={() => setSosTouched(true)}
                    onChange={(e) => setPartnerName(e.target.value)}
                    placeholder="John"
                    aria-invalid={sosTouched && !!nameError}
                    className={sosTouched && nameError ? 'border-destructive focus-visible:ring-destructive' : ''}
                  />
                  {sosTouched && nameError && (
                    <p className="flex items-center gap-1.5 text-xs text-destructive">
                      <AlertCircle className="h-3.5 w-3.5" />
                      {nameError}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="partnerPhone">Phone Number</Label>
                  <Input
                    id="partnerPhone"
                    type="tel"
                    value={partnerPhone}
                    maxLength={25}
                    onBlur={() => setSosTouched(true)}
                    onChange={(e) => setPartnerPhone(e.target.value)}
                    placeholder="+1 555 123 4567"
                    aria-invalid={sosTouched && !!phoneError}
                    className={sosTouched && phoneError ? 'border-destructive focus-visible:ring-destructive' : ''}
                  />
                  {sosTouched && phoneError ? (
                    <p className="flex items-center gap-1.5 text-xs text-destructive">
                      <AlertCircle className="h-3.5 w-3.5" />
                      {phoneError}
                    </p>
                  ) : (
                    <p className="text-xs text-muted-foreground">
                      Include country/area code, e.g. +1 555 123 4567.
                    </p>
                  )}
                </div>
              </div>
              <div className="flex items-start justify-between gap-4 rounded-lg border border-border bg-muted/30 p-3">
                <div className="flex gap-2">
                  <MapPin className="mt-0.5 h-4 w-4 text-primary" />
                  <div>
                    <p className="text-sm font-medium">
                      Attach Google Maps location link to emergency SMS alerts
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Your partner can see where you are when you text for help.
                    </p>
                  </div>
                </div>
                <Switch checked={attachLocation} onCheckedChange={setAttachLocation} />
              </div>
              <Button onClick={handleSaveSOS} disabled={updateProfile.isPending}>
                Save Emergency Settings
              </Button>

              <div className="space-y-3 rounded-xl border border-primary/30 bg-slate-900/60 p-4">
                <div className="flex items-center gap-2">
                  <Smartphone className="h-4 w-4 text-primary" />
                  <p className="text-sm font-semibold text-foreground">SOS SMS Preview</p>
                  <span className="ml-auto rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                    {attachLocation ? 'With location' : 'No location'}
                  </span>
                </div>
                <div className="flex justify-start">
                  <div className="relative max-w-[92%] rounded-2xl rounded-tl-sm border border-primary/40 bg-slate-800/90 px-4 py-3 shadow-sm">
                    <div className="absolute -left-1.5 top-0 h-3 w-3 -translate-y-1/2 rotate-45 rounded-sm bg-slate-800/90" />
                    <div className="relative flex items-start gap-2">
                      <MessageSquare className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      <p className="whitespace-pre-wrap text-sm leading-relaxed text-foreground">
                        {smsPreview}
                      </p>
                    </div>
                    <p className="relative mt-2 text-right text-[10px] text-muted-foreground">
                      SMS · now
                    </p>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">
                  This is the exact message your accountability partner will receive when you tap
                  “Send Text Alert” in the SOS modal.
                </p>
              </div>
            </SectionCard>

            <SectionCard
              icon={<Bell className="h-5 w-5" />}
              title="Notification Preferences"
            >
              <div className="space-y-2">
                <Label htmlFor="reminderTime">Daily Surrender Morning Reminder</Label>
                <Input
                  id="reminderTime"
                  type="time"
                  value={reminderTime}
                  onChange={(e) => setReminderTime(e.target.value)}
                  className="max-w-40"
                />
              </div>
              <Button onClick={handleSaveReminder} disabled={updatePrefs.isPending}>
                Save Reminder Time
              </Button>
            </SectionCard>

            <SectionCard
              icon={<ShieldCheck className="h-5 w-5" />}
              title="Privacy &amp; Security"
              description="100% confidential. Your journal and habits are private to you — never sold, never shared, never visible to other members."
            >
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" onClick={handleExport}>
                  <Download className="mr-2 h-4 w-4" />
                  Export Journal &amp; Habit Data
                </Button>
                <Button variant="destructive" onClick={() => setDeleteOpen(true)}>
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete Account
                </Button>
              </div>
            </SectionCard>
          </div>
        )}
      </main>

      <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete your account?</AlertDialogTitle>
            <AlertDialogDescription>
              This permanently deletes your journal entries, habits, streaks, and
              settings. This cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteAccount}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Yes, delete everything
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Footer />
    </div>
  );
};

export default Profile;
