const tableCreate = (week, active, balance) => {
    const table = document.getElementById("table");
    const row = table.insertRow(0);
    const cell1 = row.insertCell(0);
    const cell2 = row.insertCell(1);
    const cell3 = row.insertCell(2);
    cell1.innerHTML = week;
    cell2.innerHTML = active;
    cell3.innerHTML = balance;
}