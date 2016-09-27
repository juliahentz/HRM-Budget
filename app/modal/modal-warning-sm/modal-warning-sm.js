angular.module('HRMBudget').controller('ModalWarningSmCtrl',function(
    $scope,
    staffService,
    postService,
    stepByStepService,
    personalDataService,
    $uibModalInstance,
    message
){

    $scope.message = message;
    $scope.selectedStaffMember = staffService.model.item;
    $scope.selectedPost = postService.model.item;

    $scope.onClickDelete = function(){

    // A) STAFF MEMBER
        if($scope.message === 'staff'){

            angular.forEach($scope.selectedStaffMember.stepByStep, function(stepByStep, index){
                stepByStepService.remove(stepByStep._id);
            });

            personalDataService.remove($scope.selectedStaffMember.personalData._id);
            staffService.remove($scope.selectedStaffMember._id);

    // B) POST
        }else if($scope.message === 'post'){
            postService.remove($scope.selectedPost._id);
        }

        $uibModalInstance.close($scope.message);
    };
});
