angular.module('controllers', [])

// APP - RIGHT MENU
.controller('AppCtrl', function ($scope) {

})

.controller('HomeCtrl', function ($scope, $ionicActionSheet, $state) {

    $scope.showLogOutMenu = function () {
        // Show the action sheet
        var hideSheet = $ionicActionSheet.show({
            //Here you can add some more buttons
            // buttons: [
            // { text: '<b>Share</b> This' },
            // { text: 'Move' }
            // ],
            destructiveText: 'Logout',
            titleText: 'Are you sure you want to logout? This app is awsome so I recommend you to stay.',
            cancelText: 'Cancel',
            cancel: function () {
                // add cancel code..
            },
            buttonClicked: function (index) {
                //Called when one of the non-destructive buttons is clicked,
                //with the index of the button that was clicked and the button object.
                //Return true to close the action sheet, or false to keep it opened.
                return true;
            },
            destructiveButtonClicked: function () {
                //Called when the destructive button is clicked.
                //Return true to close the action sheet, or false to keep it opened.
                $state.go('facebook-sign-in');
            }
        });

    };
})

.controller('WelcomeCtrl', function ($scope, $ionicModal, $state, UserService, $ionicLoading, ngFB) {
    $scope.bgs = ["http://lorempixel.com/640/1136", "https://dl.dropboxusercontent.com/u/30873364/envato/ionFB/ion-fb-feed.gif"];

    // This method is executed when the user press the "Login with facebook" button
    $scope.facebookSignIn = function () {

        ngFB.login({ scope: 'email,read_stream,publish_actions' }).then(
            function (response) {
                if (response.status === 'connected') {
                    //alert('Facebook login succeeded');
                    // $scope.closeLogin();

                    ngFB.api({
                        path: '/v2.5/me',
                        params: { fields: 'id,name,email' }
                        //params: { "access_token": accessToken, "?fields": "first_name,last_name,email&access_token='" + accessToken + "'" }
                    }).then(
                        function (user) {
                            var userdet = {
                                UserName: user.name,
                                EmailID: user.email,
                                Location: user.user_location,
                                ProfilePictureUrl: "http://graph.facebook.com/" + user.id + "/picture?width=200&height=200"
                            };
                            UserService.setUser(userdet);
                            $state.go('create-account');
                        },
                        function (error) {
                            alert('Facebook error: ' + error.error_description);
                        });

                } else {
                    alert('Facebook login failed');
                }
            });
    };

    //$scope.trySilentLogin = function () {
    //    window.plugins.googleplus.trySilentLogin(
    //        {},
    //        function (obj) {
    //            document.querySelector("#image").src = obj.imageUrl;
    //            document.querySelector("#image").style.visibility = 'visible';
    //            document.querySelector("#feedback").innerHTML = "Silent hi, " + obj.displayName + ", " + obj.email;
    //        },
    //        function (msg) {
    //            document.querySelector("#feedback").innerHTML = "error: " + msg;
    //        }
    //    );
    //};

    $ionicModal.fromTemplateUrl('views/partials/privacy-policy.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function (modal) {
        $scope.privacy_policy_modal = modal;
    });

    $ionicModal.fromTemplateUrl('views/partials/terms-of-service.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function (modal) {
        $scope.terms_of_service_modal = modal;
    });

    $scope.showPrivacyPolicy = function () {
        $scope.privacy_policy_modal.show();
    };

    $scope.showTerms = function () {
        $scope.terms_of_service_modal.show();
    };
})

.controller('CreateAccountCtrl', function ($scope, $state, $http, $ionicPopup, UserService) {

    var user = UserService.getUser();
    var DeviceType = (navigator.userAgent.match(/iPad/i)) == "iPad" ? "iPad" : (navigator.userAgent.match(/iPhone/i)) == "iPhone" ? "iPhone" : (navigator.userAgent.match(/Android/i)) == "Android" ? "Android" : (navigator.userAgent.match(/BlackBerry/i)) == "BlackBerry" ? "BlackBerry" : "null";

    alert(DeviceType);
    user.OS = DeviceType;
    $scope.user = user;

    $scope.doSignUp = function () {
        console.log("doing sign up");

        // call save here

        var url = SERVICE + "UserRegistration/AddNewUser";
        var req = {
            method: 'POST',
            url: url,
            headers: {
                'Content-Type': 'application/json'
            },
            data: angular.toJson($scope.user),
        };
        $http(req).then(function (response) {
            $ionicPopup.alert({
                title: 'Message',
                template: 'Account created successfully'
            });
            $state.go('app.home');
        }, function (error) {
            $ionicPopup.alert({
                title: 'Error',
                template: 'Could be because of the connectivity interruption! Please check and retry!!'
            });
        });
    };
})

.controller('WelcomeBackCtrl', function ($scope, $ionicModal, $state) {
    $scope.doLogIn = function () {
        console.log("doing log in");
        $state.go('app.home');
    };

    $ionicModal.fromTemplateUrl('views/partials/forgot-password.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function (modal) {
        $scope.forgot_password_modal = modal;
    });

    $scope.showForgotPassword = function () {
        $scope.forgot_password_modal.show();
    };

    $scope.requestNewPassword = function () {
        console.log("requesting new password");
        $state.go('app.home');
    };

    // //Cleanup the modal when we're done with it!
    // $scope.$on('$destroy', function() {
    //   $scope.modal.remove();
    // });
    // // Execute action on hide modal
    // $scope.$on('modal.hidden', function() {
    //   // Execute action
    // });
    // // Execute action on remove modal
    // $scope.$on('modal.removed', function() {
    //   // Execute action
    // });
})

;
