angular.module('HRMBudget', ['ui.bootstrap','ui.router','ngAnimate']);

angular.module('HRMBudget').config(function($stateProvider, $urlRouterProvider) {

    $stateProvider.state('staff', {
        url: '/staff',
        templateUrl: 'partial/staff/staff.html',
        controller: 'StaffCtrl',
        resolve:{
            getAllStaffMembers: function(staffService){
                return staffService.getAll();
            },
            getAllPosts: function(postService){
                return postService.getAll();
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
