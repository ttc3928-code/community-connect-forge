import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export interface PresetHabit {
  name: string;
  icon: string;
  IconComponent: React.ComponentType<{ className?: string }>;
  color: string;
  bg: string;
}

interface AddHabitOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPreset: (preset: PresetHabit, type: 'build' | 'stop') => void;
  onCustomHabit: () => void;
  goodHabits: PresetHabit[];
  badHabits: PresetHabit[];
  addedHabitNames?: string[];
}

export const AddHabitOverlay: React.FC<AddHabitOverlayProps> = ({
  isOpen,
  onClose,
  onSelectPreset,
  onCustomHabit,
  goodHabits,
  badHabits,
  addedHabitNames = [],
}) => {
  const [activeTab, setActiveTab] = useState<'build' | 'stop'>('build');

  const currentPresets = activeTab === 'build' ? goodHabits : badHabits;

  const isAdded = (name: string) => {
    const finalName = activeTab === 'stop' && !name.toLowerCase().startsWith('stop ')
      ? `Stop ${name}`
      : name;
    return addedHabitNames.some((n) => n.toLowerCase() === finalName.toLowerCase());
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />
          
          {/* Overlay Panel */}
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed left-1/2 top-[15%] -translate-x-1/2 w-[90%] max-w-lg z-50"
          >
            <div className="bg-slate-900 border border-slate-700/50 rounded-2xl shadow-2xl overflow-hidden">
              {/* Header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-slate-700/50 bg-slate-800/50">
                <h2 className="font-heading text-xl font-bold text-white">Pick a habit to track</h2>
                <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8 text-slate-400 hover:text-white hover:bg-slate-700">
                  <X className="w-5 h-5" />
                </Button>
              </div>

              {/* Tabs */}
              <div className="px-5 pt-4">
                <div className="flex gap-2">
                  <button
                    onClick={() => setActiveTab('build')}
                    className={cn(
                      "flex-1 py-2.5 px-4 rounded-lg font-medium text-sm transition-all",
                      activeTab === 'build'
                        ? "bg-primary text-primary-foreground"
                        : "bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white"
                    )}
                  >
                    Good habits to build
                  </button>
                  <button
                    onClick={() => setActiveTab('stop')}
                    className={cn(
                      "flex-1 py-2.5 px-4 rounded-lg font-medium text-sm transition-all",
                      activeTab === 'stop'
                        ? "bg-red-600 text-white"
                        : "bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white"
                    )}
                  >
                    Stop bad habits
                  </button>
                </div>
              </div>

              {/* Preset Grid */}
              <div className="px-5 py-4">
                <div className="grid grid-cols-4 gap-3">
                  {currentPresets.map((preset, index) => {
                    const IconComp = preset.IconComponent;
                    const added = isAdded(preset.name);
                    return (
                      <motion.button
                        key={preset.name}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.03 }}
                        onClick={() => onSelectPreset(preset, activeTab)}
                        className={cn(
                          "flex flex-col items-center justify-center gap-2 p-3 rounded-xl",
                          "bg-slate-800/60 border border-slate-700/50 hover:bg-slate-700/80 transition-all hover:scale-[1.03]",
                          "focus:outline-none focus:ring-2 focus:ring-primary/50",
                          added && "border-primary/60"
                        )}
                      >
                        <div className="relative w-10 h-10 rounded-full flex items-center justify-center bg-slate-700/50">
                          <IconComp className="w-6 h-6 text-white/90" />
                          {added && (
                            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-primary flex items-center justify-center">
                              <Check className="w-3 h-3 text-primary-foreground" />
                            </span>
                          )}
                        </div>
                        <span className="text-xs font-medium text-slate-300 text-center leading-tight">
                          {preset.name}
                        </span>
                      </motion.button>
                    );
                  })}
                </div>
              </div>

              {/* Custom Habit Button */}
              <div className="px-5 pb-5 space-y-3">
                <button
                  onClick={onCustomHabit}
                  className={cn(
                    "w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl",
                    "border border-dashed border-slate-600 bg-slate-800/30 hover:bg-slate-700/50 transition-all",
                    "text-sm font-medium text-slate-400 hover:text-white"
                  )}
                >
                  <Sparkles className="w-4 h-4" />
                  Custom habit...
                </button>
                <p className="text-center text-xs text-slate-500">
                  Add as many as you like — the list stays open.
                </p>
                <Button onClick={onClose} className="w-full">
                  Done
                </Button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
