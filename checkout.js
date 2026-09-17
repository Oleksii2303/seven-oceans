// ===== CHECKOUT — Quantity + Total + Submit =====
document.addEventListener('DOMContentLoaded', () => {

  const PRICE_PER_UNIT = 39.95;

  const qtyInput = document.getElementById('quantity');
  const subtotalEl = document.getElementById('subtotal');
  const totalEl = document.getElementById('total');
  const btnTotalEl = document.getElementById('btnTotal');

  // ===== QUANTITY BUTTONS =====
  document.querySelectorAll('.qty-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const action = btn.dataset.action;
      let current = parseInt(qtyInput.value) || 1;

      if (action === 'minus' && current > 1) {
        qtyInput.value = current - 1;
      } else if (action === 'plus' && current < 99) {
        qtyInput.value = current + 1;
      }

      updateTotals();
    });
  });

  // ===== DIRECT INPUT =====
  qtyInput.addEventListener('input', () => {
    let val = parseInt(qtyInput.value);
    if (isNaN(val) || val < 1) qtyInput.value = 1;
    if (val > 99) qtyInput.value = 99;
    updateTotals();
  });

  // ===== UPDATE TOTALS =====
  function updateTotals() {
    const qty = parseInt(qtyInput.value) || 1;
    const subtotal = qty * PRICE_PER_UNIT;

    subtotalEl.textContent = '$' + subtotal.toFixed(2);
    totalEl.textContent = '$' + subtotal.toFixed(2);
    if (btnTotalEl) btnTotalEl.textContent = '$' + subtotal.toFixed(2);
  }

  updateTotals();

  // ===== FORM SUBMIT =====
  const form = document.getElementById('checkoutForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const firstName = document.getElementById('firstName').value.trim();
      const lastName = document.getElementById('lastName').value.trim();
      const email = document.getElementById('email').value.trim();
      const phone = document.getElementById('phone').value.trim();
      const address = document.getElementById('address').value.trim();
      const city = document.getElementById('city').value.trim();
      const state = document.getElementById('state').value;
      const zip = document.getElementById('zip').value.trim();
      const qty = parseInt(qtyInput.value) || 1;

      // Validation
      if (!firstName || !lastName || !email || !phone || !address || !city || !state || !zip) {
        alert('⚠️ Please fill in all required fields marked with *');
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        alert('⚠️ Please enter a valid email address');
        return;
      }

      // Show success
      showSuccess({
        name: firstName + ' ' + lastName,
        email: email,
        qty: qty,
        total: '$' + (qty * PRICE_PER_UNIT).toFixed(2)
      });
    });
  }

  // ===== SUCCESS MODAL =====
  function showSuccess(order) {
    const overlay = document.createElement('div');
    overlay.className = 'checkout-success';
    overlay.innerHTML = `
      <div class="success-box">
        <div class="success-icon">✅</div>
        <h2>Order Received!</h2>
        <p>Thank you, <strong>${order.name}</strong>!</p>
        <p>Your order of <strong>${order.qty} box${order.qty > 1 ? 'es' : ''}</strong> — Total: <strong>${order.total}</strong></p>
        <p class="success-email">📧 Confirmation sent to ${order.email}</p>
        <div class="success-info">
          <p>🔒 This is a demo. In production, this would connect to a real payment processor.</p>
        </div>
        <a href="index.html" class="btn">Back to Home</a>
      </div>
    `;
    document.body.appendChild(overlay);

    // Close on background click
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) overlay.remove();
    });
  }

});
