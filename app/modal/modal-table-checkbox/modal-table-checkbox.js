angular.module('HRMBudget').controller('ModalTableCheckboxCtrl',function(
    $scope,
    $uibModalInstance,
    booleans
){

    $scope.booleans = booleans;
    $scope.originals = {};

    angular.copy(booleans, $scope.originals);

    $scope.onClikcSave = function(){
        $uibModalInstance.close($scope.booleans);
    };

    $scope.onClickCancel = function(){
        $scope.booleans = $scope.originals;
        $uibModalInstance.close($scope.booleans);
    };
});
