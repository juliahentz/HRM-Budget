angular.module('HRMBudget').controller('HeaderCtrl',function($scope){

    $scope.navBoxOpen = false;

    $scope.onClickNavIcon = function(){
        $scope.navBoxOpen = !$scope.navBoxOpen;
    }

});
