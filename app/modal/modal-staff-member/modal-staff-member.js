angular.module('HRMBudget').controller('ModalStaffMemberCtrl',function(
    $scope,
    $uibModalInstance,
    title,
    staffService,
    paramContractService,
    stepByStepService,
    publicApiService,
    personalDataService,
    socioStatusService,
    postService,
    $interval
){

// -- 1. INIT --------------------------------------

    $scope.currentTime = new Date();
    $scope.innerModalPageNum = 1;

    // todo fix modal page number array
    $scope.innerModalPages = [1,2,3];

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
    $scope.contractInnerItem = {};

    $scope.staffItem = {};
    $scope.socioStatusItem = {};
    $scope.socioStatusInnerItem = {};
    $scope.socioStatusInnerItem2 = {};
    $scope.socioStatusInnerItem3 = {};

// -- 2. LOGIC: CONTRACT FOR STAFF MEMBER ----------

    // REFERENCING ARRAYS IN ORDER TO SAVE THE LIST OF AVAILABLE GRADES AND STEPS IN A SPECIFIC CONTRACT
    $scope.allContractNames = [];
    $scope.allGradesInContract = [];
    $scope.allGradesInContractObj = [];
    $scope.allStepsInGrade = [];
    $scope.contractSelectClicked = false;
    $scope.gradeSelectClicked = false;

    angular.forEach($scope.allContracts, function(contract, index){
        $scope.allContractNames.push(contract.name);
    });

    // LOOPING THROUGH ALL CONTRACTS AND REFERENCING THE GRADES AVAILABLE IN THE CURRENTLY SELECTED CONTRACT
    $scope.getAllGrades = function(){

        if($scope.contractSelectClicked == false){
            $scope.contractSelectClicked = true;
        }else {
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
            $scope.contractSelectClicked = false;
        }
    };

    // LOOPING THROUGH ALL GRADES AND REFERENCING THE STEPS AVAILABLE IN THE CURRENTLY SELECTED CONTRACT
    $scope.getAllSteps = function(){

        if($scope.gradeSelectClicked == false){
            $scope.gradeSelectClicked = true;
        }else {
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
            $scope.gradeSelectClicked = false;
        }
    };

    $scope.datePeriodStart = {
        year:2016,
        month:1,
        day:1
    };

    $scope.datePeriodEnd = {
        year:2020,
        month:12,
        day:31
    };

    // SEPARATING LOGIC FOR VARIOUS CASES IF DATABASE ELEMENT HAS BEEN ALREADY CREATED
    if(Object.keys($scope.selectedStaffMember).length == 0){

        $scope.selectedContract = {};
    }else if($scope.selectedStaffMember.stepByStep.length != 0){

        // todo fix first element to time selection
        $scope.selectedContract = $scope.selectedStaffMember.stepByStep.positionsFilled[0];

        var startDate = new Date($scope.selectedStaffMember.stepByStep.positionsFilled[0].startDate);

        $scope.datePeriodStart.year = startDate.getFullYear();
        $scope.datePeriodStart.month = startDate.getMonth() + 1;
        $scope.datePeriodStart.day = startDate.getDay();

        var endDate = new Date($scope.selectedStaffMember.stepByStep.positionsFilled[0].endDate);

        $scope.datePeriodEnd.year = endDate.getFullYear();
        $scope.datePeriodEnd.month = endDate.getMonth() + 1;
        $scope.datePeriodEnd.day = endDate.getDay();

        $scope.getAllGrades();
        $scope.getAllSteps();
    }else{
        $scope.selectedContract = {};
    }

// -- 3. LOGIC: PERSONAL DATA FOR STAFF MEMBER -----
    if($scope.selectedStaffMember.personalData == null){
        $scope.staffPersonalData = {};
    }else{
        $scope.staffPersonalData = $scope.selectedStaffMember.personalData;
    }

    $scope.countryList = [];

    $scope.datePeriodBirth = {
        year: 1990,
        month:1,
        day:1
    };

    publicApiService.getAllCountries(function(){
        angular.forEach(publicApiService.model.list, function(country, index){
            $scope.countryList.push(country.alpha2Code);
        });
    });


// -- 4. LOGIC: SOCIO-STATUS FOR STAFF MEMBER ------
    // todo: fix array element to current date filter
    // todo: fix end date to the array elements!!!

    if($scope.selectedStaffMember.socioStatus == null){
        $scope.staffSocioStatus = {};
    }else{
        $scope.staffSocioStatus = {};
        $scope.staffSocioStatus.maritalStatus = $scope.selectedStaffMember.socioStatus.maritalStatus[0].status;
        $scope.staffSocioStatus.numChildren = $scope.selectedStaffMember.socioStatus.numChildren[0].status;
        $scope.staffSocioStatus.fullTimePerc = $scope.selectedStaffMember.socioStatus.fullTimePercentage[0].status;

        $scope.staffSocioStatus.maritalStartDate = $scope.selectedStaffMember.socioStatus.maritalStatus[0].startDate;
        $scope.staffSocioStatus.numChildrenStartDate = $scope.selectedStaffMember.socioStatus.numChildren[0].startDate;
        $scope.staffSocioStatus.fullTimePercStartDate = $scope.selectedStaffMember.socioStatus.fullTimePercentage[0].startDate;
    }

    $scope.datePeriodNow = {};

    $scope.datePeriodNow.year = $scope.currentTime.getFullYear();
    $scope.datePeriodNow.month = $scope.currentTime.getMonth() +1;
    $scope.datePeriodNow.day = $scope.currentTime.getDay();

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

                $scope.contractItem.positionsFilled.push($scope.contractInnerItem);

                // todo: fix first item to current date / selected date item
                stepByStepService.update($scope.selectedStaffMember.stepByStep._id, $scope.contractItem, function(stepByStepItem){

                    $scope.innerModalPageNum = 3;
                });
            }else if($scope.innerModalPageNum === 3){
                $scope.socioStatusItem.maritalStatus = [];

                $scope.socioStatusInnerItem.status = $scope.staffSocioStatus.maritalStatus;
                $scope.socioStatusInnerItem.startDate = $scope.staffSocioStatus.maritalStartDate.toISOString();

                $scope.socioStatusItem.maritalStatus.push($scope.socioStatusInnerItem);


                $scope.socioStatusItem.numChildren = [];

                $scope.socioStatusInnerItem2.status = $scope.staffSocioStatus.numChildren;
                $scope.socioStatusInnerItem2.startDate = $scope.staffSocioStatus.numChildrenStartDate.toISOString();

                $scope.socioStatusItem.numChildren.push($scope.socioStatusInnerItem2);


                $scope.socioStatusItem.fullTimePercentage = [];

                $scope.socioStatusInnerItem3.status = $scope.staffSocioStatus.fullTimePerc;
                $scope.socioStatusInnerItem3.startDate = $scope.staffSocioStatus.fullTimePercStartDate.toISOString();

                $scope.socioStatusItem.fullTimePercentage.push($scope.socioStatusInnerItem3);

                socioStatusService.update($scope.selectedStaffMember.socioStatus._id, $scope.socioStatusItem, function(socioStatusItem){

                    $uibModalInstance.close('Staff');
                })

            }else if($scope.innerModalPageNum === 4){


            }


    // A.2 ADD NEW STAFF MEMBER
        }else if($scope.modalTitle === "Add New Staff") {

            if($scope.innerModalPageNum === 1){

                personalDataService.create($scope.staffPersonalData, function(item){

                    $scope.staffItem.personalData = item._id;

                    staffService.create($scope.selectedStaffMember, function(staff){

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

                $scope.contractItem.positionsFilled.push($scope.contractInnerItem);

                stepByStepService.create($scope.contractItem, function (item) {

                    $scope.selectedStaffMember.stepByStep = item._id;

                    staffService.update($scope.selectedStaffMember._id, $scope.selectedStaffMember, function (item) {

                        $scope.innerModalPageNum = 3;
                    });
                })
            }else if($scope.innerModalPageNum === 3){

                $scope.socioStatusItem.maritalStatus = [];

                $scope.socioStatusInnerItem.status = $scope.staffSocioStatus.maritalStatus;
                $scope.socioStatusInnerItem.startDate = $scope.staffSocioStatus.maritalStartDate.toISOString();

                $scope.socioStatusItem.maritalStatus.push($scope.socioStatusInnerItem);


                $scope.socioStatusItem.numChildren = [];

                $scope.socioStatusInnerItem2.status = $scope.staffSocioStatus.numChildren;
                $scope.socioStatusInnerItem2.startDate = $scope.staffSocioStatus.numChildrenStartDate.toISOString();

                $scope.socioStatusItem.numChildren.push($scope.socioStatusInnerItem2);


                $scope.socioStatusItem.fullTimePercentage = [];

                $scope.socioStatusInnerItem3.status = $scope.staffSocioStatus.fullTimePerc;
                $scope.socioStatusInnerItem3.startDate = $scope.staffSocioStatus.fullTimePercStartDate.toISOString();

                $scope.socioStatusItem.fullTimePercentage.push($scope.socioStatusInnerItem3);

                socioStatusService.create($scope.socioStatusItem, function(item){
                    $scope.staffItem.socioStatus = item._id;

                    staffService.update($scope.selectedStaffMember._id, $scope.staffItem, function(staff){

                        $uibModalInstance.close('Staff');
                    });
                });

            }else if($scope.innerModalPageNum === 4){


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

        $scope.currentTime = new Date();
        $scope.innerModalPageNum = 1;

        $scope.contractItem = {};
        $scope.allGradesInContract = [];
        $scope.allStepsInGrade = [];
        $scope.selectedContract = {};

        $scope.staffPersonalData = {};

        $uibModalInstance.close();
    };


// DATEPICKER

    // todo fix array element to current date filter
    if($scope.selectedStaffMember.socioStatus == null){
        $scope.today = function() {
            $scope.staffSocioStatus.maritalStartDate = new Date();
            $scope.staffSocioStatus.numChildrenStartDate = new Date();
            $scope.staffSocioStatus.fullTimePercStartDate = new Date();
            $scope.staffPersonalData.birthDate  = new Date();
            $scope.selectedContract.startDate  = new Date();
            $scope.selectedContract.endDate  = new Date();
        };
    }else{
        $scope.today = function() {
            $scope.staffSocioStatus.maritalStartDate = new Date($scope.selectedStaffMember.socioStatus.maritalStatus[0].startDate);
            $scope.staffSocioStatus.numChildrenStartDate = new Date($scope.selectedStaffMember.socioStatus.numChildren[0].startDate);
            $scope.staffSocioStatus.fullTimePercStartDate = new Date($scope.selectedStaffMember.socioStatus.fullTimePercentage[0].startDate);
            $scope.staffPersonalData.birthDate  = new Date($scope.staffPersonalData.birthDate);
            $scope.selectedContract.startDate  = new Date($scope.selectedContract.startDate);
            $scope.selectedContract.endDate  = new Date($scope.selectedContract.endDate);
        }
    }

    $scope.today();

});
