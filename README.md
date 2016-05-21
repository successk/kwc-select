This is a bootstrap project to develop web components with polymer.
It provides all tools to develop and build polymer web components.

This component does not exist on bower but all the below documentation is defined as an example for your components.

# &lt;kwc-bootstrap&gt;

> Bootstrap project to create web components

## Install

Install the component using [Bower](http://bower.io/):

```sh
$ bower install kwc-bootstrap --save
```

Or [download as ZIP](https://github.com/successk/kwc-bootstrap/archive/master.zip).

## Usage

### 1 – Import polyfill:

```html
<script src="bower_components/webcomponentsjs/webcomponents-lite.min.js"></script>
```

### 2 – Import custom element:

```html
<link rel="import" href="bower_components/kwc-bootstrap/kwc-bootstrap.html">
```

### 3 – Start using it!

```html
<kwc-bootstrap property="value"></kwc-bootstrap>
```


## Documentation

See [docs](./docs) for options, children selector, methods, events and styles.

## Development

In order to run it locally you'll need to fetch some dependencies and a basic server setup.

### 1 – Install [bower](http://bower.io/) & [gulp](http://gulpjs.com/):

```sh
$ npm install -g bower gulp
$ npm install gulp
```

### 2 – Install local dependencies:

```sh
$ bower install
$ npm install
```

### 3 – Start development server and open `http://localhost:8000/components/kwc-bootstrap/`.

```sh
$ gulp dev
```

### 4 - build and minify file

```sh
$ gulp build
$ gulp verify # test minified file
```

## History

For detailed changelog, check [Releases](https://github.com/successk/kwc-bootstrap/releases).

## License

MIT