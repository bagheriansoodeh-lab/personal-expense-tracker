const expenseList = document.getElementById("expenseList");
const amountInput = document.getElementById("amountInput");
const categoryInput = document.getElementById("categoryInput");
const descriptionInput = document.getElementById("descriptionInput");
const totalAmountEl = document.getElementById("totalAmount");

let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

function addExpense() {
  const amount = parseFloat(amountInput.value);
  const category = categoryInput.value;
  const description = descriptionInput.value.trim();

  if (!amount || amount <= 0) return;

  expenses.push({ amount, category, description });
  saveExpenses();
  renderExpenses();

  amountInput.value = "";
  descriptionInput.value = "";
}

function renderExpenses() {
  expenseList.innerHTML = "";
  let total = 0;

  expenses.forEach((expense, index) => {
    total += expense.amount;

    const li = document.createElement("li");
    li.textContent = `${expense.category}: ${expense.amount} (${expense.description})`;

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "X";
    deleteBtn.onclick = () => {
      expenses.splice(index, 1);
      saveExpenses();
      renderExpenses();
    };

    li.appendChild(deleteBtn);
    expenseList.appendChild(li);
  });

  totalAmountEl.textContent = total.toFixed(2);
}

function saveExpenses() {
  localStorage.setItem("expenses", JSON.stringify(expenses));
}

renderExpenses();
