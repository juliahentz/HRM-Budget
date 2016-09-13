angular.module('HRMBudget').factory('stepByStepService',function() {

    var stepByStepService = {
        model:{
            item:{},
            list:[]
        },
        getAll:function(cb){

            return $http.get('/api/staff-members')
                .then(function(res){

                    var list = res.data;
                    stepByStepService.model.list = list;

                    if(cb){
                        cb(list);
                    }

                });
        },
        getOne:function(id, cb){

            return $http.get('/api/staff-member/'+id)
                .then(function(res){

                    var item = res.data;
                    stepByStepService.model.item = item;

                    if(cb){
                        cb(item);
                    }

                });
        },
        create:function(data, cb){

            return $http.post('/api/staff-member', data)
                .then(function(res){

                    var item = res.data;
                    stepByStepService.model.item = item;

                    if(cb){
                        cb(item);
                    }

                });
        },
        update:function(id, data, cb){

            return $http.put('/api/staff-member/'+id, data)
                .then(function(res){

                    stepByStepService.model.item = res.data;

                    if(cb){
                        cb(res.data);
                    }

                });
        },
        remove:function(id, cb){

            return $http.delete('/api/staff-member/'+id)
                .then(function(res){

                    stepByStepService.model.item = null;

                    if(cb){
                        cb(res);
                    }

                });
        }
    };

    return stepByStepService;
});
