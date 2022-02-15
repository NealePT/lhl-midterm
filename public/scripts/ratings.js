$(document).ready(function () {

  // Hover: star 1
  $('#jQuery-star-1').hover(
    function () {
      $(this).css({ color: 'gold', cursor: 'pointer' });
    },
    function() {
      $(this).css('color', '#AFAFAF');
    });

  // Hover: star 2
  $('#jQuery-star-2').hover(
    function () {
      $(this).parent().parent().children('#star-button-1').children('#jQuery-star-1').css({ color: 'gold', cursor: 'pointer' });
      $(this).css({ color: 'gold', cursor: 'pointer' });
    },
    function() {
      $(this).parent().parent().children('#star-button-1').children('#jQuery-star-1').css('color', '#AFAFAF');
      $(this).css('color', '#AFAFAF');
    });

  // Hover: star 3
  $('#jQuery-star-3').hover(
    function () {
      $(this).parent().parent().children('#star-button-1').children('#jQuery-star-1').css({ color: 'gold', cursor: 'pointer' });
      $(this).parent().parent().children('#star-button-2').children('#jQuery-star-2').css({ color: 'gold', cursor: 'pointer' });
      $(this).css({ color: 'gold', cursor: 'pointer' });
    },
    function() {
      $(this).parent().parent().children('#star-button-1').children('#jQuery-star-1').css('color', '#AFAFAF');
      $(this).parent().parent().children('#star-button-2').children('#jQuery-star-2').css('color', '#AFAFAF');
      $(this).css('color', '#AFAFAF');
    });

  // Hover: star 4
  $('#jQuery-star-4').hover(
    function () {
      $(this).parent().parent().children('#star-button-1').children('#jQuery-star-1').css({ color: 'gold', cursor: 'pointer' });
      $(this).parent().parent().children('#star-button-2').children('#jQuery-star-2').css({ color: 'gold', cursor: 'pointer' });
      $(this).parent().parent().children('#star-button-3').children('#jQuery-star-3').css({ color: 'gold', cursor: 'pointer' });
      $(this).css({ color: 'gold', cursor: 'pointer' });
    },
    function() {
      $(this).parent().parent().children('#star-button-1').children('#jQuery-star-1').css('color', '#AFAFAF');
      $(this).parent().parent().children('#star-button-2').children('#jQuery-star-2').css('color', '#AFAFAF');
      $(this).parent().parent().children('#star-button-3').children('#jQuery-star-3').css('color', '#AFAFAF');
      $(this).css('color', '#AFAFAF');
    });

  // Hover: star 5
  $('#jQuery-star-5').hover(
    function () {
      $(this).parent().parent().children('#star-button-1').children('#jQuery-star-1').css({ color: 'gold', cursor: 'pointer' });
      $(this).parent().parent().children('#star-button-2').children('#jQuery-star-2').css({ color: 'gold', cursor: 'pointer' });
      $(this).parent().parent().children('#star-button-3').children('#jQuery-star-3').css({ color: 'gold', cursor: 'pointer' });
      $(this).parent().parent().children('#star-button-4').children('#jQuery-star-4').css({ color: 'gold', cursor: 'pointer' });
      $(this).css({ color: 'gold', cursor: 'pointer' });
    },
    function() {
      $(this).parent().parent().children('#star-button-1').children('#jQuery-star-1').css('color', '#AFAFAF');
      $(this).parent().parent().children('#star-button-2').children('#jQuery-star-2').css('color', '#AFAFAF');
      $(this).parent().parent().children('#star-button-3').children('#jQuery-star-3').css('color', '#AFAFAF');
      $(this).parent().parent().children('#star-button-4').children('#jQuery-star-4').css('color', '#AFAFAF');
      $(this).css('color', '#AFAFAF');
    });

});


