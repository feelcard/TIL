

var db = firebase.firestore();


var startDate;
var endDate;

db.collection("study").where("time",">=",new Date('2019-11-30T00:00:00')).where("time","<=",new Date('2019-12-31T00:00:00')).get().then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
    });
})
.catch(function(error) {
    console.log("Error getting documents: ", error);
});

function convertDate(timestamp) {

    return new firebase.firestore.Timestamp(timestamp.seconds, timestamp.nanoseconds).toDate()
}

db.collection("study").doc("test1").get().then(function (doc) {
    var stat = doc.data().status;
    var realtime = new Date();
  
    console.log(convertDate(stat.time).getMonth());


    window.chartColors = {
        red: 'rgb(255, 99, 132)',
        orange: 'rgb(255, 159, 64)',
        yellow: 'rgb(255, 205, 86)',
        green: 'rgb(75, 192, 192)',
        blue: 'rgb(54, 162, 235)',
        purple: 'rgb(153, 102, 255)',
        grey: 'rgb(201, 203, 207)'
    };
    var MONTHS = [convertDate(stat.time).getMonth() + 1 + "월", convertDate(stat.time).getDate() + "일", convertDate(stat.time).getHours() + "시", convertDate(stat.time).getMinutes() + "분", 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    var config = {
        type: 'line',
        data: {
            labels: [convertDate(stat.time).getMonth() + 1 + "월", convertDate(stat.time).getDate() + "일", convertDate(stat.time).getHours() + "시", convertDate(stat.time).getMinutes() + "분", 'May', 'June', 'July'],
            datasets: [{
                label: 'My First dataset',
                backgroundColor: window.chartColors.red,
                borderColor: window.chartColors.red,
                data: [
                    stat.hum, stat.temp, 3, 4, 5, 6, 7//추후 data input을 생각하면 다른 방법을 강구해봐야할 것
                ],
                fill: false,
            }]
        },
        options: {
            responsive: true,
            title: {
                display: true,
                text: 'Chart.js Line Chart'
            },
            tooltips: {
                mode: 'index',
                intersect: false,
            },
            hover: {
                mode: 'nearest',
                intersect: true
            },
            scales: {
                xAxes: [{
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: 'Date Time'
                    }
                }],
                yAxes: [{
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: 'Value'
                    }
                }]
            }
        }
    };

    function randomScalingFactor() {
        return Math.floor(Math.random() * 10) + 1;
    };


    var ctx = document.getElementById('canvas').getContext('2d');
    window.myLine = new Chart(ctx, config);




    var colorNames = Object.keys(window.chartColors);
    document.getElementById('addDataset').addEventListener('click', function () {
        var colorName = colorNames[config.data.datasets.length % colorNames.length];
        var newColor = window.chartColors[colorName];
        var newDataset = {
            label: 'Dataset ' + config.data.datasets.length,
            backgroundColor: newColor,
            borderColor: newColor,
            data: [],
            fill: false
        };

        for (var index = 0; index < config.data.labels.length; ++index) {
            newDataset.data.push(randomScalingFactor());
        }

        config.data.datasets.push(newDataset);
        window.myLine.update();
    }); 

    document.getElementById('addData').addEventListener('click', function () {
        if (config.data.datasets.length > 0) {
            var month = MONTHS[config.data.labels.length % MONTHS.length];
            config.data.labels.push(month);

            config.data.datasets.forEach(function (dataset) {
                dataset.data.push(randomScalingFactor());
            });

            window.myLine.update();
        }
    });

    document.getElementById('removeDataset').addEventListener('click', function () {
        config.data.datasets.splice(0, 1);
        window.myLine.update();
    });

    document.getElementById('removeData').addEventListener('click', function () {
        config.data.labels.splice(-1, 1); // remove the label first

        config.data.datasets.forEach(function (dataset) {
            dataset.data.pop();
        });

        window.myLine.update();
    });  

    document.getElementById('addStatus').addEventListener('click', function () {
        config.data.labels.splice(-1, 1); // remove the label first
        console.log("data input");
        db.collection("study").doc(realtime.toString()).set({

            temp: Math.floor(Math.random() * 10) + 1,
            hum: Math.floor(Math.random() * 10) + 1,
            time: realtime

        })
            .then(function () {
              
                console.log("Document successfully written!");
            })
            .catch(function (error) {
                console.error("Error writing document: ", error);
            });


    });


});