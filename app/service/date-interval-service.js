angular.module('HRMBudget').factory('dateIntervalService',function($http) {

    var dateIntervalService = {
        model:{
            item:{}
        },
        getOne:function(id, cb){

            return $http.get('/api/date-interval/'+id)
                .then(function(res){

                    var item = res.data;
                    dateIntervalService.model.item = item;

                    if(cb){
                        cb(item);
                    }
                });
        },
        create:function(data, cb){

            return $http.post('/api/date-interval', data)
                .then(function(res){

                    var item = res.data;
                    dateIntervalService.model.item = item;

                    if(cb){
                        cb(item);
                    }
                });
        },
        update:function(id, data, cb){

            return $http.put('/api/date-interval/'+id, data)
                .then(function(res){

                    dateIntervalService.model.item = res.data;

                    if(cb){
                        cb(res.data);
                    }
                });
        },
        remove:function(id, cb){

            return $http.delete('/api/date-interval/'+id)
                .then(function(res){

                    dateIntervalService.model.item = {};

                    if(cb){
                        cb(res);
                    }
                });
        }
    };

    return dateIntervalService;
});
