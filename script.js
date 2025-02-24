document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburger');
    const nav = document.getElementById('nav');

    if (hamburger && nav) {
        hamburger.addEventListener('click', function() {
            nav.classList.toggle('active');
        });
    }

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    function filterProjects(category) {
        const projects = document.querySelectorAll('.project');
        projects.forEach(project => {
            if (category === 'all' || project.classList.contains(category)) {
                project.style.display = 'block';
            } else {
                project.style.display = 'none';
            }
        });
    }

    document.querySelectorAll('.filter-button').forEach(button => {
        button.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            filterProjects(category);
        });
    });

    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const nameField = document.getElementById('name');
            const emailField = document.getElementById('email');
            const messageField = document.getElementById('message');

            const isNameValid = validateField(nameField, 'Name is required');
            const isEmailValid = validateField(emailField, 'Email is required');
            const isMessageValid = validateField(messageField, 'Message is required');

            if (isNameValid && isEmailValid && isMessageValid) {
                // Display the success message
                const formMessage = document.getElementById('formMessage');
                formMessage.style.display = 'block';

                // Optionally, clear the form fields
                contactForm.reset();
            }
        });

        contactForm.addEventListener('input', function(e) {
            const field = e.target;
            if (field.id === 'name' || field.id === 'email' || field.id === 'message') {
                validateField(field, `${field.id.charAt(0).toUpperCase() + field.id.slice(1)} is required.`);
            }
        });
    }

    function validateField(field, errorMessage) {
        const value = field.value.trim();
        const errorElement = document.getElementById(field.id + 'Error');
        if (value === '') {
            errorElement.textContent = errorMessage;
            return false;
        } else {
            errorElement.textContent = '';
            return true;
        }
    }
});