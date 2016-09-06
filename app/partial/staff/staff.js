angular.module('HRMBudget').controller('StaffCtrl',function(
    $scope,
    staffService,
    $uibModal,
    $window
){

    $scope.staffMembers = staffService.model.list;

    $scope.onClickButton = function(id) {

        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'modal/modal-staff-member/modal-staff-member.html',
            controller: 'ModalStaffMemberCtrl',
            size: 'md',
            resolve: {
                staffMember: function(staffService){
                    if(id){
                        return staffService.getOne(id);
                    }
                },
                title: function(){
                    if(id){
                        return "Edit"
                    }else{
                        return "Add New"
                    }
                }
            }
        }).result.then(function(){

            staffService.model.item = null;

            staffService.getAll(function(list){
                $scope.staffMembers = list;
            });

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
