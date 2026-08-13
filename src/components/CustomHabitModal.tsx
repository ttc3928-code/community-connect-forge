import React, { useState, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { communityClient as supabase } from '@/lib/community-client';
import { useAuth } from '@/contexts/AuthContext';
import {
  Plus,
  Hand,
  Check,
  Search,
  Loader2,
  Upload,
  ImageIcon,
  X,
  // Wellness
  PersonStanding,
  Dumbbell,
  Droplets,
  Apple,
  // Spiritual
  BookOpen,
  HandHeart,
  Cross,
  Heart,
  // Lifestyle
  Coffee,
  PenLine,
  PhoneOff,
  Clock,
  // Food
  UtensilsCrossed,
  Salad,
  ShoppingBag,
  Cookie,
  // Generic/Fallback
  CircleDot,
  Star,
  Zap,
  Target,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface IconOption {
  key: string;
  Icon: LucideIcon;
  label: string;
  keywords: string[];
  category: 'wellness' | 'spiritual' | 'lifestyle' | 'food' | 'generic';
  color: string;
  bg: string;
}

const iconOptions: IconOption[] = [
  // Wellness (4)
  { key: 'running', Icon: PersonStanding, label: 'Running', keywords: ['run', 'exercise', 'fitness', 'jog'], category: 'wellness', color: 'text-green-400', bg: 'bg-green-400/10' },
  { key: 'dumbbell', Icon: Dumbbell, label: 'Workout', keywords: ['gym', 'workout', 'exercise', 'lift', 'weight'], category: 'wellness', color: 'text-amber-500', bg: 'bg-amber-500/10' },
  { key: 'water', Icon: Droplets, label: 'Water', keywords: ['water', 'hydrate', 'drink', 'hydration'], category: 'wellness', color: 'text-cyan-400', bg: 'bg-cyan-400/10' },
  { key: 'apple', Icon: Apple, label: 'Healthy', keywords: ['apple', 'fruit', 'healthy', 'nutrition'], category: 'wellness', color: 'text-red-400', bg: 'bg-red-400/10' },
  
  // Spiritual (4)
  { key: 'book', Icon: BookOpen, label: 'Bible', keywords: ['bible', 'book', 'read', 'scripture', 'devotion'], category: 'spiritual', color: 'text-amber-400', bg: 'bg-amber-400/10' },
  { key: 'pray', Icon: HandHeart, label: 'Prayer', keywords: ['pray', 'prayer', 'hands', 'worship'], category: 'spiritual', color: 'text-rose-400', bg: 'bg-rose-400/10' },
  { key: 'cross', Icon: Cross, label: 'Faith', keywords: ['cross', 'faith', 'church', 'jesus', 'christ'], category: 'spiritual', color: 'text-purple-400', bg: 'bg-purple-400/10' },
  { key: 'heart', Icon: Heart, label: 'Love', keywords: ['heart', 'love', 'gratitude', 'thanks'], category: 'spiritual', color: 'text-pink-400', bg: 'bg-pink-400/10' },
  
  // Lifestyle (4)
  { key: 'coffee', Icon: Coffee, label: 'Coffee', keywords: ['coffee', 'morning', 'caffeine', 'drink'], category: 'lifestyle', color: 'text-amber-600', bg: 'bg-amber-600/10' },
  { key: 'journal', Icon: PenLine, label: 'Journal', keywords: ['journal', 'write', 'pen', 'notebook', 'note'], category: 'lifestyle', color: 'text-teal-400', bg: 'bg-teal-400/10' },
  { key: 'phone', Icon: PhoneOff, label: 'No Phone', keywords: ['phone', 'screen', 'digital', 'detox', 'social'], category: 'lifestyle', color: 'text-indigo-400', bg: 'bg-indigo-400/10' },
  { key: 'clock', Icon: Clock, label: 'Routine', keywords: ['clock', 'time', 'schedule', 'routine', 'sleep', 'wake'], category: 'lifestyle', color: 'text-slate-400', bg: 'bg-slate-400/10' },
  
  // Food (4)
  { key: 'utensils', Icon: UtensilsCrossed, label: 'Eating', keywords: ['eat', 'food', 'meal', 'fast', 'fasting', 'binge'], category: 'food', color: 'text-orange-400', bg: 'bg-orange-400/10' },
  { key: 'salad', Icon: Salad, label: 'Healthy Food', keywords: ['salad', 'vegetable', 'healthy', 'diet'], category: 'food', color: 'text-green-500', bg: 'bg-green-500/10' },
  { key: 'shopping', Icon: ShoppingBag, label: 'Shopping', keywords: ['shop', 'shopping', 'buy', 'spend'], category: 'food', color: 'text-violet-400', bg: 'bg-violet-400/10' },
  { key: 'snack', Icon: Cookie, label: 'Snacks', keywords: ['snack', 'cookie', 'junk', 'sugar', 'sweets'], category: 'food', color: 'text-yellow-500', bg: 'bg-yellow-500/10' },
  
  // Generic (4)
  { key: 'circle', Icon: CircleDot, label: 'Custom A', keywords: ['a', 'custom', 'other', 'general'], category: 'generic', color: 'text-blue-400', bg: 'bg-blue-400/10' },
  { key: 'star', Icon: Star, label: 'Custom B', keywords: ['b', 'star', 'goal', 'achievement'], category: 'generic', color: 'text-yellow-400', bg: 'bg-yellow-400/10' },
  { key: 'zap', Icon: Zap, label: 'Custom C', keywords: ['c', 'energy', 'power', 'boost'], category: 'generic', color: 'text-amber-400', bg: 'bg-amber-400/10' },
  { key: 'target', Icon: Target, label: 'Goal', keywords: ['target', 'goal', 'aim', 'focus'], category: 'generic', color: 'text-red-500', bg: 'bg-red-500/10' },
];

interface CustomHabitModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (name: string, icon: string, type: 'build' | 'stop') => Promise<void>;
  isPending: boolean;
}

export const CustomHabitModal: React.FC<CustomHabitModalProps> = ({
  isOpen,
  onClose,
  onSave,
  isPending,
}) => {
  const { user } = useAuth();
  const [habitType, setHabitType] = useState<'build' | 'stop'>('build');
  const [habitName, setHabitName] = useState('');
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [customImageUrl, setCustomImageUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Filter icons based on search
  const filteredIcons = useMemo(() => {
    if (!searchQuery.trim()) return iconOptions;
    const query = searchQuery.toLowerCase();
    return iconOptions.filter(
      (icon) =>
        icon.label.toLowerCase().includes(query) ||
        icon.keywords.some((kw) => kw.includes(query))
    );
  }, [searchQuery]);

  // Get final habit name with "Stop " prefix if needed
  const getFinalName = () => {
    let name = habitName.trim();
    if (habitType === 'stop' && name && !name.toLowerCase().startsWith('stop ')) {
      return `Stop ${name}`;
    }
    return name;
  };

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !user) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setUploadError('Please select an image file');
      return;
    }

    // Validate file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      setUploadError('Image must be less than 2MB');
      return;
    }

    setIsUploading(true);
    setUploadError(null);

    try {
      // Generate unique filename
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `${user.id}/${fileName}`;

      // Upload to Supabase storage
      const { error: uploadError } = await supabase.storage
        .from('habit-icons')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: signed } = await supabase.storage
        .from('habit-icons')
        .createSignedUrl(filePath, 60 * 60 * 24 * 365);

      setCustomImageUrl(signed?.signedUrl ?? '');
      setSelectedIcon(null); // Deselect any preset icon
    } catch (error) {
      console.error('Upload error:', error);
      setUploadError('Failed to upload image. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemoveCustomImage = () => {
    setCustomImageUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSave = async () => {
    if (!habitName.trim()) return;
    
    // Use custom image URL if uploaded, otherwise use selected icon key
    const iconValue = customImageUrl || selectedIcon;
    if (!iconValue) return;
    
    await onSave(habitName.trim(), iconValue, habitType);
    // Reset state
    setHabitType('build');
    setHabitName('');
    setSelectedIcon(null);
    setSearchQuery('');
    setCustomImageUrl(null);
    setUploadError(null);
  };

  const handleClose = () => {
    setHabitType('build');
    setHabitName('');
    setSelectedIcon(null);
    setSearchQuery('');
    setCustomImageUrl(null);
    setUploadError(null);
    onClose();
  };

  const canSave = habitName.trim().length > 0 && (selectedIcon !== null || customImageUrl !== null);

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto bg-slate-900 border-slate-700/50">
        <DialogHeader>
          <DialogTitle className="text-xl text-white">Create Custom Habit</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Step 1: Type Toggle */}
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-2">
              1. What kind of habit?
            </label>
            <div className="flex rounded-xl bg-slate-800 p-1">
              <button
                type="button"
                onClick={() => setHabitType('build')}
                className={cn(
                  'flex-1 px-4 py-3 rounded-lg text-sm font-medium transition-all',
                  habitType === 'build'
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-slate-700'
                )}
              >
                <span className="flex items-center justify-center gap-2">
                  <Plus className="w-4 h-4" />
                  Build new habit
                </span>
              </button>
              <button
                type="button"
                onClick={() => setHabitType('stop')}
                className={cn(
                  'flex-1 px-4 py-3 rounded-lg text-sm font-medium transition-all',
                  habitType === 'stop'
                    ? 'bg-red-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-slate-700'
                )}
              >
                <span className="flex items-center justify-center gap-2">
                  <Hand className="w-4 h-4" />
                  Stop bad habit
                </span>
              </button>
            </div>
            <p className="text-xs text-slate-500 mt-2">
              {habitType === 'build'
                ? 'A check mark means "I did this good habit today"'
                : 'A check mark means "I successfully avoided this today"'}
            </p>
          </div>

          {/* Step 2: Name Field */}
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-2">
              2. Name your habit
            </label>
            <Input
              type="text"
              placeholder={habitType === 'build' ? 'e.g., Morning run' : 'e.g., Junk food'}
              value={habitName}
              onChange={(e) => setHabitName(e.target.value)}
              className="text-base bg-slate-800 border-slate-700 text-white placeholder:text-slate-500"
            />
            {habitName.trim() && habitType === 'stop' && !habitName.toLowerCase().startsWith('stop ') && (
              <p className="text-sm text-slate-400 mt-2">
                Will be saved as: <span className="font-medium text-white">{getFinalName()}</span>
              </p>
            )}
          </div>

          {/* Step 3: Icon Picker */}
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-2">
              3. Pick an icon
            </label>

            {/* Custom Image Upload */}
            <div className="mb-4">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
              />
              
              {customImageUrl ? (
                <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-800 border-2 border-primary">
                  <div className="w-12 h-12 rounded-lg overflow-hidden bg-slate-700 flex-shrink-0">
                    <img 
                      src={customImageUrl} 
                      alt="Custom icon" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-white font-medium">Custom image uploaded</p>
                    <p className="text-xs text-slate-400">Your image will be used as the habit icon</p>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={handleRemoveCustomImage}
                    className="text-slate-400 hover:text-white"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isUploading}
                  className={cn(
                    'w-full flex items-center gap-3 p-3 rounded-xl bg-slate-800/60 border-2 border-dashed border-slate-600',
                    'hover:border-slate-500 hover:bg-slate-800 transition-all',
                    'text-slate-400 hover:text-slate-300',
                    isUploading && 'opacity-50 cursor-not-allowed'
                  )}
                >
                  {isUploading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <Upload className="w-5 h-5" />
                  )}
                  <div className="flex-1 text-left">
                    <p className="text-sm font-medium">
                      {isUploading ? 'Uploading...' : 'Upload custom image'}
                    </p>
                    <p className="text-xs text-slate-500">PNG, JPG up to 2MB</p>
                  </div>
                  <ImageIcon className="w-5 h-5" />
                </button>
              )}
              
              {uploadError && (
                <p className="text-sm text-red-400 mt-2">{uploadError}</p>
              )}
            </div>

            <div className="relative flex items-center gap-2 mb-3">
              <div className="flex-1 h-px bg-slate-700" />
              <span className="text-xs text-slate-500">or choose from presets</span>
              <div className="flex-1 h-px bg-slate-700" />
            </div>
            
            {/* Search Bar */}
            <div className="relative mb-3">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <Input
                type="text"
                placeholder="Type to filter icons..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 text-sm bg-slate-800 border-slate-700 text-white placeholder:text-slate-500"
              />
            </div>

            {/* Icon Grid (4x5 = 20 icons) */}
            <div className="grid grid-cols-5 gap-2 max-h-[200px] overflow-y-auto p-1">
              <AnimatePresence mode="popLayout">
                {filteredIcons.map((icon) => {
                  const IconComp = icon.Icon;
                  const isSelected = selectedIcon === icon.key && !customImageUrl;
                  
                  return (
                    <motion.button
                      key={icon.key}
                      layout
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.15 }}
                      type="button"
                      onClick={() => {
                        setSelectedIcon(icon.key);
                        setCustomImageUrl(null); // Clear custom image when selecting preset
                      }}
                      className={cn(
                        'relative aspect-square rounded-xl flex flex-col items-center justify-center gap-1 p-2 transition-all',
                        'border-2',
                        isSelected
                          ? 'border-primary bg-primary/20 ring-2 ring-primary/30'
                          : 'border-transparent bg-slate-800/60 hover:bg-slate-700/80'
                      )}
                      title={icon.label}
                    >
                      <div className="w-8 h-8 rounded-full flex items-center justify-center bg-slate-700/50">
                        <IconComp className="w-5 h-5 text-white/90" />
                      </div>
                      {isSelected && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-primary flex items-center justify-center"
                        >
                          <Check className="w-3 h-3 text-primary-foreground" />
                        </motion.div>
                      )}
                      <span className="text-[10px] text-slate-400 truncate w-full text-center">
                        {icon.label}
                      </span>
                    </motion.button>
                  );
                })}
              </AnimatePresence>
            </div>

            {filteredIcons.length === 0 && (
              <p className="text-sm text-slate-500 text-center py-4">
                No icons match "{searchQuery}"
              </p>
            )}
          </div>
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="outline" onClick={handleClose} className="border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white">
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={!canSave || isPending || isUploading}>
            {isPending ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <>
                <Check className="w-4 h-4 mr-2" />
                Save Habit
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
