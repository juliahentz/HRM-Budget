angular.module('admin').factory('contractService',function(
    $http
) {

    var contractService = {
        model:{
            item:{},
            list:[]
        },
        getAll:function(cb){

            return $http.get('/api/parameters/contracts')
                .then(function(res){

                    var list = res.data;
                    contractService.model.list = list;

                    if(cb){
                        cb(list);
                    }

                });
        },
        getOne:function(id, cb){

            return $http.get('/api/parameters/contract/'+id)
                .then(function(res){

                    var item = res.data;
                    contractService.model.item = item;

                    if(cb){
                        cb(item);
                    }

                });
        },
        create:function(data, cb){

            return $http.post('/api/parameters/contract', data)
                .then(function(res){

                    var item = res.data;
                    contractService.model.item = item;

                    if(cb){
                        cb(item);
                    }

                });
        },
        update:function(id, data, cb){

            return $http.put('/api/parameters/contract/'+id, data)
                .then(function(res){

                    contractService.model.item = res.data;

                    if(cb){
                        cb(res.data);
                    }

                });
        },
        remove:function(id, cb){

            return $http.delete('/api/parameters/contract/'+id)
                .then(function(res){

                    contractService.model.item = null;

                    if(cb){
                        cb(res);
                    }

                });
        }
    };

    return contractService;
});
