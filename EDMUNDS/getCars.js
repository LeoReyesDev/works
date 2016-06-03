var app = angular.module('finderCars', []);
var notImages = false;

var carController = function($scope, $http) {

    // get all the makes
    $http.get('https://api.edmunds.com/api/vehicle/v2/makes?state=new&view=basic&fmt=json&api_key=9gey9nk4m76p7uu7kacfryex')
        .then(function(response) {
            $scope.makes = response.data.makes;
        }, function(error) {
            $scope.error1 = JSON.stringify(error);
        });

    $scope.clear = function() {
        $scope.displayResults.innerHTML = "";
    };

    // Get collections of Car
    $scope.getCollectionCars = function() {
        $http.get('https://api.edmunds.com/api/vehicle/v2/' + $scope.make.niceName + '/' + $scope.model.niceName + '/' + $scope.year.year + '?category=Sedan&view=full&fmt=json&api_key=9gey9nk4m76p7uu7kacfryex')
            .then(function(response) {
                $scope.myCars = response.data;
                console.log("CARS LIST",$scope.myCars.styles)
                if($scope.myCars.styles == ""){
                  alert("Car style don't found please seach again.")

                }
                
            }, function(error) {
                $scope.error1 = JSON.stringify(error);
          
            });
    };
};


app.directive('imageCar', function($http) {
    return {
        restrict: "E",
        link: function(scope, elm, attrs) {
            scope.$watch(attrs.styleid, function(myCarID) {

                if ((myCarID !== null) && (myCarID !== undefined) && (myCarID !== '')) {
                    console.log("IF myCAR", myCarID)
                    notImages = true;
                    $http.get('https://api.edmunds.com/v1/api/vehiclephoto/service/findphotosbystyleid?styleId=' + myCarID + '&fmt=json&api_key=9gey9nk4m76p7uu7kacfryex')
                        .then(function(response) {

                            if (response.data[0] && response.data[0].photoSrcs && response.data[0].photoSrcs[0])
                                var tag = '<img alt="" class="img-responsive img-thumbnail thumbs" src="http://media.ed.edmunds-media.com' + response.data[0].photoSrcs[0] + '" />'
                            elm.append(tag);
                        }, function(error) {
                            scope.error3 = JSON.stringify(error);

                        });
                }



            });
        }
    };
});

app.controller('carController', ['$scope', '$http', carController]);
