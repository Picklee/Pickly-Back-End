var app = angular.module('todo', []);

app.controller('MainController', function($scope, $http) {
    function updateDataFromServer(){
      console.log('update function called');
      $http.get("/todo")
      .then(function(response) {
        console.log(response.data)
          $scope.todos=response.data
      });
    }

    updateDataFromServer();

    setInterval(function(){
      updateDataFromServer();
    }, 1000)

    $scope.addTodo=function()
    {
    console.log($scope.text);
    var data=$scope.text;
    $http.post('/todo',{text:data})
    .then(function(response){
      console.log(response.data)
      $scope.todos.unshift({text:data})
    })
    $scope.text='';
    }

    $scope.removeTodo=function($index)
    {
      // $index=$scope.todos.length-1-$index;
      $http({
      method: 'DELETE',
      url: '/todo',
      data: {index:$index},
      headers: {'Content-Type': 'application/json;charset=utf-8'}
      })
      .then(function(response){
        console.log("SDsdsdsd",response.data);
        // delete $scope.todos[$index]
        $scope.todos.splice($index,1)
      });

    }
    // $http.delete('todo',{data:{index:1}})
    // .then(function(response){
    //   console.log('assas',response.data)
    // })
});
