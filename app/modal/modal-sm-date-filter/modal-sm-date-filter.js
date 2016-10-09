angular.module('HRMBudget').controller('ModalSmDateFilterCtrl',function(
    $scope,
    filterTableDate,
    $uibModalInstance
){

    $scope.filterTableDate = new Date(filterTableDate);

    $scope.onClickSave = function(){
        var date = new Date($scope.filterTableDate);
        $uibModalInstance.close(date);
    }
});
