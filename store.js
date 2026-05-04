/*
  Smart Student Essentials Micro Store
  - Static product array is shaped like Firestore documents.
  - Recommendation logic is modular so it can be replaced by AI scoring later.
  - LocalStorage keeps the MVP usable before Firebase credentials are added.
*/

const SMART_STORE_CONFIG = {
  activityStorageKey: 'smart-store-user-activity-v2',
  anonymousUserKey: 'smart-store-user-id',
  defaultCategory: 'coding',
  recommendationLimit: 4,
  compactLimit: 3,
  scores: {
  question: 5,
  click: 1,
  pageVisit: 1,
  categoryVisit: 1,
},
  firebase: {
    enabled: false,
    config: {
      apiKey: 'YOUR_API_KEY',
      authDomain: 'YOUR_AUTH_DOMAIN',
      projectId: 'YOUR_PROJECT_ID',
      storageBucket: 'YOUR_STORAGE_BUCKET',
      messagingSenderId: 'YOUR_MESSAGING_SENDER_ID',
      appId: 'YOUR_APP_ID',
    },
  },
};

const products = [
 {
  id: 'web-dev-bootcamp-affiliate',
  title: 'Full Stack Developer Bootcamp (Job Ready 🚀)',
  category: 'coding',
  type: 'affiliate',

  benefit: 'Go from beginner to job-ready developer with real projects, portfolio, and interview-ready skills.',

  description: 'Learn HTML, CSS, JavaScript, React, Node, and MongoDB by building real-world projects. Perfect for students who want a clear roadmap, strong portfolio, and fast-track into tech careers.',

  price: '₹459 (Limited Offer)',

  image: 'https://img-c.udemycdn.com/course/480x270/1565838_e54e_18.jpg',

  link: 'https://trk.udemy.com/jROGNv',

  priority: 100,

  tags: ['web development', 'javascript', 'react', 'fullstack', 'projects', 'job-ready'],
}
  {
    id: 'coding-project-pack',
    title: 'Portfolio Project Pack',
    category: 'coding',
    type: 'own_product',
    benefit: 'Build job-ready projects with mentor review prompts.',
    description: 'Five realistic app briefs with feature lists, milestones, GitHub README templates, and demo scripts.',
    price: '$39',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80',
    link: 'https://example.com/products/project-pack',
    priority: 91,
    tags: ['portfolio', 'github', 'apps', 'developer'],
  },
  {
    id: 'coding-python-kit',
    title: 'Python Starter Lab',
    category: 'coding',
    type: 'affiliate',
    benefit: 'Practice Python with guided notebooks and mini challenges.',
    description: 'Affiliate resource for students who need structured Python exercises before building larger projects.',
    price: 'Free trial',
    image: 'https://images.unsplash.com/photo-1526379879527-8559ecfcaec0?auto=format&fit=crop&w=1200&q=80',
    link: 'https://affiliate.example.com/python-lab',
    priority: 82,
    tags: ['python', 'backend', 'practice'],
  },
  {
    id: 'business-resume-pack',
    title: 'Resume and LinkedIn Pack',
    category: 'business',
    type: 'own_product',
    benefit: 'Turn your profile into a clear, recruiter-ready story.',
    description: 'ATS-safe templates, LinkedIn rewrite prompts, achievement bullets, and mentor feedback checklist.',
    price: '$19',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80',
    link: 'https://example.com/products/resume-linkedin-pack',
    priority: 94,
    tags: ['resume', 'career', 'linkedin', 'job'],
  },
  {
    id: 'business-growth-playbook',
    title: 'Student Business Playbook',
    category: 'business',
    type: 'own_product',
    benefit: 'Validate offers, find customers, and avoid random hustle.',
    description: 'A practical playbook for student founders covering positioning, marketing, pricing, and first sales.',
    price: '$34',
    image: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1200&q=80',
    link: 'https://example.com/products/business-playbook',
    priority: 88,
    tags: ['startup', 'marketing', 'sales', 'strategy'],
  },
  {
    id: 'business-mentor-session-guide',
    title: 'Mentor Session Success Guide',
    category: 'business',
    type: 'own_product',
    benefit: 'Get better answers from every paid or free mentor call.',
    description: 'Question templates, meeting notes, follow-up scripts, and accountability trackers for mentees.',
    price: '$24',
    image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=80',
    link: 'https://example.com/products/mentor-session-guide',
    priority: 84,
    tags: ['mentor', 'career', 'planning'],
  },
  {
    id: 'ai-career-roadmap',
    title: 'AI Career Roadmap',
    category: 'ai',
    type: 'own_product',
    benefit: 'Move from curiosity to practical AI projects and roles.',
    description: 'A structured path for prompts, Python, APIs, LLM projects, portfolios, and AI interview stories.',
    price: '$34',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&q=80',
    link: 'https://example.com/products/ai-career-roadmap',
    priority: 95,
    tags: ['ai', 'llm', 'machine learning', 'chatgpt'],
  },
  {
    id: 'ai-project-notebooks',
    title: 'AI Project Notebooks',
    category: 'ai',
    type: 'affiliate',
    benefit: 'Prototype AI ideas faster with ready notebooks.',
    description: 'Affiliate notebooks for chatbots, classifiers, retrieval apps, and prompt testing workflows.',
    price: 'Free access',
    image: 'https://images.unsplash.com/photo-1674027444485-cec3da58eef4?auto=format&fit=crop&w=1200&q=80',
    link: 'https://affiliate.example.com/ai-notebooks',
    priority: 86,
    tags: ['notebooks', 'llm', 'prototype', 'data science'],
  },
  {
    id: 'ai-tools-stack',
    title: 'AI Tools Stack',
    category: 'ai',
    type: 'affiliate',
    benefit: 'Use a curated stack instead of testing every new tool.',
    description: 'A recommended bundle of AI coding, note-taking, automation, and research tools for students.',
    price: 'Free onboarding',
    image: 'https://images.unsplash.com/photo-1655393001768-d946c97d6fd1?auto=format&fit=crop&w=1200&q=80',
    link: 'https://affiliate.example.com/ai-stack',
    priority: 79,
    tags: ['automation', 'tools', 'productivity', 'chatgpt'],
  },
  // electronics 
{
  id: 'student-laptop-core',
  title: 'Student Laptop for Coding & Daily Use',
  category: 'electronics',
  type: 'recommended',
  benefit: 'Handles AI/ML, 4K editing, and hardcore coding smoothly with powerful high-performance multitasking.',
  description: 'Handles AI/ML training, 4K video editing, and hardcore coding with smooth high-performance multitasking. Built for developers and creators running heavy tools like TensorFlow, Docker, Blender, and full-stack environments.',
  price: 'View on Amazon',
  image: 'https://m.media-amazon.com/images/I/81nPkLHN3vL._SX522_.jpg',
  link: 'https://amzn.to/49qh7EB',
  priority: 95,
  tags: ['laptop', 'coding', 'student', 'electronics'],
},
{
  id: 'creator-dev-laptop',
  title: 'High Performance Laptop for AI, Coding & Editing',
  category: 'electronics',
  type: 'recommended',
  benefit: 'Handles AI/ML, video editing, and hardcore coding smoothly with powerful GPU performance.',
  description: 'Built for serious students and creators who work on AI projects, coding, video editing, and heavy software. Delivers fast performance, smooth multitasking, and future-ready power.',
  price: 'View on Amazon',
  image: 'https://m.media-amazon.com/images/I/71-7wPSmOJL._SX522_.jpg',
  link: 'https://amzn.to/4w8ZbIt',
  priority: 100,
  tags: ['laptop', 'ai', 'coding', 'developer', 'electronics'],
},
{
  id: 'acer-nitro-v15-rtx4050',
  title: 'Acer Nitro V 15 – RTX 4050 Laptop for AI, Coding & Gaming',
  category: 'electronics',
  type: 'recommended',
  benefit: 'Runs AI/ML models, AAA gaming, and heavy coding environments smoothly with RTX 4050 GPU and Ryzen 7 processor.',
  description: 'Built for serious developers, gamers, and creators who need extreme performance. Easily handles AI/ML training, high-end coding, 4K video editing, game development, and multitasking heavy tools like TensorFlow, Docker, Blender, and Unreal Engine without lag.',
  price: 'View on Amazon',
  image: 'https://m.media-amazon.com/images/I/51WgXPBL4nL._SX522_.jpg',
  link: 'https://amzn.to/3QM4s8G',
  priority: 100,
  tags: ['laptop', 'ai', 'gaming', 'coding', 'developer', 'electronics'],
},
];

const keywordCategoryMap = {
  coding: ['learn coding', 'code', 'coding', 'python', 'javascript', 'react', 'developer', 'software', 'web', 'frontend', 'backend', 'full stack', 'github', 'portfolio project'],
  business: ['business', 'marketing', 'startup', 'sales', 'entrepreneur', 'strategy', 'growth', 'resume', 'linkedin', 'personal brand', 'product market fit'],
  ai: ['ai', 'artificial intelligence', 'machine learning', 'deep learning', 'data science', 'chatgpt', 'llm', 'prompt', 'automation', 'notebook'],
  electronics: ['phone', 'mobile', 'laptop', 'headphones', 'earbuds', 'keyboard', 'mouse', 'tablet', 'charger', 'monitor', 'electronics', 'gadget'],
};

let db = null;

const userActivity = {
 interests: { coding: 0, business: 0, ai: 0, electronics: 0 },
  clicks: [],
  pageVisits: [],
  questions: [],
  lastCategory: '',
  productClicks: {},
  categoryClicks: {},
  shownProducts: {},
  conversions: {},
  abVariant: 'A',
  userId: '',
};

function normalizeCategory(category) {
  return String(category || '').trim().toLowerCase();
}

function getKnownCategories() {
  return [...new Set(products.map((product) => normalizeCategory(product.category)))];
}

function createAnonymousUserId() {
  const existingId = window.localStorage.getItem(SMART_STORE_CONFIG.anonymousUserKey);
  if (existingId) return existingId;
  const newId = `student_${Date.now()}_${Math.random().toString(16).slice(2)}`;
  window.localStorage.setItem(SMART_STORE_CONFIG.anonymousUserKey, newId);
  return newId;
}

function getStableAbVariant(userId) {
  const sum = userId.split('').reduce((total, char) => total + char.charCodeAt(0), 0);
  return sum % 2 === 0 ? 'A' : 'B';
}

function loadUserActivity() {
  const stored = window.localStorage.getItem(SMART_STORE_CONFIG.activityStorageKey);
  if (stored) {
    try {
      Object.assign(userActivity, JSON.parse(stored));
    } catch (error) {
      console.warn('Activity storage could not be parsed. Starting fresh.', error);
    }
  }

  userActivity.userId = userActivity.userId || createAnonymousUserId();
  userActivity.abVariant = userActivity.abVariant || getStableAbVariant(userActivity.userId);

  getKnownCategories().forEach((category) => {
    userActivity.interests[category] = userActivity.interests[category] || 0;
    userActivity.categoryClicks[category] = userActivity.categoryClicks[category] || 0;
  });
}

function saveUserActivity() {
  window.localStorage.setItem(SMART_STORE_CONFIG.activityStorageKey, JSON.stringify(userActivity));
  saveActivityToFirestore();
}

function initializeFirestore() {
  if (!SMART_STORE_CONFIG.firebase.enabled || !window.firebase) return;

  try {
    if (!firebase.apps.length) {
      firebase.initializeApp(SMART_STORE_CONFIG.firebase.config);
    }
    db = firebase.firestore();
  } catch (error) {
    console.warn('Firestore initialization failed. Local tracking is still active.', error);
  }
}

function saveActivityToFirestore() {
  if (!db || !userActivity.userId) return;

  db.collection('userActivity').doc(userActivity.userId).set({
    ...userActivity,
    updatedAt: new Date().toISOString(),
  }, { merge: true }).catch((error) => {
    console.warn('Firestore activity save failed.', error);
  });
}

async function loadProductsFromFirestore() {
  if (!db) return products;

  try {
    const snapshot = await db.collection('products').get();
    const firestoreProducts = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    if (firestoreProducts.length) {
      products.splice(0, products.length, ...firestoreProducts);
    }
  } catch (error) {
    console.warn('Firestore products load failed. Static products remain active.', error);
  }

  return products;
}

function updateInterest(category, score) {
  const normalized = normalizeCategory(category);
  if (!normalized || Number.isNaN(Number(score))) return;

  userActivity.interests[normalized] = (userActivity.interests[normalized] || 0) + Number(score);
  userActivity.lastCategory = normalized;
  saveUserActivity();
  renderActivityStats();
}

function detectCategoryFromText(text) {
  const normalizedText = String(text || '').toLowerCase();
  const matches = {};

  Object.entries(keywordCategoryMap).forEach(([category, keywords]) => {
    matches[category] = keywords.reduce((score, keyword) => {
      return normalizedText.includes(keyword.toLowerCase()) ? score + 1 : score;
    }, 0);
  });

  const bestMatch = Object.entries(matches).sort((a, b) => b[1] - a[1])[0];
  return bestMatch && bestMatch[1] > 0 ? bestMatch[0] : userActivity.lastCategory || SMART_STORE_CONFIG.defaultCategory;
}

function trackQuestion(questionText) {
  const category = detectCategoryFromText(questionText);
  userActivity.questions.push({
    text: String(questionText).slice(0, 240),
    category,
    timestamp: new Date().toISOString(),
  });
  updateInterest(category, SMART_STORE_CONFIG.scores.question);
  renderAllRecommendationPlacements();
  return category;
}

function trackPageVisit(pageName = 'store', explicitCategory = '') {
  const category = explicitCategory || detectCategoryFromText(pageName);
  userActivity.pageVisits.push({ pageName, category, timestamp: new Date().toISOString() });
  updateInterest(category, SMART_STORE_CONFIG.scores.pageVisit);
}

function trackProductClick(productId, placement = 'unknown') {
  const product = products.find((item) => item.id === productId);
  if (!product) return;

  const category = normalizeCategory(product.category);
  userActivity.clicks.push({
    productId,
    category,
    placement,
    timestamp: new Date().toISOString(),
  });
  userActivity.productClicks[productId] = (userActivity.productClicks[productId] || 0) + 1;
  userActivity.categoryClicks[category] = (userActivity.categoryClicks[category] || 0) + 1;
  userActivity.conversions[productId] = {
    clicks: userActivity.productClicks[productId],
    lastClickedAt: new Date().toISOString(),
  };

  updateInterest(category, SMART_STORE_CONFIG.scores.click);
}

function getTopInterestCategory() {
  const categoryScores = Object.entries(userActivity.interests)
    .filter(([category]) => getKnownCategories().includes(category))
    .sort((a, b) => b[1] - a[1]);

  if (!categoryScores.length || categoryScores[0][1] === 0) {
    return userActivity.lastCategory || SMART_STORE_CONFIG.defaultCategory;
  }

  return categoryScores[0][0];
}

function getMostClickedCategory() {
  const clicks = Object.entries(userActivity.categoryClicks).sort((a, b) => b[1] - a[1]);
  return clicks.length && clicks[0][1] > 0 ? clicks[0][0] : 'None';
}

function getProductScore(product, topCategory) {
  const category = normalizeCategory(product.category);
  const relevance = category === topCategory ? (userActivity.interests[category] || 0) * 4 : 0;
  const priority = Number(product.priority || 0);
  const clickLift = (userActivity.productClicks[product.id] || 0) * 2;
  const typeLift = product.type === 'own_product' ? 4 : 2;
  const variantLift = userActivity.abVariant === 'B' && product.type === 'affiliate' ? 6 : 0;

  return priority + relevance + clickLift + typeLift + variantLift;
}

function rotateWithinCategory(productList, category) {
  const shown = userActivity.shownProducts[category] || [];
  const freshProducts = productList.filter((product) => !shown.includes(product.id));
  const source = freshProducts.length >= Math.min(3, productList.length) ? freshProducts : productList;

  return [...source].sort((a, b) => {
    const scoreDiff = getProductScore(b, category) - getProductScore(a, category);
    if (scoreDiff !== 0) return scoreDiff;
    return a.id.localeCompare(b.id);
  });
}

function rememberShownProducts(category, recommended) {
  const previous = userActivity.shownProducts[category] || [];
  const next = [...previous, ...recommended.map((product) => product.id)];
  userActivity.shownProducts[category] = [...new Set(next)].slice(-8);
  saveUserActivity();
}

function getRecommendedProducts(limit = SMART_STORE_CONFIG.recommendationLimit) {
  const topCategory = getTopInterestCategory();
  const matchingProducts = products.filter((product) => normalizeCategory(product.category) === topCategory);
  const eligibleProducts = matchingProducts.length ? matchingProducts : products.filter((product) => normalizeCategory(product.category) === SMART_STORE_CONFIG.defaultCategory);
  const recommended = rotateWithinCategory(eligibleProducts, topCategory).slice(0, limit);

  rememberShownProducts(topCategory, recommended);
  return recommended;
}

function getProductsForCategory(category, limit = products.length) {
  const normalized = normalizeCategory(category);
  return products
    .filter((product) => normalizeCategory(product.category) === normalized)
    .sort((a, b) => getProductScore(b, normalized) - getProductScore(a, normalized))
    .slice(0, limit);
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  }[char]));
}

function createProductCard(product, options = {}) {
  const compactClass = options.compact ? ' product-card-compact' : '';
  const ctaLabel = product.type === 'affiliate' ? 'Get Now' : 'Buy';

  return `
    <article class="product-card${compactClass}" data-category="${escapeHtml(product.category)}">
      <div class="image-wrap">
        <img src="${escapeHtml(product.image)}" alt="${escapeHtml(product.title)}" loading="lazy" />
        <span class="recommendation-badge">Recommended for you</span>
      </div>
      <div class="product-content">
        <div class="product-meta">
          <span>${escapeHtml(product.category)}</span>
          <span>${product.type === 'affiliate' ? 'Affiliate' : 'Own product'}</span>
        </div>
        <h3>${escapeHtml(product.title)}</h3>
        <p class="benefit">${escapeHtml(product.benefit)}</p>
        <p class="description">${escapeHtml(product.description)}</p>
        <div class="product-footer">
          <strong>${escapeHtml(product.price)}</strong>
          <button class="button button-primary product-cta" data-product-id="${escapeHtml(product.id)}" type="button">${ctaLabel}</button>
        </div>
      </div>
    </article>
  `;
}

function renderProductRecommendations(containerId, options = {}) {
  const container = document.getElementById(containerId);
  if (!container) return [];

  const limit = options.limit || (options.compact ? SMART_STORE_CONFIG.compactLimit : SMART_STORE_CONFIG.recommendationLimit);
  const recommended = getRecommendedProducts(limit);
  container.innerHTML = recommended.map((product) => createProductCard(product, options)).join('');
  updateRecommendationLabels();
  return recommended;
}

function renderCategoryProducts(categoryName) {
  const container = document.getElementById('categoryProducts');
  if (!container) return;

  const normalized = normalizeCategory(categoryName);
  container.innerHTML = getProductsForCategory(normalized)
    .map((product) => createProductCard(product))
    .join('');
}

function renderAllRecommendationPlacements() {
  renderProductRecommendations('recommendedContainer');
  renderProductRecommendations('questionRecommendations', { compact: true });
  renderProductRecommendations('mentorRecommendations', { compact: true });
  renderProductRecommendations('chatRecommendations', { compact: true });
  renderActivityStats();
}

function updateRecommendationLabels() {
  const topCategoryLabel = document.getElementById('topCategoryLabel');
  const abVariantLabel = document.getElementById('abVariantLabel');

  if (topCategoryLabel) topCategoryLabel.textContent = getTopInterestCategory().toUpperCase();
  if (abVariantLabel) abVariantLabel.textContent = `Variant ${userActivity.abVariant}`;
}

function renderActivityStats() {
  const coding = document.getElementById('scoreCoding');
  const business = document.getElementById('scoreBusiness');
  const ai = document.getElementById('scoreAI');
  const electronics = document.getElementById('scoreElectronics');
  const mostClicked = document.getElementById('mostClickedCategory');

  if (coding) coding.textContent = userActivity.interests.coding || 0;
  if (business) business.textContent = userActivity.interests.business || 0;
  if (ai) ai.textContent = userActivity.interests.ai || 0;
   if (electronics) electronics.textContent = userActivity.interests.electronics || 0; 
  if (mostClicked) mostClicked.textContent = getMostClickedCategory();
  updateRecommendationLabels();
}

function handleProductClick(event) {
  const button = event.target.closest('.product-cta');
  if (!button) return;

  const product = products.find((item) => item.id === button.dataset.productId);
  if (!product) return;

  const placement = button.closest('[data-placement]')?.dataset.placement || 'unknown';
  trackProductClick(product.id, placement);
  renderAllRecommendationPlacements();
  window.open(product.link, '_blank', 'noopener,noreferrer');
}

function handleCategoryChange(event) {
  const button = event.target.closest('.tab-button');
  if (!button) return;

  const category = button.dataset.category;
  document.querySelectorAll('.tab-button').forEach((tab) => {
    const isActive = tab === button;
    tab.classList.toggle('active', isActive);
    tab.setAttribute('aria-selected', String(isActive));
  });

 renderCategoryProducts(category);

userActivity.categoryClicks[category] =
  (userActivity.categoryClicks[category] || 0) + 1;

updateInterest(category, SMART_STORE_CONFIG.scores.categoryVisit);
saveUserActivity();
renderActivityStats();
}

function handleQuestionSubmit(event) {
  event.preventDefault();

  const input = document.getElementById('questionInput');
  const feedback = document.getElementById('questionFeedback');
  const question = input.value.trim();
  if (!question) return;

  const category = trackQuestion(question);
  input.value = '';
  if (feedback) feedback.textContent = `Recommendations updated from ${category.toUpperCase()} intent.`;
}

function resetActivity() {
  window.localStorage.removeItem(SMART_STORE_CONFIG.activityStorageKey);
  Object.assign(userActivity, {
   interests: { coding: 0, business: 0, ai: 0, electronics: 0 },
    clicks: [],
    pageVisits: [],
    questions: [],
    lastCategory: '',
    productClicks: {},
    categoryClicks: {},
    shownProducts: {},
    conversions: {},
    abVariant: getStableAbVariant(userActivity.userId || createAnonymousUserId()),
    userId: userActivity.userId || createAnonymousUserId(),
  });
  saveUserActivity();
  renderAllRecommendationPlacements();
  renderCategoryProducts(SMART_STORE_CONFIG.defaultCategory);
}

async function initializeStoreUI() {
  initializeFirestore();
  loadUserActivity();
  await loadProductsFromFirestore();

  renderAllRecommendationPlacements();
  renderCategoryProducts(SMART_STORE_CONFIG.defaultCategory);


  document.body.addEventListener('click', handleProductClick);
  document.querySelector('.tabs')?.addEventListener('click', handleCategoryChange);
  document.getElementById('questionForm')?.addEventListener('submit', handleQuestionSubmit);
  document.getElementById('resetActivityButton')?.addEventListener('click', resetActivity);
  document.getElementById('bookSessionButton')?.addEventListener('click', () => {
    trackPageVisit('mentor profile book session', 'business');
    renderProductRecommendations('mentorRecommendations', { compact: true });
  });
  document.getElementById('chatSignalButton')?.addEventListener('click', () => {
    trackQuestion('I want to use ChatGPT, LLMs, and AI automation for better projects');
  });
}

window.SmartStudentStore = {
  products,
  userActivity,
  keywordCategoryMap,
  updateInterest,
  detectCategoryFromText,
  trackQuestion,
  trackPageVisit,
  trackProductClick,
  getRecommendedProducts,
  renderProductRecommendations,
  loadProductsFromFirestore,
};

window.addEventListener('DOMContentLoaded', () => {
  const isStorePage = document.getElementById('recommendedContainer');

  if (isStorePage) {
    initializeStoreUI();
  } else {
    loadUserActivity();
    renderActivityStats();
  }
});
