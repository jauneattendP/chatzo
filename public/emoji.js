class EmojiPicker {
  constructor(data) {
    this.data = data;
  }
  
  parseUnicode(unicode) {
    // https://unicode.org/emoji/charts/full-emoji-list.html
    // https://stackoverflow.com/questions/39490865/how-can-i-get-the-full-list-of-slack-emoji-through-api
    return unicode
			.replace(/u[+]/gi, '&#x')
			.replace(/ /gi, ';')
			+ ';';
  }
  
  renderEmojiGroup(name) {
    // group emojis of same category
    let emojis = document.createElement('div');
    emojis.className = 'emoji-group';
    
    // category of emojis (smiles, people, food, etc.)
    let emojiCategory = document.createElement('div');
    emojiCategory.className = 'emoji-category';
    
    // emoji name :smile:
    emojiCategory.textContent = name;
    
    // add emojis to respective category
    emojis.append(emojiCategory);
    
    return emojis;
  }
  
  renderEmoji(emoji) {
    let e = document.createElement('div');
    e.className = 'emoji';
    
    // parse emoji unicode
    let eCode = this.parseUnicode(emoji.code);
    
    // set innerHTML as the parsed unicode
    // <div>#&x...</div>
    e.innerHTML = eCode;
    
    // set title as number and unicode code
    // 1:U+1F600
    e.setAttribute('title', `${emoji.no}:${emoji.code}`);
    
    // 
    if (emoji.hasOwnProperty('types')) {
      let eTypes = document.createElement('div');
      eTypes.className = 'emoji-types';
      
      eTypes.append(e.cloneNode(true));
      
      for (let type in e.types) {
        let eType = document.createElement('div');
        let eCode = this.parseUnicode(e.types[type]);
        
        eType.innerHTML = eCode;
        eTypes.append(eType);
      }
    }
    
    return e;
  }
  
  render() {
    let emojiPicker = document.createElement('div');
    emojiPicker.className = 'emoji-picker';
    
    for (let emojiGroup in this.data) {
      let eGroup = this.renderEmojiGroup(emojiGroup);
      
      for (let emoji in this.data[emojiGroup]) {
        if (this.data[emojiGroup][emoji].flagged || this.data[emojiGroup][emoji].no === 18) continue;
        
        let e = this.renderEmoji(this.data[emojiGroup][emoji]);
        eGroup.append(e)
      }
      emojiPicker.append(eGroup);
    }
    return emojiPicker;
  }
}

$(() => {
		$.getJSON('https://api.myjson.com/bins/4sz7d', function(emojiData) {
		let EP = new EmojiPicker(emojiData);
		$('body').append(EP.render());
	});
	
	var $input = $('input');
	
	
	$('body').on('click', '.emoji-picker>.emoji-group>.emoji:not(.emoji-with-types), .emoji-picker>.emoji-group>.emoji.emoji-with-types>.emoji-types>.emoji', function() {
		$input.val($input.val() + $(this).text());
		$input.focus();
	}).on('click', '.emoji-picker>.emoji-group>.emoji.emoji-with-types', function() {
		$('.emoji-types.visible').not( $(this).find('.emoji-types') ).toggleClass('visible');
		$(this).find('.emoji-types').toggleClass('visible');
	});
	
});