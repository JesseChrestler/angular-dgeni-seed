/**
 * @ngdoc module
 * @name test
 * @module test
 * @description This is for demonstration purposes only
 */

/**
 * @ngdoc directive
 * @name box
 * @module test
 * @description This is a box (a visual element)
 * @restrict E
 * @example
	<example name="box-directive" module="boxExample">
		<file name="index.html">
		 <box class="mybox">
			test
		 </box>
		 <box class="mybox">
			test 2
		 </box>
		</file>
		<file name="script.js">
			angular.module("boxExample", ["test"]) // need to include the test module
		     .controller("ExampleController", ["$scope", function($scope) {}]);
		</file>
		<file name="style.css">
			.mybox {
				border:1px solid black;
				height:100px;
				width:100px;
				text-align:center;
				display:inline-block;
			}
		</file>
	</example>
*/
(function(){
	"use strict";
	angular.module("test", [])
	.directive("box", function(){
		return {
			restrict : "E",
			controller : "BoxController",
			controllerAs : "box",
			template : "<div><ng-transclude></transclude></div>",
			replace: true,
			transclude: true
		}
	})
	.controller("BoxController", function BoxController($scope){
		var vm = this;
	});	
})();