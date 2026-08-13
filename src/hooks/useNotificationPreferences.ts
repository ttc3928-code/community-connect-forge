import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { communityClient as supabase } from '@/lib/community-client';
import { useAuth } from '@/contexts/AuthContext';
import { 
  isPushSupported, 
  getNotificationPermission, 
  requestNotificationPermission,
  registerServiceWorker,
  subscribeToPush,
  unsubscribeFromPush,
  getExistingSubscription,
  extractSubscriptionData
} from '@/lib/pushNotifications';

export interface NotificationPreferences {
  id: string;
  user_id: string;
  habit_reminders_enabled: boolean;
  reminder_time: string;
  created_at: string;
  updated_at: string;
}

export const useNotificationPreferences = () => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['notification_preferences', user?.id],
    queryFn: async () => {
      if (!user) return null;

      const { data, error } = await supabase
        .from('notification_preferences')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();

      if (error) throw error;
      return data as NotificationPreferences | null;
    },
    enabled: !!user,
  });
};

export const useUpdateNotificationPreferences = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async (preferences: { habit_reminders_enabled?: boolean; reminder_time?: string }) => {
      if (!user) throw new Error('Not authenticated');

      // Check if preferences exist
      const { data: existing } = await supabase
        .from('notification_preferences')
        .select('id')
        .eq('user_id', user.id)
        .maybeSingle();

      if (existing) {
        // Update existing
        const { data, error } = await supabase
          .from('notification_preferences')
          .update(preferences)
          .eq('user_id', user.id)
          .select()
          .single();

        if (error) throw error;
        return data;
      } else {
        // Insert new
        const { data, error } = await supabase
          .from('notification_preferences')
          .insert({ user_id: user.id, ...preferences })
          .select()
          .single();

        if (error) throw error;
        return data;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notification_preferences'] });
    },
  });
};

export const usePushSubscriptionStatus = () => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['push_subscription_status', user?.id],
    queryFn: async () => {
      if (!user) return { supported: false, permission: 'default' as NotificationPermission, subscribed: false };

      const supported = isPushSupported();
      const permission = getNotificationPermission();
      
      let subscribed = false;
      if (supported && permission === 'granted') {
        const existingSub = await getExistingSubscription();
        if (existingSub) {
          // Check if subscription exists in database
          const { data } = await supabase
            .from('push_subscriptions')
            .select('id')
            .eq('user_id', user.id)
            .eq('endpoint', existingSub.endpoint)
            .maybeSingle();
          subscribed = !!data;
        }
      }

      return { supported, permission, subscribed };
    },
    enabled: !!user,
  });
};

export const useRegisterPushNotifications = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async () => {
      if (!user) throw new Error('Not authenticated');

      if (!isPushSupported()) {
        throw new Error('Push notifications are not supported in this browser');
      }

      // Request permission
      const permission = await requestNotificationPermission();
      if (permission !== 'granted') {
        throw new Error('Notification permission denied');
      }

      // Register service worker
      await registerServiceWorker();

      // Subscribe to push
      const subscription = await subscribeToPush();
      const { endpoint, p256dh, auth } = extractSubscriptionData(subscription);

      // Save subscription to database
      const { error } = await supabase
        .from('push_subscriptions')
        .upsert({
          user_id: user.id,
          endpoint,
          p256dh,
          auth
        }, {
          onConflict: 'user_id,endpoint'
        });

      if (error) throw error;

      return { success: true, message: 'Push notifications enabled!' };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['push_subscription_status'] });
    },
  });
};

export const useUnregisterPushNotifications = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async () => {
      if (!user) throw new Error('Not authenticated');

      // Get existing subscription
      const existingSub = await getExistingSubscription();
      
      if (existingSub) {
        // Remove from database
        await supabase
          .from('push_subscriptions')
          .delete()
          .eq('user_id', user.id)
          .eq('endpoint', existingSub.endpoint);

        // Unsubscribe from push
        await unsubscribeFromPush();
      }

      return { success: true, message: 'Push notifications disabled' };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['push_subscription_status'] });
    },
  });
};

export const useSendTestNotification = () => {
  const { user } = useAuth();

  return useMutation({
    mutationFn: async () => {
      if (!user) throw new Error('Not authenticated');

      // Get the user's session token
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error('No active session');

      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-push-notification`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session.access_token}`,
          },
          body: JSON.stringify({
            user_id: user.id,
            title: '🔔 Test Notification',
            body: 'Push notifications are working! You\'ll receive habit reminders at your scheduled time.',
            data: { type: 'test' }
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Failed to send test notification');
      }

      return { success: true };
    },
  });
};
