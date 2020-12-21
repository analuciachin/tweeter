/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


$(document).ready(function() {
  // --- our code goes here ---

  const loadTweets = function () {
    console.log('loadTweets func');
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

  //loadTweets();

  const renderTweets = function (tweets) {
    for(const tweet of tweets) {
      const newTweet = createTweetElement(tweet);
      $('#tweets-container').prepend(newTweet);
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
    
    if ($('#error-msg').children('span').text()) {
      event.preventDefault();
    } else if (!$('#tweet-text').val()) {
      event.preventDefault();
      const error = 'Empty tweet'
      $('<span>').addClass('fas fa-exclamation-triangle').text(error).appendTo($('#error-msg'));
      
    } else if ($(this).children('div').find('output').text() < 0) {
      event.preventDefault();
      const error1 = 'You reached the maximum numbers of characters';
      $('<span>').addClass('fas fa-exclamation-triangle').text(error1).appendTo($('#error-msg'));

    } else {

      event.preventDefault();

      $.ajax({
        type: 'POST',
        url: '/tweets',
        data: $(this).serialize(),
      })
      .done(function () {
        loadTweets();
        $('#tweet-text').val('');
        $('.counter').html(140);
      })
      .fail(function () {
        alert('error');
      })
      .always(function () {
        console.log('complete');
      })
    }
  });

  $("#tweet-text").on('input', function() {
    //console.log($('.fa-exclamation-triangle').text(''));
    console.log($('#error-msg').children('span').text())
    $('#error-msg').children('span').text('');
    $('#error-msg').children('span').removeClass('fas fa-exclamation-triangle');
  }); 


  // $('.nav-new-tweet').children('button').on('click', function () {
  //   $('.new-tweet').css('visibility', 'hidden');
  // }, function () {
  //   $('.new-tweet').css('visibility', 'visible');
  // });

  $('.nav-new-tweet').children('button').on('click', function () {
    //$('.new-tweet').toggle();
    $('.new-tweet').toggleClass('hidden');
    return false;
  });


});