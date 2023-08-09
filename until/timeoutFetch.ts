function timeout(millis: number): Promise<never> {
  return new Promise((_, reject) => {
    setTimeout(() => reject('timeout'), millis);
  });
}

async function fetchWithTimeout(url: string, ms: number) {
  return Promise.race([fetch(url), timeout(ms)]);
}
