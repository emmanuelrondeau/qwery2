# Welcome to the Queer Winnipeg website repository!

If you're here, welcome to the repo! Contributions are greatly appreciated. If you've found an issue with the site, create a [new issue](https://gitlab.com/queerwinnipeg/queerwinnipeg.ca/-/issues) and we'll do our best to address it.

## Getting Started for Writers

If you wish to write for the website, currently you'll have to go through the steps of a developer. Writing for the website currently is also somewhat technical, requiring knowledge of Markdown and MDX.

Other than searching up tutorials on the basics of Markdown, the existing articles are a great reference point for how to format articles you make within Decap CMS.

## Getting Started for Developers

If you're looking to do code improvements for the website, here's what you need to know:

### The Basics

1. Clone the repository with [Git](https://git-scm.com). You may need to install it if you don't have it already. To close the repository, open a terminal, then run the following commands:

   ```sh
   git clone https://gitlab.com/queerwinnipeg/queerwinnipeg.ca
   ```

1. Then install [pnpm](https://pnpm.io/installation). Then in a terminal, run the command for your respective system;

   ```powershell
   # Windows
   iwr https://get.pnpm.io/install.ps1 -useb | iex
   ```

   ```sh
   # On POSIX systems
   curl -fsSL https://bun.sh/install | bash
   ```

1. Run the following commands:

   ```sh
   pnpm install
   pnpm dev
   ```

   Ta-da! You now have a working development instance on http://localhost:4321.

### Decap CMS

You may want to have the Decap server running on your local instance. Once you've done the above steps, this will let you access a local admin panel.

**This is important if you wish to create new content on the website!** Creating `.mdx` files manually may cause the articles to not appear in the CMS, despite it displaying on the website. To make this work:

1. Run the following in a terminal

   ```sh
   pnpx decap-server
   ```

2. Go to http://localhost:4321/admin, and you should be good to go.



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

Any photos taken by us are licensed under [Creative Commons BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/) rules.

If you're a copyright owner of any of the images hosted, please [create an issue](https://gitlab.com/queerwinnipeg/queerwinnipeg.ca/-/issues). We unfortunately don't have an email currently.

### Text Content

The text content is copyrighted, and all rights are reserved to their respective authors.

## Contributing

We're open to contributions! You can create a [Merge Request](https://gitlab.com/queerwinnipeg/queerwinnipeg.ca/-/merge_requests) here. Here's some things you should know;

### Images

If you use any images, please make sure you can legally use that image!

If you use any copyrighted works, but believe it can be used in fair use, please make a comment like this within the article, something like this:

<!-- prettier-ignore-start -->
```mdx
{/* Picture licensed under All Rights Reserved, on https://www.wealthsimple.com/en-ca/learn/50-30-20-rule */}
<Image
   alt="Pie chart breaking down the 50:30:20 rule"
   src={Wealthsimple_50_30_20_Rule}
/>
```
<!-- prettier-ignore-end -->

If you're contributing your own photos, follow the below formatting. CC BY-SA 4.0 is used as an example.

<!-- prettier-ignore-start -->
```mdx
{/* Picture by Fio Cobbs on Queer Winnipeg, licensed under CC BY-SA 4.0. */}
<Image
   alt="Paper transfer"
   src={PaperTransfer}
/>
   ```
<!-- prettier-ignore-end -->

If the image is under the Creative Commons and you're not the copyright owner, give adequate credit. An example of doing this properly can be found in [How to Take the Bus in Winnipeg - BLUE Buses](https://queerwinnipeg.ca/posts/how-to-take-the-bus-in-winnipeg/#blue-buses).

> Just in case, assuming you're not making edits with VS Code and using Prettier, make sure the line breaks comments are the same, and the `prettier-ignore` comments preserved.

```mdx
<figure>
	<Image
		alt="The St. Norbert Bus"
		src={StNorbertBus}
	/>
	<FigureCaption>
		{/* prettier-ignore-start */}

    	Picture by [Justin Rombough](https://www.flickr.com/photos/bpomanitoba) on [Flicker](https://www.flickr.com/photos/bpomanitoba/50368893052/in/photostream/), licensed under [CC BY-NC-SA 2.0](https://creativecommons.org/licenses/by-nc-sa/2.0/).

    	{/* prettier-ignore-end */}
    </FigureCaption>

</figure>
```

If you're contributing your own photos under a Creative Commons license, feel free to credit yourself. For contributing cover images, and you wish to credit yourself, please put your attribution at the bottom of the article.

### Text Content

For headers:

- For sentences as the header, use sentence case
- For any other kind of header, use Wikipedia title formatting

You can get an authoritative answer on how to case from https://titlecaseconverter.com/.

## Attribution

We use [jdecked's fork of Twemoji](https://github.com/jdecked/twemoji) on our site!
