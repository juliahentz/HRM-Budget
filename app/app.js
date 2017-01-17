angular.module('HRMBudget', ['ui.bootstrap','ui.router','ngAnimate','angularRipple', 'ngPapaParse','ngFileUpload']);

angular.module('HRMBudget').config(function($stateProvider, $urlRouterProvider) {

    $stateProvider.state('app', {

        url:'/',
        abstract:true,
        views:{
            header:{
                templateUrl:'partial/header/header.html',
                controller:'HeaderCtrl'
            }
        }

    });

    $stateProvider.state('app.staff', {
        url: 'staff',
        views: {
            'main@':{
                templateUrl: 'partial/staff/staff.html',
                controller: 'StaffCtrl'
            }
        },
        resolve:{
            getAllStaffMembers: function(staffService){
                return staffService.getAll();
            },
            getAllPosts: function(postService){
                return postService.getAll();
            },
            getContractTypes: function(paramContractService){
                return paramContractService.getAllContractTypes();
            },
            getAllPlaceOfEmployment: function(paramPlaceOfEmploymentService){
                return paramPlaceOfEmploymentService.getAll();
            },
            timeNow: function(){
                var now = new Date();
                return now.toISOString();
            }

        }
    });

    $stateProvider.state('app.budget', {
        url: 'budget',
        views: {
            'main@':{
                templateUrl: 'partial/budget/budget.html',
                controller: 'BudgetCtrl'
            }
        },
        resolve:{
            getAllStaffMembers: function(staffService){
                return staffService.getAll();
            }
        }
    });
    /* Add New States Above */
    $urlRouterProvider.otherwise('/staff');

});

angular.module('HRMBudget').run(function($rootScope) {

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
