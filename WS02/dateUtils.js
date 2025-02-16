function nykyinenPaiva() {
    return new Date();
  }
  
  function muotoilePaivamaara(date) {
    return date.toLocaleDateString('fi-FI');  
  }
  
  // Viedään funktiot
  module.exports = { nykyinenPaiva, muotoilePaivamaara };