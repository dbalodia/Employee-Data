/**
 * Created by Dheeraj on 15-06-2017.
 */
var myApp = angular.module('managementApp', []);
myApp.controller('myCtrl', function ($scope,$filter) {
    $scope.currentDate = new Date();
    $scope.editableId = null;
    $scope.submit = true;
    $scope.update = true;
    $scope.currentPage = 0;
    $scope.pageSize = 4;
    $scope.temp1=[];
    $scope.deletebtn=true;
    $scope.deleteText = true;
    $scope.deleteP = true;
    $scope.deleteTextHide = true;
    $scope.deleteTextContent = true;
    $scope.saveData = function () {
        var dataStore = {};
        var nameDetail = $scope.enteredName;
        var dobDetail = $scope.enteredDob;
        dataStore.enteredName = nameDetail;
        dataStore.enteredDob = dobDetail;
        $scope.enteredName = "";
        $scope.enteredDob = "";
        var preData = JSON.parse(localStorage.getItem("storage"));
        if (preData) {
            preData.push(dataStore);
            localStorage.setItem('storage', JSON.stringify(preData));
        } else {
            var temp = [];
            temp.push(dataStore);
            localStorage.setItem('storage', JSON.stringify(temp));
        }
    };
    $scope.showDetails = function () {
        $scope.temp1 = [];
        $scope.temp1 = JSON.parse(localStorage.getItem('storage'));
    };
    $scope.deleteEntry = function (id) {
        $scope.temp1.splice(id, 1);
        localStorage.setItem('storage', JSON.stringify($scope.temp1));
        $scope.deletebtn=false;
        $scope.deleteText = false;
        $scope.deleteP = false;
        $scope.deleteTextHide = false;
        $scope.deleteTextContent = false;
    };
    $scope.editEntry = function (id) {
        var dataForUpdate = JSON.parse(localStorage.getItem('storage'));
        $scope.enteredName = dataForUpdate[id].enteredName;
        $scope.enteredDob = new Date(dataForUpdate[id].enteredDob);
        $scope.editableId = id;
        $scope.submit = false;
        $scope.update = false;


    };
    $scope.onCLickShowBtn = function () {
        $scope.deletebtn=true;
        $scope.deleteText = true;
        $scope.deleteP = true;
        $scope.deleteTextHide = true;
        $scope.deleteTextContent = true;

    }
    $scope.updateData = function () {
        var dataForUpdate = JSON.parse(localStorage.getItem('storage'));
        dataForUpdate[$scope.editableId].enteredName = $scope.enteredName;
        dataForUpdate[$scope.editableId].enteredDob = $scope.enteredDob;
        localStorage.setItem("storage", JSON.stringify(dataForUpdate));
        $scope.temp1 = dataForUpdate;
        $scope.enteredName = '';
        $scope.enteredDob = '';
        $scope.submit = true;
        $scope.update = true;
    };
    $scope.cancelData = function () {
        $scope.submit = true;
        $scope.update = true;
        $scope.enteredName = '';
        $scope.enteredDob = '';
    };
    $scope.showDetails();
    $scope.numberOfPages=function() {
        return Math.ceil($scope.temp1.length / $scope.pageSize);
    };
});
myApp.filter('startFrom', function() {
    return function(input, start) {
        start = +start; //parse to int\

        return input.slice(start);
    };
    $scope.showDetails();
});