#nl.js
A small node tool for launching projects in one command.

##Why?
As a web developer, I've noticed a considerable amount of time being spent
switching between projects. Because the web is such a rich place now, each time
I switch projects, I have to open any number of the following things:

* Photoshop / Gimp / Inkscape / The artwork in general
* An editor / IDE
* A terminal window that's in the correct path
* Sass, Grunt and other "pre-processing" things
* Git / issue pages

I wrote nl.js to streamline this process. Each project I work on gets a
dedicated nl.json file stored in ~/projects. Now each time I open a project
to begin work, I simply open a terminal, cd ~/projects/project-name && nljs.

###It's messy
It's a personal tool, developed exactly how I've required it, sorry.

###Using nljs

This has only been tested on a Debian (Ubuntu) environment.

``` cd /tmp ```
``` git clone https://github.com/isdampe/nl.js.git nljs-master```
``` cd nljs-master ```
``` sudo install.sh ```
``` cd /path/to/project ```
``` nljs init ```
``` vi nl.json ```

Make your changes and save it, and then finally to execute all of apps:

``` nljs ```
