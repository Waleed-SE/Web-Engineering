let accountNumber = "";
let balance = 0;
let transactions = new Set();
let rollNumber = "";

const generateAccount = (rollNumber) => {
  accountNumber = `ACC-${rollNumber}`;
  const initialDeposit = parseInt(rollNumber[rollNumber.length - 1]) * 1000;
  balance = initialDeposit;
  displayAccountInfo(initialDeposit);
};

const displayAccountInfo = (initialDeposit) => {
  document.getElementById("account-number").textContent = accountNumber;
  document.getElementById("initial-deposit").textContent = initialDeposit;
  document.getElementById("balance").textContent = balance;
};

document.getElementById("transaction-form").addEventListener("submit", (event) => {
  event.preventDefault();

  document.getElementById("p-initial-deposit").style.display = "none";

  const transactionType = document.getElementById("transaction-type").value;
  const amount = parseInt(document.getElementById("amount").value);

  if (transactionType === "deposit") {
    handleDeposit(amount);
  } else if (transactionType === "withdrawal") {
    handleWithdrawal(amount);
  }
});

const handleDeposit = (amount) => {
  let temp = rollNumber.match(/(\d+)$/);

  if (amount % temp[0] !== 0) {
    alert(`Deposit amount must be a multiple of your roll number (${rollNumber}).`);
    return;
  }

  const transaction = {
    id: Date.now(),
    type: "Deposit",
    amount: amount,
  };

  balance += amount;
  transactions.add(transaction);
  updateTransactionHistory();
  updateBalance();
};

const handleWithdrawal = (amount) => {
  const maxWithdrawable = balance * 0.8;
  if (amount > maxWithdrawable) {
    alert(`Withdrawal amount cannot exceed 80% of your current balance (${maxWithdrawable} PKR).`);
    return;
  }

  if (amount <= balance) {
    balance -= amount;
    const transaction = {
      id: Date.now(),
      type: "Withdrawal",
      amount: amount,
    };

    transactions.add(transaction);
    updateTransactionHistory();
    updateBalance();
  } else {
    alert("Insufficient funds.");
  }
};

const updateTransactionHistory = () => {
  const transactionHistoryList = document.getElementById("transaction-history");
  transactionHistoryList.innerHTML = "";

  transactions.forEach((transaction) => {
    const li = document.createElement("li");
    li.textContent = `ID: ${transaction.id} | ${transaction.type}: ${transaction.amount} PKR`;
    transactionHistoryList.appendChild(li);
  });
};

const updateBalance = () => {
  document.getElementById("balance").textContent = balance;
};

document.getElementById("submit-account").addEventListener("click", () => {
  rollNumber = document.getElementById("account-input").value.trim();

  if (rollNumber.length === 0) {
    alert("Please enter a valid roll number.");
    return;
  }

  transactions.clear();
  updateTransactionHistory();
  document.getElementById("p-initial-deposit").style.display = "block";
  generateAccount(rollNumber);
});

document.getElementById("download-button").addEventListener("click", () => {
  if (transactions.size === 0) {
    alert("No transactions to download!");
    return;
  }

  let transactionData = "Transaction History:\n";
  transactions.forEach((transaction) => {
    transactionData += `TID: ${transaction.id} | ${transaction.type}: ${transaction.amount} PKR\n`;
  });

  const blob = new Blob([transactionData], { type: "text/plain" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = `${accountNumber}.txt`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
});
