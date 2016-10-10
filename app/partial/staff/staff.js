angular.module('HRMBudget').controller('StaffCtrl',function(
    $scope,
    staffService,
    postService,
    $uibModal,
    Excel,
    timeNow,
    $timeout
){

    $scope.posts = postService.model.list;
    $scope.staffMembers = staffService.model.list;

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
            }).result.then(function(message){

                if(message === 'Staff'){
                    staffService.model.item = {};

                    staffService.getAll(function(list){
                        $scope.staffMembers = list;
                        console.log($scope.staffMembers);

                    });
                }

            });
        }else if(message === 'AddNewState'){
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
            }).result.then(function(message){

                if(message === 'Staff'){
                    staffService.model.item = {};

                    staffService.getAll(function(list){
                        $scope.staffMembers = list;
                        console.log($scope.staffMembers);

                    });
                }
            });
        }
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

            if(message === 'Staff'){
                staffService.model.item = {};

                staffService.getAll(function(list){
                    $scope.staffMembers = list;
                    console.log($scope.staffMembers);

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
