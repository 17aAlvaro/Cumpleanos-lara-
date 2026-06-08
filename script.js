document.addEventListener('DOMContentLoaded', () => {
    // SURPRISE BUTTON LOGIC
    const btn = document.getElementById('surpriseBtn');
    const hiddenMessage = document.getElementById('hiddenMessage');
    const btnText = btn.querySelector('span');

    let isOpened = false;

    if (btn) {
        btn.addEventListener('click', () => {
            if (!isOpened) {
                // Show the hidden message
                hiddenMessage.classList.add('show');
                
                // Update button state
                btn.classList.add('opened');
                btnText.textContent = '¡Sorpresa Abierta!';
                isOpened = true;
            }
        });
    }

    // TAB NAVIGATION LOGIC
    const tabs = document.querySelectorAll('.year-tab');
    const views = document.querySelectorAll('.year-view');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active from all tabs and views
            tabs.forEach(t => t.classList.remove('active'));
            views.forEach(v => v.classList.remove('active'));

            // Add active to clicked tab and corresponding view
            tab.classList.add('active');
            const targetId = tab.getAttribute('data-target');
            const targetView = document.getElementById(targetId);
            if (targetView) {
                targetView.classList.add('active');
            }
        });
    });

    // COUNTDOWN TIMERS LOGIC
    const targets = {
        '2026': new Date('July 1, 2027 00:00:00').getTime(), // 18 cumpleaños
        '2027': new Date('July 1, 2027 00:00:00').getTime(),
        '2028': new Date('July 1, 2028 00:00:00').getTime(),
        '2029': new Date('July 1, 2029 00:00:00').getTime(),
        '2030': new Date('July 1, 2030 00:00:00').getTime(),
    };

    function updateCountdowns() {
        const now = new Date().getTime();

        for (const year in targets) {
            const targetDate = targets[year];
            const distance = targetDate - now;

            const elDays = document.getElementById(`days-${year}`);
            const elHours = document.getElementById(`hours-${year}`);
            const elMins = document.getElementById(`mins-${year}`);
            const elSecs = document.getElementById(`secs-${year}`);

            if (!elDays) continue; // Skip if element not found

            if (distance > 0) {
                const days = Math.floor(distance / (1000 * 60 * 60 * 24));
                const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((distance % (1000 * 60)) / 1000);

                elDays.innerText = days.toString().padStart(2, '0');
                elHours.innerText = hours.toString().padStart(2, '0');
                elMins.innerText = minutes.toString().padStart(2, '0');
                elSecs.innerText = seconds.toString().padStart(2, '0');
            } else {
                // Countdown finished
                elDays.innerText = "00";
                elHours.innerText = "00";
                elMins.innerText = "00";
                elSecs.innerText = "00";
            }
        }
    }

    // Run countdown immediately and then every second
    updateCountdowns();
    setInterval(updateCountdowns, 1000);
});
