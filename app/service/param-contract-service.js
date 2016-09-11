angular.module('HRMBudget').factory('paramContractService',function(
    $http
) {

    var paramContractService = {
        model:{
            types:[],
            grades:[],
            steps:[]
        },
        getAllContractTypes:function(cb){

            return $http.get('/api/parameters/contracts')
                .then(function(res){

                    var list = res.data;
                    paramContractService.model.types = list;

                    if(cb){
                        cb(list);
                    }
                });
        },
        getAllGrades:function(cb){

            return $http.get('/api/parameters/contract-grade/grades')
                .then(function(res){

                    var list = res.data;
                    paramContractService.model.grades = list;

                    if(cb){
                        cb(list);
                    }
                });
        },
        getAllSteps:function(cb){

            return $http.get('/api/parameters/contract-step/steps')
                .then(function(res){

                    var list = res.data;
                    paramContractService.model.steps = list;

                    if(cb){
                        cb(list);
                    }
                });
        }
    };

    return paramContractService;
});
