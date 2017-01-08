(function () {
    'use strict';
    angular
        .module('todoApp')
        .component('todoList', {
            controller: ToDoComponent,
            templateUrl: 'todomvc-index.html'
        });

    ToDoComponent.$inject = ['$scope', '$filter'];

    function ToDoComponent($scope, $filter) {
        const ctrl = this;
        ctrl.$onInit = function() {
            ctrl.lists = [
                {
                    id: 0,
                    name: 'Monday',
                    todos:[
                        {text: 'Create App', done: false}
                    ],
                    show: null,
                    percentage: {width: '0%'}
                }
            ];
        };


        ctrl.showHide = function (arr, item) {
            if(arr.show == null) return;
            return arr.show == item.done;
        };

        ctrl.showCount = function ($index) {
            let complete = $filter('filter')(ctrl.lists[$index].todos, { done: true }).length;
            ctrl.lists[$index].percentage = {width: complete + '0%'};
            return complete;
        };

        ctrl.createList = function (name) {
          ctrl.lists.push({id: ctrl.lists.length + 1 , name: name, todos:[]});
        };

        ctrl.deleteList = function (index) {
            ctrl.lists.splice(index, 1);
        };

        ctrl.addTodo = function(listId) {
            ctrl.lists[listId].todos.push({text:ctrl.todoText, done:false});
            ctrl.todoText = '';
        };

        ctrl.remaining = function() {
            var count = 0;
            angular.forEach(ctrl.todos, function(todo) {
                count += todo.done ? 0 : 1;
            });
            return count;
        };

        ctrl.removeTodo = function (listIndex, todosIndex) {
            ctrl.lists[listIndex].todos.splice(todosIndex, 1);
        };

        ctrl.archive = function(listIndex) {
            var oldTodos = ctrl.lists[listIndex].todos;
            ctrl.lists[listIndex].todos = [];
            angular.forEach(oldTodos, function(todo) {
                if (!todo.done) ctrl.lists[listIndex].todos.push(todo);
            });
        };



    }
})();