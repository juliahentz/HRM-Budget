angular.module('HRMBudget').factory('publicApiService',function(
    $http
) {

    var publicApiService = {
        model:{
            item:{},
            list:[]
        },
        getAllCountries:function(cb){

            return $http.get('https://restcountries.eu/rest/v1/all')
                .then(function(res){

                    var list = res.data;
                    publicApiService.model.list = list;

                    if(cb){
                        cb(list);
                    }

                });
        }
    };

    return publicApiService;
});
