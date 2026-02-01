let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
let sortAscending = true;

const expenseList = document.getElementById("expenseList");
const amountInput = document.getElementById("amountInput");
const categoryInput = document.getElementById("categoryInput");
const descriptionInput = document.getElementById("descriptionInput");
const totalAmountEl = document.getElementById("totalAmount");
const topCategoryEl = document.getElementById("topCategory");

function addExpense() {
  const amount = parseFloat(amountInput.value);
  const category = categoryInput.value;
  const description = descriptionInput.value.trim();

  if (!amount || amount <= 0) return;

  expenses.push({ amount, category, description });
  saveExpenses();
  renderDashboard();

  amountInput.value = "";
  descriptionInput.value = "";
}

function renderDashboard() {
  expenseList.innerHTML = "";

  let total = 0;
  const categoryTotals = {};

  expenses.forEach((expense, index) => {
    total += expense.amount;
    categoryTotals[expense.category] =
      (categoryTotals[expense.category] || 0) + expense.amount;

    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${expense.description}</td>
      <td>${expense.category}</td>
      <td>€${expense.amount.toFixed(2)}</td>
      <td><button onclick="deleteExpense(${index})">X</button></td>
    `;
    expenseList.appendChild(tr);
  });

  totalAmountEl.textContent = `€${total.toFixed(2)}`;
  topCategoryEl.textContent = getTopCategory(categoryTotals);
}

function deleteExpense(index) {
  expenses.splice(index, 1);
  saveExpenses();
  renderDashboard();
}

function sortByAmount() {
  expenses.sort((a, b) =>
    sortAscending ? a.amount - b.amount : b.amount - a.amount
  );
  sortAscending = !sortAscending;
  renderDashboard();
}

function getTopCategory(totals) {
  let max = 0;
  let top = "-";
  for (const category in totals) {
    if (totals[category] > max) {
      max = totals[category];
      top = category;
    }
  }
  return top;
}

function saveExpenses() {
  localStorage.setItem("expenses", JSON.stringify(expenses));
}

renderDashboard();
