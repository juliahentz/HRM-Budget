angular.module('HRMBudget').controller('BudgetCtrl',function(
    $scope,
    Excel,
    staffService
){

    $scope.staffMembers = staffService.model.list;
    $scope.today = new Date();
    $scope.todayYear = $scope.today.getFullYear();
    $scope.todayMonth = $scope.today.getMonth();
    $scope.todayDate = $scope.today.getDate();

    $scope.budget = {};

    $scope.months = 12;
    $scope.salaryScale = [0,0,0,0,0,0,0,0,0,0,0,0];
    $scope.adjustedSalaryScale = [0,0,0,0,0,0,0,0,0,0,0,0];

    $scope.budget.basicSalarySum = 0;
    $scope.budget.adjustedSalarySum = 0;
    $scope.budget.headOfUnitSum = 0;
    $scope.budget.householdAllowanceSum = 0;
    $scope.budget.expatriationAllowanceSum = 0;
    $scope.budget.childrenAllowanceSum = 0;

    angular.forEach($scope.staffMembers, function(staff, index) {

        angular.forEach(staff.stepByStep, function(stepByStepDoc, i){

            $scope.stepByStepDocStart = new Date(stepByStepDoc.dateInterval.start);
            $scope.stepByStepDocEnd = new Date(stepByStepDoc.dateInterval.end);

            $scope.stepByStepDocStartYear = $scope.stepByStepDocStart.getFullYear();
            $scope.stepByStepDocStartMonth = $scope.stepByStepDocStart.getMonth()+1;
            $scope.stepByStepDocStartDay = $scope.stepByStepDocStart.getDate();

            $scope.stepByStepDocEndYear = $scope.stepByStepDocEnd.getFullYear();
            $scope.stepByStepDocEndMonth = $scope.stepByStepDocEnd.getMonth()+1;
            $scope.stepByStepDocEndDay = $scope.stepByStepDocEnd.getDate();

            if($scope.todayYear > $scope.stepByStepDocStartYear){

                if($scope.todayYear < $scope.stepByStepDocEndYear){
                    for(var k=0; k<$scope.months; k++){
                        $scope.salaryScale[k] += stepByStepDoc.salaryId.salary;

                    }
                }

                if($scope.todayYear == $scope.stepByStepDocEndYear){
                    for(var j=0; j<$scope.stepByStepDocEndMonth; j++){
                        if(j == $scope.stepByStepDocEndMonth-1 && $scope.stepByStepDocEndDay <= 15){
                            $scope.salaryScale[j] += stepByStepDoc.salaryId.salary/2;
                        }else{
                            $scope.salaryScale[j] += stepByStepDoc.salaryId.salary;
                        }
                    }
                }
            }

            if($scope.todayYear == $scope.stepByStepDocStartYear){

                if($scope.todayYear < $scope.stepByStepDocEndYear){
                    for(var l=$scope.stepByStepDocStartMonth-1; l<$scope.months; l++){

                        if(l == $scope.stepByStepDocStartMonth-1 && $scope.stepByStepDocStartDay >= 16){
                            $scope.salaryScale[l] += stepByStepDoc.salaryId.salary/2;

                        }else{
                            $scope.salaryScale[l] += stepByStepDoc.salaryId.salary;
                        }
                    }
                }

                if($scope.todayYear == $scope.stepByStepDocEndYear){
                    for(var m=$scope.stepByStepDocStartMonth-1; m<$scope.stepByStepDocEndMonth; m++){

                        if(m == $scope.stepByStepDocStartMonth-1 && $scope.stepByStepDocStartDay >= 16) {
                            $scope.salaryScale[m] += stepByStepDoc.salaryId.salary / 2;
                        }else if(m == $scope.stepByStepDocEndMonth-1 && $scope.stepByStepDocEndDay <= 15){
                            $scope.salaryScale[m] += stepByStepDoc.salaryId.salary/2;
                        }else{
                            $scope.salaryScale[m] += stepByStepDoc.salaryId.salary;
                        }
                    }
                }
            }
        });
    });

    $scope.exportToExcel=function(tableId){
        var exportHref=Excel.tableToExcel(tableId,'Budget');
        var a = document.createElement('a');
        a.href = exportHref;
        a.download = 'Budget.xls';
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
