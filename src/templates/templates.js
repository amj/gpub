gpub.templates = {};

/**
 * A representation of a GPub template. Like normal HTML templating, but quite
 * a bit simpler.
 */
gpub.templates._Template = function(sections, paramMap) {
  this._sections = sections;
  this._paramMap = paramMap;
  this._paramContent = {};
};

gpub.templates._Template.prototype = {
  /** Compiles the template with the new template variables. */
  compile: function() {
    var sectionsCopy = this._sections.slice(0);
    for (var key in this._paramMap) {
      var idx = this._paramMap[key];
      var content = this._paramContent[key] || '';
      sectionsCopy[idx] = content;
    }
    return sectionsCopy.join('');
  },

  /** Returns true if the template has parameter given by 'key' */
  hasParam: function(key) {
    return !!this._paramMap[key];
  },

  /** Sets a template parameter. */
  setParam: function(key, value) {
    if (!this._paramMap[key]) {
      throw new Error('Unknown key: ' + key);
    }
    this._paramContent[key] = value.toString();
  }
};