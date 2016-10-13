angular.module('HRMBudget').controller('BudgetCtrl',function(
    $scope,
    budgetService
){

    $scope.budget = budgetService.model.list;
    angular.forEach($scope.budget, function(budget, index){
        if(budget.year == 2016){
            $scope.currentBudget = budget;
            angular.forEach(budget.data, function(data, i){
                if(data.month == 0){
                    $scope.jan = data;
                }else if(data.month == 1){
                    $scope.feb = data;
                }else if(data.month == 2){
                    $scope.mar = data;
                }else if(data.month == 3){
                    $scope.apr = data;
                }else if(data.month == 4){
                    $scope.may = data;
                }else if(data.month == 5){
                    $scope.jun = data;
                }else if(data.month == 6){
                    $scope.jul = data;
                }else if(data.month == 7){
                    $scope.aug = data;
                }else if(data.month == 8){
                    $scope.sep = data;
                }else if(data.month == 9){
                    $scope.oct = data;
                }else if(data.month == 10){
                    $scope.nov = data;
                }else if(data.month == 11){
                    $scope.dec = data;
                }
            })
        }
    })

});
