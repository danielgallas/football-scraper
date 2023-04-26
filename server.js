const express = require("express");
const puppeteer = require("puppeteer");
const app = express();

port = process.env.PORT || 5001;

async function getScores() {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  // await page.goto("https://www.waterstones.com/books/search/term/borges", {
  //   waitUntil: "networkidle0",
  // });

  // await page.click("#onetrust-accept-btn-handler");

  // await page.goto("https://books.toscrape.com/");

  // const teams = await page.evaluate(() => {
  //   const table = Array.from(document.querySelectorAll(".info-wrap"));
  //   const data = table.map((item) => ({
  //     title: item.querySelector(".title-wrap a").innerText,
  //   }));
  //   return data;
  // });

  // await page.goto(
  //   "https://www.whoscored.com/Teams/1244/Fixtures/Brazil-Gremio",
  //   {
  //     waitUntil: "networkidle0",
  //   }
  // );

  // await page.click("button.css-1wc0q5e");
  // await page.select("#team-fixture-tournaments", "Brasileirão");

  // const teams = await page.evaluate(() => {
  //   const table = Array.from(
  //     document.querySelectorAll(
  //       ".col12-lg-12.col12-m-12.col12-s-12.col12-xs-12.item.divtable-row.alt"
  //     )
  //   );
  //   return table;
  // });

  // const data = table.map((item) => ({
  //   title: item.querySelector(
  //     ".col12-lg-2.col12-m-2.col12-s-0.col12-xs-0.divtable-data.horizontal-match-display.team.home a"
  //   ).innerText,
  // }));

  await page.goto(
    "https://www.espn.co.uk/football/team/results/_/id/6273/league/BRA.1",
    {
      waitUntil: "networkidle0",
    }
  );

  await page.click("#onetrust-accept-btn-handler");
  // await page.select("#team-fixture-tournaments", "Brasileirão");

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
      // finalScore1: scoreResultLine[item].finalScore1,
      // finalScore2: scoreResultLine[item].finalScore2,
    }));
    return { data, scoreResultLine };
  });

  const { data, scoreResultLine } = teams;

  // console.log(data[0]);
  // console.log(scoreResultLine[0]);

  // let john = { ...data[1], ...scoreResultLine[1] };

  // console.log(john);

  let final = [];

  for (let i = 0; i < data.length; i++) {
    let john = { ...data[i], ...scoreResultLine[i] };
    final.push(john);
  }

  console.log(final);

  //       finalScore1: item
  //        .querySelectorAll(".Table__Team.score")
  //      .map((game) => game[1].querySelectorAll("a.AnchorLink").innerText),

  // game = document.querySelectorAll(".Table__Team.score");
  // score = game[1].querySelectorAll("a.AnchorLink");

  // item
  //   .querySelectorAll(".Table__Team.score")
  //   .map((game) => game[1].querySelectorAll("a.AnchorLink").innerText);

  // const teams = await page.evaluate(() => {
  //   const table = Array.from(document.querySelectorAll(".product_pod"));
  //   const data = table.map((item) => ({
  //     title: item
  //       .querySelector("div.image_container a img")
  //       .getAttribute("alt"),
  //   }));
  //   return data;
  // });

  // console.log(teams);

  // await browser.close();
}

getScores();

const start = () => {
  try {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
