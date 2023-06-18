#!/usr/bin/env node

import { existsSync, mkdirSync, writeFile } from "fs";
import inquirer from "inquirer";
import { program } from "commander";
import { resolve } from "path";
import { readFileSync, writeFileSync } from "fs";

// Define command-line options
program
  .requiredOption("--style <css | scss>", "Specify the style type: scss or css")
  .option("--no-script", "Do not create a JS file")
  .requiredOption("--output <path>", "Specify the output path")
  .option("--vite-build", "Update the vite.config.js file")
  .option("--empty-scss", "Create an empty SCSS file");

// Parse command-line options
program.parse(process.argv);

// Check if the style option is provided
if (!program.opts().style) {
  console.error("Error: Required option '--style <css | scss>' not specified");
  process.exit(1);
}

if (program.opts().viteBuild) {
  const viteConfigPath = resolve(process.cwd(), "vite.config.js");
  if (!existsSync(viteConfigPath)) {
    console.error("Error: vite.config.js file not found!");
    process.exit(1);
  }
}

// Prompt user for filename
inquirer
  .prompt([
    {
      type: "input",
      name: "filename",
      message: "Enter page's name:",
    },
  ])
  .then((answers) => {
    const filename = answers.filename;
    const output = program.opts().output;
    const dir = resolve(output, filename);

    // Create directory if it doesn't exist
    if (!existsSync(dir)) {
      mkdirSync(dir, { recursive: true });
    }

    // Create new HTML file with boilerplate code and linked CSS/JS file
    let htmlContent = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${filename}</title>`;

    if (program.opts().style.toLowerCase() === "scss") {
      htmlContent += `\n    <link rel="stylesheet" href="${filename}.scss" />`;
      if (program.opts().emptyScss) {
        createScssFile("");
      } else {
        createScssFile(`@use "../../shared/helpers/normalize.scss";
@use "../../shared/helpers/variables.scss" as v;
@use "../../shared/helpers/breakpoints.scss" as bp;
@use "../../shared/helpers/generals.scss";
@use "../../shared/components/header.scss";
@use "../../shared/components/footer.scss";`);
      }
    } else if (program.opts().style.toLowerCase() === "css") {
      htmlContent += `\n    <link rel="stylesheet" href="${filename}.css" />`;
      createCssFile();
    }

    if (program.opts().script) {
      htmlContent += `\n    <script src="${filename}.js" type="module"></script>`;
      createJsFile();
    }

    htmlContent += `
  </head>
  <body></body>
</html>`;

    writeFile(`${dir}/${filename}.html`, htmlContent, (err) => {
      if (err) throw err;
    });

    if (program.opts().viteBuild) {
      // Update vite.config.js
      const viteConfigPath = resolve(process.cwd(), "vite.config.js");
      const configSource = readFileSync(viteConfigPath, "utf-8");

      const updatedConfigSource = configSource.replace(
        /(rollupOptions:\s*{[\s\S]*?\n\s+)(})/,
        (match, start, end) => {
          const filename = answers.filename;
          const output = program.opts().output;
          const camelCaseFilename = convertToCamelCase(filename);
          const inputEntry = `\t${camelCaseFilename}: resolve(__dirname, "${output}/${filename}/${filename}.html"),`;

          return `${start}${inputEntry}\n\t\t\t${end}`;
        }
      );

      writeFileSync(viteConfigPath, updatedConfigSource, "utf-8");

      // Helper function to convert a two-word filename to camelCase
      function convertToCamelCase(filename) {
        const words = filename.split(/[-_\s]/);
        const camelCaseWords = words.map((word, index) => {
          if (index === 0) {
            return word.toLowerCase();
          }
          return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
        });
        return camelCaseWords.join("");
      }
    }

    console.log(`\nSuccessfully created ${filename}`);

    function createScssFile(scssContent) {
      writeFile(`${dir}/${filename}.scss`, scssContent, (err) => {
        if (err) throw err;
      });
    }

    function createCssFile() {
      const cssContent = "";

      writeFile(`${dir}/${filename}.css`, cssContent, (err) => {
        if (err) throw err;
      });
    }

    function createJsFile() {
      const jsContent = "";

      writeFile(`${dir}/${filename}.js`, jsContent, (err) => {
        if (err) throw err;
      });
    }
  });
