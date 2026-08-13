import { useState, useEffect } from 'react';
import { Bell, BellOff, Clock, CheckCircle, AlertCircle, Loader2, Send } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  useNotificationPreferences, 
  useUpdateNotificationPreferences,
  usePushSubscriptionStatus,
  useRegisterPushNotifications,
  useUnregisterPushNotifications,
  useSendTestNotification
} from '@/hooks/useNotificationPreferences';
import { useToast } from '@/hooks/use-toast';
const NotificationSettings = () => {
  const { data: preferences, isLoading } = useNotificationPreferences();
  const { data: pushStatus, isLoading: isPushStatusLoading } = usePushSubscriptionStatus();
  const updatePreferences = useUpdateNotificationPreferences();
  const registerPush = useRegisterPushNotifications();
  const unregisterPush = useUnregisterPushNotifications();
  const sendTestNotification = useSendTestNotification();
  const { toast } = useToast();

  const [habitRemindersEnabled, setHabitRemindersEnabled] = useState(false);
  const [reminderTime, setReminderTime] = useState('09:00');

  useEffect(() => {
    if (preferences) {
      setHabitRemindersEnabled(preferences.habit_reminders_enabled);
      setReminderTime(preferences.reminder_time.slice(0, 5)); // Format HH:MM
    }
  }, [preferences]);

  const handleToggleReminders = async (enabled: boolean) => {
    setHabitRemindersEnabled(enabled);
    try {
      await updatePreferences.mutateAsync({ habit_reminders_enabled: enabled });
      toast({
        title: enabled ? 'Reminders Enabled' : 'Reminders Disabled',
        description: enabled 
          ? 'Your reminder preferences have been saved' 
          : 'Habit reminders have been turned off',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update notification settings',
        variant: 'destructive',
      });
    }
  };

  const handleTimeChange = async () => {
    try {
      await updatePreferences.mutateAsync({ reminder_time: `${reminderTime}:00` });
      toast({
        title: 'Reminder Time Updated',
        description: `Daily reminders will be sent at ${reminderTime} UTC`,
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update reminder time',
        variant: 'destructive',
      });
    }
  };

  const handleEnablePush = async () => {
    try {
      await registerPush.mutateAsync();
      toast({
        title: 'Push Notifications Enabled',
        description: 'You will now receive push notifications for habit reminders',
      });
    } catch (error) {
      toast({
        title: 'Could Not Enable Notifications',
        description: error instanceof Error ? error.message : 'An error occurred',
        variant: 'destructive',
      });
    }
  };

  const handleDisablePush = async () => {
    try {
      await unregisterPush.mutateAsync();
      toast({
        title: 'Push Notifications Disabled',
        description: 'You will no longer receive push notifications',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to disable push notifications',
        variant: 'destructive',
      });
    }
  };

  const handleSendTestNotification = async () => {
    try {
      await sendTestNotification.mutateAsync();
      toast({
        title: 'Test Notification Sent',
        description: 'You should receive a push notification shortly',
      });
    } catch (error) {
      toast({
        title: 'Failed to Send Test',
        description: error instanceof Error ? error.message : 'An error occurred',
        variant: 'destructive',
      });
    }
  };

  if (isLoading || isPushStatusLoading) {
    return (
      <Card className="bg-card/50 backdrop-blur-sm border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Notification Settings
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-4">
            <div className="h-10 bg-muted rounded" />
            <div className="h-10 bg-muted rounded" />
          </div>
        </CardContent>
      </Card>
    );
  }

  const isPushPending = registerPush.isPending || unregisterPush.isPending;

  return (
    <Card className="bg-card/50 backdrop-blur-sm border-border/50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {habitRemindersEnabled ? (
            <Bell className="h-5 w-5 text-primary" />
          ) : (
            <BellOff className="h-5 w-5 text-muted-foreground" />
          )}
          Notification Settings
        </CardTitle>
        <CardDescription>
          Configure reminders to help you stay consistent with your habits
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Enable/Disable Toggle */}
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="habit-reminders" className="text-base font-medium">
              Daily Habit Reminders
            </Label>
            <p className="text-sm text-muted-foreground">
              Receive a daily reminder to complete your habits
            </p>
          </div>
          <Switch
            id="habit-reminders"
            checked={habitRemindersEnabled}
            onCheckedChange={handleToggleReminders}
            disabled={updatePreferences.isPending}
          />
        </div>

        {/* Reminder Time */}
        <div className={`space-y-3 transition-opacity ${habitRemindersEnabled ? 'opacity-100' : 'opacity-50'}`}>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <Label htmlFor="reminder-time" className="text-base font-medium">
              Reminder Time (UTC)
            </Label>
          </div>
          <div className="flex items-center gap-3">
            <Input
              id="reminder-time"
              type="time"
              value={reminderTime}
              onChange={(e) => setReminderTime(e.target.value)}
              disabled={!habitRemindersEnabled || updatePreferences.isPending}
              className="w-32"
            />
            <Button
              variant="outline"
              size="sm"
              onClick={handleTimeChange}
              disabled={!habitRemindersEnabled || updatePreferences.isPending}
            >
              Save Time
            </Button>
          </div>
        </div>

        {/* Push Notification Status */}
        <div className="p-4 bg-muted/50 rounded-lg border border-border space-y-4">
          <div className="flex items-start gap-3">
            {!pushStatus?.supported ? (
              <>
                <AlertCircle className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-foreground">Browser Not Supported</p>
                  <p className="text-sm text-muted-foreground">
                    Your browser doesn't support push notifications. Try using Chrome, Firefox, or Edge.
                  </p>
                </div>
              </>
            ) : pushStatus.permission === 'denied' ? (
              <>
                <AlertCircle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-foreground">Notifications Blocked</p>
                  <p className="text-sm text-muted-foreground">
                    You've blocked notifications for this site. Please enable them in your browser settings.
                  </p>
                </div>
              </>
            ) : pushStatus.subscribed ? (
              <>
                <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="font-medium text-foreground">Push Notifications Active</p>
                  <p className="text-sm text-muted-foreground">
                    You'll receive notifications when it's time to complete your habits.
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleSendTestNotification}
                    disabled={sendTestNotification.isPending}
                  >
                    {sendTestNotification.isPending ? (
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    ) : (
                      <Send className="h-4 w-4 mr-2" />
                    )}
                    Test
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleDisablePush}
                    disabled={isPushPending}
                  >
                    {isPushPending ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      'Disable'
                    )}
                  </Button>
                </div>
              </>
            ) : (
              <>
                <Bell className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="font-medium text-foreground">Enable Push Notifications</p>
                  <p className="text-sm text-muted-foreground">
                    Get notified on this device when it's time to complete your habits.
                  </p>
                </div>
                <Button
                  variant="default"
                  size="sm"
                  onClick={handleEnablePush}
                  disabled={isPushPending || !habitRemindersEnabled}
                >
                  {isPushPending ? (
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  ) : null}
                  Enable
                </Button>
              </>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default NotificationSettings;
