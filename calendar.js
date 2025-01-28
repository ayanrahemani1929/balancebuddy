document.addEventListener('DOMContentLoaded', function () {
  const calendarEl = document.getElementById('calendar');
  const eventsTable = document.getElementById('events-table-body'); // Reference to the table body

  // Load events from local storage or initialize as an empty array
  const savedEvents = JSON.parse(localStorage.getItem('events')) || [];

  // Initialize FullCalendar
  const calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: 'dayGridMonth',
    editable: true,
    droppable: true,
    selectable: true,
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay',
    },
    height: "1000px",
    events: savedEvents, // Load events from local storage
    eventDrop: function () {
      saveEventsToLocalStorage(calendar);
      updateEventsTable(calendar);
    },
    eventReceive: function () {
      saveEventsToLocalStorage(calendar);
      updateEventsTable(calendar);
    },
    eventClick: function (info) {
      // Show options to rename or delete
      const action = prompt(
        `What would you like to do with the event "${info.event.title}"?\n\nType:\n- "rename" to rename the event\n- "delete" to delete the event\n- "cancel" to do nothing`
      );

      if (action === 'rename') {
        const newTitle = prompt('Enter a new title for the event:', info.event.title);
        if (newTitle !== null && newTitle.trim() !== '') {
          info.event.setProp('title', newTitle.trim());
          saveEventsToLocalStorage(calendar);
          updateEventsTable(calendar);
          alert('Event renamed successfully!');
        }
      } else if (action === 'delete') {
        if (confirm(`Are you sure you want to delete the event "${info.event.title}"?`)) {
          info.event.remove();
          saveEventsToLocalStorage(calendar);
          updateEventsTable(calendar);
          alert('Event deleted successfully!');
        }
      } else {
        alert('No action taken.');
      }
    },
  });

  calendar.render();
  updateEventsTable(calendar); // Initial table population

  // Save events to local storage
  function saveEventsToLocalStorage(calendarInstance) {
    const events = calendarInstance.getEvents().map(event => ({
      id: event.id,
      title: event.title,
      start: event.start.toISOString(),
      end: event.end ? event.end.toISOString() : null,
      allDay: event.allDay,
    }));

    localStorage.setItem('events', JSON.stringify(events));
  }

  // Update the events table
  function updateEventsTable(calendarInstance) {
    // Clear existing table rows
    eventsTable.innerHTML = '';

    // Populate table with current events
    calendarInstance.getEvents().forEach(event => {
      const row = document.createElement('tr');
      const titleCell = document.createElement('td');
      const startCell = document.createElement('td');
      const endCell = document.createElement('td');

      titleCell.textContent = event.title;
      startCell.textContent = event.start.toLocaleString(); // Format start date
      endCell.textContent = event.end ? event.end.toLocaleString() : 'N/A';

      row.appendChild(titleCell);
      row.appendChild(startCell);
      row.appendChild(endCell);

      eventsTable.appendChild(row);
    });
  }

  // Make external events draggable
  new FullCalendar.Draggable(document.getElementById('external-events'), {
    itemSelector: '.fc-event',
    eventData: function (eventEl) {
      return JSON.parse(eventEl.getAttribute('data-event'));
    },
  });
});
