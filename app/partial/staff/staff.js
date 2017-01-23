angular.module('HRMBudget').controller('StaffCtrl',function(
    $scope,
    staffService,
    postService,
    $uibModal,
    Excel,
    timeNow,
    personalDataService,
    dateIntervalService,
    stepByStepService,
    entitlementsService,
    socioStatusService,
    salaryService,
    paramPlaceOfEmploymentService,
    budgetFileService,
    $q,
    $timeout
){

    $scope.posts = postService.model.list;
    $scope.staffMembers = staffService.model.list;
    $scope.$watch('$scope.staffMembers', function() {
        staffService.getAll(function(list){
            $scope.staffMembers = list;
        });
    });

    $scope.employmentPlaces = {};

    paramPlaceOfEmploymentService.getAll(function(list){
        $scope.employmentPlaces = list;
    });

    $scope.returnedBudgetFile = {};

    $scope.taxTable = [
        {
            salImposable: 19.91,
            de: 0.01,
            a: 117.12,
            sMarginal: 117.12,
            tMarginal: 0.00,
            iMarginal:0.0000,
            tMoyen: 0.00,
            impot:0.0000
        },
        {
            salImposable: 351.46,
            de: 117.13,
            a: 2067.39,
            sMarginal: 1950.27,
            tMarginal: 0.08,
            iMarginal:156.0216,
            tMoyen: 0.0755,
            impot:156.0216
        },
        {
            salImposable: 484.09,
            de: 2067.40,
            a: 2847.56,
            sMarginal: 780.17,
            tMarginal: 0.1,
            iMarginal:78.017,
            tMoyen: 0.0822,
            impot:234.0386
        },
        {
            salImposable: 554.79,
            de: 2847.57,
            a: 3263.44,
            sMarginal: 415.88,
            tMarginal: 0.125,
            iMarginal:51.985,
            tMoyen: 0.0876,
            impot:286.0236
        },
        {
            salImposable: 629.97,
            de: 3263.45,
            a: 3705.67,
            sMarginal: 442.23,
            tMarginal: 0.15,
            iMarginal:66.3345,
            tMoyen: 0.0951,
            impot:352.3581
        },
        {
            salImposable: 700.67,
            de: 3705.68,
            a: 4121.55,
            sMarginal: 415.88,
            tMarginal: 0.175,
            iMarginal:72.779,
            tMoyen: 0.1031,
            impot:425.1371
        },
        {
            salImposable: 769.21,
            de: 4121.56,
            a: 4524.72,
            sMarginal: 403.17,
            tMarginal: 0.2,
            iMarginal:80.634,
            tMoyen:0.1118,
            impot:505.7711
        },
        {
            salImposable: 839.94,
            de: 4524.73,
            a: 4940.78,
            sMarginal: 416.06,
            tMarginal: 0.225,
            iMarginal:93.6135,
            tMoyen:0.1213,
            impot:599.3846
        },
        {
            salImposable: 908.48,
            de: 4940.79,
            a: 5343.95,
            sMarginal: 403.17,
            tMarginal: 0.25,
            iMarginal:100.7925,
            tMoyen:0.131,
            impot:700.1771
        },
        {
            salImposable: 979.18,
            de: 5343.96,
            a: 5759.83,
            sMarginal: 415.88,
            tMarginal: 0.275,
            iMarginal:114.367,
            tMoyen:0.1414,
            impot:814.5441
        },
        {
            salImposable: 1047.72,
            de: 5759.84,
            a: 6163,
            sMarginal: 403.17,
            tMarginal: 0.3,
            iMarginal:120.951,
            tMoyen:0.1518,
            impot:935.4951
        },
        {
            salImposable: 1118.45,
            de: 6163.01,
            a: 6579.06,
            sMarginal: 416.06,
            tMarginal: 0.325,
            iMarginal:135.2195,
            tMoyen:0.1627,
            impot:1070.7146
        },
        {
            salImposable: 1186.99,
            de: 6579.07,
            a: 6982.23,
            sMarginal: 403.17,
            tMarginal: 0.35,
            iMarginal:141.1095,
            tMoyen:0.1736,
            impot:1211.8241
        },
        {
            salImposable: 1257.69,
            de: 6982.24,
            a: 7398.11,
            sMarginal: 415.88,
            tMarginal: 0.4,
            iMarginal:166.352,
            tMoyen:0.1863,
            impot:1378.1761
        },
        {
            de: 7398.12,
            a: 99999.99,
            sMarginal: 92601.88,
            tMarginal: 0.45,
            iMarginal:41670.846,
            tMoyen:0.4305,
            impot:43049.0221
        }

    ];

    $scope.budgetFile = {};
    /*$scope.budgetFile.contractType = {};
    $scope.budgetFile.year = {};
    $scope.budgetFile.month = {};
    $scope.budgetFile.fullMonth = {};
    $scope.budgetFile.salaryScale = {};
    $scope.budgetFile.partTimeAdjustedSalary = {};
    $scope.budgetFile.managementAllowance = {};
    $scope.budgetFile.TBAincrease = {};
    $scope.budgetFile.parentalLeave = {};
    $scope.budgetFile.householdAllowance = {};
    $scope.budgetFile.dependentChildAllowance = {};
    $scope.budgetFile.educationAllowance = {};
    $scope.budgetFile.expatriationAllowance = {};
    $scope.budgetFile.correctionCoefficientDeduction = {};
    $scope.budgetFile.pensionContribution = {};
    $scope.budgetFile.sicknessInsuranceContribution = {};
    $scope.budgetFile.accidentInsuranceContribution = {};
    $scope.budgetFile.complementarySicknessInsurance = {};
    $scope.budgetFile.dependantAccidentInsurance = {};
    $scope.budgetFile.allowanceForLivingConditions = {};
    $scope.budgetFile.allowanceForDifficultLivingConditions = {};
    $scope.budgetFile.tax = {};
    $scope.budgetFile.secretarialAllowance = {};
    $scope.budgetFile.flatRateOvertime = {};
    $scope.budgetFile.unemploymentInsuranceContribution = {};
    $scope.budgetFile.otherPayments = {};
    $scope.budgetFile.otherDeductions = {};
    $scope.budgetFile.correctionCoefficientOthers = {};
    $scope.budgetFile.specialLevy = {};*/




    $scope.filterTableDate = timeNow;

    $scope.clickedTableHead = '';

    $scope.onClickTableHead = function(clickedHead){
        $scope.clickedTableHead = clickedHead;
    };

// 1. ADD AND EDIT FUNCTIONALITIES
    $scope.onClickButton = function(message, id) {

        if(message === "EditState" || message === "newStaff"){
            var modalInstanceStaff = $uibModal.open({
                animation: true,
                templateUrl: 'modal/modal-staff-member/modal-staff-member.html',
                controller: 'ModalStaffMemberCtrl',
                size: 'md',
                backdrop  : 'static',
                keyboard  : false,
                resolve: {
                    staffMember: function(staffService){
                        if(message === "EditState" && id){
                            return staffService.getOne(id);
                        }else if(message === "AddNewState" && id){
                            return staffService.getOne(id);
                        }
                    },
                    filterDate: function(){
                        return $scope.filterTableDate;
                    },
                    title: function(){

                        if(message === "EditState"){
                            return "Edit Staff Member";

                        }else if(message === "newStaff"){
                            return "Add New Staff";

                        }else if(message === "AddNewState"){
                            return "Add New State"
                        }
                    }
                }
            }).result.then(function(staff){

                if(staff){
                    staffService.model.item = {};

                    staffService.getAll(function(list){
                        $scope.staffMembers = list;
                    });
                }

            });
        }/*else if(message === 'AddNewState'){
            var modalInstanceStaff = $uibModal.open({
                animation: true,
                templateUrl: 'modal/modal-staff-member-new-status/modal-staff-member-new-status.html',
                controller: 'ModalStaffMemberNewStatusCtrl',
                size: 'md',
                backdrop  : 'static',
                keyboard  : false,
                resolve: {
                    staffMember: function(staffService){
                        if(message === "AddNewState" && id){
                            return staffService.getOne(id);
                        }
                    },
                    filterDate: function(){
                        return $scope.filterTableDate;
                    },
                    title: function(){
                        if(message === "AddNewState"){
                            return "Add New State"
                        }
                    }
                }
            }).result.then(function(staffList){

                staffService.model.item = {};

                if(staffList){
                    $scope.staffMembers = staffList;
                }
            });
        }*/
    };

// 2. DELETE FUNCTIONALITY
    $scope.onClickDelete = function(message, id){

        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'modal/modal-warning-sm/modal-warning-sm.html',
            controller: 'ModalWarningSmCtrl',
            size: 'md',
            backdrop  : 'static',
            keyboard  : false,
            resolve: {

            // A) STAFF MEMBER RESOLVE
                staffMember: function(staffService){
                    if(message === 'staffMember' && id){
                        return staffService.getOne(id);
                    }
                },
                message: function(){

                // A.1 STAFF MEMBER - conditional content
                    if(message === 'staffMember'){
                        return 'staff';
                    }
                }
            }
        }).result.then(function(message){

            if(message){
                staffService.model.item = {};

                staffService.getAll(function(list){
                    $scope.staffMembers = list;
                });
            }
        });
    };

    $scope.onClickFilterDate = function(){
        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'modal/modal-sm-date-filter/modal-sm-date-filter.html',
            controller: 'ModalSmDateFilterCtrl',
            size: 'md',
            backdrop  : 'static',
            keyboard  : false,
            resolve: {
                filterTableDate: function(){
                    return $scope.filterTableDate;
                }
            }
        }).result.then(function(date){
            $scope.filterTableDate = date.toISOString();
        });
    };

    // CUSTOMISE TABLE

    $scope.customTableElements = {
        name: true,
        surname: true,
        staffNumber: true,
        contractCategory: true,
        grade: true,
        step: true,
        startDate: true,
        endDate: true,
        placeOfEmployment: true,
        headOfUnit: true,
        TBAincrease: true,
        gender: true,
        nationality: true,
        birthDate: true,
        nrOfChildren: true,
        childrenUnderSix: true,
        childrenInUni: true,
        childrenInUniExpatAndFar: true,
        fullTimePercentage: true,
        parttimePensionContr: true,
        parentalLeave: true,
        parentalLeaveExtension: true,
        parentalLeaveIncrease: true,
        householdAllowance: true,
        expatriationAllowance: true,
        flatRateOvertime: true,
        nonFlatrateSchoolAllowance: true,
        placeOfOriginDistance: true,
        placeOfOriginTravellers: true,
        deductions: true
    };

    $scope.onCustomiseTableClick = function(){
        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'modal/modal-table-checkbox/modal-table-checkbox.html',
            controller: 'ModalTableCheckboxCtrl',
            size: 'md',
            backdrop  : 'static',
            keyboard  : false,
            resolve: {
                booleans: function(){
                    return $scope.customTableElements
                }
            }
        }).result.then(function(customTableElements){
            $scope.customTableElements = customTableElements;
        });
    };

    $scope.exportToExcel=function(tableId){
        var exportHref=Excel.tableToExcel(tableId,'Staff Members');
        var a = document.createElement('a');
        a.href = exportHref;
        a.download = 'StaffMembers.xls';
        a.click();
    };

    $scope.salaries = [];

    salaryService.getAll(function(list){
        $scope.salaries = list;
    });

    $scope.importCSV = function(file, errFiles) {

        $scope.f = file;
        $scope.errFile = errFiles && errFiles[0];
        if (file) {

            Papa.parse(file, {
                header:true,
                dynamicTyping:true,
                complete: function(results) {

                    angular.forEach(results.data, function(data, i){

                        $scope.staffPersonalData = {};
                        $scope.selectedStaffMember = {};
                        $scope.contractDateInterval = {};
                        $scope.selectedContract = {};
                        $scope.entitlements = {};
                        $scope.staffSocioStatus = {};
                        $scope.budgetFile = {};
                        $scope.selectedStaffMember.budgetFile = [];


                        $scope.staffSocioStatus.numChildren = data.numChildren;
                        $scope.staffSocioStatus.childrenUnderSix = data.childrenUnderSix;
                        $scope.staffSocioStatus.childrenInUni = data.childrenInUni;
                        $scope.staffSocioStatus.childrenInUniExpatAndFar = data.childrenInUniExpatAndFar;
                        $scope.staffSocioStatus.parentalLeave = data.parentalLeave;
                        $scope.staffSocioStatus.parentalLeaveExtension = data.parentalLeaveExtension;
                        $scope.staffSocioStatus.parentalLeaveIncrease = data.parentalLeaveIncrease;
                        $scope.staffSocioStatus.fullTimePercentage = data.fullTimePercentage;
                        $scope.staffSocioStatus.parttimePensionContr = data.parttimePensionContr;

                        $scope.entitlements.householdAllowance = data.householdAllowance;
                        $scope.entitlements.expatriationAllowance = data.expatriationAllowance;
                        $scope.entitlements.flatRateOvertime = data.flatRateOvertime;
                        $scope.entitlements.nonFlatrateSchoolAllowance = data.nonFlatrateSchoolAllowance;
                        $scope.entitlements.deductions = data.deductions;
                        $scope.entitlements.placeOfOriginDistance = data.placeOfOriginDistance;
                        $scope.entitlements.placeOfOriginNumOfTravellers = data.placeOfOriginNumOfTravellers;

                        $scope.selectedContract.category = data.category;
                        $scope.selectedContract.grade = data.grade;
                        $scope.selectedContract.step = data.step;
                        $scope.selectedContract.headOfUnit = data.headOfUnit;
                        $scope.selectedContract.placeOfEmployment = data.placeOfEmployment;

                        $scope.partsStart = data.start.split('/');
                        $scope.partsStartYear= $scope.partsStart[2];
                        $scope.partsStartMonth = $scope.partsStart[1]-1;
                        $scope.partsStartDay = $scope.partsStart[0];

                        $scope.partsEnd = data.end.split('/');
                        $scope.partsEndYear = $scope.partsEnd[2];
                        $scope.partsEndMonth = $scope.partsEnd[1]-1;
                        $scope.partsEndDay = $scope.partsEnd[0];

                        $scope.contractDateInterval.start = new Date($scope.partsStart[2],$scope.partsStart[1]-1,$scope.partsStart[0]);
                        $scope.contractDateInterval.end = new Date($scope.partsEnd[2],$scope.partsEnd[1]-1,$scope.partsEnd[0]);

                        $scope.parts = data.birthDate.split('/');
                        $scope.staffPersonalData.birthDate = new Date($scope.parts[2],$scope.parts[1]-1,$scope.parts[0]);

                        $scope.staffPersonalData.gender = data.gender;
                        $scope.staffPersonalData.nationality = data.nationality;

                        $scope.selectedStaffMember.name = data.name;
                        $scope.selectedStaffMember.surname = data.surname;
                        $scope.selectedStaffMember.staffNumber = data.staffNumber;

                        $scope.managementAllowanceReference = {};
                        $scope.correctionCoefficient = 0;

                        $scope.resultArray = [];
                        $scope.budgetFileCalc(data, function(items){
                            $q.resolve(items, function(result){

                                $scope.resultArray.push(result);

                                $timeout(function(){
                                    angular.forEach($scope.resultArray, function(budgetFile, index){
                                        if(budgetFile.staffNumber == data.staffNumber){
                                            $scope.selectedStaffMember.budgetFile.push(budgetFile._id);
                                            console.log($scope.selectedStaffMember.budgetFile);
                                        }
                                    });
                                },10000);
                            });
                        });
                        console.log($scope.resultArray);

                        $scope.apiCall(
                            $scope.staffPersonalData,
                            $scope.selectedStaffMember,
                            $scope.contractDateInterval,
                            $scope.selectedContract,
                            $scope.entitlements,
                            $scope.staffSocioStatus);
                    });
            }});
        }
    };

    $scope.budgetFileCalc = function(data, cb){

        angular.forEach($scope.salaries, function(salary, index){

            if(salary.type == data.category && salary.grade == data.grade){

                if(salary.step == 1){

                    $scope.managementAllowanceReference.stepOne = salary.salary;
                    $scope.managementAllowanceReference.stepTwo = $scope.salaries[index+1].salary;

                }
            }

            if(salary.type == data.category && salary.grade == data.grade && salary.step == data.step){

                angular.forEach($scope.employmentPlaces, function(employmentPlacesDoc, ind){
                    if(data.placeOfEmployment == employmentPlacesDoc.place){
                        $scope.correctionCoefficient = employmentPlacesDoc.correctionCoefficient;
                    }
                });

                $scope.selectedContract.salaryId = salary._id;

                // Looping through assigned years
                for(var i = $scope.partsStartYear; i<= $scope.partsEndYear; i++){

                    // First year
                    if(i == $scope.partsStartYear){

                        // if end year is not the same year
                        if(i < $scope.partsEndYear){

                            //Looping through all months in first year
                            for(var j = $scope.partsStartMonth; j <= 12; j++){

                                // First month
                                if(j == $scope.partsStartMonth){
                                    // Full month
                                    if($scope.partsStartDay <= 15){

                                        $scope.budgetFile.contractType = data.category;
                                        $scope.budgetFile.year = i;
                                        $scope.budgetFile.month = j+1;
                                        $scope.budgetFile.staffNumber = data.staffNumber;
                                        $scope.budgetFile.fullMonth = true;
                                        $scope.budgetFile.salaryScale = salary.salary;
                                        if(data.grade >= 9 && data.headOfUnit == true){
                                            $scope.budgetFile.managementAllowance = ($scope.managementAllowanceReference.stepTwo / $scope.managementAllowanceReference.stepOne - 1) * salary.salary;
                                        }else{
                                            $scope.budgetFile.managementAllowance = 0;
                                        }
                                        $scope.budgetFile.managemntAdjustedSalary = salary.salary + $scope.budgetFile.managementAllowance;
                                        $scope.budgetFile.partTimeAdjustedSalary = data.fullTimePercentage/100 * salary.salary + $scope.budgetFile.managementAllowance;


                                        if(data.parentalLeaveExtension == false){
                                            if(data.parentalLeave == true){

                                                if(data.fullTimePercentage == 50){
                                                    $scope.budgetFile.parentalLeave = 972.14 / 2;
                                                }else if(data.fullTimePercentage == 0){
                                                    $scope.budgetFile.parentalLeave = 972.14;
                                                }
                                            }
                                            if(data.parentalLeaveIncrease == true){

                                                if(data.fullTimePercentage == 50){
                                                    $scope.budgetFile.parentalLeave = 1296.18 / 2;
                                                }else if(data.fullTimePercentage == 0){
                                                    $scope.budgetFile.parentalLeave = 1296.18;
                                                }
                                            }
                                        }else{
                                            if(data.parentalLeave == true){

                                                if(data.fullTimePercentage == 50){
                                                    $scope.budgetFile.parentalLeave = 972.14 / 4;
                                                }else if(data.fullTimePercentage == 0){
                                                    $scope.budgetFile.parentalLeave = 972.14 /2;
                                                }
                                            }
                                            if(data.parentalLeaveIncrease == true){

                                                if(data.fullTimePercentage == 50){
                                                    $scope.budgetFile.parentalLeave = 1296.18 / 4;
                                                }else if(data.fullTimePercentage == 0){
                                                    $scope.budgetFile.parentalLeave = 1296.18 /2;
                                                }
                                            }
                                        }

                                        if(data.householdAllowance == true){
                                            if(data.parentalLeave == true && data.fullTimePercentage != 0){
                                                $scope.budgetFile.householdAllowance = 181.82 + $scope.budgetFile.partTimeAdjustedSalary * 0.02;
                                            }else if(data.parentalLeave == false){
                                                $scope.budgetFile.householdAllowance = 181.82 + $scope.budgetFile.partTimeAdjustedSalary * 0.02;
                                            }else{
                                                $scope.budgetFile.householdAllowance = 0;
                                            }
                                        }else{
                                            $scope.budgetFile.householdAllowance = 0;
                                        }

                                        $scope.budgetFile.dependentChildAllowance = data.numChildren * 397.29;
                                        $scope.budgetFile.educationAllowance = data.childrenUnderSix * 97.05 + data.childrenInUni * 269.56 + data.childrenInUniExpatAndFar * 269.56 * 2;

                                        if(data.expatriationAllowance != 0){
                                            if(data.parentalLeave == true && data.fullTimePercentage != 0){
                                                $scope.budgetFile.expatriationAllowance = ($scope.budgetFile.partTimeAdjustedSalary + data.householdAllowance + $scope.budgetFile.dependentChildAllowance) * data.expatriationAllowance/100;

                                                if($scope.budgetFile.expatriationAllowance < 538.87){
                                                    $scope.budgetFile.expatriationAllowance = 538.87;
                                                }
                                            }else if(data.parentalLeave == false){
                                                $scope.budgetFile.expatriationAllowance = ($scope.budgetFile.partTimeAdjustedSalary + data.householdAllowance + $scope.budgetFile.dependentChildAllowance) * data.expatriationAllowance/100;

                                                if($scope.budgetFile.expatriationAllowance < 538.87){
                                                    $scope.budgetFile.expatriationAllowance = 538.87;
                                                }
                                            }else{
                                                $scope.budgetFile.expatriationAllowance = 0;
                                            }
                                        }else{
                                            $scope.budgetFile.expatriationAllowance = 0;
                                        }

                                        if(data.parttimePensionContr == true && data.parentalLeave == false){
                                            $scope.budgetFile.pensionContribution = - $scope.budgetFile.managemntAdjustedSalary * 0.098;
                                        }else if(data.parentalLeave == false && data.parttimePensionContr == false){
                                            $scope.budgetFile.pensionContribution = - $scope.budgetFile.partTimeAdjustedSalary * 0.098;
                                        }else if(data.parentalLeave == true && data.parttimePensionContr == true){
                                            $scope.budgetFile.pensionContribution = - $scope.budgetFile.partTimeAdjustedSalary * 0.098;
                                        }else{
                                            $scope.budgetFile.pensionContribution = - $scope.budgetFile.partTimeAdjustedSalary * 0.098;
                                        }

                                        if(data.parentalLeave == false){
                                            $scope.budgetFile.sicknessInsuranceContribution = - $scope.budgetFile.managemntAdjustedSalary * 0.017;
                                        }else{
                                            $scope.budgetFile.sicknessInsuranceContribution = - $scope.budgetFile.partTimeAdjustedSalary * 0.017;
                                        }

                                        if(data.parentalLeave == false){
                                            $scope.budgetFile.accidentInsuranceContribution = - $scope.budgetFile.managemntAdjustedSalary * 0.001;
                                        }else{
                                            $scope.budgetFile.accidentInsuranceContribution = - $scope.budgetFile.partTimeAdjustedSalary * 0.001;
                                        }

                                        if(data.parentalLeave == false){
                                            $scope.budgetFile.unemploymentInsuranceContribution = - ($scope.budgetFile.managemntAdjustedSalary - 1296.18) * 0.0081;
                                        }else{
                                            $scope.budgetFile.unemploymentInsuranceContribution = - ($scope.budgetFile.managemntAdjustedSalary - 1296.18) * 0.0081 * data.fullTimePercentage/100;
                                        }

                                        if(data.flatRateOvertime == true){
                                            $scope.budgetFile.flatRateOvertime = data.fullTimePercentage/100 * 659.89;
                                        }else{
                                            $scope.budgetFile.flatRateOvertime = 0;
                                        }

                                        $scope.budgetFile.otherDeductions = - data.deductions;


                                        $scope.intCalcOne =
                                            Math.round(0.9 * $scope.budgetFile.partTimeAdjustedSalary * 100)/100 -
                                            Math.round(2 * $scope.budgetFile.dependentChildAllowance * 100)/100 -
                                            Math.round((-(
                                                $scope.budgetFile.pensionContribution +
                                                $scope.budgetFile.sicknessInsuranceContribution +
                                                $scope.budgetFile.accidentInsuranceContribution) -
                                                $scope.budgetFile.unemploymentInsuranceContribution) * 100)/100;

                                        $scope.intCalcTwo =
                                            Math.round(0.9 * $scope.budgetFile.partTimeAdjustedSalary * 100)/100 -
                                            Math.round((-(
                                                $scope.budgetFile.pensionContribution +
                                                $scope.budgetFile.sicknessInsuranceContribution +
                                                $scope.budgetFile.accidentInsuranceContribution) -
                                                $scope.budgetFile.unemploymentInsuranceContribution) * 100)/100;


                                        $scope.taxDifferece = {};
                                        $scope.taxDiffereceArray = [];
                                        $scope.taxDiffereceLow = 0;
                                        $scope.taxDiffereceData = 0;
                                        $scope.taxTableAIndex = 0;

                                        angular.forEach($scope.taxTable, function(taxItem){

                                            if($scope.intCalcTwo >= taxItem.de){
                                                $scope.taxDifferece = $scope.intCalcTwo - taxItem.de;
                                                $scope.taxDiffereceArray.push($scope.taxDifferece);
                                            }

                                        });

                                        $scope.taxDiffereceLow = Math.min.apply(null, $scope.taxDiffereceArray);

                                        angular.forEach($scope.taxTable, function(taxItem, index){
                                            if($scope.intCalcTwo - taxItem.de == $scope.taxDiffereceLow){
                                                $scope.taxDiffereceData = taxItem;
                                                $scope.taxTableAIndex = index;
                                            }
                                        });

                                        if($scope.intCalcOne < 117.13){
                                            $scope.intCalcImpot = 0
                                        }else{

                                            if($scope.taxTableAIndex > 0){
                                                $scope.intCalcImpot = Math.round((($scope.intCalcTwo - $scope.taxDiffereceData.de + 0.01) * $scope.taxDiffereceData.tMarginal + $scope.taxTable[$scope.taxTableAIndex-1].impot)*100)/100

                                            }else if($scope.taxTableAIndex == 0){
                                                $scope.intCalcImpot = Math.round((($scope.intCalcTwo - $scope.taxDiffereceData.de + 0.01) * $scope.taxDiffereceData.tMarginal)*100)/100

                                            }
                                        }

                                        $scope.budgetFile.specialLevy = -Math.floor(0.06 * Math.max($scope.budgetFile.partTimeAdjustedSalary - (Math.round((-(
                                                        $scope.budgetFile.pensionContribution +
                                                        $scope.budgetFile.sicknessInsuranceContribution +
                                                        $scope.budgetFile.accidentInsuranceContribution) -
                                                        $scope.budgetFile.unemploymentInsuranceContribution) * 100)/100) - $scope.intCalcImpot - 2830.02,0)*100)/100;


                                        $scope.budgetFile.correctionCoefficientDeduction =
                                            ($scope.budgetFile.partTimeAdjustedSalary +
                                            $scope.budgetFile.dependentChildAllowance +
                                            $scope.budgetFile.educationAllowance +
                                            $scope.budgetFile.expatriationAllowance +
                                            $scope.budgetFile.pensionContribution +
                                            $scope.budgetFile.sicknessInsuranceContribution +
                                            $scope.budgetFile.accidentInsuranceContribution +
                                            $scope.budgetFile.flatRateOvertime +
                                            $scope.budgetFile.unemploymentInsuranceContribution +
                                            //$scope.budgetFile.otherDeductions +
                                            - $scope.budgetFile.specialLevy) * (0.807-1);
                                        // todo: special levy and correction coefficient

                                        $scope.intCalcTaxImpot = 0;
                                        $scope.innerCalc = (-(
                                        $scope.budgetFile.pensionContribution +
                                        $scope.budgetFile.sicknessInsuranceContribution +
                                        $scope.budgetFile.accidentInsuranceContribution) -
                                        $scope.budgetFile.unemploymentInsuranceContribution);

                                        $scope.intCalcTaxImpot = Math.max(0,
                                            ($scope.budgetFile.partTimeAdjustedSalary +
                                            $scope.budgetFile.dependentChildAllowance +
                                            $scope.budgetFile.householdAllowance +
                                            $scope.budgetFile.educationAllowance +
                                            $scope.budgetFile.expatriationAllowance) +
                                            $scope.budgetFile.flatRateOvertime -
                                            $scope.innerCalc -
                                            (data.fullTimePercentage/100 * 2830.02)
                                        );

                                        $scope.taxDiffereceNew = {};
                                        $scope.taxDiffereceArrayNew = [];
                                        $scope.taxDiffereceLowNew = 0;
                                        $scope.taxDiffereceDataNew = 0;
                                        $scope.taxTableAIndexNew = 0;

                                        angular.forEach($scope.taxTable, function(taxItem){

                                            if($scope.intCalcOne >= taxItem.de){

                                                $scope.taxDiffereceNew = $scope.intCalcOne - taxItem.de;
                                                $scope.taxDiffereceArrayNew.push($scope.taxDiffereceNew);
                                            }

                                        });

                                        $scope.taxDiffereceLowNew = Math.min.apply(null, $scope.taxDiffereceArrayNew);

                                        angular.forEach($scope.taxTable, function(taxItem, index){
                                            if($scope.intCalcOne - taxItem.de == $scope.taxDiffereceLowNew){
                                                $scope.taxDiffereceDataNew = taxItem;
                                                $scope.taxTableAIndexNew = index;
                                            }
                                        });


                                        if($scope.intCalcOne < 117.13){
                                            $scope.intCalcTacTable = 0;
                                        }else{
                                            if($scope.taxTableAIndexNew > 0){
                                                $scope.intCalcTacTable =
                                                    Math.floor(
                                                        (($scope.intCalcOne - $scope.taxDiffereceDataNew.de + 0.01) *
                                                        $scope.taxDiffereceDataNew.tMarginal +
                                                        $scope.taxTable[$scope.taxTableAIndexNew-1].impot)
                                                        *100)/100 +
                                                    Math.floor(
                                                        $scope.taxDiffereceDataNew.tMarginal *
                                                        $scope.budgetFile.flatRateOvertime
                                                        *100)/100
                                            }
                                        }

                                        // todo fix cc
                                        $scope.budgetFile.tax = -Math.min($scope.intCalcTaxImpot,$scope.intCalcTacTable)*0.807;

                                        //console.log($scope.selectedStaffMember);
                                        //console.log($scope.thisCall);
                                        $scope.thisResult = {};

                                        $scope.thisCall = $scope.budgetFileApiCall($scope.budgetFile).then(function () {
                                            return budgetFileService.model.item;
                                            /*console.log(budgetFileService.model.item._id);
                                             //$scope.selectedStaffMember.budgetFile.push(budgetFileService.model.item._id);

                                             ;*/
                                        }).then(function(result){
                                            $scope.thisResult = result;
                                            return result;

                                        });

                                        if(cb){
                                            //console.log($scope.thisCall);
                                            cb($scope.thisCall)
                                        }


                                        // Half month
                                    }else{




                                    }
                                }else{ // Full months (j)

                                    $scope.budgetFile.contractType = data.category;
                                    $scope.budgetFile.year = i;
                                    $scope.budgetFile.month = j+1;
                                    $scope.budgetFile.staffNumber = data.staffNumber;
                                    $scope.budgetFile.fullMonth = true;
                                    $scope.budgetFile.salaryScale = salary.salary;
                                    if(data.grade >= 9 && data.headOfUnit == true){
                                        $scope.budgetFile.managementAllowance = ($scope.managementAllowanceReference.stepTwo / $scope.managementAllowanceReference.stepOne - 1) * salary.salary;
                                    }else{
                                        $scope.budgetFile.managementAllowance = 0;
                                    }
                                    $scope.budgetFile.managemntAdjustedSalary = salary.salary + $scope.budgetFile.managementAllowance;
                                    $scope.budgetFile.partTimeAdjustedSalary = data.fullTimePercentage/100 * salary.salary + $scope.budgetFile.managementAllowance;


                                    if(data.parentalLeaveExtension == false){
                                        if(data.parentalLeave == true){

                                            if(data.fullTimePercentage == 50){
                                                $scope.budgetFile.parentalLeave = 972.14 / 2;
                                            }else if(data.fullTimePercentage == 0){
                                                $scope.budgetFile.parentalLeave = 972.14;
                                            }
                                        }
                                        if(data.parentalLeaveIncrease == true){

                                            if(data.fullTimePercentage == 50){
                                                $scope.budgetFile.parentalLeave = 1296.18 / 2;
                                            }else if(data.fullTimePercentage == 0){
                                                $scope.budgetFile.parentalLeave = 1296.18;
                                            }
                                        }
                                    }else{
                                        if(data.parentalLeave == true){

                                            if(data.fullTimePercentage == 50){
                                                $scope.budgetFile.parentalLeave = 972.14 / 4;
                                            }else if(data.fullTimePercentage == 0){
                                                $scope.budgetFile.parentalLeave = 972.14 /2;
                                            }
                                        }
                                        if(data.parentalLeaveIncrease == true){

                                            if(data.fullTimePercentage == 50){
                                                $scope.budgetFile.parentalLeave = 1296.18 / 4;
                                            }else if(data.fullTimePercentage == 0){
                                                $scope.budgetFile.parentalLeave = 1296.18 /2;
                                            }
                                        }
                                    }

                                    if(data.householdAllowance == true){
                                        if(data.parentalLeave == true && data.fullTimePercentage != 0){
                                            $scope.budgetFile.householdAllowance = 181.82 + $scope.budgetFile.partTimeAdjustedSalary * 0.02;
                                        }else if(data.parentalLeave == false){
                                            $scope.budgetFile.householdAllowance = 181.82 + $scope.budgetFile.partTimeAdjustedSalary * 0.02;
                                        }else{
                                            $scope.budgetFile.householdAllowance = 0;
                                        }
                                    }else{
                                        $scope.budgetFile.householdAllowance = 0;
                                    }

                                    $scope.budgetFile.dependentChildAllowance = data.numChildren * 397.29;
                                    $scope.budgetFile.educationAllowance = data.childrenUnderSix * 97.05 + data.childrenInUni * 269.56 + data.childrenInUniExpatAndFar * 269.56 * 2;

                                    if(data.expatriationAllowance != 0){
                                        if(data.parentalLeave == true && data.fullTimePercentage != 0){
                                            $scope.budgetFile.expatriationAllowance = ($scope.budgetFile.partTimeAdjustedSalary + data.householdAllowance + $scope.budgetFile.dependentChildAllowance) * data.expatriationAllowance/100;

                                            if($scope.budgetFile.expatriationAllowance < 538.87){
                                                $scope.budgetFile.expatriationAllowance = 538.87;
                                            }
                                        }else if(data.parentalLeave == false){
                                            $scope.budgetFile.expatriationAllowance = ($scope.budgetFile.partTimeAdjustedSalary + data.householdAllowance + $scope.budgetFile.dependentChildAllowance) * data.expatriationAllowance/100;

                                            if($scope.budgetFile.expatriationAllowance < 538.87){
                                                $scope.budgetFile.expatriationAllowance = 538.87;
                                            }
                                        }else{
                                            $scope.budgetFile.expatriationAllowance = 0;
                                        }
                                    }else{
                                        $scope.budgetFile.expatriationAllowance = 0;
                                    }

                                    if(data.parttimePensionContr == true && data.parentalLeave == false){
                                        $scope.budgetFile.pensionContribution = - $scope.budgetFile.managemntAdjustedSalary * 0.098;
                                    }else if(data.parentalLeave == false && data.parttimePensionContr == false){
                                        $scope.budgetFile.pensionContribution = - $scope.budgetFile.partTimeAdjustedSalary * 0.098;
                                    }else if(data.parentalLeave == true && data.parttimePensionContr == true){
                                        $scope.budgetFile.pensionContribution = - $scope.budgetFile.partTimeAdjustedSalary * 0.098;
                                    }else{
                                        $scope.budgetFile.pensionContribution = - $scope.budgetFile.partTimeAdjustedSalary * 0.098;
                                    }

                                    if(data.parentalLeave == false){
                                        $scope.budgetFile.sicknessInsuranceContribution = - $scope.budgetFile.managemntAdjustedSalary * 0.017;
                                    }else{
                                        $scope.budgetFile.sicknessInsuranceContribution = - $scope.budgetFile.partTimeAdjustedSalary * 0.017;
                                    }

                                    if(data.parentalLeave == false){
                                        $scope.budgetFile.accidentInsuranceContribution = - $scope.budgetFile.managemntAdjustedSalary * 0.001;
                                    }else{
                                        $scope.budgetFile.accidentInsuranceContribution = - $scope.budgetFile.partTimeAdjustedSalary * 0.001;
                                    }

                                    if(data.parentalLeave == false){
                                        $scope.budgetFile.unemploymentInsuranceContribution = - ($scope.budgetFile.managemntAdjustedSalary - 1296.18) * 0.0081;
                                    }else{
                                        $scope.budgetFile.unemploymentInsuranceContribution = - ($scope.budgetFile.managemntAdjustedSalary - 1296.18) * 0.0081 * data.fullTimePercentage/100;
                                    }

                                    if(data.flatRateOvertime == true){
                                        $scope.budgetFile.flatRateOvertime = data.fullTimePercentage/100 * 659.89;
                                    }else{
                                        $scope.budgetFile.flatRateOvertime = 0;
                                    }

                                    $scope.budgetFile.otherDeductions = - data.deductions;


                                    $scope.intCalcOne =
                                        Math.round(0.9 * $scope.budgetFile.partTimeAdjustedSalary * 100)/100 -
                                        Math.round(2 * $scope.budgetFile.dependentChildAllowance * 100)/100 -
                                        Math.round((-(
                                            $scope.budgetFile.pensionContribution +
                                            $scope.budgetFile.sicknessInsuranceContribution +
                                            $scope.budgetFile.accidentInsuranceContribution) -
                                            $scope.budgetFile.unemploymentInsuranceContribution) * 100)/100;

                                    $scope.intCalcTwo =
                                        Math.round(0.9 * $scope.budgetFile.partTimeAdjustedSalary * 100)/100 -
                                        Math.round((-(
                                            $scope.budgetFile.pensionContribution +
                                            $scope.budgetFile.sicknessInsuranceContribution +
                                            $scope.budgetFile.accidentInsuranceContribution) -
                                            $scope.budgetFile.unemploymentInsuranceContribution) * 100)/100;


                                    $scope.taxDifferece = {};
                                    $scope.taxDiffereceArray = [];
                                    $scope.taxDiffereceLow = 0;
                                    $scope.taxDiffereceData = 0;
                                    $scope.taxTableAIndex = 0;

                                    angular.forEach($scope.taxTable, function(taxItem){

                                        if($scope.intCalcTwo >= taxItem.de){
                                            $scope.taxDifferece = $scope.intCalcTwo - taxItem.de;
                                            $scope.taxDiffereceArray.push($scope.taxDifferece);
                                        }

                                    });

                                    $scope.taxDiffereceLow = Math.min.apply(null, $scope.taxDiffereceArray);

                                    angular.forEach($scope.taxTable, function(taxItem, index){
                                        if($scope.intCalcTwo - taxItem.de == $scope.taxDiffereceLow){
                                            $scope.taxDiffereceData = taxItem;
                                            $scope.taxTableAIndex = index;
                                        }
                                    });

                                    if($scope.intCalcOne < 117.13){
                                        $scope.intCalcImpot = 0
                                    }else{

                                        if($scope.taxTableAIndex > 0){
                                            $scope.intCalcImpot = Math.round((($scope.intCalcTwo - $scope.taxDiffereceData.de + 0.01) * $scope.taxDiffereceData.tMarginal + $scope.taxTable[$scope.taxTableAIndex-1].impot)*100)/100

                                        }else if($scope.taxTableAIndex == 0){
                                            $scope.intCalcImpot = Math.round((($scope.intCalcTwo - $scope.taxDiffereceData.de + 0.01) * $scope.taxDiffereceData.tMarginal)*100)/100

                                        }
                                    }

                                    $scope.budgetFile.specialLevy = -Math.floor(0.06 * Math.max($scope.budgetFile.partTimeAdjustedSalary - (Math.round((-(
                                                    $scope.budgetFile.pensionContribution +
                                                    $scope.budgetFile.sicknessInsuranceContribution +
                                                    $scope.budgetFile.accidentInsuranceContribution) -
                                                    $scope.budgetFile.unemploymentInsuranceContribution) * 100)/100) - $scope.intCalcImpot - 2830.02,0)*100)/100;


                                    $scope.budgetFile.correctionCoefficientDeduction =
                                        ($scope.budgetFile.partTimeAdjustedSalary +
                                        $scope.budgetFile.dependentChildAllowance +
                                        $scope.budgetFile.educationAllowance +
                                        $scope.budgetFile.expatriationAllowance +
                                        $scope.budgetFile.pensionContribution +
                                        $scope.budgetFile.sicknessInsuranceContribution +
                                        $scope.budgetFile.accidentInsuranceContribution +
                                        $scope.budgetFile.flatRateOvertime +
                                        $scope.budgetFile.unemploymentInsuranceContribution +
                                        //$scope.budgetFile.otherDeductions +
                                        - $scope.budgetFile.specialLevy) * (0.807-1);
                                    // todo: special levy and correction coefficient

                                    $scope.intCalcTaxImpot = 0;
                                    $scope.innerCalc = (-(
                                    $scope.budgetFile.pensionContribution +
                                    $scope.budgetFile.sicknessInsuranceContribution +
                                    $scope.budgetFile.accidentInsuranceContribution) -
                                    $scope.budgetFile.unemploymentInsuranceContribution);

                                    $scope.intCalcTaxImpot = Math.max(0,
                                        ($scope.budgetFile.partTimeAdjustedSalary +
                                        $scope.budgetFile.dependentChildAllowance +
                                        $scope.budgetFile.householdAllowance +
                                        $scope.budgetFile.educationAllowance +
                                        $scope.budgetFile.expatriationAllowance) +
                                        $scope.budgetFile.flatRateOvertime -
                                        $scope.innerCalc -
                                        (data.fullTimePercentage/100 * 2830.02)
                                    );

                                    $scope.taxDiffereceNew = {};
                                    $scope.taxDiffereceArrayNew = [];
                                    $scope.taxDiffereceLowNew = 0;
                                    $scope.taxDiffereceDataNew = 0;
                                    $scope.taxTableAIndexNew = 0;

                                    angular.forEach($scope.taxTable, function(taxItem){

                                        if($scope.intCalcOne >= taxItem.de){

                                            $scope.taxDiffereceNew = $scope.intCalcOne - taxItem.de;
                                            $scope.taxDiffereceArrayNew.push($scope.taxDiffereceNew);
                                        }

                                    });

                                    $scope.taxDiffereceLowNew = Math.min.apply(null, $scope.taxDiffereceArrayNew);

                                    angular.forEach($scope.taxTable, function(taxItem, index){
                                        if($scope.intCalcOne - taxItem.de == $scope.taxDiffereceLowNew){
                                            $scope.taxDiffereceDataNew = taxItem;
                                            $scope.taxTableAIndexNew = index;
                                        }
                                    });


                                    if($scope.intCalcOne < 117.13){
                                        $scope.intCalcTacTable = 0;
                                    }else{
                                        if($scope.taxTableAIndexNew > 0){
                                            $scope.intCalcTacTable =
                                                Math.floor(
                                                    (($scope.intCalcOne - $scope.taxDiffereceDataNew.de + 0.01) *
                                                    $scope.taxDiffereceDataNew.tMarginal +
                                                    $scope.taxTable[$scope.taxTableAIndexNew-1].impot)
                                                    *100)/100 +
                                                Math.floor(
                                                    $scope.taxDiffereceDataNew.tMarginal *
                                                    $scope.budgetFile.flatRateOvertime
                                                    *100)/100
                                        }
                                    }

                                    // todo fix cc
                                    $scope.budgetFile.tax = -Math.min($scope.intCalcTaxImpot,$scope.intCalcTacTable)*0.807;

                                    //console.log($scope.selectedStaffMember);
                                    //console.log($scope.thisCall);
                                    $scope.thisResult = {};

                                    $scope.thisCall = $scope.budgetFileApiCall($scope.budgetFile).then(function () {
                                        return budgetFileService.model.item;
                                        /*console.log(budgetFileService.model.item._id);
                                         //$scope.selectedStaffMember.budgetFile.push(budgetFileService.model.item._id);

                                         ;*/
                                    }).then(function(result){
                                        $scope.thisResult = result;
                                        return result;

                                    });

                                    if(cb){
                                        //console.log($scope.thisCall);
                                        cb($scope.thisCall)
                                    }


                                }
                            }
                            // if end year is the same year
                        }else if(i == $scope.partsEndYear){

                            // Looping through available months
                            for(var k = $scope.partsStartMonth; k <= $scope.partsEndMonth; k++){

                                if(k == $scope.partsStartMonth){
                                    // Full month
                                    if($scope.partsStartDay <= 15){




                                        // Half month
                                    }else{




                                    }
                                }else if(k == $scope.partsEndMonth) {
                                    // Full month
                                    if($scope.partsEndDay >= 16){




                                        // Half month
                                    }else{




                                    }
                                }else{ // Full months (k)




                                }
                            }
                        }

                    }else if(i == $scope.partsEndYear && $scope.partsEndYear != $scope.partsStartYear){
                        for(var l = 1; l <= $scope.partsEndMonth; l++){

                            if(l == $scope.partsEndMonth) {
                                // Full month
                                if($scope.partsEndDay >= 16){




                                    // Half month
                                }else {




                                }
                            }else{ // Full month (l)




                            }
                        }
                    }else{ // Other years: Full months 12x
                        for(var m = 1; m <= 12; m++){




                        }
                    }
                }
            }
        });
    };

    $scope.budgetFileApiCall = function(file){
        var promise = budgetFileService.create(file, function(budgetFile){
            return budgetFile;
        });

        return promise
    };

    $scope.apiCall = function(a,b,c,d,e,f){

        dateIntervalService.create(c, function(interval) {
            d.dateInterval = interval._id;

            stepByStepService.create(d, function (contractItem) {

                b.stepByStep = [];
                b.stepByStep.push(contractItem._id);

                e.dateInterval = interval._id;

                entitlementsService.create(e, function(entitlementItem){

                    b.entitlements = [];
                    b.entitlements.push(entitlementItem._id);

                    f.dateInterval = interval._id;

                    socioStatusService.create(f, function(socioItem){
                        b.socioStatus = [];
                        b.socioStatus.push(socioItem._id);

                        personalDataService.create(a, function(item){

                            b.personalData = item._id;

                            staffService.create(b, function(staff){

                                $scope.staffMembers.push(staff);

                            });
                        });
                    });
                });
            });
        });
    };


}).factory('Excel',function($window){

    var uri='data:application/vnd.ms-excel;base64,',

        template='<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>',
        base64=function(s){return $window.btoa(unescape(encodeURIComponent(s)));},
        format=function(s,c){return s.replace(/{(\w+)}/g,function(m,p){return c[p];})};

    return {
        tableToExcel:function (tableId,worksheetName) {

            var table = $(tableId),
                ctx = {worksheet:worksheetName,table:table.html()},
                href = uri+base64(format(template,ctx));
            return href;
        }
    };
});
