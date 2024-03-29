describe('save', function () {

  var collections = require('treygriffith-collection')
    , assert = require('component-assert')
    , model = require('segmentio-model')
    , type = require('component-type')
    , save = require('collection-save');

  it('saves new and updated models when the parent model is saved', function () {

    var Todo = model('todo')
      .attr('id')
      .attr('name')
      .attr('content');

    var User = model('user')
      .use(collections.use(save))
      .collection('todos', Todo);

    var user = new User();
    var todo1 = new Todo({
      id: 1,
      name: "something",
      content: "something else"
    });
    todo1.dirty = {};
    var todo2 = new Todo({
      id: 2,
      name: "something",
      content: "something else"
    });

    user.todos().add(todo1);
    user.todos().add(todo2);
    todo2.name("blah");
    user.todos().add({
      name: "blahblah",
      content: "blahblahblah"
    });

    todo1.on('saving', function () {
      assert(false);
    });

    todo2.on('saving', function () {
      assert(true);
    });

    user.todos().last().on('saving', function () {
      assert(true);
    });

    user.emit('saving');
  });

  it('replaces placeholders on the model\'s first save', function () {

    var Todo = model('todo')
      .attr('id')
      .attr('name')
      .attr('content');

    var User = model('user')
      .use(collections.use(save))
      .collection('todos', Todo);

    var user = new User();

    user.todos([{
      title: "Something",
      content: "blah"
    }]);

    var placeholder = user.attrs.todos[0];

    user.todos().first().on('save', function () {
      assert(user.todos().first().id() === 1);
    });

    user.todos().first().id(1); // add an id (which the db would)
    user.todos().first().emit('save'); // simulate save

  });


});
