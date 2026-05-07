/**
 * Mermaid Diagram Renderer + Click-to-Enlarge Modal
 * 
 * Handles mermaid rendering independently of MkDocs Material's built-in
 * integration (which has issues with content loss during DOM transformation).
 * Also adds fullscreen popup overlay when any rendered diagram is clicked.
 */
(function () {
  "use strict";

  // ========== MODAL SETUP ==========
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

  // ========== MERMAID RENDERING ==========
  var MERMAID_CDN = "https://unpkg.com/mermaid@11/dist/mermaid.min.js";
  var mermaidReady = false;
  var pendingRender = [];

  function loadMermaid(callback) {
    // Check if already loaded (e.g., by Material theme)
    if (typeof mermaid !== "undefined" && mermaid.run) {
      mermaidReady = true;
      callback();
      return;
    }
    var script = document.createElement("script");
    script.src = MERMAID_CDN;
    script.onload = function () {
      mermaid.initialize({ startOnLoad: false, theme: "default" });
      mermaidReady = true;
      callback();
    };
    document.head.appendChild(script);
  }

  function renderDiagrams() {
    // Find all pre.mermaid-diagram elements that haven't been rendered yet
    var pres = document.querySelectorAll("pre.mermaid-diagram");
    if (pres.length === 0) return;

    var toRender = [];
    pres.forEach(function (pre) {
      if (pre.dataset.rendered) return;
      pre.dataset.rendered = "true";

      // Extract the mermaid source code from the code element
      var codeEl = pre.querySelector("code");
      var source = codeEl ? codeEl.textContent : pre.textContent;
      if (!source.trim()) return;

      // Create a wrapper div for the rendered diagram
      var wrapper = document.createElement("div");
      wrapper.className = "mermaid-rendered";
      wrapper.textContent = source;
      pre.parentNode.replaceChild(wrapper, pre);
      toRender.push(wrapper);
    });

    if (toRender.length === 0) return;

    function doRender() {
      if (!mermaidReady) {
        pendingRender = pendingRender.concat(toRender);
        return;
      }
      mermaid.run({ nodes: toRender }).then(function () {
        toRender.forEach(attachClickHandler);
      }).catch(function (err) {
        console.warn("Mermaid render error:", err);
      });
    }

    doRender();
  }

  function attachClickHandler(el) {
    if (el.dataset.modalAttached) return;
    var svg = el.querySelector("svg");
    if (!svg) return;
    el.dataset.modalAttached = "true";
    el.style.cursor = "pointer";
    el.setAttribute("title", "Click to enlarge diagram");
    el.addEventListener("click", function (e) {
      if (e.target.closest && e.target.closest("a")) return;
      var currentSvg = el.querySelector("svg");
      if (currentSvg) openModal(currentSvg);
    });
  }

  // Also handle any diagrams that Material might have rendered with class "mermaid"
  function attachToExistingDiagrams() {
    var rendered = document.querySelectorAll(".mermaid-rendered, .mermaid");
    rendered.forEach(function (el) {
      if (el.querySelector("svg")) {
        attachClickHandler(el);
      }
    });
  }

  // ========== INITIALIZATION ==========
  function init() {
    ensureOverlay();
    loadMermaid(function () {
      // Render any pending diagrams
      if (pendingRender.length > 0) {
        mermaid.run({ nodes: pendingRender }).then(function () {
          pendingRender.forEach(attachClickHandler);
          pendingRender = [];
        });
      }
      renderDiagrams();
      attachToExistingDiagrams();
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  // MkDocs Material instant loading support
  if (typeof document$ !== "undefined") {
    document$.subscribe(function () {
      setTimeout(function () {
        renderDiagrams();
        attachToExistingDiagrams();
      }, 100);
    });
  }

  // Observe for dynamically added diagram elements
  var observer = new MutationObserver(function () {
    if (document.querySelector("pre.mermaid-diagram:not([data-rendered])")) {
      renderDiagrams();
    }
    attachToExistingDiagrams();
  });
  observer.observe(document.body, { childList: true, subtree: true });
})();
