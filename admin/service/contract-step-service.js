angular.module('admin').factory('contractStepService',function(
    $http
) {

    var contractStepService = {
        model:{
            item:{},
            list:[]
        },
        getAll:function(cb){

            return $http.get('/api/parameters/contract-step/steps')
                .then(function(res){

                    var list = res.data;
                    contractStepService.model.list = list;

                    if(cb){
                        cb(list);
                    }

                });
        },
        create:function(data, cb){

            return $http.post('/api/parameters/contract-step/step', data)
                .then(function(res){

                    var item = res.data;
                    contractStepService.model.item = item;

                    if(cb){
                        cb(item);
                    }

                });
        },
        update:function(id, data, cb){

            return $http.put('/api/parameters/contract-step/step/'+id, data)
                .then(function(res){

                    contractStepService.model.item = res.data;

                    if(cb){
                        cb(res.data);
                    }

                });
        },
        remove:function(id, cb){

            return $http.delete('/api/parameters/contract-step/step/'+id)
                .then(function(res){

                    contractStepService.model.item = null;

                    if(cb){
                        cb(res);
                    }

                });
        }
    };

    return contractStepService;
});
