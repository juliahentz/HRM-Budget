angular.module('HRMBudget').directive('ngBuhrmaDateInput', function(
    $interval
) {
    return {
        restrict: 'E',
        replace: false,
        scope: {
            buhrmaDateModel: '='
        },
        templateUrl: 'directive/ng-buhrma-date-input/ng-buhrma-date-input.html',
        link: function(scope, element, attrs, fn) {

            scope.dateModel = scope.buhrmaDateModel;

            scope.inlineOptions = {
                customClass: getDayClass,
                minDate: new Date(),
                showWeeks: true
            };

            scope.dateOptions = {
                formatYear: 'yyyy',
                maxDate: new Date(2500, 12, 31),
                minDate: new Date(1900, 1, 1),
                startingDay: 1
            };

            scope.open = function() {
                scope.popup.opened = true;
            };

            scope.setDate = function(year, month, day) {
                scope.dateModel = new Date(year, month, day);
            };

            scope.format = 'dd/MM/yyyy';
            scope.altInputFormats = ['M!/d!/yyyy'];

            scope.popup = {
                opened: false
            };

            function getDayClass(data) {
                var date = data.date,
                    mode = data.mode;
                if (mode === 'day') {
                    var dayToCheck = new Date(date).setHours(0,0,0,0);

                    for (var i = 0; i < scope.events.length; i++) {
                        var currentDay = new Date(scope.events[i].date).setHours(0,0,0,0);

                        if (dayToCheck === currentDay) {
                            return scope.events[i].status;
                        }
                    }
                }

                return '';
            }

            scope.inFocus = false;

            $interval(function(){
                if(scope.popup.opened == false){
                    scope.buhrmaDateModel = scope.dateModel;
                }
            },1000);
        }
    };
});
