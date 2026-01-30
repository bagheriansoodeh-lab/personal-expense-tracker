const expenseList = document.getElementById("expenseList");
const amountInput = document.getElementById("amountInput");
const categoryInput = document.getElementById("categoryInput");
const descriptionInput = document.getElementById("descriptionInput");
const totalAmountEl = document.getElementById("totalAmount");
const topCategoryEl = document.getElementById("topCategory");

let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

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

    const li = document.createElement("li");
    li.textContent = `${expense.category}: €${expense.amount} (${expense.description})`;

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "X";
    deleteBtn.onclick = () => {
      expenses.splice(index, 1);
      saveExpenses();
      renderDashboard();
    };

    li.appendChild(deleteBtn);
    expenseList.appendChild(li);
  });

  totalAmountEl.textContent = `€${total.toFixed(2)}`;
  topCategoryEl.textContent = getTopCategory(categoryTotals);
}

function getTopCategory(categoryTotals) {
  let max = 0;
  let top = "-";

  for (const category in categoryTotals) {
    if (categoryTotals[category] > max) {
      max = categoryTotals[category];
      top = category;
    }
  }
  return top;
}

function saveExpenses() {
  localStorage.setItem("expenses", JSON.stringify(expenses));
}

renderDashboard();
