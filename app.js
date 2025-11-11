const expenses = [];
const summaryList = document.getElementById('summary-list');

document.getElementById('expense-form').addEventListener('submit', e => {
  e.preventDefault();
  const desc = document.getElementById('desc').value;
  const amount = parseFloat(document.getElementById('amount').value);
  const payer = document.getElementById('payer').value.trim();
  const participants = document.getElementById('participants').value.split(',').map(p => p.trim());

  const share = amount / participants.length;
  participants.forEach(p => {
    if (p !== payer) {
      expenses.push({ from: p, to: payer, amount: share, desc });
    }
  });

  renderSummary();
  e.target.reset();
  sessionStorage.setItem("splitAmount", share.toFixed(2));
});

function renderSummary() {
  summaryList.innerHTML = '';
  expenses.forEach(exp => {
    const li = document.createElement('li');
    li.textContent = `${exp.from} owes ${exp.to} ₹${exp.amount.toFixed(2)} for ${exp.desc}`;
    summaryList.appendChild(li);
  });
}
