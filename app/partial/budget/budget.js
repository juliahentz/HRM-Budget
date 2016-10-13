angular.module('HRMBudget').controller('BudgetCtrl',function(
    $scope,
    staffService
){

    $scope.staffMembers = staffService.model.list;
    $scope.today = new Date();

    $scope.budget = {};

    $scope.budget.basicSalarySum = 0;
    $scope.budget.adjustedSalarySum = 0;
    $scope.budget.headOfUnitSum = 0;

    angular.forEach($scope.staffMembers, function(staff, index){
        console.log(staff);

        angular.forEach(staff.stepByStep.positionsFilled, function(position, i){

            $scope.budget.basicSalarySum += position.basicSalary;
            $scope.budget.adjustedSalarySum += position.adjustedBasicSalary;
            if(position.headOfUnitTop){
                $scope.budget.headOfUnitSum += position.headOfUnitTop;
            }

        });

        angular.forEach(staff.entitlements.entitlements, function(entitlement, i){
            $scope.budget.householdAllowanceSum = entitlement.householdAllowanceSum;
            $scope.budget.expatriationAllowanceSum = entitlement.expatriationAllowanceSum;
        });
    });
    $scope.budget.basicSalarySum = $scope.budget.basicSalarySum.toFixed(2);
    $scope.budget.adjustedSalarySum = $scope.budget.adjustedSalarySum.toFixed(2);
    $scope.budget.headOfUnitSum = $scope.budget.headOfUnitSum.toFixed(2);
    $scope.budget.householdAllowanceSum = $scope.budget.householdAllowanceSum.toFixed(2);
    $scope.budget.expatriationAllowanceSum = $scope.budget.expatriationAllowanceSum.toFixed(2);


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
