angular.module('HRMBudget').controller('BudgetCtrl',function(
    $scope,
    Excel,
    staffService
){

    $scope.staffMembers = staffService.model.list;
    $scope.today = new Date();

    $scope.budget = {};

    $scope.budget.basicSalarySum = 0;
    $scope.budget.adjustedSalarySum = 0;
    $scope.budget.headOfUnitSum = 0;
    $scope.budget.householdAllowanceSum = 0;
    $scope.budget.expatriationAllowanceSum = 0;
    $scope.budget.childrenAllowanceSum = 0;

    angular.forEach($scope.staffMembers, function(staff, index){

        angular.forEach(staff.stepByStep.positionsFilled, function(position, i){

            $scope.budget.basicSalarySum += position.basicSalary;
            $scope.budget.adjustedSalarySum += position.adjustedBasicSalary;
            if(position.headOfUnitTop){
                $scope.budget.headOfUnitSum += position.headOfUnitTop;
            }

        });

        angular.forEach(staff.entitlements.entitlements, function(entitlement, i){
            if(entitlement.householdAllowanceSum){
                $scope.budget.householdAllowanceSum += entitlement.householdAllowanceSum;
            }
            if(entitlement.expatriationAllowanceSum){
                $scope.budget.expatriationAllowanceSum += entitlement.expatriationAllowanceSum;
            }
        });

        angular.forEach(staff.socioStatus.statuses, function(status, i){
            console.log(status);
            if(status.childrenAllowance){
                $scope.budget.childrenAllowanceSum += status.childrenAllowance;
            }
        });
    });
    $scope.budget.sumPerMonth = $scope.budget.basicSalarySum + $scope.budget.adjustedSalarySum + $scope.budget.headOfUnitSum + $scope.budget.householdAllowanceSum + $scope.budget.expatriationAllowanceSum + $scope.budget.childrenAllowanceSum;

    $scope.budget.totalSum = $scope.budget.sumPerMonth *12;

    $scope.budget.basicSalarySum = $scope.budget.basicSalarySum.toFixed(2);
    $scope.budget.adjustedSalarySum = $scope.budget.adjustedSalarySum.toFixed(2);
    $scope.budget.headOfUnitSum = $scope.budget.headOfUnitSum.toFixed(2);
    $scope.budget.householdAllowanceSum = $scope.budget.householdAllowanceSum.toFixed(2);
    $scope.budget.expatriationAllowanceSum = $scope.budget.expatriationAllowanceSum.toFixed(2);
    $scope.budget.childrenAllowanceSum = $scope.budget.childrenAllowanceSum.toFixed(2);
    $scope.budget.sumPerMonth = $scope.budget.sumPerMonth.toFixed(2);
    $scope.budget.totalSum = $scope.budget.totalSum.toFixed(2);

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
