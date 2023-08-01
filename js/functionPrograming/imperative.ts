function logClockTime() {
  const time = getClockTime();

  console.clear();
  console.log(time);
}

function padStr(str = '') {
  return str.padStart(2, '0');
}

function getClockTime() {
  const date = new Date();

  const hours = date.getHours() > 12 ? date.getHours() - 12 : date.getHours();
  const minutes = padStr(`${date.getMinutes()}`);
  const seconds = padStr(`${date.getSeconds()}`);
  const time = {
    hours: padStr(`${hours}`),
    minutes,
    seconds,
    ampm: date.getHours() >= 12 ? 'pm' : 'am',
  };

  return `${time.hours}:${time.minutes}:${time.seconds} ${time.ampm}`;
}

function main() {
  const timer = setInterval(logClockTime, 1000);

  return () => clearInterval(timer);
}
