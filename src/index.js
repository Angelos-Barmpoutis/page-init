#!/usr/bin/env node

const fs = require("fs");
const inquirer = require("inquirer");
const { program } = require("commander");

// Define command-line options
program.option("-c, --css", "Create a CSS file instead of a SCSS file");
program.option(
  "--js",
  "Create a JS file and add it to the HTML head tag with the defer attribute"
);

// Parse command-line options
program.parse(process.argv);

// Prompt user for filename
inquirer
  .prompt([
    {
      type: "input",
      name: "filename",
      message: "Enter filename (without extension):",
    },
  ])
  .then((answers) => {
    const filename = answers.filename;
    const dir = `pages/${filename}`;

    // Create directory if it doesn't exist
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }

    // Create new HTML file with boilerplate code and linked CSS/JS file
    let htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${filename}</title>`;

    if (program.css) {
      htmlContent += `\n  <link rel="stylesheet" href="${filename}.css">`;
      createCssFile();
    } else {
      htmlContent += `\n  <link rel="stylesheet" href="${filename}.scss">`;
      createScssFile();
    }

    if (program.js) {
      htmlContent += `\n  <script defer src="${filename}.js"></script>`;
      createJsFile();
    }

    htmlContent += `
</head>
<body>
  
</body>
</html>`;

    fs.writeFile(`${dir}/${filename}.html`, htmlContent, (err) => {
      if (err) throw err;
      console.log(`Created ${filename}.html`);
    });

    function createScssFile() {
      // Create new SCSS file
      const scssContent = `@use "../../shared/helpers/normalize.scss";
@use "../../shared/helpers/variables.scss" as v;
@use "../../shared/helpers/breakpoints.scss" as bp;
@use "../../shared/helpers/generals.scss";
@use "../../shared/components/header.scss";
@use "../../shared/components/footer.scss";`;

      fs.writeFile(`${dir}/${filename}.scss`, scssContent, (err) => {
        if (err) throw err;
        console.log(`Created ${filename}.scss`);
      });
    }

    function createCssFile() {
      // Create new CSS file
      const cssContent = "";

      fs.writeFile(`${dir}/${filename}.css`, cssContent, (err) => {
        if (err) throw err;
        console.log(`Created ${filename}.css`);
      });
    }

    function createJsFile() {
      // Create new JS file with defer attribute
      const jsContent = "";

      fs.writeFile(`${dir}/${filename}.js`, jsContent, (err) => {
        if (err) throw err;
        console.log(`Created ${filename}.js`);
      });
    }
  });
