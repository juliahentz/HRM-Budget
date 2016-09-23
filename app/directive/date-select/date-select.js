angular.module('HRMBudget').directive('dateSelect', function() {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            dateModel:'=',
            currentDate:'='
        },
        templateUrl: 'directive/date-select/date-select.html',
        link: function(scope, element, attrs, fn) {

            scope.selectedDate = scope.currentDate;
            
            var date = new Date();

            var startYear = 1900;
            var endYear = 2100;

            // YEARS
            scope.yearsArray = [];

            for(var i=startYear; i<=endYear; i++){
                scope.yearsArray.push(i);
            }

            scope.yearsArray.reverse();

            // MONTHS
            scope.monthsArray = [];

            for(var j=1; j<=12; j++){
                scope.monthsArray.push(j);
            }

            // DAYS
            function daysInMonth(month,year){
                return new Date(year, month, 0).getDate();
            }

            function calcDays(){
                var numDays = daysInMonth(scope.selectedDate.month, scope.selectedDate.year);

                scope.daysArray = [];

                for(var k=1; k<=numDays; k++){
                    scope.daysArray.push(k);
                }
            }

            calcDays();

            scope.onChange = function(){
                calcDays();

                var newDate = new Date();

                newDate.setFullYear(scope.selectedDate.year);
                newDate.setMonth(scope.selectedDate.month-1);
                newDate.setDate(scope.selectedDate.day);

                newDate.toISOString();

                scope.dateModel = newDate;

            };

            scope.onChange();

        }
    };
});
