function saveMood(mood) {
    const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format
    const moodData = JSON.parse(localStorage.getItem('moodData')) || {}; // Load existing mood data
    moodData[today] = mood; // Save today's mood
    localStorage.setItem('moodData', JSON.stringify(moodData)); // Save back to localStorage
    alert(`Mood "${mood}" recorded for today!`);
    updateMoodLog(); // Update the log display
  }

  // Function to update the mood log table
  function updateMoodLog() {
    const moodData = JSON.parse(localStorage.getItem('moodData')) || {};
    const moodLog = document.getElementById('mood-log');
    moodLog.innerHTML = ''; // Clear existing rows

    // Populate table with mood data
    Object.keys(moodData).forEach(date => {
      const row = document.createElement('tr');
      const dateCell = document.createElement('td');
      const moodCell = document.createElement('td');

      dateCell.textContent = date;
      moodCell.textContent = moodData[date];

      row.appendChild(dateCell);
      row.appendChild(moodCell);
      moodLog.appendChild(row);
    });
  }

  // Automatically update the log on page load
  document.addEventListener('DOMContentLoaded', () => {
    updateMoodLog();
});


window.addEventListener('mouseover', initLandbot, { once: true });
window.addEventListener('touchstart', initLandbot, { once: true });
var myLandbot;
function initLandbot() {
  if (!myLandbot) {
    var s = document.createElement('script');
    s.type = "module"
    s.async = true;
    s.addEventListener('load', function() {
      myLandbot = new Landbot.Popup({
        configUrl: 'https://storage.googleapis.com/landbot.online/v3/H-2760494-BXN2UMMU47JG3LM4/index.json',
      });
    });
    s.src = 'https://cdn.landbot.io/landbot-3/landbot-3.0.0.mjs';
    var x = document.getElementsByTagName('script')[0];
    x.parentNode.insertBefore(s, x);
  }
}