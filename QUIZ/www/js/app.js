var app = app || {},
    SERVICE = "http://localhost:53607//api/";

(function () {
    "use strict";
    
    // angular.module is a global place for creating, registering and retrieving Angular modules
    // 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
    // the 2nd parameter is an array of 'requires'

    app = angular.module('quiz', [
      'ionic',
      'directives',
      'controllers',
     // 'views',
      'services',
      'ngOpenFB'
    ])

    app.factory('_', function () {
        return window._; // assumes underscore has already been loaded on the page
    });

    app.run(function ($ionicPlatform, ngFB) {
        ngFB.init({ appId: '1573098212948363' });

        $ionicPlatform.ready(function () {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }
            if (window.StatusBar) {
                StatusBar.styleDefault();
            }
        });

        //gulp.task('default', function () {
        //    gulp.src('./www/views/**/*.html')
        //        .pipe(templateCache('views.js', { module: 'templatescache', standalone: true, root: './views/' }))
        //        .pipe(gulp.dest('./www/views/'));
        //});
    })

    app.config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider

        .state('facebook-sign-in', {
            url: "/facebook-sign-in",
            templateUrl: "views/auth/facebook-sign-in.html",
            controller: 'WelcomeCtrl'
        })

        .state('google-sign-in', {
            url: "/google-sign-in",
            templateUrl: "views/auth/facebook-sign-in.html",
            controller: 'WelcomeCtrl'
        })

        .state('dont-have-facebook', {
            url: "/dont-have-facebook",
            templateUrl: "views/auth/dont-have-facebook.html",
            controller: 'WelcomeCtrl'
        })

        .state('create-account', {
            url: "/create-account",
            templateUrl: "views/auth/create-account.html",
            controller: 'CreateAccountCtrl'
        })

        .state('welcome-back', {
            url: "/welcome-back",
            templateUrl: "views/auth/welcome-back.html",
            controller: 'WelcomeBackCtrl'
        })

        .state('app', {
            url: "/app",
            abstract: true,
            templateUrl: "views/app/side-menu.html",
            controller: 'AppCtrl'
        })

        // APP HOME
        .state('app.home', {
            url: "/home",
            views: {
                'menuContent': {
                    templateUrl: "views/app/home.html",
                    controller: 'HomeCtrl'
                }
            }
        });
        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/facebook-sign-in');
    })

  //  

  //  gulp.task('default', function () {
  //      return gulp.src('views/**/*.html')
  //        .pipe(templateCache())
  //        .pipe(gulp.dest('js/views.js'));
  //  });

  //  angular.module("views").run([$templateCache,
  //  function($templateCache) {
  //      $templateCache.put("views/auth/facebook-sign-in.html",
  //      // template1.html content (escaped) 
  //    );
  //      $templateCache.put("views/app/home.html",
  //      // template2.html content (escaped) 
  //    );
  //    // etc. 
  //}
  //  ]);

    //.initialize = function () {
    //    document.addEventListener('deviceready', onDeviceReady, false); //device ready event
    //};

    //var onDeviceReady = function() {
    //    $ionicPlatform.ready(function() {
    //        openFB.init({
    //            appId: '748156145305628'
    //        }); //initialize facebook
    //    });

})();
//};

