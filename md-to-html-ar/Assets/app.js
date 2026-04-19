const الحالة = {
  كل_الوثائق: [],
  الوثائق_المفلترة: [],
  الوثيقة_المحددة: null,
  المشهد_الحالي: "browse",
  تم_تسجيل_الدخول: false,
};

const عناصر = {
  روابط_التنقل: [...document.querySelectorAll(".nav-link")],
  المشاهد: {
    browse: document.getElementById("browse-view"),
    admin: document.getElementById("admin-view"),
  },
  عنوان_الصفحة: document.getElementById("page-title"),
  شارة_الحالة: document.getElementById("status-pill"),
  حقل_البحث: document.getElementById("search-input"),
  زر_مسح_البحث: document.getElementById("clear-search"),
  عدد_النتائج: document.getElementById("results-count"),
  قائمة_النتائج: document.getElementById("results-list"),
  عنوان_العارض: document.getElementById("viewer-title"),
  رابط_المصدر: document.getElementById("viewer-source"),
  محتوى_العارض: document.getElementById("viewer-content"),
  بطاقة_الدخول: document.getElementById("login-card"),
  لوحة_الإدارة: document.getElementById("admin-panel"),
  اسم_المستخدم: document.getElementById("username-input"),
  كلمة_المرور: document.getElementById("password-input"),
  زر_الدخول: document.getElementById("login-button"),
  رسالة_الدخول: document.getElementById("login-message"),
  حقل_الرابط: document.getElementById("import-url-input"),
  زر_الاستيراد: document.getElementById("import-button"),
  زر_الخروج: document.getElementById("logout-button"),
  رسالة_الاستيراد: document.getElementById("import-message"),
  قائمة_وثائق_الإدارة: document.getElementById("admin-docs-list"),
};

document.addEventListener("DOMContentLoaded", () => {
  اربط_الأحداث();
  حمّل_الوثائق();
});

function اربط_الأحداث() {
  عناصر.روابط_التنقل.forEach((زر) => {
    زر.addEventListener("click", () => {
      غيّر_المشهد(زر.dataset.view);
    });
  });

  عناصر.حقل_البحث.addEventListener("input", () => {
    طبّق_البحث(عناصر.حقل_البحث.value);
  });

  عناصر.زر_مسح_البحث.addEventListener("click", () => {
    عناصر.حقل_البحث.value = "";
    طبّق_البحث("");
  });

  عناصر.زر_الدخول.addEventListener("click", سجّل_الدخول);
  عناصر.زر_الخروج.addEventListener("click", سجّل_الخروج);
  عناصر.زر_الاستيراد.addEventListener("click", استورد_وثيقة);
}

function غيّر_المشهد(اسم_المشهد) {
  الحالة.المشهد_الحالي = اسم_المشهد;

  عناصر.روابط_التنقل.forEach((زر) => {
    زر.classList.toggle("active", زر.dataset.view === اسم_المشهد);
  });

  Object.entries(عناصر.المشاهد).forEach(([اسم, عنصر]) => {
    عنصر.classList.toggle("active", اسم === اسم_المشهد);
  });

  عناصر.عنوان_الصفحة.textContent =
    اسم_المشهد === "browse" ? "تصفح الوثائق" : "إدارة الوثائق";

  حدّث_شارة_الحالة();
}

function حدّث_شارة_الحالة(نص = null, نوع = "جاهز") {
  if (نص) {
    عناصر.شارة_الحالة.textContent = نص;
    return;
  }

  if (الحالة.المشهد_الحالي === "admin") {
    عناصر.شارة_الحالة.textContent = الحالة.تم_تسجيل_الدخول ? "الإدارة مفعلة" : "تسجيل الدخول مطلوب";
  } else {
    عناصر.شارة_الحالة.textContent = `${الحالة.الوثائق_المفلترة.length} وثيقة`;
  }
}

async function حمّل_الوثائق() {
  try {
    حدّث_شارة_الحالة("جاري التحميل...");
    const الاستجابة = await fetch("/api/documents");
    const البيانات = await الاستجابة.json();

    الحالة.كل_الوثائق = Array.isArray(البيانات.documents) ? البيانات.documents : [];
    طبّق_البحث(عناصر.حقل_البحث.value || "");

    if (!الحالة.الوثيقة_المحددة && الحالة.الوثائق_المفلترة.length > 0) {
      اختر_وثيقة(الحالة.الوثائق_المفلترة[0].id);
    }

    ارسم_قائمة_الإدارة();
  } catch (خطأ) {
    عناصر.قائمة_النتائج.innerHTML = `<div class="result-card">تعذر تحميل الوثائق.</div>`;
    عناصر.محتوى_العارض.textContent = "حدث خطأ أثناء تحميل البيانات من الخادم.";
    حدّث_شارة_الحالة("خطأ في التحميل");
  }
}

function طبّق_البحث(النص) {
  const قيمة = (النص || "").trim().toLowerCase();

  الحالة.الوثائق_المفلترة = الحالة.كل_الوثائق.filter((وثيقة) => {
    if (!قيمة) return true;
    return (
      وثيقة.title.toLowerCase().includes(قيمة) ||
      وثيقة.sourceUrl.toLowerCase().includes(قيمة) ||
      وثيقة.markdown.toLowerCase().includes(قيمة)
    );
  });

  if (
    الحالة.الوثيقة_المحددة &&
    !الحالة.الوثائق_المفلترة.some((وثيقة) => وثيقة.id === الحالة.الوثيقة_المحددة.id)
  ) {
    الحالة.الوثيقة_المحددة = الحالة.الوثائق_المفلترة[0] || null;
  }

  عناصر.عدد_النتائج.textContent = `${الحالة.الوثائق_المفلترة.length} وثيقة`;
  ارسم_قائمة_النتائج();

  if (الحالة.الوثيقة_المحددة) {
    اعرض_الوثيقة(الحالة.الوثيقة_المحددة);
  } else if (الحالة.الوثائق_المفلترة.length > 0) {
    اختر_وثيقة(الحالة.الوثائق_المفلترة[0].id);
  } else {
    اعرض_حالة_فارغة();
  }

  حدّث_شارة_الحالة();
  ارسم_قائمة_الإدارة();
}

function ارسم_قائمة_النتائج() {
  if (الحالة.الوثائق_المفلترة.length === 0) {
    عناصر.قائمة_النتائج.innerHTML = `<div class="result-card">لا توجد نتائج مطابقة للبحث الحالي.</div>`;
    return;
  }

  عناصر.قائمة_النتائج.innerHTML = الحالة.الوثائق_المفلترة
    .map((وثيقة) => {
      const نشط = الحالة.الوثيقة_المحددة?.id === وثيقة.id ? "active" : "";
      return `
        <button class="result-card ${نشط}" data-doc-id="${وثيقة.id}">
          <div class="result-title">${اهرب_اتش_تي_ام_ال(وثيقة.title)}</div>
          <div class="result-meta">${اهرب_اتش_تي_ام_ال(وثيقة.sourceUrl)}</div>
        </button>
      `;
    })
    .join("");

  عناصر.قائمة_النتائج.querySelectorAll("[data-doc-id]").forEach((عنصر) => {
    عنصر.addEventListener("click", () => {
      اختر_وثيقة(Number(عنصر.dataset.docId));
    });
  });
}

function اختر_وثيقة(معرف) {
  الحالة.الوثيقة_المحددة =
    الحالة.كل_الوثائق.find((وثيقة) => وثيقة.id === معرف) || null;

  if (!الحالة.الوثيقة_المحددة) {
    اعرض_حالة_فارغة();
    return;
  }

  ارسم_قائمة_النتائج();
  اعرض_الوثيقة(الحالة.الوثيقة_المحددة);
}

function اعرض_الوثيقة(وثيقة) {
  عناصر.عنوان_العارض.textContent = وثيقة.title;
  عناصر.رابط_المصدر.href = وثيقة.sourceUrl;
  عناصر.رابط_المصدر.textContent = "فتح المصدر";
  عناصر.رابط_المصدر.classList.remove("hidden");
  عناصر.محتوى_العارض.classList.remove("empty-state");
  عناصر.محتوى_العارض.innerHTML = حوّل_ماركداون_إلى_اتش_تي_ام_ال(وثيقة.markdown);
}

function اعرض_حالة_فارغة() {
  عناصر.عنوان_العارض.textContent = "اختر وثيقة";
  عناصر.رابط_المصدر.classList.add("hidden");
  عناصر.محتوى_العارض.classList.add("empty-state");
  عناصر.محتوى_العارض.textContent = "لا توجد وثيقة مختارة حالياً.";
}

function سجّل_الدخول() {
  const اسم = عناصر.اسم_المستخدم.value.trim();
  const كلمة = عناصر.كلمة_المرور.value.trim();

  if (اسم === "admin" && كلمة === "admin123") {
    الحالة.تم_تسجيل_الدخول = true;
    عناصر.رسالة_الدخول.textContent = "تم تسجيل الدخول بنجاح.";
    عناصر.رسالة_الدخول.className = "form-message success";
    عناصر.بطاقة_الدخول.classList.add("hidden");
    عناصر.لوحة_الإدارة.classList.remove("hidden");
    حدّث_شارة_الحالة();
    return;
  }

  الحالة.تم_تسجيل_الدخول = false;
  عناصر.رسالة_الدخول.textContent = "بيانات الدخول غير صحيحة.";
  عناصر.رسالة_الدخول.className = "form-message error";
  حدّث_شارة_الحالة();
}

function سجّل_الخروج() {
  الحالة.تم_تسجيل_الدخول = false;
  عناصر.اسم_المستخدم.value = "";
  عناصر.كلمة_المرور.value = "";
  عناصر.رسالة_الدخول.textContent = "";
  عناصر.رسالة_الاستيراد.textContent = "";
  عناصر.بطاقة_الدخول.classList.remove("hidden");
  عناصر.لوحة_الإدارة.classList.add("hidden");
  حدّث_شارة_الحالة();
}

async function استورد_وثيقة() {
  const الرابط = عناصر.حقل_الرابط.value.trim();

  if (!الرابط) {
    عناصر.رسالة_الاستيراد.textContent = "يرجى إدخال رابط الملف أولاً.";
    عناصر.رسالة_الاستيراد.className = "form-message error";
    return;
  }

  try {
    عناصر.رسالة_الاستيراد.textContent = "جاري الاستيراد...";
    عناصر.رسالة_الاستيراد.className = "form-message";
    حدّث_شارة_الحالة("جاري الاستيراد...");

    const الاستجابة = await fetch("/api/import", {
      method: "POST",
      headers: { "Content-Type": "text/plain; charset=utf-8" },
      body: الرابط,
    });

    const البيانات = await الاستجابة.json();

    if (!الاستجابة.ok) {
      throw new Error(البيانات.error || "فشل استيراد الوثيقة.");
    }

    الحالة.كل_الوثائق = Array.isArray(البيانات.documents) ? البيانات.documents : [];
    عناصر.رسالة_الاستيراد.textContent = "تم استيراد الوثيقة بنجاح.";
    عناصر.رسالة_الاستيراد.className = "form-message success";
    عناصر.حقل_الرابط.value = "";
    طبّق_البحث(عناصر.حقل_البحث.value || "");
    غيّر_المشهد("browse");

    if (الحالة.كل_الوثائق.length > 0) {
      اختر_وثيقة(الحالة.كل_الوثائق[الحالة.كل_الوثائق.length - 1].id);
    }
  } catch (خطأ) {
    عناصر.رسالة_الاستيراد.textContent = خطأ.message || "تعذر استيراد الوثيقة.";
    عناصر.رسالة_الاستيراد.className = "form-message error";
    حدّث_شارة_الحالة("فشل الاستيراد");
  }
}

function ارسم_قائمة_الإدارة() {
  عناصر.قائمة_وثائق_الإدارة.innerHTML = الحالة.كل_الوثائق
    .map(
      (وثيقة) => `
        <div class="doc-row">
          <div class="doc-title">${اهرب_اتش_تي_ام_ال(وثيقة.title)}</div>
          <div class="doc-meta">${اهرب_اتش_تي_ام_ال(وثيقة.sourceUrl)}</div>
        </div>
      `
    )
    .join("");
}

function حوّل_ماركداون_إلى_اتش_تي_ام_ال(نص) {
  let html = اهرب_اتش_تي_ام_ال(نص);

  html = html.replace(/^### (.*)$/gm, "<h3>$1</h3>");
  html = html.replace(/^## (.*)$/gm, "<h2>$1</h2>");
  html = html.replace(/^# (.*)$/gm, "<h1>$1</h1>");

  html = html.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
  html = html.replace(/`([^`]+)`/g, "<code>$1</code>");
  html = html.replace(/\n```([\s\S]*?)```/g, (_مطابقة, محتوى) => `\n<pre><code>${محتوى.trim()}</code></pre>`);
  html = html.replace(/^\- (.*)$/gm, "<li>$1</li>");
  html = html.replace(/(<li>.*<\/li>)/gs, "<ul>$1</ul>");
  html = html.replace(/\n{2,}/g, "</p><p>");
  html = `<p>${html}</p>`;
  html = html.replace(/<p>(<h[1-3]>)/g, "$1");
  html = html.replace(/(<\/h[1-3]>)<\/p>/g, "$1");
  html = html.replace(/<p>(<ul>)/g, "$1");
  html = html.replace(/(<\/ul>)<\/p>/g, "$1");
  html = html.replace(/<p>(<pre>)/g, "$1");
  html = html.replace(/(<\/pre>)<\/p>/g, "$1");

  return html;
}

function اهرب_اتش_تي_ام_ال(قيمة = "") {
  return قيمة
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
