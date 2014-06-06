app.views.PracticeView = Backbone.View.extend({
    initialize: function() {

    },
    render: function() {
        this.$el.html(this.template());
        return this;
    },
    events: {
        "click #play": "play",
        "click #stop": "stop",
        "click #pause": "pause",
        "click #view-seg": "viewseg",
        "click #add-seg": "addSeg",
        "click #view-chart": "viewchart"
    },
    play: function() {
        setTimeout(RUTES.loop, 1000);
        RUTES.carga();
        $("#stop").parent().parent().removeClass("hide");
        $("#play").parent().parent().addClass("hide");
    },
    stop: function() {
        RUTES.pausa();
        RUTES.reset();
        RUTES.hideButton();
    },
    pause: function() {
        RUTES.pausa();
        RUTES.hideButton();
    },
    viewseg: function() {
        $(".butons-midle").children(".check-midle").removeClass("check-midle");
        $("#view-seg").parent().addClass("check-midle");
        $("#chart").addClass("hide");
        $("#segmentos").removeClass("hide");
    },
    viewchart: function() {
        $(".butons-midle").children(".check-midle").removeClass("check-midle");
        $("#view-chart").parent().addClass("check-midle");
        $("#segmentos").addClass("hide");
        $("#chart").removeClass("hide");


        var count = 11;
        var data = {
            labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11"],
            datasets: [
                {
                    fillColor: "rgba(220,220,220,0.5)",
                    strokeColor: "rgba(220,220,220,1)",
                    pointColor: "rgba(220,220,220,1)",
                    pointStrokeColor: "#fff",
                    data: [65, 59, 90, 81, 56, 45, 30, 20, 3, 37, 0]
                },
                {
                    fillColor: "rgba(151,187,205,0.5)",
                    strokeColor: "rgba(151,187,205,1)",
                    pointColor: "rgba(151,187,205,1)",
                    pointStrokeColor: "#fff",
                    data: [28, 48, 40, 19, 96, 87, 66, 97, 92, 85, 0]
                }
            ]
        }
        // this is ugly, don't judge me
        var updateData = function(oldData) {
            var labels = oldData["labels"];
            var dataSetA = oldData["datasets"][0]["data"];
            var dataSetB = oldData["datasets"][1]["data"];

            labels.shift();
            count++;
            labels.push(count.toString());
            var newDataA = dataSetA[9] + (20 - Math.floor(Math.random() * (41)));
            var newDataB = dataSetB[9] + (20 - Math.floor(Math.random() * (41)));
            dataSetA.push(newDataA);
            dataSetB.push(newDataB);
            dataSetA.shift();
            dataSetB.shift();
        };

        var optionsAnimation = {
            //Boolean - If we want to override with a hard coded scale
            scaleOverride: true,
            //** Required if scaleOverride is true **
            //Number - The number of steps in a hard coded scale
            scaleSteps: 10,
            //Number - The value jump in the hard coded scale
            scaleStepWidth: 10,
            //Number - The scale starting value
            scaleStartValue: 0
        }

        // Not sure why the scaleOverride isn't working...
        var optionsNoAnimation = {
            animation: false,
            //Boolean - If we want to override with a hard coded scale
            scaleOverride: true,
            //** Required if scaleOverride is true **
            //Number - The number of steps in a hard coded scale
            scaleSteps: 20,
            //Number - The value jump in the hard coded scale
            scaleStepWidth: 10,
            //Number - The scale starting value
            scaleStartValue: 0
        }

        //Get the context of the canvas element we want to select
        var ctx = document.getElementById("importantchart").getContext("2d");
        var optionsNoAnimation = {animation: false}
        var myNewChart = new Chart(ctx);
        myNewChart.Line(data, optionsAnimation);

        setInterval(function() {
            updateData(data);
            myNewChart.Line(data, optionsNoAnimation);
        }, 2000);
    },
    addSeg: function() {
        RUTES.addSeg();
    }

});