// =============================================
// GALLERY — Data + Renderer + Filter
// =============================================

const galleryData = [
  {
    emoji: "🚗", bgClass: "g1", category: "jdm",
    label: "SUPRA MK4 — FULL WIDE BUILD", sub: "JDM / WIDEBODY",
    image: "" // e.g. "assets/images/supra.jpg" — leave empty to use emoji
  },
  {
    emoji: "🏍️", bgClass: "g2", category: "bikes",
    label: "SCRAMBLER CAFE RACER", sub: "SUPERBIKE",
    image: ""
  },
  {
    emoji: "🔧", bgClass: "g3", category: "jdm",
    label: "2JZ SINGLE TURBO SWAP", sub: "ENGINE BUILD",
    image: ""
  },
  {
    emoji: "🚙", bgClass: "g4", category: "stance euro",
    label: "GOLF R AIR RIDE FULL KIT", sub: "EURO / STANCE",
    image: ""
  },
  {
    emoji: "🏁", bgClass: "g5", category: "track",
    label: "EVO X TIME ATTACK READY", sub: "TRACK PREP",
    image: ""
  }
];

function renderGallery(filter = 'all') {
  const grid = document.getElementById('galleryGrid');
  if (!grid) return;

  const items = filter === 'all'
    ? galleryData
    : galleryData.filter(item => item.category.includes(filter));

  grid.innerHTML = items.map((item, i) => `
    <div class="gallery-item" data-category="${item.category}">
      <div class="gallery-bg ${item.bgClass}" style="${item.image ? `background-image:url('${item.image}')` : ''}">
        ${item.image ? '' : item.emoji}
      </div>
      <div class="gallery-overlay">
        <div>
          <div class="gallery-sub">${item.sub}</div>
          <div class="gallery-label">${item.label}</div>
        </div>
      </div>
    </div>
  `).join('');
}

// Initial render
renderGallery();

// Filter buttons
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderGallery(btn.dataset.filter);
  });
});
