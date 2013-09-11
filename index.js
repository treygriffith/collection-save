/**
 * Module dependencies.
 */
var buffer = require('buffer');

/**
 * Plugin.
 */

module.exports = function (Collection) {

  Collection.on('construct', function (collection) {

      collection.model.on('saving', function () {
        if (collection.options.updateChangedModels !== false) collection.updateChangedModels();
        if (collection.options.saveNewModels !== false) collection.saveNewModels();
      });

      if (options.saveOnPlaceholder !== false) {
        collection.on('placeholder', buffer(function () {
          collection.model.save();
        }, 100));
      }
  });
};