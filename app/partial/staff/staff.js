angular.module('HRMBudget').controller('StaffCtrl',function(
    $scope,
    staffService,
    postService,
    $uibModal,
    timeNow
){

    $scope.posts = postService.model.list;
    $scope.staffMembers = staffService.model.list;
    $scope.timeNow = timeNow;


// 1. ADD AND EDIT FUNCTIONALITIES
    $scope.onClickButton = function(message, id) {

        if(message === "staffMember" || message === "newStaff" || message === "fillPost"){
            var modalInstanceStaff = $uibModal.open({
                animation: true,
                templateUrl: 'modal/modal-staff-member/modal-staff-member.html',
                controller: 'ModalStaffMemberCtrl',
                size: 'md',
                resolve: {

                    // A) STAFF MEMBER RESOLVE
                    staffMember: function(staffService){
                        if(message === "staffMember" && id){
                            return staffService.getOne(id);
                        }
                    },

                    // C) MANAGE STAFF ON POST RESOLVE
                    mangageStaffOnPost:function(postService){
                        if(message === "fillPost"){
                            return postService.getAll();
                        }
                    },
                    title: function(){

                        // A.1 EDIT EXISTING STAFF MEMBER - conditional content
                        if(message === "staffMember"){
                            return "Edit Staff Member";

                            // A.2 ADD NEW STAFF MEMBER - conditional content
                        }else if(message === "newStaff"){
                            return "Add New Staff";

                            // C MANAGE STAFF ON POST
                        }else if(message === "fillPost"){
                            return "Assign Staff Member to Post"
                        }
                    }
                }
            }).result.then(function(message){

                // A) STAFF MEMBER - two way binding update
                if(message === 'Staff'){
                    staffService.model.item = {};

                    staffService.getAll(function(list){
                        $scope.staffMembers = list;
                    });
                }
            });

        }else if(message === "post" || message === "newPost"){

            var modalInstancePost = $uibModal.open({
                animation: true,
                templateUrl: 'modal/modal-post/modal-post.html',
                controller: 'ModalPostCtrl',
                size: 'md',
                resolve: {
                    // B) POST RESOLVE
                    post:function(postService){
                        if(message === "post" && id || message === 'fillPost' && id){
                            return postService.getOne(id);
                        }
                    },
                    title: function(){

                            // B.1 EDIT EXISTING POST - conditional content
                        if(message === "post"){
                            return "Edit Post";

                            // B.2 ADD NEW POST - conditional content
                        }else if(message === "newPost"){
                            return "Add New Post";

                        }
                    }
                }
            }).result.then(function(message){

                postService.model.item = {};

                postService.getAll(function(list){
                    $scope.posts = list;
                })

            });
        }

    };

// 2. DELETE FUNCTIONALITY
    $scope.onClickDelete = function(message, id){

        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'modal/modal-warning-sm/modal-warning-sm.html',
            controller: 'ModalWarningSmCtrl',
            size: 'md',
            resolve: {

            // A) STAFF MEMBER RESOLVE
                staffMember: function(staffService){
                    if(message === 'staffMember' && id){
                        return staffService.getOne(id);
                    }
                },
            // B) POST RESOLVE
                post: function(postService){
                    if(message === 'post' && id){
                        return postService.getOne(id);
                    }
                },
                message: function(){

                // A.1 STAFF MEMBER - conditional content
                    if(message === 'staffMember'){
                        return 'staff';

                // B.1 POST - conditional content
                    }else if(message === 'post'){
                        return 'post';
                    }
                }
            }
        }).result.then(function(message){

        // A) STAFF MEMBER - two way binding update
            if(message === 'staff'){
                staffService.model.item = {};

                staffService.getAll(function(list){
                    $scope.staffMembers = list;
                });

        // B) POST - two way binding update
            }else if(message === 'post'){
                postService.model.item = {};

                postService.getAll(function(list){
                   $scope.posts = list;
                });
            }
        });
    };
});
