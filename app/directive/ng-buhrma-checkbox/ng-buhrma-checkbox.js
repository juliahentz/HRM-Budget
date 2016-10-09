angular.module('HRMBudget').directive('ngBuhrmaCheckbox', function($interval) {
    return {
        restrict: 'E',
        replace: false,
        scope: {
            buhrmaCheckboxModel: '=',
            buhrmaCheckboxLabel: '@'
        },
        templateUrl: 'directive/ng-buhrma-checkbox/ng-buhrma-checkbox.html',
        link: function(scope, element, attrs, fn) {

            scope.emptyHidden = scope.buhrmaCheckboxModel;
            scope.filledHidden = !scope.buhrmaCheckboxModel;

            scope.buhrmaCheckboxModel = scope.emptyHidden;

            scope.onCheckBoxClick = function(){
                scope.emptyHidden = !scope.emptyHidden;
                scope.filledHidden = !scope.filledHidden;

                scope.buhrmaCheckboxModel = scope.emptyHidden;
            }

        }
    };
});
