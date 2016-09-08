angular.module('HRMBudget').controller('StaffCtrl',function(
    $scope,
    staffService,
    postService,
    $uibModal,
    $window
){

    $scope.posts = postService.model.list;
    $scope.staffMembers = staffService.model.list;

    $scope.onClickButton = function(message, id) {

        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'modal/modal-staff-member/modal-staff-member.html',
            controller: 'ModalStaffMemberCtrl',
            size: 'md',
            resolve: {
                staffMember: function(staffService){
                    if(message === "staffMember" && id){
                        return staffService.getOne(id);
                    }
                },
                post:function(postService){
                    if(message === "post" && id){
                        return postService.getOne(id);
                    }
                },
                title: function(){
                    if(message === "staffMember"){
                        return "Edit Staff Member"
                    } else if(message === "post"){
                        return "Edit Post"
                    }else if(message === "newPost"){
                        return "Add New Post"
                    }else if(message === "newStaff"){
                        return "Add New Staff"
                    }
                }
            }
        }).result.then(function(message){

            if(message === 'Staff'){
                staffService.model.item = {};

                staffService.getAll(function(list){
                    $scope.staffMembers = list;
                });
            }else if(message === 'Post'){
                postService.model.item = {};

                postService.getAll(function(list){
                    $scope.posts = list;
                })
            }

        });

    };

    $scope.onClickDelete = function(message, id){

        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'modal/modal-warning-sm/modal-warning-sm.html',
            controller: 'ModalWarningSmCtrl',
            size: 'md',
            resolve: {
                staffMember: function(staffService){
                    if(message === 'staffMember' && id){
                        return staffService.getOne(id);
                    }
                },
                post: function(postService){
                    if(message === 'post' && id){
                        return postService.getOne(id);
                    }
                },
                message: function(){
                    if(message === 'staffMember'){
                        return 'staff';
                    }else if (message === 'post'){
                        return 'post'
                    }
                }
            }
        }).result.then(function(message){

            if(message === 'staff'){
                staffService.model.item = {};

                staffService.getAll(function(list){
                    $scope.staffMembers = list;
                });
            }else if(message === 'post'){
                postService.model.item = {};

                postService.getAll(function(list){
                   $scope.posts = list;
                });
            }

        });



        //staffService.remove(id, function(){
        // staffService.model.item = null;
        // })
    }

});
