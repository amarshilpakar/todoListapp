//for todolist, list controller
myApp.controller('ListController',['$scope','$state','indexDBService', function($scope,$state,indexDBService){
    $scope.disabled = true;
    $scope.todoList = [];
    $scope.chckedIndexs = [];

    $scope.getList=function(){
        indexDBService.openStore('todoList', function(store){
            store.getAll().then(function(data) {         
            $scope.todoList = data;
            });            
        });

    }

    //function call
    $scope.getList();

    $scope.add=function(){
        $state.go('addToList');
    }

    $scope.selectAll = function(){
        angular.forEach($scope.todoList, function (item) {
                item.Selected = $scope.selectedAll;
                if ($scope.selectedAll) {
                    $scope.disabled = false;
                    $scope.chckedIndexs.push(item.id);
                } else {
                    $scope.disabled = true;
                    $scope.chckedIndexs = [];
                }
            });
    }
    $scope.checkedIndex = function ($event, id) {
        $event.stopPropagation();
        if ($scope.chckedIndexs.indexOf(id) === -1) {
            $scope.chckedIndexs.push(id);
            $scope.disabled = false;
            if ($scope.chckedIndexs.length == $scope.todoList.length) {
                $scope.selectedAll = true;
            }
        } else {
            $scope.chckedIndexs.splice($scope.chckedIndexs.indexOf(id), 1);
            $scope.selectedAll = false;
            if ($scope.chckedIndexs <= 0) {
                $scope.disabled = true;
            }
        }
    }
    function deleteListItem(array, indexz) {
        var id = array[indexz];
        indexDBService.openStore('todoList', function(store){                    
            store.delete(id).then(function(){
                for(i=0;i<$scope.todoList.length;i++){
                    if($scope.todoList[i]["id"] == id){
                        $scope.todoList.splice(i);
                        break;
                    }
                }               

            });
                    
        });
            
    }

    $scope.delete = function () {
            if ($scope.chckedIndexs.length > 0) {                 
                var indexz = 0;  
                for(k=0;k<$scope.chckedIndexs.length;k++){
                     deleteListItem($scope.chckedIndexs, indexz);
                     indexz++;
                }
            }
        }

 


}]);

myApp.controller('addController',['$scope','$state','indexDBService', '$filter', function($scope,$state,indexDBService,$filter){
    

    $scope.add=function(addTodo){
        if(!addTodo.$valid){      
            alert("Fields are empty");     
            return;
        }
        else{
            $scope.date = $filter('date')(new Date($scope.date),'yyyy-MM-dd HH:mm');
            indexDBService.openStore("todoList",function(db){
                indexDBService.insert({'Name':$scope.name, 'Description':$scope.description, 'Date':$scope.date},db,function(){
                    $state.go("list");
                });
            });
        }

    }

    $scope.gotoList= function(){
        $state.go('list');
    }

    $scope.opendatepicker =  function(){
        $('#datetimepicker1').datetimepicker();
    }

}]);
