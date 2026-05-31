/* 
   Ethereal Union - Wedding Invitation JavaScript
   Vanilla JS, Modular & Clean
*/

document.addEventListener('DOMContentLoaded', () => {
    // -------------------------------------------------------------------------
    // 1. Guest Name Handling
    // -------------------------------------------------------------------------
    const urlParams = new URLSearchParams(window.location.search);
    const guestName = urlParams.get('to');
    const guestNameElement = document.getElementById('guest-name-text');
    
    if (guestName && guestNameElement) {
        guestNameElement.textContent = guestName;
    }

    // -------------------------------------------------------------------------
    // 2. Countdown Timer
    // -------------------------------------------------------------------------
    // Set wedding date (e.g., 6 months from now for demo)
    const weddingDate = new Date();
    weddingDate.setMonth(weddingDate.getMonth() + 1);
    weddingDate.setHours(0, 0, 0, 0);

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = weddingDate.getTime() - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById('days').textContent = days < 10 ? '0' + days : days;
        document.getElementById('hours').textContent = hours < 10 ? '0' + hours : hours;
        document.getElementById('minutes').textContent = minutes < 10 ? '0' + minutes : minutes;
        document.getElementById('seconds').textContent = seconds < 10 ? '0' + seconds : seconds;

        if (distance < 0) {
            clearInterval(countdownInterval);
            document.getElementById('countdown-timer').textContent = "The Wedding Day has Arrived!";
            document.getElementById('countdown-timer').classList.add('done');
        }
    }

    const countdownInterval = setInterval(updateCountdown, 1000);
    updateCountdown();

    // -------------------------------------------------------------------------
    // 3. Background Music
    // -------------------------------------------------------------------------
    const musicBtn = document.getElementById('music-toggle');
    const audio = document.getElementById('bg-music');
    let isPlaying = false;

    if (musicBtn && audio) {
        musicBtn.addEventListener('click', () => {
            if (isPlaying) {
                audio.pause();
                musicBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18V5l12-2v13"></path><circle cx="6" cy="18" r="3"></circle><circle cx="18" cy="16" r="3"></circle></svg>';
            } else {
                audio.play();
                musicBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>';
            }
            isPlaying = !isPlaying;
        });
    }

    // -------------------------------------------------------------------------
    // 4. RSVP Form Submission
    // -------------------------------------------------------------------------
    const rsvpForm = document.getElementById('rsvp-form');
    if (rsvpForm) {
        rsvpForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('name').value;
            alert(`Thank you, ${name}! Your RSVP has been received.`);
            rsvpForm.reset();
        });
    }

    // -------------------------------------------------------------------------
    // 5. Copy Bank Account Number
    // -------------------------------------------------------------------------
    window.copyAccountNumber = function(id) {
        const accountNumber = document.getElementById(id).textContent.trim();
        navigator.clipboard.writeText(accountNumber).then(() => {
            const btn = document.querySelector(`[onclick="copyAccountNumber('${id}')"]`);
            const originalText = btn.textContent;
            btn.textContent = 'COPIED!';
            setTimeout(() => {
                btn.textContent = originalText;
            }, 2000);
        });
    };
});
