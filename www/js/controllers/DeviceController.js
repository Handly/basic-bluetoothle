(function () {
    angular.module('starter')
    .controller('DeviceController', ['$scope', '$state', '$stateParams', 'DeviceFactory', DeviceController]);

    function DeviceController($scope, $state, $stateParams, DeviceFactory) {

        var me = this;

        var service_id = '49535343-FE7D-4AE5-8FA9-9FAFD205E455';
        var characteristic_id = '49535343-1E4D-4BD9-BA61-23C647249616';

        me.attendee = {
            firstname: 0,
            lastname: ''
        }
        var guesser = 99;
        var fish;
        $scope.init = function () {
            $scope.device = DeviceFactory.getDevice($stateParams.id);

            var onData = function (buffer) {
                // Decode the ArrayBuffer into a typed Array based on the data you expect
                var data = new Uint8Array(buffer);

                document.getElementById("asdf").innerHTML=(data[0]);
               
                

            }

            ble.startNotification($stateParams.id,
              service_id,
              characteristic_id, onData, alert("failure"));
        }

        $scope.attend = function () {
            var data = new Uint8Array(1);
            data[0] = me.attendee.firstname;
            ble.write(
              $stateParams.id,
              service_id,
              characteristic_id,
              data.buffer,
              console.log('success'),
              function (err) {
                  alert("Error occured while trying to record your attendance. Please try again.");
              }
            );




        }

        $scope.backToHome = function () {
            $state.go('home');
            ble.disconnect($stateParams.id);
        }

    }

})();
