angular.module('HRMBudget').factory('paramPlaceOfEmploymentService',function(
    $http
) {

    var paramPlaceOfEmploymentService = {
        model:{
            item:{},
            list:[]
        },
        getAll:function(cb){

            return $http.get('/api/parameters/place-of-employments')
                .then(function(res){

                    var list = res.data;
                    paramPlaceOfEmploymentService.model.list = list;

                    if(cb){
                        cb(list);
                    }
                });
        }
    };

    return paramPlaceOfEmploymentService;
});
