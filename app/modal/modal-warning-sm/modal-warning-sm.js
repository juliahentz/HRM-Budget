angular.module('HRMBudget').controller('ModalWarningSmCtrl',function(
    $scope,
    staffService,
    postService,
    stepByStepService,
    personalDataService,
    socioStatusService,
    entitlementsService,
    $uibModalInstance,
    message
){

    $scope.message = message;
    $scope.selectedStaffMember = staffService.model.item;
    $scope.selectedPost = postService.model.item;

    $scope.onClickDelete = function(){

    // A) STAFF MEMBER
        if($scope.message === 'staff'){

            if($scope.selectedStaffMember.stepByStep){
                stepByStepService.remove($scope.selectedStaffMember.stepByStep._id);
            }
            if($scope.selectedStaffMember.personalData){
                personalDataService.remove($scope.selectedStaffMember.personalData._id);
            }
            if($scope.selectedStaffMember.socioStatus){
                socioStatusService.remove($scope.selectedStaffMember.socioStatus._id);
            }
            if($scope.selectedStaffMember.entitlements){
                entitlementsService.remove($scope.selectedStaffMember.entitlements._id);
            }
            staffService.remove($scope.selectedStaffMember._id);

    // B) POST
        }else if($scope.message === 'post'){
            postService.remove($scope.selectedPost._id);
        }

        $uibModalInstance.close($scope.message);
    };
});
