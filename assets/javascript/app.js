$(document).ready(() => {
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyD5jkPdlrMWIPhHlLzwNzsUiHFcDtQy8Lo",
    authDomain: "fir-9eb96.firebaseapp.com",
    databaseURL: "https://fir-9eb96.firebaseio.com",
    projectId: "fir-9eb96",
    storageBucket: "fir-9eb96.appspot.com",
    messagingSenderId: "728220023816"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  // button on-click logic
  $("#addEmployee").on("click", function () {
    // pull the values from the input fields
    // and assign them to variables
    let name = $("#ee-name").val().trim();
    let role = $("#ee-role").val().trim();
    let startDate = moment($("#start-date").val().trim()).format("DD/MM/YY");
    let rate = $("#ee-rate").val().trim();

    let today = moment().format("X");
    let monthsWorked = moment().diff(moment($("#start-date").val().trim(), "DD/MM/YY"), "Months");
    let totalBilled = rate * monthsWorked;

    database.ref().push({
      name: name,
      role: role,
      startDate: startDate,
      rate: rate,
      monthsWorked: monthsWorked,
      totalBilled: totalBilled
    });

  });

  database.ref().on("value", function (snapshot) {
    console.log(snapshot);
  });
  database.ref().on("child_added", function (snapshot) {
    // Get the database
    var employee = snapshot.val();

    $("tbody").append(`<tr>
                           <td>${employee.name}</td>
                           <td>${employee.role}</td>
                           <td>${employee.startDate}</td>
                           <td>${employee.monthsWorked}</td>
                           <td>${employee.rate}</td>
                           <td>${employee.totalBilled}</td>
                       </tr>`);
  });
});