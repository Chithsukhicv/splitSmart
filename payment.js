paypal.Buttons({
  style: {
    color: 'blue',
    shape: 'pill',
    label: 'pay',
    layout: 'vertical'
  },

  createOrder: function(data, actions) {
    return actions.order.create({
      purchase_units: [{
        description: "SplitSmart Expense Settlement",
        amount: {
          currency_code: "USD", 
          value: sessionStorage.getItem("splitAmount") || "5.00"
        }
      }]
    });
  },

  onApprove: function(data, actions) {
    return actions.order.capture().then(function(details) {
      alert("✅ Payment successful!\nThank you, " + details.payer.name.given_name);
      console.log("Transaction details:", details);
    });
  },

  onError: function(err) {
    console.error("Payment error:", err);
    alert("❌ Payment failed. Please try again.");
  }
}).render('#payment');
