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
    socioStatusService
){

    $scope.posts = postService.model.list;
    $scope.staffMembers = staffService.model.list;
    $scope.$watch('$scope.staffMembers', function() {
        staffService.getAll(function(list){
            $scope.staffMembers = list;
        });
    });

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
                        $scope.partsEnd = data.end.split('/');
                        $scope.contractDateInterval.start = new Date($scope.partsStart[2],$scope.partsStart[1]-1,$scope.partsStart[0]);
                        $scope.contractDateInterval.end = new Date($scope.partsEnd[2],$scope.partsEnd[1]-1,$scope.partsEnd[0]);

                        $scope.parts = data.birthDate.split('/');
                        $scope.staffPersonalData.birthDate = new Date($scope.parts[2],$scope.parts[1]-1,$scope.parts[0]);

                        $scope.staffPersonalData.gender = data.gender;
                        $scope.staffPersonalData.nationality = data.nationality;

                        $scope.selectedStaffMember.name = data.name;
                        $scope.selectedStaffMember.surname = data.surname;
                        $scope.selectedStaffMember.staffNumber = data.staffNumber;

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
