/**
 * Created by danle on 5/17/16.
 */
(function() {
    angular
        .module('auth', ['ui.router'])
        .config(['$stateProvider','$urlRouterProvider', config]);

    function config($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('login', {
                url: '/login',
                templateUrl: '../templates/login-signup.html',
                controller: 'LoginController',
                controllerAs: 'login'
            })
            .state('home', {
                url: '/home',
                templateUrl: '../templates/home.html',
                controller: 'HomeController',
                controllerAs: 'home'
            });
        $urlRouterProvider.otherwise('/login');
    }
})();