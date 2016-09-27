angular.module('HRMBudget').factory('socioStatusService',function(
    $http
) {

    var socioStatusService = {
        model:{
            item:{},
            list:[]
        },
        getAll:function(cb){

            return $http.get('/api/socio-statuses')
                .then(function(res){

                    var list = res.data;
                    socioStatusService.model.list = list;

                    if(cb){
                        cb(list);
                    }
                });
        },
        getOne:function(id, cb){

            return $http.get('/api/socio-status/'+id)
                .then(function(res){

                    var item = res.data;
                    socioStatusService.model.item = item;

                    if(cb){
                        cb(item);
                    }
                });
        },
        create:function(data, cb){

            return $http.post('/api/socio-status', data)
                .then(function(res){

                    var item = res.data;
                    socioStatusService.model.item = item;

                    if(cb){
                        cb(item);
                    }
                });
        },
        update:function(id, data, cb){

            return $http.put('/api/socio-status/'+id, data)
                .then(function(res){

                    socioStatusService.model.item = res.data;

                    if(cb){
                        cb(res.data);
                    }
                });
        },
        remove:function(id, cb){

            return $http.delete('/api/socio-status/'+id)
                .then(function(res){

                    socioStatusService.model.item = {};

                    if(cb){
                        cb(res);
                    }
                });
        }
    };

    return socioStatusService;
});
