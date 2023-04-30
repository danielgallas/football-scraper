// getScores is the web scraper function
// const puppeteer = require("puppeteer");
require("dotenv").config();
const edgeChromium = require("chrome-aws-lambda");
const puppeteer = require("puppeteer-core");

async function getScores() {
  // Importing Puppeteer core as default otherwise
  // it won't function correctly with "launch()"
  // import edgeChromium from 'chrome-aws-lambda'
  // import puppeteer from 'puppeteer-core'

  // You may want to change this if you're developing
  // on a platform different from macOS.
  // See https://github.com/vercel/og-image for a more resilient
  // system-agnostic options for Puppeteeer.
  const LOCAL_CHROME_EXECUTABLE =
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

  // Edge executable will return an empty string locally.
  const executablePath =
    (await edgeChromium.executablePath) || LOCAL_CHROME_EXECUTABLE;

  const browser = await puppeteer.launch({
    executablePath,
    args: edgeChromium.args,
    headless: false,
  });

  const page = await browser.newPage();
  await page.goto("https://github.com");

  // const page = await browser.newPage();
  // await page.goto("https://www.google.com/");
  await browser.close();

  // const page = await browser.newPage();
  // const url = "https://www.google.com/";

  // await page.goto(url, {
  //   waitUntil: "networkidle0",
  // });

  const fetchedResults = [{ daniel: "teste" }];

  // await browser.close();
  return fetchedResults;
}

async function getScores2() {
  const browser = await puppeteer.launch({ headless: "new" });
  // const browser = await puppeteer.launch({ headless: false });

  const page = await browser.newPage();

  //   const url =
  //     "https://www.espn.co.uk/football/team/results/_/id/382/league/ENG.1";

  const url =
    "https://www.espn.co.uk/football/team/results/_/id/6273/league/BRA.1";

  await page.goto(url, {
    waitUntil: "networkidle0",
  });

  await page.click("#onetrust-accept-btn-handler");

  const teams = await page.evaluate(() => {
    const scoreRow = Array.from(
      document.querySelectorAll(".Table__Team.score")
    );
    const scoreResultLine = scoreRow.map((item) => {
      const anchorLink = item.querySelectorAll("a.AnchorLink");
      const finalResult = anchorLink[1].innerText;
      return {
        finalScore1: finalResult.at(0),
        finalScore2: finalResult.at(-1),
      };
    });

    const table = Array.from(
      document.querySelectorAll(".Table__TR.Table__TR--sm.Table__even")
    );
    const data = table.map((item) => ({
      team1: item.querySelector(".Table__TD .local.flex.items-center a")
        .innerText,
      team2: item.querySelector(".away.flex.items-center a").innerText,
    }));
    let dataRev = data.reverse();
    let scoreRev = scoreResultLine.reverse();
    return { dataRev, scoreRev };
  });

  const { dataRev, scoreRev } = teams;

  let fetchedResults = [];

  for (let i = 0; i < dataRev.length; i++) {
    let singleRound = {
      ...dataRev[i],
      ...scoreRev[i],
      round: i + 1,
      _id: i,
    };
    fetchedResults.push(singleRound);
  }

  await browser.close();

  //   console.log(fetchedResults);

  return fetchedResults;
}

module.exports = getScores;
