angular.module('HRMBudget').directive('ngBuhrmaSelect', function(
    $timeout
) {
    return {
        restrict: 'E',
        replace: false,
        scope: {
            buhrmaSelectModel: '=',
            buhrmaSelectText: '@',
            buhrmaSelectOptions: '=?',
            buhrmaSelectPrefill: '@'
        },
        templateUrl: 'directive/ng-buhrma-select/ng-buhrma-select.html',
        link: function(scope, element, attrs, fn) {

            scope.labelElement = $(element.find('label')[0]);

            if(scope.buhrmaSelectModel === '' || scope.buhrmaSelectModel == null){
                if(scope.buhrmaSelectPrefill){
                    scope.buhrmaSelectModel = scope.buhrmaSelectPrefill;
                }
            }

            scope.model = scope.buhrmaSelectModel;

            scope.selectOptions = scope.buhrmaSelectOptions;

            scope.selectOptions.sort();

            if(scope.model != null){
                scope.labelElement.addClass('buhrma-label-focus');
            }

            scope.$selectBox = angular.element(element[0].querySelector('.buhrma-select-box'));

            scope.boxOpen = false;

            scope.onClick = function(){

                scope.$selectBox.addClass('buhrma-select-box-visible');
                scope.selectOptions = scope.buhrmaSelectOptions;
            };

            $(document).bind('click', function(event){
                var isClickedElementChildOfPopup = element
                        .find(event.target)
                        .length > 0;

                if (isClickedElementChildOfPopup)
                    return;

                scope.$apply(function(){

                    scope.$selectBox.removeClass('buhrma-select-box-visible');
                    scope.selectOptions = scope.buhrmaSelectOptions;
                });
            });

            scope.keyArray = [];
            scope.previousSelectedItem = {};

            scope.onBuhrmaKeyDown = function(evt){

                var currentKey = evt.key.toUpperCase();
                scope.keyArray.push(currentKey);

                $timeout(function(){
                    scope.keyArray = [];
                },500);

                angular.forEach(scope.selectOptions, function(item, index){

                    var $selectedItem = angular.element(element[0].querySelector('#anchor'+index));

                    if(scope.keyArray.length == 2){

                        if(Object.keys(scope.previousSelectedItem).length != 0){
                            scope.previousSelectedItem.removeClass('buhrma-select-box-input-selected');
                        }

                        if(item.charAt(0) == scope.keyArray[0] && item.charAt(1) == scope.keyArray[1]) {

                            scope.previousSelectedItem = $selectedItem;

                            $selectedItem.addClass('buhrma-select-box-input-selected');

                            scope.$selectBox.scrollTo($selectedItem);

                            scope.keyArray = [];

                        }
                    }else if(scope.keyArray.length == 1){
                        if(item.charAt(0) == scope.keyArray[0]) {
                            //console.log(item.alpha2Code);
                        }
                    }

                    if(evt.key == 'Enter'){
                        scope.onEnter(scope.previousSelectedItem);
                    }

                });
            };

            scope.onMyMouseEnter = function(evt){
                $(evt.toElement).addClass('buhrma-select-box-input-hover');
            };

            scope.onMyMouseLeave = function(evt){
                $(evt.currentTarget).removeClass('buhrma-select-box-input-hover');
            };

            scope.onSelect = function(evt){
                scope.model = evt.currentTarget.innerText;
                scope.buhrmaSelectModel = evt.currentTarget.innerText;
                scope.$selectBox.removeClass('buhrma-select-box-visible');
                scope.labelElement.addClass('buhrma-label-focus');
                scope.selectOptions = scope.buhrmaSelectOptions;
            };

            scope.onEnter = function(item){
                scope.model = item[0].innerText;
                scope.buhrmaSelectModel = item[0].innerText;
                scope.$selectBox.removeClass('buhrma-select-box-visible');
                scope.labelElement.addClass('buhrma-label-focus');
                scope.selectOptions = scope.buhrmaSelectOptions;
            }
        }
    };
});
