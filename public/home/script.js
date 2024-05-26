document.addEventListener('DOMContentLoaded', function () {
    var hamburger = document.getElementById('hamburger');
    var navLinks = document.getElementById('nav-links');
    var conversion = document.getElementById('conversion');
    var nav = document.getElementById('nav');

    // Initially show the navigation links and conversion items till window is resized.
    navLinks.style.display = 'flex';
    conversion.style.display = 'flex';




    function toggleMenu() {
        // Toggle display for navLinks and conversion
        const shouldDisplay = navLinks.style.display === 'none' || navLinks.style.display === '';
        navLinks.style.display = shouldDisplay ? 'flex' : 'none';
        conversion.style.display = shouldDisplay ? 'flex' : 'none';

        // Change flex direction to column when navLinks are displayed
        if (shouldDisplay) {
            nav.style.flexDirection = 'column';
            hamburger.classList.add('active'); // Add the active class to the hamburger button
        } else {
            nav.style.flexDirection = ''; // Revert to default style
            hamburger.classList.remove('active'); // Remove the active class from the hamburger button
        }

        // Toggle active class on hamburger button
        hamburger.classList.toggle('active');

        // Toggle text of hamburger button
        if (hamburger.textContent === '☰') {
            hamburger.textContent = '×'; // Change button text to ×
        } else if (hamburger.textContent === '×') {
            hamburger.textContent = '☰'; // Change button text to ☰
        }
        

    }

    // Event listener for hamburger menu click
    hamburger.addEventListener('click', toggleMenu);




    // Event listener for window resize
    window.addEventListener('resize', function () {
        // Reset display for navLinks and conversion when window size changes
        if (window.innerWidth > 770) {
            navLinks.style.display = 'flex';
            conversion.style.display = 'flex';
            nav.style.flexDirection = '';
        }
        else {
            if (window.innerWidth < 770 || window.innerWidth === 770) {
                navLinks.style.display = 'none';
                conversion.style.display = 'none';

            }
        }
    });

});

function filterSelection(filter) {
    // Hide all filter elements
    var allFilterElements = document.querySelectorAll('[class^="reflectionContent"]');
    allFilterElements.forEach(function (element) {
        element.style.display = 'none';
    });

    // Show selected filter elements
    var selectedFilterElements = document.querySelectorAll('.reflectionContent' + filter);
    selectedFilterElements.forEach(function (element) {
        element.style.display = 'block';

        // Reset button states
        var filterButtons = document.querySelectorAll('.filters button');
        filterButtons.forEach(function (button) {
            button.classList.remove('activeFilter');
            button.classList.add('inactiveFilter');
        });

        // Set active state for the clicked button
        var clickedButton = event.target;
        clickedButton.classList.remove('inactiveFilter');
        clickedButton.classList.add('activeFilter');
    });



}



function sayPause() {
    const scrollText = document.getElementById('scrolltext');
    scrollText.style.animationPlayState = 'paused';
}

function sayGo() {
    const scrollText = document.getElementById('scrolltext');
    scrollText.style.animationPlayState = 'running';
}

const questions = document.querySelectorAll('.question');
questions.forEach(question => {
    question.addEventListener('click', () => {
        const answer = question.nextElementSibling;
        answer.classList.toggle('show');
    });
});