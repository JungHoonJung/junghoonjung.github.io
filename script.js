// script.js
document.addEventListener('DOMContentLoaded', () => {

    // Highlight Active Navigation Link on Scroll
    const sections = document.querySelectorAll('section[id]');

    window.addEventListener('scroll', () => {
        let scrollY = window.pageYOffset;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 50;
            const sectionId = current.getAttribute('id');
            const navUrl = document.querySelector(`.nav-menu a[href*=${sectionId}]`);

            if (navUrl) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    navUrl.classList.add('active');
                } else {
                    navUrl.classList.remove('active');
                }
            }
        });
    });

    // Fetch and Render Data from data.json
    fetch('data.json')
        .then(response => response.json())
        .then(data => renderData(data))
        .catch(error => console.error('Error loading data:', error));

    function renderData(data) {
        // 1. Profile Section
        const profileHTML = `
            <img src="assets/img/profile.png" alt="${data.profile.name}" class="profile-image">
            <h1 class="name">${data.profile.name}</h1>
            <p class="title">${data.profile.title}</p>
            <p class="affiliation">${data.profile.affiliation}</p>
            
            <div class="contact-info">
                <a href="mailto:${data.profile.email}" class="contact-link">
                    <svg viewBox="0 0 24 24" fill="none" class="icon" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                    ${data.profile.email}
                </a>
            </div>

            <div class="social-links">
                <a href="${data.profile.social.googleScholar}" target="_blank" rel="noopener" title="Google Scholar">Google Scholar</a>
                <a href="${data.profile.social.github}" target="_blank" rel="noopener" title="GitHub">GitHub</a>
                <a href="${data.profile.social.linkedin}" target="_blank" rel="noopener" title="LinkedIn">LinkedIn</a>
            </div>
        `;
        document.getElementById('profile-container').innerHTML = profileHTML;

        // 2. About Section
        const aboutHTML = data.about.description.map(p => `<p>${p}</p>`).join('');
        document.getElementById('about-content').innerHTML = aboutHTML;

        const interestsHTML = data.about.interests.map(interest => `<li>${interest}</li>`).join('');
        document.getElementById('interests-list').innerHTML = interestsHTML;

        // 3. CV Section
        const academicCareersHTML = (data.cv["Academic careers"] || []).map(career => `
            <div class="cv-item">
                <div class="cv-date">${career.date}</div>
                <div class="cv-details">
                    <h4>${career.position}, ${career.affiliation}</h4>
                    ${career.PI ? `<p class="advisor">PI: ${career.PI}</p>` : ''}
                </div>
            </div>
        `).join('');
        document.getElementById('academic-careers-list').innerHTML = academicCareersHTML;

        const educationHTML = data.cv.education.map(edu => `
            <div class="cv-item">
                <div class="cv-date">${edu.date}</div>
                <div class="cv-details">
                    <h4>${edu.title}</h4>
                    ${edu.thesis ? `<p class="thesis">${edu.thesis}</p>` : ''}
                    ${edu.advisor ? `<p class="advisor">${edu.advisor}</p>` : ''}
                </div>
            </div>
        `).join('');
        document.getElementById('education-list').innerHTML = educationHTML;

        const skillsHTML = data.cv.skills.map(skill => `
            <div class="cv-item">
                <div class="cv-date">${skill.category}</div>
                <div class="cv-details">
                    <p>${skill.details}</p>
                </div>
            </div>
        `).join('');
        document.getElementById('skills-list').innerHTML = skillsHTML;

        // 4. Publications Section
        const publicationsHTML = data.publications.map(pub => `
            <div class="pub-item">
                <div class="pub-image">
                    <img src="${pub.image}" alt="${pub.title}">
                </div>
                <div class="pub-info">
                    <h4 class="pub-title">
                        <a href="${pub.url}" target="_blank" rel="noopener">${pub.title}</a>
                    </h4>
                    <p class="pub-authors">${pub.authors}</p>
                    <p class="pub-journal">${pub.journal}</p>
                </div>
            </div>
        `).join('');
        document.getElementById('publication-list').innerHTML = publicationsHTML;

        // 5. Presentations Section
        const awardsHTML = data.presentations.awards.map(award => `<li>${award}</li>`).join('');
        document.getElementById('awards-list').innerHTML = awardsHTML;

        const talksHTML = data.presentations.talks.map(talk => `<li>${talk}</li>`).join('');
        document.getElementById('talks-list').innerHTML = talksHTML;
    }
});
