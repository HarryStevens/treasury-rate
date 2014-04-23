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
function drawChart(trezData) {
	//Data formatter
	dataArray = [];
	dataHeaders = ['Date', 'Treasury Rate'];
	dataArray.push(dataHeaders);
	dataObj = trezData.rows;
	//Iterator will format each row
	for (var i = 0; i < dataObj.length; i++) {
		currObj = dataObj[i];
		//Momment.js will change the date string to an actual date, which is better for manipulation
		currDate = currObj[0];
		momDate = moment(currDate);
		newDate = momDate._d;

		//Takes the value from each row and divides by 100 because they are percentages
		currVal = currObj[1];
		newVal = currVal / 100;

		//Creates formatted array to use with the Google charting library
		newArray = [newDate, newVal];
		dataArray.push(newArray);
	}
	var data = google.visualization.arrayToDataTable(dataArray);
	
	//These two formats format how the data is displayed in the tooltips
	var formatDate = new google.visualization.DateFormat({
		pattern : 'MMMM, y'
	});
	formatDate.format(data, 0);
	var formatVal = new google.visualization.NumberFormat({
		pattern : ['#.#%']
	});
	formatVal.format(data, 1);
	var options = {
		curveType : 'function',
		hAxis : {
			title : 'Date',
			titleTextStyle : {
				fontName : '"Helvetica Neue",Helvetica,Arial,sans-serif'
			},
			textStyle : {
				fontName : '"Helvetica Neue",Helvetica,Arial,sans-serif'
			}
		},
		vAxis : {
			title : '10-year Treasury Rate',
			titleTextStyle : {
				fontName : '"Helvetica Neue",Helvetica,Arial,sans-serif'
			},
			textStyle : {
				fontName : '"Helvetica Neue",Helvetica,Arial,sans-serif'
			},
			format : '##%'
		},
		height : 400
	};
	var chart = new google.visualization.LineChart(document.getElementById('chart_div'));
	chart.draw(data, options);

}

//getData is fired when the Google Viz library is loaded. It will get the data and call a function to draw the chart
function getData() {
	$.getJSON('https://www.googleapis.com/fusiontables/v1/query?sql=SELECT+*+FROM+1Fdf_ij_1hwRYnNXlPVscHKopJjA5IgbnrkyCY6ED&key=AIzaSyB-QJux9WIJmey5IJYzPImNzg-xP1gpvU8', drawChart)
}

//loadGoog is fired when everything is loaded and loads the Google Viz library
function loadGoog() {
	google.load("visualization", "1", {
		packages : ["corechart"],
		callback : 'getData'
	});
}

//When everything is loaded, this function sets the script in motion by calling certain functions
$(document).ready(function() {
	loadGoog();
});

