// ===== ORDER TRACKING WITH LIVE MAP =====

let map = null;
let routeLine = null;
let markers = [];

document.addEventListener('DOMContentLoaded', () => {

  const form = document.getElementById('trackForm');
  const emailInput = document.getElementById('emailInput');
  const orderIdInput = document.getElementById('orderIdInput');
  const errorEl = document.getElementById('trackError');
  const resultsEl = document.getElementById('trackResults');

  if (!form) return;

  // ===== CARRIER URL =====
  function getCarrierTrackingUrl(carrier, trackingNumber) {
    const c = (carrier || '').toUpperCase().trim();
    const t = trackingNumber;

    if (c.includes('USPS')) return `https://tools.usps.com/go/TrackConfirmAction?tLabels=${t}`;
    if (c.includes('UPS')) return `https://www.ups.com/track?tracknum=${t}`;
    if (c.includes('FEDEX')) return `https://www.fedex.com/fedextrack/?trknbr=${t}`;
    if (c.includes('DHL')) return `https://www.dhl.com/us-en/home/tracking.html?tracking-id=${t}`;

    return `https://www.google.com/search?q=${encodeURIComponent(c + ' ' + t)}`;
  }

  // ===== FORMAT DATE =====
  function formatDate(dateStr) {
    if (!dateStr) return '—';
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch {
      return dateStr;
    }
  }

  // ===== BUILD MAP =====
  function buildMap(order) {
    // Destroy previous map
    if (map) {
      map.remove();
      map = null;
    }

    const waypoints = order.waypoints || [];
    if (waypoints.length === 0) return;

    // Init map
    map = L.map('trackMap', {
      zoomControl: true,
      scrollWheelZoom: true,
      attributionControl: false
    });

    // Dark tile layer (CartoDB Dark Matter — free)
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      maxZoom: 19,
      subdomains: 'abcd'
    }).addTo(map);

    // Custom markers
    const latlngs = [];

    waypoints.forEach((wp, index) => {
      const pos = [wp.lat, wp.lng];
      latlngs.push(pos);

      const isCompleted = wp.completed;
      const emoji = isCompleted ? '✓' : '⏳';
      const markerClass = isCompleted ? 'completed' : 'pending';

      const icon = L.divIcon({
        className: 'custom-marker',
        html: `<div class="marker-dot ${markerClass}">${emoji}</div>`,
        iconSize: [28, 28],
        iconAnchor: [14, 14]
      });

      const marker = L.marker(pos, { icon }).addTo(map);

      marker.bindPopup(`
        <div style="font-family: system-ui, sans-serif; min-width: 180px;">
          <div style="font-weight: 700; color: #001f3f; font-size: 14px; margin-bottom: 4px;">
            ${wp.name}
          </div>
          <div style="color: #64748b; font-size: 12px; margin-bottom: 6px;">
            ${wp.description || ''}
          </div>
          <div style="color: #00b4d8; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;">
            📅 ${formatDate(wp.date)}
          </div>
        </div>
      `);

      markers.push(marker);
    });

    // Route line (dashed)
    if (latlngs.length > 1) {
      routeLine = L.polyline(latlngs, {
        color: '#00b4d8',
        weight: 2.5,
        opacity: 0.7,
        dashArray: '8, 10'
      }).addTo(map);
    }

    // Fit bounds
    map.fitBounds(latlngs, { padding: [50, 50] });

    // Fix rendering
    setTimeout(() => {
      if (map) map.invalidateSize();
    }, 200);
  }

  // ===== BUILD TIMELINE =====
  function buildTimeline(order) {
    const timelineEl = document.getElementById('timeline');
    const waypoints = order.waypoints || [];

    timelineEl.innerHTML = '';

    if (waypoints.length === 0) {
      timelineEl.innerHTML = '<p style="color: rgba(255,255,255,0.5); text-align: center;">No journey data available.</p>';
      return;
    }

    waypoints.forEach(wp => {
      const item = document.createElement('div');
      item.className = 'timeline-item' + (wp.completed ? '' : ' pending');

      item.innerHTML = `
        <div class="timeline-dot">${wp.completed ? '✓' : ''}</div>
        <div class="timeline-content">
          <h4>${wp.name}</h4>
          <p>${wp.description || ''}</p>
          <div class="timeline-date">${formatDate(wp.date)}</div>
        </div>
      `;

      timelineEl.appendChild(item);
    });
  }

  // ===== STATUS BADGE =====
  function updateStatusBadge(status) {
    const badge = document.getElementById('statusBadge');
    const statusText = document.getElementById('statusText');

    statusText.textContent = status || 'In Transit';

    badge.classList.remove('in-transit', 'delivered');

    const s = (status || '').toLowerCase();
    if (s.includes('transit') || s.includes('shipped')) {
      badge.classList.add('in-transit');
    } else if (s.includes('delivered')) {
      badge.classList.add('delivered');
    }
  }

  // ===== FORM SUBMIT =====
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = emailInput.value.trim().toLowerCase();
    const orderId = orderIdInput.value.trim().toLowerCase();

    if (!orderId) {
      alert('Please enter your Order ID');
      return;
    }

    errorEl.classList.remove('show');
    resultsEl.classList.remove('show');

    const submitBtn = form.querySelector('.track-submit');
    const originalText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span>⏳</span> Searching...';

    try {
      const response = await fetch('/orders.json?t=' + Date.now());
      if (!response.ok) throw new Error('Failed to fetch orders');

      const data = await response.json();
      const orders = data.orders || [];

      const order = orders.find(o => {
        const matchId = o.orderId && o.orderId.toLowerCase() === orderId;
        const matchEmail = !email || !o.customerEmail || o.customerEmail.toLowerCase() === email;
        return matchId && matchEmail;
      });

      if (order) {
        // Fill info
        document.getElementById('resultOrderId').textContent = order.orderId;
        document.getElementById('resultStatus').textContent = order.status || 'Shipped';
        document.getElementById('resultCarrier').textContent = order.carrier || '—';
        document.getElementById('resultTracking').textContent = order.trackingNumber || '—';
        document.getElementById('resultShippedDate').textContent = formatDate(order.shippedDate);
        document.getElementById('resultDelivery').textContent = formatDate(order.estimatedDelivery);

        updateStatusBadge(order.status);

        // Carrier link
        const carrierLink = document.getElementById('carrierLink');
        if (order.trackingNumber && order.carrier) {
          carrierLink.href = getCarrierTrackingUrl(order.carrier, order.trackingNumber);
          carrierLink.style.display = 'flex';
        } else {
          carrierLink.style.display = 'none';
        }

        // Build map + timeline
        buildMap(order);
        buildTimeline(order);

        resultsEl.classList.add('show');
        resultsEl.scrollIntoView({ behavior: 'smooth', block: 'start' });

      } else {
        errorEl.classList.add('show');
      }

    } catch (error) {
      console.error('Tracking error:', error);
      errorEl.querySelector('strong').textContent = '❌ Service temporarily unavailable';
      errorEl.classList.add('show');
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;
    }
  });

});
