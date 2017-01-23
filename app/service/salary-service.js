angular.module('HRMBudget').factory('salaryService',function($http) {

    var salaryService = {

        model:{
            item:{},
            list:[]
        },
        getAll:function(cb){

            return $http.get('/api/parameters/salaries')
                .then(function(res){

                    var list = res.data;
                    salaryService.model.list = list;

                    if(cb){
                        cb(list);
                    }

                });
        },
        getOne:function(id, cb){

            return $http.get('/api/parameters/salary'+id)
                .then(function(res){

                    var item = res.data;
                    salaryService.model.item = item;

                    if(cb){
                        cb(item);
                    }
                });
        },
        create:function(data, cb){

            return $http.post('/api/parameters/salary', data)
                .then(function(res){

                    var item = res.data;
                    salaryService.model.item = item;

                    if(cb){
                        cb(item);
                    }

                });
        },
        update:function(id, data, cb){

            return $http.put('/api/parameters/salary'+id, data)
                .then(function(res){

                    salaryService.model.item = res.data;

                    if(cb){
                        cb(res.data);
                    }

                });
        },
        remove:function(id, cb){

            return $http.delete('/api/parameters/salary'+id)
                .then(function(res){

                    salaryService.model.item = null;

                    if(cb){
                        cb(res);
                    }

                });
        }

    };

    return salaryService;
});
