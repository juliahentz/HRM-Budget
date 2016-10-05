angular.module('HRMBudget').directive('ngBuhrmaInput', function() {
    return {
        restrict: 'E',
        replace: false,
        scope: {
            buhrmaInputModel: '=',
            buhrmaInputText: '@',
            buhrmaInputType: '@'
        },
        templateUrl: 'directive/ng-buhrma-input/ng-buhrma-input.html',
        link: function(scope, element, attrs, fn) {

            scope.model = scope.buhrmaInputModel;

            scope.labelElement = $(element.find('label')[0]);

            if(scope.model){
                scope.labelElement.addClass('buhrma-label-focus');
            }

            scope.onBlur = function(){
                if(scope.model === '' || scope.model == null){
                    scope.labelElement.removeClass('buhrma-label-focus');
                }
                scope.buhrmaInputModel = scope.model;
            };

            scope.onFocus = function(){
                scope.labelElement.addClass('buhrma-label-focus');
            };
        }
    };
});
