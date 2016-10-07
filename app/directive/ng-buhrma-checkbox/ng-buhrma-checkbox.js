angular.module('HRMBudget').directive('ngBuhrmaCheckbox', function() {
    return {
        restrict: 'E',
        replace: false,
        scope: {
            buhrmaCheckboxModel: '=',
            buhrmaCheckboxLabel: '@'
        },
        templateUrl: 'directive/ng-buhrma-checkbox/ng-buhrma-checkbox.html',
        link: function(scope, element, attrs, fn) {

            scope.emptyHidden = false;
            scope.filledHidden = true;

            scope.onCheckBoxClick = function(){
                scope.emptyHidden = !scope.emptyHidden;
                scope.filledHidden = !scope.filledHidden;

                scope.buhrmaCheckboxModel = scope.emptyHidden;
            }

        }
    };
});
