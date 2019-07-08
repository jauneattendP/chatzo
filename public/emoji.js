l(function( global ) {
  var emojify = (function() {

// Get DOM as local variable for simplicity's sake
var document = global.window.document;

return {

 // This functions sets configuration options
  config: function(emoticons, people, nature, objects, places, symbols) {
    this.emoticons_enabled = typeof emoticons !== 'undefined' ? emoticons : true;
    this.people_enabled = typeof people !== 'undefined' ? people : true;
    this.nature_enabled = typeof nature !== 'undefined' ? nature : true;
    this.objects_enabled = typeof objects !== 'undefined' ? objects : true;
    this.places_enabled = typeof places !== 'undefined' ? places : true;
    this.symbols_enabled = typeof symbols !== 'undefined' ? symbols : true;
  },

  // Helper function to find text within DOM
  findText: function(element, pattern, callback) {
    for (var childi = element.childNodes.length; childi-->0;) {
      var child = element.childNodes[childi];
      if (child.nodeType == 1) {

        // Get tag name and class attribute
        var tag = child.tagName.toLowerCase(), classname;
        if(child.hasAttribute('class'))
          classname = child.getAttribute('class').toLowerCase();

        // Hacky at the minute, needs to be fixed
        if (classname) {
           if (tag !== 'script' && tag !== 'style' && tag !== 'textarea' && classname !== 'no-emojify')
             this.findText(child, pattern, callback);
        } else {
           if (tag !== 'script' && tag !== 'style' && tag !== 'textarea')
             this.findText(child, pattern, callback);
        }

      } else if (child.nodeType == 3) {
        var matches = [];
        if (typeof pattern === 'string') {
          console.error('Accepts regex only');
        } else {
          var match;
          while (match = pattern.exec(child.data))
            matches.push(match);
        }
        for (var i = matches.length; i-->0;)
          callback.call(window, child, matches[i]);
      }
    }
  },
  // Main method
  run: function() {
    var emoticons = [
      [/:-*\)/g, 'emojify blush'],
      [/:-*o/gi, 'emojify scream'],
      [/(:|;)-*]/g, 'emojify smirk'],
      [/(:|;)-*d/gi, 'emojify smiley'],
      [/xd/gi, 'emojify stuck_out_tongue_closed_eyes'],
      [/:-*p/gi, 'emojify stuck_out_tongue_winking_eye'],
      [/:-*(\[|@)/g, 'emojify rage'],
      [/:-*\(/g, 'emojify disappointed'],
      [/:'-*\(/g, 'emojify sob'],
      [/:-*\*/g, 'emojify kissing_heart'],
      [/;-*\)/g, 'emojify wink'],
      [/:-*\//g, 'emojify pensive'],
      [/:-*s/gi, 'emojify confounded'],
      [/:-*\|/g, 'emojify flushed'],
      [/:-*\$/g, 'emojify relaxed'],
      [/:-*x/gi, 'emojify mask'],
      [/<3/g, 'emojify heart'],
      [/<\/3/g, 'emojify broken_heart']
    ], people = [
      [/:bowtie:/g, 'emojify bowtie'],
      [/:smile:/g, 'emojify smile'],
      // Lots more regex keys
    ], nature = [
      [/:sunny:/g, 'emojify sunny'],
      [/:umbrella:/g, 'emojify umbrella'],
      // Lots more regex keys
    ], objects = [
      [/:bamboo:/g, 'emojify bamboo'],
      [/:gift_heart:/g, 'emojify gift_heart'],
      // Lots more regex keys
    ], places = [
      [/:109:/g, 'emojify onezeronine'],
      [/:house:/g, 'emojify house'],
      // Lots more regex keys
    ], symbols = [
      [/:one:/g, 'emojify one'],
      [/:two:/g, 'emojify two'],
      // Lots more regex keys
    ], r;

    // Create array of selected icon sets
    var selected_sets = [];
    if(this.people_enabled)
      selected_sets.push(people);
    if(this.nature_enabled)
      selected_sets.push(nature);
    if(this.objects_enabled)
      selected_sets.push(objects);
    if(this.places_enabled)
      selected_sets.push(places);
    if(this.symbols_enabled)
      selected_sets.push(symbols);
    if(this.emoticons_enabled)
      selected_sets.push(emoticons);

    // Iterate through selected icon sets
    for (var index = 0; index < selected_sets.length; index++) {
      // Iterate through all regexes
      while (r = selected_sets[index].shift()) {
        // Find and replace matches with <div> tags
        this.findText(document.body, r[0], function(node, match) {
          var wrap = document.createElement('div');
          wrap.setAttribute('class', r[1]);
          node.splitText(match.index);
          node.nextSibling.nodeValue = node.nextSibling.nodeValue.substr(match[0].length, node.nextSibling.nodeValue.length);
          wrap.appendChild(node.splitText(match.index));
          node.parentNode.insertBefore(wrap, node.nextSibling);
        });
      }
    }
  }
};
  })();

  global.emojify = emojify;

})( this );