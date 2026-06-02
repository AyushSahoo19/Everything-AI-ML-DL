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
      note: 'Build mathematical intuition first, then layer on formalism. Start with the visual series, then take a structured course, and keep the references handy.',
      steps: [
        { label: 'Build intuition', items: [
          { n: 'Essence of Linear Algebra — 3Blue1Brown', u: 'https://youtube.com/playlist?list=PLZHQObOWTQDPD3MizzM2xVFitgF8hE_ab', d: 'Best visual foundation for vectors, matrices, and transformations. Watch this before any textbook to build lasting intuition.' },
          { n: 'Essence of Calculus — 3Blue1Brown', u: 'https://youtube.com/playlist?list=PLZHQObOWTQDMsr9K-rj53DwVRMYO3t5Yr', d: 'Visual understanding of derivatives and integrals — essential for grasping backpropagation and gradient-based optimization.' }
        ]},
        { label: 'Structured course', items: [
          { n: 'Mathematics for ML — Imperial College (Coursera)', d: 'Bridges high school math to ML-grade linear algebra, calculus, and statistics. Structured and practically focused.' },
          { n: 'Probabilistic ML — Duke (Coursera)', d: 'Covers probability foundations needed for Bayesian reasoning, uncertainty estimation, and generative modeling.' }
        ]},
        { label: 'Read & reference', items: [
          { n: 'Matrix Calculus for Deep Learning (Parr & Howard)', d: 'Concise reference connecting matrix derivatives directly to neural network training. Essential for reading ML papers.' },
          { n: 'Seeing Theory — Brown University', d: 'Interactive visualizations that make probability concepts intuitive before diving into heavy mathematical notation.' },
          { n: 'StatQuest — Statistics Fundamentals', d: 'Friendly, memorable explanations of statistical concepts. Perfect for quick reinforcement when you encounter unfamiliar terms.' }
        ]}
      ]
    },
    prog: {
      primary: 'CS50P (Harvard) + Python Data Science Handbook',
      note: 'Master Python, NumPy, Pandas, and Matplotlib — these are prerequisites for everything that follows. Write code daily.',
      steps: [
        { label: 'Python fundamentals', items: [
          { n: 'CS50P — Harvard (edX)', d: 'Harvard\'s rigorous Python introduction. Teaches computational thinking alongside syntax — builds deeper fundamentals than most Python courses.' },
          { n: 'Automate the Boring Stuff (Al Sweigart)', d: 'Learn Python through practical automation projects. Keeps motivation high while you build real programming fluency.' }
        ]},
        { label: 'Numerical computing', items: [
          { n: 'NumPy Crash Course — freeCodeCamp', d: 'Fast, hands-on NumPy intro. This library is the foundation of all numerical computing in ML — master it early.' },
          { n: 'Python Data Science Handbook (VanderPlas) — NumPy', d: 'Comprehensive NumPy reference with practical data science patterns. Keep this as your desk companion throughout the journey.' }
        ]},
        { label: 'Data wrangling & viz', items: [
          { n: 'Kaggle Pandas Course', d: 'Learn data manipulation through small, focused exercises. Fastest way to become productive with DataFrames.' },
          { n: 'Keith Galli Pandas Tutorial', d: 'Real-world dataset walkthroughs that build practical data wrangling skills. See exactly how professionals clean and transform data.' },
          { n: 'Corey Schafer Matplotlib Tutorial', d: 'Clear, methodical Matplotlib tutorials — the gold standard for Python visualization instruction. Covers everything from basics to advanced plots.' },
          { n: 'Seaborn Gallery', d: 'Visual reference for statistical plots. Steal good design ideas for your own data exploration and presentation.' }
        ]}
      ]
    },
    cml: {
      primary: 'Andrew Ng ML Specialization (Coursera)',
      note: 'This is the most important phase of your entire ML journey. Do not rush it — complete every assignment and understand the math behind each algorithm.',
      steps: [
        { label: 'Core course', items: [
          { n: 'Machine Learning Specialization — Andrew Ng (Coursera)', d: 'The definitive ML course. Explains algorithms, bias-variance tradeoffs, and evaluation with unmatched clarity. Complete every lab.' }
        ]},
        { label: 'Deepen with textbook', items: [
          { n: 'ISLP — Introduction to Statistical Learning (James, Witten, Hastie, Tibshirani)', d: 'The most accessible rigorous ML textbook. Bridges math and application — read it alongside the course for deeper understanding.' }
        ]},
        { label: 'Practice', items: [
          { n: 'Hands-On Machine Learning (Geron)', d: 'Practical end-to-end ML projects with Scikit-Learn. Write real code from chapter one — this is how you internalize the theory.' },
          { n: 'Scikit-Learn Documentation Guide', d: 'Official docs with best practices, examples, and pipeline patterns. You will reference this daily when building ML systems.' },
          { n: 'ML-From-Scratch', d: 'NumPy implementations of 30+ ML algorithms. Removing framework abstractions deepens your understanding of every model.' }
        ]},
        { label: 'Advanced topics', items: [
          { n: 'XGBoost Paper (Chen & Guestrin)', d: 'Behind every Kaggle winner. Understanding gradient boosting at this level teaches you ensemble theory, regularization, and optimization.' },
          { n: 'Random Forests Paper (Breiman)', d: 'Foundational ensemble method from one of ML\'s pioneers. Essential for understanding how bagging reduces variance and improves stability.' }
        ]}
      ]
    },
    dlcore: {
      primary: 'Deep Learning Specialization (Andrew Ng)',
      note: 'Understand neural network internals before using high-level frameworks. Build from first principles.',
      steps: [
        { label: 'Foundations', items: [
          { n: 'Deep Learning Specialization — Andrew Ng (Coursera)', d: 'Systematic foundation covering architectures, hyperparameters, regularization, and optimization. The canonical DL starting point.' },
          { n: 'Neural Networks & Deep Learning (Michael Nielsen)', d: 'Interactive, code-first approach. You build a neural network from scratch — this is where everything clicks.' }
        ]},
        { label: 'Visual intuition', items: [
          { n: 'Neural Networks — 3Blue1Brown', d: 'The best visual explanation of what neural networks actually compute. Watch before and after the course — you will notice new details each time.' },
          { n: 'Backpropagation Calculus — 3Blue1Brown', d: 'See exactly how gradients flow through a network step by step. Demystifies the single most important algorithm in deep learning.' }
        ]},
        { label: 'Architectures', items: [
          { n: 'Stanford CS231n — CNNs for Visual Recognition', d: 'The definitive CNN course. From image classification through detection, segmentation, and modern architectures with rigorous assignments.' },
          { n: 'Stanford CS224n — NLP with Deep Learning', d: 'The standard NLP course covering RNNs, attention mechanisms, and Transformers. Invaluable for understanding sequence modeling.' }
        ]},
        { label: 'Key papers', items: [
          { n: 'Dropout Paper (Srivastava et al.)', d: 'Elegant regularization that prevents co-adaptation of neurons. A core technique for training deep networks without overfitting.' },
          { n: 'Adam Paper (Kingma & Ba)', d: 'The default optimizer in modern deep learning. Understanding adaptive learning rates is essential for efficient training.' },
          { n: 'ResNet Paper (He et al.)', d: 'Skip connections that made training very deep networks possible. This single idea reshaped nearly every architecture that followed.' }
        ]}
      ]
    },
    papers: {
      primary: 'Attention Is All You Need (Vaswani et al., 2017)',
      note: 'Start here, then follow the citation chain forward and backward. Read in chronological order to see how ideas built on each other.',
      steps: [
        { label: 'The Transformer era (2017-2018)', items: [
          { n: 'Attention Is All You Need (Vaswani et al.)', d: 'The most important ML paper of the decade. Introduced the Transformer architecture that powers every major AI system today.' },
          { n: 'BERT (Devlin et al.)', d: 'Introduced bidirectional pre-training for language understanding. Foundational for encoder models and transfer learning in NLP.' }
        ]},
        { label: 'Scaling & few-shot (2020-2022)', items: [
          { n: 'GPT-3 — Language Models are Few-Shot Learners', d: 'Established scaling laws and in-context learning. Shaped the modern understanding of emergent capabilities in large models.' },
          { n: 'Scaling Laws (Kaplan et al.)', d: 'Showed performance follows predictable power-law scaling with compute, data, and parameters. Guides every major training decision.' },
          { n: 'Chinchilla (Hoffmann et al.)', d: 'Proved most LLMs are undertrained — for optimal performance, scale model and data proportionally. Changed how the field trains.' }
        ]},
        { label: 'Alignment & fine-tuning (2022-2023)', items: [
          { n: 'InstructGPT (Ouyang et al.)', d: 'Introduced RLHF for aligning language models with human preferences. The technique behind ChatGPT\'s helpful and safe behavior.' },
          { n: 'Constitutional AI (Bai et al.)', d: 'Alignment without human labels — uses self-supervision and principles. Key technique for scalable AI safety.' },
          { n: 'LoRA (Hu et al.)', d: 'Parameter-efficient fine-tuning that made adapting large models practical. The standard method for customizing LLMs.' }
        ]},
        { label: 'Frontier understanding', items: [
          { n: 'Residual Networks (He et al.)', d: 'Skip connections explained from first principles. This architectural pattern appears in nearly every modern deep network.' },
          { n: 'ML Technical Debt (Sculley et al.)', d: 'Essential reading on hidden maintenance costs of ML systems. Shapes how you think about production engineering from day one.' },
          { n: 'Dropout (Srivastava et al.)', d: 'A simple, remarkably effective regularization technique. Understanding it teaches broader principles of preventing overfitting.' },
          { n: 'Adam (Kingma & Ba)', d: 'Adaptive moment estimation — the optimizer you will use most. Understanding its mechanics helps debug training failures.' }
        ]}
      ]
    },
    nlp: {
      primary: 'Stanford CS224n + HuggingFace NLP Course',
      note: 'Build from classical sequence models through transformers to LLM fine-tuning. Implement what you learn.',
      steps: [
        { label: 'Course foundation', items: [
          { n: 'Stanford CS224n — NLP with Deep Learning', d: 'Covers RNNs, attention, Transformers, and modern architectures with rigorous assignments. The gold standard NLP course.' },
          { n: 'HuggingFace NLP Course', d: 'Practical NLP using modern libraries — tokenization, training pipelines, and deployment. Bridges theory to production-ready code.' }
        ]},
        { label: 'Build from scratch', items: [
          { n: 'Let\'s build GPT from scratch — Andrej Karpathy', d: 'Implement a GPT from scratch in a single file. Unparalleled understanding of how Transformers actually generate text.' },
          { n: 'Build a Large Language Model (Sebastian Raschka)', d: 'Step-by-step LLM construction from tokenization to pretraining. Clear code examples make complex concepts concrete.' }
        ]},
        { label: 'Fine-tuning & alignment', items: [
          { n: 'HuggingFace Transformers Docs + PEFT', d: 'Practical reference for fine-tuning any Transformer. Parameter-efficient methods (LoRA, QLoRA) make customization feasible on consumer hardware.' },
          { n: 'LoRA Paper', d: 'Understanding LoRA deeply helps you choose the right rank, target modules, and hyperparameters for your fine-tuning tasks.' },
          { n: 'Stanford CS336 — LLM Bootcamp', d: 'Cutting-edge LLM training bootcamp covering alignment, evaluation, and deployment. Bridges research and production practice.' }
        ]},
        { label: 'Reference', items: [
          { n: 'BERT Paper', d: 'Essential for understanding encoder-only architectures and the impact of bidirectional pretraining on language understanding tasks.' },
          { n: 'GPT-3 Paper', d: 'The paper that defined the scaling paradigm. Understanding it is critical for grasping why and how large models work.' },
          { n: 'Constitutional AI Paper', d: 'Key alignment technique from Anthropic. Important for understanding the safety landscape beyond RLHF.' }
        ]}
      ]
    },
    cv: {
      primary: 'Stanford CS231n',
      note: 'Start with CNNs, understand their limitations, then move to transformer-based vision. Implement at least one architecture from scratch.',
      steps: [
        { label: 'Core course', items: [
          { n: 'Stanford CS231n — CNNs for Visual Recognition', d: 'The definitive CV course — covers image classification, detection, segmentation, and GANs with rigorous math and programming assignments.' }
        ]},
        { label: 'Build understanding', items: [
          { n: 'ResNet Paper (He et al.)', d: 'Skip connections are the most influential architectural innovation in CV. Understanding them is key to modern vision model design.' },
          { n: 'Vision Transformer (ViT) Paper (Dosovitskiy et al.)', d: 'Proved CNNs are not necessary for vision — pure Transformers on image patches achieve SOTA. A paradigm shift in CV architecture.' }
        ]},
        { label: 'Modern systems', items: [
          { n: 'Segment Anything (SAM) — Meta AI', d: 'Foundation model for segmentation with zero-shot generalization. Represents the shift toward general-purpose vision models.' },
          { n: 'YOLO — Real-Time Object Detection', d: 'The industry standard for real-time detection. Teaches you to balance speed, accuracy, and architectural efficiency.' },
          { n: 'PyTorch Image Models (timm)', d: 'Curated collection of SOTA vision models with pretrained weights. Invaluable for rapid prototyping and transfer learning.' }
        ]}
      ]
    },
    rl: {
      primary: 'David Silver RL Course (DeepMind / YouTube)',
      note: 'RL has steep prerequisites — ensure strong probability and deep learning fundamentals first. The math is non-negotiable here.',
      steps: [
        { label: 'Core course', items: [
          { n: 'David Silver — Reinforcement Learning (DeepMind)', d: 'The definitive RL course by DeepMind\'s lead. Rigorous, comprehensive, and directly from one of the field\'s principal contributors.' }
        ]},
        { label: 'Textbook', items: [
          { n: 'Sutton & Barto — Reinforcement Learning: An Introduction', d: 'The RL bible. Every algorithm from multi-armed bandits to policy gradients, presented with mathematical depth and clarity.' }
        ]},
        { label: 'Key papers', items: [
          { n: 'DQN — Playing Atari with Deep RL (Mnih et al.)', d: 'The paper that launched deep RL. First algorithm to learn directly from pixels — a landmark in combining deep learning with RL.' },
          { n: 'PPO — Proximal Policy Optimization (Schulman et al.)', d: 'The default RL algorithm in production systems and RLHF. Stable, simple, and sample-efficient — essential for modern RL work.' }
        ]},
        { label: 'Practice', items: [
          { n: 'HuggingFace Deep RL Course', d: 'Hands-on RL with practical implementations using Stable-Baselines3. Train agents in simulated environments and see algorithms in action.' },
          { n: 'OpenAI Gym / Farama Gymnasium', d: 'Standard RL benchmark environment suite. Essential for testing, comparing, and debugging RL algorithms in a consistent framework.' }
        ]}
      ]
    },
    genai: {
      primary: 'HuggingFace Diffusion Models Course',
      note: 'Generative AI builds directly on deep learning fundamentals. Complete Stage 3 (Deep Learning Core) first before diving here.',
      steps: [
        { label: 'Course', items: [
          { n: 'HuggingFace Diffusion Models Course', d: 'Practical training on diffusion models from theory to Stable Diffusion fine-tuning. The most hands-on path into generative AI.' },
          { n: 'MIT Flow Matching & Diffusion Models (2026)', d: '2026 cutting-edge course — build a latent diffusion model from scratch covering SDEs, score matching, classifier-free guidance, and DiT.' }
        ]},
        { label: 'Theory deep-dive', items: [
          { n: 'What are Diffusion Models? — Lilian Weng', d: 'Comprehensive survey covering DDPM, DDIM, score matching, and guidance. The canonical technical reference for diffusion math.' },
          { n: 'The Annotated Diffusion Model — Hugging Face', d: 'DDPM code and math presented side-by-side. Best way to understand implementation details before building your own.' }
        ]},
        { label: 'Key papers', items: [
          { n: 'DDPM (Ho et al., 2020)', d: 'The original denoising diffusion paper. Essential for understanding the Markov chain formulation and probabilistic foundation.' },
          { n: 'Latent Diffusion / Stable Diffusion (Rombach et al.)', d: 'Made diffusion practical by operating in latent space. The paper behind the generative AI explosion — efficiency meets quality.' },
          { n: 'DiT — Diffusion Transformers (Peebles & Xie)', d: 'Replaced U-Net with Transformers for diffusion. The architecture powering SD3, Flux, and Sora — the future of generative architecture.' }
        ]},
        { label: 'Build from scratch', items: [
          { n: 'Diffusion 101 — PyTorch Implementation', d: 'Beginner-friendly notebooks for DDIM, Heun, and DPM-Solver samplers. Build and train diffusion models from scratch with PyTorch.' },
          { n: 'HuggingFace Diffusers Library', d: 'Industry-standard library for inference and training of diffusion models. Essential toolkit for any generative AI project.' }
        ]}
      ]
    },
    repos: {
      primary: 'micrograd + Let\'s build GPT (Andrej Karpathy)',
      note: 'These repos let you build neural networks from absolute scratch. Run the code, break it, fix it — this is how you truly learn.',
      steps: [
        { label: 'Build a neural net from scratch', items: [
          { n: 'micrograd — Karpathy', d: 'A 100-line autograd engine. Build backpropagation from absolute zero — this is the single best way to truly understand how gradients work.' },
          { n: 'nn-zero-to-hero — Karpathy', d: 'Complete neural network implementation series progressing from tiny models to modern architectures with fully annotated code.' }
        ]},
        { label: 'Language modeling from scratch', items: [
          { n: 'makemore — Karpathy', d: 'Character-level language modeling implemented step by step. Perfect for understanding autoregressive generation and next-token prediction.' },
          { n: 'Let\'s build GPT — Karpathy', d: 'Build a GPT from scratch in one Python file. Unparalleled understanding of Transformers through hands-on implementation.' }
        ]},
        { label: 'Implement ML algorithms', items: [
          { n: 'ML-From-Scratch', d: 'NumPy implementations of 30+ ML algorithms. Remove framework abstractions to learn what each model actually computes under the hood.' },
          { n: 'Made With ML — Goku Mohandas', d: 'Full production ML project template with testing, CI/CD, and deployment best practices. Bridges the gap between notebooks and production.' }
        ]},
        { label: 'Production & research', items: [
          { n: 'LLaMA 3 — Meta', d: 'State-of-the-art open LLM. Study the architecture, training distribution, and inference optimizations of a production-grade model.' },
          { n: 'Transformers — HuggingFace', d: 'The industry-standard Transformers library with thousands of pretrained models. Essential toolkit for any NLP or multimodal project.' }
        ]}
      ]
    },
    mlops: {
      primary: 'Made With ML (Goku Mohandas)',
      note: 'MLOps is about reliability and reproducibility. Learn it after you have shipped at least one model end-to-end.',
      steps: [
        { label: 'Course', items: [
          { n: 'Made With ML — Goku Mohandas', d: 'Full-stack ML project tutorial covering version control, testing, CI/CD, and deployment. The most practical MLOps introduction available.' },
          { n: 'Full Stack Deep Learning — UC Berkeley', d: 'Production ML course covering deployment infrastructure, monitoring, data pipelines, and team workflows from experienced practitioners.' }
        ]},
        { label: 'Books', items: [
          { n: 'Designing Machine Learning Systems (Chip Huyen)', d: 'The definitive ML systems design book. Covers feature stores, data engineering, monitoring, and production architecture patterns in depth.' },
          { n: 'Machine Learning Engineering (Andriy Burkov)', d: 'Concise, practical guide to building reliable ML systems. Excellent reference for common production patterns and pitfalls.' }
        ]},
        { label: 'Tools & practice', items: [
          { n: 'Weights & Biases Documentation', d: 'Industry-standard experiment tracking, hyperparameter optimization, and model registry. Essential for reproducible ML research.' },
          { n: 'MLflow Documentation', d: 'Open-source ML lifecycle management covering experiment tracking, model packaging, and deployment. The most widely adopted MLOps framework.' },
          { n: 'FastAPI for Model Serving', d: 'High-performance Python API framework for serving ML models. The standard choice for production inference endpoints.' }
        ]},
        { label: 'Key paper', items: [
          { n: 'ML Technical Debt (Sculley et al., Google)', d: 'Essential reading on hidden maintenance costs of ML systems. Understanding these pitfalls shapes every production engineering decision.' }
        ]}
      ]
    },
    research: {
      primary: 'PapersWithCode + Connected Papers',
      note: 'Reading papers is a skill. Use the three-pass method: abstract and figures first, then full read. Build this habit early.',
      steps: [
        { label: 'Discovery tools', items: [
          { n: 'Papers With Code', d: 'Research papers with linked implementations. The fastest way to reproduce SOTA results and understand what each contribution actually does.' },
          { n: 'HuggingFace Daily Papers', d: 'Curated daily digest of the most impactful new ML research. Stay current without drowning in arXiv volume.' },
          { n: 'Connected Papers', d: 'Interactive graph exploring paper citations and related work. Discover the intellectual lineage of any research area visually.' },
          { n: 'Semantic Scholar', d: 'AI-powered academic search with structured metadata, citation graphs, and research summaries. Find relevant papers efficiently.' }
        ]},
        { label: 'Reading method', items: [
          { n: 'How to Read a Paper (Keshav)', d: 'The definitive three-pass method for efficient paper reading. Learn this systematic approach before tackling your first paper.' }
        ]}
      ]
    },
    blogs: {
      primary: 'The Batch (DeepLearning.AI) — weekly must-read',
      note: 'Set up a weekly reading habit. These are the highest-signal sources in the field — each one is carefully curated or written by leading researchers.',
      steps: [
        { label: 'Weekly must-reads', items: [
          { n: 'The Batch — DeepLearning.AI', d: 'Weekly curated AI news and breakthroughs from Andrew Ng\'s team. The most respected industry digest — read every Friday.' },
          { n: 'TLDR AI — 5-min daily digest', d: 'Five-minute daily AI news summary. Fastest way to stay informed without context switching or information overload.' }
        ]},
        { label: 'Deep technical dives', items: [
          { n: 'Ahead of AI — Sebastian Raschka', d: 'Deep technical posts on LLMs, transformers, and training methods from a leading researcher-practitioner. Each post is a mini-lesson.' },
          { n: 'Lilian Weng\'s Blog', d: 'Comprehensive survey-style blog posts that each function as a graduate-level lecture. The gold standard for ML technical writing.' },
          { n: 'Jay Alammar\'s Visual Explanations', d: 'The best visual explanations of Transformers, attention, and embeddings. Essential for conceptual understanding — share these with your study group.' }
        ]},
        { label: 'Research & analysis', items: [
          { n: 'Import AI — Jack Clark', d: 'Long-running newsletter analyzing AI policy, safety, hardware, and industry trends. Broadens perspective beyond just the technical.' },
          { n: 'distill.pub — Interactive Research', d: 'Interactive research articles with explorable explanations. The gold standard for communicating complex ML concepts clearly.' }
        ]}
      ]
    },
    frontier: {
      primary: 'AI Index Report (Stanford HAI) + arXiv cs.LG',
      note: 'Stay current by reading one paper and one newsletter per week. Breadth matters as much as depth at this stage.',
      steps: [
        { label: 'Big picture', items: [
          { n: 'Stanford HAI 2026 AI Index Report', d: 'The most comprehensive annual AI progress report tracking technical, economic, and policy dimensions. Essential for strategic perspective.' }
        ]},
        { label: 'Courses to broaden', items: [
          { n: 'fast.ai — Practical Deep Learning', d: 'Top-down teaching philosophy — build production models immediately, then layer theory. Reframes how you think about learning ML.' },
          { n: 'MIT 6.S191 — Introduction to Deep Learning', d: 'MIT\'s annually updated intro course covering latest research alongside foundations. Broad, rigorous, and current.' },
          { n: 'DeepLearning.AI Short Courses', d: 'Focused 1-2 hour courses on RAG, agents, fine-tuning, multimodal, and safety. Practical skill boosters from industry leaders.' }
        ]},
        { label: 'Papers to read', items: [
          { n: 'Scaling Laws (Kaplan et al.)', d: 'Understand the power-law relationships that govern model performance. These insights shape strategic decisions across the entire field.' },
          { n: 'Chinchilla (Hoffmann et al.)', d: 'Optimal compute allocation between model size and data. Essential for understanding why data quality matters as much as model scale.' }
        ]},
        { label: 'Stay updated', items: [
          { n: 'arXiv cs.LG / cs.AI / cs.CL', d: 'The primary ML research feed — new papers published daily. Bookmark these three categories and skim titles weekly.' },
          { n: 'HuggingFace Daily Papers', d: 'Curated daily selection of the most impactful new papers. Saves hours of arXiv browsing while keeping you at the frontier.' }
        ]}
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
      h += `<div class="seq-section">
        <div class="seq-header">
          <span class="seq-title">Learning Sequence</span>
          <span class="seq-flagship">${seq.primary}</span>
        </div>
        <div class="seq-steps">
            ${seq.steps.map((step, si) => `<div class="seq-step">
              <div class="seq-step-line">
                <span class="seq-step-num">${String(si + 1).padStart(2, '0')}</span>
                ${si < seq.steps.length - 1 ? '<div class="seq-step-connector"></div>' : ''}
              </div>
              <div class="seq-step-content">
                <div class="seq-step-label">${step.label}</div>
                <div class="seq-cards">
                  ${step.items.map(function(item) {
                    var cls = item.u ? ' seq-card-link' : '';
                    var click = item.u ? ' onclick="window.open(\'' + item.u.replace(/'/g, "\\'") + '\',\'_blank\')"' : '';
                    var html = '<div class="seq-card' + cls + '"' + click + '>' +
                      '<div class="seq-card-title">' + item.n + '</div>';
                    if (item.d) html += '<div class="seq-card-desc">' + item.d + '</div>';
                    html += '</div>';
                    return html;
                  }).join('')}
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
