angular.module('HRMBudget').controller('ModalStaffMemberCtrl',function(
    $scope,
    staffService,
    postService,
    $uibModalInstance,
    title
){

    $scope.selectedPost = postService.model.item;
    $scope.staffMembers = staffService.model.list;
    $scope.selectedStaffMember = staffService.model.item;
    $scope.modalTitle = title;

    $scope.selectedStaffOnPost = {
        staff: null,
        startDate: null,
        endDate: null
    };

    $scope.onClickSave = function(){

    // A.1 EDIT EXISTING STAFF MEMBER
        if($scope.modalTitle === "Edit Staff Member"){

            staffService.update($scope.selectedStaffMember._id, $scope.selectedStaffMember, function(item){

                $uibModalInstance.close('Staff');
            });

    // A.2 ADD NEW STAFF MEMBER
        }else if($scope.modalTitle === "Add New Staff") {

            staffService.create($scope.selectedStaffMember, function (item) {

                $uibModalInstance.close('Staff');
            });

    // B.1 EDIT EXISTING POST
        }else if($scope.modalTitle === 'Edit Post'){

            postService.update($scope.selectedPost._id, $scope.selectedPost, function(item){

                $uibModalInstance.close('Post');
            });

    // B.2  ADD NEW POST
        }else if($scope.modalTitle === "Add New Post") {

            postService.create($scope.selectedPost, function (item) {

                $uibModalInstance.close('Post');
            });

    // C) MANAGE STAFF ON POST
        }else if($scope.modalTitle === "Assign Staff Member to Post"){

            $scope.selectedPost.staffOnPost.push($scope.selectedStaffOnPost);

            postService.update($scope.selectedPost._id, $scope.selectedPost, function(item){

                $uibModalInstance.close('Post');
            });
        }
    };

    $scope.onClickClose = function(){

    // A) STAFF MEMBER
        if($scope.modalTitle === "Edit Staff Member" || $scope.modalTitle === "Add New Staff"){

            staffService.model.item = {};

    // B) POST
        }else if($scope.modalTitle === 'Edit Post' || $scope.modalTitle === "Add New Post"){

            postService.model.item = {};
        }

        $scope.selectedPost = {};
        $scope.selectedStaffMember = {};
        $scope.modalTitle = null;

        $uibModalInstance.close();
    }
});
