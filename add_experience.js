import fs from 'fs';

let html = fs.readFileSync('index.html', 'utf8');

const expHtml = `
<!-- EXPERIENCE -->
<section id="experience" style="background:linear-gradient(to bottom,transparent,rgba(124,58,237,0.03),transparent)">
  <div class="container">
    <div class="reveal">
      <div class="section-label">Career Path</div>
      <h2 class="section-title">Work <span>Experience</span></h2>
      <div class="section-line"></div>
    </div>
    <div class="timeline reveal">
      <div class="timeline-item">
        <div class="timeline-date">Jan 2026 – Present</div>
        <div class="timeline-role">Flutter Development Intern</div>
        <div class="timeline-org" style="font-family:'Poppins',sans-serif;font-weight:600;color:var(--accent2)">BlackDevs</div>
        <ul class="timeline-points">
          <li>Building Flutter applications for real-world client projects</li>
          <li>Implementing REST API integration and state management</li>
          <li>Developing responsive mobile UIs for Android & iOS</li>
          <li>Collaborating with team on app architecture and code reviews</li>
        </ul>
      </div>
    </div>
  </div>
</section>

<!-- TRAINING -->
<section id="training">
  <div class="container">
    <div class="reveal">
      <div class="section-label">Skill Development</div>
      <h2 class="section-title">Training <span>Summary</span></h2>
      <div class="section-line"></div>
    </div>
    <div class="timeline reveal">
      <div class="timeline-item">
        <div class="timeline-date">Trainee</div>
        <div class="timeline-role">Flutter Developer Trainee</div>
        <div class="timeline-org">E-Learning & Earning Ltd.</div>
        <ul class="timeline-points">
          <li>Developed Flutter applications from scratch</li>
          <li>Learned REST API Integration and implementation</li>
          <li>Built responsive mobile UI for multiple screens</li>
          <li>Worked with Firebase backend services</li>
          <li>Improved app architecture knowledge and patterns</li>
        </ul>
      </div>
      <div class="timeline-item">
        <div class="timeline-date">Trainee</div>
        <div class="timeline-role">Graphics Design Trainee</div>
        <div class="timeline-org">Edu Future IT</div>
        <ul class="timeline-points">
          <li>Designed social media content and campaigns</li>
          <li>Created banners, posters, and marketing materials</li>
          <li>Learned branding and identity design principles</li>
          <li>Worked on creative visual projects for clients</li>
        </ul>
      </div>
    </div>
  </div>
</section>

`;

if (!html.includes('id="experience"')) {
    html = html.replace('<!-- SERVICES -->', expHtml + '<!-- SERVICES -->');
    fs.writeFileSync('index.html', html);
    console.log('Experience and Training sections added.');
} else {
    console.log('Experience section already exists.');
}
