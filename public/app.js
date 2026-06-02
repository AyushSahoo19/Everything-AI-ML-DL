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

function toggleSeqDropdown(el) {
  el.classList.toggle('seq-card-open');
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
        { label: 'Build intuition', items: [
          { n: 'Essence of Linear Algebra — 3Blue1Brown', u: 'https://youtube.com/playlist?list=PLZHQObOWTQDPD3MizzM2xVFitgF8hE_ab', a: 'Grant Sanderson (3Blue1Brown)', ty: 'YouTube', pr: 'Free', du: '~2 hrs (15 videos)', mo: 'M1 — Mathematics & Theory', d: 'Best visual foundation for vectors, matrices, and transformations — builds lasting geometric intuition for all of linear algebra.', cov: 'Vectors, linear combinations, spans, bases, linear transformations, matrix multiplication, determinants, eigenvectors and eigenvalues, abstract vector spaces.', ou: 'Every matrix operation, eigenvalue, and transformation will have a visual shape in your mind for life.', ti: 'Day 1. Before any textbook or course. Non-negotiable foundation.' },
          { n: 'Essence of Calculus — 3Blue1Brown', u: 'https://youtube.com/playlist?list=PLZHQObOWTQDMsr9K-rj53DwVRMYO3t5Yr', a: 'Grant Sanderson (3Blue1Brown)', ty: 'YouTube', pr: 'Free', du: '~2 hrs (12 videos)', mo: 'M1 — Mathematics & Theory', d: 'Visual understanding of derivatives and integrals — essential for grasping backpropagation and gradient-based optimization.', cov: 'Derivatives, chain rule, integrals, fundamental theorem of calculus, limits, Taylor series, connections between calculus and machine learning optimization.', ou: 'Derivatives and integrals become geometric intuition rather than symbol manipulation. Backpropagation will click naturally.', ti: 'Right after linear algebra. One weekend to change how you see calculus.' }
        ]},
        { label: 'Structured course', items: [
          { n: 'Mathematics for ML — Imperial College (Coursera)', u: 'https://www.coursera.org/specializations/mathematics-machine-learning', a: 'Imperial College London', ty: 'Course', pr: 'Free (audit)', du: '~25 hrs over 3 weeks', mo: 'M1 — Mathematics & Theory', d: 'Bridges high school math to ML-grade linear algebra, calculus, and statistics. Structured and practically focused.', cov: 'Linear algebra: vectors, matrices, PCA. Multivariate calculus: gradients, optimization. Probability: distributions, Bayes rule, estimation. All with ML context.', ou: 'Solid mathematical foundation to understand any ML paper or algorithm without getting lost in the notation.', ti: 'After building intuition with 3B1B. This formalizes what you saw visually.' },
          { n: 'Probabilistic ML — Duke (Coursera)', u: 'https://www.coursera.org/learn/machine-learning-duke/', a: 'Duke University', ty: 'Course', pr: 'Free (audit)', du: '~20 hrs over 4 weeks', mo: 'M1 — Mathematics & Theory', d: 'Covers probability foundations needed for Bayesian reasoning, uncertainty estimation, and generative modeling.', cov: 'Probability axioms, random variables, Bayes theorem, conjugate priors, Monte Carlo methods, Markov chains, Bayesian inference applications in ML.', ou: 'You will think in probabilities rather than point estimates — essential for Bayesian ML and generative models.', ti: 'After linear algebra and calculus courses. Probability is the language of uncertainty in ML.' }
        ]},
        { label: 'Read & reference', items: [
          { n: 'Matrix Calculus for Deep Learning (Parr & Howard)', u: 'https://arxiv.org/abs/1802.01528', a: 'Terence Parr & Jeremy Howard', ty: 'Paper', pr: 'Free', du: '~30 min read', mo: 'M1 — Mathematics & Theory', d: 'Concise reference connecting matrix derivatives directly to neural network training. Essential for reading ML papers.', cov: 'Scalar-to-vector derivatives, vector-to-vector derivatives, Jacobians, chain rule in matrix form, gradients of common neural network operations.', ou: 'Matrix calculus becomes a practical tool rather than abstract math. Read papers with confidence.', ti: 'Reference throughout the roadmap. Read once after the calculus course, revisit whenever confused by gradients in papers.' },
          { n: 'Seeing Theory — Brown University', u: 'https://seeing-theory.brown.edu/', a: 'Brown University', ty: 'Website', pr: 'Free', du: '~2 hrs interactive', mo: 'M1 — Mathematics & Theory', d: 'Interactive visualizations that make probability concepts intuitive before diving into heavy mathematical notation.', cov: 'Basic probability, compound probability, probability distributions, frequentist inference, Bayesian inference, regression analysis.', ou: 'Probability concepts stick through interaction rather than memorization. Great intuition builder.', ti: 'Before or alongside the probability course. Use as a warm-up for probabilistic thinking.' },
          { n: 'StatQuest — Statistics Fundamentals', u: 'https://youtube.com/playlist?list=PLblh5JKOoLUK0FLuzwntyYI10UQFUhsY9', a: 'Josh Starmer', ty: 'YouTube', pr: 'Free', du: '~4 hrs (20+ videos)', mo: 'M1 — Mathematics & Theory', d: 'Friendly, memorable explanations of statistical concepts. Perfect for quick reinforcement when you encounter unfamiliar terms.', cov: 'p-values, confidence intervals, hypothesis testing, regression, ANOVA, PCA, t-SNE, cross-validation, bias-variance tradeoff, decision trees.', ou: 'Statistics becomes approachable and memorable. Perfect reference whenever you hit a statistical term you do not fully understand.', ti: 'Bookmark early. Watch individual videos whenever you need clarity on a specific statistical concept throughout the roadmap.' }
        ]}
      ]
    },
    prog: {
      primary: 'CS50P (Harvard) + Python Data Science Handbook',
      note: 'Master Python, NumPy, Pandas, and Matplotlib — these are prerequisites for everything that follows. Write code daily.',
      steps: [
        { label: 'Python fundamentals', items: [
          { n: 'CS50P — Harvard (edX)', u: 'https://cs50.harvard.edu/python/', a: 'Harvard University', ty: 'Course', pr: 'Free (audit)', du: '~40 hrs over 4 weeks', mo: 'M0 — Programming & Engineering', d: 'Harvard\'s rigorous Python introduction. Teaches computational thinking alongside syntax — builds deeper fundamentals than most Python courses.', cov: 'Variables, conditionals, loops, functions, data structures, file I/O, exceptions, regular expressions, object-oriented programming, testing and debugging.', ou: 'You will write Python like a computer scientist — clean, tested, maintainable code that you can build ML pipelines on.', ti: 'Week 1-3 of the roadmap. Complete all problem sets before moving on.' },
          { n: 'Automate the Boring Stuff (Al Sweigart)', u: 'https://automatetheboringstuff.com/', a: 'Al Sweigart', ty: 'Book', pr: 'Free (web) / Paid (print)', du: '~20 hrs', mo: 'M0 — Programming & Engineering', d: 'Learn Python through practical automation projects. Keeps motivation high while you build real programming fluency.', cov: 'Working with files, web scraping, Excel/PDF/Word automation, email handling, GUI automation, scheduling tasks, pattern matching with regex.', ou: 'Python stops being a language you study and becomes a tool you use daily to solve real problems.', ti: 'Alongside CS50P or immediately after. The projects build momentum and confidence.' }
        ]},
        { label: 'Numerical computing', items: [
          { n: 'NumPy Crash Course — freeCodeCamp', u: 'https://www.youtube.com/watch?v=QUT1VHiLmmI', a: 'freeCodeCamp / Keith Galli', ty: 'YouTube', pr: 'Free', du: '~2 hrs', mo: 'M0 — Programming & Engineering', d: 'Fast, hands-on NumPy intro. This library is the foundation of all numerical computing in ML — master it early.', cov: 'Array creation, indexing, slicing, broadcasting, universal functions, linear algebra operations, random number generation, performance optimization.', ou: 'Vectorized thinking becomes second nature. You will stop writing loops and start thinking in array operations.', ti: 'Week 4. Watch in one sitting, then practice by rewriting earlier Python exercises using NumPy.' },
          { n: 'Python Data Science Handbook (VanderPlas) — NumPy', u: 'https://jakevdp.github.io/PythonDataScienceHandbook/', a: 'Jake VanderPlas', ty: 'Book', pr: 'Free (web)', du: '~4 hrs for NumPy chapters', mo: 'M0 — Programming & Engineering', d: 'Comprehensive NumPy reference with practical data science patterns. Keep this as your desk companion throughout the journey.', cov: 'NumPy internals, array operations, aggregation, broadcasting rules, boolean masking, fancy indexing, structured arrays, efficient computation patterns.', ou: 'Deep understanding of NumPy internals means you write faster, cleaner numerical code from the start.', ti: 'Read alongside the crash course. Reference throughout the entire roadmap whenever NumPy questions arise.' }
        ]},
        { label: 'Data wrangling & viz', items: [
          { n: 'Kaggle Pandas Course', u: 'https://www.kaggle.com/learn/pandas', a: 'Kaggle', ty: 'Course', pr: 'Free', du: '~3 hrs', mo: 'M0 — Programming & Engineering', d: 'Learn data manipulation through small, focused exercises. Fastest way to become productive with DataFrames.', cov: 'DataFrames, series, indexing, filtering, group operations, merging, joining, handling missing data, apply functions, pivoting and reshaping.', ou: 'You will load, clean, and transform any dataset within minutes using Pandas — the single most important data skill for ML.', ti: 'Week 5. Complete in-browser — no setup needed. Do every exercise.' },
          { n: 'Keith Galli Pandas Tutorial', u: 'https://www.youtube.com/watch?v=vmEHCJofslg', a: 'Keith Galli', ty: 'YouTube', pr: 'Free', du: '~2.5 hrs', mo: 'M0 — Programming & Engineering', d: 'Real-world dataset walkthroughs that build practical data wrangling skills. See exactly how professionals clean and transform data.', cov: 'Importing real datasets, data cleaning, handling duplicates, string operations, datetime handling, multi-index DataFrames, visualization integration.', ou: 'See how Pandas is used on messy real-world data — not toy examples. You will handle any dataset with confidence.', ti: 'After the Kaggle course. Watch with a real dataset open alongside to follow along.' },
          { n: 'Corey Schafer Matplotlib Tutorial', u: 'https://www.youtube.com/playlist?list=PL-osiE80TeTvipOqomVEeZ1HRrcEvtZB_', a: 'Corey Schafer', ty: 'YouTube', pr: 'Free', du: '~3 hrs (9 videos)', mo: 'M0 — Programming & Engineering', d: 'Clear, methodical Matplotlib tutorials — the gold standard for Python visualization instruction. Covers everything from basics to advanced plots.', cov: 'Line plots, scatter plots, bar charts, histograms, subplots, customizing styles, annotations, 3D plotting, animation, publication-ready figures.', ou: 'You will produce publication-quality visualizations from data — a skill that separates competent from exceptional practitioners.', ti: 'Week 6. Watch at 1.5x speed — it is about pattern recognition, not memorization.' },
          { n: 'Seaborn Gallery', u: 'https://seaborn.pydata.org/examples/index.html', a: 'Michael Waskom', ty: 'Website', pr: 'Free', du: '~30 min browse', mo: 'M0 — Programming & Engineering', d: 'Visual reference for statistical plots. Steal good design ideas for your own data exploration and presentation.', cov: 'Statistical relationships, categorical data, distribution plots, regression plots, heatmaps, pair plots, facet grids, theme customization.', ou: 'A visual vocabulary for presenting data effectively. Bookmark and reference whenever you need to communicate insights.', ti: 'Bookmark after Matplotlib. Reference continually throughout the roadmap for presentation-ready plots.' }
        ]}
      ]
    },
    cml: {
      primary: 'Andrew Ng ML Specialization (Coursera)',
      note: 'This is the most important phase of your entire ML journey. Do not rush it — complete every assignment and understand the math behind each algorithm.',
      steps: [
        { label: 'Core course', items: [
          { n: 'Machine Learning Specialization — Andrew Ng (Coursera)', u: 'https://www.coursera.org/specializations/machine-learning-introduction', a: 'Andrew Ng / Stanford (Coursera)', ty: 'Course', pr: 'Free (audit) / Paid (certificate)', du: '~60 hrs over 12 weeks', mo: 'M2 — Classical Machine Learning', d: 'The definitive ML course. Explains algorithms, bias-variance tradeoffs, and evaluation with unmatched clarity. Complete every lab.', cov: 'Linear regression, logistic regression, regularization, neural networks, SVMs, clustering, dimensionality reduction, anomaly detection, recommender systems, bias-variance.', ou: 'You will understand the fundamental algorithms of ML deeply enough to implement them from scratch and explain them to others.', ti: 'Week 7-18 of the roadmap. The most important 12 weeks of your ML journey. Do not rush.' }
        ]},
        { label: 'Deepen with textbook', items: [
          { n: 'ISLP — Introduction to Statistical Learning (James, Witten, Hastie, Tibshirani)', u: 'https://www.statlearning.com/', a: 'James, Witten, Hastie, Tibshirani', ty: 'Book', pr: 'Free PDF', du: '~40 hrs', mo: 'M2 — Classical Machine Learning', d: 'The most accessible rigorous ML textbook. Bridges math and application — read it alongside the course for deeper understanding.', cov: 'Linear regression, classification, resampling methods, tree-based methods, SVMs, deep learning, survival analysis, unsupervised learning, multiple testing.', ou: 'You will see the mathematics behind each algorithm — not just how to call fit() but why it works.', ti: 'Read alongside Andrew Ng\'s course. Chapter-per-week pacing matches the specialization structure.' }
        ]},
        { label: 'Practice', items: [
          { n: 'Hands-On Machine Learning (Geron)', u: 'https://www.oreilly.com/library/view/hands-on-machine-learning/9781098125974/', a: 'Aurélien Géron', ty: 'Book', pr: 'Paid', du: '~30 hrs', mo: 'M2 — Classical Machine Learning', d: 'Practical end-to-end ML projects with Scikit-Learn. Write real code from chapter one — this is how you internalize the theory.', cov: 'End-to-end ML pipeline, classification, regression, ensemble methods, dimensionality reduction, clustering, neural nets with Keras, training models, deployment.', ou: 'Theory transforms into working code. You will build complete ML pipelines with industry best practices.', ti: 'After finishing Andrew Ng — or alongside for the hands-on learner.' },
          { n: 'Scikit-Learn Documentation Guide', u: 'https://scikit-learn.org/stable/', a: 'scikit-learn contributors', ty: 'Website', pr: 'Free', du: 'Ongoing reference', mo: 'M2 — Classical Machine Learning', d: 'Official docs with best practices, examples, and pipeline patterns. You will reference this daily when building ML systems.', cov: 'API reference, estimator API, pipelines and composites, feature extraction, model selection, metrics and scoring, dataset transformations, built-in datasets.', ou: 'Mastery of the most important ML library. Every algorithm at your fingertips with proper usage patterns.', ti: 'Bookmark early. Reference daily throughout this phase and beyond.' },
          { n: 'ML-From-Scratch', u: 'https://github.com/eriklindernoren/ML-From-Scratch', a: 'Erik Linder-Norén', ty: 'GitHub', pr: 'Free', du: '~15 hrs', mo: 'M2 — Classical Machine Learning', d: 'NumPy implementations of 30+ ML algorithms. Removing framework abstractions deepens your understanding of every model.', cov: 'Regression, classification, clustering, dimensionality reduction, neural networks, boosting, SVMs, Gaussian processes, hidden Markov models, reinforcement learning.', ou: 'You will understand the internals of every major ML algorithm — no black boxes remain.', ti: 'After Andrew Ng. Implement 2-3 algorithms from scratch yourself before looking at the repo.' }
        ]},
        { label: 'Advanced topics', items: [
          { n: 'XGBoost Paper (Chen & Guestrin)', u: 'https://arxiv.org/abs/1603.02754', a: 'Tianqi Chen & Carlos Guestrin', ty: 'Paper', pr: 'Free', du: '~1 hr read', mo: 'M2 — Classical Machine Learning', d: 'Behind every Kaggle winner. Understanding gradient boosting at this level teaches you ensemble theory, regularization, and optimization.', cov: 'Gradient boosting framework, regularization, tree pruning, column subsampling, weighted quantile sketch, sparsity-aware learning, system optimization.', ou: 'You will understand why gradient boosting dominates tabular data and how to tune it beyond defaults.', ti: 'After implementing basic gradient boosting. Read to understand production-grade optimization.' },
          { n: 'Random Forests Paper (Breiman)', u: 'https://www.stat.berkeley.edu/~breiman/randomforest2001.pdf', a: 'Leo Breiman', ty: 'Paper', pr: 'Free', du: '~45 min read', mo: 'M2 — Classical Machine Learning', d: 'Foundational ensemble method from one of ML\'s pioneers. Essential for understanding how bagging reduces variance and improves stability.', cov: 'Bagging theory, random forest algorithm, out-of-bag error estimation, variable importance measures, proximity measures, theoretical guarantees.', ou: 'Deep understanding of one of the most practical algorithms — including why it does not overfit.', ti: 'After ensemble methods in the course. Read to see the original thinking behind the algorithm.' }
        ]}
      ]
    },
    dlcore: {
      primary: 'Deep Learning Specialization (Andrew Ng)',
      note: 'Understand neural network internals before using high-level frameworks. Build from first principles.',
      steps: [
        { label: 'Foundations', items: [
          { n: 'Deep Learning Specialization — Andrew Ng (Coursera)', u: 'https://www.coursera.org/specializations/deep-learning', a: 'Andrew Ng / deeplearning.ai', ty: 'Course', pr: 'Free (audit) / Paid (certificate)', du: '~80 hrs over 16 weeks', mo: 'M3 — Deep Learning Core', d: 'Systematic foundation covering architectures, hyperparameters, regularization, and optimization. The canonical DL starting point.', cov: 'Neural network architecture, activation functions, forward/backpropagation, hyperparameter tuning, regularization (L2, dropout), batch normalization, optimization algorithms.', ou: 'You will design, train, and debug neural networks professionally. From shallow nets to deep architectures with confidence.', ti: 'After completing Classical ML. This is the most comprehensive DL foundation available.' },
          { n: 'Neural Networks & Deep Learning (Michael Nielsen)', u: 'http://neuralnetworksanddeeplearning.com/', a: 'Michael Nielsen', ty: 'Book', pr: 'Free (web)', du: '~10 hrs', mo: 'M3 — Deep Learning Core', d: 'Interactive, code-first approach. You build a neural network from scratch — this is where everything clicks.', cov: 'Perceptrons, sigmoid neurons, gradient descent, backpropagation derivation, improving neural networks, convolutional networks, deep learning theory.', ou: 'Backpropagation stops being magic and becomes something you can derive and implement yourself.', ti: 'Before or alongside the specialization. The code-first approach makes abstract concepts concrete.' }
        ]},
        { label: 'Visual intuition', items: [
          { n: 'Neural Networks — 3Blue1Brown', u: 'https://www.youtube.com/playlist?list=PLZHQObOWTQDNU6R1_67000Dx_ZCJB-3pi', a: 'Grant Sanderson (3Blue1Brown)', ty: 'YouTube', pr: 'Free', du: '~1 hr (4 videos)', mo: 'M3 — Deep Learning Core', d: 'The best visual explanation of what neural networks actually compute. Watch before and after the course — you will notice new details each time.', cov: 'What neurons do, gradient descent visualized, backpropagation calculus, chain rule through layers, how learning actually happens in a network.', ou: 'Neural network training becomes a visual, intuitive process rather than a black box of math.', ti: 'Watch before starting the specialization. Rewatch after backpropagation week — you will see twice as much.' },
          { n: 'Backpropagation Calculus — 3Blue1Brown', u: 'https://www.youtube.com/watch?v=tIeHLnjs5U8', a: 'Grant Sanderson (3Blue1Brown)', ty: 'YouTube', pr: 'Free', du: '~15 min', mo: 'M3 — Deep Learning Core', d: 'See exactly how gradients flow through a network step by step. Demystifies the single most important algorithm in deep learning.', cov: 'Computational graphs, chain rule, local gradients, gradient flow through layers, weight updates, learning rate effects, derivation from first principles.', ou: 'You will trace gradient flow through any network architecture — essential for debugging training.', ti: 'After the Neural Networks playlist. This is the deep dive that makes backprop fully clear.' }
        ]},
        { label: 'Architectures', items: [
          { n: 'Stanford CS231n — CNNs for Visual Recognition', u: 'https://www.youtube.com/playlist?list=PL3FW7Lu3i5JvHM8ljYj-zLfQRF3EO8sYv', a: 'Fei-Fei Li & Andrej Karpathy (Stanford)', ty: 'Course', pr: 'Free', du: '~40 hrs', mo: 'M3 — Deep Learning Core', d: 'The definitive CNN course. From image classification through detection, segmentation, and modern architectures with rigorous assignments.', cov: 'Image classification, convolution operations, pooling, CNN architectures (AlexNet, VGG, ResNet), object detection, segmentation, visualizing CNNs, adversarial attacks.', ou: 'You will understand vision architectures from first principles — including why convolutions work and where they fail.', ti: 'After completing the Deep Learning Specialization. Requires strong programming and linear algebra.' },
          { n: 'Stanford CS224n — NLP with Deep Learning', u: 'https://www.youtube.com/playlist?list=PLoROMvodv4rMFqRtEuo6SGjY4XbRIVRd4', a: 'Christopher Manning (Stanford)', ty: 'Course', pr: 'Free', du: '~40 hrs', mo: 'M3 — Deep Learning Core', d: 'The standard NLP course covering RNNs, attention mechanisms, and Transformers. Invaluable for understanding sequence modeling.', cov: 'Word vectors, RNNs, LSTMs, GRUs, attention mechanisms, Transformers, machine translation, question answering, language models, ethical considerations.', ou: 'You will understand sequence modeling deeply — from word embeddings through attention and Transformers.', ti: 'After CS231n or alongside. Both courses can be taken in parallel after the DL Specialization.' }
        ]},
        { label: 'Key papers', items: [
          { n: 'Dropout Paper (Srivastava et al.)', u: 'https://jmlr.org/papers/v15/srivastava14a.html', a: 'Nitish Srivastava et al.', ty: 'Paper', pr: 'Free', du: '~45 min read', mo: 'M3 — Deep Learning Core', d: 'Elegant regularization that prevents co-adaptation of neurons. A core technique for training deep networks without overfitting.', cov: 'Dropout mechanism, model averaging interpretation, effect on activations, comparison with L1/L2 regularization, experimental results on multiple architectures.', ou: 'You will understand why dropout works and when to use it — a fundamental regularization tool.', ti: 'After covering regularization in the specialization. Read to understand the mechanism behind the technique.' },
          { n: 'Adam Paper (Kingma & Ba)', u: 'https://arxiv.org/abs/1412.6980', a: 'Diederik Kingma & Jimmy Ba', ty: 'Paper', pr: 'Free', du: '~45 min read', mo: 'M3 — Deep Learning Core', d: 'The default optimizer in modern deep learning. Understanding adaptive learning rates is essential for efficient training.', cov: 'Adaptive moment estimation, bias correction, learning rate schedules, comparison with SGD/AdaGrad/RMSProp, convergence analysis, hyperparameter guidelines.', ou: 'You will understand why Adam works so well and when to switch to SGD or other optimizers.', ti: 'After covering optimization algorithms. Reference whenever you need to debug training dynamics.' },
          { n: 'ResNet Paper (He et al.)', u: 'https://arxiv.org/abs/1512.03385', a: 'Kaiming He et al.', ty: 'Paper', pr: 'Free', du: '~45 min read', mo: 'M3 — Deep Learning Core', d: 'Skip connections that made training very deep networks possible. This single idea reshaped nearly every architecture that followed.', cov: 'Degradation problem, residual learning formulation, identity mapping, shortcut connections, deep bottleneck architectures, ablation studies on depth.', ou: 'You will understand the architectural innovation that unlocked modern deep learning — skip connections appear everywhere.', ti: 'After covering CNNs. ResNet thinking appears in Transformers, diffusion models, and virtually every modern architecture.' }
        ]}
      ]
    },
    papers: {
      primary: 'Attention Is All You Need (Vaswani et al., 2017)',
      note: 'Start here, then follow the citation chain forward and backward. Read in chronological order to see how ideas built on each other.',
      steps: [
        { label: 'The Transformer era (2017-2018)', items: [
          { n: 'Attention Is All You Need (Vaswani et al.)', u: 'https://arxiv.org/abs/1706.03762', a: 'Ashish Vaswani et al. (Google Brain)', ty: 'Paper', pr: 'Free', du: '~1.5 hrs (deep read)', mo: 'M4 — Landmark Papers', d: 'The most important ML paper of the decade. Introduced the Transformer architecture that powers every major AI system today.', cov: 'Scaled dot-product attention, multi-head attention, positional encodings, encoder-decoder architecture, self-attention, training on WMT translation tasks.', ou: 'You will understand the architecture behind ChatGPT, Claude, Gemini, and every modern AI system from first principles.', ti: 'The first paper to read. Use the three-pass method — skim, read fully, then implement.' },
          { n: 'BERT (Devlin et al.)', u: 'https://arxiv.org/abs/1810.04805', a: 'Jacob Devlin et al. (Google)', ty: 'Paper', pr: 'Free', du: '~1 hr read', mo: 'M4 — Landmark Papers', d: 'Introduced bidirectional pre-training for language understanding. Foundational for encoder models and transfer learning in NLP.', cov: 'Masked language modeling, next sentence prediction, bidirectional attention, pre-training procedure, fine-tuning for classification/QA/tagging, GLUE benchmark.', ou: 'You will understand the encoder Transformer paradigm and how pre-training + fine-tuning became the standard.', ti: 'After Attention Is All You Need. Read to see how the Transformer was adapted for language understanding.' }
        ]},
        { label: 'Scaling & few-shot (2020-2022)', items: [
          { n: 'GPT-3 — Language Models are Few-Shot Learners', u: 'https://arxiv.org/abs/2005.14165', a: 'Tom Brown et al. (OpenAI)', ty: 'Paper', pr: 'Free', du: '~2 hrs (long paper)', mo: 'M4 — Landmark Papers', d: 'Established scaling laws and in-context learning. Shaped the modern understanding of emergent capabilities in large models.', cov: 'Model scaling, in-context learning (zero-shot/one-shot/few-shot), training data curation, evaluation across 40+ NLP tasks, limitations and bias analysis.', ou: 'You will understand emergent capabilities, scaling, and why larger models behave differently from smaller ones.', ti: 'After BERT. This is a dense 75-page paper — focus on the concepts in sections 1-4 first.' },
          { n: 'Scaling Laws (Kaplan et al.)', u: 'https://arxiv.org/abs/2001.08361', a: 'Jared Kaplan et al. (OpenAI)', ty: 'Paper', pr: 'Free', du: '~1 hr read', mo: 'M4 — Landmark Papers', d: 'Showed performance follows predictable power-law scaling with compute, data, and parameters. Guides every major training decision.', cov: 'Power-law scaling trends, optimal model size vs data size, compute-efficient training, batch size scaling, overfitting regime analysis, architectural implications.', ou: 'You will understand the fundamental economics of training large models — why scale matters and where diminishing returns begin.', ti: 'After GPT-3. The theoretical lens through which to understand every large model decision.' },
          { n: 'Chinchilla (Hoffmann et al.)', u: 'https://arxiv.org/abs/2203.15556', a: 'Jordan Hoffmann et al. (DeepMind)', ty: 'Paper', pr: 'Free', du: '~45 min read', mo: 'M4 — Landmark Papers', d: 'Proved most LLMs are undertrained — for optimal performance, scale model and data proportionally. Changed how the field trains.', cov: 'Compute-optimal training, training tokens vs parameters, FLOPs analysis, comparison with existing models, recommendation for optimal allocation.', ou: 'You will know the optimal allocation of compute between model size and training data — a critical insight for training decisions.', ti: 'After Scaling Laws. This paper corrected the scaling law community — essential for understanding modern training.' }
        ]},
        { label: 'Alignment & fine-tuning (2022-2023)', items: [
          { n: 'InstructGPT (Ouyang et al.)', u: 'https://arxiv.org/abs/2203.02155', a: 'Long Ouyang et al. (OpenAI)', ty: 'Paper', pr: 'Free', du: '~1 hr read', mo: 'M4 — Landmark Papers', d: 'Introduced RLHF for aligning language models with human preferences. The technique behind ChatGPT\'s helpful and safe behavior.', cov: 'SFT fine-tuning, reward model training, PPO optimization, labeler agreement, model outputs evaluation, alignment tax analysis, generalization of alignment.', ou: 'You will understand the complete RLHF pipeline — the technique that made chat models useful and safe.', ti: 'After understanding Transformers and PPO (reinforcement learning). This connects alignment to core ML concepts.' },
          { n: 'Constitutional AI (Bai et al.)', u: 'https://arxiv.org/abs/2212.08073', a: 'Yuntao Bai et al. (Anthropic)', ty: 'Paper', pr: 'Free', du: '~45 min read', mo: 'M4 — Landmark Papers', d: 'Alignment without human labels — uses self-supervision and principles. Key technique for scalable AI safety.', cov: 'Self-supervised revision process, constitutional principles, red-teaming evaluation, harmless/helpful tradeoffs, comparison with RLHF, scalability analysis.', ou: 'You will understand how AI systems can be aligned without extensive human feedback — critical for scalable safety.', ti: 'After InstructGPT. Compare the two approaches to understand the alignment landscape.' },
          { n: 'LoRA (Hu et al.)', u: 'https://arxiv.org/abs/2106.09685', a: 'Edward Hu et al. (Microsoft)', ty: 'Paper', pr: 'Free', du: '~30 min read', mo: 'M4 — Landmark Papers', d: 'Parameter-efficient fine-tuning that made adapting large models practical. The standard method for customizing LLMs.', cov: 'Low-rank decomposition, rank selection, application to attention matrices, comparison with full fine-tuning, computational savings, adapter combination.', ou: 'You will fine-tune large models on consumer hardware — LoRA is the essential technique for customization.', ti: 'Before any fine-tuning project. Understanding LoRA deeply saves weeks of trial and error.' }
        ]},
        { label: 'Frontier understanding', items: [
          { n: 'Residual Networks (He et al.)', u: 'https://arxiv.org/abs/1512.03385', a: 'Kaiming He et al. (Microsoft Research)', ty: 'Paper', pr: 'Free', du: '~30 min read', mo: 'M4 — Landmark Papers', d: 'Skip connections explained from first principles. This architectural pattern appears in nearly every modern deep network.', cov: 'Skip connection formulation, gradient flow analysis, identity mapping variants, deep network optimization, comparison with highway networks, ensemble interpretation.', ou: 'You will understand why skip connections are the most copied architectural idea since the convolution.', ti: 'After the DL Specialization. This architectural pattern appears in Transformers, diffusion models, and beyond.' },
          { n: 'ML Technical Debt (Sculley et al.)', u: 'https://papers.nips.cc/paper_files/paper/2015/hash/86df7dcfd896fcaf2674f757a2463eba-Abstract.html', a: 'D. Sculley et al. (Google)', ty: 'Paper', pr: 'Free', du: '~30 min read', mo: 'M4 — Landmark Papers', d: 'Essential reading on hidden maintenance costs of ML systems. Shapes how you think about production engineering from day one.', cov: 'Technical debt in ML, boundary erosion, entanglement, hidden feedback loops, undeclared consumers, data dependencies, configuration debt, monitoring debt.', ou: 'You will build ML systems differently — anticipating maintenance costs and designing for long-term reliability.', ti: 'Before your first production ML project. Read early, reference often.' },
          { n: 'Dropout (Srivastava et al.)', u: 'https://jmlr.org/papers/v15/srivastava14a.html', a: 'Nitish Srivastava et al.', ty: 'Paper', pr: 'Free', du: '~30 min read', mo: 'M4 — Landmark Papers', d: 'A simple, remarkably effective regularization technique. Understanding it teaches broader principles of preventing overfitting.', cov: 'Dropout mechanism overview, model averaging interpretation, effect on different layer types, dropout rate tuning, comparison with other regularizers.', ou: 'You will understand regularization beyond surface-level application — why dropout works and where it does not.', ti: 'After covering regularization in the DL Specialization. A deeper look at a technique you will use constantly.' },
          { n: 'Adam (Kingma & Ba)', u: 'https://arxiv.org/abs/1412.6980', a: 'Diederik Kingma & Jimmy Ba', ty: 'Paper', pr: 'Free', du: '~30 min read', mo: 'M4 — Landmark Papers', d: 'Adaptive moment estimation — the optimizer you will use most. Understanding its mechanics helps debug training failures.', cov: 'Algorithm overview, bias correction mechanism, default hyperparameters, convergence properties, common failure modes and fixes, alternative formulations.', ou: 'You will debug training failures instead of blindly switching optimizers. Systematic understanding of optimization dynamics.', ti: 'After using Adam practically for a while. Revisit when you encounter training stability issues.' }
        ]}
      ]
    },
    nlp: {
      primary: 'Stanford CS224n + HuggingFace NLP Course',
      note: 'Build from classical sequence models through transformers to LLM fine-tuning. Implement what you learn.',
      steps: [
        { label: 'Course foundation', items: [
          { n: 'Stanford CS224n — NLP with Deep Learning', u: 'https://www.youtube.com/playlist?list=PLoROMvodv4rMFqRtEuo6SGjY4XbRIVRd4', a: 'Christopher Manning (Stanford)', ty: 'Course', pr: 'Free', du: '~40 hrs', mo: 'M5 — NLP & LLMs', d: 'Covers RNNs, attention, Transformers, and modern architectures with rigorous assignments. The gold standard NLP course.', cov: 'Word vectors, neural network classification, backpropagation, dependency parsing, RNNs and LSTMs, machine translation, attention, Transformers, pretraining.', ou: 'You will understand the full evolution of NLP — from word vectors through Transformers — with implementation-level depth.', ti: 'After the Deep Learning Specialization. Strong DL fundamentals are required before starting.' },
          { n: 'HuggingFace NLP Course', u: 'https://huggingface.co/learn/nlp-course/', a: 'Hugging Face', ty: 'Course', pr: 'Free', du: '~15 hrs', mo: 'M5 — NLP & LLMs', d: 'Practical NLP using modern libraries — tokenization, training pipelines, and deployment. Bridges theory to production-ready code.', cov: 'Tokenizers, loading datasets, training sequence classifiers, fine-tuning Transformers, sharing models, token classification, QA pipelines, multimodal modeling.', ou: 'You will go from understanding Transformers to deploying them in production using industry-standard tools.', ti: 'Alongside or after CS224n. The practical counterpart to the theoretical course.' }
        ]},
        { label: 'Build from scratch', items: [
          { n: 'Let\'s build GPT from scratch — Andrej Karpathy', u: 'https://www.youtube.com/watch?v=kCc8FvEbE3U', a: 'Andrej Karpathy', ty: 'YouTube', pr: 'Free', du: '~2 hrs (video) + ~4 hrs coding', mo: 'M5 — NLP & LLMs', d: 'Implement a GPT from scratch in a single file. Unparalleled understanding of how Transformers actually generate text.', cov: 'Self-attention implementation, multi-head attention, Transformer blocks, layer normalization, position embeddings, autoregressive generation, training loop.', ou: 'Transformers stop being a black box. You will have implemented every line of a GPT yourself.', ti: 'After CS224n. Type every line of code yourself — do not copy-paste.' },
          { n: 'Build a Large Language Model (Sebastian Raschka)', u: 'https://www.manning.com/books/build-a-large-language-model-from-scratch', a: 'Sebastian Raschka', ty: 'Book', pr: 'Paid', du: '~20 hrs', mo: 'M5 — NLP & LLMs', d: 'Step-by-step LLM construction from tokenization to pretraining. Clear code examples make complex concepts concrete.', cov: 'Tokenization strategies, byte-pair encoding, embedding layers, attention mechanisms, GPT architecture, pretraining pipeline, text generation, fine-tuning.', ou: 'You will build a complete LLM from scratch — the most thorough practical understanding available in book form.', ti: 'After Karpathy\'s video. The book fills in all the details the video necessarily skims.' }
        ]},
        { label: 'Fine-tuning & alignment', items: [
          { n: 'HuggingFace Transformers Docs + PEFT', u: 'https://huggingface.co/docs/transformers/index', a: 'Hugging Face', ty: 'Website', pr: 'Free', du: 'Ongoing reference', mo: 'M5 — NLP & LLMs', d: 'Practical reference for fine-tuning any Transformer. Parameter-efficient methods (LoRA, QLoRA) make customization feasible on consumer hardware.', cov: 'Trainer API, custom training loops, mixed precision training, distributed training, PEFT implementation, LoRA configuration, quantization, fine-tuning recipes.', ou: 'You will fine-tune any Transformer model for any task — classification, generation, QA, or custom objectives.', ti: 'Before your first fine-tuning project. Reference throughout all LLM work.', ak: 'https://huggingface.co/docs/peft/index' },
          { n: 'LoRA Paper', u: 'https://arxiv.org/abs/2106.09685', a: 'Edward Hu et al. (Microsoft)', ty: 'Paper', pr: 'Free', du: '~30 min read', mo: 'M5 — NLP & LLMs', d: 'Understanding LoRA deeply helps you choose the right rank, target modules, and hyperparameters for your fine-tuning tasks.', cov: 'Low-rank adaptation theory, rank selection experiments, application across attention layers, computational efficiency, combining LoRA with quantization.', ou: 'You will configure LoRA optimally instead of guessing hyperparameters — saving GPU hours and achieving better results.', ti: 'Before using PEFT. Understanding the paper behind the library makes you a power user.' },
          { n: 'Stanford CS336 — LLM Bootcamp', u: 'https://stanford-cs336.github.io/', a: 'Stanford / Together AI', ty: 'Course', pr: 'Free', du: '~30 hrs', mo: 'M5 — NLP & LLMs', d: 'Cutting-edge LLM training bootcamp covering alignment, evaluation, and deployment. Bridges research and production practice.', cov: 'LLM architecture, training at scale, data curation, evaluation benchmarks, alignment techniques, safety considerations, deployment infrastructure, limitations.', ou: 'You will understand the full LLM lifecycle — from data curation through training to deployment and alignment.', ti: 'After building and fine-tuning models. This course ties everything together at a production scale.' }
        ]},
        { label: 'Reference', items: [
          { n: 'BERT Paper', u: 'https://arxiv.org/abs/1810.04805', a: 'Jacob Devlin et al. (Google)', ty: 'Paper', pr: 'Free', du: '~45 min read', mo: 'M5 — NLP & LLMs', d: 'Essential for understanding encoder-only architectures and the impact of bidirectional pretraining on language understanding tasks.', cov: 'Pretraining objectives, model architecture, training procedure, fine-tuning methodology, GLUE/SQuAD results, ablation studies on pretraining design choices.', ou: 'You will understand when to use encoder vs decoder architectures — a critical design decision for any NLP task.', ti: 'After CS224n. Reference to understand the encoder side of the Transformer family.' },
          { n: 'GPT-3 Paper', u: 'https://arxiv.org/abs/2005.14165', a: 'Tom Brown et al. (OpenAI)', ty: 'Paper', pr: 'Free', du: '~1 hr read (sections 1-4)', mo: 'M5 — NLP & LLMs', d: 'The paper that defined the scaling paradigm. Understanding it is critical for grasping why and how large models work.', cov: 'Model architecture and sizes, training data mixture, in-context learning evaluation, scaling analysis, benchmark results, limitations and societal impact.', ou: 'You will understand in-context learning, scaling, and emergent abilities — the concepts that define the LLM era.', ti: 'After building GPT from scratch. Read with implementation context fresh in mind.' },
          { n: 'Constitutional AI Paper', u: 'https://arxiv.org/abs/2212.08073', a: 'Yuntao Bai et al. (Anthropic)', ty: 'Paper', pr: 'Free', du: '~30 min read', mo: 'M5 — NLP & LLMs', d: 'Key alignment technique from Anthropic. Important for understanding the safety landscape beyond RLHF.', cov: 'Self-revision process, constitution design, RLHF-free alignment, harmless and helpful evaluation, comparison with standard RLHF, scalability and limitations.', ou: 'You will understand alignment beyond RLHF — including self-supervised approaches that scale without human labels.', ti: 'After InstructGPT. Represents the leading alternative approach to alignment.' }
        ]}
      ]
    },
    cv: {
      primary: 'Stanford CS231n',
      note: 'Start with CNNs, understand their limitations, then move to transformer-based vision. Implement at least one architecture from scratch.',
      steps: [
        { label: 'Core course', items: [
          { n: 'Stanford CS231n — CNNs for Visual Recognition', u: 'https://www.youtube.com/playlist?list=PL3FW7Lu3i5JvHM8ljYj-zLfQRF3EO8sYv', a: 'Fei-Fei Li & Andrej Karpathy (Stanford)', ty: 'Course', pr: 'Free', du: '~40 hrs', mo: 'M6 — Computer Vision', d: 'The definitive CV course — covers image classification, detection, segmentation, and GANs with rigorous math and programming assignments.', cov: 'Image classification pipelines, convolution operations, CNN architectures, object detection (R-CNN, YOLO), segmentation (FCN, U-Net), GANs, visual recognition.', ou: 'You will understand vision from pixels to high-level semantics — the complete CNN pipeline with implementation depth.', ti: 'After the Deep Learning Specialization. The assignments require strong Python and NumPy skills.' }
        ]},
        { label: 'Build understanding', items: [
          { n: 'ResNet Paper (He et al.)', u: 'https://arxiv.org/abs/1512.03385', a: 'Kaiming He et al. (Microsoft Research)', ty: 'Paper', pr: 'Free', du: '~30 min read', mo: 'M6 — Computer Vision', d: 'Skip connections are the most influential architectural innovation in CV. Understanding them is key to modern vision model design.', cov: 'Residual learning, skip connections, identity mapping, deep network optimization, architecture variants (ResNet-50/101/152), ImageNet results and analysis.', ou: 'You will understand why depth is finally possible — the innovation that unlocked 100+ layer networks.', ti: 'After CS231n. The paper behind the architecture you just implemented in assignments.' },
          { n: 'Vision Transformer (ViT) Paper (Dosovitskiy et al.)', u: 'https://arxiv.org/abs/2010.11929', a: 'Alexey Dosovitskiy et al. (Google Brain)', ty: 'Paper', pr: 'Free', du: '~45 min read', mo: 'M6 — Computer Vision', d: 'Proved CNNs are not necessary for vision — pure Transformers on image patches achieve SOTA. A paradigm shift in CV architecture.', cov: 'Image patch embedding, Transformer encoder for vision, positional embeddings, pretraining strategy, comparison with CNNs, scaling properties, fine-tuning results.', ou: 'You will understand the paradigm shift that unified vision and language architectures under the Transformer umbrella.', ti: 'After ResNet paper. Represents the modern approach that is replacing pure CNNs.' }
        ]},
        { label: 'Modern systems', items: [
          { n: 'Segment Anything (SAM) — Meta AI', u: 'https://segment-anything.com/', a: 'Alexander Kirillov et al. (Meta AI)', ty: 'Paper', pr: 'Free', du: '~1 hr read', mo: 'M6 — Computer Vision', d: 'Foundation model for segmentation with zero-shot generalization. Represents the shift toward general-purpose vision models.', cov: 'Promptable segmentation task, model architecture, data engine for 1B masks, zero-shot transfer evaluation, interactive segmentation, automatic mask generation.', ou: 'You will understand the foundation model paradigm applied to vision — one model for all segmentation tasks.', ti: 'After understanding CNNs and ViTs. SAM represents the modern, generalist approach to CV.' },
          { n: 'YOLO — Real-Time Object Detection', u: 'https://pjreddie.com/darknet/yolo/', a: 'Joseph Redmon et al.', ty: 'Paper', pr: 'Free', du: '~30 min read', mo: 'M6 — Computer Vision', d: 'The industry standard for real-time detection. Teaches you to balance speed, accuracy, and architectural efficiency.', cov: 'Unified detection framework, bounding box prediction, loss function design, architecture evolution (YOLOv3-v8), real-time inference optimization, deployment.', ou: 'You will understand the speed-accuracy tradeoff in production vision systems — essential for real-world applications.', ti: 'After image classification. Detection is the next logical step — finding objects is more practical than classifying images.' },
          { n: 'PyTorch Image Models (timm)', u: 'https://github.com/huggingface/pytorch-image-models', a: 'Ross Wightman / Hugging Face', ty: 'GitHub', pr: 'Free', du: 'Ongoing reference', mo: 'M6 — Computer Vision', d: 'Curated collection of SOTA vision models with pretrained weights. Invaluable for rapid prototyping and transfer learning.', cov: 'Model zoo of 300+ architectures, pretrained weights, training scripts, augmentation strategies, optimizer configurations, feature extraction utilities.', ou: 'You will have every state-of-the-art vision architecture at your fingertips — with proper training recipes.', ti: 'Bookmark after CS231n. Use for every CV project to avoid reimplementing standard architectures.' }
        ]}
      ]
    },
    rl: {
      primary: 'David Silver RL Course (DeepMind / YouTube)',
      note: 'RL has steep prerequisites — ensure strong probability and deep learning fundamentals first. The math is non-negotiable here.',
      steps: [
        { label: 'Core course', items: [
          { n: 'David Silver — Reinforcement Learning (DeepMind)', u: 'https://www.youtube.com/playlist?list=PLqYmG7hTraZDM-OYHWgPebj2MfCFzFObQ', a: 'David Silver (DeepMind)', ty: 'Course', pr: 'Free', du: '~20 hrs', mo: 'M7 — Reinforcement Learning', d: 'The definitive RL course by DeepMind\'s lead. Rigorous, comprehensive, and directly from one of the field\'s principal contributors.', cov: 'MDPs, dynamic programming, Monte Carlo methods, TD learning, function approximation, policy gradients, actor-critic methods, exploration, deep RL integration.', ou: 'You will understand RL from first principles — from bandits through policy gradients — taught by the field\'s leading researcher.', ti: 'After the Deep Learning Specialization. Requires solid probability and calculus foundations.' }
        ]},
        { label: 'Textbook', items: [
          { n: 'Sutton & Barto — Reinforcement Learning: An Introduction', u: 'http://incompleteideas.net/book/the-book-2nd.html', a: 'Richard Sutton & Andrew Barto', ty: 'Book', pr: 'Free PDF', du: '~40 hrs', mo: 'M7 — Reinforcement Learning', d: 'The RL bible. Every algorithm from multi-armed bandits to policy gradients, presented with mathematical depth and clarity.', cov: 'Bandit problems, finite MDPs, DP, Monte Carlo methods, TD learning, n-step bootstrapping, planning and learning, function approximation, policy gradient methods.', ou: 'You will have the complete mathematical foundation of RL — the single reference that covers everything.', ti: 'Read alongside David Silver\'s course. Chapter-by-chapter pacing matches the lecture topics.' }
        ]},
        { label: 'Key papers', items: [
          { n: 'DQN — Playing Atari with Deep RL (Mnih et al.)', u: 'https://arxiv.org/abs/1312.5602', a: 'Volodymyr Mnih et al. (DeepMind)', ty: 'Paper', pr: 'Free', du: '~45 min read', mo: 'M7 — Reinforcement Learning', d: 'The paper that launched deep RL. First algorithm to learn directly from pixels — a landmark in combining deep learning with RL.', cov: 'DQN architecture, experience replay, target network, Atari environment preprocessing, training stability, evaluation methodology, comparison with human performance.', ou: 'You will understand how deep learning and RL were first successfully combined — the paper that started deep RL.', ti: 'After the course section on value-based methods. See how theory became practice.' },
          { n: 'PPO — Proximal Policy Optimization (Schulman et al.)', u: 'https://arxiv.org/abs/1707.06347', a: 'John Schulman et al. (OpenAI)', ty: 'Paper', pr: 'Free', du: '~45 min read', mo: 'M7 — Reinforcement Learning', d: 'The default RL algorithm in production systems and RLHF. Stable, simple, and sample-efficient — essential for modern RL work.', cov: 'Surrogate objective, clipped probability ratios, adaptive KL penalty, trust region interpretation, comparison with TRPO, continuous control results, implementation details.', ou: 'You will understand the algorithm that powers RLHF — making it the single most important RL paper for the LLM era.', ti: 'After policy gradient methods. PPO is the algorithm you will actually use in production.' }
        ]},
        { label: 'Practice', items: [
          { n: 'HuggingFace Deep RL Course', u: 'https://huggingface.co/learn/deep-rl-course/', a: 'Hugging Face / Thomas Simonini', ty: 'Course', pr: 'Free', du: '~20 hrs', mo: 'M7 — Reinforcement Learning', d: 'Hands-on RL with practical implementations using Stable-Baselines3. Train agents in simulated environments and see algorithms in action.', cov: 'Q-learning, Deep Q-Networks, policy gradients, actor-critic methods, PPO, SAC, multi-agent RL, environment creation, training monitoring, hyperparameter tuning.', ou: 'You will train RL agents that actually learn — from CartPole to Atari games — using industry-standard libraries.', ti: 'After the theory. Implement what you learned from David Silver and Sutton & Barto.' },
          { n: 'OpenAI Gym / Farama Gymnasium', u: 'https://gymnasium.farama.org/', a: 'Farama Foundation', ty: 'GitHub', pr: 'Free', du: 'Ongoing reference', mo: 'M7 — Reinforcement Learning', d: 'Standard RL benchmark environment suite. Essential for testing, comparing, and debugging RL algorithms in a consistent framework.', cov: 'Environment API, classic control environments, Atari environments, MuJoCo robotics, custom environment creation, wrappers and transformations, benchmarking.', ou: 'You will be able to test any RL algorithm against standardized benchmarks — essential for research and development.', ti: 'Before starting any RL implementation project. Bookmark and use as your testing ground.' }
        ]}
      ]
    },
    genai: {
      primary: 'HuggingFace Diffusion Models Course',
      note: 'Generative AI builds directly on deep learning fundamentals. Complete Stage 3 (Deep Learning Core) first before diving here.',
      steps: [
        { label: 'Course', items: [
          { n: 'HuggingFace Diffusion Models Course', u: 'https://huggingface.co/learn/diffusion-course/', a: 'Hugging Face', ty: 'Course', pr: 'Free', du: '~15 hrs', mo: 'M8 — Generative AI', d: 'Practical training on diffusion models from theory to Stable Diffusion fine-tuning. The most hands-on path into generative AI.', cov: 'Diffusion theory, DDPM implementation, UNet architecture, noise scheduling, classifier-free guidance, Stable Diffusion fine-tuning, DreamBooth, LoRA for diffusion.', ou: 'You will go from diffusion theory to fine-tuning Stable Diffusion models — the complete generative AI pipeline.', ti: 'After completing the Deep Learning Specialization. Requires understanding of CNNs and Transformers.' },
          { n: 'MIT Flow Matching & Diffusion Models (2026)', u: 'https://diffusion.csail.mit.edu/2026/', a: 'MIT CSAIL', ty: 'Course', pr: 'Free', du: '~20 hrs', mo: 'M8 — Generative AI', d: '2026 cutting-edge course — build a latent diffusion model from scratch covering SDEs, score matching, classifier-free guidance, and DiT.', cov: 'Flow matching theory, stochastic differential equations, score-based generative modeling, classifier-free guidance, latent diffusion, Diffusion Transformer (DiT).', ou: 'You will build a latent diffusion model from scratch — the most advanced practical understanding of modern generative AI.', ti: 'After the HuggingFace course. This represents the frontier of diffusion model education.' }
        ]},
        { label: 'Theory deep-dive', items: [
          { n: 'What are Diffusion Models? — Lilian Weng', u: 'https://lilianweng.github.io/posts/2021-07-11-diffusion-models/', a: 'Lilian Weng (OpenAI)', ty: 'Blog', pr: 'Free', du: '~1.5 hrs read', mo: 'M8 — Generative AI', d: 'Comprehensive survey covering DDPM, DDIM, score matching, and guidance. The canonical technical reference for diffusion math.', cov: 'Forward and reverse diffusion processes, DDPM derivation, DDIM acceleration, score matching, Langevin dynamics, classifier and classifier-free guidance, SDE formulation.', ou: 'You will have a unified mathematical understanding of all major diffusion model formulations.', ti: 'After DDPM paper. Lilian\'s blog connects all the pieces into one coherent picture.' },
          { n: 'The Annotated Diffusion Model — Hugging Face', u: 'https://huggingface.co/blog/annotated-diffusion', a: 'Hugging Face', ty: 'Blog', pr: 'Free', du: '~1 hr read + code', mo: 'M8 — Generative AI', d: 'DDPM code and math presented side-by-side. Best way to understand implementation details before building your own.', cov: 'DDPM algorithm walkthrough, noise scheduler implementation, UNet architecture code, training loop, sampling pipeline, image generation results and analysis.', ou: 'You will understand every line of a diffusion model — math and code presented together.', ti: 'Before implementing your own diffusion model. The code annotations clarify everything the papers gloss over.' }
        ]},
        { label: 'Key papers', items: [
          { n: 'DDPM (Ho et al., 2020)', u: 'https://arxiv.org/abs/2006.11239', a: 'Jonathan Ho et al. (UC Berkeley)', ty: 'Paper', pr: 'Free', du: '~1 hr read', mo: 'M8 — Generative AI', d: 'The original denoising diffusion paper. Essential for understanding the Markov chain formulation and probabilistic foundation.', cov: 'Forward diffusion chain, reverse denoising process, variational lower bound derivation, noise prediction objective, architectural design, CIFAR/LSUN ImageNet results.', ou: 'You will understand the original diffusion formulation — the foundation everything else builds on.', ti: 'First paper to read in this section. Read alongside Lilian Weng\'s blog for clarity.' },
          { n: 'Latent Diffusion / Stable Diffusion (Rombach et al.)', u: 'https://arxiv.org/abs/2112.10752', a: 'Robin Rombach et al. (LMU Munich / Stability AI)', ty: 'Paper', pr: 'Free', du: '~1 hr read', mo: 'M8 — Generative AI', d: 'Made diffusion practical by operating in latent space. The paper behind the generative AI explosion — efficiency meets quality.', cov: 'Latent space diffusion, pretrained autoencoders, cross-attention conditioning, text-to-image pipeline, super-resolution, inpainting, computational efficiency analysis.', ou: 'You will understand how Stable Diffusion works — the most important generative AI paper for practitioners.', ti: 'After DDPM. This is the paper that made diffusion models practical and commercially relevant.' },
          { n: 'DiT — Diffusion Transformers (Peebles & Xie)', u: 'https://arxiv.org/abs/2212.09748', a: 'William Peebles & Saining Xie (UC Berkeley)', ty: 'Paper', pr: 'Free', du: '~45 min read', mo: 'M8 — Generative AI', d: 'Replaced U-Net with Transformers for diffusion. The architecture powering SD3, Flux, and Sora — the future of generative architecture.', cov: 'Transformer-based diffusion backbone, patch embedding design, modulation mechanisms, scaling properties, ImageNet class-conditional generation, GFLOPs analysis.', ou: 'You will understand the architecture behind the next generation of generative models — SD3, Flux, and Sora.', ti: 'After Stable Diffusion. Represents the cutting edge — Transformers replacing U-Nets in diffusion.' }
        ]},
        { label: 'Build from scratch', items: [
          { n: 'Diffusion 101 — PyTorch Implementation', u: 'https://github.com/Cyr-Ch/Diffusion-101', a: 'Cyr-Ch (GitHub)', ty: 'GitHub', pr: 'Free', du: '~8 hrs', mo: 'M8 — Generative AI', d: 'Beginner-friendly notebooks for DDIM, Heun, and DPM-Solver samplers. Build and train diffusion models from scratch with PyTorch.', cov: 'DDPM implementation, DDIM sampler, Heun sampler, DPM-Solver, training pipeline, sampling optimization, MNIST/CIFAR experiments, generation visualization.', ou: 'You will implement and train diffusion models from scratch — the deepest possible practical understanding.', ti: 'After understanding the theory. The notebooks walk through every step of implementation.' },
          { n: 'HuggingFace Diffusers Library', u: 'https://huggingface.co/docs/diffusers/index', a: 'Hugging Face', ty: 'Website', pr: 'Free', du: 'Ongoing reference', mo: 'M8 — Generative AI', d: 'Industry-standard library for inference and training of diffusion models. Essential toolkit for any generative AI project.', cov: 'Pipeline API, scheduler implementations, model loading, custom pipeline creation, fine-tuning scripts, community models hub, memory optimizations.', ou: 'You will build generative AI applications with industry-standard tools — from inference to fine-tuning to deployment.', ti: 'Bookmark after understanding diffusion theory. Use for every generative AI project.' }
        ]}
      ]
    },
    repos: {
      primary: 'micrograd + Let\'s build GPT (Andrej Karpathy)',
      note: 'These repos let you build neural networks from absolute scratch. Run the code, break it, fix it — this is how you truly learn.',
      steps: [
        { label: 'Build a neural net from scratch', items: [
          { n: 'micrograd — Karpathy', u: 'https://github.com/karpathy/micrograd', a: 'Andrej Karpathy', ty: 'GitHub', pr: 'Free', du: '~2 hrs', mo: 'R1 — Key Repositories', d: 'A 100-line autograd engine. Build backpropagation from absolute zero — this is the single best way to truly understand how gradients work.', cov: 'Autograd engine implementation, backpropagation, gradient computation, neural network building blocks, value node operations, computational graph visualization.', ou: 'You will understand backpropagation at the level of individual scalar operations — no more black box.', ti: 'During the Deep Learning Specialization. Run and modify the code during backpropagation week.' },
          { n: 'nn-zero-to-hero — Karpathy', u: 'https://github.com/karpathy/nn-zero-to-hero', a: 'Andrej Karpathy', ty: 'GitHub', pr: 'Free', du: '~10 hrs', mo: 'R1 — Key Repositories', d: 'Complete neural network implementation series progressing from tiny models to modern architectures with fully annotated code.', cov: 'Micrograd extension, MLP implementation, character-level language model, WaveNet architecture, GPT implementation, training from scratch, code walkthroughs.', ou: 'You will implement the entire modern deep learning stack from scratch — micrograd to GPT.', ti: 'After micrograd. Work through the entire series sequentially — each video builds on the last.' }
        ]},
        { label: 'Language modeling from scratch', items: [
          { n: 'makemore — Karpathy', u: 'https://github.com/karpathy/makemore', a: 'Andrej Karpathy', ty: 'GitHub', pr: 'Free', du: '~6 hrs', mo: 'R1 — Key Repositories', d: 'Character-level language modeling implemented step by step. Perfect for understanding autoregressive generation and next-token prediction.', cov: 'Bigram model, MLP language model, batch normalization, backpropagation through time, tokenization, sampling, loss visualization, character generation experiments.', ou: 'You will understand autoregressive generation from first principles — building up from bigrams to neural language models.', ti: 'After micrograd. makemore bridges micrograd to full language modeling.' },
          { n: 'Let\'s build GPT — Karpathy', u: 'https://www.youtube.com/watch?v=kCc8FvEbE3U', a: 'Andrej Karpathy', ty: 'GitHub', pr: 'Free', du: '~6 hrs', mo: 'R1 — Key Repositories', d: 'Build a GPT from scratch in one Python file. Unparalleled understanding of Transformers through hands-on implementation.', cov: 'Self-attention implementation, multi-head attention, Transformer decoder blocks, byte-pair encoding, autoregressive training, text generation, model checkpointing.', ou: 'You will have implemented a complete GPT — the deepest possible understanding of how Transformers work.', ti: 'After makemore. This is the capstone of the Karpathy implementation series.' }
        ]},
        { label: 'Implement ML algorithms', items: [
          { n: 'ML-From-Scratch', u: 'https://github.com/eriklindernoren/ML-From-Scratch', a: 'Erik Linder-Norén', ty: 'GitHub', pr: 'Free', du: '~20 hrs', mo: 'R1 — Key Repositories', d: 'NumPy implementations of 30+ ML algorithms. Remove framework abstractions to learn what each model actually computes under the hood.', cov: 'Linear/logistic regression, KNN, decision trees, random forests, SVMs, PCA, LDA, t-SNE, K-means, DBSCAN, Gaussian mixture models, RNNs, CNNs, reinforcement learning.', ou: 'You will understand the internals of every major ML algorithm — no black boxes remain.', ti: 'Alongside Classical ML and DL phases. Implement algorithms as you learn them, not after.' },
          { n: 'Made With ML — Goku Mohandas', u: 'https://github.com/GokuMohandas/Made-With-ML', a: 'Goku Mohandas', ty: 'GitHub', pr: 'Free', du: '~15 hrs', mo: 'R1 — Key Repositories', d: 'Full production ML project template with testing, CI/CD, and deployment best practices. Bridges the gap between notebooks and production.', cov: 'Project structure, data versioning, experiment tracking, ML pipelines, model testing, CI/CD integration, deployment strategies, monitoring, MLOps best practices.', ou: 'You will build ML projects that are deployable, maintainable, and collaborative — not just notebook experiments.', ti: 'Before your first production ML project. Study the structure before replicating it.' }
        ]},
        { label: 'Production & research', items: [
          { n: 'LLaMA 3 — Meta', u: 'https://github.com/meta-llama/llama3', a: 'Meta AI', ty: 'GitHub', pr: 'Free (download upon request)', du: '~3 hrs study', mo: 'R1 — Key Repositories', d: 'State-of-the-art open LLM. Study the architecture, training distribution, and inference optimizations of a production-grade model.', cov: 'Architecture details, training data composition, scaling approach, grouped query attention, inference optimization, fine-tuning recipes, safety mitigations, evaluation.', ou: 'You will understand how a production-grade LLM is built — architecture, training, and deployment decisions from Meta\'s team.', ti: 'After understanding Transformers. Study the code to see how theory becomes production engineering.' },
          { n: 'Transformers — HuggingFace', u: 'https://github.com/huggingface/transformers', a: 'Hugging Face', ty: 'GitHub', pr: 'Free', du: 'Ongoing reference', mo: 'R1 — Key Repositories', d: 'The industry-standard Transformers library with thousands of pretrained models. Essential toolkit for any NLP or multimodal project.', cov: 'Model API, pipeline API, tokenizers, trainer, model sharing, custom models, distributed training, quantization, ONNX export, community integrations.', ou: 'You will use the most important ML library in production — every NLP team uses Transformers daily.', ti: 'Bookmark early in NLP phase. Reference for every Transformer-based project.' }
        ]}
      ]
    },
    mlops: {
      primary: 'Made With ML (Goku Mohandas)',
      note: 'MLOps is about reliability and reproducibility. Learn it after you have shipped at least one model end-to-end.',
      steps: [
        { label: 'Course', items: [
          { n: 'Made With ML — Goku Mohandas', u: 'https://github.com/GokuMohandas/Made-With-ML', a: 'Goku Mohandas', ty: 'Course', pr: 'Free', du: '~20 hrs', mo: 'M9 — MLOps & Production', d: 'Full-stack ML project tutorial covering version control, testing, CI/CD, and deployment. The most practical MLOps introduction available.', cov: 'Project setup, data pipelines, feature engineering, model development, experiment tracking, testing strategies, CI/CD pipelines, containerization, model serving.', ou: 'You will build a complete ML project from scratch that is tested, deployed, and monitored — the full production lifecycle.', ti: 'After shipping at least one model. MLOps makes sense only when you have felt the pain of manual deployment.' },
          { n: 'Full Stack Deep Learning — UC Berkeley', u: 'https://fullstackdeeplearning.com/', a: 'UC Berkeley / The Full Stack Team', ty: 'Course', pr: 'Free', du: '~25 hrs', mo: 'M9 — MLOps & Production', d: 'Production ML course covering deployment infrastructure, monitoring, data pipelines, and team workflows from experienced practitioners.', cov: 'ML infrastructure, data management, model deployment, monitoring systems, A/B testing, pipeline orchestration, team collaboration, project management, case studies.', ou: 'You will understand how ML systems operate at scale in production environments — from infrastructure to team workflows.', ti: 'After or alongside Made With ML. The two courses complement each other perfectly.' }
        ]},
        { label: 'Books', items: [
          { n: 'Designing Machine Learning Systems (Chip Huyen)', u: 'https://www.oreilly.com/library/view/designing-machine-learning/9781098107956/', a: 'Chip Huyen', ty: 'Book', pr: 'Paid', du: '~15 hrs', mo: 'M9 — MLOps & Production', d: 'The definitive ML systems design book. Covers feature stores, data engineering, monitoring, and production architecture patterns in depth.', cov: 'ML system design, data engineering, feature stores, model development workflow, deployment patterns, monitoring and observability, continuous learning, ethical considerations.', ou: 'You will design ML systems that are reliable, maintainable, and scalable — the complete system design perspective.', ti: 'After the courses. Read when you are designing your first production ML architecture.' },
          { n: 'Machine Learning Engineering (Andriy Burkov)', u: 'https://www.mlebook.com/', a: 'Andriy Burkov', ty: 'Book', pr: 'Paid', du: '~10 hrs', mo: 'M9 — MLOps & Production', d: 'Concise, practical guide to building reliable ML systems. Excellent reference for common production patterns and pitfalls.', cov: 'ML project lifecycle, data management, feature engineering, model selection, training infrastructure, deployment strategies, monitoring, maintenance, team organization.', ou: 'You will have a practical reference for every phase of the ML project lifecycle — from scoping to maintenance.', ti: 'Reference throughout the MLOps phase. Use as a handbook for specific production challenges.' }
        ]},
        { label: 'Tools & practice', items: [
          { n: 'Weights & Biases Documentation', u: 'https://docs.wandb.ai/', a: 'Weights & Biases', ty: 'Website', pr: 'Free (personal) / Paid (team)', du: '~3 hrs setup + reference', mo: 'M9 — MLOps & Production', d: 'Industry-standard experiment tracking, hyperparameter optimization, and model registry. Essential for reproducible ML research.', cov: 'Experiment tracking, hyperparameter sweeps, model registry, dataset versioning, artifact management, collaborative reports, automated workflows, integrations.', ou: 'You will never lose track of an experiment again. Every hyperparameter, metric, and dataset version is logged automatically.', ti: 'Set up during your first serious ML project. The earlier you adopt experiment tracking, the better.' },
          { n: 'MLflow Documentation', u: 'https://mlflow.org/docs/latest/index.html', a: 'MLflow / Linux Foundation', ty: 'Website', pr: 'Free (open source)', du: '~3 hrs setup + reference', mo: 'M9 — MLOps & Production', d: 'Open-source ML lifecycle management covering experiment tracking, model packaging, and deployment. The most widely adopted MLOps framework.', cov: 'MLflow Tracking, MLflow Projects, MLflow Models, model registry, deployment to cloud platforms, custom flavor creation, REST API, plugin system.', ou: 'You will manage the complete ML lifecycle — from experiment to deployment — with the industry-standard open-source tool.', ti: 'After W&B for comparison. MLflow is more about the full lifecycle; W&B is better for experiment tracking.' },
          { n: 'FastAPI for Model Serving', u: 'https://fastapi.tiangolo.com/', a: 'Sebastián Ramírez', ty: 'Website', pr: 'Free (open source)', du: '~5 hrs', mo: 'M9 — MLOps & Production', d: 'High-performance Python API framework for serving ML models. The standard choice for production inference endpoints.', cov: 'Request handling, async endpoints, input validation, dependency injection, model loading patterns, batch inference, middleware, deployment, performance optimization.', ou: 'You will serve ML models behind production-grade APIs — the standard pattern for ML deployment.', ti: 'Before deploying your first model. FastAPI is the default choice for Python ML serving endpoints.' }
        ]},
        { label: 'Key paper', items: [
          { n: 'ML Technical Debt (Sculley et al., Google)', u: 'https://papers.nips.cc/paper_files/paper/2015/hash/86df7dcfd896fcaf2674f757a2463eba-Abstract.html', a: 'D. Sculley et al. (Google)', ty: 'Paper', pr: 'Free', du: '~30 min read', mo: 'M9 — MLOps & Production', d: 'Essential reading on hidden maintenance costs of ML systems. Understanding these pitfalls shapes every production engineering decision.', cov: 'Hidden debt categories, boundary erosion, configuration debt, data dependencies, feedback loops, monitoring debt, testing strategies, cultural debt management.', ou: 'You will design ML systems that avoid the hidden traps that make ML uniquely expensive to maintain.', ti: 'Before your first production deployment. This paper will change how you think about ML system design.' }
        ]}
      ]
    },
    research: {
      primary: 'PapersWithCode + Connected Papers',
      note: 'Reading papers is a skill. Use the three-pass method: abstract and figures first, then full read. Build this habit early.',
      steps: [
        { label: 'Discovery tools', items: [
          { n: 'Papers With Code', u: 'https://paperswithcode.com/', a: 'Papers With Code', ty: 'Website', pr: 'Free', du: 'Ongoing reference', mo: 'R2 — Research Methods', d: 'Research papers with linked implementations. The fastest way to reproduce SOTA results and understand what each contribution actually does.', cov: 'Paper-to-code linking, SOTA tracking across benchmarks, task-specific leaderboards, implementation browsing, dataset discovery, research trend analysis.', ou: 'You will bridge the gap between paper reading and implementation — seeing exactly how theory becomes code.', ti: 'Bookmark before reading your first paper. Use to find implementations for every paper you study.' },
          { n: 'HuggingFace Daily Papers', u: 'https://huggingface.co/papers', a: 'Hugging Face', ty: 'Website', pr: 'Free', du: '~15 min daily', mo: 'R2 — Research Methods', d: 'Curated daily digest of the most impactful new ML research. Stay current without drowning in arXiv volume.', cov: 'Daily paper selection, abstracts and summaries, community voting, topic categorization, direct links to papers, trending research identification.', ou: 'You will stay at the frontier of ML research with 15 minutes per day — the highest signal-to-noise research feed.', ti: 'Bookmark from Day 1. Check daily — the habit of staying current is built over months.' },
          { n: 'Connected Papers', u: 'https://www.connectedpapers.com/', a: 'Connected Papers', ty: 'Website', pr: 'Free', du: '~5 min per exploration', mo: 'R2 — Research Methods', d: 'Interactive graph exploring paper citations and related work. Discover the intellectual lineage of any research area visually.', cov: 'Graph visualization, prior work exploration, derivative work tracking, citation analysis, paper similarity metrics, visual literature review generation.', ou: 'You will see the intellectual lineage of any research area at a glance — essential for literature reviews.', ti: 'Use when starting a new research area. Visualize the citation graph before reading any paper.' },
          { n: 'Semantic Scholar', u: 'https://www.semanticscholar.org/', a: 'Allen Institute for AI', ty: 'Website', pr: 'Free', du: 'Ongoing reference', mo: 'R2 — Research Methods', d: 'AI-powered academic search with structured metadata, citation graphs, and research summaries. Find relevant papers efficiently.', cov: 'Academic search, citation graph navigation, TLDR summaries, influential citation identification, author analytics, topic modeling, API access for automation.', ou: 'You will find relevant papers faster and understand their impact immediately — TLDR summaries save hours of screening.', ti: 'Bookmark for research. Use Semantic Scholar instead of Google Scholar for ML research.' }
        ]},
        { label: 'Reading method', items: [
          { n: 'How to Read a Paper (Keshav)', u: 'https://web.stanford.edu/class/ee384m/Handouts/HowtoReadPaper.pdf', a: 'S. Keshav (Stanford)', ty: 'Paper', pr: 'Free', du: '~15 min read', mo: 'R2 — Research Methods', d: 'The definitive three-pass method for efficient paper reading. Learn this systematic approach before tackling your first paper.', cov: 'Three-pass reading method, first pass (screening), second pass (comprehension), third pass (deep critique), literature survey strategies, paper selection techniques.', ou: 'You will read papers in one-third the time with better comprehension — a system for efficient research consumption.', ti: 'Read before your first paper. Print it. Reference it for every paper you read in the first year.' }
        ]}
      ]
    },
    blogs: {
      primary: 'The Batch (DeepLearning.AI) — weekly must-read',
      note: 'Set up a weekly reading habit. These are the highest-signal sources in the field — each one is carefully curated or written by leading researchers.',
      steps: [
        { label: 'Weekly must-reads', items: [
          { n: 'The Batch — DeepLearning.AI', u: 'https://www.deeplearning.ai/the-batch/', a: 'Andrew Ng / DeepLearning.AI', ty: 'Newsletter', pr: 'Free', du: '~10 min weekly', mo: 'R3 — Staying Current', d: 'Weekly curated AI news and breakthroughs from Andrew Ng\'s team. The most respected industry digest — read every Friday.', cov: 'Weekly AI news roundup, breakthrough research coverage, industry developments, policy and ethics updates, practical ML tips, community highlights.', ou: 'You will stay informed about the AI field with a single weekly read — curated by one of the field\'s leading educators.', ti: 'Subscribe from Day 1. Read every Friday — the habit matters more than any individual issue.' },
          { n: 'TLDR AI — 5-min daily digest', u: 'https://tldr.tech/ai', a: 'TLDR', ty: 'Newsletter', pr: 'Free', du: '~5 min daily', mo: 'R3 — Staying Current', d: 'Five-minute daily AI news summary. Fastest way to stay informed without context switching or information overload.', cov: 'Daily AI news summaries, research highlights, industry announcements, tool releases, funding news, policy changes, curated in 5-minute digest format.', ou: 'You will stay current with zero effort — the lowest-friction way to track the AI field daily.', ti: 'Subscribe alongside The Batch. TLDR for daily awareness, The Batch for weekend depth.' }
        ]},
        { label: 'Deep technical dives', items: [
          { n: 'Ahead of AI — Sebastian Raschka', u: 'https://magazine.sebastianraschka.com/', a: 'Sebastian Raschka', ty: 'Newsletter', pr: 'Free', du: '~15 min per post', mo: 'R3 — Staying Current', d: 'Deep technical posts on LLMs, transformers, and training methods from a leading researcher-practitioner. Each post is a mini-lesson.', cov: 'LLM architecture deep-dives, training methodology analysis, paper walkthroughs, code implementations, PyTorch tutorials, research trend analysis, practical recipes.', ou: 'You will learn the practical implementation details behind every major LLM development — from someone who builds them.', ti: 'Subscribe during the NLP phase. Each post is worth a mini-course.' },
          { n: 'Lilian Weng\'s Blog', u: 'https://lilianweng.github.io/', a: 'Lilian Weng (OpenAI)', ty: 'Blog', pr: 'Free', du: '~1 hr per post', mo: 'R3 — Staying Current', d: 'Comprehensive survey-style blog posts that each function as a graduate-level lecture. The gold standard for ML technical writing.', cov: 'Diffusion model survey, GAN survey, contrastive learning, meta-learning, large-scale training, AI safety, uncertainty estimation, representation learning, RLHF.', ou: 'You will gain graduate-level understanding of any ML topic in a single afternoon\'s reading.', ti: 'Bookmark and check when starting a new topic. Each post is the definitive introduction to its subject.' },
          { n: 'Jay Alammar\'s Visual Explanations', u: 'https://jalammar.github.io/', a: 'Jay Alammar (Cohere)', ty: 'Blog', pr: 'Free', du: '~15 min per post', mo: 'R3 — Staying Current', d: 'The best visual explanations of Transformers, attention, and embeddings. Essential for conceptual understanding — share these with your study group.', cov: 'Word embeddings visualization, attention mechanism illustrated, Transformer architecture explained, BERT and GPT visualized, LoRA visual guide, RNN/LSTM animations.', ou: 'Complex architecture concepts become crystal clear through Jay\'s visual approach — share these when helping others.', ti: 'Reference throughout the NLP and DL phases. Read before tackling any new architecture topic.' }
        ]},
        { label: 'Research & analysis', items: [
          { n: 'Import AI — Jack Clark', u: 'https://importai.substack.com/', a: 'Jack Clark (formerly OpenAI)', ty: 'Newsletter', pr: 'Free', du: '~10 min per issue', mo: 'R3 — Staying Current', d: 'Long-running newsletter analyzing AI policy, safety, hardware, and industry trends. Broadens perspective beyond just the technical.', cov: 'AI policy analysis, safety research coverage, hardware developments, industry trends, geopolitical implications, compute governance, dataset releases, research funding.', ou: 'You will understand AI as a societal force — not just a technical field. Essential for informed participation in AI discourse.', ti: 'Subscribe once you are past the technical fundamentals. Appreciating policy requires technical context.' },
          { n: 'distill.pub — Interactive Research', u: 'https://distill.pub/', a: 'Distill (Google / Community)', ty: 'Website', pr: 'Free', du: '~30 min per article', mo: 'R3 — Staying Current', d: 'Interactive research articles with explorable explanations. The gold standard for communicating complex ML concepts clearly.', cov: 'Interactive visualizations, mechanistic interpretability, attention patterns, optimization landscapes, neural network visualization, RL environments, research communication.', ou: 'You will see ML concepts come alive through interactive visualization — the clearest explanations in the field.', ti: 'Browse when you want the deepest possible understanding of a specific topic. Each article is definitive.' }
        ]}
      ]
    },
    frontier: {
      primary: 'AI Index Report (Stanford HAI) + arXiv cs.LG',
      note: 'Stay current by reading one paper and one newsletter per week. Breadth matters as much as depth at this stage.',
      steps: [
        { label: 'Big picture', items: [
          { n: 'Stanford HAI 2026 AI Index Report', u: 'https://hai.stanford.edu/ai-index/2026-ai-index-report', a: 'Stanford HAI', ty: 'Report', pr: 'Free', du: '~2 hrs read', mo: 'M10 — Frontier & Breadth', d: 'The most comprehensive annual AI progress report tracking technical, economic, and policy dimensions. Essential for strategic perspective.', cov: 'AI R&D trends, technical performance benchmarks, responsible AI metrics, economic impact data, policy landscape analysis, public opinion, diversity statistics, global comparison.', ou: 'You will have a data-driven understanding of where AI stands as a field — essential for strategic career decisions.', ti: 'Read annually. Provides the big-picture context that technical specialization misses.' }
        ]},
        { label: 'Courses to broaden', items: [
          { n: 'fast.ai — Practical Deep Learning', u: 'https://course.fast.ai/', a: 'Jeremy Howard / fast.ai', ty: 'Course', pr: 'Free', du: '~30 hrs', mo: 'M10 — Frontier & Breadth', d: 'Top-down teaching philosophy — build production models immediately, then layer theory. Reframes how you think about learning ML.', cov: 'Image classification, NLP models, tabular data, recommendation systems, collaborative filtering, embeddings, CNNs, RNNs, Transformers, model deployment, ethical AI.', ou: 'You will see a completely different approach to learning ML — top-down, practical-first, and incredibly effective.', ti: 'Any time. fast.ai is particularly valuable if you learn by doing rather than by studying theory first.' },
          { n: 'MIT 6.S191 — Introduction to Deep Learning', u: 'https://introtodeeplearning.com/', a: 'MIT / Alexander Amini', ty: 'Course', pr: 'Free', du: '~15 hrs', mo: 'M10 — Frontier & Breadth', d: 'MIT\'s annually updated intro course covering latest research alongside foundations. Broad, rigorous, and current.', cov: 'Perceptrons and backpropagation, CNNs, RNNs, Transformers, generative models, deep reinforcement learning, responsible AI, latest research frontiers.', ou: 'You will see how MIT teaches deep learning — rigorous foundations with the latest research woven throughout.', ti: 'As a refresher or alternative perspective after completing the DL Specialization.' },
          { n: 'DeepLearning.AI Short Courses', u: 'https://learn.deeplearning.ai/', a: 'DeepLearning.AI / Andrew Ng', ty: 'Course', pr: 'Free', du: '1-2 hrs per course', mo: 'M10 — Frontier & Breadth', d: 'Focused 1-2 hour courses on RAG, agents, fine-tuning, multimodal, and safety. Practical skill boosters from industry leaders.', cov: 'LangChain for LLM apps, ChatGPT prompt engineering, RAG implementation, AI agent building, Stable Diffusion, LoRA fine-tuning, multimodal models, AI safety.', ou: 'You will gain practical skills in specific cutting-edge areas — each course is immediately applicable to real projects.', ti: 'Throughout the roadmap. Take specific courses when you need to build something in that area.' }
        ]},
        { label: 'Papers to read', items: [
          { n: 'Scaling Laws (Kaplan et al.)', u: 'https://arxiv.org/abs/2001.08361', a: 'Jared Kaplan et al. (OpenAI)', ty: 'Paper', pr: 'Free', du: '~1 hr read', mo: 'M10 — Frontier & Breadth', d: 'Understand the power-law relationships that govern model performance. These insights shape strategic decisions across the entire field.', cov: 'Cross-entropy scaling, power-law trends, compute-optimal frontier, data scaling, model size scaling, batch size effects, architectural comparison, practical recommendations.', ou: 'You will understand the fundamental scaling relationships that govern all large models — strategic insight, not just technique.', ti: 'After building and training models. Appreciating scaling laws requires practical experience.' },
          { n: 'Chinchilla (Hoffmann et al.)', u: 'https://arxiv.org/abs/2203.15556', a: 'Jordan Hoffmann et al. (DeepMind)', ty: 'Paper', pr: 'Free', du: '~45 min read', mo: 'M10 — Frontier & Breadth', d: 'Optimal compute allocation between model size and data. Essential for understanding why data quality matters as much as model scale.', cov: 'Training FLOPs analysis, parameter-token ratio, compute-optimal models, empirical methodology, comparison with existing scaling laws, implications for efficient training.', ou: 'You will know the optimal allocation of compute — the insight that changed how every lab trains models.', ti: 'After Scaling Laws. Together they form the complete picture of efficient training at scale.' }
        ]},
        { label: 'Stay updated', items: [
          { n: 'arXiv cs.LG / cs.AI / cs.CL', u: 'https://arxiv.org/', a: 'arXiv (Cornell University)', ty: 'Website', pr: 'Free', du: '~15 min daily skim', mo: 'M10 — Frontier & Breadth', d: 'The primary ML research feed — new papers published daily. Bookmark these three categories and skim titles weekly.', cov: 'Machine learning (cs.LG), artificial intelligence (cs.AI), computation and language (cs.CL) — daily research papers, abstracts, author lists, category browsing.', ou: 'You will have direct access to the primary research literature — no filter, no curation, no delay.', ti: 'Bookmark from Day 1. Skim titles daily — the habit of scanning research is built over years.' },
          { n: 'HuggingFace Daily Papers', u: 'https://huggingface.co/papers', a: 'Hugging Face', ty: 'Website', pr: 'Free', du: '~15 min daily', mo: 'M10 — Frontier & Breadth', d: 'Curated daily selection of the most impactful new papers. Saves hours of arXiv browsing while keeping you at the frontier.', cov: 'Curated paper selection, community voting, trending papers, abstracts and summaries, direct links to PDFs, topic-based filtering, daily email digest.', ou: 'You will stay at the frontier with minimal effort — the community does the filtering for you.', ti: 'Bookmark alongside arXiv. Use as your primary filter, then dive deeper on arXiv.' }
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
          <div class="seq-header-left">
            <div class="seq-icon">↗</div>
            <div>
              <div class="seq-meta">Sequenced Path</div>
              <div class="seq-title">Learning Sequence</div>
            </div>
          </div>
          <div class="seq-flagship">
            <div class="seq-flagship-label">Flagship</div>
            <div class="seq-flagship-name">${seq.primary}</div>
          </div>
        </div>
        <div class="seq-steps">
            ${seq.steps.map((step, si) => `<div class="seq-step">
              <div class="seq-step-line">
                <div class="seq-step-num">${si + 1}</div>
                ${si < seq.steps.length - 1 ? '<div class="seq-step-connector"></div>' : ''}
              </div>
              <div class="seq-step-content">
                <div class="seq-step-label">${step.label}</div>
                <div class="seq-cards">
                  ${step.items.map(function(item) {
                    var desc = item.d || '';
                    var cov = item.cov || '';
                    var url = item.u || '';
                    var author = item.a || '';
                    var type = item.ty || '';
                    var price = item.pr || '';
                    var duration = item.du || '';
                    var module = item.mo || '';
                    var outcome = item.ou || '';
                    var timing = item.ti || '';
                    var askUrl = item.ak || '';
                    var covChips = '';
                    if (cov) {
                      var parts = cov.split(',');
                      var chipItems = [];
                      for (var ci = 0; ci < parts.length; ci++) {
                        var cp = parts[ci].trim();
                        if (cp) chipItems.push('<span class="cov-chip">' + cp + '</span>');
                      }
                      covChips = '<div class="cov-chips">' + chipItems.join('') + '</div>';
                    }
                    var metaParts = [];
                    if (author) metaParts.push(author);
                    if (type) metaParts.push(type);
                    if (price) metaParts.push(price);
                    if (duration) metaParts.push(duration);
                    var metaHtml = metaParts.length ? '<div class="seq-card-meta">' + metaParts.join('<span class="seq-meta-sep">·</span>') + '</div>' : '';
                    var html = '<div class="seq-card" onclick="toggleSeqDropdown(this)">' +
                      '<div class="seq-card-main">' +
                        '<div class="seq-card-title-row">' +
                          '<div class="seq-card-title">' + item.n + '</div>' +
                          '<span class="seq-card-arrow">▾</span>' +
                        '</div>' +
                        metaHtml +
                      '</div>' +
                      '<div class="seq-card-dropdown">' +
                        '<div class="seq-dropdown-inner">' +
                          '<div class="seq-drop-table">' +
                            (module ? '<div class="seq-drop-row"><div class="seq-drop-label">Module</div><div class="seq-drop-value">' + module + '</div></div>' : '') +
                            (cov ? '<div class="seq-drop-row"><div class="seq-drop-label">Covers</div><div class="seq-drop-value">' + covChips + '</div></div>' : '') +
                            '<div class="seq-drop-row"><div class="seq-drop-label">Why</div><div class="seq-drop-value">' + desc + '</div></div>' +
                            (outcome ? '<div class="seq-drop-row"><div class="seq-drop-label">Outcome</div><div class="seq-drop-value">' + outcome + '</div></div>' : '') +
                            (timing ? '<div class="seq-drop-row"><div class="seq-drop-label">Timing</div><div class="seq-drop-value">' + timing + '</div></div>' : '') +
                          '</div>' +
                          '<div class="seq-drop-links">' +
                            (url ? '<a class="seq-card-ext-link" href="' + url.replace(/'/g, "\\'") + '" target="_blank" onclick="event.stopPropagation()">Open Resource ↗</a>' : '') +
                            (askUrl ? '<a class="seq-card-ext-link" href="' + askUrl.replace(/'/g, "\\'") + '" target="_blank" onclick="event.stopPropagation()">Ask Deeper ↗</a>' : '') +
                          '</div>' +
                        '</div>' +
                      '</div>' +
                    '</div>';
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
