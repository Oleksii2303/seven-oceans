// ===== CONTACT FORM — Submit via EmailJS =====

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
  const btnTotalEl = document.getElementById('btnTotal');

  // ===== UPDATE BUTTON TOTAL ON QUANTITY CHANGE =====
  if (qtyInput) {
    qtyInput.addEventListener('input', () => {
      let val = parseInt(qtyInput.value);
      if (isNaN(val) || val < 1) qtyInput.value = 1;
      if (val > 99) qtyInput.value = 99;
      val = parseInt(qtyInput.value) || 1;

      if (btnTotalEl) {
        btnTotalEl.textContent = '$' + (val * PRICE_PER_UNIT).toFixed(2);
      }
    });
  }

  // ===== FORM SUBMIT =====
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const fullName = document.getElementById('fullName').value.trim();
      const phone = document.getElementById('phone').value.trim();
      const email = document.getElementById('email').value.trim();
      const qty = parseInt(qtyInput.value) || 1;
      const address = document.getElementById('address').value.trim();
      const notes = document.getElementById('notes').value.trim();
      const total = '$' + (qty * PRICE_PER_UNIT).toFixed(2);

      // Validation
      if (!fullName || !phone || !email || !address) {
        alert('⚠️ Please fill in all required fields marked with *');
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        alert('⚠️ Please enter a valid email address');
        return;
      }

      // Disable button
      const submitBtn = form.querySelector('.submit-btn');
      const originalText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.style.opacity = '0.7';
      submitBtn.innerHTML = '<span>⏳</span> Sending order...';

      // Prepare data
      const templateParams = {
        customer_name: fullName,
        customer_email: email,
        customer_phone: phone,
        address: address,
        address2: '',
        city: '',
        state: '',
        zip: '',
        country: 'USA',
        quantity: qty,
        total: total,
        notes: notes || 'No notes'
      };

      try {
        await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams);
        console.log('✅ Order sent successfully');

        showSuccess({
          name: fullName,
          email: email,
          qty: qty,
          total: total
        });

        form.reset();
        qtyInput.value = 1;
        if (btnTotalEl) btnTotalEl.textContent = '$39.95';

      } catch (error) {
        console.error('❌ EmailJS error:', error);
        alert('❌ Failed to send order. Please try again or email us at info@sevenoceansemergency.com');
      } finally {
        submitBtn.disabled = false;
        submitBtn.style.opacity = '1';
        submitBtn.innerHTML = originalText;
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
