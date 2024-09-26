function Title(t1) {
  this.mytitle = t1;
}

Title.prototype.getName = function () {
  return this.mytitle;
};

var socialMedia = {
  facebook: "http://facebook.com",
  twitter: "http://twitter.com",
  flickr: "http://flickr.com",
  youtube: "http://youtube.com",
};

var t = new Title("Rajvi Nilesh Chokshi - 002743896");

window.onload = function () {
  document.body.insertAdjacentHTML("afterbegin", `<h2>${t.getName()}</h2>`);

  const dropDownRows = document.querySelectorAll(".dropDownTextArea");
  dropDownRows.forEach((row) => {
    row.style.display = "none";
  });

  const submitButton = document.getElementById("button");
  submitButton.disabled = true;
  submitButton.style.backgroundColor = "gray";
  submitButton.style.border = "gray";

  const table = document.getElementById("myTable");
  const tableHeaderRow = table.rows[0];

  const deleteHeader = document.createElement("th");
  deleteHeader.innerText = "DELETE";
  tableHeaderRow.appendChild(deleteHeader);

  const editHeader = document.createElement("th");
  editHeader.innerText = "EDIT";
  tableHeaderRow.appendChild(editHeader);

  for (let i = 1; i < table.rows.length; i++) {
    initializeRow(table.rows[i]);
  }

  toggleEditDeleteColumns();
};

function updateSubmitButtonState() {
  const submitButton = document.getElementById("button");
  const anyChecked = Array.from(
    document.querySelectorAll('#myTable input[type="checkbox"]')
  ).some((cb) => cb.checked);

  if (anyChecked) {
    submitButton.disabled = false;
    submitButton.style.backgroundColor = "orange";
  } else {
    submitButton.disabled = true;
    submitButton.style.backgroundColor = "gray";
  }

  toggleEditDeleteColumns();
}

function showEditAlert(studentName, rowData) {
  const message = `
    Edit details of ${studentName}\n
    Advisor: ${rowData[1]}\n
    Award Status: ${rowData[2]}\n
    Semester: ${rowData[3]}\n
    Type: ${rowData[4]}\n
    Budegt: ${rowData[5]}\n
    Percentage: ${rowData[6]}
  `;

  const confirmed = confirm(message);

  if (confirmed) {
    alert(`${studentName} data updated successfully`);
  }
}

function handleCheckboxChange(checkbox) {
  const row = checkbox.closest("tr");
  const deleteButtonCell = row.cells[row.cells.length - 2];
  const editButtonCell = row.cells[row.cells.length - 1];

  const studentName = row.cells[1].innerText;
  const rowData = Array.from(row.cells)
    .slice(1)
    .map((cell) => cell.innerText);

  if (checkbox.checked) {
    row.style.backgroundColor = "yellow";
    updateSubmitButtonState();

    if (!deleteButtonCell.querySelector("button")) {
      const deleteButton = document.createElement("button");
      deleteButton.innerText = "Delete";
      deleteButton.onclick = function () {
        const studentName = row.cells[1].innerText;
        row.remove();
        alert(`Student ${studentName} Record deleted successfully`);
        updateSubmitButtonState();
      };
      deleteButtonCell.appendChild(deleteButton);
    }

    if (!editButtonCell.querySelector("button")) {
      const editButton = document.createElement("button");
      editButton.innerText = "Edit";
      editButton.onclick = function () {
        showEditAlert(studentName, rowData);
      };
      editButtonCell.appendChild(editButton);
    }
  } else {
    row.style.backgroundColor = "";
    updateSubmitButtonState();

    const existingDeleteButton = deleteButtonCell.querySelector("button");
    if (existingDeleteButton) {
      deleteButtonCell.removeChild(existingDeleteButton);
    }

    const existingEditButton = editButtonCell.querySelector("button");
    if (existingEditButton) {
      editButtonCell.removeChild(existingEditButton);
    }
  }
}

function toggleEditDeleteColumns() {
  const table = document.getElementById("myTable");
  const anyChecked = Array.from(
    document.querySelectorAll('#myTable input[type="checkbox"]')
  ).some((cb) => cb.checked);

  const deleteColumnIndex = table.rows[0].cells.length - 2;
  const editColumnIndex = table.rows[0].cells.length - 1;

  for (let i = 0; i < table.rows.length; i++) {
    if (table.rows[i].cells.length > deleteColumnIndex) {
      const cellToHideDelete = table.rows[i].cells[deleteColumnIndex];
      const cellToHideEdit = table.rows[i].cells[editColumnIndex];

      if (anyChecked) {
        cellToHideDelete.style.display = "";
        cellToHideEdit.style.display = "";
      } else {
        cellToHideDelete.style.display = "none";
        cellToHideEdit.style.display = "none";
      }
    }
  }
}

function toggleDropDown(row) {
  const dropDownRow = row.nextElementSibling;
  if (dropDownRow.style.display === "none") {
    dropDownRow.style.display = "table-row";
  } else {
    dropDownRow.style.display = "none";
  }
}

function initializeRow(row) {
  const checkbox = row.querySelector('input[type="checkbox"]');
  const img = row.querySelector("img");

  if (checkbox) {
    checkbox.onchange = function () {
      handleCheckboxChange(this);
    };

    if (checkbox.checked) {
      handleCheckboxChange(checkbox);
    }
  }

  if (img) {
    img.onclick = function () {
      toggleDropDown(row);
    };
  }
}

document.getElementById("add").addEventListener("click", function () {
  var table = document.getElementById("myTable");
  var rows = table.rows;

  var lastStudentNum = 0;
  for (var i = rows.length - 1; i >= 0; i--) {
    var studentCell = rows[i].cells[1];
    if (studentCell && studentCell.innerText.startsWith("Student")) {
      lastStudentNum = parseInt(studentCell.innerText.split(" ")[1]);
      break;
    }
  }

  var newStudentNum = lastStudentNum + 1;

  try {
    var newRow = table.insertRow(rows.length);
    newRow.innerHTML = `
            <td><input type="checkbox" /><br /><br /><img src="down.png" width="25px" /></td>
            <td>Student ${newStudentNum}</td>
            <td>Teacher ${newStudentNum}</td>
            <td>Approved</td>
            <td>Fall</td>
            <td>TA</td>
            <td>${newStudentNum}0000</td>
            <td>100%</td>
            <td></td> 
            <td></td> 
        `;

    var newDropDownRow = table.insertRow(rows.length);
    newDropDownRow.classList.add("dropDownTextArea");
    newDropDownRow.style.display = "none";
    newDropDownRow.innerHTML = `
            <td colspan="8">
                Advisor:<br /><br />
                Award Details<br />
                Summer 1-2014(TA)<br />
                Budget Number: <br />
                Tuition Number: <br />
                Comments:<br /><br /><br />
                Award Status:<br /><br /><br />
            </td>
        `;

    initializeRow(newRow);
    toggleEditDeleteColumns();

    setTimeout(function () {
      alert(`Student ${newStudentNum} Record added successfully`);
    }, 100);
  } catch (error) {
    alert(`Error adding record: ${error.message}`);
  }
});

document.getElementById("myTable").addEventListener("change", function (event) {
  if (event.target.matches('input[type="checkbox"]')) {
    handleCheckboxChange(event.target);
  }
});
