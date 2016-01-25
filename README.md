# angular-dgeni-seed
Generic Dgeni seed based on the angularjs implementation

To build the docs all you need to do is run npm install (in the directory you've downloaded the source to)

` npm install `

then you'll need to run your gulp command to build the docs (gulp should be installed globally `npm install gulp -g`)

` gulp build:docs `

Keep in mind the docs are in html5 mode so you'll need to rewrite requests to the index page in order for routing to work.

The documentation is put into the /build/docs folder by default

you can test this documentation site by spinning up the lite-server module

` lite-server ` 

This should load the browser to localhost:3000 from here you should be able to navigate to localhost:3000/build/docs/index.html