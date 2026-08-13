import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import {
  Wind,
  BookOpen,
  Phone,
  PenLine,
  ArrowLeft,
  ShieldCheck,
  MessageSquare,
  Trophy,
  X,
} from 'lucide-react';
import { useCreateJournalEntry } from '@/hooks/useJournalEntries';

interface SOSModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

type View = 'menu' | 'breathe' | 'sword' | 'call' | 'log' | 'logged';


const SWORD_VERSES = [
  {
    text: 'No temptation has overtaken you except what is common to mankind. And God is faithful; he will not let you be tempted beyond what you can bear.',
    reference: '1 Corinthians 10:13',
  },
  {
    text: 'Because he himself suffered when he was tempted, he is able to help those who are being tempted.',
    reference: 'Hebrews 2:18',
  },
  {
    text: 'Submit yourselves, then, to God. Resist the devil, and he will flee from you.',
    reference: 'James 4:7',
  },
  {
    text: 'No weapon forged against you will prevail.',
    reference: 'Isaiah 54:17',
  },
  {
    text: 'The Lord is my strength and my shield; my heart trusts in him, and he helps me.',
    reference: 'Psalm 28:7',
  },
  {
    text: 'Watch and pray so that you will not fall into temptation. The spirit is willing, but the flesh is weak.',
    reference: 'Matthew 26:41',
  },
];

const PRAYER =
  'Father, I stand in Your strength, not my own. This urge has no authority over me — I belong to Christ. Amen.';

const PARTNER_KEY = 'sos_accountability_partner';
const TRIGGERS = ['Boredom', 'Stress', 'Anger', 'Fatigue', 'Loneliness', 'Late night'];

const BOX_PHASES = [
  { label: 'Inhale', scale: 1.35 },
  { label: 'Hold', scale: 1.35 },
  { label: 'Exhale', scale: 0.75 },
  { label: 'Hold', scale: 0.75 },
] as const;

const BreathingExercise: React.FC = () => {
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setElapsed((e) => e + 1), 1000);
    return () => clearInterval(id);
  }, []);

  const total = 60;
  const remaining = Math.max(total - elapsed, 0);
  const phase = BOX_PHASES[Math.floor(elapsed / 4) % 4];
  const countInPhase = 4 - (elapsed % 4);

  return (
    <div className="flex flex-col items-center gap-6 py-4">
      <div className="relative flex h-52 w-52 items-center justify-center">
        <motion.div
          className="absolute inset-0 rounded-full bg-primary/10 border-2 border-primary/40"
          animate={{ scale: phase.scale }}
          transition={{ duration: 4, ease: 'easeInOut' }}
        />
        <div className="relative text-center">
          <p className="font-heading text-2xl font-bold uppercase tracking-widest text-primary">
            {phase.label}
          </p>
          <p className="text-4xl font-bold text-foreground">{countInPhase}</p>
        </div>
      </div>
      <p className="text-sm text-muted-foreground">
        {remaining > 0 ? `${remaining}s remaining — 4 in, 4 hold, 4 out, 4 hold` : 'Reset complete. You made it.'}
      </p>
    </div>
  );
};

export const SOSModal: React.FC<SOSModalProps> = ({ open, onOpenChange }) => {
  const [view, setView] = useState<View>('menu');
  const [verse, setVerse] = useState(SWORD_VERSES[0]);
  const [partner, setPartner] = useState({ name: '', phone: '' });
  const [trigger, setTrigger] = useState<string | null>(null);
  const [note, setNote] = useState('');
  const [editContact, setEditContact] = useState(false);

  const createEntry = useCreateJournalEntry();
  const initialized = useRef(false);

  useEffect(() => {
    if (!open) return;
    setView('menu');
    setEditContact(false);
    setVerse(SWORD_VERSES[Math.floor(Math.random() * SWORD_VERSES.length)]);

    if (!initialized.current) {
      try {
        const saved = localStorage.getItem(PARTNER_KEY);
        if (saved) setPartner(JSON.parse(saved));
      } catch {
        /* ignore */
      }
      initialized.current = true;
    }
  }, [open]);

  const savePartner = () => {
    try {
      localStorage.setItem(PARTNER_KEY, JSON.stringify(partner));
      setEditContact(false);
      toast.success('Accountability contact saved');
    } catch {
      toast.error('Could not save contact');
    }
  };


  const logVictory = () => {
    createEntry.mutate(
      {
        title: 'Victory in the moment',
        content: `I hit the emergency button and chose God's way instead.\n\n"${verse.text}" — ${verse.reference}`,
        category: 'Victory',
      },
      {
        onSuccess: () => toast.success('Victory logged. Well fought.'),
        onError: () => toast.error('Could not log it — but the victory still counts.'),
      },
    );
  };

  const submitLog = () => {
    createEntry.mutate(
      {
        title: `Trigger logged${trigger ? `: ${trigger}` : ''}`,
        content: note || 'Logged during an emergency moment.',
        category: 'Trigger',
      },
      {
        onSuccess: () => {
          toast.success('🏆 Victory Logged! Now step away — do your 15 pushups.', {
            duration: 6000,
          });
          setNote('');
          setTrigger(null);
          setView('logged');
        },

        onError: () => toast.error('Could not save the entry'),
      },
    );
  };

  const Header = (
    <div className="text-center space-y-2">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
        <ShieldCheck className="h-6 w-6 text-primary" />
      </div>
      <h2 className="font-heading text-2xl font-bold uppercase tracking-wide">Breathe & Pause</h2>
      <p className="text-sm text-muted-foreground">
        You are not alone in this battle. Step back for 60 seconds.
      </p>
    </div>
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-w-lg border-primary/30 [&>button]:hidden"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <div className="flex items-center justify-between">
          {view !== 'menu' ? (
            <Button variant="ghost" size="sm" onClick={() => setView('menu')} className="gap-1">
              <ArrowLeft className="h-4 w-4" /> Back
            </Button>
          ) : (
            <span />
          )}
          <Button variant="ghost" size="icon" aria-label="Close" onClick={() => onOpenChange(false)}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={view}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            className="space-y-5"
          >
            {view === 'menu' && (
              <>
                {Header}
                <div className="space-y-3">
                  <Button className="w-full justify-start gap-3 h-14" onClick={() => setView('breathe')}>
                    <Wind className="h-5 w-5" /> 60-Second Breathing / Grounding
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start gap-3 h-14"
                    onClick={() => setView('sword')}
                  >
                    <BookOpen className="h-5 w-5" /> Instant Scriptural Defense
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start gap-3 h-14"
                    onClick={() => setView('call')}
                  >
                    <Phone className="h-5 w-5" />{' '}
                    {partner.phone
                      ? `Call ${partner.name || 'your brother'} — 1 tap`
                      : 'Call / Text a Brother'}

                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full justify-start gap-3"
                    onClick={() => setView('log')}
                  >
                    <PenLine className="h-4 w-4" /> Log Trigger / Rapid Journal Entry
                  </Button>
                </div>
              </>
            )}

            {view === 'breathe' && (
              <>
                <h3 className="text-center font-heading text-xl font-bold uppercase">Box Breathing</h3>
                <BreathingExercise />
                <Button className="w-full" onClick={() => setView('sword')}>
                  I'm steadier — give me the Word
                </Button>
              </>
            )}

            {view === 'sword' && (
              <>
                <h3 className="text-center font-heading text-xl font-bold uppercase">Sword of the Spirit</h3>
                <div className="rounded-lg border-l-4 border-primary bg-secondary/40 p-5">
                  <p className="text-lg italic leading-relaxed text-foreground">"{verse.text}"</p>
                  <p className="mt-3 font-medium text-primary">— {verse.reference}</p>
                </div>
                <p className="text-sm text-muted-foreground italic">{PRAYER}</p>
                <Button className="w-full h-14" disabled={createEntry.isPending} onClick={logVictory}>
                  God, give me strength right now
                </Button>
                <Button
                  variant="ghost"
                  className="w-full"
                  onClick={() => setVerse(SWORD_VERSES[Math.floor(Math.random() * SWORD_VERSES.length)])}
                >
                  Another verse
                </Button>
              </>
            )}

            {view === 'call' && (
              <>
                <h3 className="text-center font-heading text-xl font-bold uppercase">Reach Out</h3>
                <p className="text-center text-sm text-muted-foreground">
                  Reach out before you slip. One call breaks the isolation.
                </p>
                {partner.phone ? (
                  <div className="space-y-3">
                    <a href={`tel:${partner.phone}`} className="block">
                      <Button className="w-full h-14 gap-2">
                        <Phone className="h-5 w-5" /> Call {partner.name || 'your brother'} (Accountability Partner)
                      </Button>
                    </a>
                    <a
                      href={`sms:${partner.phone}?&body=${encodeURIComponent(
                        "Emergency check-in: I'm in the fight right now and need prayer. Can you talk?",
                      )}`}
                      className="block"
                    >
                      <Button variant="outline" className="w-full h-14 gap-2">
                        <MessageSquare className="h-5 w-5" /> Text Emergency Alert
                      </Button>
                    </a>
                    {!editContact && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-full"
                        onClick={() => setEditContact(true)}
                      >
                        Change contact
                      </Button>
                    )}
                  </div>
                ) : null}
                {(!partner.phone || editContact) && (
                  <div className="space-y-2 pt-2">
                    <p className="text-xs uppercase tracking-wide text-muted-foreground">
                      {partner.phone ? 'Update contact' : 'Add your accountability contact'}
                    </p>
                    <Input
                      placeholder="Name"
                      value={partner.name}
                      onChange={(e) => setPartner((p) => ({ ...p, name: e.target.value }))}
                    />
                    <Input
                      placeholder="Phone number"
                      inputMode="tel"
                      value={partner.phone}
                      onChange={(e) => setPartner((p) => ({ ...p, phone: e.target.value }))}
                    />
                    <Button variant="outline" className="w-full" onClick={savePartner}>
                      Save contact
                    </Button>
                  </div>
                )}
              </>
            )}

            {view === 'log' && (
              <>
                <h3 className="text-center font-heading text-xl font-bold uppercase">Log the Trigger</h3>
                <div className="flex flex-wrap gap-2">
                  {TRIGGERS.map((t) => (
                    <Button
                      key={t}
                      size="sm"
                      variant={trigger === t ? 'default' : 'outline'}
                      onClick={() => setTrigger(t === trigger ? null : t)}
                    >
                      {t}
                    </Button>
                  ))}
                </div>
                <textarea
                  className="w-full min-h-28 rounded-md border border-input bg-background p-3 text-sm"
                  placeholder="What's happening right now?"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                />
                <Button className="w-full" disabled={createEntry.isPending} onClick={submitLog}>
                  Save entry
                </Button>
                <p className="text-center text-xs text-muted-foreground">
                  Then move your body: 15 pushups, cold water on your face, or step outside for 2 minutes.
                </p>
              </>
            )}

            {view === 'logged' && (
              <div className="space-y-5 py-2 text-center">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 18 }}
                  className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/15"
                >
                  <Trophy className="h-8 w-8 text-primary" />
                </motion.div>
                <h3 className="font-heading text-2xl font-bold uppercase tracking-wide">
                  Victory Logged!
                </h3>
                <p className="text-base font-medium text-foreground">
                  Now step away — do your 15 pushups.
                </p>
                <p className="text-sm text-muted-foreground">
                  Cold water on your face or 2 minutes outside works too. Move now.
                </p>
                <Button className="w-full h-14" onClick={() => onOpenChange(false)}>
                  I'm moving
                </Button>
                <Button variant="ghost" className="w-full" onClick={() => setView('menu')}>
                  Back to tools
                </Button>
              </div>
            )}

          </motion.div>
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
};
