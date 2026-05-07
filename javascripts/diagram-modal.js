/**
 * Mermaid Diagram Click-to-Enlarge Modal
 * Adds a fullscreen popup overlay when any rendered Mermaid diagram is clicked.
 * Compatible with MkDocs Material's Mermaid rendering pipeline.
 */
(function () {
  "use strict";

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

  function ensureOverlay() {
    if (!document.body.contains(overlay)) {
      document.body.appendChild(overlay);
    }
  }

  function openModal(svgElement) {
    ensureOverlay();
    var clone = svgElement.cloneNode(true);
    clone.style.maxWidth = "100%";
    clone.style.maxHeight = "100%";
    clone.style.width = "auto";
    clone.style.height = "auto";
    clone.removeAttribute("width");
    clone.removeAttribute("height");
    // Ensure viewBox is set for proper scaling
    if (!clone.getAttribute("viewBox") && clone.getAttribute("width") && clone.getAttribute("height")) {
      clone.setAttribute("viewBox", "0 0 " + clone.getAttribute("width") + " " + clone.getAttribute("height"));
    }
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
    // MkDocs Material renders mermaid diagrams as SVG inside elements with class "mermaid"
    // The elements can be <pre class="mermaid"> or <div class="mermaid"> depending on rendering stage
    var diagrams = document.querySelectorAll("pre.mermaid, .mermaid");
    diagrams.forEach(function (diagram) {
      if (diagram.dataset.modalAttached) return;
      // Only attach to elements that contain a rendered SVG
      var svg = diagram.querySelector("svg");
      if (!svg) return;
      diagram.dataset.modalAttached = "true";
      diagram.style.cursor = "pointer";
      diagram.setAttribute("title", "Click to enlarge diagram");
      diagram.addEventListener("click", function (e) {
        // Don't trigger if clicking a link inside the diagram
        if (e.target.closest("a")) return;
        var currentSvg = diagram.querySelector("svg");
        if (currentSvg) openModal(currentSvg);
      });
    });
  }

  // Run on initial load
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () {
      setTimeout(attachHandlers, 1000);
    });
  } else {
    setTimeout(attachHandlers, 1000);
  }

  // MkDocs Material instant loading support
  if (typeof document$ !== "undefined") {
    document$.subscribe(function () {
      // Mermaid rendering is async; wait for it to complete
      setTimeout(attachHandlers, 2000);
    });
  }

  // Observe for SVGs being added (Mermaid renders asynchronously)
  var observer = new MutationObserver(function () {
    attachHandlers();
  });
  observer.observe(document.body, { childList: true, subtree: true });
})();
