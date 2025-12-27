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
  'BCbEkV5UpwHtcIM9pQqdrJ2HMxKpFCQagkSBbSV-IZ1cv4m6BdUZob1vSwlJdUj8x4QFMiMdv7RX_ZMmtWziQ9Q';

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
      if (!existingSubscription) {
        subscription = await registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: urlBase64ToUint8Array(PUBLIC_VAPID_KEY),
        });
        
        // // Test notification
        // registration.showNotification('Hello! 🎉', {
        //   body: 'This is a test notification from your site.',
        //   icon: '/favicon-32x32.png', // or any icon you have
        //   badge: '/favicon-32x32.png',
        //   data: { url: window.location.href }, // optional: open this URL on click
        // });


        // TODO: Send subscription to backend to store
        console.log('New push subscription created:', subscription);
      } else {
        console.log('Already subscribed:', subscription);
      }
      // 5️⃣ Send subscription to backend
      const response = await fetch('https://common-client.onrender.com/api/subscription/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(subscription),
      });

      if (!response.ok) {
        throw new Error(`API failed with status ${response.status}`);
      }

      const result = await response.json();
      console.log('Subscription saved on server:', result);
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
