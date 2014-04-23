/**
 * @author
 */

/*
https://www.googleapis.com/fusiontables/v1/query?sql=SELECT+*+FROM+1Fdf_ij_1hwRYnNXlPVscHKopJjA5IgbnrkyCY6ED&key=AIzaSyB-QJux9WIJmey5IJYzPImNzg-xP1gpvU8
*/

/*
 * Steps:
 * 1. Load up Google Javascript and call a function to get the data
 * 2. Get the data and call a function ot handle data parsing and displaying
 * 3. Create function to handle data parsing and displaying
 */

//drawChart function formats the data and draws the chart
function drawChart(trezData){
	//Data formatter
	dataArray = [];
	dataObj = trezData.rows;
	console.log(dataObj);
	//Iterator will format each row
	for(var i=0;i<dataObj.length;i++){
		
	}
}

//getData is fired when the Google Viz library is loaded. It will get the data and call a function to draw the chart
function getData(){
	$.getJSON('https://www.googleapis.com/fusiontables/v1/query?sql=SELECT+*+FROM+1Fdf_ij_1hwRYnNXlPVscHKopJjA5IgbnrkyCY6ED&key=AIzaSyB-QJux9WIJmey5IJYzPImNzg-xP1gpvU8', drawChart)
}

//loadGoog is fired when everything is loaded and loads the Google Viz library
function loadGoog(){
    google.load("visualization", "1", {packages:["corechart"], callback : 'getData'});
}

//When everything is loaded, this function sets the script in motion by calling certain functions
$(document).ready(function(){
	loadGoog();
});

