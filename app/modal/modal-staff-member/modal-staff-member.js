angular.module('HRMBudget').controller('ModalStaffMemberCtrl',function(
    $scope,
    staffService,
    postService,
    $uibModalInstance,
    title
){

    $scope.selectedPost = postService.model.item;
    $scope.selectedStaffMember = staffService.model.item;
    $scope.modalTitle = title;

    console.log($scope.modalTitle);

    $scope.onClickSave = function(){

        if($scope.modalTitle === "Edit Staff Member"){

            staffService.update($scope.selectedStaffMember._id, $scope.selectedStaffMember, function(item){

                $uibModalInstance.close('Staff');
            });

        }else if($scope.modalTitle === "Add New"){

            staffService.create($scope.selectedStaffMember, function(item){

                $uibModalInstance.close('Staff');
            });

        }else if($scope.modalTitle === 'Edit Post'){

            console.log($scope.selectedPost);

            postService.update($scope.selectedPost._id, $scope.selectedPost, function(item){

                $uibModalInstance.close('Post');
            });

        }

    };

    $scope.onClickClose = function(){

        if($scope.modalTitle === 'Edit Post'){

            postService.model.item = null;

        }else if($scope.modalTitle === 'Edit Staff Member'){

            staffService.model.item = null;

        }

        $uibModalInstance.close();

    }

});
