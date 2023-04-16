/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


//Preventing XSS with Escaping
// This method is best suited if the tweet element was created as a string literal (not a jQuery object).
const escap = function (str) {
  let form = document.createElement("form");
  form.appendChild(document.createTextNode(str));
  return form.innerHTML;
};
//Preventing XSS with jQuery:
//$("<div>").text(textFromUser);


$(document).ready(function() {

  const createTweetElement = function(tweet){
    let $tweet = 
      `<article class = "tweet-box">
          <header>
            <div> <img src=${tweet.user.avatars}/> ${tweet.user.name}</div>
            <div>${tweet.user.handle}</div>
          </header>
          <body> 
            ${jQescap(tweet.content.text)} 
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
      for (let tweet in tweets){
        const $tweet = createTweetElement(tweets[tweet]);
        // console.log($tweet)
        $('#tweets-container').prepend($tweet);
      }
  }


  const loadtweets = function(){
    $.ajax('/tweets', { method: 'GET'})
    .done(function (tweetsJSON) {
      renderTweets(tweetsJSON)
    })
    .fail(()=>{alert('GET error')})
  }

  loadtweets();

  $( "form" ).on( "submit", function( event ) {
    loadtweets();
    $("#tweet-text").val('');
  })
});


// Test / driver code (temporary)
//const $tweet = createTweetElement(tweetData);
//console.log($tweet); // to see what it looks like
//$('#tweets-container').append($tweet); 
// to add it to the page so we can make sure it's got all the right elements, classes, etc.
