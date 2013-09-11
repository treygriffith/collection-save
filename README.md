## collection-autosave

Automatically saves child models when the parent model is saved.
Also optionally saves the parent model when the placeholder primary key is replaced with a permanent one in a child model.


### API

```js
var model = require('model')
	, collection = require('collection')
    .use(require('collection-autosave'));

var Todo = model('todo')
  .attr('content');

var User = model('user')
  .collection('todos', Todo, {saveOnPlaceholder: true});

var user = new User();

user.todos().add({
  content: 'something'
});

user.save(); // => triggers a save of the todo, and re-saves the parent when the todo has a primary key set after its save.
```