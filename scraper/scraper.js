// getScores is the web scraper function
const puppeteer = require("puppeteer");

async function getScores() {
  const browser = await puppeteer.launch({
    headless: false,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  const page = await browser.newPage();
  const url = "https://www.google.com/";
  await page.goto(url);
  // await browser.close();

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
