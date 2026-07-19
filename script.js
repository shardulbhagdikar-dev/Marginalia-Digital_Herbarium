/* ============================================================
   MARGINALIA — script.js
   A few small, self-contained DOM exercises. Each block below
   only runs if its target element exists on the current page,
   so this one file is safe to include on all three pages.
   ============================================================ */

// ---------- 1. Footer year (every page) ----------
// document.getElementById() grabs a single element by its id.
// textContent replaces whatever text is currently inside it.
const yearEl = document.getElementById("year");
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}


// ---------- 2. Mobile nav toggle (every page) ----------
// The checkbox + label combo in the HTML already does the showing/
// hiding via CSS (:checked). This just closes the menu automatically
// if someone clicks a link inside it, which pure CSS can't do alone.
const navToggle = document.getElementById("nav-toggle");
const navLinks = document.querySelectorAll(".site-nav a");

navLinks.forEach(function (link) {
  link.addEventListener("click", function () {
    if (navToggle) navToggle.checked = false;
  });
});


// ---------- 3. Animated stat counter (home page) ----------
// Reads the target number out of a data-* attribute, then steps
// toward it with setInterval. data-target is just text on the
// element, so it has to be converted with Number() before doing math.
const counterEl = document.getElementById("specimen-count");
if (counterEl) {
  const target = Number(counterEl.dataset.target);
  let current = 0;
  const step = Math.ceil(target / 40);

  const counterTimer = setInterval(function () {
    current += step;
    if (current >= target) {
      current = target;
      clearInterval(counterTimer);
    }
    counterEl.textContent = current;
  }, 25);
}


// ---------- 4. Collection page: live search + status filter ----------
const searchInput = document.getElementById("specimen-search");
const table = document.getElementById("specimen-table");

if (searchInput && table) {
  const rows = table.querySelectorAll("tbody tr");
  const filterButtons = document.querySelectorAll(".filter-btn");
  const resultCount = document.getElementById("result-count");
  let activeStatus = "all";

  // Re-checks every row against both the current search text and the
  // currently selected status filter, then shows/hides accordingly.
  function applyFilters() {
    const query = searchInput.value.trim().toLowerCase();
    let visibleCount = 0;

    rows.forEach(function (row) {
      // row.dataset.status reads the data-status="..." attribute.
      const rowStatus = row.dataset.status;
      const rowText = row.textContent.toLowerCase();

      const matchesStatus = activeStatus === "all" || rowStatus === activeStatus;
      const matchesSearch = rowText.includes(query);

      const shouldShow = matchesStatus && matchesSearch;
      row.classList.toggle("is-hidden", !shouldShow);

      if (shouldShow) visibleCount += 1;
    });

    if (resultCount) {
      resultCount.textContent = visibleCount + " of " + rows.length + " specimens shown";
    }
  }

  searchInput.addEventListener("input", applyFilters);

  filterButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      activeStatus = button.dataset.filter;

      // Update aria-pressed / visual state on every button, not just
      // the one clicked, so only one filter is ever marked active.
      filterButtons.forEach(function (btn) {
        btn.setAttribute("aria-pressed", btn === button ? "true" : "false");
      });

      applyFilters();
    });
  });

  applyFilters(); // run once on page load to set the initial count
}


// ---------- 5. Field notes page: lightweight form feedback ----------
const sightingForm = document.getElementById("sighting-form");

if (sightingForm) {
  const statusEl = document.getElementById("form-status");

  sightingForm.addEventListener("submit", function (event) {
    // Prevent the actual network submission — there's no server here,
    // this is just demonstrating validation + feedback in the DOM.
    event.preventDefault();

    // checkValidity() uses the required/type attributes already
    // written into the HTML (required, type="email", etc.).
    const isValid = sightingForm.checkValidity();

    statusEl.classList.add("is-visible");

    if (isValid) {
      statusEl.textContent = "Thanks — this sighting has been queued for review.";
      statusEl.classList.remove("error");
      statusEl.classList.add("ok");
      sightingForm.reset();
    } else {
      statusEl.textContent = "A few required fields still need filling in.";
      statusEl.classList.remove("ok");
      statusEl.classList.add("error");
      // Ask the browser to show its own built-in validation messages
      // (e.g. "please fill out this field") on the offending inputs.
      sightingForm.reportValidity();
    }
  });
}
