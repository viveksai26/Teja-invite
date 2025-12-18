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
  if (!('PushManager' in window)) {
    console.warn('Push not supported');
    return;
  }

  const registration = await navigator.serviceWorker.ready;

  // ✅ Avoid duplicate subscriptions
  const existingSubscription =
    await registration.pushManager.getSubscription();

  if (existingSubscription) {
    console.log('Already subscribed');
    return;
  }

  const subscription = await registration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(PUBLIC_VAPID_KEY),
  });

  console.log('Push subscribed:', subscription);

  // OPTIONAL: send to backend only if exists
  try {
    await fetch('/save-subscription', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(subscription),
    });
  } catch (e) {
    console.warn('No backend yet, skipping save');
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
