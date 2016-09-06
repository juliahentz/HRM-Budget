angular.module('HRMBudget').controller('ModalStaffMemberCtrl',function(
    $scope,
    staffService,
    $uibModalInstance,
    title
){

    $scope.selectedStaffMember = staffService.model.item;
    $scope.modalTitle = title;

    $scope.onClickSave = function(){

        if($scope.modalTitle === "Edit"){

            staffService.update($scope.selectedStaffMember._id, $scope.selectedStaffMember, function(item){

                $uibModalInstance.close();
            });

        }else if( $scope.modalTitle === "Add New"){

            staffService.create($scope.selectedStaffMember, function(item){

                console.log(item);

                $uibModalInstance.close();
            });

        }
        
    };

    $scope.onClickClose = function(){

        staffService.model.item = null;

        $uibModalInstance.close();

    }

});
