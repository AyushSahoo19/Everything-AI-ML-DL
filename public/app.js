let cur = 'python';
let activeFilter = 'all';
let activeTopicIndex = 0;

function setFilter(f) {
  activeFilter = f;
  const main = document.getElementById('main');
  const p = PHASES.find(x => x.key === cur);
  if (p) main.innerHTML = renderPhase(p);
}

function setTopic(index) {
  activeTopicIndex = index;
  const main = document.getElementById('main');
  const p = PHASES.find(x => x.key === cur);
  if (p) main.innerHTML = renderPhase(p);
}

function ftag(free) { return `<span class="${free ? 'badge-free' : 'badge-paid'}">${free ? 'Free PDF' : 'Paid'}</span>`; }
function sh(title, icon) { return `<div class="section-title"><span class="icon">${icon}</span> <span>${title}</span></div>`; }

// Escapes quotes to pass strings into onclick functions safely if needed, 
// but we will just pass indices to avoid passing strings.

function renderPhase(p) {
  let h = `<div class="phase-header">
    <div class="header-top">
      <div class="phase-title-wrapper">
        <div class="phase-icon"><i data-lucide="${p.icon}"></i></div>
        <div>
          <div class="phase-meta">${p.stage.toUpperCase()} • ${p.dur.toUpperCase()}</div>
          <h2 class="phase-title">${p.label}</h2>
        </div>
      </div>
      <div class="dots-menu">•••</div>
    </div>
    <div class="phase-purpose">${p.purpose}</div>
  </div>`;

  if (p.topics && p.topics.length > 0) {
    h += `<div class="topic-tabs">`;
    p.topics.forEach((t, i) => {
      h += `<button class="topic-tab-btn ${activeTopicIndex === i ? 'active' : ''}" onclick="setTopic(${i})">
        ${t.title}
      </button>`;
    });
    h += `</div>`;

    h += `<div class="filter-bar">
      <button class="filter-btn ${activeFilter === 'all' ? 'active' : ''}" onclick="setFilter('all')">All Resources</button>
      <button class="filter-btn ${activeFilter === 'courses' ? 'active' : ''}" onclick="setFilter('courses')">Courses</button>
      <button class="filter-btn ${activeFilter === 'youtube' ? 'active' : ''}" onclick="setFilter('youtube')">YouTube</button>
      <button class="filter-btn ${activeFilter === 'books' ? 'active' : ''}" onclick="setFilter('books')">Books & Papers</button>
      <button class="filter-btn ${activeFilter === 'repos' ? 'active' : ''}" onclick="setFilter('repos')">Websites & Repos</button>
    </div>`;

    const t = p.topics[activeTopicIndex];
    if (t) {
      let topicHasContent = false;
      let topicHtml = `
        <div class="topic-header">
          <div class="topic-title">${t.title}</div>
          <div class="topic-desc">${t.desc}</div>
        </div>
        <div class="grid-1">`;
      
      // Courses
      if (t.course && (activeFilter === 'all' || activeFilter === 'courses')) {
        topicHasContent = true;
        topicHtml += `<div class="card" style="margin-bottom:0;" onclick="openModal('${p.key}', ${activeTopicIndex}, 'course', 0)">
          <div class="flex-between">
            <span class="card-title">${t.course.name}</span>
            <span class="badge-free">🎓 Course</span>
          </div>
          <div class="author-text">${t.course.provider}</div>
          <p class="text-sm">${t.course.desc}</p>
        </div>`;
      }
      
      // YouTube
      if (t.youtube && (activeFilter === 'all' || activeFilter === 'youtube')) {
        t.youtube.forEach((y, i) => {
          topicHasContent = true;
          topicHtml += `<div class="card" style="margin-bottom:0;" onclick="openModal('${p.key}', ${activeTopicIndex}, 'youtube', ${i})">
            <div class="flex-between">
              <span class="card-title">${y.n}</span>
              <span class="badge-paid" style="background: rgba(255,0,0,0.15); color: #ff6b6b;">▶️ YT</span>
            </div>
            <div class="author-text">${y.s}</div>
            <p class="text-sm">${y.d}</p>
          </div>`;
        });
      }

      // Books
      if (t.books && (activeFilter === 'all' || activeFilter === 'books')) {
        t.books.forEach((b, i) => {
          topicHasContent = true;
          topicHtml += `<div class="card" style="margin-bottom:0;" onclick="openModal('${p.key}', ${activeTopicIndex}, 'books', ${i})">
            <div class="flex-between">
              <span class="card-title">${b.t}</span>
              ${ftag(b.free)}
            </div>
            <div class="author-text">${b.a}</div>
            <p class="text-sm">${b.d}</p>
          </div>`;
        });
      }

      // Papers
      if (t.papers && (activeFilter === 'all' || activeFilter === 'books')) {
        t.papers.forEach((pp, i) => {
          topicHasContent = true;
          topicHtml += `<div class="card" style="margin-bottom:0;" onclick="openModal('${p.key}', ${activeTopicIndex}, 'papers', ${i})">
            <div class="flex-between">
              <span class="card-title">${pp.t}</span>
              <span class="badge-paid" style="background: rgba(255,255,255,0.05); color: #ccc;">📄 Paper</span>
            </div>
            <div class="author-text">${pp.a}</div>
            <p class="text-sm">${pp.d}</p>
          </div>`;
        });
      }
      
      // Repos
      if (t.repos && (activeFilter === 'all' || activeFilter === 'repos')) {
        t.repos.forEach((r, i) => {
          topicHasContent = true;
          topicHtml += `<div class="card" style="margin-bottom:0;" onclick="openModal('${p.key}', ${activeTopicIndex}, 'repos', ${i})">
            <div class="flex-between">
              <span class="card-title">${r.n}</span>
              <span class="badge-paid" style="background: rgba(255,255,255,0.05); color: #ccc;">🐙 Repo</span>
            </div>
            <p class="text-sm" style="margin-top: 4px;">${r.d}</p>
          </div>`;
        });
      }
      
      // Websites
      if (t.websites && (activeFilter === 'all' || activeFilter === 'repos')) {
        t.websites.forEach((w, i) => {
          topicHasContent = true;
          topicHtml += `<div class="card" style="margin-bottom:0;" onclick="openModal('${p.key}', ${activeTopicIndex}, 'websites', ${i})">
            <div class="flex-between">
              <span class="card-title">${w.n}</span>
              <span class="badge-paid" style="background: rgba(255,255,255,0.05); color: #ccc;">🌐 Link</span>
            </div>
            <div class="author-text">${w.s}</div>
            <p class="text-sm">${w.d}</p>
          </div>`;
        });
      }

      topicHtml += `</div>`;
      
      if (topicHasContent) {
        h += topicHtml;
      } else {
        h += `<div style="padding: 24px; color: var(--text-muted); text-align: center; border: 1px dashed var(--border-color); border-radius: var(--radius-md);">No resources found for this filter.</div>`;
      }
    }
  }

  if (p.guide) {
    h += `<div class="phase-guide">
      <div class="guide-header">
        <span class="guide-icon"><i data-lucide="map"></i></span>
        <span class="guide-title">How to Follow This Phase</span>
      </div>
      <div class="guide-grid">
        ${p.guide.steps.map((s, i) => `<div class="guide-step-card">
          <div class="guide-step-num">${i + 1}</div>
          <div class="guide-step-body">
            <div class="guide-step-label">${s.label}</div>
            <div class="guide-step-desc">${s.desc}</div>
          </div>
        </div>`).join('')}
      </div>
      ${p.guide.tip ? `<div class="guide-tip"><span class="guide-tip-icon"><i data-lucide="zap"></i></span><span>${p.guide.tip}</span></div>` : ''}
    </div>`;
  }

  return h;
}

// System sections stay as non-modal for now, but could be adapted later.
function renderUpdates() {
  let h = `<div class="phase-header">
    <div class="header-top">
      <div class="phase-title-wrapper">
        <div class="phase-icon"><i data-lucide="rss"></i></div>
        <div>
          <h2 class="phase-title">Staying Updated</h2>
        </div>
      </div>
      <div class="dots-menu">•••</div>
    </div>
    <div class="phase-purpose">Set up these information flows from day one. The field moves fast — the habit of staying current is a skill that takes months to build.</div>
  </div>`;
  UPDATES.forEach((s, sIndex) => {
    h += sh(s.cat, s.icon);
    h += `<div class="grid-1">`;
    s.items.forEach((i, idx) => {
      h += `<div class="card" style="margin-bottom:0;" onclick="openSystemModal('updates', ${sIndex}, ${idx})">
        <div class="card-title" style="margin-bottom:8px;">${i.n}</div>
        <p class="text-sm">${i.d}</p>
      </div>`;
    });
    h += '</div>';
  });
  return h;
}

function renderGuidance() {
  let h = `<div class="phase-header">
    <div class="header-top">
      <div class="phase-title-wrapper">
        <div class="phase-icon"><i data-lucide="compass"></i></div>
        <div>
          <h2 class="phase-title">Guidance System</h2>
        </div>
      </div>
      <div class="dots-menu">•••</div>
    </div>
    <div class="phase-purpose">A roadmap without a system is a wish list. These habits determine whether this journey results in genuine expertise or just a collection of certificates.</div>
  </div>`;
  h += `<div class="grid-1">`;
  GUIDANCE.forEach((g, i) => {
    h += `<div class="card" style="margin-bottom:0;" onclick="openSystemModal('guidance', 0, ${i})">
      <div class="card-title" style="margin-bottom:8px;"><span style="margin-right:8px">${g.icon}</span>${g.t}</div>
      <p class="text-sm" style="line-height:1.6;">${g.c}</p>
    </div>`;
  });
  h += `</div>`;
  return h;
}

function buildNav() {
  const pnav = document.getElementById('pnav');
  const snav = document.getElementById('snav');
  
  pnav.innerHTML = PHASES.map(p => `
    <button class="nav-btn ${cur === p.key ? 'active' : ''}" onclick="show('${p.key}')">
      <span class="nav-icon"><i data-lucide="${p.icon}"></i></span>
      <span style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${p.label}</span>
      <span class="badge">${p.stage.split(' ')[1] || '0'}</span>
    </button>
  `).join('');
  
  const sys = [
    { k: 'allresources', i: 'book-open', l: 'All Resources' },
    { k: 'updates', i: 'rss', l: 'Stay Updated' },
    { k: 'guidance', i: 'compass', l: 'Guidance' }
  ];
  
  snav.innerHTML = sys.map(s => `
    <button class="nav-btn ${cur === s.k ? 'active' : ''}" onclick="show('${s.k}')">
      <span class="nav-icon"><i data-lucide="${s.i}"></i></span>
      <span>${s.l}</span>
    </button>
  `).join('');
  
  if (typeof lucide !== 'undefined') lucide.createIcons();
}

function renderAllResources() {
  let h = `<div class="phase-header">
    <div class="header-top">
      <div class="phase-title-wrapper">
        <div class="phase-icon"><i data-lucide="book-open"></i></div>
        <div>
          <h2 class="phase-title">All Resources</h2>
        </div>
      </div>
      <div class="dots-menu">•••</div>
    </div>
    <div class="phase-purpose">Every resource across all 8 phases — organized by type and listed in the sequence you should follow. Click any card to see details.</div>
  </div>`;

  // Collect resources by type across all phases
  const byType = { course: [], youtube: [], books: [], papers: [], repos: [], websites: [] };

  PHASES.forEach((p, pi) => {
    (p.topics || []).forEach((t, ti) => {
      if (t.course) byType.course.push({ p, pi, ti, data: t.course, key: 'course' });
      (t.youtube || []).forEach((y, i) => byType.youtube.push({ p, pi, ti, data: y, key: 'youtube', idx: i }));
      (t.books || []).forEach((b, i) => byType.books.push({ p, pi, ti, data: b, key: 'books', idx: i }));
      (t.papers || []).forEach((pp, i) => byType.papers.push({ p, pi, ti, data: pp, key: 'papers', idx: i }));
      (t.repos || []).forEach((r, i) => byType.repos.push({ p, pi, ti, data: r, key: 'repos', idx: i }));
      (t.websites || []).forEach((w, i) => byType.websites.push({ p, pi, ti, data: w, key: 'websites', idx: i }));
    });
  });

  const sections = [
    { key: 'course', icon: '🎓', label: 'Courses', badge: '<span class="badge-free">🎓 Course</span>' },
    { key: 'youtube', icon: '▶️', label: 'YouTube Playlists & Videos', badge: '<span class="badge-paid" style="background: rgba(255,0,0,0.15); color: #ff6b6b;">▶️ YouTube</span>' },
    { key: 'books', icon: '📚', label: 'Free Books & Textbooks', badge: null },
    { key: 'papers', icon: '📄', label: 'Research Papers', badge: '<span class="badge-paid" style="background: rgba(255,255,255,0.05); color: #ccc;">📄 Paper</span>' },
    { key: 'repos', icon: '🐙', label: 'GitHub Repositories', badge: '<span class="badge-paid" style="background: rgba(255,255,255,0.05); color: #ccc;">🐙 Repo</span>' },
    { key: 'websites', icon: '🌐', label: 'Websites & Tools', badge: '<span class="badge-paid" style="background: rgba(255,255,255,0.05); color: #ccc;">🌐 Link</span>' }
  ];

  sections.forEach(section => {
    const items = byType[section.key];
    if (!items.length) return;

    h += `<div style="margin-top: 36px;">
      <div class="section-title"><span class="icon">${section.icon}</span> <span>${section.label} <span style="color:var(--text-muted);font-weight:400;font-size:13px;">(${items.length})</span></span></div>
      <div class="grid-1">`;

    items.forEach((item, idx) => {
      const d = item.data;
      const title = d.name || d.n || d.t || '';
      const author = d.provider || d.s || d.a || '';
      const desc = d.desc || d.d || '';
      const phaseLabel = item.p.stage + ' — ' + item.p.label;
      const topicLabel = item.p.topics[item.ti].title;

      let badgeHtml = section.badge;
      if (section.key === 'books') {
        badgeHtml = d.free
          ? '<span class="badge-free">📚 Free PDF</span>'
          : '<span class="badge-paid">📚 Book</span>';
      }

      h += `<div class="card" style="margin-bottom:0;" onclick="openModal('${item.p.key}', ${item.ti}, '${section.key}', ${item.idx ?? 0})">
        <div class="flex-between" style="margin-bottom:6px;">
          <span class="card-title">${title}</span>
          ${badgeHtml}
        </div>
        ${author ? `<div class="author-text" style="margin-bottom:4px;">${author}</div>` : ''}
        <div style="font-size:11px;color:var(--text-muted);margin-bottom:8px;">
          <span style="background:rgba(255,255,255,0.04);padding:2px 8px;border-radius:4px;">${phaseLabel}</span>
          <span style="background:rgba(255,255,255,0.04);padding:2px 8px;border-radius:4px;margin-left:4px;">${topicLabel}</span>
        </div>
        <p class="text-sm">${desc}</p>
      </div>`;
    });

    h += `</div></div>`;
  });

  return h;
}

function show(key) {
  if (cur !== key) {
    activeFilter = 'all';
    activeTopicIndex = 0; 
  }
  cur = key;
  const main = document.getElementById('main');
  const p = PHASES.find(x => x.key === key);
  
  if (p) main.innerHTML = renderPhase(p);
  else if (key === 'updates') main.innerHTML = renderUpdates();
  else if (key === 'guidance') main.innerHTML = renderGuidance();
  else if (key === 'allresources') main.innerHTML = renderAllResources();
  
  if (typeof lucide !== 'undefined') lucide.createIcons();
  buildNav();
  window.scrollTo({ top: 0 });
}

// Modal Logic
function openModal(phaseKey, topicIndex, resType, resIndex) {
  const phase = PHASES.find(p => p.key === phaseKey);
  if (!phase) return;
  const topic = phase.topics[topicIndex];
  if (!topic) return;

  let resData;
  if (resType === 'course') resData = topic.course;
  else if (topic[resType] && topic[resType][resIndex]) resData = topic[resType][resIndex];
  
  if (!resData) return;

  const title = resData.name || resData.n || resData.t;
  const author = resData.provider || resData.s || resData.a || '';
  const desc = resData.desc || resData.d || '';
  const url = resData.url || '#';
  
  // Format covered items if they exist and are newline separated
  let coveredHtml = '<p style="color: var(--text-muted); font-style: italic;">No specific coverage details provided.</p>';
  if (resData.covered) {
    coveredHtml = resData.covered; // Data is pre-formatted with bullets and newlines
  }

  let whyHtml = '<p style="color: var(--text-muted); font-style: italic;">No specific justification provided.</p>';
  if (resData.why) {
    whyHtml = resData.why;
  }

  // Get tag/icon based on resType
  let badgeHtml = '';
  if (resType === 'course') badgeHtml = '<span class="badge-free">🎓 Course</span>';
  else if (resType === 'youtube') badgeHtml = '<span class="badge-paid" style="background: rgba(255,0,0,0.15); color: #ff6b6b;">▶️ YouTube</span>';
  else if (resType === 'books') badgeHtml = resData.free ? '<span class="badge-free">Free PDF</span>' : '<span class="badge-paid">Paid Book</span>';
  else if (resType === 'papers') badgeHtml = '<span class="badge-paid" style="background: rgba(255,255,255,0.05); color: #ccc;">📄 Paper</span>';
  else if (resType === 'repos') badgeHtml = '<span class="badge-paid" style="background: rgba(255,255,255,0.05); color: #ccc;">🐙 Repo</span>';
  else if (resType === 'websites') badgeHtml = '<span class="badge-paid" style="background: rgba(255,255,255,0.05); color: #ccc;">🌐 Link</span>';

  const modalHtml = `
    <div class="modal-header">
      <div class="modal-title-area">
        <div style="margin-bottom: 8px;">${badgeHtml}</div>
        <div class="modal-title">${title}</div>
        ${author ? `<div class="author-text" style="margin-bottom: 0;">${author}</div>` : ''}
      </div>
      <button class="modal-close" onclick="closeModal(event, true)">×</button>
    </div>
    <div class="modal-body">
      <p style="font-size: 15px; color: var(--text-primary); margin-bottom: 32px; line-height: 1.6;">${desc}</p>
      
      <div class="modal-section-title">
        <span class="icon">🔍</span> What It Covers
      </div>
      <div class="modal-section-content">${coveredHtml}</div>

      <div class="modal-section-title">
        <span class="icon">💡</span> Why Follow This
      </div>
      <div class="modal-section-content">${whyHtml}</div>

      <div style="margin-top: 32px;">
        <a href="${url}" target="_blank" rel="noopener" class="btn-primary">
          Open Original Resource ↗
        </a>
      </div>
    </div>
  `;

  document.getElementById('modal-content').innerHTML = modalHtml;
  document.getElementById('modal-overlay').classList.add('active');
  document.body.style.overflow = 'hidden'; // Prevent background scrolling
}

function openSystemModal(type, catIndex, itemIndex) {
  let resData;
  let badgeHtml = '';
  
  if (type === 'updates') {
    resData = UPDATES[catIndex].items[itemIndex];
    badgeHtml = '<span class="badge-paid" style="background: rgba(255,255,255,0.05); color: #ccc;">📰 Update Source</span>';
  } else if (type === 'guidance') {
    resData = GUIDANCE[itemIndex];
    badgeHtml = '<span class="badge-paid" style="background: rgba(255,255,255,0.05); color: #ccc;">🧭 Guidance</span>';
  }
  
  if (!resData) return;

  const title = resData.n || resData.t;
  const desc = resData.d || resData.c;
  const url = resData.url || '#';
  
  let coveredHtml = '<p style="color: var(--text-muted); font-style: italic;">No specific coverage details provided.</p>';
  if (resData.covered) coveredHtml = resData.covered;

  let whyHtml = '<p style="color: var(--text-muted); font-style: italic;">No specific justification provided.</p>';
  if (resData.why) whyHtml = resData.why;

  const modalHtml = `
    <div class="modal-header">
      <div class="modal-title-area">
        <div style="margin-bottom: 8px;">${badgeHtml}</div>
        <div class="modal-title">${title}</div>
      </div>
      <button class="modal-close" onclick="closeModal(event, true)">×</button>
    </div>
    <div class="modal-body">
      <p style="font-size: 15px; color: var(--text-primary); margin-bottom: 32px; line-height: 1.6;">${desc}</p>
      
      <div class="modal-section-title">
        <span class="icon">🔍</span> What It Covers
      </div>
      <div class="modal-section-content">${coveredHtml}</div>

      <div class="modal-section-title">
        <span class="icon">💡</span> Why Follow This
      </div>
      <div class="modal-section-content">${whyHtml}</div>
      
      ${url !== '#' ? `
      <div style="margin-top: 32px;">
        <a href="${url}" target="_blank" rel="noopener" class="btn-primary">
          Open Original Resource ↗
        </a>
      </div>` : ''}
    </div>
  `;

  document.getElementById('modal-content').innerHTML = modalHtml;
  document.getElementById('modal-overlay').classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal(event, force = false) {
  // Only close if clicking exactly on the overlay background or the force close button
  if (force || event.target.id === 'modal-overlay') {
    document.getElementById('modal-overlay').classList.remove('active');
    document.body.style.overflow = '';
  }
}

// Initialize
document.addEventListener("DOMContentLoaded", () => {
  buildNav();
  show('python');
});
