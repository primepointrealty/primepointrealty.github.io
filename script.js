const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");

menuToggle?.addEventListener("click", () => {
  const open = mainNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", open ? "true" : "false");
});

document.querySelectorAll("#mainNav a").forEach(link => {
  link.addEventListener("click", () => {
    mainNav.classList.remove("open");
    menuToggle?.setAttribute("aria-expanded", "false");
  });
});

const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));

const sections = [...document.querySelectorAll("main section[id]")];
const navLinks = [...document.querySelectorAll("#mainNav a")];

window.addEventListener("scroll", () => {
  let current = "home";
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 130) current = section.id;
  });
  navLinks.forEach(link => {
    link.classList.toggle("active", link.getAttribute("href") === "#" + current);
  });
}, { passive: true });

document.getElementById("year").textContent = new Date().getFullYear();

document.getElementById("requirementForm")?.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const location = document.getElementById("location").value.trim();
  const type = document.getElementById("type").value;
  const area = document.getElementById("area").value.trim();
  const message = document.getElementById("message").value.trim();

  const text =
`Hello PrimePoint Realty,

I would like to enquire about a commercial property.

Name: ${name}
Mobile: ${phone}
Preferred Location: ${location}
Property Type: ${type}
Required Area / Size: ${area || "Not specified"}
Additional Requirement: ${message || "Not specified"}

Please share suitable property options.`;

  window.open("https://wa.me/918855924593?text=" + encodeURIComponent(text), "_blank", "noopener");
});
