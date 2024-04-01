const tbody = document.querySelector("tbody");
const table = document.querySelector(".mytable");

const submit = document.querySelector("button");

//classes
class Expense {
  constructor(desc, date, amount) {
    this.desc = desc;
    this.date = date;
    this.amount = amount;
  }
}

class UI {
  addExpenseToList(expense) {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${expense.desc}</td>
      <td>${expense.date}</td>
      <td>£${expense.amount}</td>
      <td><a href="#" class="delete" style="text-decoration: none;">&times<a></td>`;

    tbody.appendChild(row);
  }

  showAlert(message, className) {
    const div = document.createElement("div");

    div.className = `alert ${className}`;

    div.appendChild(document.createTextNode(message));

    const body = document.querySelector("body");
    const form = document.querySelector("#ex-form");

    body.insertBefore(div, form);

    setTimeout(function () {
      document.querySelector(".alert").remove();
    }, 3000);
  }

  deleteExpense(target) {
    if (target.className === "delete") {
      target.parentElement.parentElement.remove();
    }
  }

  clearFields() {
    document.getElementById("name").value = "";
    document.getElementById("date").value = "";
    document.getElementById("amount").value = "";
  }
}

// Local Storage Class

class Store {
  static getExpenses() {
    let expenses;
    if (localStorage.getItem("expenses") === null) {
      expenses = [];
    } else {
      expenses = JSON.parse(localStorage.getItem("expenses"));
    }
    return expenses;
  }
  static displayExpenses() {
    const expenses = Store.getExpenses();

    expenses.forEach(function (expense) {
      const ui = new UI();

      // Add expense to ui
      ui.addExpenseToList(expense);
    });
  }
  static addExpense(expense) {
    const expenses = Store.getExpenses();

    expenses.push(expense);

    localStorage.setItem("expenses", JSON.stringify(expenses));
  }
  static removeExpense(desc) {
    const expenses = Store.getExpenses();

    expenses.forEach(function (expense, index) {
      if (expense.desc === desc) {
        expenses.splice(index, 1);
      }
    });

    localStorage.setItem("expenses", JSON.stringify(expenses));
  }
}

// Dom load event
document.addEventListener("DOMContentLoaded", Store.displayExpenses);

// Event listeners
submit.addEventListener("click", function (e) {
  const desc = document.querySelector("#name").value;
  const date = document.querySelector("#date").value;
  const amount = document.querySelector("#amount").value;

  const expense = new Expense(desc, date, amount);

  const ui = new UI();

  // validate
  if (desc === "" || date === "" || amount === "") {
    //error alert
    ui.showAlert("Please fill in all fields", "error");
  } else {
    ui.showAlert("Expense Added!", "success");

    ui.addExpenseToList(expense);

    Store.addExpense(expense);

    ui.clearFields();
  }
  e.preventDefault();
});

tbody.addEventListener("click", function (e) {
  const ui = new UI();

  ui.deleteExpense(e.target);

  // remove from ls
  Store.removeExpense(
    e.target.parentElement.previousElementSibling.previousElementSibling
      .previousElementSibling.textContent
  );

  // Show message
  ui.showAlert("Expense Removed", "success");

  e.preventDefault();
});

// submit.addEventListener('click', (e) => {
//   if(name.value === '' || date === '' || amount.value === '') {
//    return alert('fill in please');
//   } else {
//       let row = document.createElement('tr');
//       let cell = document.createElement('td');
//       let cellText = document.createTextNode(name.value);
//       let cell1 = document.createElement('td');
//       let cellText1 = document.createTextNode(date.value);
//       let cell2 = document.createElement('td');
//       let cellText2 = document.createTextNode(amount.value);
//       let cell3 = document.createElement('td');
//       let del = document.createElement('button');
//       del.id = 'rem';
//       let text = document.createTextNode('X');
//       del.appendChild(text);

//       cell.appendChild(cellText);
//       cell1.appendChild(cellText1);
//       cell2.appendChild(cellText2);
//       cell3.appendChild(del)

//       row.appendChild(cell)
//       row.appendChild(cell1)
//       row.appendChild(cell2)
//       row.appendChild(cell3)

//       tbody.appendChild(row);

//     table.appendChild(tbody)

//     clearFields()

//   }
//   e.preventDefault()
// }
// )

// // clear fields
// function clearFields(){
//   document.getElementById('name').value = '';
//   document.getElementById('date').value = '';
//   document.getElementById('amount').value = '';
// }

// document.querySelector('tbody').addEventListener('click', (e) => {
//   if(e.target.id === 'rem'){
//     e.target.parentElement.parentElement.remove()
//   }
// });
