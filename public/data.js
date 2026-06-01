// Lucide icon names for each phase
const ICONS = {
  python: 'terminal',
  math: 'sigma',
  classical: 'bar-chart-2',
  dl: 'cpu',
  fp: 'layers',
  spec: 'crosshair',
  llms: 'sparkles',
  mlops: 'box',
  updates: 'rss',
  guidance: 'compass'
};


const PHASES=[
  {key:'python',icon:'terminal',label:'Python',stage:'Phase 0',dur:'4–6 weeks',
   purpose:'Python is the universal language of ML. Master it before everything else. NumPy, Pandas, and Matplotlib are the toolkit you will use daily for the next decade.',
   guide: {
     steps: [
       {label:'Start with CS50P (Topic 1).', desc:'Work through it fully, top to bottom. Do not skip the problem sets — they force you to write real, working code. This takes 3–4 weeks and gives you the Python foundation that everything else in this roadmap depends on.'},
       {label:'Layer in Corey Schafer\'s OOP series.', desc:'Watch this alongside CS50P Week 8 (OOP). Pause the video and retype every example yourself. Understanding classes now means PyTorch will make sense later.'},
       {label:'Move to Topic 2 (NumPy) immediately after.', desc:'Watch the NumPy Crash Course in one sitting (2 hrs), then read PDSH Chapter 2. Practice by rewriting your CS50P exercises using arrays instead of loops — this builds the vectorization instinct.'},
       {label:'Topic 3 (Pandas) is the critical skill for jobs.', desc:'Do the Kaggle Pandas course first (it runs in-browser, no setup needed). Then watch Keith Galli\'s tutorial using a real dataset. Spend a week here — messy data is 60% of a data science job.'},
       {label:'Topic 4 (Visualization) last, but not optional.', desc:'Run through Corey\'s Matplotlib series on 1.5× speed — it\'s about pattern recognition, not memorization. Then bookmark the Seaborn gallery for future reference.'}
     ],
     tip: 'Pro tip: Set up a local Jupyter notebook environment (VS Code + Jupyter extension) from Day 1. Never learn Python through a browser REPL — running code locally forces you to deal with environments, which is a real ML engineering skill.'
   },
   topics: [
     {
       title: '1. Python Basics & OOP',
       desc: 'Learn the syntax, loops, functions, and Object-Oriented Programming principles.',
       course: {
         name:'CS50P — Introduction to Programming with Python',
         provider:'Harvard / edX · Free',
         url:'https://cs50.harvard.edu/python/',
         desc:'Harvard\'s gold-standard Python intro. Free to audit fully.',
         covered:'• Functions and Variables\n• Conditionals and Loops\n• Exceptions and Error Handling\n• Libraries and Unit Tests\n• File I/O and Regular Expressions\n• Object-Oriented Programming',
         why:'CS50P provides a rigorous, computer-science-first approach to Python. Instead of just learning syntax, you learn how to structure robust programs, which is critical before moving to complex ML pipelines.'
       },
       youtube: [{
         n:'Corey Schafer: Python OOP Tutorials', 
         url:'https://www.youtube.com/playlist?list=PL-osiE80TeTsqhIuOqKhwlBd8NmO30BM0', 
         s:'2M', 
         d:'The best resource for understanding Classes and Objects in Python.',
         covered:'• Classes and Instances\n• Class Variables and Instance Variables\n• classmethods and staticmethods\n• Inheritance and Subclasses\n• Special (Magic/Dunder) Methods\n• Property Decorators (Getters, Setters)',
         why:'Understanding Object-Oriented Programming is mandatory for reading modern ML frameworks like PyTorch, where every neural network model is defined as a Python Class.'
       }],
       books: [{
         t:'Automate the Boring Stuff with Python',
         a:'Al Sweigart',
         url:'https://automatetheboringstuff.com/',
         free:true,
         d:'Free online. Real skills through projects.',
         covered:'• Python basic syntax and flow control\n• Dictionaries and structuring data\n• String manipulation\n• Pattern matching with Regular Expressions\n• Reading and writing files',
         why:'A highly practical, project-based book that focuses on writing code that does real work immediately, keeping motivation high.'
       }],
       websites: [{
         n:'W3Schools Python', 
         url:'https://www.w3schools.com/python/', 
         s:'Free', 
         d:'Quick reference and interactive exercises.',
         covered:'• Quick syntax reference\n• Try-it-yourself browser compiler\n• Array and List methods\n• Built-in functions',
         why:'The best place for immediate syntax lookups and quick interactive practice when you forget how a specific Python function works.'
       }]
     },
     {
       title: '2. Numerical Data with NumPy',
       desc: 'Vectorized mathematical operations for fast array processing.',
       course: {
         name:'NumPy Crash Course',
         provider:'FreeCodeCamp · Free',
         url:'https://www.youtube.com/watch?v=QUT1VHiLmmI',
         desc:'In-depth overview of multidimensional arrays and vectorization.',
         covered:'• Creating and inspecting arrays\n• Array math and broadcasting\n• Indexing and slicing\n• Linear algebra operations\n• Random number generation',
         why:'NumPy is the foundational library for all numerical computing in Python. PyTorch tensors and Pandas DataFrames are heavily based on NumPy principles.'
       },
       books: [{
         t:'Python Data Science Handbook (Ch 2)',
         a:'Jake VanderPlas',
         url:'https://jakevdp.github.io/PythonDataScienceHandbook/',
         free:true,
         d:'The definitive guide to NumPy internals.',
         covered:'• Understanding data types in Python\n• The basics of NumPy arrays\n• Computation on arrays: UFuncs\n• Aggregations: Min, Max, and everything in between\n• Broadcasting',
         why:'Jake VanderPlas explains not just how to use NumPy, but *why* vectorized operations are orders of magnitude faster than standard Python loops.'
       }]
     },
     {
       title: '3. Data Wrangling with Pandas',
       desc: 'Loading, cleaning, and transforming tabular datasets.',
       course: {
         name:'Kaggle Pandas Course',
         provider:'Kaggle · Free',
         url:'https://www.kaggle.com/learn/pandas',
         desc:'Interactive exercises to learn DataFrames, grouping, and merging.',
         covered:'• Creating, Reading and Writing\n• Indexing, Selecting & Assigning\n• Summary Functions and Maps\n• Grouping and Sorting\n• Data Types and Missing Values',
         why:'Kaggle provides hands-on, browser-based notebooks so you can immediately practice what you learn on real datasets without setting up a local environment.'
       },
       youtube: [{
         n:'Keith Galli Pandas Data Science Tutorial', 
         url:'https://www.youtube.com/watch?v=vmEHCJofslg', 
         s:'1M', 
         d:'A fantastic real-world walkthrough of Pandas.',
         covered:'• Loading various data formats (CSV, Excel, TXT)\n• Filtering and sorting data\n• Advanced grouping (groupby)\n• Saving data\n• Real-world sales data analysis example',
         why:'Watching someone manipulate a real, messy dataset in real-time is the fastest way to understand the practical workflow of a data scientist.'
       }],
       books: [{
         t:'Python Data Science Handbook (Ch 3)',
         a:'Jake VanderPlas',
         url:'https://jakevdp.github.io/PythonDataScienceHandbook/',
         free:true,
         d:'Comprehensive reference for Pandas.',
         covered:'• The Pandas Series and DataFrame objects\n• Data indexing and selection\n• Handling missing data\n• Hierarchical indexing\n• Combining datasets: Merge and Join',
         why:'The most well-structured written reference for understanding how Pandas builds on top of NumPy to provide labeled, relational data structures.'
       }]
     },
     {
       title: '4. Data Visualization',
       desc: 'Creating plots and graphs to understand data distributions.',
       youtube: [{
         n:'Corey Schafer Matplotlib Series', 
         url:'https://www.youtube.com/playlist?list=PL-osiE80TeTvipOqomVEeZ1HRrcEvtZB_', 
         s:'1M', 
         d:'Master plotting with Matplotlib.',
         covered:'• Line charts, Bar charts, Pie charts\n• Stack plots and fill_between\n• Histograms and Scatter plots\n• Plotting live data in real-time\n• Subplots',
         why:'Matplotlib is notoriously difficult to memorize. Corey breaks down the object-oriented API clearly so you can customize any aspect of a graph.'
       }],
       websites: [{
         n:'Seaborn Gallery', 
         url:'https://seaborn.pydata.org/examples/index.html', 
         s:'Docs', 
         d:'Learn high-level statistical plotting.',
         covered:'• Heatmaps\n• Pairplots and jointplots\n• Violin plots and box plots\n• Regression plots',
         why:'Seaborn creates beautiful statistical visualizations with just one line of code, automatically handling complex Matplotlib styling.'
       }]
     }
   ]
  },
  {key:'math',icon:'sigma',label:'Math for ML',stage:'Phase 1',dur:'6–8 weeks',
   purpose:'ML is applied mathematics. Linear algebra defines data representation. Calculus explains how learning happens. Probability models uncertainty.',
   guide: {
     steps: [
       {label:'Begin with 3Blue1Brown\'s Essence of Linear Algebra (Topic 1).', desc:'Watch all 15 videos before touching the Coursera course. The goal is geometric intuition, not calculation. Watch 2–3 episodes per sitting — no notes, just watch and understand the visuals.'},
       {label:'Then take the Imperial College Linear Algebra course (Coursera).', desc:'Now the formal notation will make sense because you have the intuition. Focus on the PCA module — it directly connects to dimensionality reduction in ML.'},
       {label:'Topic 2 (Calculus): same pattern — 3B1B first, Coursera second.', desc:'The Essence of Calculus series (12 videos) builds the intuition for what a derivative actually means. Only then take the Coursera Multivariate Calculus course, paying special attention to the gradient descent module.'},
       {label:'Read the Matrix Calculus paper (Topic 2) before moving on.', desc:'This 30-page paper is the bridge from standard calculus to the math of neural networks. Read it slowly, with a pen and paper beside you to verify the derivations.'},
       {label:'Topic 3 (Probability): Watch StatQuest and run the Seeing Theory simulations.', desc:'Don\'t just read — actively move the sliders in Seeing Theory while watching StatQuest. Probability is the hardest subject to build intuition for without interactive tools.'}
     ],
     tip: 'Pro tip: Do not try to master every proof. The goal is to be able to read a paper that uses these concepts and understand what the author is doing. Spend 70% of your time on linear algebra and calculus — probability can be deepened later when you study Bayesian methods.'
   },
   topics: [
     {
       title: '1. Linear Algebra',
       desc: 'Vectors, matrices, eigenvalues, and Singular Value Decomposition.',
       course: {
         name:'Mathematics for ML: Linear Algebra',
         provider:'Imperial College London · Coursera',
         url:'https://www.coursera.org/learn/linear-algebra-machine-learning',
         desc:'Bridges pure math to ML explicitly.',
         covered:'• Vectors and matrices\n• Basis and dimension\n• Dot products and orthogonality\n• Eigenvalues and Eigenvectors\n• Principal Component Analysis (PCA)',
         why:'Most math courses teach abstract concepts. This course specifically frames every mathematical operation around how it is used to process data in machine learning.'
       },
       youtube: [{
         n:'Essence of Linear Algebra', 
         url:'https://www.youtube.com/playlist?list=PLZHQObOWTQDPD3MizzM2xVFitgF8hE_ab', 
         s:'3Blue1Brown', 
         d:'The absolute best visual intuition for linear algebra.',
         covered:'• Linear transformations\n• The determinant\n• Inverse matrices\n• Dot products and cross products\n• Change of basis',
         why:'Grant Sanderson uses animations to show what matrices actually DO to space. You will gain a geometric intuition that makes dry formulas make sense.'
       }],
       books: [{
         t:'Linear Algebra Done Right',
         a:'Sheldon Axler',
         url:'https://linear.axler.net/',
         free:true,
         d:'Rigorous derivations of vector spaces.',
         covered:'• Vector spaces\n• Linear maps\n• Polynomials\n• Inner product spaces\n• Spectral theorem',
         why:'For those who want to eventually read advanced AI research papers, this book provides the formal proof-based foundation required to understand theoretical ML.'
       }]
     },
     {
       title: '2. Multivariate Calculus',
       desc: 'Derivatives, gradients, and optimization.',
       course: {
         name:'Mathematics for ML: Multivariate Calculus',
         provider:'Imperial College London · Coursera',
         url:'https://www.coursera.org/learn/multivariate-calculus-machine-learning',
         desc:'Learn how gradients are used in optimization.',
         covered:'• Derivatives and partial derivatives\n• Gradients and Jacobians\n• The Chain Rule for neural networks\n• Taylor series\n• Optimization and gradient descent',
         why:'Calculus is the engine of Deep Learning. This course skips the manual integration tricks taught in high school and focuses entirely on the calculus needed for backpropagation.'
       },
       youtube: [{
         n:'Essence of Calculus', 
         url:'https://www.youtube.com/playlist?list=PLZHQObOWTQDMsr9K-rj53DwVRMYO3t5Yr', 
         s:'3Blue1Brown', 
         d:'Visual intuition for limits, derivatives, and integrals.',
         covered:'• The paradox of the derivative\n• Visualizing the chain rule\n• Exponential functions\n• Implicit differentiation\n• Limits and integrals',
         why:'Provides the deep conceptual understanding of what a derivative actually represents, preventing calculus from just being a series of memorized rules.'
       }],
       papers: [{
         t:'The Matrix Calculus You Need for Deep Learning',
         a:'Parr & Howard (2018)',
         url:'https://arxiv.org/abs/1802.01528',
         d:'Deriving matrix calculus rules for backpropagation.',
         covered:'• Scalar, vector, and matrix derivatives\n• The Jacobian matrix\n• Chain rule for vectors\n• Element-wise operations\n• Deriving backpropagation for a neural network',
         why:'Standard calculus classes don\'t teach you how to take the derivative of a matrix with respect to a matrix. This paper bridges that exact gap for deep learning.'
       }]
     },
     {
       title: '3. Probability & Statistics',
       desc: 'Distributions, Bayes theorem, and statistical significance.',
       youtube: [{
         n:'StatQuest with Josh Starmer', 
         url:'https://www.youtube.com/c/joshstarmer', 
         s:'1M', 
         d:'BAM! The clearest explanations of complex statistical concepts.',
         covered:'• Normal distributions and standard deviation\n• P-values and statistical significance\n• Maximum Likelihood Estimation (MLE)\n• Bayes Theorem\n• Hypothesis testing',
         why:'Josh Starmer breaks down complex statistical math into incredibly simple, step-by-step visual examples. Best for visual learners.'
       }],
       books: [{
         t:'Probabilistic Machine Learning Vol. 1',
         a:'Kevin Murphy',
         url:'https://probml.github.io/pml-book/book1.html',
         free:true,
         d:'Treats all ML through probability.',
         covered:'• Probability basics\n• Generative models for discrete data\n• Gaussian models\n• Bayesian statistics\n• Linear regression through probability',
         why:'Modern AI (especially LLMs and Diffusion models) is fundamentally probabilistic. Murphy\'s book teaches you to view every ML algorithm as a probability distribution.'
       }],
       websites: [{
         n:'Seeing Theory', 
         url:'https://seeing-theory.brown.edu/', 
         s:'Brown Univ', 
         d:'Interactive web book for visual probability.',
         covered:'• Basic probability\n• Compound probability\n• Distributions\n• Frequentist Inference\n• Bayesian Inference',
         why:'An interactive textbook that lets you play with sliders and visual simulations to truly grasp concepts like the Central Limit Theorem.'
       }]
     }
   ]
  },
  {key:'classical',icon:'bar-chart-2',label:'Classical ML',stage:'Stages 1–2',dur:'10–12 weeks',
   purpose:'Classical ML teaches what deep learning hides — bias-variance tradeoff, regularisation, cross-validation, feature engineering.',
   guide: {
     steps: [
       {label:'Start with Andrew Ng\'s ML Specialization (Topic 1).', desc:'This is your primary curriculum for this entire phase. Take all 3 courses in sequence. Do not skip the coding labs — they use NumPy and scikit-learn, tying directly back to Phase 0. Budget 6–7 weeks for all three courses.'},
       {label:'Read ISLP (Topic 1) concurrently as a reference book.', desc:'Don\'t read cover-to-cover. Use it chapter-by-chapter alongside the Specialization. When Ng teaches logistic regression, open ISLP Chapter 4. The book provides the mathematical depth that the course skips.'},
       {label:'Move to Topic 2 (Unsupervised) in Specialization Course 3.', desc:'This is already part of the ML Specialization sequence. After completing it, clone ML-From-Scratch and read the unsupervised implementations. Reading pure NumPy code without a framework is a critical skill check.'},
       {label:'Tackle Topic 3 (Ensembles) — read the XGBoost paper.', desc:'Watch the StatQuest Random Forests video first (20 min), then read the XGBoost paper. Understanding why boosting dominates tabular data is essential before moving to deep learning.'},
       {label:'Finish with Topic 4 (Géron\'s Hands-On ML).', desc:'Read chapters 1–8 of Hands-On ML. This ties together everything you\'ve learned using real scikit-learn pipelines. After finishing Chapter 8, you should be able to enter a basic Kaggle tabular competition.'}
     ],
     tip: 'Pro tip: Enter at least ONE Kaggle competition before finishing this phase — even just submitting a baseline model. The leaderboard feedback loop teaches you things that no course can.'
   },
   topics: [
     {
       title: '1. Supervised Learning',
       desc: 'Linear regression, Logistic Regression, SVMs, and Decision Trees.',
       course: {
         name:'Machine Learning Specialization',
         provider:'Andrew Ng / DeepLearning.AI',
         url:'https://www.deeplearning.ai/courses/machine-learning-specialization/',
         desc:'The gold standard intro to ML algorithms.',
         covered:'• Linear regression and cost functions\n• Gradient descent\n• Logistic regression for classification\n• Overfitting and Regularization\n• Decision trees and ensembles',
         why:'Andrew Ng is considered the best AI teacher in the world. This is the modernized version (in Python) of his legendary Stanford ML course.'
       },
       books: [{
         t:'An Introduction to Statistical Learning (ISLP)',
         a:'James, Witten, Hastie, Tibshirani',
         url:'https://www.statlearning.com/',
         free:true,
         d:'The most readable ML textbook.',
         covered:'• Assessing model accuracy\n• Linear and multiple regression\n• Classification (Logistic, LDA, QDA)\n• Resampling methods (Cross-validation, Bootstrap)\n• Tree-based methods',
         why:'The most highly recommended textbook in data science. It strikes the perfect balance between mathematical rigor and readable, practical explanations.'
       }],
       youtube: [{
         n:'StatQuest: Linear Models', 
         url:'https://www.youtube.com/user/joshstarmer', 
         s:'StatQuest', 
         d:'Clear breakdown of regression and classification.',
         covered:'• Linear Regression clearly explained\n• Multiple Regression\n• Logistic Regression\n• Support Vector Machines (SVMs)',
         why:'Visualizes exactly how algorithms draw lines of best fit and margins, removing the mystery of the underlying math.'
       }]
     },
     {
       title: '2. Unsupervised Learning',
       desc: 'K-Means clustering, PCA, and anomaly detection.',
       course: {
         name:'Unsupervised Learning, Recommenders',
         provider:'Andrew Ng',
         url:'https://www.coursera.org/learn/unsupervised-learning-recommenders-reinforcement-learning',
         desc:'Course 3 of the ML Specialization.',
         covered:'• K-means clustering algorithm\n• Anomaly detection\n• Collaborative filtering (Recommender systems)\n• Content-based filtering\n• Reinforcement learning basics',
         why:'Teaches you how to find patterns in data when you don\'t have labeled targets—a very common real-world scenario.'
       },
       repos: [{
         n:'eriklindernoren/ML-From-Scratch',
         url:'https://github.com/eriklindernoren/ML-From-Scratch',
         s:'24k',
         d:'Every classical ML algorithm in pure NumPy.',
         covered:'• Pure Python/NumPy implementations\n• PCA and LDA from scratch\n• K-Means and DBSCAN from scratch\n• Tree models from scratch',
         why:'Looking at the source code of an algorithm written in pure NumPy is the ultimate test of understanding. Highly recommended to read through.'
       }]
     },
     {
       title: '3. Ensembles & Boosting',
       desc: 'Random Forests, Gradient Boosting, XGBoost.',
       papers: [
         {
           t:'XGBoost: A Scalable Tree Boosting System',
           a:'Chen & Guestrin',
           url:'https://arxiv.org/abs/1603.02754',
           d:'The Kaggle-winning algorithm.',
           covered:'• Tree boosting framework\n• Regularized learning objective\n• Split finding algorithms\n• System design for out-of-core computing',
           why:'XGBoost dominated tabular data machine learning for a decade. Reading the original paper shows how systems engineering meets algorithmic design.'
         },
         {
           t:'Random Forests',
           a:'Leo Breiman',
           url:'https://link.springer.com/article/10.1023/A:1010933404324',
           d:'Why bagging reduces variance.',
           covered:'• Ensemble learning basics\n• Bagging (Bootstrap Aggregating)\n• Random feature selection\n• Out-of-bag error estimation',
           why:'A classic machine learning paper that introduced one of the most robust, easy-to-use algorithms in existence.'
         }
       ],
       youtube: [{
         n:'StatQuest: Random Forests', 
         url:'https://www.youtube.com/watch?v=J4Wdy0Wc_xQ', 
         s:'StatQuest', 
         d:'Step-by-step RF building.',
         covered:'• Bootstrapping data\n• Building multiple trees\n• Feature bagging\n• Evaluating with out-of-bag samples',
         why:'Breaks down the somewhat abstract concept of ensemble learning into a clear, visual flowchart.'
       }]
     },
     {
       title: '4. Practical Implementation',
       desc: 'Pipelines, cross-validation, and hyperparameter tuning.',
       books: [{
         t:'Hands-On ML Notebooks (3rd Ed.)',
         a:'Aurélien Géron',
         url:'https://github.com/ageron/handson-ml3',
         free:true,
         d:'Best balance of theory and working code using sklearn.',
         covered:'• End-to-end ML project workflow\n• Data cleaning pipelines\n• Model selection and training\n• Grid Search and Randomized Search\n• Ensemble methods in Scikit-Learn',
         why:'While ISLP teaches the theory, Géron teaches the exact Python code and Scikit-Learn APIs you will use in an actual data science job.'
       }],
       websites: [{
         n:'Scikit-Learn User Guide', 
         url:'https://scikit-learn.org/stable/user_guide.html', 
         s:'Docs', 
         d:'Read the incredible documentation of sklearn.',
         covered:'• API references\n• Algorithm comparisons\n• Preprocessing pipelines\n• Metrics and scoring',
         why:'Scikit-Learn has arguably the best documentation of any open source project. Reading it is like reading a textbook.'
       }]
     }
   ]
  },
  {key:'dl',icon:'cpu',label:'Deep Learning',stage:'Stage 3',dur:'12–16 weeks',
   purpose:'Systematic mastery of neural networks — forward and backward passes, architectures, and engineering tricks.',
   guide: {
     steps: [
       {label:'Start with Michael Nielsen\'s book (Topic 1) — read Chapter 1 and 2.', desc:'Read these two chapters before starting Andrew Ng\'s Deep Learning Specialization. Nielsen\'s written explanation of backpropagation is the clearest that exists. 4 hours of reading now saves 4 days of confusion later.'},
       {label:'Take DL Specialization Course 1 (Topic 1) and code everything.', desc:'Do not just watch — every week has a programming assignment. Do them in pure NumPy before the course shows you the solution. Building a 2-layer NN from scratch in NumPy is the most important exercise in this entire roadmap.'},
       {label:'Topic 2 (Regularization): take DLS Course 2 immediately after Course 1.', desc:'This course teaches the engineering tricks that make networks actually train. Implement Adam, BatchNorm, and Dropout yourself. Read the original Dropout and Adam papers — they are short (10 pages each) and highly readable.'},
       {label:'Topic 3 (CNNs) — DLS Course 4. Use TF Playground first.', desc:'Before starting Course 4, spend 30 minutes on TensorFlow Playground building intuition for how convolutions transform images. Then take Course 4. Read the ResNet paper after the ResNet lecture — this is the most important CV paper to understand.'},
       {label:'Topic 4 (Sequence Models): DLS Course 5 + CS224n.', desc:'Take DLS Course 5 to understand RNNs and LSTMs. Then watch the first 4 CS224n lectures to see how the field moved from RNNs to Transformers. This sets up Phase 4 perfectly.'}
     ],
     tip: 'Pro tip: Switch from NumPy to PyTorch after finishing DLS Course 2. Use the official PyTorch 60-minute blitz tutorial, then re-implement everything you built in NumPy using PyTorch. This dual implementation approach builds the deepest possible understanding.'
   },
   topics: [
     {
       title: '1. Neural Networks & Backpropagation',
       desc: 'Multi-layer perceptrons, activation functions, and gradient descent.',
       course: {
         name:'Deep Learning Specialization',
         provider:'Andrew Ng / DeepLearning.AI',
         url:'https://www.deeplearning.ai/courses/deep-learning-specialization/',
         desc:'Complete 5-course series on deep networks.',
         covered:'• Logistic regression as a neural network\n• Shallow neural networks\n• Deep L-layer networks\n• Forward and backward propagation\n• Parameters vs Hyperparameters',
         why:'The definitive introduction to Deep Learning. Ng breaks down the math of backpropagation so clearly that you can implement it in pure NumPy by week 4.'
       },
       books: [{
         t:'Neural Networks and Deep Learning',
         a:'Michael Nielsen',
         url:'http://neuralnetworksanddeeplearning.com/',
         free:true,
         d:'The clearest explanation of backprop.',
         covered:'• Using neural nets to recognize digits\n• How the backpropagation algorithm works\n• Improving the way neural networks learn\n• Visual proof that NNs can compute any function',
         why:'An interactive online book that provides the best written explanation of backpropagation and the universal approximation theorem.'
       }],
       websites: [{
         n:'TensorFlow Playground', 
         url:'https://playground.tensorflow.org/', 
         s:'Interactive', 
         d:'Play with neural networks in the browser.',
         covered:'• Visualizing hidden layers\n• Effect of learning rates\n• Activation functions (ReLU, Tanh, Sigmoid)\n• Feature crosses',
         why:'Allows you to build intuition for how neural networks warp and fold space to separate data classes without writing a single line of code.'
       }]
     },
     {
       title: '2. Regularization & Optimization',
       desc: 'Dropout, Batch Norm, Adam optimizer, initialization strategies.',
       course: {
         name:'Improving Deep NNs',
         provider:'DeepLearning.AI',
         url:'https://www.coursera.org/learn/deep-neural-network',
         desc:'Crucial hyperparameter tuning strategies.',
         covered:'• Train/Dev/Test distributions\n• L2 and Dropout regularization\n• Vanishing/Exploding gradients\n• Mini-batch gradient descent\n• RMSprop and Adam optimization\n• Batch Normalization',
         why:'Building a network is easy; making it train successfully is hard. This course teaches the "black magic" engineering tricks required to make deep networks converge.'
       },
       papers: [
         {
           t:'Dropout',
           a:'Srivastava et al.',
           url:'https://arxiv.org/abs/1207.0580',
           d:'Preventing overfitting.',
           covered:'• Motivation for dropout\n• Model averaging\n• The forward and backward pass with dropout\n• Experimental results on standard datasets',
           why:'One of the most highly cited deep learning papers that introduced a dead-simple but incredibly effective way to prevent neural networks from memorizing data.'
         },
         {
           t:'Adam',
           a:'Kingma & Ba',
           url:'https://arxiv.org/abs/1412.6980',
           d:'The standard DL optimizer.',
           covered:'• The Adam algorithm\n• Momentum and RMSprop combined\n• Bias correction\n• Convergence analysis',
           why:'Adam is the default optimizer for 95% of deep learning projects. Reading this paper explains how it adapts learning rates for different parameters automatically.'
         }
       ]
     },
     {
       title: '3. Convolutional Neural Networks (CV)',
       desc: 'Convolutions, pooling, ResNets, and object detection.',
       course: {
         name:'Convolutional Neural Networks',
         provider:'DeepLearning.AI',
         url:'https://www.coursera.org/learn/convolutional-neural-networks',
         desc:'Master CV architectures.',
         covered:'• Edge detection and convolutions\n• Padding, striding, and pooling\n• Classic networks (LeNet, AlexNet, VGG)\n• ResNets and Inception\n• Object detection (YOLO)\n• Face recognition and Neural Style Transfer',
         why:'Teaches exactly how neural networks process grid-like topology (images) and how modern architectures evolved to solve the vanishing gradient problem.'
       },
       papers: [{
         t:'Deep Residual Learning (ResNet)',
         a:'He et al.',
         url:'https://arxiv.org/abs/1512.03385',
         d:'Skip connections solved vanishing gradients.',
         covered:'• The degradation problem of deep networks\n• Residual blocks and skip connections\n• Identity mapping\n• Training 152-layer networks',
         why:'ResNet revolutionized deep learning by proving you could train networks with hundreds of layers. It is the backbone of modern computer vision.'
       }]
     },
     {
       title: '4. Sequence Models',
       desc: 'Time-series, NLP, LSTMs, and GRUs.',
       course: {
         name:'Sequence Models',
         provider:'DeepLearning.AI',
         url:'https://www.coursera.org/learn/nlp-sequence-models',
         desc:'Handle temporal data.',
         covered:'• Recurrent Neural Networks (RNNs)\n• Gated Recurrent Units (GRUs)\n• Long Short-Term Memory (LSTMs)\n• Word embeddings (Word2Vec, GloVe)\n• Sequence-to-sequence architectures',
         why:'Essential for understanding how neural networks handle data that occurs over time, like text, audio, and stock prices.'
       },
       youtube: [{
         n:'Stanford CS224n: NLP with Deep Learning', 
         url:'https://www.youtube.com/playlist?list=PLoROMvodv4rOSH4v6133s9LFPRHjEmbmJ', 
         s:'Stanford', 
         d:'Deep dive into NLP.',
         covered:'• Word Vectors\n• Neural Dependency Parsing\n• Machine Translation\n• Attention mechanisms\n• Question Answering',
         why:'The best university-level course on Natural Language Processing, bridging the gap between classical linguistic approaches and modern deep learning.'
       }]
     }
   ]
  },
  {key:'fp',icon:'layers',label:'First Principles',stage:'Stage 4',dur:'6–8 weeks',
   purpose:'Build every component of a neural network from scratch. After this stage no black box remains.',
   guide: {
     steps: [
       {label:'Watch Topic 1 (micrograd) first — code along, do not copy-paste.', desc:'Open a blank Python file alongside Karpathy\'s video. Every time he types code, you type it yourself. Pause if you need to. The goal of this video is not to finish it — it is to understand every single line before moving on. Budget a full week just for this.'},
       {label:'Clone and read the micrograd repo (Topic 1, Repos tab).', desc:'After watching the video, read the full source code of micrograd on GitHub. It is only 150 lines. Try to delete it and rewrite it from memory. This is the most important code challenge in this entire roadmap.'},
       {label:'Work through makemore (Topic 2) in strict video order.', desc:'There are 5 makemore videos in the Zero-to-Hero series. Watch them in sequence — each video builds directly on the previous one. This covers bigram models → MLP → BatchNorm → WaveNet. Do not skip ahead.'},
       {label:'Finish with Topic 3: "Let\'s build GPT" video.', desc:'This is the culmination of the series. Read the Attention Is All You Need paper the night before. Then code along with the GPT video. After you have a working character-level GPT, read The Annotated Transformer to see how the same architecture is implemented for production translation tasks.'},
       {label:'Compare your implementation to the paper side-by-side.', desc:'Once your GPT is working, open the Attention Is All You Need paper and trace every formula in your code. Can you find where scaled dot-product attention happens? Where is the positional encoding added? This exercise bridges code and theory permanently.'}
     ],
     tip: 'Pro tip: This phase is genuinely hard. You will get stuck. When you do, do NOT look up the answer — instead, add print statements and trace the computation graph manually. The debugging process is the learning.'
   },
   topics: [
     {
       title: '1. Autograd from Scratch',
       desc: 'Build a backward pass engine using purely scalar values.',
       course: {
         name:'Neural Networks: Zero to Hero',
         provider:'Andrej Karpathy · YouTube',
         url:'https://karpathy.ai/zero-to-hero.html',
         desc:'The definitive first-principles DL series.',
         covered:'• Creating a Value object for scalar math\n• Implementing forward and backward passes manually\n• Building a topological sort for backprop\n• Creating a small neural net API (Neuron, Layer, MLP)',
         why:'Andrej Karpathy (founding member of OpenAI) teaches you to build PyTorch from scratch in 100 lines of code. This cures the "black box" syndrome forever.'
       },
       repos: [{
         n:'karpathy/micrograd',
         url:'https://github.com/karpathy/micrograd',
         s:'10k',
         d:'The tiny autograd engine from Zero to Hero.',
         covered:'• Python dunder methods for math operations\n• Gradient accumulation\n• Topological sorting algorithm\n• Simple neural network framework',
         why:'Reading the micrograd source code (which is very short) is a rite of passage for understanding how automatic differentiation actually works under the hood.'
       }]
     },
     {
       title: '2. Language Modeling from Scratch',
       desc: 'Bigram models, MLP, BatchNorm, and WaveNet.',
       youtube: [{
         n:'Building makemore', 
         url:'https://www.youtube.com/watch?v=PaCmpygFfXo', 
         s:'Karpathy', 
         d:'Character-level language modeling.',
         covered:'• Bigram character-level models\n• PyTorch tensor manipulation\n• Negative log likelihood loss\n• Multi-Layer Perceptrons for NLP\n• Implementing BatchNorm from scratch',
         why:'Karpathy walks through building an auto-regressive language model step-by-step, showing exactly how models learn to generate text character by character.'
       }]
     },
     {
       title: '3. Building a Transformer',
       desc: 'Implement self-attention and build a GPT from scratch.',
       youtube: [{
         n:'Let\'s build GPT', 
         url:'https://www.youtube.com/watch?v=kCc8FmEb1nY', 
         s:'Karpathy', 
         d:'Code a Transformer from scratch in PyTorch.',
         covered:'• The math of self-attention\n• Multi-head attention\n• Positional encodings\n• Residual connections and LayerNorm\n• Training a character-level GPT on Shakespeare',
         why:'The climax of the Zero-to-Hero series. You will write the code for a modern Transformer model from a blank Python file, demystifying how ChatGPT works.'
       }],
       papers: [{
         t:'Attention Is All You Need',
         a:'Vaswani et al.',
         url:'https://arxiv.org/abs/1706.03762',
         d:'Read this line by line.',
         covered:'• The Transformer architecture\n• Scaled Dot-Product Attention\n• Multi-Head Attention\n• Position-wise Feed-Forward Networks\n• Positional Encoding',
         why:'The most important AI paper of the 21st century. It introduced the architecture that powers every modern LLM, replacing RNNs entirely.'
       }],
       books: [{
         t:'The Annotated Transformer',
         a:'Harvard NLP',
         url:'https://nlp.seas.harvard.edu/annotated-transformer/',
         free:true,
         d:'The paper rewritten as a notebook.',
         covered:'• Line-by-line PyTorch implementation of the paper\n• Visualizing attention maps\n• Decoding strategies\n• Training loops for Transformers',
         why:'Reading math equations in papers can be hard. The Annotated Transformer puts the exact PyTorch code right next to the paragraphs of the paper so you can see how math turns into code.'
       }]
     }
   ]
  },
  {key:'spec',icon:'crosshair',label:'Specialisation',stage:'Stage 5',dur:'12–16 weeks',
   purpose:'Go deep in one domain. Depth is what makes you employable and capable of research.',
   guide: {
     steps: [
       {label:'Choose ONE track and commit to it fully for this entire phase.', desc:'This is the most important decision of the roadmap. CV if you are drawn to images, robotics, or autonomous systems. NLP if you care about language, chatbots, or search. RL if you want games, robotics control, or AlphaGo-style systems. Do not try to do two — depth is the goal.'},
       {label:'CV Track: take CS231n lectures first, then do the assignments.', desc:'Watch the full lecture series (free on YouTube) before touching the assignments. The assignments are brutal — implementing backpropagation for a CNN layer in NumPy — but completing them puts you in the top 5% of CV practitioners. Read the ViT paper after Lecture 11.'},
       {label:'NLP Track: read HuggingFace course first, then take CS224n.', desc:'Start with the HuggingFace NLP course (practical, hands-on, 2 weeks) to get comfortable with the Transformers library. Then watch CS224n for the theoretical depth. Finish with Jurafsky & Martin\'s textbook as a reference for any concept you want to understand more deeply.'},
       {label:'RL Track: watch David Silver\'s lectures before any code.', desc:'All 10 of Silver\'s lecture videos are required viewing before writing a line of RL code. Then do the HuggingFace Deep RL course for hands-on training. Read Sutton & Barto chapters 1–6 to solidify the theory of value-based methods.'},
       {label:'Build a portfolio project in your chosen domain.', desc:'By the end of this phase, you must have a completed, shareable project. For CV: train a custom object detector. For NLP: fine-tune a model on a custom dataset. For RL: train an agent to solve a non-trivial environment. Put it on GitHub with a clear README.'}
     ],
     tip: 'Pro tip: Follow the @karpathy, @ylecun, @goodfellow, and @AndrewYNg Twitter/X accounts in your chosen domain. Reading their replies in real-time discussions is one of the most efficient ways to absorb the mental models of world-class researchers.'
   },
   topics: [
     {
       title: 'Computer Vision Track',
       desc: 'Object detection, segmentation, and vision transformers.',
       course: {
         name:'Stanford CS231n',
         provider:'Stanford',
         url:'https://cs231n.stanford.edu/',
         desc:'The legendary CV course.',
         covered:'• Image Classification pipelines\n• Loss functions (SVM, Softmax)\n• Optimization (SGD, Adam)\n• CNN Architectures\n• Object Detection (R-CNN, YOLO)\n• Vision Transformers (ViT)',
         why:'Historically the most famous deep learning course in the world (originally taught by Andrej Karpathy). It provides unmatched depth into visual recognition systems.'
       },
       youtube: [{
         n:'CS231n Lectures', 
         url:'https://www.youtube.com/playlist?list=PL3FW7Lu3i5JvHM8ljYj-zLfQRF3EO8sYv', 
         s:'Stanford', 
         d:'CNNs and Vision Transformers.',
         covered:'• Backpropagation for images\n• Training neural networks (tricks of the trade)\n• Recurrent Neural Networks for image captioning\n• Generative Models (GANs, VAEs)',
         why:'Free access to Stanford-quality lectures that dive deep into the math and intuition of computer vision.'
       }],
       repos: [{
         n:'cs231n.github.io',
         url:'https://github.com/cs231n/cs231n.github.io',
         s:'10k',
         d:'Assignments.',
         covered:'• NumPy implementations of CNNs\n• PyTorch/TensorFlow tutorials\n• Image captioning assignments\n• Style transfer implementations',
         why:'Doing the CS231n assignments is legendary for being difficult but incredibly rewarding. It forces you to write backprop for convolutions from scratch.'
       }]
     },
     {
       title: 'Natural Language Processing Track',
       desc: 'Transformers, embeddings, and modern NLP tooling.',
       course: {
         name:'Stanford CS224n',
         provider:'Stanford',
         url:'https://web.stanford.edu/class/cs224n/',
         desc:'Deep Learning for NLP.',
         covered:'• Word2Vec and embeddings\n• Dependency parsing\n• Transformers and Pretraining (BERT, GPT)\n• Natural Language Generation\n• Prompting and RLHF',
         why:'The definitive course for understanding how machines process and generate human language, updated recently to cover the LLM revolution.'
       },
       websites: [{
         n:'HuggingFace NLP Course', 
         url:'https://huggingface.co/learn/nlp-course/', 
         s:'HF', 
         d:'Practical tooling.',
         covered:'• Using the Transformers library\n• Fine-tuning pretrained models\n• Sharing models and tokenizers\n• Datasets library\n• Accelerate for distributed training',
         why:'HuggingFace is the GitHub of Machine Learning. This course teaches you how to use their industry-standard open-source libraries to deploy models in production.'
       }],
       books: [{
         t:'Speech and Language Processing',
         a:'Jurafsky & Martin',
         url:'https://web.stanford.edu/~jurafsky/slp3/',
         free:true,
         d:'The definitive NLP textbook.',
         covered:'• N-gram language models\n• Hidden Markov Models\n• Part-of-speech tagging\n• Formal semantics and logic\n• Chatbots and Dialogue Systems',
         why:'A masterful textbook that covers both classical computational linguistics and modern deep learning NLP. Crucial for understanding the linguistic theory behind the code.'
       }]
     },
     {
       title: 'Reinforcement Learning Track',
       desc: 'MDPs, Q-learning, Policy Gradients.',
       course: {
         name:'David Silver RL Course',
         provider:'DeepMind',
         url:'https://www.davidsilver.uk/teaching/',
         desc:'Canonical RL course by AlphaGo lead.',
         covered:'• Markov Decision Processes (MDPs)\n• Dynamic Programming\n• Model-Free Prediction and Control\n• Value Function Approximation\n• Policy Gradients',
         why:'Taught by the lead researcher of AlphaGo at DeepMind, this is the most clear and authoritative introduction to reinforcement learning available.'
       },
       websites: [{
         n:'HuggingFace Deep RL', 
         url:'https://huggingface.co/learn/deep-rl-course/', 
         s:'HF', 
         d:'Hands-on Deep RL.',
         covered:'• Q-Learning\n• Deep Q-Networks (DQN)\n• Proximal Policy Optimization (PPO)\n• Multi-Agent RL\n• Using the RL Baselines3 library',
         why:'Provides hands-on coding exercises where you train agents to play games and navigate environments, bridging theory with practical implementation.'
       }],
       books: [{
         t:'Reinforcement Learning: An Introduction',
         a:'Sutton & Barto',
         url:'http://incompleteideas.net/book/the-book-2nd.html',
         free:true,
         d:'The canonical RL textbook.',
         covered:'• Multi-arm bandits\n• Finite Markov Decision Processes\n• Temporal-Difference Learning\n• Eligibility Traces\n• Actor-Critic Methods',
         why:'Considered the "Bible" of Reinforcement Learning. Richard Sutton invented much of the field, and this book explains the core concepts from the ground up.'
       }]
     }
   ]
  },
  {key:'llms',icon:'sparkles',label:'LLMs',stage:'Stage 6',dur:'10–14 weeks',
   purpose:'Turn from a user of LLMs into someone who builds, fine-tunes, and deploys them.',
   guide: {
     steps: [
       {label:'Start with Raschka\'s book (Topic 1) — build the GPT end-to-end first.', desc:'Before touching any HuggingFace API, build a complete LLM from scratch by following Sebastian Raschka\'s book. This takes 3–4 weeks but gives you the foundational understanding that every other resource in this phase assumes you have.'},
       {label:'Take Stanford CS336 for production-level architecture details (Topic 1).', desc:'After your from-scratch GPT is working, CS336 teaches the engineering improvements that turn toy models into production systems: RoPE, GQA, FlashAttention, and distributed training. Watch the lectures and code the implementations.'},
       {label:'Read the GPT-3 paper before Topic 3 (Topic 2).', desc:'This 75-page paper is the document that started the modern LLM era. Read the Introduction and Section 3 carefully. Understanding what in-context learning means changes how you think about prompting and fine-tuning.'},
       {label:'Topic 3 (Fine-tuning): HuggingFace LLM Course + papers in this order.', desc:'First take the HuggingFace LLM Course (SFT, PEFT, LoRA). Then read InstructGPT to understand RLHF. Then read the LoRA paper to understand parameter-efficient fine-tuning. Only after reading both papers should you run the code — the papers make the HuggingFace APIs make sense.'},
       {label:'Clone and run the LLaMA 3 repo (Topic 3, Repos tab).', desc:'Read the source code of a real, state-of-the-art open-weights model. Trace the forward pass from input tokens to output logits. You built a GPT from scratch in Step 1 — now you can read a production LLM\'s code and understand every line.'}
     ],
     tip: 'Pro tip: Fine-tune a model on a personal dataset as your Phase 6 project. A fine-tuned LLaMA that answers questions about a specific topic is more impressive to employers than any course certificate.'
   },
   topics: [
     {
       title: '1. Advanced Transformer Architectures',
       desc: 'KV Caching, RoPE, and architecture scaling.',
       course: {
         name:'Stanford CS336',
         provider:'Stanford',
         url:'https://stanford-cs336.github.io/spring2024/',
         desc:'Build a production LLM from zero.',
         covered:'• Rotary Positional Embeddings (RoPE)\n• Grouped Query Attention (GQA)\n• KV Caching for fast inference\n• FlashAttention integration\n• Distributed training (DDP, FSDP)',
         why:'This course bridges the gap between toy models and production engineering. You will learn the exact techniques companies like OpenAI use to make LLMs fast and scalable.'
       },
       books: [{
         t:'Build a Large Language Model',
         a:'Sebastian Raschka',
         url:'https://github.com/rasbt/LLMs-from-scratch',
         free:true,
         d:'Builds a GPT-like LLM.',
         covered:'• Data tokenization and loading\n• Coding the attention mechanism\n• Implementing the GPT architecture\n• Pretraining on text data\n• Instruction fine-tuning',
         why:'A highly practical, code-first book that takes you step-by-step through building a complete, working language model from scratch in PyTorch.'
       }]
     },
     {
       title: '2. Pre-training & Scaling Laws',
       desc: 'Data pipelines for pretraining and distributed training.',
       papers: [{
         t:'GPT-3 Paper (Language Models are Few-Shot Learners)',
         a:'Brown et al.',
         url:'https://arxiv.org/abs/2005.14165',
         d:'In-context learning and scale.',
         covered:'• The concept of few-shot and zero-shot prompting\n• How scale (parameters + data) drives emergent abilities\n• Dataset curation at massive scale\n• Limitations of auto-regressive models',
         why:'This paper proved that simply making models larger and giving them more data fundamentally changes their capabilities, kicking off the modern LLM era.'
       }]
     },
     {
       title: '3. Fine-tuning & Alignment',
       desc: 'SFT, LoRA, DPO, and RLHF.',
       course: {
         name:'HuggingFace LLM Course',
         provider:'HuggingFace',
         url:'https://huggingface.co/learn/llm-course/',
         desc:'PEFT and fine-tuning.',
         covered:'• Supervised Fine-Tuning (SFT)\n• Parameter-Efficient Fine-Tuning (PEFT/LoRA)\n• Quantization (QLoRA, AWQ)\n• Alignment techniques (RLHF, DPO)\n• Evaluation (MMLU, HumanEval)',
         why:'Provides the practical code required to take an open-source model like LLaMA and fine-tune it on your own custom dataset using consumer-grade GPUs.'
       },
       papers: [
         {
           t:'InstructGPT',
           a:'Ouyang et al.',
           url:'https://arxiv.org/abs/2203.02155',
           d:'RLHF alignment.',
           covered:'• Supervised fine-tuning for instructions\n• Training a reward model based on human preference\n• Proximal Policy Optimization (PPO) against the reward model\n• Reducing toxicity and hallucinations',
           why:'This is the paper that details how GPT-3 was turned into ChatGPT. It explains how Reinforcement Learning from Human Feedback makes models helpful and harmless.'
         },
         {
           t:'LoRA: Low-Rank Adaptation',
           a:'Hu et al.',
           url:'https://arxiv.org/abs/2106.09685',
           d:'Low-Rank Adaptation.',
           covered:'• The problem of fine-tuning massive models\n• Freezing original weights\n• Injecting trainable rank decomposition matrices\n• Merging weights for inference',
           why:'LoRA revolutionized the open-source community by allowing anyone to fine-tune 70-billion parameter models on a single GPU.'
         }
       ],
       repos: [{
         n:'meta-llama/llama3',
         url:'https://github.com/meta-llama/llama3',
         s:'27k',
         d:'Official LLaMA 3 code.',
         covered:'• The official Meta inference code\n• Tokenizer implementation\n• Model architecture details (GQA, RoPE)\n• Download and deployment scripts',
         why:'Reading the source code of a state-of-the-art open weights model teaches you exactly how modern models are packaged and run.'
       }]
     }
   ]
  },
  {key:'mlops',icon:'box',label:'MLOps',stage:'Stage 7',dur:'8–10 weeks',
   purpose:'Reliable, scalable ML systems — data pipelines, deployment, monitoring, versioning.',
   guide: {
     steps: [
       {label:'Start with Made With ML (Topic 1) — follow the full curriculum.', desc:'This is your primary curriculum for this phase. Goku Mohandas wrote it specifically for ML engineers moving into production. Work through every module in order: design, data, modeling, deployment, testing, monitoring. This is 4–5 weeks of work done properly.'},
       {label:'Clone the Made With ML GitHub repo and use it as your project template.', desc:'Fork the repository and replace Goku\'s example project with a model from your own previous phases. Setting up CI/CD, Docker, and tests for YOUR model — not a tutorial example — is what cements the knowledge.'},
       {label:'Add experiment tracking (Topic 2): set up MLflow on your local project.', desc:'Install MLflow locally and add tracking to the model you deployed in Step 2. Log parameters, metrics, and artifacts. Then connect it to the Full Stack Deep Learning concepts — FSDD explains why experiment tracking matters in a team environment.'},
       {label:'Read Chip Huyen\'s blog and ML Engineering book (Topic 3).', desc:'Read Burkov\'s ML Engineering book while simultaneously reading relevant Chip Huyen blog posts on system design. These two resources address the same problems from different angles — Burkov is systematic and comprehensive, Huyen is opinionated and current.'},
       {label:'Read the Technical Debt paper last — it changes how you write ML code forever.', desc:'This Google paper is only 8 pages and should take 1 hour to read. It will permanently change how you structure ML projects. It\'s also a famous paper to reference in engineering interviews.'}
     ],
     tip: 'Pro tip: Every phase has produced models and notebooks. Now is the time to deploy one of them as a real web API with a frontend. A live, publicly accessible ML demo — even a simple one — is the single most impactful portfolio item you can have.'
   },
   topics: [
     {
       title: '1. Model Deployment & Serving',
       desc: 'FastAPI, Docker, ONNX, and Triton.',
       course: {
         name:'Made With ML',
         provider:'Goku Mohandas',
         url:'https://madewithml.com/',
         desc:'Production-grade MLOps code.',
         covered:'• Packaging ML code into APIs with FastAPI\n• Containerization with Docker\n• CI/CD for machine learning\n• Model serving architectures\n• Testing ML systems',
         why:'Most courses teach how to train a model in a notebook. This course teaches you how to take that model and put it into a production web service.'
       },
       repos: [{
         n:'GokuMohandas/Made-With-ML',
         url:'https://github.com/GokuMohandas/Made-With-ML',
         s:'37k',
         d:'Complete curriculum.',
         covered:'• End-to-end MLOps repository template\n• GitHub Actions for ML\n• Makefile setups\n• Pre-commit hooks for data science',
         why:'Provides a gold-standard repository structure that you can fork and use for your own production machine learning projects.'
       }]
     },
     {
       title: '2. Experiment Tracking',
       desc: 'MLflow, Weights & Biases.',
       course: {
         name:'Full Stack Deep Learning',
         provider:'UC Berkeley',
         url:'https://fullstackdeeplearning.com/',
         desc:'ML lifecycle from data to monitoring.',
         covered:'• Defining ML projects and scoping\n• Data management and feature stores\n• Experiment tracking systems\n• Troubleshooting deep neural networks\n• Web deployment',
         why:'Taught by industry veterans, this course bridges the gap between academic deep learning and the messy reality of shipping AI products in a company.'
       },
       repos: [{
         n:'mlflow/mlflow',
         url:'https://github.com/mlflow/mlflow',
         s:'19k',
         d:'Industry standard registry.',
         covered:'• Experiment tracking API\n• Model packaging format\n• Model registry\n• Deployment tools',
         why:'MLflow is the industry standard open-source tool for tracking experiments. Understanding its architecture helps you manage models effectively.'
       }]
     },
     {
       title: '3. Monitoring & System Design',
       desc: 'Data drift, concept drift, and continuous training.',
       books: [{
         t:'ML Engineering',
         a:'Andriy Burkov',
         url:'http://www.mlebook.com/',
         free:true,
         d:'Production ML systems.',
         covered:'• Data collection and preparation\n• Feature engineering strategies\n• Supervised model training best practices\n• Model evaluation in production\n• Model deployment and monitoring',
         why:'A concise, no-nonsense book focused entirely on the engineering aspects of machine learning, rather than the mathematics.'
       }],
       websites: [{
         n:'Chip Huyen\'s Blog', 
         url:'https://huyenchip.com/blog/', 
         s:'Blog', 
         d:'System-design for ML.',
         covered:'• Streaming vs Batch processing\n• Real-time machine learning\n• MLOps toolchain landscape\n• Evaluating LLMs in production',
         why:'Chip Huyen is a leading voice in ML systems design. Her blog posts provide deep, practical insights into the architecture of modern AI systems.'
       }],
       papers: [{
         t:'ML: The High Interest Credit Card of Technical Debt',
         a:'Sculley et al.',
         url:'https://proceedings.neurips.cc/paper/2015/file/86df7dcfd896fcaf2674f757a2463eba-Paper.pdf',
         d:'Why maintaining ML is hard.',
         covered:'• Hidden feedback loops\n• Pipeline jungles\n• Data dependencies\n• Configuration debt\n• The changing nature of the real world (drift)',
         why:'A famous paper from Google that explains why writing the ML code is only 5% of the effort, and maintaining the system is the other 95%.'
       }]
     }
   ]
  }
];

const UPDATES=[
  {cat:'📰 Newsletters',icon:'📰',items:[
   {n:'The Batch — DeepLearning.AI',url:'https://www.deeplearning.ai/the-batch/',d:'Andrew Ng\'s weekly curation. The best single ML newsletter.', covered:'• Top AI industry news\n• New research paper summaries\n• Hardware and business updates\n• Commentary from Andrew Ng', why:'It cuts through the hype and provides level-headed, technically accurate summaries of the most important events in AI every week.'},
   {n:'Ahead of AI — Sebastian Raschka',url:'https://magazine.sebastianraschka.com/',d:'Deep technical dives into new papers. Research-grade commentary.', covered:'• In-depth analysis of major new models\n• Open source AI developments\n• Explanations of new fine-tuning techniques\n• Code snippets and tutorials', why:'Sebastian is an incredible educator who bridges the gap between academic research papers and practical implementation.'},
   {n:'TLDR AI',url:'https://tldr.tech/ai',d:'5-minute daily digest. Perfect for staying current without drowning.', covered:'• Daily quick hits of AI news\n• Links to new tools and repos\n• Startup funding and product launches\n• Research highlights', why:'It is the fastest way to make sure you don\'t miss a massive industry shift, summarized into a 5-minute daily read.'},
  ]},
  {cat:'📝 Essential Blogs',icon:'📝',items:[
   {n:'Lilian Weng',url:'https://lilianweng.github.io/',d:'OpenAI researcher\'s deep-dives on diffusion, RLHF, agents.', covered:'• Reinforcement Learning from Human Feedback\n• Autonomous AI Agents\n• Diffusion Models\n• Prompt Engineering theory', why:'Lilian\'s posts are considered canonical reading in the AI research community. Her exhaustive deep-dives are often better than textbooks.'},
   {n:'Jay Alammar',url:'https://jalammar.github.io/',d:'The Illustrated Transformer, BERT, GPT. Clearest visual explanations.', covered:'• Visualizing Transformer attention\n• How BERT works\n• Visualizing GPT-3 architecture\n• Word2Vec and embeddings', why:'Jay\'s visual diagrams are the gold standard for understanding how data flows through complex neural network architectures.'},
   {n:'distill.pub',url:'https://distill.pub/',d:'Research journal with interactive visual explanations.', covered:'• Visualizing neural network feature maps\n• Understanding convolutions interactively\n• Momentum and optimization algorithms\n• Attention mechanisms', why:'Distill pioneered a new way of publishing research that relies on interactive widgets rather than dense math equations.'},
  ]},
  {cat:'🔍 Paper Discovery',icon:'🔍',items:[
   {n:'Papers with Code',url:'https://paperswithcode.com/',d:'Every major paper with its GitHub implementation.', covered:'• Leaderboards for all AI tasks (e.g. ImageNet, SQuAD)\n• Trending AI research papers\n• Links to official and community GitHub repos\n• State-of-the-art tracking', why:'Never read a paper without knowing if the code is available. This site links the academic theory directly to the open-source code.'},
   {n:'HuggingFace Papers',url:'https://huggingface.co/papers',d:'Curated daily papers with community discussion.', covered:'• Daily trending ArXiv papers\n• Community upvotes and comments\n• Links to HuggingFace spaces/models for the paper\n• Author discussions', why:'The most active community-driven platform for discovering what AI papers are actually worth reading today.'},
   {n:'Connected Papers',url:'https://www.connectedpapers.com/',d:'Visual tool to explore connections between papers.', covered:'• Citation graphs\n• Discovering prior work\n• Finding derivative papers\n• Visualizing research fields', why:'When you find one good paper, this tool instantly builds a visual web of every related paper you should also read.'},
  ]}
];

const GUIDANCE=[
  {icon:'📅',t:'The weekly operating rhythm',c:'Split every week\'s study time into three buckets. 60% for course content, 30% for implementation from scratch, 10% for writing (the Feynman test).', covered:'• Time management strategies\n• The 60-30-10 learning split\n• Active vs passive learning techniques', why:'Without a structured routine, it is incredibly easy to spend all your time watching videos without actually learning how to write code.'},
  {icon:'🏗️',t:'The project ladder',c:'Build one major deliverable per stage. After Stage 4, train your own GPT. Treat your GitHub repo as your technical resume.', covered:'• Capstone projects for each phase\n• Portfolio building\n• Transitioning from tutorials to independent work', why:'Employers care far more about what you have built than what certificates you have. Projects prove your competence.'},
  {icon:'📝',t:'Knowledge consolidation',c:'Set up an Obsidian or Notion vault. For every concept: intuition, math, code, and failure modes. Publish blog posts to force clarity.', covered:'• Personal knowledge management (PKM)\n• The Feynman Technique\n• Writing public technical blogs', why:'Machine Learning involves thousands of disconnected concepts. If you do not build a second brain to organize them, you will forget them.'},
  {icon:'📄',t:'The paper-reading habit',c:'Read one classic paper per week from Stage 4. Read abstract/conclusion, then intro, then skim results, then read methods.', covered:'• How to read academic papers efficiently\n• The 3-pass reading method\n• Staying updated with state-of-the-art', why:'The field moves faster than textbooks can be printed. To be an expert, you must be comfortable reading raw, published research.'},
  {icon:'⚠️',t:'Avoid Tutorial Hell',c:'Do not just collect courses. Finish them. Do not treat model.fit() as magic. Build from scratch to truly understand.', covered:'• Escaping the tutorial loop\n• Debugging your own code\n• Understanding black-box APIs', why:'Following along with a tutorial gives a false sense of competence. True learning only happens when you are stuck and have to debug it yourself.'},
];
