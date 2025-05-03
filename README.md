# Welcome to the Queer Winnipeg website repository!

[![Built with Astro](https://astro.badg.es/v2/built-with-astro/tiny.svg)](https://astro.build)
[![Built with Devbox](https://www.jetify.com/img/devbox/shield_galaxy.svg)](https://www.jetify.com/devbox/docs/contributor-quickstart/)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
![Pipeline status](https://gitlab.com/queerwinnipeg/queerwinnipeg.ca/badges/main/pipeline.svg)

If you're here, welcome to the repo! Contributions are greatly appreciated. If you've found an issue with the site, create a [new issue](https://gitlab.com/queerwinnipeg/queerwinnipeg.ca/-/issues) and we'll do our best to address it.

## Getting Started for Writers

If you wish to write for the website, currently you'll have to go through the steps of a developer. Writing for the website currently is also somewhat technical, requiring knowledge of Markdown and a bit of MDX.

Other than searching up tutorials on the basics of Markdown, the existing articles are a great reference point for how to format articles you make.

Articles aim to follow this [Article Style Guide](https://queerwinnipeg.ca/posts/article-style-guide).

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

### Snippets

```sh
# Resyncing main branch with dev
git switch main && git rebase origin/dev
```

### Editors

If you don't already have a code editor to work with this repository, I recommend [VS Codium](https://vscodium.com). We also have some helpers for VS Cod(ium) that suggests extensions you should install, to make your development experience better (and in my opinion, actually usable).

### Maintenance

- To upgrade the container dependencies, run `devbox update`
- To upgrade the web dependencies, run `pnpm upgrade`
	- There's also `pnpm upgrade-deps` if you want an interactive terminal user interface, along with upgrading dependencies to major versions that may break things.

## License

### Codebase

The code is, except where otherwise noted, under the <dfn>Mozilla Public License</dfn> 2.0 (<abbr>MPL</abbr>). See [LICENSE](./license) for the legalese, or check the <abbr>MPL</abbr> [<abbr>tl;dr</abbr>Legal](https://www.tldrlegal.com/license/mozilla-public-license-2-0-mpl-2).

### Text

Text contents (ex. text that appears on the website, articles/posts, etc.), except where otherwise specified, is copyrighted. All rights are reserved to their respective authors. Articles may specify within their body, or within their raw `.mdx` file, found within `/src/content/posts`.

This does *not* include developer documentation (ex. this README), and the pure code/markup (ex. the HTML and TypeScript within .astro files, boilerplate MDX).

Feel free to create an issue for clarification.

### Images

Images, except where otherwise specified, are copyrighted. We do however use copyrighted material for articles. If you're a copyright owner of any of the images hosted, and wish to exercise your right to remove your content, please [create an issue](https://gitlab.com/queerwinnipeg/queerwinnipeg.ca/-/issues) or email [hello@queerwinnipeg.ca](mailto:hello@queerwinnipeg.ca?subject=Content%20Takedown%20Request).

## Contributing

We're open to contributions! You can create a [Merge Request](https://gitlab.com/queerwinnipeg/queerwinnipeg.ca/-/merge_requests) here. If you're looking to create an article, see the [Article Style Guide](https://queerwinnipeg.ca/posts/article-style-guide).

## Attribution

We use [jdecked's fork of Twemoji](https://github.com/jdecked/twemoji) on our site!
