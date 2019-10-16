var nameArray = [];
var genderArray = [];
var countArray = [];
var yearArray = [];
var ctx = null;
var chart = null;

window.onload = function() {

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
    nameToSearch = document.getElementById("enterName").value;
    yearToSearch = document.getElementById("enterYear").value;
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
                console.log("match found! name is: " + name + " year is: " + year);
            }
        };

        chart.config.data.labels = yearArray;
        chart.config.data.datasets.data = countArray;
        chart.update();
    });
};