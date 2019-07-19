$(function() {
  
  const FADE_TIME = 150; 
  const TYPING_TIMER_LENGTH = 400; 
  const COLORS = [
    '#e21400', '#91580f', '#f8a700', '#f78b00',
    '#58dc00', '#287b00', '#a8f07a', '#4ae8c4',
    '#3b88eb', '#3824aa', '#a700ff', '#d300e7'
  ];
  const $window = $(window);
  const $usernameInput = $('.usernameInput'); 
  const $messages = $('.messages'); 
  const $inputMessage = $('.inputMessage'); 
  const $loginPage = $('.login.page'); 
  const $chatPage = $('.chat.page'); 
  let username;
  let connected = false;
  let typing = false;
  let lastTypingTime;
  let $currentInput = $usernameInput.focus();
  const socket = io();
  function setUsername () {
    username = cleanInput($usernameInput.val().trim());
    if (username) {
      $loginPage.fadeOut();
      $chatPage.show();
      $loginPage.off('click');
      $currentInput = $inputMessage.focus();
      socket.emit('add user', username);
    }
  }
  function sendMessage () {
    var message = $inputMessage.val();
    message = cleanInput(message);
    if (message && connected) {
      $inputMessage.val('');
      const data = {message, username}
      addChatMessage(data);
      socket.emit('new message', data);
    }
     
  }
  function log (message, options) {
    /*const $el = $('<li>').addClass('log').text(message);
    addMessageElement($el, options);*/
      addChatMessage({username: "🤖Chatzo-bot:", message}, {colorName: "#89D626", colorMsg: "#2689D6"})
  }
  function addChatMessage (data, options) {
    var $typingMessages = getTypingMessages(data);
    options = options || {};
    if ($typingMessages.length !== 0) {
      options.fade = false;
      $typingMessages.remove();
    }

    const $usernameDiv = getSpan("username", data.username, options.colorName || getUsernameColor(data.username))
    const $dot = getSpan("", ": ", "white")
    
    const $messageBodyDiv = getSpan('messageBody', data.message, options.colorMsg || "white")
      
    const typingClass = data.typing ? 'typing' : '';
    const $messageDiv = $('<li class="message"/>')
      .data('username', data.username)
      .addClass(typingClass)
      .append($usernameDiv, $dot, $messageBodyDiv);

    addMessageElement($messageDiv, options);
  }
  
  function getSpan(clazz, text, color){
    
    return $(`<span class="${clazz}"/>`)
      .text(text)
      .css('color', color);
    
  }
  
  function addChatTyping (data) {
    data.typing = true;
    data.message = '✍️';
    addChatMessage(data);
  }
  function removeChatTyping (data) {
    getTypingMessages(data).fadeOut(function () {
      $(this).remove();
    });
  }
  function addMessageElement (el, options) {
    var $el = $(el);
    if (!options) {
      options = {};
    }
    
    if (typeof options.fade === 'undefined') {
      options.fade = true;
    }
    if (typeof options.prepend === 'undefined') {
      options.prepend = false;
    }

    // Apply options
    if (options.fade) {
      $el.hide().fadeIn(FADE_TIME);
    }
    if (options.prepend) {
      $messages.prepend($el);
    } else {
      $messages.append($el);
    }
    $messages[0].scrollTop = $messages[0].scrollHeight;
  }

  function cleanInput (input) {
    return $('<div/>').text(input).text();
  }
  function updateTyping () {
    if (connected) {
      if (!typing) {
        typing = true;
        socket.emit('typing');
      }
      lastTypingTime = (new Date()).getTime();

      setTimeout(function () {
        var typingTimer = (new Date()).getTime();
        var timeDiff = typingTimer - lastTypingTime;
        if (timeDiff >= TYPING_TIMER_LENGTH && typing) {
          socket.emit('stop typing');
          typing = false;
        }
      }, TYPING_TIMER_LENGTH);
    }
  }
  function getTypingMessages (data) {
    return $('.typing.message').filter(function (i) {
      return $(this).data('username') === data.username;
    });
  }
  function getUsernameColor (username) {
    var hash = 7;
    for (var i = 0; i < username.length; i++) {
       hash = username.charCodeAt(i) + (hash << 5) - hash;
    }
    var index = Math.abs(hash % COLORS.length);
    return COLORS[index];
  }

  $window.keydown(function (event) {
    if (!(event.ctrlKey || event.metaKey || event.altKey)) {
      $currentInput.focus();
    }
    if (event.which === 13) {
      if (username) {
        sendMessage();
        socket.emit('stop typing');
        typing = false;
      } else {
        setUsername();
      }
    }
  });

  $inputMessage.on('input', function() {
    updateTyping();
  });
  $loginPage.click(function () {
    $currentInput.focus();
  });
  $inputMessage.click(function () {
    $inputMessage.focus();
  });
  socket.on('login', function (data) {
    connected = true;
    /*log(message, {
      prepend: true
    });*/
    //addParticipantsMessage(data);
  });
  socket.on('new message', (data) => {
    addChatMessage(data);
  });
  socket.on('typing', (data) => {
    addChatTyping(data);
  });
  socket.on('stop typing', (data) => {
    removeChatTyping(data);
  });
  
  socket.on('login', (data) => {
    //numUsers
    log(`${data.username} a rejoint ! Nous sommes désormais ${data.numUsers}`)
  })
  
  socket.on('disconnect', (data) => {
    log(`${data.username} a quitté ! Nous sommes désormais ${data.numUsers}`)
  })
});
