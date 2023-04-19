console.log("submitHandler is linked!")
$(document).ready(function() {
  $( "form" ).on( "submit", function( event ) {
    event.preventDefault();
    if(!$(this).find('#tweet-text').val()){
      // return alert("Empty! say something!")
      $(this).find('#error-message').text("Empty! say something!")
      return;
    }
    else if ($(this).find('#tweet-text').val().length>140) { 
      // return alert("less than 140 characters please!")
      $(this).find('#error-message').text("less than 140 characters please!")
      return;
    }
    console.log( $( this ).serialize() );
    $.post("/tweets", $( this ).serialize())
      .done(function() {
        alert( "successfull" );
      })
      .fail(function() {
        alert( "error" );
    });
  })
});