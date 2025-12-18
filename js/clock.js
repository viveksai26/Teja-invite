const eventDate = new Date("2025-05-01T10:30:00");

// Years & Months flip clocks
const yearClock = $(".years").FlipClock(0, {
  clockFace: "Counter",
  autoStart: false
});

const monthClock = $(".months").FlipClock(0, {
  clockFace: "Counter",
  autoStart: false
});

// Days-Hours-Minutes-Seconds
const timeClock = $(".clock").FlipClock(0, {
  clockFace: "DailyCounter",
  countdown: false,
  autoStart: true
});

function updateAll() {
  const now = new Date();

  // ---- CALCULATE YEARS & MONTHS ----
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

  const diffSeconds = Math.floor((now - anchor) / 1000);

  // ---- UPDATE FLIPS ----
  yearClock.setTime(years);
  monthClock.setTime(months);
  timeClock.setTime(diffSeconds);
}

// Initial + interval
updateAll();
setInterval(updateAll, 1000);