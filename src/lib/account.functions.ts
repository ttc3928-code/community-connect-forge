import { createServerFn } from '@tanstack/react-start';
import { requireSupabaseAuth } from '@/integrations/supabase/auth-middleware';

export const deleteMyAccount = createServerFn({ method: 'POST' })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabaseAdmin } = await import('@/integrations/supabase/client.server');
    const userId = context.userId;

    const tables = [
      'habit_completions',
      'habits',
      'journal_entries',
      'notification_preferences',
      'push_subscriptions',
      'profiles',
    ] as const;

    for (const table of tables) {
      const { error } = await supabaseAdmin.from(table).delete().eq('user_id', userId);
      if (error) throw new Error(`Failed to delete ${table}: ${error.message}`);
    }

    const { error } = await supabaseAdmin.auth.admin.deleteUser(userId);
    if (error) throw new Error(`Failed to delete account: ${error.message}`);

    return { ok: true };
  });
