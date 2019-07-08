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
    "salu": "Salut",
    "slt": "Salut ",
    "bjr": "Bonjour",
    "a+": "bye",
    "cimer": "merci",
    "chatezo":"chatzo",
    "chattzo":"chatzo",
   // +
   "lul": "😂",
   "/funfact": "#funfact la terre est ronde🌍",
   "/funfuk": "#funfact l'eau ça mouille",
   "/art": "#  ∧＿∧",
  "/arst": "# (´･ω･)",
 "/rst": "  # (っ▄︻▇〓▄︻┻┳═一　　・・・・・",
"/st":  "  #  /　   )ﾊﾞﾊﾞﾊﾞﾊﾞ",
"/t":"  #    ( /￣∪",
"/help": "/funfact, /funfuk, /art, /arst, /rst, /st, /t",
 };

 function escapeSpecialChars(regex) {
   return regex.replace(/([()[{*+.$^\\|?])/g, '\\$1');
 }

 document.getElementById('inputMessage').oninput = function() {
   for (var i in map) {
     var regex = new RegExp(escapeSpecialChars(i), 'gim');
     this.value = this.value = this.value.replace(regex, map[i]);
   }
 };
