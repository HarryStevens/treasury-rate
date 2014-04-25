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

//GLOBAL VARIABLES
//Used for sending URLs of custom Fusion Tables in Ajax get reuqests
var dataURL = "https://www.googleapis.com/fusiontables/v1/query?sql=SELECT+*+FROM+1Fdf_ij_1hwRYnNXlPVscHKopJjA5IgbnrkyCY6ED+WHERE+DATE>='"
var dataKey = "&key=AIzaSyB-QJux9WIJmey5IJYzPImNzg-xP1gpvU8"

//loadGoog is fired when everything is loaded and loads the Google Viz library
function loadGoog() {
	google.load("visualization", "1", {
		packages : ["corechart"],
		callback : 'getData'
	});
}

//getData is fired when the Google Viz library is loaded. It will get the data and call a function to draw the chart
function getData() {
	var defaultDate = '';
	
	//History.js will handle the startyear and endyear
	var urlString = History.getState().cleanUrl;
	var queryString = urlString.split("?")[1];
	
	//var defaultEnd = '2014';
	
	//If there is no query string, the start date will default to 1962; otherwise, it will use the year in the query string
	if (!queryString){
		defaultDate = '1962';	
	} else {		
		var urlDate = queryString.split("=")[1];
		defaultDate = urlDate;
	}
	
	
	$(".btn").on("click",clickHandler);
	
	$("#str_"+defaultDate).click();
	//$("#end_"+defaultEnd).click();

}

// clickHandler asks for different data based on the button that is clicked
function clickHandler(e){
	var parID = $(this).parent().attr('id');
	//if (parID == 'strbtn'){
	var dateID = e.target.id;
	var dateString = dateID.split("_")[1];	
	//} else {
	//	var endID = e.target.id;
	//	var endYr = endID.split("_")[1];
	//}
	$.get(dataURL+dateString+"-01-01'"+dataKey, drawChart, 'json');
	
	//History.js for custom URLs
	History.pushState({startyear:1}, "10-Year Treasury Constant Maturity Rate | "+dateString+" - 2014", "?startyear="+dateString);
	
	//Update h2 html
	$("#startTitle").html(dateString);
}

//drawChart function formats the data and draws the chart
function drawChart(trezData) {
	//Data formatter
	dataArray = [];
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

		//Creates formatted array to use with the Google charting library. currObj[2] is the annotations column.
		newArray = [newDate, newVal, currObj[2]];
		dataArray.push(newArray);
	}
	var data = new google.visualization.DataTable();
	data.addColumn('date','DATE');
	data.addColumn('number','Treasury Rate');
	data.addColumn({type:'string', role:'annotation'});
	data.addRows(dataArray);

	//These two formats format how the data is displayed in the tooltips
	var formatDate = new google.visualization.DateFormat({
		pattern : 'MMMM, y'
	});
	formatDate.format(data, 0);
	var formatVal = new google.visualization.NumberFormat({
		pattern : ['#.#%']
	});
	formatVal.format(data, 1);
	var chartFont = 'Helvetica';
	var options = {
		curveType : 'function',
		hAxis : {
			title : 'Date',
			titleTextStyle : {
				fontName : chartFont
			},
			textStyle : {
				fontName : chartFont
			}
		},
		vAxis : {
			title : '10-year Treasury Rate',
			titleTextStyle : {
				fontName : chartFont
			},
			textStyle : {
				fontName : chartFont
			},
			format : '##%'
		},
		height : 440,
		annotations: {
			textStyle: {
				color: 'red',
				fontName: chartFont
			},
			//isHtml: true
		}
	};
	var chart = new google.visualization.LineChart(document.getElementById('chart_div'));
	chart.draw(data, options);
}

//When everything is loaded, this function sets the script in motion by calling certain functions
$(document).ready(function() {
	loadGoog();
});

