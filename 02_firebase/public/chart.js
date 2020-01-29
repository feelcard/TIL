

var db = firebase.firestore();

function convertDate(timestamp) {

    return new firebase.firestore.Timestamp(timestamp.seconds, timestamp.nanoseconds).toDate()
}


new Vue({
    el: '#hooper',
    components: {
        Hooper: window.Hooper.Hooper,
        Slide: window.Hooper.Slide,
        HooperNavigation: window.Hooper.Navigation,
        HooperPagination: window.Hooper.Pagination
    },
    data: {
        setSD: '',
        setED: '',
        setD:'',
        error: ''
    },

    methods: {
        callFirebase: function () {
            
            const realtime =new Date();
            realtime.setHours(realtime.getHours() + 33);
            let startdate = new Date(this.setSD + 'T00:00:00');
            startdate.setHours(startdate.getHours() + 9);
            let enddate = new Date(this.setED + 'T00:00:00');
            enddate.setHours(enddate.getHours() + 33);

            if (enddate.getDate() > realtime.getDate()) {
                console.log(enddate.getDate() );
                console.log( realtime.getDate() );

                return this.error = '입력한 날짜가 올바르지 않습니다.'
            }

            else {
               
                db.collection("mc").
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



                        // document.getElementById('addStatus').addEventListener('click', function () {
                        //     var realtime = new Date();
                        //     console.log("data input");
                        //     db.collection("study").doc(realtime.toString()).set({

                        //         temp: Math.floor(Math.random() * 10) + 1,
                        //         hum: Math.floor(Math.random() * 10) + 1,
                        //         time: realtime

                        //     })
                        //         .then(function () {

                        //             console.log("Document successfully written!");
                        //         })
                        //         .catch(function (error) {
                        //             console.error("Error writing document: ", error);
                        //         });


                        // });

                        var count = 1;
                        if (config.data.labels != null) {
                            config.data.labels = [];
                            config.data.datasets[0].data = [];
                            count = 1;
                        }


                        querySnapshot.forEach(function (doc) {

                            if (convertDate(doc.data().time).getDate() + '일' === config.data.labels[config.data.labels.length - 1]) {
                                config.data.datasets[0].data[config.data.datasets[0].data.length - 1] += doc.data().inside_temp;
                                count++;

                                if (convertDate(doc.data().time).getDate() === enddate.getDate() - 1) {

                                    config.data.datasets[0].data[config.data.datasets[0].data.length - 1] = config.data.datasets[0].data[config.data.datasets[0].data.length - 1] / count;
                                }
                            }


                            else {
                                if (count > 1) {
                                    config.data.datasets[0].data[config.data.datasets[0].data.length - 1] = config.data.datasets[0].data[config.data.datasets[0].data.length - 1] / count
                                }

                                config.data.labels.push((convertDate(doc.data().time).getDate()) + '일');
                                config.data.datasets[0].data.push(doc.data().inside_temp);
                            }


                        });

                        var ctx = document.getElementById('canvas').getContext('2d');
                        window.myLine = new Chart(ctx, config);
                        if (window.myLine == null) {
                            console.log("create chart")
                            window.myLine = new Chart(ctx, config);
                        }

                        else {
                            console.log("update chart")
                            window.myLine.destroy();
                            window.myLine = new Chart(ctx, config);
                        }



                    })
                    .catch(function (error) {
                        console.log("Error getting documents: ", error);
                    });
                    return this.error='';
            }
        },
        getOneDayValue: function () {

            let theDate = new Date(this.setD + 'T00:00:00');
            theDate.setHours(theDate.getHours() + 9);   
            console.log(theDate);
            
            
            let theDateLimit = new Date(this.setD + 'T00:00:00');
            theDateLimit.setHours(theDateLimit.getHours() + 33);
            console.log(theDateLimit);
    
            
            db.collection("mc").
                where("time", ">=", new Date(theDate.toISOString().split('.', 1)[0])).
                where("time", "<", new Date(theDateLimit.toISOString().split('.', 1)[0])).
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
                                label: '온도',
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
                                text: 'Day Chart'
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
                 
                
                    document.getElementById('addStatus1').addEventListener('click', function () {
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
                        console.log(doc.data());
                        if (convertDate(doc.data().time).getHours() + '시' === config.data.labels[config.data.labels.length - 1]) {
                            config.data.datasets[0].data[config.data.datasets[0].data.length - 1] += doc.data().inside_temp;
                            count++;
                        }

                        else {
                            if (count > 1) { 
                                console.log(count);
                                config.data.datasets[0].data[config.data.datasets[0].data.length - 1] /= count; 
                            }
                            config.data.labels.push(convertDate(doc.data().time).getHours() + '시');
                            config.data.datasets[0].data.push(doc.data().inside_temp);
                            count = 1;
                        }
                        
                        console.log(JSON.stringify(config.data.labels));
                        console.log(JSON.stringify(config.data.datasets));
                      
                    });
                  

                    var ctx = document.getElementById('canvas2').getContext('2d');
                    if( window.myLine == null){
                        window.myLine = new Chart(ctx, config);
                    }
                   
                    else{
                        window.myLine.destroy();
                        window.myLine = new Chart(ctx, config);
                    }


                })
                .catch(function (error) {
                    console.log("Error getting documents: ", error);
                });
        
        }
    }
})





