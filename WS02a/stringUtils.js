function isotKirjaimet(str) {
    return str.toUpperCase();
  }
  
  function merkkijononKaantaminen(str) {
    return str.split('').reverse().join('');
  }
  
  // Viedään funktiot 
  module.exports = { isotKirjaimet, merkkijononKaantaminen };