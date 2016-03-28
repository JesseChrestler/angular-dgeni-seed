# angular-dgeni-seed
Generic Dgeni seed based on the angularjs implementation

**Installation**

To build the docs all you need to do is run npm install (in the directory you've downloaded the source to)

` npm install `

then you'll need to run your gulp command to build the docs (gulp should be installed globally `npm install gulp -g`)

` gulp build:docs `

Keep in mind the docs are in html5 mode so you'll need to rewrite requests to the index page in order for routing to work.

The documentation is put into the /build/docs folder by default

you can test this documentation site by spinning up the docs by executing the following command

` npm run docs` 


> **Templates Folder**
> /docs/config/templates/
> 
> The templates are how the content is generated for many of the main content items, like the index page, the search, and navigation. 

> **Documentation Deployment Folder**
> /docs/config/services/deployments/
> 
> The documentation deployments are where you define the files needed for a deployment for the documentation site. All the files needed to run both the site and the examples.

> **Content Folder**
> /docs/content/
>
>The content folder is where you put all static content in your documentation site. Those files are all have extension .ngdoc


