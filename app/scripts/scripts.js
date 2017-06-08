$(document).ready(function(){


var advanceTask = function(task) {
  var modified = task.innerText.trim()
  for (var i = 0; i < listo.length; i++) {
    if (listo[i].task === modified) {
      if (listo[i].id === 'new') {
        listo[i].id = 'inProgress';
      } else if (listo[i].id === 'inProgress') {
        listo[i].id = 'archived';
      } else {
        listo.splice(i, 1);
      }
      break;
    }
  }
  task.remove();
};


// hides the newTaskForm on opening app
$('#newTaskForm').hide();

// this is where our todo list items get pushed
var listo = [];

var Task = function(task){
    this.task = task;
    this.id = 'new';
}

// this checks if the input to see if it's not empty and then pushes the
// input onto listo.  Then it clears the input box and appends the new
// task after the newList div.  Then it toggles the newTaskForm
var addTask = function(task) {
    if(task){
        task = new Task(task);
        listo.push(task);

        $('#newItemInput').val('');
        $('#newList').append(
            '<a href="#finish" class="" id="item">' +
            '<li class="list-group-item">' +
            '<h3>' + task.task + '</h3>'+
            '<span class="arrow pull-right">' +
            '<i class="glyphicon glyphicon-arrow-right">' +
            '</span>' +
            '</li>' +
            '</a>'
        );
    }
    $('#newTaskForm').slideToggle('fast','linear');
};

// this calls the addTask function when we click on saveNewItem button

$('#saveNewItem').on('click', function (e) {
    e.preventDefault();
    var task = $('#newItemInput').val().trim();
    addTask(task);
});

// enables opening and closing the new task from with the newListItem and Cancel buttons

// opens task form
$('#add-todo').on('click', function(){
    $('#newTaskForm').fadeToggle('fast', 'linear');
})

// closes task form
$('#cancel').on('click', function(e){
    e.preventDefault();
    $('#newTaskForm').fadeToggle('fast', 'linear');
});

// allows us to change the status of an item from 'new' to 'inProgress'
$(document).on('click', '#item', function(e){
    e.preventDefault();
    var task = this;
    advanceTask(task);
    this.id = 'inProgress'
    $('#currentList').append(this.outerHTML);
})

// moves items from 'inProgress' to 'archived' on click
$(document).on('click', '#inProgress', function (e) {
    e.preventDefault();
    var task = this;
    task.id = "archived";
    var changeIcon = task.outerHTML.replace('glyphicon-arrow-right', 'glyphicon-remove');
    advanceTask(task);
    $('#archivedList').append(changeIcon);
});

// deletes items from list
$(document).on('click', '#archived', function (e) {
    e.preventDefault();
    var task = this;
    advanceTask(task);
});





















})