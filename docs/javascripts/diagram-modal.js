/**
 * Mermaid Diagram Click-to-Enlarge Modal
 * Adds a fullscreen popup overlay when any Mermaid diagram is clicked.
 */
(function () {
  "use strict";

  // Create modal elements once
  var overlay = document.createElement("div");
  overlay.className = "diagram-modal-overlay";
  overlay.setAttribute("aria-hidden", "true");
  overlay.setAttribute("role", "dialog");
  overlay.setAttribute("aria-label", "Enlarged diagram view");

  var container = document.createElement("div");
  container.className = "diagram-modal-container";

  var closeBtn = document.createElement("button");
  closeBtn.className = "diagram-modal-close";
  closeBtn.setAttribute("aria-label", "Close diagram");
  closeBtn.innerHTML = "&times;";

  var content = document.createElement("div");
  content.className = "diagram-modal-content";

  container.appendChild(closeBtn);
  container.appendChild(content);
  overlay.appendChild(container);
  document.body.appendChild(overlay);

  function openModal(svgElement) {
    var clone = svgElement.cloneNode(true);
    clone.style.maxWidth = "100%";
    clone.style.maxHeight = "100%";
    clone.style.width = "auto";
    clone.style.height = "auto";
    clone.removeAttribute("width");
    clone.removeAttribute("height");
    content.innerHTML = "";
    content.appendChild(clone);
    overlay.classList.add("active");
    overlay.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    closeBtn.focus();
  }

  function closeModal() {
    overlay.classList.remove("active");
    overlay.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    content.innerHTML = "";
  }

  closeBtn.addEventListener("click", closeModal);
  overlay.addEventListener("click", function (e) {
    if (e.target === overlay) closeModal();
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && overlay.classList.contains("active")) {
      closeModal();
    }
  });

  function attachHandlers() {
    var diagrams = document.querySelectorAll(".mermaid");
    diagrams.forEach(function (diagram) {
      if (diagram.dataset.modalAttached) return;
      diagram.dataset.modalAttached = "true";
      diagram.style.cursor = "pointer";
      diagram.setAttribute("title", "Click to enlarge diagram");
      diagram.addEventListener("click", function () {
        var svg = diagram.querySelector("svg");
        if (svg) openModal(svg);
      });
    });
  }

  // Run on initial load and observe for dynamically rendered diagrams
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", attachHandlers);
  } else {
    attachHandlers();
  }

  // MkDocs Material uses instant loading — re-attach on navigation
  if (typeof document$ !== "undefined") {
    document$.subscribe(function () {
      setTimeout(attachHandlers, 500);
    });
  }

  // Observe DOM mutations for late-rendering Mermaid diagrams
  var observer = new MutationObserver(function (mutations) {
    var shouldAttach = false;
    mutations.forEach(function (m) {
      if (m.addedNodes.length) shouldAttach = true;
    });
    if (shouldAttach) attachHandlers();
  });
  observer.observe(document.body, { childList: true, subtree: true });
})();
