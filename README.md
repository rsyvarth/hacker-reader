# Hacker Reader
A simple hacker news interface with link previews. Made using Hacker News' [api](https://github.com/HackerNews/API), [embed.ly](http://embed.ly/), and [desktoppr](https://www.desktoppr.co/).

Application structure based on my [angular boilerplate](https://github.com/rsyvarth/angular-boilerplate).

You can view a hosted preview of the site [here](http://hacker-reader.syvarth.com/).

## Getting Started
Install Node.js then complete the following steps
```
git clone https://github.com/rsyvarth/hacker-reader.git
cd hacker-reader
sudo npm install -g gulp bower
npm install
bower install
gulp
```
You should now be able to open up `localhost:1234` in your browser. The page 
will automatically reload any time you make a change to any of the source files.

## Building for Production
Production builds are identical to development builds (for now, probably should 
add file revisioning at some point) in order to prevent issues with bugs showing
up in production builds that don't appear in dev. To make a production build just
run:
```
gulp build
```
Then move the files from the `dist` directory onto your webserver.

## Testing
Unit tests are run using Karma through gulp.
```
gulp test
```

## Additional Commands
There are more commands avaialable through gulp. If you would like to see a listing
of all of the avialable tasks try running `gulp help`

## Structure
The structure for this application is based on the best practices found [here](https://github.com/trochette/Angular-Design-Patterns-Best-Practices).
This includes an event framework and more classical OOP class inheritance. There are a 
few important parts of the application to take note of which are explained in the following
sections.

### Components
Components are logical blocks of functionality that are grouped together and used as a unit.
A single component may contain any number of controllers, directives and subcomponents. 

### Models
Models handle all of the business logic surrounding the data within the application.
This includes CRUD operations as well as things such as formatting for use by the app.
They allow components to access and modify data without being concerned with any of 
the details or side effects that change might require.

### Services
Services are general purpose classes that provide abstractions on top of existing interfaces
so our application can depend on interfaces instead of exact implementations. Some examples 
of services include classes for handling interaction with an external API such as twitter
or a class which provides a generic persistent storage interface on top of either localstorage
or cookies depending on the current browser's capabilities.

### Lang
This application uses [angular translate](http://angular-translate.github.io/) in order to
manage language strings. While many applications won't ever need to be translated into a 
different language the absraction of lanauge strings can still be useful. Primarily it 
makes it much easier for customization of the text in the application since the text
can be changed independently of any of the core code. Additionally it allows for reuse
of common strings so that in the case the string needs to be changed the edit can be made 
once and it will automatically update everywhere.

### Partials
Partials are simply small pieces of html templates. They are generally structured in such
a way as to match the directory structure of their corresponding component.