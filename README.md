# Dentropize
Javascript function to sort tables

## Demo
[GitHub Pages](https://duffyjp.github.io/2023/05/22/Table-Sorting.html)

## Install

* Copy in the dentropize.js to your project or use [jsDelivr](https://github.com/duffyjp/dentropize/issues/1). 
  * `vendor/javascript/dentropize.js` for Rails.
* Import the function
* Add to the appropriate event for your framework.
* Example below is a Rails 7 app using Importmaps and Turbo

```javascript
// app/javascript/application.js

import dentropize from "dentropize"
document.addEventListener('turbo:load', dentropize);
```

```ruby
# config/importmap.rb

pin "dentropize", to: "dentropize"
```


## Usage

* Add the CSS class "sortable" to your table.


## Notes

* This code is essentially a heavily modified [sortable](https://github.com/tofsjonas/sortable) made to work like [jquery tablesorter](https://mottie.github.io/tablesorter/docs/) but only the parts you really REALLY need.
* There is no requirement for a `<tbody>` instead any rows NOT in a `<thead>` or `<tfoot>` are sorted. 
  
