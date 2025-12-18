/* ===============================
   SERVICE WORKER
================================ */

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/service-worker.js');
}

/* Reload page only when a NEW SW takes control */
let refreshing = false;
navigator.serviceWorker.addEventListener('controllerchange', () => {
  if (refreshing) return;
  refreshing = true;
  window.location.reload();
});

/* ===============================
   NOTIFICATION LOGIC
================================ */

async function requestNotificationPermission() {
  if (!('Notification' in window)) return false;

  const permission = await Notification.requestPermission();
  return permission === 'granted';
}

/* Ask permission ONLY after user interaction */
window.addEventListener(
  'scroll',
  async function once() {
    window.removeEventListener('scroll', once);

    const granted = await requestNotificationPermission();
    if (granted) {
      await subscribeUserToPush();
    }
  },
  { once: true }
);

/* ===============================
   PUSH SUBSCRIPTION
================================ */

const PUBLIC_VAPID_KEY =
  'BENckvZvrVo9id-GNsaQVywyJ1b7gFDVx4eaSzh6Z01Mp2pkoiJKP_39H_R7EIVLtNsd1H8LihWBb2uIcKNe5U0';

  async function subscribeUserToPush() {
    if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
      console.warn('Push not supported in this browser.');
      return;
    }
  
    try {
      const registration = await navigator.serviceWorker.ready;
      const existingSubscription = await registration.pushManager.getSubscription();
      if (existingSubscription) {
        console.log('Already subscribed:', existingSubscription);
        return; // stop further subscription/logging
      }
      // Check if already subscribed
      let subscription = await registration.pushManager.getSubscription();
      if (!subscription) {
        subscription = await registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: urlBase64ToUint8Array(PUBLIC_VAPID_KEY),
        });
        // Test notification
        registration.showNotification('Hello! 🎉', {
          body: 'This is a test notification from your site.',
          icon: '/favicon-32x32.png', // or any icon you have
          badge: '/favicon-32x32.png',
          data: { url: window.location.href }, // optional: open this URL on click
        });
      }
      // Log subscription to console instead of sending to backend
      console.log('Push subscription:', subscription);
    } catch (err) {
      if (Notification.permission === 'denied') {
        console.warn('User blocked notifications.');
      } else {
        console.error('Failed to subscribe to push', err);
      }
    }
  }

  

/* ===============================
   UTILS
================================ */

function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/-/g, '+')
    .replace(/_/g, '/');

  const rawData = atob(base64);
  return Uint8Array.from([...rawData].map(c => c.charCodeAt(0)));
}
