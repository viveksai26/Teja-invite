$(document).ready(function() {
  let clock;
  let yearClock;
  let monthClock;
  let now = new Date();
  let eventDate = new Date("2025-05-01 11:00", "Asia/Kolkata");
  let years = now.getFullYear() - eventDate.getFullYear();
  let months = now.getMonth() - eventDate.getMonth();

  if (months < 0) {
    years--;
    months += 12;
  }

  if (now.getDate() < eventDate.getDate()) {
    months--;
    if (months < 0) {
      years--;
      months += 12;
    }
  }

  // ---- ANCHOR DATE ----
  const anchor = new Date(eventDate);
  anchor.setFullYear(eventDate.getFullYear() + years);
  anchor.setMonth(eventDate.getMonth() + months);

  const diff = Math.floor((now - anchor) / 1000);

  // ---- UPDATE FLIPS ----
  yearClock.setTime(years);
  monthClock.setTime(months);
  clock.setTime(diff)
  
  if (diff <= 0) {
    // If remaining countdown is 0
    clock = $(".clock").FlipClock(0, {
      clockFace: "DailyCounter",
      autostart: false
    });
    console.log("Date has already passed!")
    
  } else {
    // Run countdown timer
    clock = $(".clock").FlipClock(diff, {
      clockFace: "DailyCounter",
      callbacks: {
        stop: function() {
          console.log("Timer has ended!")
        }
      }
    });
    
    // Check when timer reaches 0, then stop at 0
    setTimeout(function() {
      checktime();
    }, 1000);
    
    function checktime() {
      t = clock.getTime();
      if (t <= 0) {
        clock.setTime(0);
      }
      setTimeout(function() {
        checktime();
      }, 1000);
    }
  }
});
