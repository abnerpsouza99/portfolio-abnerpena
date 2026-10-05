// ---------- Idioma (PT/EN) ----------
// O português fica escrito no próprio HTML (default sem JS e para SEO); os textos
// originais são lidos do DOM na carga. Aqui só vive o dicionário em inglês.
(() => {
  const STORAGE_KEY = 'lang';
  const LANGS = ['pt', 'en'];

  const en = {
    'meta.title': 'Abner Pena de Souza — Software Engineer',
    'meta.description': 'Career portfolio of Abner Pena de Souza: from tech repair shop to backend software engineering.',

    skip: 'Skip to content',
    'nav.label': 'Main navigation',
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.journey': 'Journey',
    'nav.contact': 'Contact',
    'nav.open': 'Open menu',
    'lang.label': 'Language',

    'hero.location': 'Porto Alegre, RS — Brazil',
    'hero.lede': 'I started out fixing phones and computers, moved on to cabling and network infrastructure, and since 2020 I have been building backend systems — today in iFood\'s Partners ecosystem. This page tells that story.',
    'hero.ctaJourney': 'See my journey',
    'hero.ctaContact': 'Contact',
    'hero.social': 'Social links',
    'hero.photo': 'Photo of Abner Pena de Souza',
    'hero.scroll': 'Scroll down',

    'about.eyebrow': '01 — About me',
    'about.title': 'Away from the keyboard',
    'about.text': 'I\'m from Porto Alegre, in southern Brazil, with a degree in Systems Analysis and Development from Uniritter/FAPA. Before writing my first line of code professionally, I spent years hands-on: repairing smartphones and computers, running network cables, maintaining servers, doing tech support. That still shapes how I code today — I like to understand a system end to end, from the hardware to the API endpoint. Outside of work, what drives me is pretty simple.',
    'about.family.title': 'Family',
    'about.family.text': 'Time with the people who matter is what carries everything else — my fuel away from the screen.',
    'about.football.title': 'Football',
    'about.football.text': 'Grêmio fan, I play when I can and watch every match — great mental debugging after a game.',
    'about.games.title': 'Games',
    'about.games.text': 'A gamer since forever — is there a better way to train logic and patience with bugs?',

    'journey.eyebrow': '02 — Journey',
    'journey.title': 'From hardware to backend',
    'journey.lede': 'Four phases, one single line — from the most recent back to where it all began.',
    'journey.p4.period': '2021 — present',
    'journey.p4.title': 'Software engineering',
    'journey.p3.title': 'Getting into development',
    'journey.p2.title': 'Networks & IT infrastructure',
    'journey.p1.title': 'First steps & tech repair',

    'exp.current': 'current',
    'exp.ifood.period': '2024 — present',
    'exp.ifood.office': 'Backend Engineer',
    'exp.ifood.text': 'Building and maintaining backend services for the Partners ecosystem. Kotlin with Spring Boot, Postgres for relational data and DynamoDB/MongoDB for non-relational data. Async communication with SQS and Kafka, S3 for assets and Athena for reporting. Testing with Mockito and JUnit, with dedicated regression pipelines.',
    'exp.lama.office': 'Backend Engineer',
    'exp.lama.text': 'Systems built on a distributed microservices architecture running on Kubernetes. FIAT transaction flows, OTC, in-app support (chat and calls), Open Banking integration and a KYC flow for document verification.',
    'exp.adp.office': 'Software Developer II',
    'exp.adp.text': 'Built improvements and fixes for the eXpert payroll software.',
    'exp.saque.office': 'Software Developer I',
    'exp.saque.text': 'Built new retail solutions and supported the company\'s systems: Java back end (REST API with Spring Boot), React.js and AngularJS front end, and ATM back end in C++ and Node.js. Oracle database, environments provisioned with Docker.',
    'exp.dropreal.office': 'Support Analyst I',
    'exp.dropreal.text': 'Supported the company\'s network management and monitored servers and services. Technical support for software, hardware and other IT resources.',
    'exp.sicredi.office': 'IT Infrastructure Assistant',
    'exp.sicredi.text': 'Network analysis, monitoring and maintenance. Network and server configuration — TCP/IP, DNS, DHCP, VPNs, Active Directory. Technical support and maintenance for desktops and laptops. Helped run the team\'s Sprint ceremonies.',
    'exp.makrovision.office': 'Sales Assistant',
    'exp.makrovision.text': 'Supported architects and managed schedules — an administrative stop between tech repair and infrastructure.',
    'exp.mobilehelp.office': 'IT Technician',
    'exp.mobilehelp.text': 'Smartphone repair and customer service — my first hands-on contact with hardware under deadline pressure.',
    'exp.prefeitura.office': 'Intern',
    'exp.prefeitura.text': 'Managed computer labs in public schools.',
    'exp.senac.office': 'Young Apprentice',
    'exp.senac.text': 'Customer service and inventory control — where it all began.',

    'skills.eyebrow': '03 — Skills',
    'skills.title': 'Toolbox',
    'skills.ai': 'AI & Assisted Development',
    'skills.agents': 'AI Agents',
    'skills.lang': 'Languages & Frameworks',
    'skills.data': 'Data',
    'skills.infra': 'Infrastructure & Cloud',
    'skills.net': 'Networks & Systems',
    'skills.quality': 'Quality & Practices',
    'edu.title': 'Education & certifications',
    'edu.ads': 'Associate Degree in Systems Analysis and Development',
    'edu.tech': 'IT Technician',
    'edu.support': 'Computer Support and Maintenance Technician',
    'edu.networks': 'Computer Networks Technician',

    'contact.eyebrow': '04 — Contact',
    'contact.title': "Let's talk",
    'contact.lede': 'Open to opportunities and to a chat about backend, data or the next phase of the journey.',
  };

  const roles = {
    pt: [
      'técnico de hardware',
      'técnico de redes & infraestrutura',
      'desenvolvedor de software',
      'engenheiro de backend',
    ],
    en: [
      'hardware technician',
      'network & infrastructure technician',
      'software developer',
      'backend engineer',
    ],
  };

  const metaDescription = document.querySelector('meta[name="description"]');
  const textEls = [...document.querySelectorAll('[data-i18n]')];
  const attrEls = [...document.querySelectorAll('[data-i18n-attr]')];
  const toggle = document.getElementById('langToggle');
  const main = document.querySelector('main');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Snapshot do português original, para conseguir voltar de EN para PT.
  const pt = {
    'meta.title': document.title,
    'meta.description': metaDescription ? metaDescription.content : '',
  };
  textEls.forEach((el) => { pt[el.dataset.i18n] = el.textContent; });
  attrEls.forEach((el) => {
    parseAttrs(el).forEach(({ attr, key }) => { pt[key] = el.getAttribute(attr); });
  });

  const dictionaries = { pt, en };
  let current = 'pt';

  function parseAttrs(el) {
    return el.dataset.i18nAttr.split(';').map((pair) => {
      const [attr, key] = pair.split(':').map((s) => s.trim());
      return { attr, key };
    });
  }

  function t(key, lang) {
    return dictionaries[lang][key] ?? pt[key];
  }

  function readStored() {
    try { return localStorage.getItem(STORAGE_KEY); } catch { return null; }
  }

  function store(lang) {
    try { localStorage.setItem(STORAGE_KEY, lang); } catch { /* storage bloqueado: segue sem persistir */ }
  }

  // Depois de uma escolha explícita, o ?lang= da URL não deve vencer o localStorage no reload.
  function clearUrlLang() {
    const url = new URL(window.location.href);
    if (!url.searchParams.has('lang')) return;
    url.searchParams.delete('lang');
    history.replaceState(null, '', url);
  }

  function initialLang() {
    const fromUrl = new URLSearchParams(window.location.search).get('lang');
    if (LANGS.includes(fromUrl)) return fromUrl;
    const stored = readStored();
    if (LANGS.includes(stored)) return stored;
    return (navigator.language || '').toLowerCase().startsWith('pt') ? 'pt' : 'en';
  }

  function render(lang) {
    textEls.forEach((el) => { el.textContent = t(el.dataset.i18n, lang); });
    attrEls.forEach((el) => {
      parseAttrs(el).forEach(({ attr, key }) => el.setAttribute(attr, t(key, lang)));
    });
    document.title = t('meta.title', lang);
    if (metaDescription) metaDescription.content = t('meta.description', lang);
    document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en';

    if (toggle) {
      toggle.dataset.lang = lang;
      toggle.querySelectorAll('.lang-btn').forEach((btn) => {
        btn.setAttribute('aria-pressed', String(btn.dataset.lang === lang));
      });
    }
  }

  function setLanguage(lang, { animate = true } = {}) {
    if (!LANGS.includes(lang)) return;
    const changed = lang !== current;
    current = lang;
    store(lang);
    clearUrlLang();

    if (animate && changed && !reducedMotion && main) {
      main.classList.add('is-switching');
      setTimeout(() => {
        render(lang);
        main.classList.remove('is-switching');
      }, 180);
    } else {
      render(lang);
    }

    if (changed) document.dispatchEvent(new CustomEvent('languagechange', { detail: lang }));
  }

  if (toggle) {
    toggle.querySelectorAll('.lang-btn').forEach((btn) => {
      btn.addEventListener('click', () => setLanguage(btn.dataset.lang));
    });
  }

  const start = initialLang();
  current = start;
  render(start);

  window.i18n = {
    lang: () => current,
    roles: () => roles[current],
    set: setLanguage,
  };
})();
