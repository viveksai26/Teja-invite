if ("serviceWorker" in navigator) {
    // register service worker
    navigator.serviceWorker.register("service-worker.js");
  }

  navigator.serviceWorker.addEventListener('controllerchange', () => {
    window.location.reload();
  })

  async function requestNotificationPermission() {
    const permission = await Notification.requestPermission();
    return permission === 'granted';
  }
  document.getElementById('enableNotifications').onclick = async () => {
    const granted = await requestNotificationPermission();
    if (!granted) {
      alert('Notifications denied');
      return;
    }
  
    await subscribeUserToPush();
  };
  
const PUBLIC_VAPID_KEY = 'BENckvZvrVo9id-GNsaQVywyJ1b7gFDVx4eaSzh6Z01Mp2pkoiJKP_39H_R7EIVLtNsd1H8LihWBb2uIcKNe5U0';

async function subscribeUserToPush() {
  const registration = await navigator.serviceWorker.ready;

  const subscription = await registration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(PUBLIC_VAPID_KEY),
  });
  console.log(subscription)
  // Send this to your backend
  // await fetch('/save-subscription', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(subscription),
  // });
}

function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/-/g, '+')
    .replace(/_/g, '/');

  const rawData = atob(base64);
  return Uint8Array.from([...rawData].map(c => c.charCodeAt(0)));
}

