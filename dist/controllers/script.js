var timeTo = document.getElementById('time').value,
	date,
	now = new Date(),
	newYear = new Date('1.1.2020').getTime(),
  startTimer = '',
  showCurrentTime = true;
setInterval(updateClock, 1000);
function updateClock() {
	var currentTime = new Date();
	var currentHours = currentTime.getHours();
	var currentMinutes = currentTime.getMinutes();
	var monthNames = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December',
	];
	currentTime.setDate(currentTime.getDate());
	currentMinutes = (currentMinutes < 10 ? '0' : '') + currentMinutes;
	currentHours = currentHours > 12 ? currentHours - 12 : currentHours;
	currentHours = currentHours == 0 ? 12 : currentHours;
	var currentTimeString = currentHours + ':' + currentMinutes; 
  var date = currentTime.getDate() + ' ' + monthNames[currentTime.getMonth()];
  theCurrentTime = currentTimeString;
	if(showCurrentTime)document.querySelector('.time-cont').innerHTML = currentTimeString;
	document.querySelector('.time-cont2').innerHTML = currentTimeString;
	document.querySelector('.date').innerHTML = date;
	document.querySelector('.date2').innerHTML = date;
}
chrome.storage.onChanged.addListener(function (changes, namespace) {
	var storageChange = changes['task'];
	console.log(
		'Storage key "%s" in namespace "%s" changed. ' + 'Old value was "%s", new value is "%s".',
		'task',
		namespace,
		storageChange.oldValue,
		storageChange.newValue
	);
});

// calculate date, hour, minute and second
function calcTime(dates) {
	//ui variables
	clearInterval(startTimer);
	if (typeof dates == 'undefined') {
		date = new Date(newYear).getTime();
	} else {
    var timeParts = dates.split(':');
    date = new Date(now.getFullYear(), now.getMonth(), now.getDate(), parseInt(timeParts[0]), parseInt(timeParts[1]), 0).getTime();
   
    console.log('inputTime',   new Date().getTime(), date)
	}

 

	function updateTimer(date) {
		var now = new Date().getTime();
		var distance = date - now;
		// Time calculations for days, hours, minutes and seconds
		// var days = Math.floor(distance / (1000 * 60 * 60 * 24));
		var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
		var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
		var seconds = Math.floor((distance % (1000 * 60)) / 1000);

		// select element
		// document.querySelector('.clock-day').innerHTML = days;
		document.querySelector('.time-cont').innerHTML = hours+":"+minutes+":"+seconds; 
    showCurrentTime = false;
    
		if (now > date) {
      clearCurrentTask();
      sendNotification();
      showCurrentTime = true;
			clearInterval(startTimer);
      document.querySelector('.time-cont').innerHTML = theCurrentTime; 
		}
	}

	startTimer = setInterval(function () {
    console.log('date date date',date);
		updateTimer(date);
	}, 1000);
}

function sendNotification() {
  var opt = {
  type: "basic",
  title: "Great Work!",
  message: "Primary message to display",
  iconUrl: "../dlogo.png"
}
 
chrome.notifications.create('', opt, (id) => {
  console.log('notification sent',id)
});
}
function clearCurrentTask(value) {
	chrome.storage.sync.set({ 'task': null }, function () {
		console.log('Value is set to ' + value);
	});
}
