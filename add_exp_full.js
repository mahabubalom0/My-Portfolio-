import fs from 'fs';

let html = fs.readFileSync('index.html', 'utf8');
let css = fs.readFileSync('src/style.css', 'utf8');

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
        <div class="timeline-org" style="font-family:var(--font-title);font-weight:600;color:var(--accent2)">BlackDevs</div>
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

const expCss = `
/* EXPERIENCE & TRAINING */
.timeline{position:relative;padding-left:2rem}
.timeline::before{content:'';position:absolute;left:0;top:0;bottom:0;width:2px;background:linear-gradient(to bottom,var(--accent),var(--accent2),transparent)}
.timeline-item{position:relative;padding-bottom:3rem}
.timeline-item::before{content:'';position:absolute;left:-2.4rem;top:.4rem;width:12px;height:12px;border-radius:50%;background:linear-gradient(135deg,var(--accent),var(--accent2));box-shadow:0 0 15px var(--glow)}
.timeline-date{font-size:.78rem;color:var(--accent2);font-weight:600;letter-spacing:.05em;text-transform:uppercase;margin-bottom:.5rem;font-family:var(--font-sub)}
.timeline-role{font-family:var(--font-title);font-size:1.2rem;font-weight:700;margin-bottom:.25rem}
.timeline-org{color:var(--accent3);font-size:.9rem;font-weight:600;margin-bottom:1rem;font-family:var(--font-title)}
.timeline-points{list-style:none}
.timeline-points li{color:var(--muted);font-size:.9rem;padding:.3rem 0;padding-left:1.25rem;position:relative;font-family:'Inter',var(--font-body)}
.timeline-points li::before{content:'▸';position:absolute;left:0;color:var(--accent2)}
`;

if (!html.includes('id="experience"')) {
    html = html.replace('<!-- SERVICES -->', expHtml + '<!-- SERVICES -->');
    fs.writeFileSync('index.html', html);
    console.log('Experience and Training HTML sections added.');
}

if (!css.includes('.timeline{position:relative')) {
    fs.writeFileSync('src/style.css', css + '\\n' + expCss);
    console.log('Experience CSS added.');
}
