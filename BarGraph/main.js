console.log("wtf")
if(typeof jQuery === "undefined") console.log("Missing required file: jquery.js");
if(typeof oopi === "undefined") console.log("Missing required file: oopi.js");
$(document).ready(function () {
    console.log("ready")
    var graph = Graph.create('graph');
    graph.setValue({bar:1,value:50});
});