// Select the container element
const container = document.querySelector('.navbar');

// Add an event listener to listen for the scroll event
window.addEventListener('scroll', function() {
  // Check the scroll position
  if (window.scrollY > 100) {  // You can adjust this value
    container.style.backgroundColor = '#2b2b2b';  // Change the color when scrolling
  } else {
    container.style.backgroundColor = 'transparent';  // Revert to the original color
  }
});
