if ("serviceWorker" in navigator) {
    // register service worker
    navigator.serviceWorker.register("service-worker.js");
  }

 let installPrompt = null;
const installButton = document.querySelector("#install");

window.addEventListener("beforeinstallprompt", (event) => {
   console.log('beforeinstallprompt');
   installPrompt = event;
   installButton.classList.remove("hide");
 });

installButton?.addEventListener("click", async () => {
   if (!installPrompt) {
     return;
   }
   const result = await installPrompt.prompt();
   console.log(`Install prompt was: ${result.outcome}`);
   if (result.outcome === 'accepted') {
     disableInAppInstallPrompt();
  }
 });

 window.addEventListener("appinstalled", () => {
   console.log('App already installed');
   disableInAppInstallPrompt();
 });

 function disableInAppInstallPrompt() {
   installPrompt = null;
   console.log('disable install prompt');
   installButton.classList.add("hide");
 }

 const button = document.getElementById("notifications");
 button.addEventListener("click", () => {
   Notification.requestPermission().then((result) => {
     if (result === "granted") {
       randomNotification();
     } else {
       console.log('NOtifications rejected');
      
     }
   });
 });

function randomNotification() {
   const notifTitle = 'Title';
   const notifBody = `Body `;
   const notifImg = `./fprint.png`;
   const options = {
     body: notifBody,
     icon: notifImg,
   };
   new Notification(notifTitle, options);
    setTimeout(randomNotification, 3000);
 }