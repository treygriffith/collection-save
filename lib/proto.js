var noop = function () {};

/**
 * Save all the new models, and update changed ones
 * @param  {Function} callback evaluated after all models have been updated
 * @return {Object}            Collection
 * @api public
 */

exports.save = function (callback) {

  callback = callback || noop;

  var i = 2
    , cb = function() {
        if(--i) callback();
      };

  return this.updateChangedModels(cb).saveNewModels(cb);
};

/**
 * Save all the models, regardless of status
 * @param  {Function} callback evaluated after all models have been updated
 * @return {Object}            Collection
 * @api public
 */
exports.saveAll = function (callback) {

  callback = callback || noop;

  var i = this.length();

  if(i) this.emit('saving');

  this.each(function (model) {
    model.save(function() {
      if(!--i) {
        collection.emit('save');
        callback();
      }
    });
  });

  return this;
};

/**
 * Update the changed models
 * @param  {Function} callback evaluated after all changed models have been updated
 * @return {Object}            Collection
 * @api public
 */

exports.updateChangedModels = function (callback) {

  callback = callback || noop;

  var changed = this.select(function (model) {
    return !!Object.keys(model.dirty).length && !model.isNew();
  });

  var i = changed.length();

  if(i) this.emit('saving');

  changed.each(function (model) {
    model.update(function() {
      if(!--i) {
        collection.emit('save');
        callback();
      }
    });
  });

  return this;
};

/**
 * Save the new models
 * @param  {Function} callback evaluated after all changed models have been updated
 * @return {Object}            Collection
 * @api public
 */

exports.saveNewModels = function (callback) {

  callback = callback || noop;

  var collection = this;

  var newModels = this.select(function (model) {
    return model.isNew();
  });

  var i = newModels.length();

  if(i) this.emit('saving');

  newModels.each(function (model) {
    model.save(function() {
      if(!--i) {
        collection.emit('save');
        callback();
      }
    });
  });

  return this;
};