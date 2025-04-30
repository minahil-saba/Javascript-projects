document.addEventListener('DOMContentLoaded', () => {
    setupContactForm();
    setupOfferForm();
    setupSlider();
});

let currentSlide = 0;
const slides = document.querySelectorAll('.slide');

function setupSlider() {
    showSlide(currentSlide);
    setInterval(() => {
        changeSlide(1);
    }, 5000);
}

function changeSlide(direction) {
    currentSlide = (currentSlide + direction + slides.length) % slides.length;
    showSlide(currentSlide);
}

function showSlide(index) {
    const slider = document.querySelector('.slider');
    slider.style.transform = `translateX(-${index * 100}%)`;
}

function makeOffer() {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <h2>Make an Offer</h2>
            <form id="offerForm">
                <input type="text" placeholder="Your Name" required>
                <input type="email" placeholder="Your Email" required>
                <input type="number" placeholder="Your Offer Amount" required>
                <textarea placeholder="Additional Comments"></textarea>
                <button type="submit" class="solid-button">Submit Offer</button>
                <button type="button" class="outline-button" onclick="closeModal(this)">Close</button>
            </form>
        </div>
    `;
    document.body.appendChild(modal);
    
    const style = document.createElement('style');
    style.textContent = `
        .modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.7);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1001;
        }
        .modal-content {
            background: white;
            padding: 2rem;
            border-radius: 10px;
            width: 90%;
            max-width: 500px;
        }
        .modal-content h2 {
            margin-bottom: 1rem;
            color: #333;
        }
        .modal-content form {
            display: flex;
            flex-direction: column;
            gap: 1rem;
        }
        .modal-content input,
        .modal-content textarea {
            padding: 0.5rem;
            border: 1px solid #ddd;
            border-radius: 4px;
        }
        .modal-content textarea {
            min-height: 100px;
        }
    `;
    document.head.appendChild(style);
}

function contactNow() {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <h2>Contact Us</h2>
            <form id="contactForm">
                <input type="text" placeholder="Your Name" required>
                <input type="email" placeholder="Your Email" required>
                <input type="tel" placeholder="Your Phone Number">
                <textarea placeholder="Your Message" required></textarea>
                <button type="submit" class="solid-button">Send Message</button>
                <button type="button" class="outline-button" onclick="closeModal(this)">Close</button>
            </form>
        </div>
    `;
    document.body.appendChild(modal);
}

function closeModal(button) {
    const modal = button.closest('.modal');
    modal.remove();
}

function setupContactForm() {
    document.addEventListener('submit', (e) => {
        if (e.target.id === 'contactForm') {
            e.preventDefault();
            alert('Thank you for your message! We will contact you soon.');
            closeModal(e.target);
        }
    });
}

function setupOfferForm() {
    document.addEventListener('submit', (e) => {
        if (e.target.id === 'offerForm') {
            e.preventDefault();
            alert('Thank you for your offer! We will review it and get back to you soon.');
            closeModal(e.target);
        }
    });
}