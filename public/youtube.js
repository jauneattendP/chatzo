function getId(url) {
    var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    var match = url.match(regExp);

    if (match && match[2].length == 11) {
        return match[2];
    } else {
        return 'error';
    }
}

var inputMessage = getId('http://www.youtube.com/watch?v=zbYf5_S7oJo');

$('#inputMessage').html(inputMessage);

$('inputMessage').html('<iframe width="560" height="315" src="//www.youtube.com/embed/' + inputMessage + '" frameborder="0" allowfullscreen></iframe>');