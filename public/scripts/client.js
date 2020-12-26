/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


$(document).ready(function() {
  // --- our code goes here ---

  const loadTweets = function () {
    //console.log('loadTweets func');
    const url = `http://localhost:8080/tweets`;

    $.ajax({
      url,
      method: 'GET'
    })
      .done(function (data) {
        //console.log('loadTweets function', data);
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
      $('#tweets-container').prepend(newTweet);
    }    
  }

  // https://stackoverflow.com/questions/3224834/get-difference-between-2-dates-in-javascript
  // https://stackoverflow.com/questions/21294302/converting-milliseconds-to-minutes-and-seconds-with-javascript
  const convertTime = function (unix_timestamp) {

    const date = new Date(unix_timestamp);
    const today = new Date();
    const diffTime = Math.abs(today - date); // in milliseconds
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // in days 
    const minutes = Math.floor(diffTime / 60000);
    
    if (diffDays === 1 && minutes >= 60) {
      const hours = Math.floor(minutes / 60);
      return hours + ' hours';
    } else if (diffDays === 1 && minutes < 1) {
      const seconds = Math.floor(diffTime / 1000);
      console.log('seconds ', seconds);
      return seconds + ' seconds';
    } else if (diffDays === 1 && minutes < 60) {
      return minutes + ' minutes';
    } else {
      return diffDays + ' days ago';
    }
  }


  // create the html tweet element
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
    $('<li>').addClass('fas fa-flag hide').appendTo($ul);
    $('<li>').addClass('fas fa-retweet hide').appendTo($ul);
    $('<li>').addClass('fas fa-heart hide').appendTo($ul);

    return $article;
  }


  $('#form-new-tweet').on('submit', function(event) {
    
    // don't send the form if there is a error
    if ($('#error-msg').children('span').text()) {
      event.preventDefault();
      $('#error-msg').empty();
    // show empty tweet error msg
    } else if (!$('#tweet-text').val()) {
      event.preventDefault();
      $('#error-msg').children('span').empty();
      const error = 'Empty tweet'
      $('<span>').addClass('fas fa-exclamation-triangle fade-in').text(error).appendTo($('#error-msg'));
    // show text is over 140 characters error msg  
    } else if ($(this).children('div').find('output').text() < 0) {
      event.preventDefault();
      $('#error-msg').children('span').empty();
      const error1 = 'You reached the maximum numbers of characters';
      $('<span>').addClass('fas fa-exclamation-triangle fade-in').text(error1).appendTo($('#error-msg'));

    } else {

      event.preventDefault();

      $.ajax({
        type: 'POST',
        url: '/tweets',
        data: $(this).serialize(),
      })
      .done(function () {
        $('#tweets-container').empty();
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

  // remove error msg once the user starts editing the textarea
  $("#tweet-text").on('input', function() {
    //console.log($('#error-msg').children('span').text())
    //$('#error-msg').children('span').text('');
    $('#error-msg').children('span').empty();
    $('#error-msg').children('span').removeClass('fas fa-exclamation-triangle');
  }); 

  //toggle the compose tweet section on a navbar button click
  $('.nav-new-tweet').children('button').on('click', function () {
    $('.new-tweet').toggleClass('hidden');
    return false;
  });


});