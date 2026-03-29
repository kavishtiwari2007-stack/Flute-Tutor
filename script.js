document.addEventListener("DOMContentLoaded", () => {
    // 1. Swara logic (Fingering)
    const swaraButtons = document.querySelectorAll('.swara-btn');
    const holes = [
        document.getElementById('hole-1'),
        document.getElementById('hole-2'),
        document.getElementById('hole-3'),
        document.getElementById('hole-4'),
        document.getElementById('hole-5'),
        document.getElementById('hole-6')
    ];
    const swaraInfo = document.getElementById('swara-info');

    // Defines which holes are closed for each swara (1 = closed, 0 = open)
    // Note: This is a simplified representation of Bansuri fingerings (middle octave)
    const swaraData = {
        'sa': { closed: [1, 1, 1, 0, 0, 0], name: 'Sa (Shadja)', desc: 'Top three holes closed. The fundamental anchor note.' },
        're': { closed: [1, 1, 0, 0, 0, 0], name: 'Re (Rishabh)', desc: 'Top two holes closed. A bright, strong note.' },
        'ga': { closed: [1, 0, 0, 0, 0, 0], name: 'Ga (Gandhar)', desc: 'Only the top hole closed. Peaceful and expansive.' },
        'ma': { closed: [0, 0, 0, 0, 0, 0], name: 'Ma (Madhyam) - Tivra', desc: 'All holes open (or top 5 half-closed for Shuddha). The center of the octave.' },
        'pa': { closed: [1, 1, 1, 1, 1, 1], name: 'Pa (Pancham)', desc: 'All six holes closed. The stable dominant note.' },
        'dha': { closed: [1, 1, 1, 1, 1, 0], name: 'Dha (Dhaivat)', desc: 'Top five holes closed. Deep and emotional.' },
        'ni': { closed: [1, 1, 1, 1, 0, 0], name: 'Ni (Nishad)', desc: 'Top four holes closed. The leading tone back to Sa.' }
    };

    function updateFlute(swaraKey) {
        const data = swaraData[swaraKey];
        if (!data) return;

        // Update visual holes
        holes.forEach((hole, index) => {
            if (data.closed[index]) {
                hole.classList.add('closed');
            } else {
                hole.classList.remove('closed');
            }
        });

        // Update description
        swaraInfo.innerHTML = `<h3>${data.name}</h3><p>${data.desc}</p>`;
    }

    swaraButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class
            swaraButtons.forEach(b => b.classList.remove('active'));
            // Add active to clicked
            btn.classList.add('active');
            // Update flute visual
            updateFlute(btn.dataset.swara);
        });
    });

    // Initialize with 'Sa'
    updateFlute('sa');


    // 2. Raag Database & Level Toggling
    const raagData = {
        beginner: [
            { name: "Raag Yaman", aroha: "N R G M(t) D N S'", avaroha: "S' N D P M(t) G R S", mood: "Evening, Devotional, Peaceful" },
            { name: "Raag Bhupali", aroha: "S R G P D S'", avaroha: "S' D P G R S", mood: "Early Night, Calmness" },
            { name: "Raag Bhoop", aroha: "S R G P D S'", avaroha: "S' D P G R S", mood: "Early Night (Similar to Bhupali)" },
            { name: "Raag Bilaval", aroha: "S R G M P D N S'", avaroha: "S' N D P M G R S", mood: "Morning, Happy, Bright" },
            { name: "Raag Durga", aroha: "S R M P D S'", avaroha: "S' D P M R S", mood: "Late Night, Purity, Strength" },
            { name: "Raag Khamaaj", aroha: "S G M P D N S'", avaroha: "S' n D P M G R S", mood: "Late Evening, Romantic" },
            { name: "Raag Des", aroha: "S R M P N S'", avaroha: "S' n D P M G R G S", mood: "Late Evening, Sweetness" },
            { name: "Raag Kafi", aroha: "S R g M P D n S'", avaroha: "S' n D P M g R S", mood: "Midnight, Spring, Joyful" }
        ],
        intermediate: [
            { name: "Raag Bhimpalasi", aroha: "n S g M P n S'", avaroha: "S' n D P M g R S", mood: "Late Afternoon, Yearning" },
            { name: "Raag Baageshree", aroha: "S g M D n S'", avaroha: "S' n D M g R S", mood: "Midnight, Deep Love" },
            { name: "Raag Bhairav", aroha: "S r G M P d N S'", avaroha: "S' N d P M G r S", mood: "Morning, Devotion, Serenity" },
            { name: "Raag Bihaag", aroha: "S G M P N S'", avaroha: "S' N D P M(t) P G M G R S", mood: "Late Night, Festive" },
            { name: "Raag Hamir", aroha: "S R S, G M D N S'", avaroha: "S' N D P, M(t) P D P, G M R S", mood: "First Quarter of Night, Valor" },
            { name: "Raag Piloo", aroha: "N. S G M P N S'", avaroha: "S' n D P d P M g R S", mood: "Light Classical, Any Time" },
            { name: "Raag Saarang", aroha: "S R M P N S'", avaroha: "S' n P M R S", mood: "Afternoon, Coolness" },
            { name: "Raag Tilang", aroha: "S G M P N S'", avaroha: "S' n P M G S", mood: "Late Evening, Cheerful" },
            { name: "Raag Aasaawari", aroha: "S R M P d S'", avaroha: "S' n d P M g R S", mood: "Late Morning, Renunciation" }
        ],
        pro: [
            { name: "Raag Bhairavi", aroha: "S r g M P d n S'", avaroha: "S' n d P M g r S", mood: "Morning/End of Concert, Compassion" },
            { name: "Raag Maalkauns", aroha: "S g M d n S'", avaroha: "S' n d M g S", mood: "Late Night, Deep Contemplation" },
            { name: "Raag Shankara", aroha: "S G P N D S' N", avaroha: "S' N P, G P G R S", mood: "Late Night, Powerful" },
            { name: "Raag Tilak Amod", aroha: "P. N. S R G S, R M P D P S'", avaroha: "S' P D M G, S R G S", mood: "Late Evening, Serene Love" },
            { name: "Raag Todi", aroha: "S r g M(t) d N S'", avaroha: "S' N d M(t) g r S", mood: "Morning, Deep Pathos" },
            { name: "Raag Gunakali", aroha: "S r M P d S'", avaroha: "S' d P M r S", mood: "Morning, Devotion" },
            { name: "Raag GaudSarang", aroha: "S G R M G P M D P N D S'", avaroha: "S' D N P D M P G M R P R S", mood: "Afternoon, Intricate" },
            { name: "Raag Kedar", aroha: "S M, G P, M(t) P D N S'", avaroha: "S' N D P, M(t) P D P M, S R S", mood: "Night, Majestic" },
            { name: "Raag Puriyaa Dhanashri", aroha: "N. r G M(t) P d N S'", avaroha: "S' N d P M(t) G M(t) r G r S", mood: "Sunset, Anxiety & Yearning" },
            { name: "Raag Darbaari Kaanada", aroha: "S R g M P d n S'", avaroha: "S' d n P M P g M R S", mood: "Midnight, Extreme Gravity & Royalty" }
        ]
    };

    const tabBtns = document.querySelectorAll('.tab-btn');
    const raagContainer = document.getElementById('raag-container');

    function renderRaags(level) {
        const raags = raagData[level];
        if (!raags) return;

        let html = '<div class="raag-grid">';
        raags.forEach(r => {
            html += `
                <div class="raag-card">
                    <h3>${r.name}</h3>
                    <div class="raag-info">
                        <p><strong>Aroha:</strong> ${r.aroha}</p>
                        <p><strong>Avaroha:</strong> ${r.avaroha}</p>
                        <p><strong>Mood/Time:</strong> ${r.mood}</p>
                    </div>
                </div>
            `;
        });
        html += '</div>';
        raagContainer.innerHTML = html;
    }

    tabBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            tabBtns.forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            renderRaags(e.target.dataset.level);
        });
    });

    // Initialize with beginner raags
    renderRaags('beginner');
});
