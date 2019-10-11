window.onload = function() {

    var nameArray = [];
    var genderArray = [];
    var countArray = [];
    var yearArray = [];

    $.get("testNames.txt", function(data){
        var rows = data.split("\n");
        console.log("rows are: ");
        console.log(rows);
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
        }

        console.log(data.toString());

        console.log("Names are");
        console.log(nameArray);
        console.log("Counts are");
        console.log(countArray);
    
        var ctx = document.getElementById('myChart').getContext('2d');
        var chart = new Chart(ctx, {
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

function searchName(){
    console.log("function began");
    nameToSearch = document.getElementById("enterName").value;
    console.log(nameToSearch);
}