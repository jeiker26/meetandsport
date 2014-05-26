app.views.CalendarView = Backbone.View.extend({
    initialize: function() {
         var monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

        var dayNames = ["L", "M", "M", "J", "V", "S", "D"];

        var events = [
            {
                date: "28/12/2013",
                title: 'SPORT & WELLNESS',
                link: 'http://bic.cat',
                linkTarget: '_blank',
                color: '',
                content: '<img src="http://gettingcontacts.com/upload/jornadas/sport-wellness_portada.png" ><br>06-11-2013 - 09:00 <br> Tecnocampus Mataró Auditori',
                class: '',
                displayMonthController: true,
                displayYearController: true,
                nMonths: 6
            }
        ];
         $('#calendari_lateral1').html("");
        $('#calendari_lateral1').bic_calendar({
            //list of events in array
            events: events,
            //enable select
            enableSelect: true,
            //enable multi-select
            multiSelect: true,
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