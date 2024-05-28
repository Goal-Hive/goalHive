document.addEventListener('DOMContentLoaded', function () {
    var hamburger = document.getElementById('hamburger');
    var navLinks = document.getElementById('nav-links');
    var conversion = document.getElementById('conversion');
    var nav = document.getElementById('nav');

    // Initially set the navigation display based on window width
    function setInitialNavState() {
        if (window.innerWidth > 770) {
            navLinks.style.display = 'flex';
            conversion.style.display = 'flex';
            nav.style.flexDirection = 'row';
            hamburger.style.display = 'none';
        } else {
            navLinks.style.display = 'none';
            conversion.style.display = 'none';
            nav.style.flexDirection = 'row';
            hamburger.style.display = 'block';
            hamburger.textContent = '☰';
        }
    }

    setInitialNavState();

    function toggleMenu() {
        const shouldDisplay = navLinks.style.display === 'none' || navLinks.style.display === '';
        navLinks.style.display = shouldDisplay ? 'flex' : 'none';
        conversion.style.display = shouldDisplay ? 'flex' : 'none';

        if (shouldDisplay) {
            nav.style.flexDirection = 'column';
        } else {
            nav.style.flexDirection = '';
        }

        if (hamburger.textContent === '☰') {
            hamburger.textContent = '×';
        } else {
            hamburger.textContent = '☰';
        }
    }

    hamburger.addEventListener('click', toggleMenu);

    window.addEventListener('resize', function () {
        if (window.innerWidth > 770) {
            navLinks.style.display = 'flex';
            conversion.style.display = 'flex';
            nav.style.flexDirection = 'row';
            hamburger.style.display = 'none';
            hamburger.textContent = '☰';
        } else {
            navLinks.style.display = 'none';
            conversion.style.display = 'none';
            nav.style.flexDirection = 'column';
            hamburger.style.display = 'block';
            hamburger.textContent = '☰';
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