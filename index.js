/**
 * Module dependencies.
 */
var buffer = require('buffer')
  , proto = require('./lib/proto');

/**
 * Plugin.
 */

module.exports = function (Collection) {

  for(var key in proto) Collection.prototype[key] = proto[key];

  Collection.on('construct', function (collection) {

      collection.model.on('saving', function () {
        if (collection.options.updateChangedModels !== false) collection.updateChangedModels();
        if (collection.options.saveNewModels !== false) collection.saveNewModels();
      });

      if (collection.options.saveOnPlaceholder !== false) {
        collection.on('placeholder', buffer(function () {
          collection.model.save();
        }, 100));
      }
  });
};