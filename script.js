//Global Variables
var row = null;

function Save() {
    var dataEntered = retrieveData();
    // console.log(dataEntered);
    var readData = readingDataFromLocalStorage(dataEntered);
    // console.log(readData);
    if(dataEntered == false){
        msg.innerHTML = `<h3 style = "color:red">Please Enter Data!</h3>`;
    }else{
        if (row == null) {
            insert(readData);
            msg.innerHTML = `<h3 style = "color:green">Student is Added!</h3>`;
        } else {
            update();
            msg.innerHTML = `<h3 style = "color:yellow">Data of Student is Upadted!</h3>`;
        }
    }
    //once form is Saved so reset all data 
    document.getElementById("form").reset();
}

//Retrieving Data from form (Create opration)
function retrieveData() {
    var name1 = document.getElementById("name").value;
    var class1 = document.getElementById("class").value;
    var marks = document.getElementById("marks").value;

    var arr = [name1, class1, marks];
    // handling when data is being blank
    if(arr.includes("")){
        return false;
    }else{
        return arr;
    }
}

// read data in Local Storage
function readingDataFromLocalStorage(dataEntered) {
    //Storing Data in local storage
    var n = localStorage.setItem("Name", dataEntered[0]);
    var c = localStorage.setItem("Class", dataEntered[1]);
    var m = localStorage.setItem("Marks", dataEntered[2]);


    // getting value from local to table

    var n1 = localStorage.getItem("Name", n);
    var c1 = localStorage.getItem("Class", c);
    var m1 = localStorage.getItem("Marks", m);

    var arr = [n1, c1, m1];
    return arr;
}

//insert
function insert(readData) {
    var row = table.insertRow();
    row.insertCell(0).innerHTML = readData[0];
    row.insertCell(1).innerHTML = readData[1];
    row.insertCell(2).innerHTML = readData[2];
    row.insertCell(3).innerHTML = `<button onclick = edit(this)>Edit</button>
                                   <button onclick = remove(this)>Delete</button>`;
}

//edit function 
function edit(td) {
    row = td.parentElement.parentElement;
    document.getElementById("name").value = row.cells[0].innerHTML;
    document.getElementById("class").value = row.cells[1].innerHTML;
    document.getElementById("marks").value = row.cells[2].innerHTML;
}

//update function
function update() {
    row.cells[0].innerHTML = document.getElementById("name").value;
    row.cells[1].innerHTML = document.getElementById("class").value;
    row.cells[2].innerHTML = document.getElementById("marks").value;
    row = null

}

//delete function
function remove(td) {
    var ans = confirm("Are you sure to delete Student Info?");
    if (ans == true) {
        row = td.parentElement.parentElement;
        document.getElementById("table").deleteRow(row.rowIndex);
    }
}