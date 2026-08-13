import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from '@/lib/router-compat';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  BookOpen, 
  Plus,
  Trophy,
  AlertTriangle,
  Calendar,
  Loader2,
  Lock,
  Trash2,
  Pencil
} from 'lucide-react';
import { JournalEntryForm } from '@/components/JournalEntryForm';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useAuth } from '@/contexts/AuthContext';
import { useJournalEntries, useCreateJournalEntry, useUpdateJournalEntry, useDeleteJournalEntry } from '@/hooks/useJournalEntries';
import { communityClient as supabase } from '@/lib/community-client';
import { toast } from 'sonner';
import { format } from 'date-fns';

const Journal = () => {
  const { user, loading: authLoading } = useAuth();
  const { data: entries = [], isLoading } = useJournalEntries();
  const createEntry = useCreateJournalEntry();
  const updateEntry = useUpdateJournalEntry();
  const deleteEntry = useDeleteJournalEntry();

  const [showNewEntry, setShowNewEntry] = useState(false);
  const [editingEntryId, setEditingEntryId] = useState<string | null>(null);
  const [viewingEntryId, setViewingEntryId] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const viewingEntry = entries.find((e) => e.id === viewingEntryId) ?? null;

  const typeIcons = {
    reflection: BookOpen,
    struggle: AlertTriangle,
    victory: Trophy,
  };

  const typeColors = {
    reflection: 'text-blue-400',
    struggle: 'text-orange-400',
    victory: 'text-primary',
  };

  const uploadImage = async (file: File): Promise<string> => {
    if (!user) throw new Error('Not authenticated');
    const fileExt = (file.name.split('.').pop() || 'jpg').toLowerCase();
    const filePath = `${user.id}/${Date.now()}.${fileExt}`;

    let lastError: unknown = null;
    for (let attempt = 0; attempt < 3; attempt++) {
      const { error: uploadError } = await supabase.storage
        .from('journal-images')
        .upload(filePath, file, { contentType: file.type || 'image/jpeg', upsert: true });
      if (!uploadError) {
        const { data: urlData } = await supabase.storage
          .from('journal-images')
          .createSignedUrl(filePath, 60 * 60 * 24 * 365);
        return urlData?.signedUrl ?? '';
      }
      lastError = uploadError;
      await new Promise((r) => setTimeout(r, 800 * (attempt + 1)));
    }
    throw lastError instanceof Error ? lastError : new Error('Image upload failed');
  };

  const handleCreate = async (data: { title: string; content: string; category: string; imageFile: File | null; removeExistingImage: boolean }) => {
    if (!user) return;
    try {
      setIsSaving(true);
      let image_url: string | null = null;
      if (data.imageFile) {
        try {
          image_url = await uploadImage(data.imageFile);
        } catch (uploadError) {
          console.error('Image upload failed:', uploadError);
          toast.error('Image upload failed — saving your entry without the image.');
          image_url = null;
        }
      }
      await createEntry.mutateAsync({
        title: data.title,
        content: data.content,
        category: data.category,
        image_url,
      });
      toast.success('Entry saved!');
      setShowNewEntry(false);
    } catch (error) {
      console.error('Save entry failed:', error);
      toast.error(error instanceof Error ? `Failed to save entry: ${error.message}` : 'Failed to save entry');
    } finally {
      setIsSaving(false);
    }
  };

  const handleUpdate = async (entryId: string, data: { title: string; content: string; category: string; imageFile: File | null; removeExistingImage: boolean }) => {
    if (!user) return;
    try {
      setIsSaving(true);
      let image_url: string | null | undefined = undefined;

      if (data.imageFile) {
        try {
          image_url = await uploadImage(data.imageFile);
        } catch (uploadError) {
          console.error('Image upload failed:', uploadError);
          toast.error('Image upload failed — saving your changes without the new image.');
          image_url = undefined;
        }
      } else if (data.removeExistingImage) {
        image_url = null;
      }

      await updateEntry.mutateAsync({
        id: entryId,
        title: data.title,
        content: data.content,
        category: data.category,
        image_url,
      });
      toast.success('Entry updated!');
      setEditingEntryId(null);
    } catch (error) {
      console.error('Update entry failed:', error);
      toast.error(error instanceof Error ? `Failed to update entry: ${error.message}` : 'Failed to update entry');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteEntry = async (id: string) => {
    try {
      await deleteEntry.mutateAsync(id);
      toast.success('Entry deleted');
    } catch (error) {
      toast.error('Failed to delete entry');
    }
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
                Your Private Journal
              </h1>
              <p className="text-muted-foreground text-lg mb-8">
                Sign in to start recording your reflections, struggles, and victories.
              </p>
              <Link to="/auth?mode=signin">
                <Button variant="hero" size="xl">
                  Sign In to Start Writing
                </Button>
              </Link>
            </motion.div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between mb-8"
          >
            <div className="flex items-center gap-3">
              <BookOpen className="w-8 h-8 text-primary" />
              <div>
                <h1 className="font-heading text-3xl md:text-4xl font-bold">Private Journal</h1>
                <p className="text-muted-foreground">Record your reflections, struggles, and victories. Your entries are private.</p>
              </div>
            </div>
            <Button onClick={() => setShowNewEntry(true)} className="hidden md:flex">
              <Plus className="w-4 h-4 mr-2" />
              New Entry
            </Button>
          </motion.div>

          {/* Mobile New Entry Button */}
          <Button 
            onClick={() => setShowNewEntry(true)} 
            className="w-full mb-6 md:hidden"
          >
            <Plus className="w-4 h-4 mr-2" />
            New Entry
          </Button>

          {/* New Entry Form */}
          {showNewEntry && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
              <JournalEntryForm
                mode="create"
                onSave={handleCreate}
                onCancel={() => setShowNewEntry(false)}
                isSaving={isSaving}
              />
            </motion.div>
          )}

          {/* Loading State */}
          {isLoading && (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          )}

          {/* Empty State */}
          {!isLoading && entries.length === 0 && (
            <Card className="text-center py-12">
              <CardContent>
                <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-heading text-xl font-semibold mb-2">No entries yet</h3>
                <p className="text-muted-foreground mb-4">Start writing your first journal entry.</p>
                <Button onClick={() => setShowNewEntry(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Write First Entry
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Journal Entries */}
          <div className="space-y-4">
            {entries.map((entry, index) => {
              const category = entry.category as 'reflection' | 'struggle' | 'victory';
              const Icon = typeIcons[category] || BookOpen;
              const color = typeColors[category] || 'text-muted-foreground';

              if (editingEntryId === entry.id) {
                return (
                  <motion.div key={entry.id} initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
                    <JournalEntryForm
                      mode="edit"
                      initialTitle={entry.title}
                      initialContent={entry.content}
                      initialCategory={category}
                      initialImageUrl={entry.image_url}
                      onSave={(data) => handleUpdate(entry.id, data)}
                      onCancel={() => setEditingEntryId(null)}
                      isSaving={isSaving}
                    />
                  </motion.div>
                );
              }
              
              return (
                <motion.div
                  key={entry.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card
                    className="hover:shadow-lg transition-shadow cursor-pointer"
                    onClick={() => setViewingEntryId(entry.id)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => { if (e.key === 'Enter') setViewingEntryId(entry.id); }}
                  >
                    <CardContent className="py-6">
                      <div className="flex items-start gap-4">
                        <div className={`w-10 h-10 rounded-lg bg-secondary/50 flex items-center justify-center flex-shrink-0 ${color}`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2 mb-1">
                            <h3 className="font-heading font-semibold">{entry.title}</h3>
                            <div className="flex items-center gap-1">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-muted-foreground hover:text-primary"
                                onClick={(e) => { e.stopPropagation(); setEditingEntryId(entry.id); }}
                              >
                                <Pencil className="w-4 h-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-muted-foreground hover:text-destructive"
                                onClick={(e) => { e.stopPropagation(); handleDeleteEntry(entry.id); }}
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                            <Calendar className="w-4 h-4" />
                            <span>{format(new Date(entry.created_at), 'EEE, MMM d')}</span>
                            <span>•</span>
                            <span className={`capitalize ${color}`}>{entry.category}</span>
                          </div>
                          {entry.image_url && (
                            <img
                              src={entry.image_url}
                              alt="Journal attachment"
                              className="w-full max-h-64 object-cover rounded-lg mb-3 border border-border"
                            />
                          )}
                          <p className="text-foreground/80 line-clamp-3 whitespace-pre-wrap">{entry.content}</p>
                          <span className="mt-2 inline-block text-xs text-primary">Tap to read full entry</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                </motion.div>
              );
            })}
          </div>

          {/* Entry Detail Dialog */}
          <Dialog open={!!viewingEntry} onOpenChange={(open) => !open && setViewingEntryId(null)}>
            <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
              {viewingEntry && (
                <>
                  <DialogHeader>
                    <DialogTitle className="font-heading text-2xl pr-6">{viewingEntry.title}</DialogTitle>
                  </DialogHeader>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    <span>{format(new Date(viewingEntry.created_at), 'EEEE, MMMM d, yyyy • h:mm a')}</span>
                    <span>•</span>
                    <span className="capitalize">{viewingEntry.category}</span>
                  </div>
                  {viewingEntry.image_url && (
                    <img
                      src={viewingEntry.image_url}
                      alt="Journal attachment"
                      className="w-full rounded-lg border border-border"
                    />
                  )}
                  <p className="text-foreground/90 whitespace-pre-wrap leading-relaxed">{viewingEntry.content}</p>
                  <div className="flex justify-end gap-2 pt-2">
                    <Button
                      variant="outline"
                      onClick={() => { setEditingEntryId(viewingEntry.id); setViewingEntryId(null); }}
                    >
                      <Pencil className="w-4 h-4 mr-2" />
                      Edit
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={() => { handleDeleteEntry(viewingEntry.id); setViewingEntryId(null); }}
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete
                    </Button>
                  </div>
                </>
              )}
            </DialogContent>
          </Dialog>
        </div>
      </main>


      <Footer />
    </div>
  );
};

export default Journal;
