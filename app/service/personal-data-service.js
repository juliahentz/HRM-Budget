angular.module('HRMBudget').factory('personalDataService',function(
    $http
) {

    var personalDataService = {
        model:{
            item:{},
            list:[]
        },
        getAll:function(cb){

            return $http.get('/api/personal-datas')
                .then(function(res){

                    var list = res.data;
                    personalDataService.model.list = list;

                    if(cb){
                        cb(list);
                    }
                });
        },
        getOne:function(id, cb){

            return $http.get('/api/personal-data/'+id)
                .then(function(res){

                    var item = res.data;
                    personalDataService.model.item = item;

                    if(cb){
                        cb(item);
                    }
                });
        },
        create:function(data, cb){

            return $http.post('/api/personal-data', data)
                .then(function(res){

                    var item = res.data;
                    personalDataService.model.item = item;

                    if(cb){
                        cb(item);
                    }
                });
        },
        update:function(id, data, cb){

            return $http.put('/api/personal-data/'+id, data)
                .then(function(res){

                    personalDataService.model.item = res.data;

                    if(cb){
                        cb(res.data);
                    }
                });
        },
        remove:function(id, cb){

            return $http.delete('/api/personal-data/'+id)
                .then(function(res){

                    personalDataService.model.item = {};

                    if(cb){
                        cb(res);
                    }
                });
        }
    };

    return personalDataService;
});
