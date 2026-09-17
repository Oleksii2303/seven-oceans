// ===== CHECKOUT — Quantity + Total + Submit with EmailJS =====

// ===== EMAILJS CONFIG =====
const EMAILJS_PUBLIC_KEY = 'E7pjNV8SQNHAO65U6';
const EMAILJS_SERVICE_ID = 'service_k41npu2';
const EMAILJS_TEMPLATE_ID = 'template_fsvvhpa';

// Init EmailJS
if (typeof emailjs !== 'undefined') {
  emailjs.init(EMAILJS_PUBLIC_KEY);
}

document.addEventListener('DOMContentLoaded', () => {

  const PRICE_PER_UNIT = 39.95;

  const qtyInput = document.getElementById('quantity');
  const subtotalEl = document.getElementById('subtotal');
  const totalEl = document.getElementById('total');
  const btnTotalEl = document.getElementById('btnTotal');
  const placeOrderBtn = document.querySelector('.place-order-btn');

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
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const firstName = document.getElementById('firstName').value.trim();
      const lastName = document.getElementById('lastName').value.trim();
      const email = document.getElementById('email').value.trim();
      const phone = document.getElementById('phone').value.trim();
      const address = document.getElementById('address').value.trim();
      const address2 = document.getElementById('address2').value.trim();
      const city = document.getElementById('city').value.trim();
      const state = document.getElementById('state').value;
      const zip = document.getElementById('zip').value.trim();
      const country = document.getElementById('country').value;
      const notes = document.getElementById('notes').value.trim();
      const qty = parseInt(qtyInput.value) || 1;
      const total = '$' + (qty * PRICE_PER_UNIT).toFixed(2);

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

      // Disable button + show loading
      const originalBtnText = placeOrderBtn.innerHTML;
      placeOrderBtn.disabled = true;
      placeOrderBtn.style.opacity = '0.7';
      placeOrderBtn.innerHTML = '⏳ Sending order...';

      // Prepare EmailJS data
      const templateParams = {
        customer_name: firstName + ' ' + lastName,
        customer_email: email,
        customer_phone: phone,
        address: address,
        address2: address2 || '—',
        city: city,
        state: state,
        zip: zip,
        country: country,
        quantity: qty,
        total: total,
        notes: notes || 'No notes'
      };

      try {
        // Send email via EmailJS
        await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams);
        
        console.log('✅ Order sent successfully');

        // Show success modal
        showSuccess({
          name: firstName + ' ' + lastName,
          email: email,
          qty: qty,
          total: total
        });

        // Reset form
        form.reset();
        qtyInput.value = 1;
        updateTotals();

      } catch (error) {
        console.error('❌ EmailJS error:', error);
        alert('❌ Failed to send order. Please try again or contact us directly at info@sevenoceansemergency.com');
      } finally {
        // Restore button
        placeOrderBtn.disabled = false;
        placeOrderBtn.style.opacity = '1';
        placeOrderBtn.innerHTML = originalBtnText;
      }
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
          <p>We've received your order and will contact you shortly at <strong>${order.email}</strong> to confirm payment and shipping details.</p>
        </div>
        <a href="index.html" class="btn">Back to Home</a>
      </div>
    `;
    document.body.appendChild(overlay);

    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) overlay.remove();
    });
  }

});
