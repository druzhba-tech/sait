/**
 * Международный университет Фурузона (МУФ)
 * Client Application Logic
 */

// ==========================================
// 1. Program Data Repository
// ==========================================
const programsData = [
  {
    id: 1,
    code: "09.03.04",
    title: "Программная инженерия и искусственный интеллект",
    facultyId: "it",
    facultyName: "Факультет цифровых технологий и ИИ",
    level: "bachelor",
    levelLabel: "Бакалавриат",
    duration: "4 года",
    form: "Очная",
    budgetSpots: 50,
    contractSpots: 60,
    minScore: 275,
    exams: "Информатика, Математика, Русский язык",
    price: "340 000 ₽ / год"
  },
  {
    id: 2,
    code: "38.03.01",
    title: "Международная экономика и мировая торговля",
    facultyId: "econ",
    facultyName: "Институт мировой экономики и бизнеса",
    level: "bachelor",
    levelLabel: "Бакалавриат",
    duration: "4 года",
    form: "Очная",
    budgetSpots: 35,
    contractSpots: 80,
    minScore: 268,
    exams: "Обществознание, Математика, Русский язык",
    price: "320 000 ₽ / год"
  },
  {
    id: 3,
    code: "31.05.01",
    title: "Лечебное дело (General Medicine)",
    facultyId: "med",
    facultyName: "Медицинский институт",
    level: "specialist",
    levelLabel: "Специалитет",
    duration: "6 лет",
    form: "Очная",
    budgetSpots: 85,
    contractSpots: 120,
    minScore: 282,
    exams: "Химия, Биология, Русский язык",
    price: "390 000 ₽ / год"
  },
  {
    id: 4,
    code: "40.03.01",
    title: "Международное право и правовой комплаенс",
    facultyId: "law",
    facultyName: "Юридический институт",
    level: "bachelor",
    levelLabel: "Бакалавриат",
    duration: "4 года",
    form: "Очная",
    budgetSpots: 30,
    contractSpots: 70,
    minScore: 270,
    exams: "Обществознание, История, Русский язык",
    price: "310 000 ₽ / год"
  },
  {
    id: 5,
    code: "09.04.01",
    title: "Прикладной искусственный интеллект и Big Data",
    facultyId: "it",
    facultyName: "Факультет цифровых технологий и ИИ",
    level: "master",
    levelLabel: "Магистратура",
    duration: "2 года",
    form: "Очная / Вечерняя",
    budgetSpots: 30,
    contractSpots: 40,
    minScore: 85,
    exams: "Компьютерные науки (собеседование)",
    price: "360 000 ₽ / год"
  },
  {
    id: 6,
    code: "38.04.02",
    title: "Управление цифровым бизнесом и FinTech",
    facultyId: "econ",
    facultyName: "Институт мировой экономики и бизнеса",
    level: "master",
    levelLabel: "Магистратура",
    duration: "2 года",
    form: "Очная",
    budgetSpots: 25,
    contractSpots: 50,
    minScore: 80,
    exams: "Менеджмент и аналитика",
    price: "330 000 ₽ / год"
  },
  {
    id: 7,
    code: "01.06.01",
    title: "Математическое моделирование и суперкомпьютеры",
    facultyId: "it",
    facultyName: "Факультет цифровых технологий и ИИ",
    level: "phd",
    levelLabel: "Аспирантура",
    duration: "3 года",
    form: "Очная",
    budgetSpots: 15,
    contractSpots: 20,
    minScore: 90,
    exams: "Профильная дисциплина, Иностранный язык",
    price: "290 000 ₽ / год"
  },
  {
    id: 8,
    code: "12.03.04",
    title: "Биомедицинская инженерия и робототехника",
    facultyId: "eng",
    facultyName: "Инженерная академия",
    level: "bachelor",
    levelLabel: "Бакалавриат",
    duration: "4 года",
    form: "Очная",
    budgetSpots: 40,
    contractSpots: 45,
    minScore: 260,
    exams: "Физика/Информатика, Математика, Русский язык",
    price: "305 000 ₽ / год"
  }
];

// ==========================================
// 2. Elements & State
// ==========================================
const programsGrid = document.getElementById("programsGrid");
const resultsCountEl = document.getElementById("resultsCount");
const levelTabs = document.querySelectorAll("#levelTabs .level-pill-btn");
const searchInput = document.getElementById("programSearchInput");
const facultyFilterSelect = document.getElementById("facultyFilterSelect");
const budgetFilterSelect = document.getElementById("budgetFilterSelect");

// Modal Elements
const appModal = document.getElementById("appModal");
const modalCloseBtn = document.getElementById("modalCloseBtn");
const modalFormContainer = document.getElementById("modalFormContainer");
const modalSuccessBox = document.getElementById("modalSuccessBox");
const admissionForm = document.getElementById("admissionForm");
const applicantProgramSelect = document.getElementById("applicantProgram");
const applicationRefId = document.getElementById("applicationRefId");
const btnModalCloseSuccess = document.getElementById("btnModalCloseSuccess");

// Global Open Triggers
const btnHeaderApply = document.getElementById("btnHeaderApply");
const btnHeroApply = document.getElementById("btnHeroApply");
const openCabinetBtn = document.getElementById("openCabinetBtn");

// Mobile Menu
const mobileMenuBtn = document.getElementById("mobileMenuBtn");
const mainNavLinks = document.getElementById("mainNavLinks");

let currentLevel = "all";
let currentSearchQuery = "";
let currentFaculty = "all";
let currentBudgetFilter = "all";

// ==========================================
// 3. Render Catalog
// ==========================================
function renderPrograms() {
  const filtered = programsData.filter((item) => {
    if (currentLevel !== "all" && item.level !== currentLevel) return false;
    if (currentFaculty !== "all" && item.facultyId !== currentFaculty) return false;
    if (currentBudgetFilter === "budget" && item.budgetSpots <= 0) return false;
    if (currentBudgetFilter === "contract" && item.contractSpots <= 0) return false;

    if (currentSearchQuery.trim() !== "") {
      const q = currentSearchQuery.toLowerCase();
      const matchTitle = item.title.toLowerCase().includes(q);
      const matchCode = item.code.toLowerCase().includes(q);
      const matchFaculty = item.facultyName.toLowerCase().includes(q);
      const matchExams = item.exams.toLowerCase().includes(q);
      if (!matchTitle && !matchCode && !matchFaculty && !matchExams) return false;
    }

    return true;
  });

  resultsCountEl.textContent = filtered.length;

  if (filtered.length === 0) {
    programsGrid.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 50px 20px; color: #8091a5;">
        <div style="font-size: 2.5rem; margin-bottom: 10px;">🔍</div>
        <h3 style="color: #002d54; font-size: 1.2rem; margin-bottom: 6px;">Программ не найдено</h3>
        <p>Попробуйте скорректировать запрос или сбросить фильтры.</p>
      </div>
    `;
    return;
  }

  programsGrid.innerHTML = filtered
    .map((prog) => {
      return `
      <div class="card-program-item" data-id="${prog.id}">
        <div>
          <div class="badges-stack">
            <span class="tag-badge degree">${prog.levelLabel}</span>
            <span class="tag-badge code">${prog.code}</span>
            <span class="tag-badge budget">${prog.budgetSpots} бюджетных мест</span>
          </div>
          <h3 class="prog-item-title">${prog.title}</h3>
          <p class="prog-faculty-affiliation">
            🏛️ ${prog.facultyName}
          </p>

          <div class="prog-parameters-table">
            <div class="param-col">
              <span>Срок и форма:</span>
              <strong>${prog.duration}, ${prog.form}</strong>
            </div>
            <div class="param-col">
              <span>Платные места:</span>
              <strong>${prog.contractSpots} мест</strong>
            </div>
            <div class="param-col" style="grid-column: span 2;">
              <span>Экзамены:</span>
              <strong style="font-weight: 500;">${prog.exams}</strong>
            </div>
          </div>
        </div>

        <div class="card-cta-row">
          <div class="price-text">
            ${prog.price}
            <span>Стоимость обучения</span>
          </div>
          <button class="btn-card-enroll" data-program="${prog.code} ${prog.title}">
            Подать заявку
          </button>
        </div>
      </div>
    `;
    })
    .join("");

  document.querySelectorAll(".btn-card-enroll").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const progTitle = e.target.getAttribute("data-program");
      openApplicationModal(progTitle);
    });
  });
}

// ==========================================
// 4. Filtering Events
// ==========================================
levelTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    levelTabs.forEach((t) => t.classList.remove("active"));
    tab.classList.add("active");
    currentLevel = tab.getAttribute("data-level");
    renderPrograms();
  });
});

if (searchInput) {
  searchInput.addEventListener("input", (e) => {
    currentSearchQuery = e.target.value;
    renderPrograms();
  });
}

if (facultyFilterSelect) {
  facultyFilterSelect.addEventListener("change", (e) => {
    currentFaculty = e.target.value;
    renderPrograms();
  });
}

if (budgetFilterSelect) {
  budgetFilterSelect.addEventListener("change", (e) => {
    currentBudgetFilter = e.target.value;
    renderPrograms();
  });
}

// ==========================================
// 5. Modal Operations
// ==========================================
function openApplicationModal(preselectedProgram = "") {
  appModal.classList.add("active");
  document.body.style.overflow = "hidden";

  modalFormContainer.style.display = "block";
  modalSuccessBox.classList.remove("active");

  if (preselectedProgram && applicantProgramSelect) {
    let matched = false;
    for (let option of applicantProgramSelect.options) {
      if (option.text.includes(preselectedProgram) || preselectedProgram.includes(option.value)) {
        option.selected = true;
        matched = true;
        break;
      }
    }
    if (!matched && applicantProgramSelect.options.length > 1) {
      applicantProgramSelect.selectedIndex = 1;
    }
  }
}

function closeApplicationModal() {
  appModal.classList.remove("active");
  document.body.style.overflow = "auto";
}

// ==========================================
// 5.1 Login Modal (Личный кабинет) Logic
// ==========================================
const loginModal = document.getElementById("loginModal");
const loginModalCloseBtn = document.getElementById("loginModalCloseBtn");
const studentLoginForm = document.getElementById("studentLoginForm");
const loginFormContent = document.getElementById("loginFormContent");
const loginSuccessView = document.getElementById("loginSuccessView");
const togglePasswordBtn = document.getElementById("togglePasswordBtn");
const loginPasswordInput = document.getElementById("loginPassword");
const btnCloseLoginSuccess = document.getElementById("btnCloseLoginSuccess");
const btnLogoutSession = document.getElementById("btnLogoutSession");

function openLoginModal() {
  if (!loginModal) return;
  loginModal.classList.add("active");
  document.body.style.overflow = "hidden";
  
  // Reset view to form
  if (loginFormContent) loginFormContent.style.display = "block";
  if (loginSuccessView) loginSuccessView.style.display = "none";
}

function closeLoginModal() {
  if (!loginModal) return;
  loginModal.classList.remove("active");
  document.body.style.overflow = "auto";
}

// Open Login Modal Triggers
if (openCabinetBtn) {
  openCabinetBtn.addEventListener("click", (e) => {
    e.preventDefault();
    openLoginModal();
  });
}

document.querySelectorAll(".open-modal-trigger").forEach((el) => {
  el.addEventListener("click", (e) => {
    e.preventDefault();
    openLoginModal();
  });
});

if (loginModalCloseBtn) loginModalCloseBtn.addEventListener("click", closeLoginModal);
if (btnCloseLoginSuccess) {
  btnCloseLoginSuccess.addEventListener("click", () => {
    window.location.href = "cabinet.html";
  });
}

if (loginModal) {
  loginModal.addEventListener("click", (e) => {
    if (e.target === loginModal) closeLoginModal();
  });
}

// Role switcher (Студент / Сотрудник)
document.querySelectorAll(".role-switch-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".role-switch-btn").forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
  });
});

// Toggle Password Visibility
if (togglePasswordBtn && loginPasswordInput) {
  togglePasswordBtn.addEventListener("click", () => {
    const isPassword = loginPasswordInput.type === "password";
    loginPasswordInput.type = isPassword ? "text" : "password";
    togglePasswordBtn.textContent = isPassword ? "🙈" : "👁️";
  });
}

// Handle Login Form Submission with credential check
if (studentLoginForm) {
  studentLoginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const submitBtn = document.getElementById("btnSubmitLogin");
    const loginIdentifier = document.getElementById("loginIdentifier");
    const loginErrorMsg = document.getElementById("loginErrorMsg");

    const inputLogin = loginIdentifier ? loginIdentifier.value.trim() : "";
    const inputPass = loginPasswordInput ? loginPasswordInput.value.trim() : "";

    if (loginErrorMsg) loginErrorMsg.style.display = "none";

    const validUser = (inputLogin === "sh/arjmand/tjk" || inputLogin === "student");
    const validPass = (inputPass === "arjmand.2004" || inputPass === "12345");

    const originalText = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = "Проверка учетных данных...";

    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.textContent = originalText;

      if (validUser && validPass) {
        // Valid Login
        if (loginFormContent) loginFormContent.style.display = "none";
        if (loginSuccessView) loginSuccessView.style.display = "block";
        studentLoginForm.reset();
      } else {
        // Invalid credentials
        if (loginErrorMsg) {
          loginErrorMsg.style.display = "block";
        } else {
          alert("Неверный логин или пароль. Используйте логин: sh/arjmand/tjk и пароль: arjmand.2004");
        }
      }
    }, 500);
  });
}

if (btnLogoutSession) {
  btnLogoutSession.addEventListener("click", () => {
    if (loginFormContent) loginFormContent.style.display = "block";
    if (loginSuccessView) loginSuccessView.style.display = "none";
  });
}

// ==========================================
// 5.2 Application Modal Operations
// ==========================================
function openApplicationModal(preselectedProgram = "") {
  appModal.classList.add("active");
  document.body.style.overflow = "hidden";

  modalFormContainer.style.display = "block";
  modalSuccessBox.classList.remove("active");

  if (preselectedProgram && applicantProgramSelect) {
    let matched = false;
    for (let option of applicantProgramSelect.options) {
      if (option.text.includes(preselectedProgram) || preselectedProgram.includes(option.value)) {
        option.selected = true;
        matched = true;
        break;
      }
    }
    if (!matched && applicantProgramSelect.options.length > 1) {
      applicantProgramSelect.selectedIndex = 1;
    }
  }
}

function closeApplicationModal() {
  appModal.classList.remove("active");
  document.body.style.overflow = "auto";
}

if (btnHeaderApply) btnHeaderApply.addEventListener("click", () => openApplicationModal());
if (btnHeroApply) btnHeroApply.addEventListener("click", () => openApplicationModal());

if (modalCloseBtn) modalCloseBtn.addEventListener("click", closeApplicationModal);
if (btnModalCloseSuccess) btnModalCloseSuccess.addEventListener("click", closeApplicationModal);

appModal.addEventListener("click", (e) => {
  if (e.target === appModal) closeApplicationModal();
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    if (appModal && appModal.classList.contains("active")) closeApplicationModal();
    if (loginModal && loginModal.classList.contains("active")) closeLoginModal();
  }
});

// Form Submit
if (admissionForm) {
  admissionForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const submitBtn = admissionForm.querySelector(".btn-send-application");
    const originalText = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = "Регистрация заявления в МУФ...";

    setTimeout(() => {
      const randomNum = Math.floor(1000 + Math.random() * 9000);
      applicationRefId.textContent = `#MUF-2026-${randomNum}`;

      modalFormContainer.style.display = "none";
      modalSuccessBox.classList.add("active");

      submitBtn.disabled = false;
      submitBtn.textContent = originalText;
      admissionForm.reset();
    }, 600);
  });
}

// ==========================================
// 6. Mobile Nav
// ==========================================
if (mobileMenuBtn) {
  mobileMenuBtn.addEventListener("click", () => {
    mainNavLinks.classList.toggle("mobile-open");
  });
}

document.querySelectorAll("#mainNavLinks a").forEach((link) => {
  link.addEventListener("click", () => {
    if (mainNavLinks.classList.contains("mobile-open")) {
      mainNavLinks.classList.remove("mobile-open");
    }
  });
});

// ==========================================
// 7. Initialization
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
  renderPrograms();
});
