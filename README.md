## collection-save

Adds methods to allow saving of child models directly from the collection.

Also can automatically saves child models when the parent model is saved and save the parent model when the placeholder primary key is replaced with a permanent one in a child model.


### API

#### Setup

```js
var model = require('model')
  , collection = require('collection')
    .use(require('collection-autosave'));

var Todo = model('todo')
  .attr('id')
  .attr('content');

var User = model('user')
  .attr('id')
  .collection('todos', Todo);

var user = new User();

```


#### Collection#save(callback)
Perform `model.save` on all the new models, and `model.update` on all existing ones that have changes.

```js
user.todos().first(); // => {id: 1, content: "something"}
user.todos().first().content("blah blah");
user.todos().add({content: "something else"});
user.todos().save(); // saves the second post, updates the first
```


#### Collection#saveAll(callback)
Perform `model.save` on every model


#### Collection#updateChangedModels(callback)
Perform `model.update` on all changed models (excluding new models)


#### Collection#saveNewModels(callback)
Perform `model.save` on all new models


#### Autosave

```js
user.todos().add({
  content: 'something'
});

user.save(); // => triggers a save of the todo, and re-saves the parent when the todo has a primary key set after its save.
```