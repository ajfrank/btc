function retrievePrice(){
    return fetch("http://api.coindesk.com/v1/bpi/currentprice.json")
    .then(function(resp){
      return resp.json();
    })
    .then(function(blob){
      return parseFloat(blob.bpi.USD.rate.replace(",",""));
    });
}

var $displayPrice = $("#display_price");

$(function() {
  $("#calculate").on("click", function(){
    var numCoins = $("#BTCInput").val();
    $displayPrice.text('Loading...')
    retrievePrice()
      .then(function(price){
        var amount = (numCoins * price)
          .toLocaleString(undefined, { style: 'currency', currency: 'USD' });
        $displayPrice.text(amount);
      });
  });
});