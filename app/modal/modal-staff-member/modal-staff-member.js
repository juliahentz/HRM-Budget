angular.module('HRMBudget').controller('ModalStaffMemberCtrl',function(
    $scope,
    $uibModalInstance,
    title,
    filterDate,
    staffService,
    paramContractService,
    paramPlaceOfEmploymentService,
    stepByStepService,
    publicApiService,
    personalDataService,
    socioStatusService,
    entitlementsService
){

// -- 1. INIT --------------------------------------

    $scope.filterDate = filterDate;

    // REFERENCING MODELS RECEIVED FROM SERVER
    $scope.staffMembers = staffService.model.list;
    $scope.selectedStaffMember = staffService.model.item;
    $scope.allContracts = paramContractService.model.types;
    $scope.allPlaceOfEmployment = paramPlaceOfEmploymentService.model.list;

    // RESOLVES RECEIVED FROM CALLING THE MODAL
    $scope.modalTitle = title;

    if($scope.modalTitle === 'Add New State'){
        $scope.innerModalPageNum = 2;
    }else{
        $scope.innerModalPageNum = 1;
    }
    $scope.innerModalPages = [1,2,3,4];

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

    // INNER MODAL PAGE LOGIC
    $scope.setInnerModalPage = function(message){
        $scope.innerModalPageNum = message;
    };

    // REFERENCE VARIABLES TO SAVE THE RIGHT PROPERTIES TO BE SENT TO THE SERVER
    $scope.contractItem = {};
    $scope.contractInnerItem = {};

    $scope.staffItem = {};
    $scope.socioStatusItem = {};
    $scope.socioStatusItemPageTwo = {};
    $scope.socioStatusInnerItem = {};
    $scope.socioStatusInnerItemPageTwo = {};

    $scope.entitlementsItem = {};
    $scope.entitlementsInnerItem = {};

// -- 2. LOGIC: CONTRACT FOR STAFF MEMBER ----------

    // REFERENCING ARRAYS IN ORDER TO SAVE THE LIST OF AVAILABLE GRADES AND STEPS IN A SPECIFIC CONTRACT
    $scope.allContractNames = [];
    $scope.allPlaceOfEmploymentNames = [];
    $scope.allGradesInContract = [];
    $scope.allGradesInContractObj = [];
    $scope.allStepsInGrade = [];

    angular.forEach($scope.allContracts, function(contract, index){
        $scope.allContractNames.push(contract.name);
    });

    angular.forEach($scope.allPlaceOfEmployment, function(place, index){
        $scope.allPlaceOfEmploymentNames.push(place.place);
    });

    // LOOPING THROUGH ALL CONTRACTS AND REFERENCING THE GRADES AVAILABLE IN THE CURRENTLY SELECTED CONTRACT
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

    // LOOPING THROUGH ALL GRADES AND REFERENCING THE STEPS AVAILABLE IN THE CURRENTLY SELECTED CONTRACT
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

    // SEPARATING LOGIC FOR VARIOUS CASES IF DATABASE ELEMENT HAS BEEN ALREADY CREATED
    if(Object.keys($scope.selectedStaffMember).length == 0){

        $scope.selectedContract = {};
        $scope.selectedContract.headOfUnit = false;
        $scope.selectedContract.TBAIncrease = false;

    }else if($scope.selectedStaffMember.stepByStep.length != 0){

        angular.forEach($scope.selectedStaffMember.stepByStep.positionsFilled, function(positions, index) {
            if (positions.startDate <= $scope.filterDate && $scope.filterDate <= positions.endDate) {
                $scope.selectedContract = positions;
            }
        });
        $scope.getAllGrades();
        $scope.getAllSteps();
    }else{
        $scope.selectedContract = {};
        $scope.selectedContract.headOfUnit = false;
        $scope.selectedContract.TBAIncrease = false;
    }

    // ENTITLEMENTS

    if(Object.keys($scope.selectedStaffMember).length == 0){

        $scope.entitlements = {};

    }else if($scope.selectedStaffMember.entitlements.length != 0){

        angular.forEach($scope.selectedStaffMember.entitlements.entitlements, function(entitlements, index){
            if(entitlements.startDate <= $scope.filterDate && $scope.filterDate <= entitlements.endDate){

                $scope.entitlements = entitlements;

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
    }else{
        $scope.entitlements = {};
    }

// -- 3. LOGIC: PERSONAL DATA FOR STAFF MEMBER -----
    if($scope.selectedStaffMember.personalData == null){
        $scope.staffPersonalData = {};
    }else{
        $scope.staffPersonalData = $scope.selectedStaffMember.personalData;
    }

    $scope.countryList = [];

    publicApiService.getAllCountries(function(){
        angular.forEach(publicApiService.model.list, function(country, index){
            $scope.countryList.push(country.alpha2Code);
        });
    });

// -- 4. LOGIC: SOCIO-STATUS FOR STAFF MEMBER ------
    if($scope.selectedStaffMember.socioStatus == null){
        $scope.staffSocioStatus = {};
    }else{

        angular.forEach($scope.selectedStaffMember.socioStatus.statuses, function(statuses, index) {
            if (statuses.startDate <= $scope.filterDate && $scope.filterDate <= statuses.endDate) {

                $scope.staffSocioStatus = statuses;

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
    }


// -- . LOGIC: SAVE MODAL -------------------------

    $scope.onClickSave = function(){

    // A.1 EDIT EXISTING STAFF MEMBER
        if($scope.modalTitle === "Edit Staff Member"){

            if($scope.innerModalPageNum === 1){

                personalDataService.update($scope.selectedStaffMember.personalData._id, $scope.staffPersonalData, function(){

                    $scope.innerModalPageNum = 4;
                });

                staffService.update($scope.selectedStaffMember._id, $scope.selectedStaffMember, function(item){

                    $scope.innerModalPageNum = 2;
                });
            }else if($scope.innerModalPageNum === 2){

                $scope.contractItem.positionsFilled = [];

                $scope.contractInnerItem.category = $scope.selectedContract.category;
                $scope.contractInnerItem.grade = $scope.selectedContract.grade;
                $scope.contractInnerItem.step = $scope.selectedContract.step;
                $scope.contractInnerItem.startDate = $scope.selectedContract.startDate;
                $scope.contractInnerItem.endDate = $scope.selectedContract.endDate;
                $scope.contractInnerItem.headOfUnit = $scope.selectedContract.headOfUnit;
                $scope.contractInnerItem.TBAIncrease = $scope.selectedContract.TBAIncrease;
                $scope.contractInnerItem.placeOfEmployment = $scope.selectedContract.placeOfEmployment;


                $scope.contractItem.positionsFilled.push($scope.contractInnerItem);

                // todo: fix first item to current date / selected date item
                stepByStepService.update($scope.selectedStaffMember.stepByStep._id, $scope.contractItem, function(stepByStepItem){

                    $scope.innerModalPageNum = 3;
                });
            }else if($scope.innerModalPageNum === 3){

                $scope.entitlementsItem.entitlements = [];

                $scope.entitlementsInnerItem.startDate = $scope.entitlements.startDate;
                $scope.entitlementsInnerItem.endDate = $scope.entitlements.endDate;

                if($scope.entitlements.householdAllowance === 'No'){
                    $scope.entitlementsInnerItem.householdAllowance = false;
                }else if($scope.entitlements.householdAllowance === 'Yes'){
                    $scope.entitlementsInnerItem.householdAllowance = true;
                }

                $scope.entitlementsInnerItem.expatriationAllowance = $scope.entitlements.expatriationAllowance;

                if($scope.entitlements.flatRateOvertime === 'No'){
                    $scope.entitlementsInnerItem.flatRateOvertime = false;
                }else if($scope.entitlements.flatRateOvertime === 'Yes'){
                    $scope.entitlementsInnerItem.flatRateOvertime = true;
                }

                if($scope.entitlements.nonFlatrateSchoolAllowance === 'No'){
                    $scope.entitlementsInnerItem.nonFlatrateSchoolAllowance = false;
                }else if($scope.entitlements.nonFlatrateSchoolAllowance === 'Yes'){
                    $scope.entitlementsInnerItem.nonFlatrateSchoolAllowance = true;
                }
                $scope.entitlementsInnerItem.deductions = $scope.entitlements.deductions;
                $scope.entitlementsInnerItem.placeOfOriginDistance = $scope.entitlements.placeOfOriginDistance;
                $scope.entitlementsInnerItem.placeOfOriginNumOfTravellers = $scope.entitlements.placeOfOriginNumOfTravellers;

                $scope.entitlementsItem.entitlements.push($scope.entitlementsInnerItem);

                entitlementsService.update($scope.selectedStaffMember.entitlements._id, $scope.entitlementsItem, function(item){

                    $scope.innerModalPageNum = 4;
                });

            }else if($scope.innerModalPageNum === 4){

                $scope.socioStatusItem.statuses = [];

                $scope.socioStatusInnerItem.startDate = $scope.staffSocioStatus.startDate.toISOString();
                $scope.socioStatusInnerItem.endDate = $scope.staffSocioStatus.endDate.toISOString();
                $scope.socioStatusInnerItem.numChildren = $scope.staffSocioStatus.numChildren;
                $scope.socioStatusInnerItem.childrenUnderSix = $scope.staffSocioStatus.childrenUnderSix;
                $scope.socioStatusInnerItem.childrenInUni = $scope.staffSocioStatus.childrenInUni;
                $scope.socioStatusInnerItem.childrenInUniExpatAndFar = $scope.staffSocioStatus.childrenInUniExpatAndFar;

                $scope.socioStatusInnerItem.fullTimePercentage = $scope.staffSocioStatus.fullTimePercentage;

                if($scope.staffSocioStatus.parttimePensionContr === 'No'){
                    $scope.socioStatusInnerItem.parttimePensionContr = false;
                }else if($scope.staffSocioStatus.parttimePensionContr === 'Yes'){
                    $scope.socioStatusInnerItem.parttimePensionContr = true;
                }

                if($scope.staffSocioStatus.parentalLeave === 'No'){
                    $scope.socioStatusInnerItem.parentalLeave = false;
                }else if($scope.staffSocioStatus.parentalLeave === 'Yes'){
                    $scope.socioStatusInnerItem.parentalLeave = true;
                }

                if($scope.staffSocioStatus.parentalLeaveExtension === 'No'){
                    $scope.socioStatusInnerItem.parentalLeaveExtension = false;
                }else if($scope.staffSocioStatus.parentalLeaveExtension === 'Yes'){
                    $scope.socioStatusInnerItem.parentalLeaveExtension = true;
                }

                if($scope.staffSocioStatus.parentalLeaveIncrease === 'No'){
                    $scope.socioStatusInnerItem.parentalLeaveIncrease = false;
                }else if($scope.staffSocioStatus.parentalLeaveIncrease === 'Yes'){
                    $scope.socioStatusInnerItem.parentalLeaveIncrease = true;
                }

                $scope.socioStatusItem.statuses.push($scope.socioStatusInnerItem);

                socioStatusService.update($scope.selectedStaffMember.socioStatus._id, $scope.socioStatusItem, function(socioStatusItem){

                    $uibModalInstance.close('Staff');
                })
            }

    // A.2 ADD NEW STAFF MEMBER
        }else if($scope.modalTitle === "Add New Staff") {

            if($scope.innerModalPageNum === 1){

                personalDataService.create($scope.staffPersonalData, function(item){

                    $scope.staffItem.personalData = item._id;

                    staffService.create($scope.selectedStaffMember, function(staff){

                        $scope.staffSocioStatus.startDate = $scope.selectedStaffMember.startDate;
                        $scope.staffSocioStatus.endDate = $scope.selectedStaffMember.endDate;
                        $scope.selectedContract.startDate  = $scope.selectedStaffMember.startDate;
                        $scope.selectedContract.endDate  = $scope.selectedStaffMember.endDate;
                        $scope.entitlements.startDate = $scope.selectedStaffMember.startDate;
                        $scope.entitlements.endDate = $scope.selectedStaffMember.endDate;
                        $scope.selectedStaffMember = staff;
                        $scope.innerModalPageNum = 2;
                    });
                });
            }else if($scope.innerModalPageNum === 2) {

                $scope.contractItem.positionsFilled = [];

                $scope.contractInnerItem.category = $scope.selectedContract.category;
                $scope.contractInnerItem.grade = $scope.selectedContract.grade;
                $scope.contractInnerItem.step = $scope.selectedContract.step;
                $scope.contractInnerItem.startDate = $scope.selectedContract.startDate;
                $scope.contractInnerItem.endDate = $scope.selectedContract.endDate;
                $scope.contractInnerItem.headOfUnit = $scope.selectedContract.headOfUnit;
                $scope.contractInnerItem.TBAIncrease = $scope.selectedContract.TBAIncrease;
                $scope.contractInnerItem.placeOfEmployment = $scope.selectedContract.placeOfEmployment;

                $scope.contractItem.positionsFilled.push($scope.contractInnerItem);

                stepByStepService.create($scope.contractItem, function (item) {

                    $scope.selectedStaffMember.stepByStep = item._id;

                    staffService.update($scope.selectedStaffMember._id, $scope.selectedStaffMember, function (item) {

                        $scope.innerModalPageNum = 3;
                    });
                })
            }else if($scope.innerModalPageNum === 3){

                $scope.entitlementsItem.entitlements = [];

                $scope.entitlementsInnerItem.startDate = $scope.entitlements.startDate;
                $scope.entitlementsInnerItem.endDate = $scope.entitlements.endDate;

                if($scope.entitlements.householdAllowance === 'No'){
                    $scope.entitlementsInnerItem.householdAllowance = false;
                }else if($scope.entitlements.householdAllowance === 'Yes'){
                    $scope.entitlementsInnerItem.householdAllowance = true;
                }

                $scope.entitlementsInnerItem.expatriationAllowance = $scope.entitlements.expatriationAllowance;

                if($scope.entitlements.flatRateOvertime === 'No'){
                    $scope.entitlementsInnerItem.flatRateOvertime = false;
                }else if($scope.entitlements.flatRateOvertime === 'Yes'){
                    $scope.entitlementsInnerItem.flatRateOvertime = true;
                }

                if($scope.entitlements.nonFlatrateSchoolAllowance === 'No'){
                    $scope.entitlementsInnerItem.nonFlatrateSchoolAllowance = false;
                }else if($scope.entitlements.nonFlatrateSchoolAllowance === 'Yes'){
                    $scope.entitlementsInnerItem.nonFlatrateSchoolAllowance = true;
                }
                $scope.entitlementsInnerItem.deductions = $scope.entitlements.deductions;
                $scope.entitlementsInnerItem.placeOfOriginDistance = $scope.entitlements.placeOfOriginDistance;
                $scope.entitlementsInnerItem.placeOfOriginNumOfTravellers = $scope.entitlements.placeOfOriginNumOfTravellers;

                $scope.entitlementsItem.entitlements.push($scope.entitlementsInnerItem);

                entitlementsService.create($scope.entitlementsItem, function(item){
                    $scope.selectedStaffMember.entitlements = item._id;

                    staffService.update($scope.selectedStaffMember._id, $scope.selectedStaffMember, function(item){

                        $scope.innerModalPageNum = 4;
                    });
                });

            }else if($scope.innerModalPageNum === 4){

                $scope.socioStatusItem.statuses = [];

                $scope.socioStatusInnerItem.startDate = $scope.staffSocioStatus.startDate.toISOString();
                $scope.socioStatusInnerItem.endDate = $scope.staffSocioStatus.endDate.toISOString();
                $scope.socioStatusInnerItem.numChildren = $scope.staffSocioStatus.numChildren;
                $scope.socioStatusInnerItem.childrenUnderSix = $scope.staffSocioStatus.childrenUnderSix;
                $scope.socioStatusInnerItem.childrenInUni = $scope.staffSocioStatus.childrenInUni;
                $scope.socioStatusInnerItem.childrenInUniExpatAndFar = $scope.staffSocioStatus.childrenInUniExpatAndFar;

                $scope.socioStatusInnerItem.fullTimePercentage = $scope.staffSocioStatus.fullTimePercentage;

                if($scope.staffSocioStatus.parttimePensionContr === 'No'){
                    $scope.socioStatusInnerItem.parttimePensionContr = false;
                }else if($scope.staffSocioStatus.parttimePensionContr === 'Yes'){
                    $scope.socioStatusInnerItem.parttimePensionContr = true;
                }

                if($scope.staffSocioStatus.parentalLeave === 'No'){
                    $scope.socioStatusInnerItem.parentalLeave = false;
                }else if($scope.staffSocioStatus.parentalLeave === 'Yes'){
                    $scope.socioStatusInnerItem.parentalLeave = true;
                }

                if($scope.staffSocioStatus.parentalLeaveExtension === 'No'){
                    $scope.socioStatusInnerItem.parentalLeaveExtension = false;
                }else if($scope.staffSocioStatus.parentalLeaveExtension === 'Yes'){
                    $scope.socioStatusInnerItem.parentalLeaveExtension = true;
                }

                if($scope.staffSocioStatus.parentalLeaveIncrease === 'No'){
                    $scope.socioStatusInnerItem.parentalLeaveIncrease = false;
                }else if($scope.staffSocioStatus.parentalLeaveIncrease === 'Yes'){
                    $scope.socioStatusInnerItem.parentalLeaveIncrease = true;
                }

                $scope.socioStatusItem.statuses.push($scope.socioStatusInnerItem);

                // API CALL
                socioStatusService.create($scope.socioStatusItem, function(item){
                    $scope.staffItem.socioStatus = item._id;

                    staffService.update($scope.selectedStaffMember._id, $scope.staffItem, function(staff){

                        $uibModalInstance.close('Staff');
                    });
                });
            }
        }
    };

// -- 4. LOGIC: CLOSE MODAL ------------------------

    $scope.onClickClose = function(){

    // A) STAFF MEMBER
        if($scope.modalTitle === "Edit Staff Member" || $scope.modalTitle === "Add New Staff"){
            staffService.model.item = {};
        }

        $scope.selectedStaffMember = {};
        $scope.modalTitle = null;

        $scope.currentTime = new Date();
        $scope.innerModalPageNum = 1;

        $scope.contractItem = {};
        $scope.allGradesInContract = [];
        $scope.allStepsInGrade = [];
        $scope.selectedContract = {};


        $scope.staffPersonalData = {};

        $uibModalInstance.close('Staff');
    };


// DATEPICKER

    // todo fix array element to current date filter

    // todo fix sociostatus, it is currently wrong
    if($scope.selectedStaffMember.socioStatus == null){
        $scope.today = function() {
            $scope.selectedStaffMember.startDate = new Date();
            $scope.selectedStaffMember.endDate = new Date();
            $scope.staffPersonalData.birthDate  = new Date();
        };
    }else{
        $scope.today = function() {

            angular.forEach($scope.selectedStaffMember.socioStatus.statuses, function(statuses, index){
                if(statuses.startDate <= $scope.filterDate && $scope.filterDate <= statuses.endDate){
                    $scope.staffSocioStatus.startDate = new Date(statuses.startDate);
                    $scope.staffSocioStatus.endDate = new Date(statuses.endDate);
                }
            });

            $scope.staffPersonalData.birthDate  = new Date($scope.staffPersonalData.birthDate);

            angular.forEach($scope.selectedStaffMember.stepByStep.positionsFilled, function(positions, index){

            });
            $scope.selectedContract.startDate  = new Date($scope.selectedContract.startDate);
            $scope.selectedContract.endDate  = new Date($scope.selectedContract.endDate);

            angular.forEach($scope.selectedStaffMember.entitlements.entitlements, function(entitlements, index){
                if(entitlements.startDate <= $scope.filterDate && $scope.filterDate <= entitlements.endDate){
                    $scope.entitlements.startDate = new Date(entitlements.startDate);
                    $scope.entitlements.endDate = new Date(entitlements.endDate);
                }
            });

            $scope.selectedStaffMember.startDate = new Date($scope.selectedStaffMember.startDate);
            $scope.selectedStaffMember.endDate = new Date($scope.selectedStaffMember.endDate);
        }
    }

    $scope.today();

});
