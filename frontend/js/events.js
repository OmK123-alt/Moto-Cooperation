// =============================================
// EVENTS — Loads from Express API + renders
// =============================================

function renderEvents(eventsData) {
  const grid = document.getElementById('eventsGrid');
  if (!grid) return;

  if (!eventsData.length) {
    grid.innerHTML = '<p style="color:var(--white-dim);padding:40px;grid-column:1/-1">No upcoming events. Check back soon!</p>';
    return;
  }

  grid.innerHTML = eventsData.map(ev => `
    <div class="event-card ${ev.featured ? 'featured' : ''}">
      <div class="event-date">${ev.date}</div>
      <div class="event-month">${ev.month}</div>
      <span class="event-tag">${ev.tag}</span>
      <div class="event-name">${ev.name}</div>
      <div class="event-meta">
        <strong>📍 ${ev.location}</strong><br>
        ${ev.details.replace(/\n/g, '<br>')}
      </div>
      <div class="event-arrow" onclick="alert('Registration coming soon!')">${ev.cta} →</div>
    </div>
  `).join('');
}

async function init() {
  try {
    const data = await fetch('/api/events').then(r => r.json());
    renderEvents(data.events || []);
  } catch (err) {
    console.error('Could not load events:', err);
    renderEvents([]);
  }
}

init();
