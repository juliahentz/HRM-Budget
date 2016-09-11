angular.module('admin').factory('contractGradeService',function(
    $http
) {

    var contractGradeService = {
        model:{
            item:{},
            list:[]
        },
        getAll:function(cb){

            return $http.get('/api/parameters/contract-grade/grades')
                .then(function(res){

                    var list = res.data;
                    contractGradeService.model.list = list;

                    if(cb){
                        cb(list);
                    }

                });
        },
        getOne:function(id, cb){

            return $http.get('/api/parameters/contract-grade/grade/'+id)
                .then(function(res){

                    var item = res.data;
                    contractGradeService.model.item = item;

                    if(cb){
                        cb(item);
                    }
                });
        },
        create:function(data, cb){

            return $http.post('/api/parameters/contract-grade/grade', data)
                .then(function(res){

                    var item = res.data;
                    contractGradeService.model.item = item;

                    if(cb){
                        cb(item);
                    }

                });
        },
        update:function(id, data, cb){

            return $http.put('/api/parameters/contract-grade/grade/'+id, data)
                .then(function(res){

                    contractGradeService.model.item = res.data;

                    if(cb){
                        cb(res.data);
                    }

                });
        },
        remove:function(id, cb){

            return $http.delete('/api/parameters/contract-grade/grade/'+id)
                .then(function(res){

                    contractGradeService.model.item = null;

                    if(cb){
                        cb(res);
                    }

                });
        }
    };

    return contractGradeService;
});
