# Q2: Bank Account Simulation

## Implementation Details
I implemented a bank account simulation where users enter their roll number to generate a unique account number and initial deposit. The roll number determines the account number and the starting balance, which is the last digit of the roll number multiplied by 1000. Transactions, including deposits and withdrawals, are stored in a set to ensure uniqueness, and each transaction has a unique transaction ID.

## Features
- Generates an account number using the roll number.
- Sets an initial deposit based on the roll number.
- Allows deposits (must be a multiple of the roll number).
- Allows withdrawals (limited to 80% of the balance).
- Tracks transactions dynamically.
- Downloads transaction history as a text file.

## Technologies Used
- HTML, CSS, JavaScript
- DOM Manipulation
- Set, Map, Reduce Functions

## How to Use
1. Enter a roll number to generate an account.
2. Perform deposits and withdrawals.
3. Check transaction history.
4. Download the transaction log.