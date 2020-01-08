

var db = firebase.firestore();

function convertDate(timestamp) {

    return new firebase.firestore.Timestamp(timestamp.seconds, timestamp.nanoseconds).toDate()
}






var datechart = new Vue({
    el: '#chartarea',
    data: {
        setSD: '',
        setED: '',
        check: true
    },
    methods: {
        callFirebase: function () {

            let startdate = new Date(this.setSD + 'T00:00:00');
            startdate.setHours(startdate.getHours() + 9);
            let enddate = new Date(this.setED + 'T00:00:00');
            enddate.setHours(enddate.getHours() + 33);
            db.collection("study").
                where("time", ">=", new Date(startdate.toISOString().split('.', 1)[0])).
                where("time", "<", new Date(enddate.toISOString().split('.', 1)[0])).
                get().then(function (querySnapshot) {


                    window.chartColors = {
                        red: 'rgb(255, 99, 132)',
                        orange: 'rgb(255, 159, 64)',
                        yellow: 'rgb(255, 205, 86)',
                        green: 'rgb(75, 192, 192)',
                        blue: 'rgb(54, 162, 235)',
                        purple: 'rgb(153, 102, 255)',
                        grey: 'rgb(201, 203, 207)'
                    };

                    var config = {
                        type: 'line',
                        data: {
                            labels: [],
                            datasets: [{
                                label: startdate.toDateString() + '~' + enddate.toDateString(),
                                backgroundColor: window.chartColors.red,
                                borderColor: window.chartColors.red,
                                data: [

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
                                        labelString: 'Date'
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
                 
                  




                    document.getElementById('addStatus').addEventListener('click', function () {
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

                    var count = 1;
                    if( config.data.labels != null){
                        config.data.labels = [];
                        config.data.datasets[0].data = [];
                        count = 1;
                    }
                      
                   
                    querySnapshot.forEach(function (doc) {

                        if (convertDate(doc.data().time).getDate() + '일' === config.data.labels[config.data.labels.length - 1]) {
                            config.data.datasets[0].data[config.data.datasets[0].data.length - 1] += doc.data().temp;
                            count++;
                          
                            if(convertDate(doc.data().time).getDate() === enddate.getDate()-1){
                              
                            config.data.datasets[0].data[config.data.datasets[0].data.length - 1] = config.data.datasets[0].data[config.data.datasets[0].data.length - 1] / count;
                            }
                        }
                      

                        else {
                            if (count > 1) {
                                config.data.datasets[0].data[config.data.datasets[0].data.length - 1] = config.data.datasets[0].data[config.data.datasets[0].data.length - 1] / count
                            }

                            config.data.labels.push((convertDate(doc.data().time).getDate()) + '일');
                            config.data.datasets[0].data.push(doc.data().temp);
                        }

                      
                    });

                    var ctx = document.getElementById('canvas').getContext('2d');
                    window.myLine = new Chart(ctx, config);
                    if( window.myLine == null){
                        console.log("create chart")
                        window.myLine = new Chart(ctx, config);
                    }
                   
                    else{
                        console.log("update chart")
                        window.myLine.destroy();
                        window.myLine = new Chart(ctx, config);
                    }
                   


                })
                .catch(function (error) {
                    console.log("Error getting documents: ", error);
                });
        },
        dateCheck: function(){
            let enddate = new Date(this.setED + 'T00:00:00');
            if(enddate.getDate() >= new Date().getDate){
                this.check =false;
            }
            else{
                this.check =true;
            }
            return this.check;
        }
    }

});





