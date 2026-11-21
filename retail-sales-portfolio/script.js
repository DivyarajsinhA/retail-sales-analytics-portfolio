(() => {
  const PREVIEW_VIEWS = {
    overview: {
      file: 'assets/screenshots/page1-executive-overview.png',
      title: 'Executive Overview — Power BI Report Page 1',
      caption: 'Replace with your Power BI Desktop export showing KPI cards (Total Revenue, Net Profit, Profit Margin, Total Orders, Units Sold), monthly revenue vs. profit trend, regional performance bar chart, and sales channel mix.',
      tags: ['KPI Summary Cards', 'Monthly Revenue & Profit Trend', 'Regional Bar Chart', 'Channel Mix Donut'],
      checklist: [
        'Export Page 1 from Power BI Desktop at 1920x1080 (16:9).',
        'Save as assets/screenshots/page1-executive-overview.png.',
        'Replace the placeholder markup with an <img> element once ready.'
      ]
    },
    products: {
      file: 'assets/screenshots/page2-product-discount-margin.png',
      title: 'Product & Discount Margin — Power BI Report Page 2',
      caption: 'Replace with your Power BI Desktop export highlighting discount tier margin comparison, category revenue vs. profit margin combo chart, and a conditional-formatted Top 10 Products table.',
      tags: ['Discount Tier Erosion', 'Category Margin Combo Chart', 'Top 10 Products Matrix', 'Category Slicer'],
      checklist: [
        'Export Page 2 from Power BI Desktop at 1920x1080 (16:9).',
        'Save as assets/screenshots/page2-product-discount-margin.png.',
        'Verify conditional formatting bars are clearly legible on dark backgrounds.'
      ]
    },
    regional: {
      file: 'assets/screenshots/page3-regional-customer-insights.png',
      title: 'Regional & Customer Insights — Power BI Report Page 3',
      caption: 'Replace with your Power BI Desktop export displaying regional manager target attainment progress, customer segment Average Order Value (AOV), and repeat customer metrics.',
      tags: ['Regional Target Attainment', 'Customer Segment AOV', 'Repeat Customer Rate', 'Region Slicer'],
      checklist: [
        'Export Page 3 from Power BI Desktop at 1920x1080 (16:9).',
        'Save as assets/screenshots/page3-regional-customer-insights.png.',
        'Confirm regional labels and target bars are unclipped.'
      ]
    }
  };

  const DAX_MEASURES = [
    {
      cat: 'core',
      label: 'Core KPI',
      name: 'Total Revenue',
      code: 'Total Revenue =\nSUM( Fact_Sales[Net_Revenue] )'
    },
    {
      cat: 'core',
      label: 'Core KPI',
      name: 'Net Profit',
      code: 'Net Profit =\nSUM( Fact_Sales[Profit] )'
    },
    {
      cat: 'core',
      label: 'Core KPI',
      name: 'Profit Margin %',
      code: 'Profit Margin % =\nDIVIDE( [Net Profit], [Total Revenue], 0 )'
    },
    {
      cat: 'core',
      label: 'Core KPI',
      name: 'Total Orders & Units Sold',
      code: 'Total Orders = DISTINCTCOUNT( Fact_Sales[Order_ID] )\nUnits Sold   = SUM( Fact_Sales[Quantity] )'
    },
    {
      cat: 'time',
      label: 'Time Intelligence',
      name: 'Revenue YTD',
      code: 'Revenue YTD =\nTOTALYTD( [Total Revenue], Dim_Calendar[Date] )'
    },
    {
      cat: 'time',
      label: 'Time Intelligence',
      name: 'Revenue YoY Growth %',
      code: 'Revenue YoY Growth % =\nVAR PriorYear = CALCULATE( [Total Revenue], SAMEPERIODLASTYEAR( Dim_Calendar[Date] ) )\nRETURN DIVIDE( [Total Revenue] - PriorYear, PriorYear, 0 )'
    },
    {
      cat: 'margin',
      label: 'Margin & Ranking',
      name: 'High Discount Margin %',
      code: 'High Discount Margin % =\nCALCULATE( [Profit Margin %], Fact_Sales[Discount_Pct] >= 0.20 )'
    },
    {
      cat: 'margin',
      label: 'Margin & Ranking',
      name: 'Region Revenue Rank',
      code: 'Region Revenue Rank =\nRANKX( ALL( Dim_Regions[Region_Name] ), [Total Revenue], , DESC, DENSE )'
    }
  ];

  let activePreviewKey = 'overview';
  let activeDaxFilter = 'all';

  // Mobile Menu Toggle
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');
  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', String(isOpen));
    });
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Dashboard Preview Switcher
  function renderPreview(key) {
    const view = PREVIEW_VIEWS[key];
    if (!view) return;
    activePreviewKey = key;
    document.getElementById('previewFileLabel').textContent = view.file;
    document.getElementById('previewTitle').textContent = view.title;
    document.getElementById('previewCaption').textContent = view.caption;
    document.getElementById('previewTags').innerHTML = view.tags.map(t => `<span>${t}</span>`).join('');
  }

  document.querySelectorAll('.preview-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.preview-tab').forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');
      renderPreview(tab.dataset.view);
    });
  });

  // Lightbox Modal for Screenshot Replacement Spec
  const modal = document.getElementById('lightboxModal');
  const modalTitle = document.getElementById('modalTitle');
  const modalBody = document.getElementById('modalBody');
  const openBtn = document.getElementById('openLightboxBtn');
  const closeBtn = document.getElementById('closeLightboxBtn');

  function openModal() {
    const view = PREVIEW_VIEWS[activePreviewKey];
    modalTitle.textContent = view.title;
    modalBody.innerHTML = `
      <p><strong>Target Asset Path:</strong> <code>${view.file}</code></p>
      <p style="margin-top: 0.6rem;">${view.caption}</p>
      <ul>${view.checklist.map(item => `<li>${item}</li>`).join('')}</ul>
    `;
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
  }

  function closeModal() {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
  }

  if (openBtn) openBtn.addEventListener('click', openModal);
  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && modal.classList.contains('open')) closeModal();
  });

  // Toast + Copy Utility
  const toastEl = document.getElementById('toast');
  let toastTimer = null;
  function showToast(msg) {
    if (!toastEl) return;
    toastEl.textContent = msg;
    toastEl.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove('show'), 1900);
  }

  function copyDax(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(() => showToast('Copied DAX measure to clipboard')).catch(() => fallbackCopy(text));
    } else {
      fallbackCopy(text);
    }
  }

  function fallbackCopy(text) {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    try {
      document.execCommand('copy');
      showToast('Copied DAX measure to clipboard');
    } catch (err) {
      showToast('Copy unavailable in this browser');
    }
    document.body.removeChild(ta);
  }

  // DAX Measures Grid
  function renderDaxGrid() {
    const grid = document.getElementById('daxGrid');
    if (!grid) return;
    const filtered = activeDaxFilter === 'all'
      ? DAX_MEASURES
      : DAX_MEASURES.filter(m => m.cat === activeDaxFilter);

    grid.innerHTML = filtered.map((m, idx) => `
      <article class="dax-card">
        <div class="dax-card-head">
          <span class="dax-name">${m.name}</span>
          <span class="dax-cat">${m.label}</span>
        </div>
        <pre class="dax-code"><code>${m.code}</code></pre>
        <button type="button" class="copy-btn" data-dax-idx="${idx}">Copy DAX</button>
      </article>
    `).join('');

    grid.querySelectorAll('.copy-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const item = filtered[Number(btn.dataset.daxIdx)];
        if (item) copyDax(item.code);
      });
    });
  }

  document.querySelectorAll('.filter-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      document.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      activeDaxFilter = chip.dataset.dax;
      renderDaxGrid();
    });
  });

  // Subtle Scroll Reveal
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });

    revealEls.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top > window.innerHeight * 0.95) {
        el.classList.add('animate-ready');
        observer.observe(el);
      }
    });
  }

  // Active Section Scroll Spy
  const sections = document.querySelectorAll('section[id]');
  const navItems = document.querySelectorAll('.nav-link[href^="#"]');
  window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY + 120;
    sections.forEach(sec => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      const id = sec.getAttribute('id');
      if (scrollPos >= top && scrollPos < top + height) {
        navItems.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === '#' + id);
        });
      }
    });
  }, { passive: true });

  renderPreview('overview');
  renderDaxGrid();
})();
