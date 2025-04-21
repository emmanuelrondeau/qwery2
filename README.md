# Welcome to the Queer Winnipeg website repository!

[![Built with Astro](https://astro.badg.es/v2/built-with-astro/tiny.svg)](https://astro.build)

If you're here, welcome to the repo! Contributions are greatly appreciated. If you've found an issue with the site, create a [new issue](https://gitlab.com/queerwinnipeg/queerwinnipeg.ca/-/issues) and we'll do our best to address it.

## Getting Started for Writers

If you wish to write for the website, currently you'll have to go through the steps of a developer. Writing for the website currently is also somewhat technical, requiring knowledge of Markdown and a bit of MDX.

Other than searching up tutorials on the basics of Markdown, the existing articles are a great reference point for how to format articles you make.

## Getting Started for Developers

For ease of development, [Devbox](https://www.jetify.com/devbox/) is the recommended way to install dependencies. Alternatively, you could look in [devbox.json](./devbox.json) to figure out what to install manually.

I recommend you first [install Devbox](https://www.jetify.com/docs/devbox/installing_devbox/) and [Git](https://git-scm.com). Then, in a terminal, run the following:

```sh
git clone https://gitlab.com/queerwinnipeg/queerwinnipeg.ca
cd queerwinnipeg.ca
devbox shell
```

> [!tip]
> If you're fancy, [direnv](https://direnv.net/) is supported. If you have that set up, it'll automatically run `devbox shell` after running `cd queerwinnipeg.ca`, to activate the environment for you.

If it worked, great! You've now installed some important dependencies, such as pnpm. pnpm is a package manager commonly used for installing and managing JavaScript/TypeScript packages. We'll now download said packages with the following command:

```sh
pnpm install
```

Once that's done, we're now ready to cross our fingers and see if your local instance of the website runs. Lastly, run the following command:

```sh
pnpm dev
```

If everything went well, ta-da! You now have a working development instance on http://localhost:4321.

### Editors

If you don't already have a code editor to work with this repository, I recommend [VS Codium](https://vscodium.com). We also have some helpers for VS Cod(ium) that suggests extensions you should install, to make your development experience better (and in my opinion, actually usable).

### Maintenance

- To upgrade the container dependencies, run `devbox update`
- To upgrade the web dependencies, run `pnpm upgrade`
	- There's also `pnpm upgrade-deps` if you want an interactive terminal user interface, along with upgrading dependencies to major versions that may break things.

## License

### Codebase

The code is (with the exception of otherwise-noted files in the repository) under the <dfn>Mozilla Public License</dfn> 2.0 (<abbr>MPL</abbr>). See [LICENSE](./license) for the legalese, or check the <abbr>MPL</abbr> [<abbr>tl;dr</abbr>Legal](https://www.tldrlegal.com/license/mozilla-public-license-2-0-mpl-2).

### Images

The images in this repository are either:

- Sourced from Unsplash
- Camera pictures taken by us
- Screenshots taken by us
- Copyrighted but used under the pretense of fair dealing

Any images taken from Unsplash or any third party belong to their respective owners. Unsplash images may be uncredited through the website's content itself. Otherwise, any images under the Creative Commons will have a caption with proper attribution.

Any photos taken or images created by us are licensed under [Creative Commons BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/) rules.

If you're a copyright owner of any of the images hosted, please [create an issue](https://gitlab.com/queerwinnipeg/queerwinnipeg.ca/-/issues). We unfortunately don't have an email currently.

### Text

Text contents (ex. text that appears on the website, articles/posts, etc.) is copyrighted, and all rights are reserved to their respective authors. This does *not* include developer documentation (ex. this README), and the pure code/markup (ex. the HTML and TypeScript within .astro files, boilerplate MDX). Feel free to create an issue for clarification.

## Contributing

We're open to contributions! You can create a [Merge Request](https://gitlab.com/queerwinnipeg/queerwinnipeg.ca/-/merge_requests) here. If you're looking to create an article, see the [Article Style Guide](https://queerwinnipeg.ca/posts/article-style-guide).

## Attribution

We use [jdecked's fork of Twemoji](https://github.com/jdecked/twemoji) on our site!
