/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


$(document).ready(function() {
  // --- our code goes here ---

  // const data = [
  //   {
  //     "user": {
  //       "name": "Newton",
  //       "avatars": "https://i.imgur.com/73hZDYK.png"
  //       ,
  //       "handle": "@SirIsaac"
  //     },
  //     "content": {
  //       "text": "If I have seen further it is by standing on the shoulders of giants"
  //     },
  //     "created_at": 1461116232227
  //   },
  //   {
  //     "user": {
  //       "name": "Descartes",
  //       "avatars": "https://i.imgur.com/nlhLi3I.png",
  //       "handle": "@rd" 
  //     },
  //     "content": {
  //       "text": "Je pense , donc je suis"
  //     },
  //     "created_at": 1461113959088
  //   }
  // ]


  const loadTweets = function () {
    const url = `http://localhost:8080/tweets`;

    $.ajax({
      url,
      method: 'GET'
    })
      .done(function (data) {
        console.log('loadTweets function', data);
        renderTweets(data);
      })
      .fail(function () {
        alert('error');
      })
      .always(function () {
        console.log('complete');
      })
  }

  loadTweets();

  const renderTweets = function (tweets) {
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

    if (hours) {
      return hours + ' hours';
    } else if (minutes) {
      return minutes + ' minutes';
    } else if (seconds) {
      return seconds + ' seconds';
    }
  }

  const createTweetElement = function (tweetObj) {
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

    return $article;
  }


  $('#form-new-tweet').on('submit', function(event) {
    
    //console.log($(this).children('div').find('output').text());
    if (!$('#tweet-text').val()) {
      event.preventDefault();
      alert('Empty tweet.')
    } else if ($(this).children('div').find('output').text() < 0) {
      event.preventDefault();
      alert('You reached the maximum numbers of characters.');    
    } else {
      const content = $(this).serialize();
      console.log('line 121', $(this).serialize());
    }
    
    


    // const form = $(this);
    // const url = $(this).attr('action');
    // $.ajax({
    //   type: 'POST',
    //   url: url,
    //   data: form.serialize(),
    //   success: function (data) {
    //     console.log('Submission was successful.');
    //     console.log(data);
    //   },
    //   error: function (data) {
    //       console.log('An error occurred.');
    //       console.log(data);
    //   }
    
    // })
  });

});