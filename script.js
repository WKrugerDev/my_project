// script.js
document.addEventListener('DOMContentLoaded', () => {



 // ========================
 // 1. Project filtering
 // ========================
const filterProjects = category => {
    const projects = document.querySelectorAll('.project');
    projects.forEach(project => {
        const projectCategory = project.getAttribute('data-category');
        project.style.display = (category === 'all' || category === projectCategory) ? 'block' : 'none';
    });
};

// If using buttons
document.querySelectorAll('.category-button').forEach(button => {
    button.addEventListener('click', () => {
        const category = button.getAttribute('data-category');
        filterProjects(category);
    });
});

// If using a select dropdown
document.getElementById('project-filter')?.addEventListener('change', e => {
    filterProjects(e.target.value);
});
 
    // ========================
// Navigation toggle (Hamburger)
// ========================
const btn = document.querySelector('[data-menu-toggle]');
const menu = document.querySelector('[data-menu]');

if (btn && menu) {
    // Initialize aria attributes if not set
    if (!btn.hasAttribute('aria-expanded')) btn.setAttribute('aria-expanded', 'false');
    if (!menu.hasAttribute('aria-hidden')) menu.setAttribute('aria-hidden', 'true');

    const toggleMenu = () => {
        const isOpen = btn.getAttribute('aria-expanded') === 'true';
        btn.setAttribute('aria-expanded', String(!isOpen));
        menu.setAttribute('aria-hidden', String(isOpen));
        btn.classList.toggle('is-open');
        menu.classList.toggle('is-open');
    };

    btn.addEventListener('click', toggleMenu);

    // Keyboard accessibility: Enter and Space
    btn.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggleMenu();
        }
    });

    // Optional: click outside to close
    document.addEventListener('click', (e) => {
        if (!menu.classList.contains('is-open')) return;
        if (!menu.contains(e.target) && !btn.contains(e.target)) {
            toggleMenu();
        }
    });

    // Optional: Escape key to close
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && menu.classList.contains('is-open')) {
            toggleMenu();
        }
    });
}


    // ========================
    // 4. Lightbox for project images
    // ========================
    const lightbox = document.createElement('div');
    lightbox.classList.add('lightbox');
    lightbox.innerHTML = `
        <span class="close">&times;</span>
        <img class="lightbox-img" src="" alt="">
    `;
    document.body.appendChild(lightbox);

    const projectImages = document.querySelectorAll('.project img');
    projectImages.forEach(image => {
        image.addEventListener('click', () => {
            const imgSrc = image.getAttribute('src');
            lightbox.querySelector('.lightbox-img').src = imgSrc;
            lightbox.classList.add('active');
        });
    });

    lightbox.querySelector('.close').addEventListener('click', () => {
        lightbox.classList.remove('active');
    });
    lightbox.addEventListener('click', e => {
        if (e.target === lightbox) lightbox.classList.remove('active');
    });

    lightbox.setAttribute('role', 'dialog');
    // ========================
    // 5. Contact form validation & alert (mock send)
    // ========================
    const contactForm = document.querySelector('#contact-form');
    if (contactForm) {
        const nameInput = contactForm.querySelector('[name="name"]');
        const emailInput = contactForm.querySelector('[name="email"]');
        const messageInput = contactForm.querySelector('[name="message"]');

        const errorMessage = document.createElement('div');
        errorMessage.classList.add('error-message');
        contactForm.appendChild(errorMessage);

        const validateForm = () => {
            let isValid = true;
            errorMessage.textContent = '';

            if (!nameInput.value.trim()) {
                isValid = false;
                errorMessage.textContent += 'Name is required. ';
            }

            if (!emailInput.value.trim() || !/\S+@\S+\.\S+/.test(emailInput.value)) {
                isValid = false;
                errorMessage.textContent += 'Valid email is required. ';
            }

            if (!messageInput.value.trim()) {
                isValid = false;
                errorMessage.textContent += 'Message is required. ';
            }

            return isValid;
        };

        contactForm.addEventListener('submit', event => {
            event.preventDefault(); // Prevent real submission
            if (validateForm()) {
                alert('Message sent! (Mock send)');
                contactForm.reset();
            }
        });

        [nameInput, emailInput, messageInput].forEach(input => {
            input.addEventListener('input', validateForm);
        });
    }

});


