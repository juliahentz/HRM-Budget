angular.module('HRMBudget').controller('ModalStaffMemberCtrl',function(
    $scope,
    $uibModalInstance,
    title,
    staffService,
    paramContractService,
    stepByStepService,
    postService
){

// -- 1. INIT --------------------------------------

    $scope.currentTime = new Date();
    $scope.innerModalPageNum = 1;
    
    // todo fix modal page number array
    $scope.innerModalPages = [1,2,3,4];

    // REFERENCING MODELS RECEIVED FROM SERVER
    $scope.staffMembers = staffService.model.list;
    $scope.selectedStaffMember = staffService.model.item;
    $scope.allContracts = paramContractService.model.types;


    // RESOLVES RECEIVED FROM CALLING THE MODAL
    $scope.modalTitle = title;

    /*$scope.selectedStaffOnPost = {
        staff: null,
        startDate: null,
        endDate: null
    };*/

    // INNER MODAL PAGE LOGIC
    $scope.setInnerModalPage = function(message){
        $scope.innerModalPageNum = message;
    };

    // REFERENCE VARIABLES TO SAVE THE RIGHT PROPERTIES TO BE SENT TO THE SERVER
    $scope.contractItem = {};

// -- 2. LOGIC: CONTRACT FOR STAFF MEMBER ----------

    // REFERENCING ARRAYS IN ORDER TO SAVE THE LIST OF AVAILABLE GRADES AND STEPS IN A SPECIFIC CONTRACT
    $scope.allGradesInContract = [];
    $scope.allStepsInGrade = [];

    // LOOPING THROUGH ALL CONTRACTS AND REFERENCING THE GRADES AVAILABLE IN THE CURRENTLY SELECTED CONTRACT
    $scope.getAllGrades = function(){
        angular.forEach($scope.allContracts, function(contract, index){

            if(contract.name === $scope.selectedContract.category){
                $scope.allGradesInContract = contract.grades;
            }
        })
    };

    // LOOPING THROUGH ALL GRADES AND REFERENCING THE STEPS AVAILABLE IN THE CURRENTLY SELECTED CONTRACT
    $scope.getAllSteps = function(){
        angular.forEach($scope.allGradesInContract, function(grade, index){

            if(grade.gradeNumber === $scope.selectedContract.grade){
                $scope.allStepsInGrade = grade.steps;
            }
        })
    };

    // SEPARATING LOGIC FOR VARIOUS CASES IF DATABASE ELEMENT HAS BEEN ALREADY CREATED
    if(Object.keys($scope.selectedStaffMember).length == 0){

        $scope.selectedContract = {};
    }else if($scope.selectedStaffMember.stepByStep.length != 0){

        // todo fix first element to time selection
        $scope.selectedContract = $scope.selectedStaffMember.stepByStep[0];

        $scope.getAllGrades();
        $scope.getAllSteps();
    }else{
        $scope.selectedContract = {};
    }


// -- 3. LOGIC: SAVE MODAL -------------------------

    $scope.onClickSave = function(){

    // A.1 EDIT EXISTING STAFF MEMBER
        if($scope.modalTitle === "Edit Staff Member"){

            if($scope.innerModalPageNum === 1){

                staffService.update($scope.selectedStaffMember._id, $scope.selectedStaffMember, function(item){

                    $scope.innerModalPageNum = 2;
                });
            }else if($scope.innerModalPageNum === 2){

                $scope.contractItem.category = $scope.selectedContract.category.name;
                $scope.contractItem.grade = $scope.selectedContract.grade.gradeNumber;
                $scope.contractItem.step = $scope.selectedContract.step.stepNumber;

                // todo: fix first item to current date / selected date item
                stepByStepService.update($scope.selectedStaffMember.stepByStep[0]._id, $scope.contractItem, function(stepByStepItem){
                    staffService.update($scope.selectedStaffMember._id, $scope.selectedStaffMember, function(item){

                        $uibModalInstance.close('Staff');
                    });
                });
            }

    // A.2 ADD NEW STAFF MEMBER
        }else if($scope.modalTitle === "Add New Staff") {

            if($scope.innerModalPageNum === 1){

                staffService.create($scope.selectedStaffMember, function(staff){

                    $scope.innerModalPageNum = 2;
                });
            }else if($scope.innerModalPageNum === 2){
                $scope.contractItem.category = $scope.selectedContract.category.name;
                $scope.contractItem.grade = $scope.selectedContract.grade.gradeNumber;
                $scope.contractItem.step = $scope.selectedContract.step.stepNumber;

                stepByStepService.create($scope.contractItem, function(item){

                    $scope.selectedStaffMember.stepByStep = [];
                    $scope.selectedStaffMember.stepByStep.push(item._id);

                    staffService.update($scope.selectedStaffMember._id, $scope.selectedStaffMember, function(item){

                        $uibModalInstance.close('Staff');
                    });
                });
            }

    // C) MANAGE STAFF ON POST
        }else if($scope.modalTitle === "Assign Staff Member to Post"){

            $scope.selectedPost.staffOnPost.push($scope.selectedStaffOnPost);

            postService.update($scope.selectedPost._id, $scope.selectedPost, function(item){

                $uibModalInstance.close('Post');
            });
        }
    };

// -- 4. LOGIC: CLOSE MODAL ------------------------

    $scope.onClickClose = function(){

        // todo on dismiss from html call onClickClose

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
