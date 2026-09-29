// ===== REFUND REQUEST FORM — EmailJS =====

// ===== EMAILJS CONFIG =====
const EMAILJS_PUBLIC_KEY = 'E7pjNV8SQNHAO65U6';
const EMAILJS_SERVICE_ID = 'service_k41npu2';
const EMAILJS_TEMPLATE_ID = 'template_uvl8qx';

if (typeof emailjs !== 'undefined') {
  emailjs.init(EMAILJS_PUBLIC_KEY);
}

document.addEventListener('DOMContentLoaded', () => {

  const form = document.getElementById('refundForm');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('refundName').value.trim();
    const email = document.getElementById('refundEmail').value.trim();
    const orderId = document.getElementById('refundOrderId').value.trim();
    const reason = document.getElementById('refundReason').value;
    const details = document.getElementById('refundDetails').value.trim();

    // Validation
    if (!name || !email || !orderId || !reason) {
      alert('⚠️ Please fill in all required fields marked with *');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('⚠️ Please enter a valid email address');
      return;
    }

    // Disable button
    const submitBtn = form.querySelector('.refund-submit');
    const originalText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span>⏳</span> Sending request...';

    // Prepare data for refund template
    const templateParams = {
      customer_name: name,
      customer_email: email,
      order_id: orderId,
      reason: reason,
      details: details || 'No additional details provided'
    };

    try {
      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams);
      console.log('✅ Refund request sent successfully');

      showSuccess({
        name: name,
        email: email,
        orderId: orderId,
        reason: reason
      });

      form.reset();

    } catch (error) {
      console.error('❌ EmailJS error:', error);
      alert('❌ Failed to send request. Please try again or email us directly at info@sevenoceansemergency.com');
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;
    }
  });

  // ===== SUCCESS MODAL =====
  function showSuccess(data) {
    const overlay = document.createElement('div');
    overlay.className = 'checkout-success';
    overlay.innerHTML = `
      <div class="success-box">
        <div class="success-icon">📩</div>
        <h2>Request Received!</h2>
        <p>Thank you, <strong>${data.name}</strong>!</p>
        <p>Your refund request for order <strong>${data.orderId}</strong> has been submitted.</p>
        <p class="success-email">📧 We'll reply to ${data.email} within 24 hours</p>
        <div class="success-info">
          <p><strong>Next steps:</strong> Our team will review your request and send you a prepaid return label (US only). Once we receive the package — refund issued within 24 hours.</p>
        </div>
        <button type="button" class="btn" onclick="this.closest('.checkout-success').remove()">
          Got it
        </button>
      </div>
    `;
    document.body.appendChild(overlay);

    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) overlay.remove();
    });
  }

});
