/**
 * Created by erhankayar on 23.09.2014.
 */
(function () {
    var app = angular.module('app', []);

    app.constant('API_URL', 'http://localhost:3000');

    app.controller('MainController', function (UserFactory) {
        var mc = this;
        mc.getUser = getUser;

        function getUser() {
            UserFactory.getUser().then(function success(response) {
                mc.userName = response.data.firstname;
                mc.userSurname = response.data.lastname;
            });
        }
    });

    app.factory('UserFactory', function ($http, API_URL) {

        return {
            getUser : getUser
        };

        function getUser() {
            return $http.get(API_URL + '/users/user');
        }

    });
})();