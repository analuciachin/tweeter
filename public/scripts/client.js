/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


$(document).ready(function() {
  // --- our code goes here ---
  console.log('Client.js')
  $('article.tweet').hover(function() {
    $(this).children().find('.hide').removeClass('hide');
  }, function() {
    $(this).children('header').find('span:last-of-type').addClass('hide');
  })
});