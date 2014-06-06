app.views.CalendarView = Backbone.View.extend({
    initialize: function() {
         var monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

        var dayNames = ["L", "M", "M", "J", "V", "S", "D"];

        var events = [
            {
                date: "22/5/2014",
                title: 'SPORT & WELLNESS',
                link: '#/calen/x',
                color: 'green',
                content: '<img src="http://gettingcontacts.com/upload/jornadas/sport-wellness_portada.png" ><br>06-11-2013 - 09:00 <br> Tecnocampus Mataró Auditori',
                class: 'asdffs',
                displayMonthController: true,
                displayYearController: true
            },
            {
                date: "28/5/2014",
                title: 'Hoy',
                link: '',
                color: 'blue',
                displayMonthController: true,
                displayYearController: true
            }
        ];
        $('#calendari_lateral1').html("");
        $('#calendari_lateral1').bic_calendar({
            //list of events in array
            events: events,
            //enable select
            enableSelect: false,
            //enable multi-select
            multiSelect: false,
            //set day names
            dayNames: dayNames,
            //set month names
            monthNames: monthNames,
            //show dayNames
            showDays: true,
            //show month controller
            displayMonthController: true,
            //show year controller
            displayYearController: true,
            //set ajax call
            reqAjax: {
                type: 'get',
                url: 'http://bic.cat/bic_calendar/index.php'
            }
        });
    },
    render: function() {
        this.$el.html(this.template());
        return this;
    }

});