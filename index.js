var nameArray = [];
var genderArray = [];
var countArray = [];
var yearArray = [];
var ctx = null;
var chart = null;

window.onload = function() {

    var menu = document.getElementById("yearDropdown"); 
    for (var i = 2018; i > 1879; i--){                
        var option = document.createElement("option");
        option.value = i;
        var optionText = document.createTextNode(i);
        option.appendChild(optionText)
        menu.appendChild(option);
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
};

function makeSearch(){
    nameArray = [];
    genderArray = [];
    countArray = [];
    yearArray = [];
    boyCount = null;
    girlCount = null; 
    nameToSearch = document.getElementById("enterName").value;
    yearToSearch = document.getElementById("yearDropdown").value;
    $.get("masterList.txt", function(data){
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
        if(girlCount == null){
            console.log("setting girl to 0");
            girlCount = ["0"];
        };

        if(boyCount == null){
            console.log("setting boy to 0");
            boyCount = ["0"];
        };

        
        console.log(typeof boyCount);
        console.log(boyCount);
        console.log(typeof girlCount);
        console.log(girlCount);


        console.log(chart.config.data);
        var singleYearChecked = document.getElementById("inlineRadio1").checked;
        var yearRangeChecked = document.getElementById("inlineRadio2").checked;
        console.log("single year checked is: ");
        console.log(singleYearChecked);
        console.log("year range checked is: ");
        console.log(yearRangeChecked);
        if(singleYearChecked){
            console.log("single year checked");
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
            console.log(chart.config.data);
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