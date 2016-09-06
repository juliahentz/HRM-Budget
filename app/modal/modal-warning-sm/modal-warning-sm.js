angular.module('HRMBudget').controller('ModalWarningSmCtrl',function(
    $scope,
    staffService,
    $uibModalInstance
){

    $scope.selectedStaffMember = staffService.model.item;

    $scope.onClickDelete = function(){

        staffService.remove($scope.selectedStaffMember._id);
        $uibModalInstance.close();

    };

});
