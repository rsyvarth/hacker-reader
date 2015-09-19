app.config(function($stateProvider, $urlRouterProvider) {

    // For any unmatched url, redirect to /
    $urlRouterProvider.otherwise("/");

    // Now set up the states
    $stateProvider
        .state('home', {
            url: "/",
            templateUrl: "partials/home/home.html"
        })
        .state('about', {
            url: "/about",
            templateUrl: "partials/about/about.html"
        });
});