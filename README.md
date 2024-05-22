# Welcome to the Queer Winnipeg website repository!

[![Netlify Status](https://api.netlify.com/api/v1/badges/7de7ab58-f3e9-46cf-a445-0fa7f2b264a2/deploy-status)](https://app.netlify.com/sites/queerwinnipeg/deploys)

If you're here, welcome to the repo! Contributions are greatly appreciated. If you've found an issue with the site, create a [new issue](https://gitlab.com/queerwinnipeg/queerwinnipeg.ca/-/issues) and we'll do our best to address it.

## Getting Started for Writers

If you wish to write for the website, currently you'll have to go through the steps of a developer. Writing for the website currently is also somewhat technical, requiring knowledge of Markdown and MDX.

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

This is important if you wish to create new content on the website. To make this work:

1. Run the following in a terminal

   ```sh
   pnpx decap-server
   ```

2. Go to http://localhost:4321/admin, and you should be good to go.

### Creating a Merge Request

Go create a [Merge Request](https://gitlab.com/queerwinnipeg/queerwinnipeg.ca/-/merge_requests) here.

## Contributing

We're open to contributions!
