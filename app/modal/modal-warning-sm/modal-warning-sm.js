angular.module('HRMBudget').controller('ModalWarningSmCtrl',function(
    $scope,
    staffService,
    postService,
    $uibModalInstance,
    message
){

    $scope.message = message;
    $scope.selectedStaffMember = staffService.model.item;
    $scope.selectedPost = postService.model.item;

    $scope.onClickDelete = function(){

    // A) STAFF MEMBER
        if($scope.message === 'staff'){
            staffService.remove($scope.selectedStaffMember._id);

    // B) POST
        }else if($scope.message === 'post'){
            postService.remove($scope.selectedPost._id);
        }

        $uibModalInstance.close($scope.message);
    };
});
