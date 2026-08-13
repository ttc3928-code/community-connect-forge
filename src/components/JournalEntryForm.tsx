import React, { useState, useRef, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  BookOpen,
  X,
  Trophy,
  AlertTriangle,
  Loader2,
  Mic,
  MicOff,
  ImagePlus,
  Pencil
} from 'lucide-react';
import { useSpeechRecognition } from '@/hooks/useSpeechRecognition';
import { toast } from 'sonner';

interface JournalEntryFormProps {
  initialTitle?: string;
  initialContent?: string;
  initialCategory?: 'reflection' | 'struggle' | 'victory';
  initialImageUrl?: string | null;
  onSave: (data: { title: string; content: string; category: string; imageFile: File | null; removeExistingImage: boolean }) => Promise<void>;
  onCancel: () => void;
  isSaving: boolean;
  mode: 'create' | 'edit';
}

const typeIcons = {
  reflection: BookOpen,
  struggle: AlertTriangle,
  victory: Trophy,
};

export const JournalEntryForm: React.FC<JournalEntryFormProps> = ({
  initialTitle = '',
  initialContent = '',
  initialCategory = 'reflection',
  initialImageUrl = null,
  onSave,
  onCancel,
  isSaving,
  mode,
}) => {
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);
  const [selectedType, setSelectedType] = useState<'reflection' | 'struggle' | 'victory'>(initialCategory);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [existingImageUrl, setExistingImageUrl] = useState<string | null>(initialImageUrl);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleContentVoice = useCallback((text: string) => {
    setContent(prev => (!prev.trim() ? text : prev + ' ' + text));
  }, []);
  const handleTitleVoice = useCallback((text: string) => {
    setTitle(prev => (!prev.trim() ? text : prev + ' ' + text));
  }, []);

  const { isListening, isSupported: isVoiceSupported, toggle: toggleVoice } = useSpeechRecognition(handleContentVoice);
  const { isListening: isTitleListening, toggle: toggleTitleVoice } = useSpeechRecognition(handleTitleVoice);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) { toast.error('Please select an image file'); return; }
    if (file.size > 5 * 1024 * 1024) { toast.error('Image must be under 5MB'); return; }
    setSelectedImage(file);
    setImagePreview(URL.createObjectURL(file));
    setExistingImageUrl(null);
  };

  const removeImage = () => {
    setSelectedImage(null);
    if (imagePreview) URL.revokeObjectURL(imagePreview);
    setImagePreview(null);
    setExistingImageUrl(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSubmit = async () => {
    if (!title.trim() || !content.trim()) {
      toast.error('Please fill in both title and content');
      return;
    }
    const removeExistingImage = initialImageUrl !== null && existingImageUrl === null && !selectedImage;
    await onSave({ title, content, category: selectedType, imageFile: selectedImage, removeExistingImage });
  };

  const displayImageUrl = imagePreview || existingImageUrl;

  return (
    <Card variant="glow" className="mb-6">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {mode === 'edit' ? <Pencil className="w-4 h-4 text-primary" /> : <span className="text-primary">✝</span>}
            <CardTitle>{mode === 'edit' ? 'Edit Entry' : 'Write Your Heart'}</CardTitle>
          </div>
          <Button variant="ghost" size="icon" onClick={onCancel}>
            <X className="w-5 h-5" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Title */}
        <div className="relative">
          <input
            type="text"
            placeholder="Entry title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-3 pr-12 rounded-lg bg-input border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
          {isVoiceSupported && (
            <Button type="button" variant={isTitleListening ? 'destructive' : 'ghost'} size="icon"
              className="absolute top-1/2 -translate-y-1/2 right-2 h-8 w-8" onClick={toggleTitleVoice}
              title={isTitleListening ? 'Stop recording' : 'Voice input for title'}>
              {isTitleListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
            </Button>
          )}
        </div>

        {/* Category */}
        <div className="flex flex-wrap gap-2">
          {(['reflection', 'struggle', 'victory'] as const).map((type) => {
            const Icon = typeIcons[type];
            return (
              <button key={type} onClick={() => setSelectedType(type)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${
                  selectedType === type ? 'bg-primary/10 border-primary text-primary' : 'bg-secondary/30 border-border hover:bg-secondary/50'
                }`}>
                <Icon className="w-4 h-4" />
                <span className="capitalize">{type}</span>
              </button>
            );
          })}
        </div>

        {/* Content */}
        <div className="relative">
          <textarea
            placeholder="Pour out your heart here... What's on your mind today?"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full h-32 px-4 py-3 pr-12 rounded-lg bg-input border border-border text-foreground placeholder:text-muted-foreground resize-none focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
          {isVoiceSupported && (
            <Button type="button" variant={isListening ? 'destructive' : 'ghost'} size="icon"
              className="absolute top-2 right-2 h-8 w-8" onClick={toggleVoice}
              title={isListening ? 'Stop recording' : 'Start voice input'}>
              {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
            </Button>
          )}
          {isListening && (
            <div className="absolute bottom-2 left-4 flex items-center gap-2 text-xs text-destructive">
              <span className="w-2 h-2 rounded-full bg-destructive animate-pulse" />
              Listening...
            </div>
          )}
        </div>

        {/* Image Upload */}
        <div>
          <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageSelect} className="hidden" />
          {displayImageUrl ? (
            <div className="relative rounded-lg overflow-hidden border border-border">
              <img src={displayImageUrl} alt="Preview" className="w-full max-h-48 object-cover" />
              <Button type="button" variant="destructive" size="icon" className="absolute top-2 right-2 h-7 w-7" onClick={removeImage}>
                <X className="w-4 h-4" />
              </Button>
            </div>
          ) : (
            <Button type="button" variant="outline" className="w-full border-dashed" onClick={() => fileInputRef.current?.click()}>
              <ImagePlus className="w-4 h-4 mr-2" />
              Attach Image
            </Button>
          )}
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={onCancel}>Cancel</Button>
          <Button onClick={handleSubmit} disabled={isSaving}>
            {isSaving ? (
              <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Saving...</>
            ) : mode === 'edit' ? 'Update Entry' : 'Save Entry'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
