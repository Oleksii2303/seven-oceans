// ===== CONTACT FORM — EmailJS + Vulta Payment =====

// ===== EMAILJS CONFIG =====
const EMAILJS_PUBLIC_KEY = 'E7pjNV8SQNHAO65U6';
const EMAILJS_SERVICE_ID = 'service_k41npu2';
const EMAILJS_TEMPLATE_ID = 'template_fsvvhpa';

// ===== VULTA PAYMENT LINK =====
const PAYMENT_LINK = 'https://vulta.one/pay/link/f065a161-92a6-47d8-8132-6c10ac75a561';

if (typeof emailjs !== 'undefined') {
  emailjs.init(EMAILJS_PUBLIC_KEY);
}

document.addEventListener('DOMContentLoaded', () => {

  const PRICE_PER_UNIT = 39.95;

  const qtyInput = document.getElementById('quantity');
  const btnTotalEl = document.getElementById('btnTotal');

  // ===== UPDATE BUTTON TOTAL =====
  if (qtyInput) {
    qtyInput.addEventListener('input', () => {
      let val = parseInt(qtyInput.value);
      if (isNaN(val) || val < 1) qtyInput.value = 1;
      if (val > 1) qtyInput.value = 1;
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

      // Prepare data for EmailJS
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
        // Send email via EmailJS
        await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams);
        console.log('✅ Order sent successfully');

        // Show payment modal
        showPaymentModal({
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

  // ===== PAYMENT MODAL =====
  function showPaymentModal(order) {
    const overlay = document.createElement('div');
    overlay.className = 'checkout-success';
    overlay.innerHTML = `
      <div class="success-box">
        <div class="success-icon">💳</div>
        <h2>Almost Done!</h2>
        <p>Thank you, <strong>${order.name}</strong>!</p>
        <p>Your order of <strong>${order.qty} box${order.qty > 1 ? 'es' : ''}</strong> — Total: <strong>${order.total}</strong></p>
        
        <div class="success-info">
          <p>Complete your payment securely. We accept <strong>Credit Card and Apple Pay</strong>.</p>
        </div>

        <a href="${PAYMENT_LINK}" target="_blank" rel="noreferrer noopener" class="pay-crypto-btn">
          <span>💳</span>
          Pay Now — ${order.total}
        </a>

        <p class="success-note">
          After payment, we'll receive confirmation automatically.<br>
          Questions? Email <strong>info@sevenoceansemergency.com</strong>
        </p>

        <button type="button" class="close-modal-btn" onclick="this.closest('.checkout-success').remove()">
          Close
        </button>
      </div>
    `;
    document.body.appendChild(overlay);

    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) overlay.remove();
    });
  }

});
