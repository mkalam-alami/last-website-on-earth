var clicking = []

$(document).ready(function () {

  $('a').click(function (e) {
    var $this = $(this)
    if (clicking.indexOf(this) === -1) {
      $('iframe').attr('src', 'loading.html')
      clicking.push(this)
      setTimeout(function () {
        $('iframe').attr('src', $this.attr('href'))
        clicking = []
      }, 800);

      e.preventDefault();
    } else {
      return true;
    }
  })

});