var mainApp = angular.module("mainApp", []);

mainApp.factory('indexDBService',function($indexedDB){
    var db;
    //var request = null;
    return{
        openStore:function(name,callBack){
            $indexedDB.openStore(name, function(db) {
                callBack(db);               
            });
        },
        insert:function(insertObj,db,callBack){
            db.insert(insertObj).then(function(e){
                callBack(e);
            },function(e){
                callBack(e);
            });

        }
        
    }
})
    