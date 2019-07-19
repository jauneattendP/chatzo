
var map = {
    //   Basique emoji
   "<3": "\u2764\uFE0F",
   "</3": "\uD83D\uDC94",
   ":D": "\uD83D\uDE00",
   ":)": "\uD83D\uDE03",
   ";)": "\uD83D\uDE09",
   ":(": "\uD83D\uDE12",
   ":p": "\uD83D\uDE1B",
   ";p": "\uD83D\uDE1C",
   ":'(": "\uD83D\uDE22",
   
   // sexy emoji
   
   "sexe": "🍆",
   "bite": "🍌",
   "bitte": "🍌",
   "zizi": "🍌",
   "pénis": "🍌",
   "dick": "🍆",
   "fuck me": "👉👌",
   "baise-moi": "👉👌",
   "vagin": "🍑",
   "pussy": "🍑",
   // Orthographe
    "slt": "Salut",
    "bjr": "Bonjour",
    "a+": "bye",
    "cimer": "merci",
    "chatezo":"Chatzo",
    "chattzo":"Chatzo",
    "Chatzo":"Chatzo",
    "svp":"s'il vous plait",
    "tmtc":"toi-même tu sais",
    "avt":"avant",
    "cpdt":"cependant",
    "gvt":"Gouvernement",
    "gov":"Gouvernement",
    "pcq":"parce que",
    "pq":"pourquoi",
    "pk":"Pakistan",
    "csa":"Conseil supérieur de l'audiovisuel ",
    "lul": "😂",
   // commands
   "/help": "Liste des commandes disponible sur -> https://chatzo.glitch.me/commands",
   "/funfact": "#funfact la terre est ronde🌍",
   "/𝗶𝗻𝗳𝗼": "#name: chatzo💬 #version: 0.3",
   "/𝗮𝗿𝘁": "#  ∧＿∧",
  "/𝗮𝗿𝘀𝘁": "# (´･ω･)",
 "/𝗿𝘀𝘁": "  # (っ▄︻▇〓▄︻┻┳═一　　・・・・・",
"/𝘀𝘁":  "  #  /　   )ﾊﾞﾊﾞﾊﾞﾊﾞ",
"/𝘁":"  #    ( /￣∪",
 };

 function escapeSpecialChars(regex) {
   return regex.replace(/([()[{*+.$^\\|?])/g, '\\$1');
 }

 document.addEventListener('input', () => {
     document.getElementById('inputMessage').oninput = function() {
     for (let i in map) {
       const regex = new RegExp(escapeSpecialChars(i), 'gim');
       this.value = this.value.replace(regex, map[i]);

     }
   }  
 })
