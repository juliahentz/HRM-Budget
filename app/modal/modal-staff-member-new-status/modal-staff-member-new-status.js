angular.module('HRMBudget').controller('ModalStaffMemberNewStatusCtrl',function(
    $scope,
    $uibModalInstance,
    title,
    filterDate,
    staffService,
    stepByStepService,
    paramPlaceOfEmploymentService,
    paramContractService
){

    $scope.modalTitle = title;
    $scope.filterDate = filterDate;

    $scope.selectedStaffMember = staffService.model.item;
    $scope.allContracts = paramContractService.model.types;
    $scope.allPlaceOfEmployment = paramPlaceOfEmploymentService.model.list;

    $scope.innerModalPageNum = 1;
    $scope.innerModalPages = [1,2,3];

// REFERENCING VARIABLES FOR API COMMUNICATION

    $scope.perviousContract = {};


    //TODO ALL needed?
    $scope.contractItem = {};
    $scope.contractInnerItem = {};

    $scope.staffItem = {};
    $scope.socioStatusItem = {};
    $scope.socioStatusItemPageTwo = {};
    $scope.socioStatusInnerItem = {};
    $scope.socioStatusInnerItemPageTwo = {};

    $scope.entitlementsItem = {};
    $scope.entitlementsInnerItem = {};

// REFERENCING EMPLOYMENT PLACES, CONTRACT TYPES, GRADES AND STEPS for select menu
    $scope.allPlaceOfEmploymentNames = [];
    $scope.allContractNames = [];
    $scope.allGradesInContract = [];
    $scope.allGradesInContractObj = [];
    $scope.allStepsInGrade = [];

    // 1. Place of employment referenced from APP resolve
    angular.forEach($scope.allPlaceOfEmployment, function(place, index){
        $scope.allPlaceOfEmploymentNames.push(place.place);
    });

    // 2. All Contracts referenced from APP resolve
    angular.forEach($scope.allContracts, function(contract, index){
        $scope.allContractNames.push(contract.name);
    });

    // 3. All available Grades calculated based on the selected contract
    $scope.getAllGrades = function(){
        angular.forEach($scope.allContracts, function(contract, index){
            if(contract.name === $scope.selectedContract.category){
                if($scope.allGradesInContract.length == 0){
                    angular.forEach(contract.grades, function(grade, j){
                        $scope.allGradesInContract.push(grade.gradeNumber);
                        $scope.allGradesInContractObj.push(grade);
                    });
                }else{
                    $scope.allGradesInContract = [];
                    angular.forEach(contract.grades, function(grade, j){
                        $scope.allGradesInContract.push(grade.gradeNumber);
                        $scope.allGradesInContractObj.push(grade);
                    });
                }
            }
        });
    };

    // 4. All available Steps calculated based on selected grade
    $scope.getAllSteps = function(){
        angular.forEach($scope.allGradesInContractObj, function(grade, index){
            if(grade.gradeNumber == $scope.selectedContract.grade){
                if($scope.allStepsInGrade.length == 0){
                    angular.forEach(grade.steps, function(step, j){
                        $scope.allStepsInGrade.push(step.stepNumber);
                    });
                }else{
                    $scope.allStepsInGrade = [];
                    angular.forEach(grade.steps, function(step, j){
                        $scope.allStepsInGrade.push(step.stepNumber);
                    });
                }
            }
        });
    };

// REFERENCING VARIABLES RELATED TO CONTRACT
    angular.forEach($scope.selectedStaffMember.stepByStep.positionsFilled, function(positions, index) {
        if (positions.startDate <= $scope.filterDate && $scope.filterDate <= positions.endDate) {
            $scope.selectedContract = positions;
            angular.copy(positions, $scope.perviousContract);
            $scope.perviousContract.startDate = new Date($scope.perviousContract.startDate);
            $scope.perviousContract.endDate = new Date($scope.perviousContract.endDate);
        }
    });
    $scope.getAllGrades();
    $scope.getAllSteps();

// REFERENCING VARIABLES RELATED TO ENTITLEMENTS
    angular.forEach($scope.selectedStaffMember.entitlements.entitlements, function(entitlements, index){
        if(entitlements.startDate <= $scope.filterDate && $scope.filterDate <= entitlements.endDate){

            $scope.entitlements = entitlements;
            $scope.previousEntitlements = entitlements;

            if($scope.entitlements.householdAllowance === true){
                $scope.entitlements.householdAllowance = 'Yes';
            }else if($scope.entitlements.householdAllowance === false){
                $scope.entitlements.householdAllowance = 'No';
            }

            if($scope.entitlements.flatRateOvertime === true){
                $scope.entitlements.flatRateOvertime = 'Yes';
            }else if($scope.entitlements.flatRateOvertime === false){
                $scope.entitlements.flatRateOvertime = 'No';
            }

            if($scope.entitlements.nonFlatrateSchoolAllowance === true){
                $scope.entitlements.nonFlatrateSchoolAllowance = 'Yes';
            }else if($scope.entitlements.nonFlatrateSchoolAllowance === false){
                $scope.entitlements.nonFlatrateSchoolAllowance = 'No';
            }
        }
    });

// REFERENCING VARIABLES RELATED TO SOCIO STATUS

    angular.forEach($scope.selectedStaffMember.socioStatus.statuses, function(statuses, index) {
        if (statuses.startDate <= $scope.filterDate && $scope.filterDate <= statuses.endDate) {

            $scope.staffSocioStatus = statuses;
            $scope.previousSocioStatus = statuses;

            if($scope.staffSocioStatus.parttimePensionContr === true){
                $scope.staffSocioStatus.parttimePensionContr = 'Yes';
            }else if($scope.staffSocioStatus.parttimePensionContr === false){
                $scope.staffSocioStatus.parttimePensionContr = 'No';
            }
            if($scope.staffSocioStatus.parentalLeave === true){
                $scope.staffSocioStatus.parentalLeave = 'Yes';
            }else if($scope.staffSocioStatus.parentalLeave === false){
                $scope.staffSocioStatus.parentalLeave = 'No';
            }
            if($scope.staffSocioStatus.parentalLeaveExtension === true){
                $scope.staffSocioStatus.parentalLeaveExtension = 'Yes';
            }else if($scope.staffSocioStatus.parentalLeaveExtension === false){
                $scope.staffSocioStatus.parentalLeaveExtension = 'No';
            }
            if($scope.staffSocioStatus.parentalLeaveIncrease === true){
                $scope.staffSocioStatus.parentalLeaveIncrease = 'Yes';
            }else if($scope.staffSocioStatus.parentalLeaveIncrease === false){
                $scope.staffSocioStatus.parentalLeaveIncrease = 'No';
            }
        }
    });

///////////////////////////////////////////////////
// LOGIC: SAVE MODAL ------------------------------
    $scope.onClickSave = function(){
        if($scope.innerModalPageNum === 1){
            
            // EDIT PREVIOUS STATE
            $scope.perviousContract.endDate = new Date ($scope.selectedContract.startDate);
            $scope.perviousContract.endDate.setDate($scope.selectedContract.startDate.getDate() -1);

            angular.forEach($scope.selectedStaffMember.stepByStep.positionsFilled, function(positions, index, array){
                if(positions._id === $scope.perviousContract._id){
                    array[index] = $scope.perviousContract;
                }
            });

            // PUSH NEW STATE
            delete $scope.selectedContract._id;
            $scope.selectedStaffMember.stepByStep.positionsFilled.push($scope.selectedContract);

            // API CALL
            stepByStepService.update($scope.selectedStaffMember.stepByStep._id, $scope.selectedStaffMember.stepByStep, function(item){
                console.log(item);
            });
            
        }else if($scope.innerModalPageNum === 2){

        }else if($scope.innerModalPageNum === 3){

        }

    };

///////////////////////////////////////////////////
// LOGIC: CLOSE MODAL -----------------------------
    $scope.onClickClose = function(){

        $scope.perviousContract = {};
        $uibModalInstance.close();
    };

///////////////////////////////////////////////////
// LOGIC: INNER MODAL PAGES -----------------------
    $scope.innerModalPageNavRight = function(){
        if($scope.innerModalPageNum < 4){
            $scope.innerModalPageNum = $scope.innerModalPageNum+1;
        }
    };
    $scope.innerModalPageNavLeft = function(){
        if($scope.innerModalPageNum > 1){
            $scope.innerModalPageNum = $scope.innerModalPageNum-1;
        }
    };
    $scope.goToBeginning = function(){
        $scope.innerModalPageNum = 1;
    };
    $scope.goToEnd = function(){
        $scope.innerModalPageNum = 4;
    };
    $scope.setInnerModalPage = function(message){
        $scope.innerModalPageNum = message;
    };

///////////////////////////////////////////////////
// LOGIC: DATEPICKER PREFILL DATES ----------------
    $scope.today = function(){

        // TODO fix relevant start date to filterDate and end date to staff end date
        angular.forEach($scope.selectedStaffMember.socioStatus.statuses, function(statuses, index){
            if(statuses.startDate <= $scope.filterDate && $scope.filterDate <= statuses.endDate){
                $scope.staffSocioStatus.startDate = new Date(statuses.startDate);
                $scope.staffSocioStatus.endDate = new Date(statuses.endDate);
            }
        });

        angular.forEach($scope.selectedStaffMember.stepByStep.positionsFilled, function(positions, index){
            if(positions.startDate <= $scope.filterDate && $scope.filterDate <= positions.endDate) {
                $scope.selectedContract.startDate = new Date(positions.startDate);
                $scope.selectedContract.endDate = new Date(positions.endDate);
            }
        });

        angular.forEach($scope.selectedStaffMember.entitlements.entitlements, function(entitlements, index){
            if(entitlements.startDate <= $scope.filterDate && $scope.filterDate <= entitlements.endDate){
                $scope.entitlements.startDate = new Date(entitlements.startDate);
                $scope.entitlements.endDate = new Date(entitlements.endDate);
            }
        });
    };
    $scope.today();
});
