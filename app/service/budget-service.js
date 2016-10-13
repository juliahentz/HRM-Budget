angular.module('HRMBudget').factory('budgetService',function($http) {

    var budgetService = {
        model:{
            item:{},
            list:[]
        },
        getAll:function(cb){
            return $http.get('/api/annual-budgets')
                .then(function(res){
                    var list = res.data;
                    budgetService.model.list = list;

                    if(cb){
                        cb(list);
                    }
                });
        }
    };

    return budgetService;
});
