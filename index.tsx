/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll<HTMLElement>('.section');
    const navLinks = document.querySelectorAll<HTMLAnchorElement>('.nav-link');
    const contactForm = document.getElementById('contact-form');

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            if (targetId) {
                const targetElement = document.querySelector<HTMLElement>(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });

    // Highlight active nav link on scroll
    const observerOptions: IntersectionObserverInit = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5 // 50% of the section must be visible
    };

    const observerCallback: IntersectionObserverCallback = (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.id;
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    sections.forEach(section => observer.observe(section));

    // Handle contact form submission
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // In a real application, you would handle form submission here
            // (e.g., send data to a server).
            alert('Thank you for your message! I will get back to you soon.');
            (contactForm as HTMLFormElement).reset();
        });
    }
});
