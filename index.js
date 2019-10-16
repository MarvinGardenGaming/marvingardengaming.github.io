var nameArray = [];
var genderArray = [];
var countArray = [];
var yearArray = [];
var ctx = null;
var chart = null;

window.onload = function() {

    var beginningYearDropdown = document.getElementById("beginningYearDropdown"); 
    for (var i = 1880; i < 2019; i++){                
        var option = document.createElement("option");
        option.value = i;
        var optionText = document.createTextNode(i);
        option.appendChild(optionText)
        beginningYearDropdown.appendChild(option);
        beginningYearDropdown.selectedIndex = "1880";
    }

    var yearDropdown = document.getElementById("yearDropdown"); 
    for (var i = 1880; i < 2019; i++){                
        var option = document.createElement("option");
        option.value = i;
        var optionText = document.createTextNode(i);
        option.appendChild(optionText)
        yearDropdown.appendChild(option);
        local .selectedIndex = "2019";
    }

    $.get("testNames.txt", function(data){
        var rows = data.split("\n");
        for(row in rows){
            var columnsInRow = rows[row].split(",");
            var name = columnsInRow[0];
            var gender = columnsInRow[1];
            var count = columnsInRow[2];
            var year = columnsInRow[3];

            nameArray.push(name);
            genderArray.push(gender);
            countArray.push(count);
            yearArray.push(year);
        };
        ctx = document.getElementById('myChart').getContext('2d');
        chart = new Chart(ctx, {
            // The type of chart we want to create
            type: 'bar',
    
            // The data for our dataset
            data: {
                labels: nameArray,
                datasets: [{
                    label: 'My First dataset',
                    backgroundColor: 'rgb(255, 99, 132)',
                    borderColor: 'rgb(255, 99, 132)',
                    data: countArray
                }]
            },
    
            // Configuration options go here
            options: {}
        });
    });

    Chart.plugins.register({
        afterDatasetsDraw: function(chart, easing) {
            // To only draw at the end of animation, check for easing === 1
            var ctx = chart.ctx;

            chart.data.datasets.forEach(function (dataset, i) {
                var meta = chart.getDatasetMeta(i);
                if (!meta.hidden) {
                    meta.data.forEach(function(element, index) {
                        // Draw the text in black, with the specified font
                        ctx.fillStyle = 'rgb(0, 0, 0)';

                        var fontSize = 16;
                        var fontStyle = 'normal';
                        var fontFamily = 'Helvetica Neue';
                        ctx.font = Chart.helpers.fontString(fontSize, fontStyle, fontFamily);

                        // Just naively convert to string for now
                        var dataString = dataset.data[index].toString();

                        // Make sure alignment settings are correct
                        ctx.textAlign = 'center';
                        ctx.textBaseline = 'middle';

                        var padding = 5;
                        var position = element.tooltipPosition();
                        ctx.fillText(dataString, position.x, position.y - (fontSize / 2) - padding);
                    });
                }
            });
        }
    });
};

function hideBeginYear(){
    document.getElementById("beginningYearDropdown").style.display = "none";
};

function showBeginYear(){
    document.getElementById("beginningYearDropdown").style.display = "inline-block";
};

function makeSearch(){
    nameArray = [];
    genderArray = [];
    countArray = [];
    yearArray = [];
    boyCount = [];
    girlCount = []; 
    nameToSearch = document.getElementById("enterName").value;
    yearToSearch = document.getElementById("yearDropdown").value;
    $.get("masterList.txt", function(data){

        var singleYearChecked = document.getElementById("inlineRadio1").checked;
        var yearRangeChecked = document.getElementById("inlineRadio2").checked;

        if(singleYearChecked){
            var rows = data.split("\n");
            for(row in rows){
                var columnsInRow = rows[row].split(",");
                var name = columnsInRow[0];
                var gender = columnsInRow[1];
                var count = columnsInRow[2];
                var year = columnsInRow[3];
    
                if(name == nameToSearch && year == yearToSearch){
                    nameArray.push(name);
                    genderArray.push(gender);
                    countArray.push(count);
                    yearArray.push(year);
                    if(gender == "F"){
                        girlCount.push(count);
                    } else if (gender == "M"){
                        boyCount.push(count);
                    }
                }
            };
            if(girlCount.length == 0){
                console.log("setting girl to 0");
                girlCount = ["0"];
            };
    
            if(boyCount.length == 0){
                console.log("setting boy to 0");
                boyCount = ["0"];
            };

            var chartData = {
                labels: [yearToSearch],
                datasets: [
                    {
                        label: "Girl",
                        backgroundColor: 'rgb(255, 99, 132)',
                        borderColor: "white",
                        data: girlCount
                    },
                    {
                        label: "Boy",
                        backgroundColor: 'rgb(102, 156, 236)',
                        borderColor: "white",
                        data: boyCount
                    }
                ]
            }
            chart.config.data = chartData;
            chart.config.options.title.display = true;
            chart.config.options.title.text = "Showing results for the name \'" + nameToSearch + "\' in the year \'" + yearToSearch + "\'";
            chart.update();
        } else if (yearRangeChecked){
            console.log("year range checked");
            var chartData = {
                labels: yearArray,
                datasets: [
                    {
                        label: "Girl",
                        backgroundColor: 'rgb(255, 99, 132)',
                        borderColor: "white",
                        data: girlCount
                    },
                    {
                        label: "Boy",
                        backgroundColor: 'rgb(102, 156, 236)',
                        borderColor: "white",
                        data: boyCount
                    }
                ]
            }
            chart.config.data = chartData;
            chart.update();
            console.log("chart updated");
            console.log(chart.config.data);
        }
    });
};