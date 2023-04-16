$(document).ready(function() {

  $("#tweet-text").on('keyup', function(){
    let len = $(this).val().length;  // to access 'this' with jQuery we need to add $ before this
    $('.counter').text(140 - len);
  
    let $counter = $(this).parent().find(".counter")  // tweet-text > Parent( which is the Form) > find the counter

    if (len > 140){ 
      $counter.addClass("error-msg")        // add a css class - recommended
    } else { $counter.css("color","gray")}  // set a css attr
  })

});