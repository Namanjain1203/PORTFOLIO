// --- Mobile Navigation Toggle ---
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    const icon = hamburger.querySelector('i');
    if (navLinks.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// Close mobile menu when a link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.querySelector('i').classList.remove('fa-times');
        hamburger.querySelector('i').classList.add('fa-bars');
    });
});

// --- Scroll Reveal Animation ---
const faders = document.querySelectorAll('.fade-in');

const appearOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
};

const appearOnScroll = new IntersectionObserver(function(entries, observer) {
    entries.forEach(entry => {
        if (!entry.isIntersecting) {
            return;
        } else {
            entry.target.classList.add('appear');
            observer.unobserve(entry.target);
        }
    });
}, appearOptions);

faders.forEach(fader => {
    appearOnScroll.observe(fader);
});

// --- Web3Forms AJAX Submission ---
const form = document.forms["advanced-contact"];
const msg = document.getElementById("form-msg");
const submitBtn = document.getElementById("submitBtn");
const btnText = submitBtn.querySelector(".btn-text");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    
    const formData = new FormData(form);
    
    const originalText = btnText.innerText;
    btnText.innerText = "Sending...";
    submitBtn.style.opacity = "0.7";
    submitBtn.style.pointerEvents = "none";

    fetch("https://api.web3forms.com/submit", { 
        method: "POST", 
        body: formData 
    })
    .then(response => response.json())
    .then((data) => {
        if (data.success) {
            msg.innerHTML = "Message sent successfully! I'll be in touch.";
            msg.style.color = "#4ade80"; // green
        } else {
            msg.innerHTML = "Error: Access key missing or invalid.";
            msg.style.color = "#ef4444"; // red
        }
        setTimeout(() => {
            msg.innerHTML = "";
        }, 8000);
        form.reset();
        
        // Restore button state
        btnText.innerText = originalText;
        submitBtn.style.opacity = "1";
        submitBtn.style.pointerEvents = "auto";
    })
    .catch((error) => {
        console.error("Error!", error);
        msg.innerHTML = "Something went wrong. Please try again.";
        msg.style.color = "#ef4444";
        
        setTimeout(() => {
            msg.innerHTML = "";
        }, 5000);
        
        // Restore button state
        btnText.innerText = originalText;
        submitBtn.style.opacity = "1";
        submitBtn.style.pointerEvents = "auto";
    });
});
