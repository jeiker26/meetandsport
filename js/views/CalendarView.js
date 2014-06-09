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
    },
    mySessions: function(){
        $(".mail").html("");
        $.ajax({
            type: 'GET',
            url: 'http://meetserver-jeikersport.rhcloud.com/findRute/' + app.user._id,
            dataType: 'json',
        }).done(function(data) {
            if(data.length){
                for (var i = 0; i < data.length; i++) {
                    $(".mail").append("<li><i class='unread'></i><img class='avatar' src='assets/img/photo01.jpeg' alt='avatar'><p class='sender'>" + data[i].info + "</p><p class='message'><strong>Working</strong>" + data[i].user + "</p><div class='actions'><a><img src='http://png-1.findicons.com/files//icons/2232/wireframe_mono/16/undo.png' alt='reply'></a><a><img src='http://png-1.findicons.com/files//icons/2232/wireframe_mono/16/star_fav.png' alt='favourite'></a><a><img src='http://png-4.findicons.com/files//icons/2232/wireframe_mono/16/tag.png' alt='label'></a><a><img src='http://png-4.findicons.com/files//icons/2232/wireframe_mono/16/trash.png' alt='delete'></a></div></li>")
                }
            }else{
                $(".mail").append("<li><a href='#/practice'><i class='unread'></i><p class='sender'>No has añadido ninguna sesion</p></a></li>");
            }
        }).fail(function() {
            console.log("error save rute ");
        });
    }

});