/* ===============================
   SERVICE WORKER
================================ */

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/service-worker.js');
}

let refreshing = false;
navigator.serviceWorker.addEventListener('controllerchange', () => {
  if (refreshing) return;
  refreshing = true;
  window.location.reload();
});

/* ===============================
   NOTIFICATION LOGIC
================================ */

let userInteracted = false;

window.addEventListener(
  'scroll',
  async function onFirstScroll() {
    window.removeEventListener('scroll', onFirstScroll);
    userInteracted = true;

    // 🚨 DO NOT request permission unless default
    if (Notification.permission !== 'default') return;

    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
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
  if (!('PushManager' in window)) return;

  const registration = await navigator.serviceWorker.ready;

  const existing = await registration.pushManager.getSubscription();
  if (existing) return;

  await registration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(PUBLIC_VAPID_KEY),
  });
}

/* ===============================
   UTILS
================================ */

function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/-/g, '+')
    .replace(/_/g, '/');

  const raw = atob(base64);
  return Uint8Array.from([...raw].map(c => c.charCodeAt(0)));
}
