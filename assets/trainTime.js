  // Initialize Firebase
  var config = {
      apiKey: "AIzaSyDYJgP6rgwZQxne0WbjksqgoQC9idZZssU",
      authDomain: "train-scheduler-30993.firebaseapp.com",
      databaseURL: "https://train-scheduler-30993.firebaseio.com",
      projectId: "train-scheduler-30993",
      storageBucket: "train-scheduler-30993.appspot.com",
      messagingSenderId: "528239343991"
  };
  firebase.initializeApp(config);

  var TrainData = firebase.database();

  // Initial Values
  var tName = "";
  var destination = "";
  var arrive = "";
  var tFrequency = "";

  // Capture Button Click -- Grabbed values from text boxes
  $("#addTrain-btn").on("click", function(event) {
      event.preventDefault();
      tName = $("#trainName-input").val().trim();
      destination = $("#destination-input").val().trim();
      arrive = $("#arrive-input").val().trim();
      tFrequency = $("#frequency-input").val().trim();


      TrainData.ref().push({ // pushes input values to firebase
          trainName: tName,
          destination: destination,
          arrive: arrive,
          trainFrequency: tFrequency,
      });

console.log("TrainData.ref: " + "trainName: " + tName + ' ' + "traintime: " + tFrequency);

// clears input after entry
      $("#trainName-input").val("");
      $("#destination-input").val("");
      $("#frequency-input").val("");
      $("#arrive-input").val("");
  });

  // Firebase data call / watcher + initial loader
  TrainData.ref().on("value", function(snapshot) {

      // storing the snapshot.val() in a variable for convenience
      var sv = snapshot.val();

      if (sv == undefined) {
          return;
      }

      // Getting an array of each key In the snapshot object
      var svArr = Object.keys(sv);

      // Finding the last user's key
      var lastIndex = svArr.length - 1;

      var lastKey = svArr[lastIndex];

      // Using the last user's key to access the last added user object
      var lastObj = sv[lastKey]

      // Console.loging the last train entered data
      // console.log(lastObj.trainName);
      // console.log(lastObj.destination);
      // console.log(lastObj.arrive);
      // console.log(lastObj.tFrequency);

          // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(arrive, "hh:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % tFrequency;
    console.log(tRemainder);

    // Minute Until Train
    var tMinutesTillTrain = tFrequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));


      // Change the HTML to reflect next train
      var tr = $("<tr>")
      $("tbody").prepend(tr);
      tr.html("<td>" + lastObj.trainName + "<td>" + lastObj.destination + "<td>" + lastObj.trainFrequency + "<td>" + lastObj.arrive + "<td>" + tMinutesTillTrain);
      
      // Handle the errors
  }, function(errorObject) {
      console.log("Errors handled: " + errorObject.code);
  });
