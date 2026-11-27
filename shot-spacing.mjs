import puppeteer from "puppeteer-core";

const BASE = "http://127.0.0.1:4173";
const browser = await puppeteer.launch({
  executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  headless: "new",
  args: ["--hide-scrollbars"],
});
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });

for (const [name, path] of [
  ["home", "/"],
  ["products", "/products"],
  ["how", "/how-it-works"],
  ["quote", "/quote"],
  ["terms", "/terms"],
]) {
  await page.goto(BASE + path, { waitUntil: "networkidle2" });
  await page.evaluate(() => {
    document.querySelectorAll("img").forEach((i) => (i.loading = "eager"));
  });
  await new Promise((r) => setTimeout(r, 900));
  await page.screenshot({ path: `ref2/${name}.png`, fullPage: true });
}

// measure section rhythm on home
await page.goto(BASE + "/", { waitUntil: "networkidle2" });
await new Promise((r) => setTimeout(r, 600));
const metrics = await page.evaluate(() => {
  const out = [];
  document.querySelectorAll("main section, main > div > section").forEach((s) => {
    const cs = getComputedStyle(s);
    const r = s.getBoundingClientRect();
    out.push({
      cls: s.className.slice(0, 60),
      pt: cs.paddingTop,
      pb: cs.paddingBottom,
      h: Math.round(r.height),
    });
  });
  const hero = document.querySelector("main section");
  const heroInner = hero?.querySelector(".container-x");
  return {
    sections: out,
    heroPad: hero ? getComputedStyle(hero).padding : null,
    containerW: heroInner ? Math.round(heroInner.getBoundingClientRect().width) : null,
    bodyFont: getComputedStyle(document.body).fontSize,
    bodyLH: getComputedStyle(document.body).lineHeight,
  };
});
console.log(JSON.stringify(metrics, null, 1));
await browser.close();
