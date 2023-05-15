# Page Init

`page-init` is a command-line interface (CLI) tool that automates the creation of HTML and SCSS files for new web pages. With a single command, you can create a new directory for your page and generate an HTML file with the necessary boilerplate code, as well as a linked SCSS file with commonly used helpers and components.

## Installation

```
npm install -g page-init
```

## Usage

Navigate to the directory where you want to create a new HTML and SCSS file, and then run the following command:

```
page-init
```

Follow the prompts to enter a filename (without extension), and the tool will create a new directory with the given filename inside the `pages` directory, and two files named `{filename}.html` and `{filename}.scss` inside the newly created directory.

By default, `page-init` will create a new HTML file and SCSS file in a new directory with the same name as the filename you specify. The SCSS file will be linked to the HTML file using a `<link>` tag in the `<head>` section.

### Options

Page Init also supports the following options:

- `--css`: Use this flag to create a CSS file instead of an SCSS file.
- `--js`: Use this flag to create a JavaScript file in the same folder as the other files and add this script as the last element to the bottom of the HTML `head` tag with the `defer` attribute.

To use an option, simply include it when running the `page-init` command. For example:

```
page-init --css
```

This will create a CSS file instead of an SCSS file.

## Example

Running `page-init` and entering `about` as the filename will create the following file structure and contents:

```
./
├── pages/
│   └── about/
│       ├── about.html
│       └── about.scss
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

## What makes page-init a useful tool

- **Saves time:** Instead of manually creating a new HTML and SCSS file for each new page you want to add to your project, you can use page-init to quickly generate boilerplate code. This saves you time and allows you to focus on the more important aspects of your project.
- **Consistency:** By using page-init, you can ensure that each new page you create has the same basic structure and follows the same naming convention. This can help keep your project organized and make it easier to navigate.
- **Ease of use:** Page-init is a simple and straightforward tool that is easy to use, even for developers who are new to command line tools. The prompts guide you through the process of creating a new page, so you don't have to worry about remembering complex command line syntax.
- **Customization:** Page-init allows you to customize the boilerplate code it generates to fit your specific project needs. You can modify the SCSS imports to include your own styles, and you can also modify the HTML file to include any additional markup you need.

## Requirements

Page Init is designed to work best with the build found at [https://github.com/Angelos-Barmpoutis/vite-build](https://github.com/Angelos-Barmpoutis/vite-build). This build uses Vite to bundle and optimize your code for production. If you are not using this build, you may need to modify the SCSS imports accordingly.

## Acknowledgments

This project makes use of the following open source software:

- [Node.js](https://nodejs.org/)
- [Inquirer.js](https://github.com/SBoudrias/Inquirer.js/)
- [Commander.js](https://github.com/tj/commander.js/)

## Contributing

If you would like to contribute to this project, please fork the repository and create a pull request with your changes.

## Credits

Page Init was created by [Angelos Barmpoutis](https://github.com/Angelos-Barmpoutis).
