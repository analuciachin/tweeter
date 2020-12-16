/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


$(document).ready(function() {
  // --- our code goes here ---

const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd" 
      },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
]



  const renderTweets = function(tweets) {
    for(const tweet of tweets) {
      const newTweet = createTweetElement(tweet);
      $('#tweets-container').append(newTweet);
    }    
  }

  // https://stackoverflow.com/questions/847185/convert-a-unix-timestamp-to-time-in-javascript
  const convertTime = function (unix_timestamp) {
    // Create a new JavaScript Date object based on the timestamp
    // multiplied by 1000 so that the argument is in milliseconds, not seconds.
    const date = new Date(unix_timestamp * 1000);
    // Hours part from the timestamp
    const hours = date.getHours();
    // Minutes part from the timestamp
    const minutes = date.getMinutes();
    // Seconds part from the timestamp
    const seconds = date.getSeconds();

    console.log('hours', hours, 'minutes', minutes, 'seconds', seconds);
    if (hours) {
      return hours + ' hours';
    } else if (minutes) {
      return minutes + ' minutes';
    } else if (seconds) {
      return seconds + ' seconds';
    }
  }

  const createTweetElement = function(tweetObj) {
    const $article = $('<article>').addClass('tweet');
    const $header = $('<header>').appendTo($article);
    const $firstSpan = $('<span>').appendTo($header);
    $('<img>').attr('src', tweetObj.user.avatars)
              .attr('alt', tweetObj.user.name)
              .appendTo($firstSpan);
    const $label = $('<label>').text(tweetObj.user.name).appendTo($firstSpan);
    $('<span>').addClass('hide').text(tweetObj.user.handle).appendTo($header);

    $('<p>').text(tweetObj.content.text).appendTo($article);
    const $footer = $('<footer>').appendTo($article);
    const tweetTime = convertTime(tweetObj.created_at);
    $('<span>').text(tweetTime).appendTo($footer);
    const $ul = $('<ul>').appendTo($footer);
    $('<li>').addClass('fas fa-flag').appendTo($ul);
    $('<li>').addClass('fas fa-retweet').appendTo($ul);
    $('<li>').addClass('fas fa-heart').appendTo($ul);

    console.log($article);
    return $article;
  }



  // $('article.tweet').hover(function() {
  //   $(this).children().find('.hide').removeClass('hide');
  // }, function() {
  //   $(this).children('header').find('span:last-of-type').addClass('hide');
  // })

  // $('#tweets-container').hover(function() {
  //   $(this).children().find('.hide').removeClass('hide');
  // }, function() {
  //   $(this).children('article').children('header').find('span:last-of-type').addClass('hide');
  // })


  $('#form-new-tweet').on('submit', function(event) {
    event.preventDefault();
    renderTweets(data);
    console.log($('#tweets-container').find('.hide'))
  })

});