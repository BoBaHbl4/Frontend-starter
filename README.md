# Frontend-starter
Starting pack for angularjs project with default nodejs/bower packages and gulp tasks.

### Version
2.0.1

### Installation notes
'Frontend-starter' requires [node, npm](https://nodejs.org/), [bower](http://bower.io/) and [git](https://git-scm.com/) (follow links to read installation guides).

To start project install all npm and bower dependencies run in command line:

```
npm install
```
```
bower install
```

Run gulp starting task (to create all environment in Dev folder — js/less/fonts/etc...):
```
gulp start-setup-dev
```

After this you can run dev server
```
gulp dev-start
```

**And after that you are ready to work!**

To create build you need to run 'create-build' task
```
gulp create-build
```

Build server
```
gulp build-server
```


You project structure will be:
```
|-- project
|   |-- .git
|   |-- bower_components // all bower components will be placed into this directory
|   |-- build // build directory
|   |-- dev_root // working directory
|   `-- node_modules // all node modules will be placed into this directory
|-- .bowerrc
|-- .gitignore
|-- bower.json
|-- gulpfile.js
|-- package.json
`-- README.md
```
(You can change default project structure and starting templates as you like, but in this case you should update gulpfile.js and all gulp tasks for new folder structure.)