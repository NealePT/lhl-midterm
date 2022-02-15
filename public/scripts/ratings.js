$(document).ready(function () {

  // Add stars into collections_show.ejs @ <div id="jQuery-stars"></div>.
  $(`
    <i id="jQuery-star-1" class="fa-solid fa-star"></i>
    <i id="jQuery-star-2" class="fa-solid fa-star"></i>
    <i id="jQuery-star-3" class="fa-solid fa-star"></i>
    <i id="jQuery-star-4" class="fa-solid fa-star"></i>
    <i id="jQuery-star-5" class="fa-solid fa-star"></i>
    `).appendTo('#jQuery-stars')

  // Hover: star 1
  $('#jQuery-star-1').hover(
    function () {
      $(this).css({ color: 'gold', cursor: 'pointer' });
    },
    function () {
      $(this).css({ color: 'inherit' });
    }
  );

  // Hover: star 2
  $('#jQuery-star-2').hover(
    function () {
      $(this).parent().children('#jQuery-star-1').css({ color: 'gold', cursor: 'pointer' });
      $(this).css({ color: 'gold', cursor: 'pointer' });
    },
    function () {
      $(this).parent().children('#jQuery-star-1').css('color', 'inherit');
      $(this).css('color', 'inherit');
    }
  );

  // Hover: star 3
  $('#jQuery-star-3').hover(
    function () {
      $(this).parent().children('#jQuery-star-1').css({ color: 'gold', cursor: 'pointer' });
      $(this).parent().children('#jQuery-star-2').css({ color: 'gold', cursor: 'pointer' });
      $(this).css({ color: 'gold', cursor: 'pointer' });
    },
    function () {
      $(this).parent().children('#jQuery-star-1').css('color', 'inherit');
      $(this).parent().children('#jQuery-star-2').css('color', 'inherit');
      $(this).css('color', 'inherit');
    }
  );

  // Hover: star 4
  $('#jQuery-star-4').hover(
    function () {
      $(this).parent().children('#jQuery-star-1').css({ color: 'gold', cursor: 'pointer' });
      $(this).parent().children('#jQuery-star-2').css({ color: 'gold', cursor: 'pointer' });
      $(this).parent().children('#jQuery-star-3').css({ color: 'gold', cursor: 'pointer' });
      $(this).css({ color: 'gold', cursor: 'pointer' });
    },
    function () {
      $(this).parent().children('#jQuery-star-1').css('color', 'inherit');
      $(this).parent().children('#jQuery-star-2').css('color', 'inherit');
      $(this).parent().children('#jQuery-star-3').css('color', 'inherit');
      $(this).css('color', 'inherit');
    }
  );

  // Hover: star 5
  $('#jQuery-star-5').hover(
    function () {
      $(this).parent().children('#jQuery-star-1').css({ color: 'gold', cursor: 'pointer' });
      $(this).parent().children('#jQuery-star-2').css({ color: 'gold', cursor: 'pointer' });
      $(this).parent().children('#jQuery-star-3').css({ color: 'gold', cursor: 'pointer' });
      $(this).parent().children('#jQuery-star-4').css({ color: 'gold', cursor: 'pointer' });
      $(this).css({ color: 'gold', cursor: 'pointer' });
    },
    function () {
      $(this).parent().children('#jQuery-star-1').css('color', 'inherit');
      $(this).parent().children('#jQuery-star-2').css('color', 'inherit');
      $(this).parent().children('#jQuery-star-3').css('color', 'inherit');
      $(this).parent().children('#jQuery-star-4').css('color', 'inherit');
      $(this).css('color', 'inherit');
    }
  );

});


