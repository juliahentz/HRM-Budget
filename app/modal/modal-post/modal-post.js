angular.module('HRMBudget').controller('ModalPostCtrl',function(
    $scope,
    postService,
    paramContractService,
    title,
    $uibModalInstance
){

    $scope.selectedPost = postService.model.item;
    $scope.modalTitle = title;

    $scope.allContracts = paramContractService.model.types;
    $scope.allGradesInContract = [];
    $scope.selectedContract = {};

    $scope.getAllGrades = function(){
        angular.forEach($scope.allContracts, function(contract, index){

            if(contract.name === $scope.selectedPost.contractType){
                $scope.allGradesInContract = contract.grades;
            }
            
        })
    };

    $scope.getAllGrades();
    
    $scope.postItem = {};

    $scope.onClickSave = function(){

        // B.1 EDIT EXISTING POST
        if($scope.modalTitle === 'Edit Post'){

            postService.update($scope.selectedPost._id, $scope.selectedPost, function(item){

                postService.model.item = {};

                $scope.selectedPost = {};
                $scope.modalTitle = null;

                $uibModalInstance.close('Post');
            });

            // B.2  ADD NEW POST
        }else if($scope.modalTitle === "Add New Post") {

            postService.create($scope.selectedPost, function (item) {

                postService.model.item = {};

                $scope.selectedPost = {};
                $scope.modalTitle = null;

                $uibModalInstance.close();
            });
        }
    };

    $scope.onClickClose = function(){

        postService.model.item = {};

        $scope.selectedPost = {};
        $scope.modalTitle = null;

        $uibModalInstance.close();
    }

});
