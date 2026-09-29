# 📌 SAVE POINT — Seven Oceans Emergency

**Останнє оновлення:** 2026-09-29
**Домен:** https://sevenoceansemergency.com
**Хостинг:** Vercel
**Репозиторій:** https://github.com/Oleksii2303/seven-oceans

---

## ✅ ЩО ПОВНІСТЮ ПРАЦЮЄ

### 🌐 Сайт та сторінки:
- ✅ Головна — index.html
- ✅ Product — product.html
- ✅ Nutrition — nutrition.html
- ✅ About — about.html
- ✅ Contact — contact.html
- ✅ Checkout — checkout.html
- ✅ Refund — refund.html (з формою)
- ✅ Privacy — privacy.html
- ✅ Terms — terms.html
- ✅ Track Order — track.html (карта Leaflet)
- ✅ Favicon — favicon.svg

### 🎨 Дизайн та UX:
- ✅ Темна морська тема (navy + blue + gold)
- ✅ Fonts: Playfair Display + Inter
- ✅ Плаваюча кнопка "Track Order" (FAB)
- ✅ Посилання "Track Order" в navbar
- ✅ Cursor glow
- ✅ Lightning (блискавки)
- ✅ Product drips
- ✅ Text drips
- ✅ Адаптивна мобільна версія
- ✅ Дощ ПРИБРАНО

### 📧 Email (EmailJS):
- Service ID: service_k41npu2
- Public Key: E7pjNV8SQNHAO65U6
- Template "Contact Us": template_fsvvhpa
- Template "Refund Request": template_uvl8qx
- Замовлення → лист на divnich.amz@gmail.com
- Повернення → помаранчевий дизайн

### 📮 Пошта (ImprovMX + Gmail):
- Домен: info@sevenoceansemergency.com
- MX: mx1.improvmx.com, mx2.improvmx.com
- SPF: v=spf1 include:spf.improvmx.com ~all
- Отримання: info@ → Gmail
- Відправка: info@ через Gmail "Send as" (підтверджено)
- SMTP: smtp.gmail.com порт 587 TLS

### 💳 Оплата (NexaPay):
- Payment Link активний
- Card, Apple Pay, Crypto (USDT, BTC, ETH)
- Провайдери: Alchemy Pay, Banxa, Meld
- Гаманець: 0xe32fb7e0b5610182851a2e93542b84f62c7c1c0f
- 3 безкоштовних тестових платежі

### 📦 Track Order:
- База: orders.json
- Карта Leaflet
- Маршрут: Норвегія → Атлантика → NY → VA → клієнт
- Timeline з 5 кроків
- Пошук по Order ID + Email

### 🔍 SEO:
- Sitemap: sitemap.xml
- Robots: robots.txt
- Google Verification: xIq4LcRTy7ELTvei1zBP1Ak1U9830VKlrFnNknp1I0I
- Google Search Console: підтверджено
- Google Analytics: G-KR8SYZTL9H

### 🏢 Бізнес-дані:
- Адреса: 3903 Castlewood Rd, Richmond, VA 23234, United States
- Email: info@sevenoceansemergency.com
- Ціна: $39.95 per box

---

## 📁 ФАЙЛИ В РЕПОЗИТОРІЇ

```
seven-oceans/
├── index.html
├── product.html
├── nutrition.html
├── about.html
├── contact.html
├── checkout.html
├── refund.html
├── privacy.html
├── terms.html
├── track.html
├── style.css
├── pages.css
├── contact.css
├── checkout.css
├── script.js
├── contact.js
├── checkout.js
├── refund.js
├── track.js
├── orders.json
├── favicon.svg
├── robots.txt
├── sitemap.xml
├── SAVE-POINT.md
├── README.md
└── images/
    ├── about-us.png
    ├── bar-closeup.jpg
    ├── bars-white.jpg
    ├── box-bulk.jpg
    ├── box-front.jpg
    ├── box-front.png
    ├── box-nutrition.jpg
    ├── box-transparent.png
    ├── foil.jpg
    ├── hand-holding.jpg
    ├── hero-ship.jpg
    ├── nutrition.jpg
    ├── product-pallet.png
    └── three-boxes.jpg
```

---

## 🔑 КЛЮЧОВІ ID

### EmailJS:
- Service ID: service_k41npu2
- Public Key: E7pjNV8SQNHAO65U6
- Template Contact: template_fsvvhpa
- Template Refund: template_uvl8qx

### NexaPay:
- Payment Link: https://nexapay.one/checkout/order_b3e9fcaa7fe547e9d71a5c52067dff53?sig=plsig_873a7f88372588a2a7c5c1fa4cdc4b216411feee1aed79c39fa0822619082054
- Гаманець: 0xe32fb7e0b5610182851a2e93542b84f62c7c1c0f

### Google:
- Analytics: G-KR8SYZTL9H
- Verification: xIq4LcRTy7ELTvei1zBP1Ak1U9830VKlrFnNknp1I0I

### Пошта:
- Домен: sevenoceansemergency.com
- Робоча: info@sevenoceansemergency.com
- Forwarding на: divnich.amz@gmail.com

---

## 🎯 ЯК ПРАЦЮЄ ФОРМА ЗАМОВЛЕННЯ

1. Клієнт → contact.html
2. Заповнює форму (кількість = 1, readonly)
3. Натискає "Continue to Payment"
4. EmailJS → лист на divnich.amz@gmail.com
5. Модалка з "Pay Now — $39.95"
6. Клієнт → NexaPay → Card/Crypto
7. Ти отримуєш USDT на гаманець
8. Клієнт пише на info@ → тобі на Gmail

---

## 🎯 ЯК ПРАЦЮЄ TRACK ORDER

1. Клієнт → track.html
2. Вводить Email + Order ID
3. Сайт читає orders.json
4. Показує карту + деталі + timeline

### Додати замовлення:
1. Edit orders.json на GitHub
2. Додати об'єкт в масив orders
3. Commit → клієнт бачить

---

## ⏳ TODO НА МАЙБУТНЄ

- [ ] Facebook Pixel
- [ ] Google Ads
- [ ] Instagram / TikTok
- [ ] Amazon
- [ ] USPS return labels
- [ ] Stripe через LLC у США
- [ ] Chat support (Tawk.to)

---

## 🎨 КОЛЬОРИ

```
--navy:       #001f3f
--navy-deep:  #00111f
--blue:       #00b4d8
--blue-light: #90e0ef
--gold:       #f4a900
--white:      #ffffff
--gray:       #94a3b8
```

---

## 📝 НАВІГАЦІЯ

```html
<li><a href="index.html">Home</a></li>
<li><a href="product.html">Product</a></li>
<li><a href="nutrition.html">Nutrition</a></li>
<li><a href="about.html">About</a></li>
<li><a href="track.html" class="nav-track-link">📦 Track Order</a></li>
<li><a href="contact.html" class="btn-nav">Order Now</a></li>
```

---

## 📄 FOOTER ШАБЛОН

```html
<footer class="footer">
  <div class="container">
    <div class="footer-grid">
      <div class="footer-col">
        <h4>⛵ SEVEN OCEANS</h4>
        <p>Standard Emergency Food Ration. Trusted worldwide since 1970s.</p>
      </div>
      <div class="footer-col">
        <h4>Shop</h4>
        <ul>
          <li><a href="product.html">Product</a></li>
          <li><a href="nutrition.html">Nutrition</a></li>
          <li><a href="contact.html">Order</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Company</h4>
        <ul>
          <li><a href="about.html">About Us</a></li>
          <li><a href="track.html">Track Order</a></li>
          <li>📧 info@sevenoceansemergency.com</li>
          <li>📍 Richmond, VA 23234</li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Legal</h4>
        <ul>
          <li><a href="refund.html">Refund Policy</a></li>
          <li><a href="terms.html">Terms of Service</a></li>
          <li><a href="privacy.html">Privacy Policy</a></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <p>© 2024 Seven Oceans Emergency. All rights reserved.</p>
      <p>Made with ⚓ in USA</p>
    </div>
  </div>
</footer>
```

---

## 🎯 ЯК ПРОДОВЖИТИ

Напиши AI:
```
Привіт! Продовжуємо. Дивись SAVE-POINT.md на GitHub.
```

---

## 📊 СТАТИСТИКА

- Файлів: 27
- Сторінок: 10
- Рядків коду: ~3500+
- Днів розробки: 2
- Готовність: 95%

**Залишилось:** маркетинг та перші продажі 🚀

---

© 2024 Seven Oceans Emergency
info@sevenoceansemergency.com
sevenoceansemergency.com
