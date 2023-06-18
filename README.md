# Page Init

`page-init` is a command-line interface (CLI) tool that automates the creation of HTML, CSS/SCSS, and JS files for new web pages. With a single command, you can create a new directory for your page and generate an HTML file with the necessary boilerplate code, as well as linked CSS/SCSS and JS files.

## Description

Page Init simplifies the process of creating new web pages by generating the required files and boilerplate code. It ensures consistency in your project structure and saves you time by automating repetitive tasks.

## Installation

```
npm install -g page-init
```

## Usage

Navigate to the directory where you want to create a new page, and then run the following command:

```
page-init --style <css | scss> --output <path> [--no-script] [--vite-build] [--empty-scss]
```

Follow the prompts to enter a filename, and the tool will create a new directory with the given filename inside the specified output directory, and generate the corresponding HTML, CSS/SCSS, and JS files inside the newly created directory.

### Options

- `--output <path>` (required): Specifies the output directory where the page will be created.
- `--style <css | scss>` (required): Specifies the style type for the page. Choose between `css` or `scss`.
- `--no-script`: Optional. If provided, no JavaScript file will be created for the page.
- `--empty-scss`: Optional. If provided, an empty SCSS file will be created for the page.
- `--vite-build`: Optional. If provided, the `vite.config.js` file will be updated to include the newly created page.

To use the options, simply include them when running the `page-init` command. For example:

```
page-init --style scss --no-script --output pages --vite-build --empty-scss
```

This will create a new page with SCSS style, no JavaScript file, update the `vite.config.js` file, and create an empty SCSS file.

## Example

Running the `page-init` command with the specified options will create the following file structure and contents:

```
./
├── pages/
│   └── about/
│       ├── about.html
│       ├── about.scss
│       └── about.js
```

**about.html**

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>About</title>
    <link rel="stylesheet" href="about.scss" />
    <script src="about.js" type="module"></script>
  </head>
  <body></body>
</html>
```

**about.scss**

```scss
@use "../../shared/helpers/normalize.scss";
@use "../../shared/helpers/variables.scss" as v;
@use "../../shared/helpers/breakpoints.scss" as bp;
@use "../../shared/helpers/generals.scss";
@use "../../shared/components/header.scss";
@use "../../shared/components/footer.scss";
```

**about.js**

```javascript
// Your custom JavaScript code goes here
```

## Requirements

`page-init` is designed to work best with the build found at [Vanillium](https://github.com/Angelos-Barmpoutis/Vanillium). This build uses Vite to bundle and optimize your code for production. If you are not using this build, you may need to modify the SCSS imports and other parts of the generated code accordingly.

## Acknowledgments

This project makes use of the following open source software:

- [Node.js](https://nodejs.org/)
- [Inquirer.js](https://github.com/SBoudrias/Inquirer.js/)
- [Commander.js](https://github.com/tj/commander.js/)

## Contributing

If you would like to contribute to this project, please fork the repository, create a new branch, and submit a pull request with your changes.

## Credits

Page Init was created by [Angelos Barmpoutis](https://github.com/Angelos-Barmpoutis).
