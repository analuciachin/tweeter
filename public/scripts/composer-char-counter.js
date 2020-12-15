$(document).ready(function() {
  // --- our code goes here ---
  console.log('Here');
  $('#tweet-text').on('input', function() {
    const maxLength = 140;
    const currentLength = $(this).val().length;
    console.log(currentLength);
    const textLength = maxLength - currentLength;
    
    if (textLength < 0) {
      $(this).siblings().find('.counter').html(textLength);
      $(this).siblings().find('.counter').css('color', '#cc0000');
    } else {
      $(this).siblings().find('.counter').html(textLength);
      $(this).siblings().find('.counter').css('color', '#545149');
    }
  })
});