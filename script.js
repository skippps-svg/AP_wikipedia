const tabs = document.querySelectorAll("[data-panel]");
const panels = document.querySelectorAll("[data-panel-content]");
const railLinks = document.querySelectorAll(".left-rail a");

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const target = tab.dataset.panel;
    tabs.forEach((item) => item.classList.toggle("selected", item === tab));
    panels.forEach((panel) => {
      panel.classList.toggle("active-panel", panel.dataset.panelContent === target);
    });
  });
});

const sections = [...railLinks]
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

const observer = new IntersectionObserver(
  (entries) => {
    const visible = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

    if (!visible) return;

    railLinks.forEach((link) => {
      link.classList.toggle("active", link.getAttribute("href") === `#${visible.target.id}`);
    });
  },
  {
    rootMargin: "-20% 0px -65% 0px",
    threshold: [0.1, 0.5, 1],
  },
);

sections.forEach((section) => observer.observe(section));
