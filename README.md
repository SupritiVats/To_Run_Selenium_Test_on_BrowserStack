
# Technical Assignment: Run Selenium Test on BrowserStack

To demonstrate web scraping, API integration, and text processing using the Selenium framework. This project involves scraping articles from the website - [El País](https://elpais.com/)
 (a Spanish news outlet), translating article titles, analyzing repeated words in translated headers, and testing the functionality across multiple browsers.


# Task Overview

## Steps:

### 1. **Visit the website [El País](https://elpais.com/)**, a Spanish news outlet
- Navigate to the **[El País](https://elpais.com/)** website, which is a prominent Spanish news outlet.
- **Ensure that the website’s text is displayed in Spanish.**

### 2. **Scrape Articles from the Opinion Section**
- **Navigate to the Opinion section** of the website.
- **Fetch the first five articles** in this section.
- **Print the title and content** of each article in Spanish.
- If available, **download and save the cover image** of each article to your local machine.

### 3. **Translate Article Headers**
- Using a translation API :
  - **Rapid Translate Multi Traduction API**
- **Translate the title** of each article to English.
- **Print the translated headers**.

### 4. **Analyze Translated Headers**
- From the translated headers, **identify any words that are repeated more than twice** across all headers combined.
- **Print each repeated word** along with the count of its occurrences.

### 5. **Cross-Browser Testing**
- **Run the solution locally** to verify functionality.
- Once validated, **execute the solution on BrowserStack** across 5 parallel threads, testing across a combination of desktop and mobile browsers.



## **DEFINITION, TOOLS AND TECHNOLOGIES**

## Web scraping

Web scraping (or data scraping) is a technique used to collect content and data from the internet. This data is usually saved in a local file so that it can be manipulated and analyzed as needed.

## API Integration

API integration refers to the process of connecting two or more applications or systems by using APIs (Application Programming Interfaces) to exchange data and perform actions. APIs are sets of protocols and standards that allow different software applications to communicate with each other.

## Selenium WebDriver

Selenium WebDriver is the core component of Selenium which provides a programming interface for driving the web browsers. It allows to write tests in different programming languages to interact with the web elements, simulate user interactions and perform assertions.

## Prerequisites

Before running the project, we need to install these requirements:

- **Node.js** (version 12 or higher)
- **npm** (Node package manager)
- **[BrowserStack Account](https://www.browserstack.com/)** (for cross-browser testing)
- **[Rapid API Access Key](https://rapidapi.com/sibaridev/api/rapid-translate-multi-traduction/pricing)** (for using the translation API)


## Project Setup

1. **Initialize the project**:
   In the root project directory, run the following command to create a `package.json` file:

   ```bash
   npm init -y
   ```

2. **Install dependencies:**:
   Install the required packages for the project:

  - Selenium WebDriver (for browser automation)
  - dotenv (for environment variable management)
  - axios (for making HTTP requests)

  ```bash
  npm install selenium-webdriver dotenv axios
  ```


## Environment Variables

To run this project, we will need to add the following environment variables to our .env file

`BROWSERSTACK_USERNAME`

`BROWSERSTACK_ACCESS_KEY`

`RAPID_ACCESS_KEY`


# **Script Overview**

1. **`selenium-webdriver`**: 
   Imports necessary modules for controlling web browsers for web scraping and automation.
   
2. **`fs`**: Provides functionality for interacting with the file system, such as reading and writing files.

3. **`https`**: Used for making secure HTTPS requests to external resources like images or data.

4. **`path`**: Helps in handling and manipulating file and directory paths.

5. **`axios`**: A popular HTTP client for making requests to APIs and retrieving data.

6. **`dotenv`**: Loads environment variables from a `.env` file, ensuring sensitive data like API keys are kept secure and not hardcoded.

```bash
const { Builder, By, until } = require("selenium-webdriver");
const fs = require("fs");
const https = require("https");
const path = require("path");
const axios = require("axios");
require("dotenv").config();
```

### Combination of 5 different browsers and devices for parallel execution testing.

## BrowserStack Capabilities

The `browserStackCapabilities` array is a configuration setup used to define the test environments for running automated tests on the BrowserStack platform. Each object in the array specifies details about a particular browser or device where the tests will run.

### Key Features of the Configuration:
1. **`browserName`**: 
   - Specifies the browser to be used for testing (e.g., Chrome, Firefox, Safari, etc.).

2. **`browserstack.user`** and **`browserstack.key`**: 
   - Authenticates with BrowserStack using the username and access key retrieved from environment variables (`BROWSERSTACK_USERNAME` and `BROWSERSTACK_ACCESS_KEY`) for security.

3. **Operating System Details**:
   - `os` and `os_version` define the operating system and its version (e.g., Windows 10, macOS Catalina).

4. **Screen Resolution**:
   - `resolution` sets the screen resolution for the test environment (e.g., 1920x1080).

5. **Device Testing**:
   - For mobile testing, `device`, `os_version`, and `real_mobile` specify the target mobile device, its operating system version, and whether it is a real device.

6. **Test Name**:
   - The `name` field provides a descriptive name for each test environment for easy identification on the BrowserStack dashboard.

### Example Configurations:
- **Desktop Browsers**:
  - Chrome and Firefox on Windows 10.
  - Safari on macOS Catalina.
  
- **Mobile Devices**:
  - iPhone 12 running iOS 14.
  - Google Pixel 5 running Android 11.

This setup allows comprehensive cross-platform and cross-browser testing by leveraging BrowserStack's cloud infrastructure.

### Array
```bash
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
```


## Translation Function with RapidAPI

This JavaScript function leverages the RapidAPI service to translate text from Spanish to English. It uses the `axios` library for making HTTP POST requests and requires a valid RapidAPI access key for authentication.

### Key Features of the Function:
1. **Purpose**:
   - Translates text (article titles) from Spanish (`es`) to English (`en`).

2. **Endpoint**:
   - The translation request is sent to the `https://rapid-translate-multi-traduction.p.rapidapi.com/t` endpoint.

3. **Headers**:
   - `X-RapidAPI-Host`: Specifies the RapidAPI host.
   - `X-RapidAPI-Key`: Uses the access key from environment variables (`process.env.RAPID_ACCESS_KEY`) for authentication.
   - `Content-Type`: Indicates the request is in JSON format.

4. **Request Body**:
   - `from`: Source language (`es` for Spanish).
   - `to`: Target language (`en` for English).
   - `q`: The text to be translated (e.g., an article title).

5. **Error Handling**:
   - Logs the error message if the translation request fails.
   - Returns `"Translation failed"` in case of errors or unexpected API responses.

6. **Response Handling**:
   - Checks if the API response is an array with at least one element.
   - Returns the first element of the response as the translated text.

### Function
```bash
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

```

## Function: Analyze Repeated Words in Headers

This JavaScript function is designed to analyze a list of translated headers and identify words that are repeated more than twice across all headers. The function outputs the repeated words along with their respective counts.

### How It Works:
1. **Input**:
   - Accepts an array of headers (`headers`), where each header is a string.

2. **Process**:
   - **Normalization**: Converts each header to lowercase to ensure case-insensitive comparison.
   - **Word Splitting**: Splits each header into individual words using whitespace as a delimiter (handles multiple spaces effectively with a regex).
   - **Word Count**: Maintains a count of each word's occurrence across all headers using an object (`wordCount`).

3. **Filter**:
   - Identifies words that appear more than twice across the headers.

### Function:
```bash 

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


```



## Function: runTest

The `runTest` function automates the process of testing the El País website across various browsers and devices using BrowserStack's WebDriver. It performs a series of actions on the website and collects information for further analysis.

### Function Overview
This function uses Selenium WebDriver to:
1. Navigate to the El País homepage.
2. Accept cookies if the consent popup appears.
3. Locate and navigate to the "Opinion" section dynamically.
4. Extract and process information from articles in the "Opinion" section:
   - Titles (including translation to English).
   - Content.
   - Cover images (if available).

It also analyzes translated article titles to find repeated words using the `analyzeRepeatedWords` function.

---

### Key Features
- **Cross-Browser Testing**: Works with BrowserStack capabilities to test across multiple browser and device configurations.
- **Dynamic Locators**: Handles changing website layouts by dynamically locating elements like the "Opinion" section link.
- **Content Translation**: Translates Spanish article titles to English using the RapidAPI translation service.
- **Content Analysis**:
  - Extracts titles and content from articles.
  - Downloads and saves cover images locally, if available.
- **Repeated Word Analysis**: Identifies words repeated more than twice in translated titles.

---

### Process Steps
1. **Initialize WebDriver**:
   - Builds a driver with capabilities passed as parameters and connects to the BrowserStack server.

2. **Navigate to the Homepage**:
   - Opens the El País homepage and logs success.

3. **Accept Cookies**:
   - Locates and clicks the "Accept Cookies" button, if present.

4. **Find and Open the "Opinion" Section**:
   - Dynamically locates the "Opinion" section link and navigates to the URL.

5. **Process Articles**:
   - Locates the main section of articles and iterates through a maximum of 5 articles to:
     - Extract and log the title.
     - Translate the title to English using `translateText`.
     - Extract and log the content.
     - Download and save the cover image locally.

6. **Analyze Translated Titles**:
   - Calls `analyzeRepeatedWords` to identify repeated words in the translated titles.

7. **Completion and Cleanup**:
   - Logs success and closes the WebDriver session.

---


### Notes
- **Dependencies**:
  - BrowserStack credentials (`BROWSERSTACK_USERNAME`, `BROWSERSTACK_ACCESS_KEY`) should be set in the `.env` file.
  - RapidAPI access key (`RAPID_ACCESS_KEY`) is required for the translation service.
- **Error Handling**:
  - Handles cases where cookies popup, content, or images are not available, ensuring smooth execution without breaking.
- **Customization**:
  - You can modify the number of articles to process or the translation languages by changing relevant parameters.
- **BrowserStack Integration**:
  - The `runTest` function is designed to work with capabilities defined in the `browserStackCapabilities` array.

---

### code 

```bash
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

```

## Running Tests Suite in Parallel Across Multiple Capabilities

The script efficiently executes test cases simultaneously on multiple browser and device configurations using Promise.all. 

```bash
// Running tests suite in parallel across multiple and different capabilities.

(async () => {
  try {
    // Executes all test runs in parallel using Promise.all
    await Promise.all(
      browserStackCapabilities.map((capabilities) => runTest(capabilities))
    );

    // Log success message after all tests have completed
    console.log("All tests executed successfully!");
  } catch (error) {
    // Catch and log any errors encountered during execution
    console.error("Error during parallel test execution:", error);
  }
})();

```


# **Code Execution Output**

When we run the script- The parallel threads of test suite gets executed and the output is- 

### Available public test links under this script are:

- [Oppo Reno 6, 11.0, Chrome](https://automate.browserstack.com/builds/8433e92f2a85704f6a181368c478e810d674d8aa/sessions/90664377e85a9b2227a18dd91e48235451de053c?auth_token=11bccd6496d60c52b2618afe7dca3d69d9d1e47a6fac8ae3b744fe2dcaf5c267)


- [Firefox 133.0, Win 11](https://automate.browserstack.com/builds/8433e92f2a85704f6a181368c478e810d674d8aa/sessions/9f9e6cc29461e8ba74a68b5790a1072f04f3f7ff?auth_token=8ab1fd2f22b4c7166d14c2d814ca59d702a6d3c85ddff9701cced1a142ab0b20)


- [Chrome 131.0, Win 10](https://automate.browserstack.com/builds/8433e92f2a85704f6a181368c478e810d674d8aa/sessions/e5c0dc0fb10caffac9ae3a6cc525feab540c7999?auth_token=0b2a6d56b56546db66bed63ace269ff913def64f8b7f4a2681742b14adac6065)


- [Safari 11.1, High Sierra](https://automate.browserstack.com/builds/8433e92f2a85704f6a181368c478e810d674d8aa/sessions/c6bbb90bfe699ea9d4041062b7c5da566cb81143?auth_token=717c87c1b25d8de2409e02c48d767c66a2ceefa3e33588552f5086f40f521e0f)


This output is for one of the device test- 

```bash
 node index.js
Navigated to El Pais homepage.
======================================
Cookies accepted.
======================================
Found Opinion section link: https://elpais.com/opinion/
======================================
Navigated to the Opinion section.
======================================
Located the main section with class 'z z-hi'.
======================================
Found 14 articles.
======================================
Title 1: Europa, ante una economía global de todos contra todos
--------------------------------------
API Response: [ 'Europe, before a global economy against all' ]
Translated Title 1: Europe, before a global economy against all
--------------------------------------
Content: La llegada de Trump va a acentuar un nacionalismo económico sin complejos que obliga a la UE a unirse y salir de su parálisis
======================================
No image found for Article 1
======================================
Title 2: La crisis del FC Barcelona exige respuestas
--------------------------------------
API Response: [ "FC Barcelona's crisis demands answers" ]
Translated Title 2: FC Barcelona's crisis demands answers
--------------------------------------
Content: El fiasco en torno a Olmo es consecuencia de una gestión descuidada de las finanzas que compromete el prestigio del club y sus resultados
======================================
No image found for Article 2
======================================
Title 3: El miedo y los límites
--------------------------------------
API Response: [ 'Fear and limits' ]
Translated Title 3: Fear and limits
--------------------------------------
Content: La respuesta progresista a la nostalgia ultraderechista debe, sin arrogancia ni desdén, restituir la confianza en la democracia y recordar que es cosa de todos
======================================
No image found for Article 3
======================================
Title 4: El tiempo de la desconfianza
--------------------------------------
API Response: [ 'The time of distrust' ]
Translated Title 4: The time of distrust
--------------------------------------
Content: La razón ha sido reemplazada por la emoción como herramienta para juzgar lo que pasa; la sensación de no saber qué es la realidad común lleva una década ocurriendo, pero comenzó antes
======================================
Image 4 saved to F:\All Repositories\To_Run_Selenium_Test_on_BrowserStack\opinion_image_4.jpg
======================================
Title 5: Puigdemont, el emérito y Mazón
--------------------------------------
API Response: [ 'Puigdemont, the emeritus and mazón' ]
Translated Title 5: Puigdemont, the emeritus and mazón
--------------------------------------
Content not found for Article 5
======================================
No image found for Article 5
======================================
No words are repeated more than twice.
Test executed successfully!
======================================
All tests executed successfully!
```
