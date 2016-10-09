angular.module('HRMBudget').factory('entitlementsService',function(
    $http
) {

    var entitlementsService = {
        model:{
            item:{},
            list:[]
        },
        getAll:function(cb){

            return $http.get('/api/all-entitlements')
                .then(function(res){

                    var list = res.data;
                    entitlementsService.model.list = list;

                    if(cb){
                        cb(list);
                    }
                });
        },
        getOne:function(id, cb){

            return $http.get('/api/entitlements/'+id)
                .then(function(res){

                    var item = res.data;
                    entitlementsService.model.item = item;

                    if(cb){
                        cb(item);
                    }
                });
        },
        create:function(data, cb){

            return $http.post('/api/entitlements', data)
                .then(function(res){

                    var item = res.data;
                    entitlementsService.model.item = item;

                    if(cb){
                        cb(item);
                    }
                });
        },
        update:function(id, data, cb){

            return $http.put('/api/entitlements/'+id, data)
                .then(function(res){

                    entitlementsService.model.item = res.data;

                    if(cb){
                        cb(res.data);
                    }
                });
        },
        remove:function(id, cb){

            return $http.delete('/api/entitlements/'+id)
                .then(function(res){

                    entitlementsService.model.item = {};

                    if(cb){
                        cb(res);
                    }
                });
        }
    };

    return entitlementsService;
});
