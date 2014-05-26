
      var reloj = $("#reloj");
      
      //el callback, por defecto "undefined"
      var micallback = undefined;
      
      //recuadro donde muestro el histórico de parones
      var parones = $("#parones");
      
      //funcion que actualiza y muestra la cuenta actual
      function mostrar_cuenta() {
      reloj.html ( (+reloj.html() + 0.01).toFixed(2) );
      }
      
      //funcion que devuelve la hora actual (para el registro de parones)
      function hora_actual() {
    var d = new Date();
    var salida = d.getHours() + ":";
    salida += d.getMinutes() + ":";
    salida += d.getSeconds();      
    return salida;
      }


      //iniciamos (o reiniciamos) la cuenta actual
      function iniciar() {
    micallback=setInterval ( mostrar_cuenta , 10 );
      }
      
      //detenemos la cuenta actual y guardamos el parón
      function detener() {
    clearInterval(micallback);
    micallback=undefined;
    parones.html( parones.html() + "<div class='tipohora'>" + hora_actual() + "</div>");
      }
      
      //funcion para arrancar / parar el cronómetro
      function alternar() {
    if ( !micallback ) 
         iniciar();
    else detener();
      }
      
      //funcion para poner a cero el cronómetro
      function inicializar() {
    if ( !micallback ) {
         reloj.html( 0.00 );
         parones.html( "" );
    }
    else 
         alert ( "Antes tienes que detener el cronómetro" );
      }
      
      
      //inicializamos los eventos
      $("#cambiar").on('click', alternar);
      $("#inicializar").on('click', inicializar);     
      

    });