// Push Notification Utilities

// Extend ServiceWorkerRegistration to include pushManager (Web Push API)
interface PushServiceWorkerRegistration extends ServiceWorkerRegistration {
  pushManager: PushManager;
}

const VAPID_PUBLIC_KEY = import.meta.env.VITE_VAPID_PUBLIC_KEY;

export const isPushSupported = (): boolean => {
  return 'serviceWorker' in navigator && 'PushManager' in window && 'Notification' in window;
};

export const getNotificationPermission = (): NotificationPermission => {
  if (!('Notification' in window)) {
    return 'denied';
  }
  return Notification.permission;
};

export const requestNotificationPermission = async (): Promise<NotificationPermission> => {
  if (!('Notification' in window)) {
    throw new Error('Notifications not supported in this browser');
  }
  return await Notification.requestPermission();
};

export const registerServiceWorker = async (): Promise<ServiceWorkerRegistration> => {
  if (!('serviceWorker' in navigator)) {
    throw new Error('Service Worker not supported');
  }
  
  const registration = await navigator.serviceWorker.register('/sw.js', {
    scope: '/'
  });
  
  // Wait for the service worker to be ready
  await navigator.serviceWorker.ready;
  
  return registration;
};

export const getExistingSubscription = async (): Promise<PushSubscription | null> => {
  if (!('serviceWorker' in navigator)) {
    return null;
  }
  
  const registration = await navigator.serviceWorker.ready as PushServiceWorkerRegistration;
  return await registration.pushManager.getSubscription();
};

export const subscribeToPush = async (): Promise<PushSubscription> => {
  const registration = await navigator.serviceWorker.ready as PushServiceWorkerRegistration;
  
  // Check if we already have a subscription
  const existingSubscription = await registration.pushManager.getSubscription();
  if (existingSubscription) {
    return existingSubscription;
  }
  
  // Subscribe to push
  const subscription = await registration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY).buffer as ArrayBuffer
  });
  
  return subscription;
};

export const unsubscribeFromPush = async (): Promise<boolean> => {
  const subscription = await getExistingSubscription();
  if (subscription) {
    return await subscription.unsubscribe();
  }
  return true;
};

// Convert VAPID key from base64 to Uint8Array
function urlBase64ToUint8Array(base64String: string): Uint8Array {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/-/g, '+')
    .replace(/_/g, '/');
  
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  
  return outputArray;
}

export const extractSubscriptionData = (subscription: PushSubscription) => {
  const key = subscription.getKey('p256dh');
  const auth = subscription.getKey('auth');
  
  return {
    endpoint: subscription.endpoint,
    p256dh: key ? btoa(String.fromCharCode(...new Uint8Array(key))) : '',
    auth: auth ? btoa(String.fromCharCode(...new Uint8Array(auth))) : ''
  };
};
