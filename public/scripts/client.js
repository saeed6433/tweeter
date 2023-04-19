/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


//Preventing XSS with Escaping:
// This method is best suited if the tweet element was created as
// a string literal (not a jQuery object).
//We can also use Preventing XSS with jQuery 
// it would be like: $("<div>").text(textFromUser)

const escap = function (str) {
  let form = document.createElement("form");
  form.appendChild(document.createTextNode(str));
  return form.innerHTML;
};


$(document).ready(function() {
  const createTweetElement = function(tweet){
    let $tweet = 
      `<article class = "tweet-box">
          <header>
            <div> <img src=${tweet.user.avatars}/> ${tweet.user.name}</div>
            <div>${tweet.user.handle}</div>
          </header>
          <body> 
            ${escap(tweet.content.text)} 
          </body>
          <footer>
            <div>${timeago.format(tweet.created_at)}</div>
            <div>
              <i class="fa-solid fa-flag"></i>
              <i class="fa-solid fa-retweet"></i>
              <i class="fa-solid fa-heart"></i>
            </div>
          </footer>
        </article>`;
    return $tweet;
  }

  const renderTweets = function(tweets) {
      $('#tweets-container').empty();  // is there a better idea to avoid repeating tweets?
      for (let tweet in tweets){
        const $tweet = createTweetElement(tweets[tweet]);
        $('#tweets-container').prepend($tweet);  // to add tweet to the top of others
      }
  }

  const loadTweets = function(){
    $.ajax('/tweets', { method: 'GET'})
    .done(function (tweetsJSON) {
      renderTweets(tweetsJSON)
    })
    .fail(()=>{alert('GET error')})
  }
  loadTweets();

  
  $( "form" ).on( "submit", function() {

    if($(this).find('#tweet-text').val().length <= 140 && $(this).find('#tweet-text').val().length > 0){
      loadTweets();
      $("#tweet-text").val(''); // to clear the tweet box
      $("#error-message").text(''); // to clear the error message
      $('.counter').text(140); // to return counter to 140 after submitting
    }
    
  })
});