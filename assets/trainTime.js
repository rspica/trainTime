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
  var frequency = "";

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

      // Console.loging the last user's data
      // console.log(lastObj.trainName);
      // console.log(lastObj.destination);
      // console.log(lastObj.arrive);
      // console.log(lastObj.tFrequency);

      // pushed back 1 year to make sure it comes before current time
      var convertedDate = moment(childSnapshot.val().firstTrain, 'hh:mm').subtract(1, 'years');
      var trainTime = moment(convertedDate).format('HH:mm');
      var currentTime = moment();
      // pushed back 1 year to make sure it comes before current time
      var firstTimeConverted = moment(trainTime, 'hh:mm').subtract(1, 'years');
      var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
      var tRemainder = diffTime % tfrequency;
      //solved
      var tMinutesTillTrain = tfrequency - tRemainder;
      //solved
      var nextTrain = moment().add(tMinutesTillTrain, 'minutes').format('HH:mm')

      // Change the HTML to reflect next train
      var tr = $("<tr>")
      $("tbody").prepend(tr);
      tr.html("<td>" + lastObj.trainName + "<td>" + lastObj.destination + "<td>" + lastObj.tFrequency + "<td>" + lastObj.arrive + "<td>" + lastObj.tMinutesTillTrain);
      
      // Handle the errors
  }, function(errorObject) {
      console.log("Errors handled: " + errorObject.code);
  });
