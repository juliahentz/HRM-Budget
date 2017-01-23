angular.module('admin', ['ui.bootstrap','ui.router','ngAnimate','ngFileUpload','ngPapaParse']);

angular.module('admin').config(function($stateProvider, $urlRouterProvider) {

    $stateProvider.state('contract-types', {
        url: '/contract-types',
        templateUrl: 'partial/contract-types/contract-types.html',
        controller: 'ContractTypesCtrl',
        resolve: {
            getAllContract: function(contractService){
                return contractService.getAll();
            }
        }
    });
    /* Add New States Above */
    $urlRouterProvider.otherwise('/contract-types');

});

angular.module('admin').run(function($rootScope) {

    $rootScope.safeApply = function(fn) {
        var phase = $rootScope.$$phase;
        if (phase === '$apply' || phase === '$digest') {
            if (fn && (typeof(fn) === 'function')) {
                fn();
            }
        } else {
            this.$apply(fn);
        }
    };

});
