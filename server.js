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

  await page.goto(
    "https://www.whoscored.com/Teams/1244/Fixtures/Brazil-Gremio",
    {
      waitUntil: "networkidle0",
    }
  );

  await page.click("button.css-1wc0q5e");
  await page.select("#team-fixture-tournaments", "Brasileirão");

  const teams = await page.evaluate(() => {
    const table = Array.from(
      document.querySelectorAll(
        ".col12-lg-12.col12-m-12.col12-s-12.col12-xs-12.item.divtable-row.alt"
      )
    );
    return table;
  });

  // const data = table.map((item) => ({
  //   title: item.querySelector(
  //     ".col12-lg-2.col12-m-2.col12-s-0.col12-xs-0.divtable-data.horizontal-match-display.team.home a"
  //   ).innerText,
  // }));

  console.log(teams);

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
