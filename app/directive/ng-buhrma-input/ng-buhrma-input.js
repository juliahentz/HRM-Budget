angular.module('HRMBudget').directive('ngBuhrmaInput', function(
    $compile
) {
    return {
        restrict: 'E',
        replace: false,
        scope: {
            buhrmaInputModel: '=',
            buhrmaInputText: '@'
        },
        templateUrl: 'directive/ng-buhrma-input/ng-buhrma-input.html',
        link: function(scope, element, attrs, fn) {

            scope.model = scope.buhrmaInputModel;

            scope.labelElement = $(element.find('label')[0]);

            scope.onBlur = function(){
                if(scope.model === ''){
                    scope.labelElement.removeClass('buhrma-label-focus');
                }
            };

            scope.onFocus = function(){
                scope.labelElement.addClass('buhrma-label-focus');
            };
        }
    };
});
