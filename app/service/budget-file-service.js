angular.module('HRMBudget').factory('budgetFileService',function($http) {

    var budgetFileService = {
        model:{
            item:{},
            list:[]
        },
        getAll:function(cb){

            return $http.get('/api/budget-files')
                .then(function(res){

                    var list = res.data;
                    budgetFileService.model.list = list;

                    if(cb){
                        cb(list);
                    }
                });
        },
        getOne:function(id, cb){

            return $http.get('/api/budget-file/'+id)
                .then(function(res){

                    var item = res.data;
                    budgetFileService.model.item = item;

                    if(cb){
                        cb(item);
                    }
                });
        },
        create:function(data, cb){

            return $http.post('/api/budget-file', data)
                .then(function(res){

                    var item = res.data;
                    budgetFileService.model.item = item;

                    if(cb){
                        cb(item);
                    }
                });
        },
        update:function(id, data, cb){

            return $http.put('/api/budget-file/'+id, data)
                .then(function(res){

                    budgetFileService.model.item = res.data;

                    if(cb){
                        cb(res.data);
                    }
                });
        },
        remove:function(id, cb){

            return $http.delete('/api/budget-file/'+id)
                .then(function(res){

                    budgetFileService.model.item = {};

                    if(cb){
                        cb(res);
                    }
                });
        }
    };

    return budgetFileService;
});
