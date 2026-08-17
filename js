document.addEventListener("DOMContentLoaded", () => {
  // DOM Elements
  const tabs = document.querySelectorAll(".auth-tab");
  const authTitle = document.querySelector(".auth-title");
  const submitBtn = document.querySelector(".btn-submit");
  const authSubtitle = document.querySelector(".auth-subtitle");
  const emailInput = document.querySelector('input[type="email"]');
  const passwordInput = document.querySelector('input[type="password"]');
  const demoRows = document.querySelectorAll(".demo-row");
  const bgImageLayer = document.querySelector(".bg-image-layer");

  let activeMode = "signin"; // 'signin' | 'signup'

  // 1. Sign In / Sign Up Tab Toggle Logic
  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      tabs.forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");

      const selectedTab = tab.textContent.trim().toLowerCase();
      if (selectedTab.includes("sign in")) {
        activeMode = "signin";
        authTitle.textContent = "SIGN IN";
        authSubtitle.textContent = "Use your work email. Your role decides which modules open.";
        submitBtn.textContent = "Sign in";
      } else {
        activeMode = "signup";
        authTitle.textContent = "CREATE ACCOUNT";
        authSubtitle.textContent = "Enter your enterprise credentials to request console access.";
        submitBtn.textContent = "Request Access";
      }
    });
  });

  // 2. Clickable Demo Accounts (Quick Auto-fill)
  demoRows.forEach((row) => {
    row.style.cursor = "pointer";
    row.setAttribute("title", "Click to auto-fill credentials");

    row.addEventListener("click", () => {
      const email = row.querySelector("span:first-child").textContent.trim();
      emailInput.value = email;
      passwordInput.value = "Solitaire@2026";

      // Ensure form is set to Sign In mode
      if (activeMode !== "signin") {
        tabs[0].click();
      }

      // Visual feedback on auto-fill
      row.style.backgroundColor = "rgba(212, 175, 55, 0.15)";
      setTimeout(() => {
        row.style.backgroundColor = "transparent";
      }, 400);
    });
  });

  // 3. Form Submission Handling & Validation
  submitBtn.addEventListener("click", (e) => {
    e.preventDefault();

    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    if (!email || !password) {
      alert("Please fill in both email and password fields.");
      return;
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    // Processing animation
    const originalText = submitBtn.textContent;
    submitBtn.textContent = "Verifying role access...";
    submitBtn.disabled = true;
    submitBtn.style.opacity = "0.7";

    setTimeout(() => {
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
      submitBtn.style.opacity = "1";
      alert(`${activeMode === "signin" ? "Authenticated" : "Request Submitted"} for ${email}`);
    }, 1000);
  });

  // 4. Subtle Parallax Effect on Background Image
  if (bgImageLayer) {
    window.addEventListener("mousemove", (e) => {
      const mouseX = (e.clientX / window.innerWidth - 0.5) * 15;
      const mouseY = (e.clientY / window.innerHeight - 0.5) * 15;
      bgImageLayer.style.transform = `scale(1.05) translate(${mouseX}px, ${mouseY}px)`;
      bgImageLayer.style.transition = "transform 0.15s ease-out";
    });
  }
});
