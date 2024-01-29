const csv = require("csvtojson");
const fetch = require("node-fetch");
const { RateLimit } = require("async-sema");

const lim = RateLimit(5); // rps
const productsCSVPath = "./data/products.csv";

function getProductsJson() {
  return new Promise((resolve, reject) => {
    csv()
      .fromFile(productsCSVPath)
      .then((jsonObj) => {
        resolve(
          jsonObj
            .filter((i, index) => index < 50)
            .map((each) => ({
              upc: each.upc,
              prodFullName: each.prodFullName,
            }))
        );
      });
  });
}

const productUPCCodes = [
  "000309515038",
  "000309515045",
  "000400203940",
  "000513072891",
  "000513072907",
  "000513072914",
  "000513072921",
  "000513072938",
];

const GOOGLE_API_KEY = "AIzaSyAWViE3nlEHQrFKxMS7QYwwQFbYr9eNJho";
const UPC_API_KEY = "567E01CC799DC882F97CA353C165E0FE";

const init = async () => {
  const products = await getProductsJson();

  // const promises = products.map(async (product) => {
  //   await lim();
  //   const { prodFullName, upc } = product;
  //   const finalUrl = `https://www.googleapis.com/customsearch/v1?key=${GOOGLE_API_KEY}&q=${upc} ${prodFullName}&searchType=image&rights=cc_publicdomain&num=1&cx=013036536707430789898:_pqjad5hr1a`;
  //   console.log("upcUrl", finalUrl);
  //   const eachRes = await fetch(finalUrl);
  //   const json = await eachRes.json();
  //   return json;
  // });

  // const res = await Promise.all(promises);

  // console.log(
  //   "res",
  //   res.map((each) => each.error.errors)
  // );
  //write response to json file

  const json = JSON.stringify(products);
  const fs = require("fs");
  fs.writeFileSync("./data/images.json", json);
};

init();
