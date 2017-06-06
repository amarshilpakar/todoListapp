
var myApp = angular.module('myApp', ['ui.router','mainApp','indexedDB','ui.bootstrap.datetimepicker','ui.dateTimeInput']);
         
         // configuring our routes 

myApp.config(function($stateProvider, $urlRouterProvider) {
    
    $stateProvider
    
        // route to show our basic form in login page
        
            
        .state('list', {
            url: '/list',
            templateUrl: 'views/list.html',
            controller: 'ListController'
        })

        //for adding todoList
        .state('addToList', {
            url: '/addToList',
            templateUrl: 'views/add.html',
            controller: 'addController'
        })
        
        
       
    // catch all route
    // send users to the form page 
    $urlRouterProvider.otherwise('/list');
})

myApp.config(function ($indexedDBProvider) {
     $indexedDBProvider.connection('testIndexDB').upgradeDatabase(1.11, function(event, db, tx){
        var objStore = db.createObjectStore('todoList', {keyPath: 'id',autoIncrement:true});
        objStore.createIndex('Name', 'Name', {unique: false});
        objStore.createIndex('Description', 'Description', {unique: false});
        objStore.createIndex('Date', 'Date', {unique: false});        

        
    });

});



