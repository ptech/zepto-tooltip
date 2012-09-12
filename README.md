# Zepto Tooltip

Responsive and Mobile-Friendly Tooltip. Based on the great [jQuery Tooltip](http://osvaldas.info/u/p4Yk) from Osvaldas Valutis.

## Getting Started
Download [Zepto][zepto] and [Zepto Tooltip][zepto-tooltip].

[zepto]: http://zeptojs.com/
[zepto-tooltip]: https://github.com/downloads/ptech/zepto-tooltip/zepto-tooltip-1.0.0.zip

In your web page, include Zepto library and Zepto Tooltip CSS theme and JavaScript files:

```html
<link rel="stylesheet" href="css/smooth/zepto-tooltip.css" />
<script src="js/zepto.js"></script>
<script src="js/zepto-tooltip.js"></script>
```

Assign the attribute ```rel="tooltip"``` and ```title="Enter your tip here"``` to any of _body_ tags in HTML file where you want the tooltip to pop up when called. Set _title_ value with your tip (use ```<strong>```, ```<em>``` etc. to distinguish text fragments, but avoid _block_ elements).

## Examples

```html
<abbr title="User Experience" rel="tooltip">UX</abbr>
```

[View demo](http://ptech.github.com/zepto-tooltip)

## Key features

* It's **responsive**. It relies on a maximum width value when viewed on large screens, adopts to narrow environments and picks the best viewable position relatively to the target (top, bottom; left, center, right);
* It's **mobile-friendly**. It pops up when a call-to-action button is tapped and disappears when tapped on the tooltip itself;
* It's **HTML formatting capable**. Need to write some words in italic or so? No problem, this will work out.

## Building Zepto Tooltip
Zepto Tooltip uses the [grunt](http://github.com/cowboy/grunt) build system. Building Zepto Tooltip requires you to have [node.js](http://nodejs.org/) and [npm](http://npmjs.org/) installed.

Install grunt:  
```npm install grunt -g```

Clone the Zepto Tooltip git repo:  
```git clone git://github.com/ptech/zepto-tooltip.git```  
```cd zepto-tooltip```

Install node modules:  
```npm install grunt-contrib```  
```npm install grunt-css```

Run grunt:  
```grunt build```

There are many other tasks that can be run through grunt. For a list of all tasks:  
```grunt --help```

## License
Copyright (c) 2012 Present Technologies  
Licensed under the Apache License, Version 2.0 (see [LICENSE.txt](https://github.com/ptech/zepto-tooltip/blob/master/LICENSE.txt)).
