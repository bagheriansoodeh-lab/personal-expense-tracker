// ==========================
// DATA
// ==========================
let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
let sortAscending = true;

// ==========================
// DOM
// ==========================
const expenseList = document.getElementById("expenseList");
const amountInput = document.getElementById("amountInput");
const categoryInput = document.getElementById("categoryInput");
const descriptionInput = document.getElementById("descriptionInput");
const totalAmountEl = document.getElementById("totalAmount");
const topCategoryEl = document.getElementById("topCategory");
const chartContainer = document.querySelector(".chart");

// ==========================
// ADD EXPENSE
// ==========================
function addExpense() {
  const amount = Number(amountInput.value);
  const category = categoryInput.value;
  const description = descriptionInput.value;

  if (!amount) return;

  expenses.push({ amount, category, description });
  saveExpenses();
  renderDashboard();

  amountInput.value = "";
  descriptionInput.value = "";
}

// ==========================
// RENDER DASHBOARD
// ==========================
function renderDashboard() {
  expenseList.innerHTML = "";
  chartContainer.innerHTML = "";

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

  renderChart(categoryTotals);
}

// ==========================
// CHART (BUILT FROM SCRATCH)
// ==========================
function renderChart(totals) {
  const categories = ["Food", "Rent", "Transport", "Other"];
  const max = Math.max(...Object.values(totals), 1);

  categories.forEach(cat => {
    const value = totals[cat] || 0;

    const bar = document.createElement("div");
    bar.className = "bar";
    bar.style.height = (value / max) * 160 + "px";
    bar.innerHTML = `<span>${value} €</span><label>${cat}</label>`;

    chartContainer.appendChild(bar);
  });
}

// ==========================
// HELPERS
// ==========================
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
  for (let k in totals) {
    if (totals[k] > max) {
      max = totals[k];
      top = k;
    }
  }
  return top;
}

function saveExpenses() {
  localStorage.setItem("expenses", JSON.stringify(expenses));
}

// ==========================
// INIT
// ==========================
renderDashboard();
