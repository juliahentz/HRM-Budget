angular.module('HRMBudget').controller('StaffCtrl',function(
    $scope,
    staffService,
    postService,
    $uibModal,
    $window
){

// POST (POSITION) CALLS

    $scope.posts = postService.model.list;

// STAFF MEMBER CALLS

    $scope.staffMembers = staffService.model.list;

    $scope.onClickButton = function(message, id) {

        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'modal/modal-staff-member/modal-staff-member.html',
            controller: 'ModalStaffMemberCtrl',
            size: 'md',
            resolve: {
                staffMember: function(staffService){
                    if(message === "staffMember"){
                        return staffService.getOne(id);
                    }
                },
                post:function(postService){
                    if(message === "post"){
                        return postService.getOne(id);
                    }
                },
                title: function(){
                    if(message === "staffMember"){
                        return "Edit Staff Member"
                    } else if(message === "post"){
                        return "Edit Post"
                    }else{
                        return "Add New"
                    }
                }
            }
        }).result.then(function(message){

            if(message === 'Staff'){
                staffService.model.item = null;

                staffService.getAll(function(list){
                    $scope.staffMembers = list;
                });
            }else if(message === 'Post'){
                postService.model.item = null;

                postService.getAll(function(list){
                    $scope.posts = list;
                })
            }

        });

    };

    $scope.onClickDelete = function(id){

        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'modal/modal-warning-sm/modal-warning-sm.html',
            controller: 'ModalWarningSmCtrl',
            size: 'md',
            resolve: {
                staffMember: function(staffService){
                    if(id){
                        return staffService.getOne(id);
                    }
                }
            }
        }).result.then(function(){

            staffService.model.item = null;

            staffService.getAll(function(list){
                $scope.staffMembers = list;
            });

        });



        //staffService.remove(id, function(){
        // staffService.model.item = null;
        // })
    }

});
