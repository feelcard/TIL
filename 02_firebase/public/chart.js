

var db = firebase.firestore();



var datechart = new Vue({
    el: '#chartarea',
    data: {
        setSD:'',
        setED:''
    },
    methods: {
        callFirebase: function (){
         
            let startdate = new Date(this.setSD+'T00:00:00');
            startdate.setHours(startdate.getHours()+9);
            let enddate = new Date(this.setED+'T00:00:00');
            enddate.setHours(enddate.getHours()+33);
            console.log(startdate.getTime());
            console.log(enddate.toISOString().split('.',1)[0]);
            db.collection("study").
            where("time", ">=", new Date(startdate.toISOString().split('.',1)[0])).
            where("time", "<", new Date(enddate.toISOString().split('.',1)[0])).
            get().then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                    // doc.data() is never undefined for query doc snapshots
                    console.log(doc.id, " => ", doc.data().time.toDate());
                });
            })
                .catch(function (error) {
                    console.log("Error getting documents: ", error);
                });
            }
        }

    });




function convertDate(timestamp) {

    return new firebase.firestore.Timestamp(timestamp.seconds, timestamp.nanoseconds).toDate()
}

db.collection("study").doc("test1").get().then(function (doc) {
    var stat = doc.data().status;
    

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



    document.getElementById('addStatus').addEventListener('click', function () {
        config.data.labels.splice(-1, 1); // remove the label first
        var realtime = new Date();
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