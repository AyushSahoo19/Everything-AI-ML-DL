let cur = 'python';
let activeFilter = 'all';
let activeTopicIndex = 0;
let resourceFilter = 'all';
let resourceSubFilter = 'all';

function setFilter(f) {
  activeFilter = f;
  const main = document.getElementById('main');
  const p = PHASES.find(x => x.key === cur);
  if (p) main.innerHTML = renderPhase(p);
}

function setResourceFilter(f) {
  resourceFilter = f;
  resourceSubFilter = 'all';
  document.getElementById('main').innerHTML = renderAllResources();
}

function setResourceSubFilter(f) {
  resourceSubFilter = f;
  document.getElementById('main').innerHTML = renderAllResources();
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
  const CATS = [
    { k: 'math',     i: '⊜', l: 'Mathematics & Theory' },
    { k: 'prog',     i: '⎔', l: 'Programming & Engineering' },
    { k: 'cml',      i: '⊟', l: 'Classical ML' },
    { k: 'dlcore',   i: '⊡', l: 'Deep Learning — Core' },
    { k: 'papers',   i: '◆', l: 'Landmark Papers' },
    { k: 'nlp',      i: '⊳', l: 'NLP & LLMs' },
    { k: 'cv',       i: '◈', l: 'Computer Vision' },
    { k: 'rl',       i: '▶', l: 'Reinforcement Learning' },
    { k: 'genai',    i: '◇', l: 'Generative AI' },
    { k: 'repos',    i: '⊞', l: 'GitHub Repositories' },
    { k: 'mlops',    i: '◎', l: 'MLOps & Production' },
    { k: 'research', i: '○', l: 'Research Methods' },
    { k: 'blogs',    i: '▢', l: 'Newsletters & Blogs' },
    { k: 'frontier', i: '⧩', l: 'Frontier & Breadth' }
  ];

  const SEQUENCES = {
    math: {
      primary: 'Essence of Linear Algebra (3Blue1Brown)',
      note: 'Build mathematical intuition first, then layer on formalism.',
      steps: [
        { label: 'Build intuition', items: [{ n: 'Essence of Linear Algebra — 3Blue1Brown', t: '▶', u: 'https://youtube.com/playlist?list=PLZHQObOWTQDPD3MizzM2xVFitgF8hE_ab' }, { n: 'Essence of Calculus — 3Blue1Brown', t: '▶', u: 'https://youtube.com/playlist?list=PLZHQObOWTQDMsr9K-rj53DwVRMYO3t5Yr' }] },
        { label: 'Structured course', items: [{ n: 'Mathematics for ML — Imperial College (Coursera)', t: '◇' }, { n: 'Probabilistic ML — Duke (Coursera)', t: '◇' }] },
        { label: 'Read & reference', items: [{ n: 'Matrix Calculus for Deep Learning (Parr & Howard)', t: '◆' }, { n: 'Seeing Theory — Brown University', t: '◎' }, { n: 'StatQuest — Statistics Fundamentals', t: '▶' }] }
      ]
    },
    prog: {
      primary: 'CS50P (Harvard) + Python Data Science Handbook',
      note: 'Master Python, NumPy, Pandas, and Matplotlib — these are prerequisites for everything else.',
      steps: [
        { label: 'Python fundamentals', items: [{ n: 'CS50P — Harvard (edX)', t: '◇' }, { n: 'Automate the Boring Stuff (Al Sweigart)', t: '⊡' }] },
        { label: 'Numerical computing', items: [{ n: 'NumPy Crash Course — freeCodeCamp', t: '▶' }, { n: 'Python Data Science Handbook (VanderPlas) — NumPy', t: '⊡' }] },
        { label: 'Data wrangling & viz', items: [{ n: 'Kaggle Pandas Course', t: '◇' }, { n: 'Keith Galli Pandas Tutorial', t: '▶' }, { n: 'Corey Schafer Matplotlib Tutorial', t: '▶' }, { n: 'Seaborn Gallery', t: '◎' }] }
      ]
    },
    cml: {
      primary: 'Andrew Ng ML Specialization (Coursera)',
      note: 'This is the most important phase of your entire ML journey. Do not rush it.',
      steps: [
        { label: 'Core course', items: [{ n: 'Machine Learning Specialization — Andrew Ng (Coursera)', t: '◇' }] },
        { label: 'Deepen with textbook', items: [{ n: 'ISLP — Introduction to Statistical Learning (James, Witten, Hastie, Tibshirani)', t: '⊡' }] },
        { label: 'Practice', items: [{ n: 'Hands-On Machine Learning (Géron)', t: '⊡' }, { n: 'Scikit-Learn Documentation Guide', t: '◎' }, { n: 'ML-From-Scratch', t: '⊞' }] },
        { label: 'Advanced topics', items: [{ n: 'XGBoost Paper (Chen & Guestrin)', t: '◆' }, { n: 'Random Forests Paper (Breiman)', t: '◆' }] }
      ]
    },
    dlcore: {
      primary: 'Deep Learning Specialization (Andrew Ng)',
      note: 'Understand neural network internals before using frameworks.',
      steps: [
        { label: 'Foundations', items: [{ n: 'Deep Learning Specialization — Andrew Ng (Coursera)', t: '◇' }, { n: 'Neural Networks & Deep Learning (Michael Nielsen)', t: '⊡' }] },
        { label: 'Visual intuition', items: [{ n: 'Neural Networks — 3Blue1Brown', t: '▶' }, { n: 'Backpropagation Calculus — 3Blue1Brown', t: '▶' }] },
        { label: 'Architectures', items: [{ n: 'Stanford CS231n — CNNs for Visual Recognition', t: '◇' }, { n: 'Stanford CS224n — NLP with Deep Learning', t: '◇' }] },
        { label: 'Key papers', items: [{ n: 'Dropout Paper (Srivastava et al.)', t: '◆' }, { n: 'Adam Paper (Kingma & Ba)', t: '◆' }, { n: 'ResNet Paper (He et al.)', t: '◆' }] }
      ]
    },
    papers: {
      primary: 'Attention Is All You Need (Vaswani et al., 2017)',
      note: 'Start here, then follow the citation chain. Read in chronological order to see how ideas built on each other.',
      steps: [
        { label: 'The Transformer era (2017–2018)', items: [{ n: 'Attention Is All You Need (Vaswani et al.)', t: '◆' }, { n: 'BERT (Devlin et al.)', t: '◆' }] },
        { label: 'Scaling & few-shot (2020–2022)', items: [{ n: 'GPT-3 — Language Models are Few-Shot Learners', t: '◆' }, { n: 'Scaling Laws (Kaplan et al.)', t: '◆' }, { n: 'Chinchilla (Hoffmann et al.)', t: '◆' }] },
        { label: 'Alignment & fine-tuning (2022–2023)', items: [{ n: 'InstructGPT (Ouyang et al.)', t: '◆' }, { n: 'Constitutional AI (Bai et al.)', t: '◆' }, { n: 'LoRA (Hu et al.)', t: '◆' }] },
        { label: 'Frontier understanding', items: [{ n: 'Residual Networks (He et al.)', t: '◆' }, { n: 'ML Technical Debt (Sculley et al.)', t: '◆' }, { n: 'Dropout (Srivastava et al.)', t: '◆' }, { n: 'Adam (Kingma & Ba)', t: '◆' }] }
      ]
    },
    nlp: {
      primary: 'Stanford CS224n + HuggingFace NLP Course',
      note: 'Build from classical NLP through transformers to LLM fine-tuning.',
      steps: [
        { label: 'Course foundation', items: [{ n: 'Stanford CS224n — NLP with Deep Learning', t: '◇' }, { n: 'HuggingFace NLP Course', t: '◇' }] },
        { label: 'Build from scratch', items: [{ n: 'Let\'s build GPT from scratch — Andrej Karpathy', t: '▶' }, { n: 'Build a Large Language Model (Sebastian Raschka)', t: '⊡' }] },
        { label: 'Fine-tuning & alignment', items: [{ n: 'HuggingFace Transformers Docs + PEFT', t: '◎' }, { n: 'LoRA Paper', t: '◆' }, { n: 'Stanford CS336 — LLM Bootcamp', t: '◇' }] },
        { label: 'Reference', items: [{ n: 'BERT Paper', t: '◆' }, { n: 'GPT-3 Paper', t: '◆' }, { n: 'Constitutional AI Paper', t: '◆' }] }
      ]
    },
    cv: {
      primary: 'Stanford CS231n',
      note: 'Start with CNNs, then move to modern transformer-based vision.',
      steps: [
        { label: 'Core course', items: [{ n: 'Stanford CS231n — CNNs for Visual Recognition', t: '◇' }] },
        { label: 'Build understanding', items: [{ n: 'ResNet Paper (He et al.)', t: '◆' }, { n: 'Vision Transformer (ViT) Paper (Dosovitskiy et al.)', t: '◆' }] },
        { label: 'Modern systems', items: [{ n: 'Segment Anything (SAM) — Meta AI', t: '◆' }, { n: 'YOLO — Real-Time Object Detection', t: '◆' }, { n: 'PyTorch Image Models (timm)', t: '⊞' }] }
      ]
    },
    rl: {
      primary: 'David Silver RL Course (DeepMind / YouTube)',
      note: 'RL has steep prerequisites — ensure you have strong probability and DL first.',
      steps: [
        { label: 'Core course', items: [{ n: 'David Silver — Reinforcement Learning (DeepMind)', t: '▶' }] },
        { label: 'Textbook', items: [{ n: 'Sutton & Barto — Reinforcement Learning: An Introduction', t: '⊡' }] },
        { label: 'Key papers', items: [{ n: 'DQN — Playing Atari with Deep RL (Mnih et al.)', t: '◆' }, { n: 'PPO — Proximal Policy Optimization (Schulman et al.)', t: '◆' }] },
        { label: 'Practice', items: [{ n: 'HuggingFace Deep RL Course', t: '◇' }, { n: 'OpenAI Gym / Farama Gymnasium', t: '⊞' }] }
      ]
    },
    genai: {
      primary: 'HuggingFace Diffusion Models Course',
      note: 'Generative AI builds on deep learning fundamentals. Complete Stage 3 first.',
      steps: [
        { label: 'Course', items: [{ n: 'HuggingFace Diffusion Models Course', t: '◇' }, { n: 'MIT Flow Matching & Diffusion Models (2026)', t: '◇' }] },
        { label: 'Theory deep-dive', items: [{ n: 'What are Diffusion Models? — Lilian Weng', t: '◎' }, { n: 'The Annotated Diffusion Model — Hugging Face', t: '◎' }] },
        { label: 'Key papers', items: [{ n: 'DDPM (Ho et al., 2020)', t: '◆' }, { n: 'Latent Diffusion / Stable Diffusion (Rombach et al.)', t: '◆' }, { n: 'DiT — Diffusion Transformers (Peebles & Xie)', t: '◆' }] },
        { label: 'Build from scratch', items: [{ n: 'Diffusion 101 — PyTorch Implementation', t: '⊞' }, { n: 'HuggingFace Diffusers Library', t: '⊞' }] }
      ]
    },
    repos: {
      primary: 'micrograd + Let\'s build GPT (Andrej Karpathy)',
      note: 'These repos let you build neural networks from scratch. Run the code, break it, fix it.',
      steps: [
        { label: 'Build a neural net from scratch', items: [{ n: 'micrograd — Karpathy', t: '⊞' }, { n: 'nn-zero-to-hero — Karpathy', t: '⊞' }] },
        { label: 'Language modeling from scratch', items: [{ n: 'makemore — Karpathy', t: '⊞' }, { n: 'Let\'s build GPT — Karpathy', t: '⊞' }] },
        { label: 'Implement ML algorithms', items: [{ n: 'ML-From-Scratch', t: '⊞' }, { n: 'Made With ML — Goku Mohandas', t: '⊞' }] },
        { label: 'Production & research', items: [{ n: 'LLaMA 3 — Meta', t: '⊞' }, { n: 'Transformers — HuggingFace', t: '⊞' }] }
      ]
    },
    mlops: {
      primary: 'Made With ML (Goku Mohandas)',
      note: 'MLOps is about reliability and reproducibility. Learn it after you have shipped at least one model.',
      steps: [
        { label: 'Course', items: [{ n: 'Made With ML — Goku Mohandas', t: '◇' }, { n: 'Full Stack Deep Learning — UC Berkeley', t: '◇' }] },
        { label: 'Books', items: [{ n: 'Designing Machine Learning Systems (Chip Huyen)', t: '⊡' }, { n: 'Machine Learning Engineering (Andriy Burkov)', t: '⊡' }] },
        { label: 'Tools & practice', items: [{ n: 'Weights & Biases Documentation', t: '◎' }, { n: 'MLflow Documentation', t: '◎' }, { n: 'FastAPI for Model Serving', t: '⊞' }] },
        { label: 'Key paper', items: [{ n: 'ML Technical Debt (Sculley et al., Google)', t: '◆' }] }
      ]
    },
    research: {
      primary: 'PapersWithCode + Connected Papers',
      note: 'Reading papers is a skill. Use the three-pass method: abstract → figures → full read.',
      steps: [
        { label: 'Discovery tools', items: [{ n: 'Papers With Code', t: '◎' }, { n: 'HuggingFace Daily Papers', t: '◎' }, { n: 'Connected Papers', t: '◎' }, { n: 'Semantic Scholar', t: '◎' }] },
        { label: 'Reading method', items: [{ n: 'How to Read a Paper (Keshav)', t: '◆' }] }
      ]
    },
    blogs: {
      primary: 'The Batch (DeepLearning.AI) — weekly must-read',
      note: 'Set up a weekly reading habit. These are the highest-signal sources in the field.',
      steps: [
        { label: 'Weekly must-reads', items: [{ n: 'The Batch — DeepLearning.AI', t: '◎' }, { n: 'TLDR AI — 5-min daily digest', t: '◎' }] },
        { label: 'Deep technical dives', items: [{ n: 'Ahead of AI — Sebastian Raschka', t: '◎' }, { n: 'Lilian Weng\'s Blog', t: '◎' }, { n: 'Jay Alammar\'s Visual Explanations', t: '◎' }] },
        { label: 'Research & analysis', items: [{ n: 'Import AI — Jack Clark', t: '◎' }, { n: 'distill.pub — Interactive Research', t: '◎' }] }
      ]
    },
    frontier: {
      primary: 'AI Index Report (Stanford HAI) + arXiv cs.LG',
      note: 'Stay current by reading one paper and one newsletter per week.',
      steps: [
        { label: 'Big picture', items: [{ n: 'Stanford HAI 2026 AI Index Report', t: '◎' }] },
        { label: 'Courses to broaden', items: [{ n: 'fast.ai — Practical Deep Learning', t: '◇' }, { n: 'MIT 6.S191 — Intro to Deep Learning', t: '◇' }, { n: 'DeepLearning.AI Short Courses', t: '◇' }] },
        { label: 'Papers to read', items: [{ n: 'Scaling Laws (Kaplan et al.)', t: '◆' }, { n: 'Chinchilla (Hoffmann et al.)', t: '◆' }] },
        { label: 'Stay updated', items: [{ n: 'arXiv cs.LG / cs.AI / cs.CL', t: '◎' }, { n: 'HuggingFace Daily Papers', t: '◎' }] }
      ]
    }
  };

  const catalog = [];

  // ─── Collect resources from PHASES and map to categories ───
  function catOf(p, t, resKey) {
    const pk = p.key;
    if (resKey === 'papers') return 'papers';
    if (resKey === 'repos') return 'repos';
    const topicTitle = (t && t.title) || '';
    if (pk === 'python') return 'prog';
    if (pk === 'math') return 'math';
    if (pk === 'classical') return 'cml';
    if (pk === 'fp') return 'dlcore';
    if (pk === 'dl') {
      if (topicTitle.includes('CNN') || topicTitle.includes('Convolution')) return 'cv';
      if (topicTitle.includes('Sequence')) return 'nlp';
      return 'dlcore';
    }
    if (pk === 'spec') {
      if (topicTitle.includes('Vision') || topicTitle.includes('CV')) return 'cv';
      if (topicTitle.includes('NLP') || topicTitle.includes('Language')) return 'nlp';
      if (topicTitle.includes('Reinforcement')) return 'rl';
      return 'dlcore';
    }
    if (pk === 'llms') return 'nlp';
    if (pk === 'mlops') return 'mlops';
    return 'frontier';
  }

  PHASES.forEach((p) => {
    (p.topics || []).forEach((t) => {
      if (t.course) catalog.push({ cat: catOf(p, t, 'course'), rtype: 'course', p, t, data: t.course, badge: '<span class="badge-free">◇ Course</span>' });
      (t.youtube || []).forEach((y) => catalog.push({ cat: catOf(p, t, 'youtube'), rtype: 'youtube', p, t, data: y, badge: '<span class="badge-paid" style="background:rgba(255,0,0,0.15);color:#ff6b6b;">▶ YouTube</span>' }));
      (t.books || []).forEach((b) => catalog.push({ cat: catOf(p, t, 'books'), rtype: 'books', p, t, data: b, badge: b.free ? '<span class="badge-free">⊡ Free PDF</span>' : '<span class="badge-paid">⊡ Book</span>' }));
      (t.papers || []).forEach((pp) => catalog.push({ cat: 'papers', rtype: 'papers', p, t, data: pp, badge: '<span class="badge-paid" style="background:rgba(255,255,255,0.05);color:#ccc;">◆ Paper</span>' }));
      (t.repos || []).forEach((r) => catalog.push({ cat: 'repos', rtype: 'repos', p, t, data: r, badge: '<span class="badge-paid" style="background:rgba(255,255,255,0.05);color:#ccc;">⊞ Repo</span>' }));
      (t.websites || []).forEach((w) => catalog.push({ cat: catOf(p, t, 'websites'), rtype: 'websites', p, t, data: w, badge: '<span class="badge-paid" style="background:rgba(255,255,255,0.05);color:#ccc;">◎ Link</span>' }));
    });
  });

  // ─── Map Updates data into catalog ───
  UPDATES.forEach((sec) => {
    const isBlog = sec.cat.includes('Newsletters') || sec.cat.includes('Blogs');
    const isResearch = sec.cat.includes('Paper Discovery');
    sec.items.forEach((item) => {
      const c = isBlog ? 'blogs' : isResearch ? 'research' : 'frontier';
      catalog.push({ cat: c, rtype: 'websites', p: null, t: null, data: item, badge: '<span class="badge-paid" style="background:rgba(255,255,255,0.05);color:#ccc;">◎ Link</span>' });
    });
  });

  // ─── Extra curated resources for gaps ───
  const extras = [
    // Generative AI
    { cat: 'genai', rtype: 'course', title: 'HuggingFace Diffusion Models Course', auth: 'Hugging Face', desc: 'Free course on diffusion models — theory, fine-tuning, Stable Diffusion, and building from scratch with the Diffusers library.', badge: '<span class="badge-free">◇ Course</span>', url: 'https://huggingface.co/learn/diffusion-course/' },
    { cat: 'genai', rtype: 'course', title: 'MIT Flow Matching & Diffusion Models', auth: 'MIT CSAIL', desc: '2026 course on diffusion and flow models. Build a latent diffusion model from scratch. Covers SDEs, score matching, classifier-free guidance, DiT.', badge: '<span class="badge-free">◇ Course</span>', url: 'https://diffusion.csail.mit.edu/2026/' },
    { cat: 'genai', rtype: 'websites', title: 'What are Diffusion Models? — Lilian Weng', auth: 'Lilian Weng / OpenAI', desc: 'Comprehensive blog post covering DDPM, DDIM, score matching, SDEs, and guidance — the canonical reference for diffusion model theory.', badge: '<span class="badge-paid" style="background:rgba(255,255,255,0.05);color:#ccc;">◎ Link</span>', url: 'https://lilianweng.github.io/posts/2021-07-11-diffusion-models/' },
    { cat: 'genai', rtype: 'papers', title: 'DDPM — Denoising Diffusion Probabilistic Models', auth: 'Ho et al.', desc: 'The original DDPM paper. Introduced the diffusion process as a Markov chain and showed how to generate high-quality images by iteratively denoising Gaussian noise.', badge: '<span class="badge-paid" style="background:rgba(255,255,255,0.05);color:#ccc;">◆ Paper</span>', url: 'https://arxiv.org/abs/2006.11239' },
    { cat: 'genai', rtype: 'papers', title: 'High-Resolution Image Synthesis with Latent Diffusion Models', auth: 'Rombach et al. (Stability AI)', desc: 'The Stable Diffusion paper. Introduced latent diffusion — applying the diffusion process in a compressed latent space. The foundation of modern text-to-image.', badge: '<span class="badge-paid" style="background:rgba(255,255,255,0.05);color:#ccc;">◆ Paper</span>', url: 'https://arxiv.org/abs/2112.10752' },
    { cat: 'genai', rtype: 'repos', title: 'Diffusion 101 — Build from Scratch', auth: 'Cyr-Ch / GitHub', desc: 'Beginner-friendly guide to building and training diffusion models from scratch. Includes notebooks for DDIM, Heun, and DPM-Solver samplers with PyTorch.', badge: '<span class="badge-paid" style="background:rgba(255,255,255,0.05);color:#ccc;">⊞ Repo</span>', url: 'https://github.com/Cyr-Ch/Diffusion-101' },
    { cat: 'genai', rtype: 'papers', title: 'Scalable Diffusion Models with Transformers (DiT)', auth: 'Peebles & Xie', desc: 'Replaces the U-Net backbone with a Vision Transformer for diffusion. Used in Stable Diffusion 3, Flux, Sora. The future of generative architecture.', badge: '<span class="badge-paid" style="background:rgba(255,255,255,0.05);color:#ccc;">◆ Paper</span>', url: 'https://arxiv.org/abs/2212.09748' },
    { cat: 'genai', rtype: 'websites', title: 'The Annotated Diffusion Model', auth: 'Hugging Face', desc: 'In-depth walk-through of DDPM code and theory with maths and code side-by-side. Links to all key papers for further reading.', badge: '<span class="badge-paid" style="background:rgba(255,255,255,0.05);color:#ccc;">◎ Link</span>', url: 'https://huggingface.co/blog/annotated-diffusion' },

    // Frontier & Breadth
    { cat: 'frontier', rtype: 'websites', title: 'Stanford HAI 2026 AI Index Report', auth: 'Stanford HAI', desc: 'The most comprehensive data-driven view of AI progress. Tracks technical progress, economic impact, policy, and societal implications annually.', badge: '<span class="badge-paid" style="background:rgba(255,255,255,0.05);color:#ccc;">◎ Link</span>', url: 'https://hai.stanford.edu/ai-index/2026-ai-index-report' },
    { cat: 'frontier', rtype: 'course', title: 'fast.ai — Practical Deep Learning for Coders', auth: 'Jeremy Howard', desc: 'Free, top-down course: practice first, theory second. Build production-grade models from lesson 1. Philosophy of teaching by doing.', badge: '<span class="badge-free">◇ Course</span>', url: 'https://course.fast.ai/' },
    { cat: 'frontier', rtype: 'course', title: 'MIT 6.S191 — Introduction to Deep Learning', auth: 'MIT', desc: 'MIT\'s free deep learning course updated annually. Covers foundations through latest research. Rigorous but accessible.', badge: '<span class="badge-free">◇ Course</span>', url: 'https://introtodeeplearning.com/' },
    { cat: 'frontier', rtype: 'course', title: 'DeepLearning.AI Short Courses', auth: 'DeepLearning.AI', desc: '1–2 hour hands-on courses on RAG, agents, fine-tuning, multimodal, safety. Free and built for practitioners.', badge: '<span class="badge-free">◇ Course</span>', url: 'https://learn.deeplearning.ai/' },
    { cat: 'frontier', rtype: 'websites', title: 'arXiv cs.LG / cs.AI / cs.CL', auth: 'arXiv', desc: 'The primary source for all AI research — new papers daily. Bookmark these three categories and check them weekly.', badge: '<span class="badge-paid" style="background:rgba(255,255,255,0.05);color:#ccc;">◎ Link</span>', url: 'https://arxiv.org/' },
    { cat: 'frontier', rtype: 'papers', title: 'Scaling Laws for Neural Language Models', auth: 'Kaplan et al. (OpenAI)', desc: 'Established the power-law scaling relationship between model size, data, and performance. The paper that shaped the LLM era.', badge: '<span class="badge-paid" style="background:rgba(255,255,255,0.05);color:#ccc;">◆ Paper</span>', url: 'https://arxiv.org/abs/2001.08361' },
    { cat: 'frontier', rtype: 'papers', title: 'Chinchilla — Training Compute-Optimal LLMs', auth: 'Hoffmann et al. (DeepMind)', desc: 'Showed most models are undertrained — for optimal performance, model size and training data should scale equally. Changed how everyone trains LLMs.', badge: '<span class="badge-paid" style="background:rgba(255,255,255,0.05);color:#ccc;">◆ Paper</span>', url: 'https://arxiv.org/abs/2203.15556' },

    // CV extra
    { cat: 'cv', rtype: 'papers', title: 'Vision Transformer (ViT) Paper', auth: 'Dosovitskiy et al. (Google)', desc: 'Applied Transformer architecture directly to image patches. Proved CNNs are not necessary for vision. The foundation of modern CV.', badge: '<span class="badge-paid" style="background:rgba(255,255,255,0.05);color:#ccc;">◆ Paper</span>', url: 'https://arxiv.org/abs/2010.11929' },
    { cat: 'cv', rtype: 'papers', title: 'Segment Anything (SAM)', auth: 'Meta AI', desc: 'A foundation model for image segmentation. Zero-shot segmentation of any object. One of the most impactful CV projects of recent years.', badge: '<span class="badge-paid" style="background:rgba(255,255,255,0.05);color:#ccc;">◆ Paper</span>', url: 'https://arxiv.org/abs/2304.02643' },

    // RL extra
    { cat: 'rl', rtype: 'papers', title: 'Playing Atari with Deep RL (DQN)', auth: 'Mnih et al. (DeepMind)', desc: 'The paper that started deep reinforcement learning. First algorithm to learn to play Atari games directly from pixels using a DQN.', badge: '<span class="badge-paid" style="background:rgba(255,255,255,0.05);color:#ccc;">◆ Paper</span>', url: 'https://arxiv.org/abs/1312.5602' },
    { cat: 'rl', rtype: 'papers', title: 'Proximal Policy Optimization (PPO)', auth: 'Schulman et al. (OpenAI)', desc: 'The default RL algorithm used in RLHF and many production systems. Simple, stable, and sample-efficient.', badge: '<span class="badge-paid" style="background:rgba(255,255,255,0.05);color:#ccc;">◆ Paper</span>', url: 'https://arxiv.org/abs/1707.06347' },

    // NLP extra
    { cat: 'nlp', rtype: 'papers', title: 'BERT — Pre-training of Deep Bidirectional Transformers', auth: 'Devlin et al. (Google)', desc: 'Introduced masked language modeling and next-sentence prediction. The foundational paper for bidirectional encoder models.', badge: '<span class="badge-paid" style="background:rgba(255,255,255,0.05);color:#ccc;">◆ Paper</span>', url: 'https://arxiv.org/abs/1810.04805' },
    { cat: 'nlp', rtype: 'papers', title: 'Constitutional AI', auth: 'Bai et al. (Anthropic)', desc: 'A method for training harmless AI assistants using self-supervision instead of human feedback alone. Key alignment technique.', badge: '<span class="badge-paid" style="background:rgba(255,255,255,0.05);color:#ccc;">◆ Paper</span>', url: 'https://arxiv.org/abs/2212.08073' },

    // MLOps extra
    { cat: 'mlops', rtype: 'websites', title: 'Weights & Biases Documentation', auth: 'Weights & Biases', desc: 'Industry-standard experiment tracking, dataset versioning, and model registry. The most widely used MLOps platform in production.', badge: '<span class="badge-paid" style="background:rgba(255,255,255,0.05);color:#ccc;">◎ Link</span>', url: 'https://docs.wandb.ai/' },
    { cat: 'mlops', rtype: 'books', title: 'Designing Machine Learning Systems', auth: 'Chip Huyen', desc: 'The definitive book on ML system design. Covers data engineering, feature stores, monitoring, and production architecture patterns.', badge: '<span class="badge-paid">⊡ Book</span>', url: 'https://www.oreilly.com/library/view/designing-machine-learning/9781098107956/' },
  ];

  extras.forEach((e) => catalog.push({
    cat: e.cat, rtype: e.rtype, p: null, t: null,
    data: { name: e.title, provider: e.auth, desc: e.desc, url: e.url, _badge: e.badge },
    badge: e.badge
  }));

  // ─── Render ───
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
    <div class="phase-purpose">Every resource across all 8 phases — organized by topic area with the sequence to follow. Click any card to see details.</div>
  </div>

  <div class="filter-bar">
    <button class="filter-btn ${resourceFilter === 'all' ? 'active' : ''}" onclick="setResourceFilter('all')">All</button>
    ${CATS.map(c => `<button class="filter-btn ${resourceFilter === c.k ? 'active' : ''}" onclick="setResourceFilter('${c.k}')">${c.l}</button>`).join('')}
  </div>`;

  const activeCats = resourceFilter === 'all' ? CATS : CATS.filter(c => c.k === resourceFilter);

  activeCats.forEach((cat) => {
    let items = catalog.filter(x => x.cat === cat.k);
    if (!items.length) return;

    // Apply sub-filter (resource type) when in a specific category
    if (resourceFilter !== 'all' && resourceSubFilter !== 'all') {
      items = items.filter(x => x.rtype === resourceSubFilter);
    }
    if (!items.length) return;

    const combined = resourceFilter === 'all'
      ? cat.l + ' <span style="color:var(--text-muted);font-weight:400;font-size:13px;">(' + items.length + ')</span>'
      : cat.l;

    h += `<div style="margin-top: 32px;">
      <div class="section-title"><span>${combined}</span></div>`;

    // Learning sequence (only when viewing a single category)
    if (resourceFilter !== 'all' && SEQUENCES[cat.k]) {
      const seq = SEQUENCES[cat.k];
      h += `<div style="margin-bottom:20px;padding:16px 20px;border:1px solid rgba(255,255,255,0.08);border-radius:8px;background:rgba(255,255,255,0.02);">
        <div style="display:flex;align-items:center;gap:8px;margin-bottom:12px;">
          <span style="font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;color:var(--text-muted);">Learning Sequence</span>
          <span style="font-size:11px;color:var(--text-muted);">·</span>
          <span style="font-size:11px;color:var(--text-link);">Start with</span>
          <span style="font-size:12px;font-weight:600;color:var(--text-primary);">${seq.primary}</span>
        </div>
        <div style="font-size:12px;color:var(--text-muted);margin-bottom:14px;padding:8px 12px;background:rgba(255,255,255,0.03);border-radius:6px;border-left:2px solid rgba(255,255,255,0.1);">${seq.note}</div>
        <div style="display:flex;flex-direction:column;gap:10px;">
          ${seq.steps.map((step, si) => `<div style="display:flex;gap:12px;">
            <div style="display:flex;flex-direction:column;align-items:center;gap:2px;">
              <div style="width:22px;height:22px;border-radius:50%;background:rgba(255,255,255,0.08);display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:600;color:var(--text-secondary);flex-shrink:0;">${si + 1}</div>
              ${si < seq.steps.length - 1 ? '<div style="width:1px;flex:1;background:rgba(255,255,255,0.06);"></div>' : ''}
            </div>
            <div style="flex:1;padding-bottom:${si < seq.steps.length - 1 ? '10px' : '0'};">
              <div style="font-size:12px;font-weight:500;color:var(--text-secondary);margin-bottom:6px;">${step.label}</div>
              <div style="display:flex;flex-wrap:wrap;gap:6px;">
                ${step.items.map(item => `<a href="${item.u || '#'}" target="_blank" rel="noopener" style="display:inline-flex;align-items:center;gap:4px;padding:4px 10px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.06);border-radius:5px;font-size:11px;color:var(--text-primary);text-decoration:none;transition:all 0.2s;" onmouseover="this.style.background='rgba(255,255,255,0.08)'" onmouseout="this.style.background='rgba(255,255,255,0.04)'"><span style="opacity:0.6;">${item.t}</span> ${item.n}</a>`).join('')}
              </div>
            </div>
          </div>`).join('')}
        </div>
      </div>`;
    }

    // Sub-filter buttons (only when viewing a single category)
    if (resourceFilter !== 'all') {
      const rtypes = [
        { k: 'all', l: 'All' },
        { k: 'course', l: 'Courses' },
        { k: 'youtube', l: 'YouTube' },
        { k: 'books', l: 'Books' },
        { k: 'papers', l: 'Papers' },
        { k: 'repos', l: 'Repos' },
        { k: 'websites', l: 'Websites' }
      ];
      h += `<div class="filter-bar" style="margin-bottom:16px;">
        ${rtypes.map(rt => `<button class="filter-btn ${resourceSubFilter === rt.k ? 'active' : ''}" onclick="setResourceSubFilter('${rt.k}')" style="flex:1;padding:6px 8px;font-size:11px;">${rt.l}</button>`).join('')}
      </div>`;
    }

    h += `<div class="grid-1">`;

    items.forEach((item) => {
      const d = item.data;
      const title = d.name || d.n || d.t || '';
      const author = d.provider || d.s || d.a || '';
      const desc = d.desc || d.d || '';
      const phaseLabel = item.p ? (item.p.stage + ' \u2014 ' + item.p.label) : null;
      const topicLabel = item.t ? item.t.title : null;
      const url = d.url || '';

      h += `<div class="card" style="margin-bottom:0;${url ? 'cursor:pointer;' : ''}" ${url ? `onclick="window.open('${url.replace(/'/g, "\\'")}','_blank')"` : ''}>
        <div class="flex-between" style="margin-bottom:6px;">
          <span class="card-title">${title}</span>
          ${item.badge}
        </div>`;

      if (author) h += `<div class="author-text" style="margin-bottom:4px;">${author}</div>`;
      if (phaseLabel) {
        h += `<div style="font-size:11px;color:var(--text-muted);margin-bottom:8px;">
          <span style="background:rgba(255,255,255,0.04);padding:2px 8px;border-radius:4px;">${phaseLabel}</span>`;
        if (topicLabel) h += `<span style="background:rgba(255,255,255,0.04);padding:2px 8px;border-radius:4px;margin-left:4px;">${topicLabel}</span>`;
        h += `</div>`;
      }
      h += `<p class="text-sm">${desc}</p>
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
