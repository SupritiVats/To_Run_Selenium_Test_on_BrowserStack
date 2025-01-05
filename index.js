const { Builder, By, until } = require("selenium-webdriver");
const fs = require("fs");
const https = require("https");
const path = require("path");
const axios = require("axios");
require("dotenv").config();

//Combination of 5 different browsers and devices for parallel execution testings.
const browserStackCapabilities = [
  {
    browserName: "chrome",
    "browserstack.user": process.env.BROWSERSTACK_USERNAME,
    "browserstack.key": process.env.BROWSERSTACK_ACCESS_KEY,
    os: "Windows",
    os_version: "10",
    resolution: "1920x1080",
    name: "Test on Chrome - Windows 10",
  },
  {
    browserName: "firefox",
    "browserstack.user": process.env.BROWSERSTACK_USERNAME,
    "browserstack.key": process.env.BROWSERSTACK_ACCESS_KEY,
    os: "Windows",
    os_version: "10",
    resolution: "1920x1080",
    name: "Test on Firefox - Windows 10",
  },
  {
    browserName: "safari",
    "browserstack.user": process.env.BROWSERSTACK_USERNAME,
    "browserstack.key": process.env.BROWSERSTACK_ACCESS_KEY,
    os: "macOS",
    os_version: "Catalina",
    resolution: "1920x1080",
    name: "Test on Safari - macOS Catalina",
  },
  {
    browserName: "iphone",
    "browserstack.user": process.env.BROWSERSTACK_USERNAME,
    "browserstack.key": process.env.BROWSERSTACK_ACCESS_KEY,
    device: "iPhone 12",
    os_version: "14",
    real_mobile: true,
    resolution: "1080x1920",
    name: "Test on iPhone 12 - iOS 14",
  },
  {
    browserName: "android",
    "browserstack.user": process.env.BROWSERSTACK_USERNAME,
    "browserstack.key": process.env.BROWSERSTACK_ACCESS_KEY,
    device: "Google Pixel 5",
    os_version: "11",
    real_mobile: true,
    resolution: "1080x1920",
    name: "Test on Google Pixel 5 - Android 11",
  },
];

let translatedHeaders = []; // Translated headers Array
 
//Function to translate text using RapidAPI with access-key
async function translateText(title) {
  const url = "https://rapid-translate-multi-traduction.p.rapidapi.com/t";
  const headers = {
    "X-RapidAPI-Host": "rapid-translate-multi-traduction.p.rapidapi.com",
    "X-RapidAPI-Key": process.env.RAPID_ACCESS_KEY, 
    "Content-Type": "application/json",
  };

  const body = {
    from: "es", // Spanish
    to: "en",  // English
    q: title, // Title of the article needs to be translated from spanish to english.
  };

  try {
    const response = await axios.post(url, body, { headers });
    console.log("API Response:", response.data); 

    if (Array.isArray(response.data) && response.data.length > 0) {
      return response.data[0]; 
    } else {
      console.log("Unexpected API response format.");
      return "Translation failed";
    }
  } catch (error) {
    console.error("Error during translation:", error.message);
    return "Translation failed";
  }
}

// Function to analyze repeated words in the translated headers
function analyzeRepeatedWords(headers) {
  const wordCount = {};

  headers.forEach((header) => {
    const words = header.toLowerCase().split(/\s+/); 
    words.forEach((word) => {
      wordCount[word] = (wordCount[word] || 0) + 1;
    });
  });

  const repeatedWords = Object.entries(wordCount).filter(
    ([word, count]) => count > 2
  );

  if (repeatedWords.length > 0) {
    repeatedWords.forEach(([word, count]) => {
      console.log(`${word}: ${count}`);
    });
  } else {
    console.log("No words are repeated more than twice.");
  }
}

// Function to run all the test for given browsers and devices in - browserStackCapabilities
async function runTest(capabilities) {
  const driver = new Builder()
    .usingServer(
      `https://${process.env.BROWSERSTACK_USERNAME}:${process.env.BROWSERSTACK_ACCESS_KEY}@hub-cloud.browserstack.com/wd/hub`
    )
    .withCapabilities(capabilities)
    .build();

  try {
    // Opening homepage- El Pais 
    await driver.get("https://elpais.com/");
    console.log("Navigated to El Pais homepage.");
    console.log("======================================");

    // Cookies are getting accepted, if it appears.
    try {
      const acceptButton = await driver.wait(
        until.elementLocated(By.id("didomi-notice-agree-button")),
        10000
      );
      await acceptButton.click();
      console.log("Cookies accepted.");
      console.log("======================================");
    } catch (popupError) {
      console.log("No cookies popup found or already accepted.");
      console.log("======================================");
    }

    // Locating the "Opinion" section link dynamically beacuse opinion section is present one more time in the homepage as in trending section and it keeps on changing in layout.
    const opinionLink = await driver.wait(
      until.elementLocated(By.css('a[href*="/opinion/"]')),
      10000
    );
    const opinionUrl = await opinionLink.getAttribute("href");
    console.log(`Found Opinion section link: ${opinionUrl}`);
    console.log("======================================");

    // Navigated to the "Opinion" section
    await driver.get(opinionUrl);
    console.log("Navigated to the Opinion section.");
    console.log("======================================");

    // Locate the section with class "z z-hi" as this is unique identifier within this page.
    const mainSection = await driver.wait(
      until.elementLocated(By.css(".z.z-hi")),
      10000
    );
    console.log("Located the main section with class 'z z-hi'.");
    console.log("======================================");

    // Finding all articles with class "c c-o c-d" as it helps to iterrate through.
    const articles = await mainSection.findElements(By.css(".c.c-o.c-d"));
    console.log(`Found ${articles.length} articles.`);
    console.log("======================================");

    // Iterate through the articles to find title and the content of each article with downloading cover images if its available.
    for (let i = 0; i < Math.min(articles.length, 5); i++) {
      const article = articles[i];

      // Extracting the title
      let title = "No title available";
      try {
        const titleElement = await article.findElement(By.css("h2 a"));
        title = await titleElement.getText();
        console.log(`Title ${i + 1}: ${title}`);
        console.log("--------------------------------------");
      } catch (titleError) {
        console.log(`Title not found for Article ${i + 1}`);
        console.log("--------------------------------------");
      }

      // Translating the title to English
      try {
        const translatedData = await translateText(title);
        translatedHeaders.push(translatedData);
        console.log(`Translated Title ${i + 1}: ${translatedData}`);
        console.log("--------------------------------------");
      } catch (translationError) {
        console.log(`Error translating title for Article ${i + 1}:`, translationError);
        console.log("--------------------------------------");
      }

      // Extracting the content
      let content = "No content available";
      try {
        const contentElement = await article.findElement(By.css(".c_d"));
        content = await contentElement.getText();
        console.log(`Content: ${content}`);
        console.log("======================================");
      } catch (contentError) {
        console.log(`Content not found for Article ${i + 1}`);
        console.log("======================================");
      }

      // Download and save the cover image if its present in the aricle. 
      try {
        const imageElement = await article.findElement(By.css("img"));
        const imageUrl = await imageElement.getAttribute("src");

        if (imageUrl) {
          const imagePath = path.join(__dirname, `opinion_image_${i + 1}.jpg`);
          https.get(imageUrl, (response) => {
            const fileStream = fs.createWriteStream(imagePath);
            response.pipe(fileStream);
            fileStream.on("finish", () => {
              console.log(`Image ${i + 1} saved to ${imagePath}`);
              console.log("======================================");
            });
          });
        }
      } catch (imgError) {
        console.log(`No image found for Article ${i + 1}`);
        console.log("======================================");
      }
    }

    // Call to analyze the translated headers repeatition. 
    analyzeRepeatedWords(translatedHeaders);

    console.log("Test executed successfully!");
    console.log("======================================");
  } catch (error) {
    console.error("Error occurred during test execution:", error);
  } finally {
    await driver.quit();
  }
}

// Running tests suite in parallel accross multiple and different capabilities.
(async () => {
  try {
    await Promise.all(
      browserStackCapabilities.map((capabilities) => runTest(capabilities))
    );
    console.log("All tests executed successfully!");
  } catch (error) {
    console.error("Error during parallel test execution:", error);
  }
})();