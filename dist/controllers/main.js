console.log('chrome', chrome);

// load event listeners
loadEventListeners();
function loadEventListeners() {
  document.addEventListener('DOMContentLoaded', function () {
    // calcTime();
    getCurrentTask();
  });
}

document.getElementById('time').addEventListener('change', function () {
  var dates = document.getElementById('time').value;
  console.log('dates',dates)
  setCurrentTask(dates)
  calcTime(dates);
});


function getCurrentTask() {
  chrome.storage.sync.get('task', function(result) {
    console.log('Value currently is ' , result.task);
    if(result.task)calcTime(result.task);
  });
}
function setCurrentTask(value) {
  chrome.storage.sync.set({'task': value}, function() {
    console.log('Value is set to ' + value);
  });
}


