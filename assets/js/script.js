particlesJS("particles-js", {
  particles: {
    number: { value: 150 },
    size: { value: 2.5 },
    color: {
      value: ["#ff4081", "#00bcd4", "#7c4dff", "#1e90ff", "#ff9800", "#4caf50", "#f44336", "#9c27b0", "#2196f3", "#ffeb3b", "#673ab7", "#3f51b5", "#009688", "#cddc39", "#795548", "#607d8b", "#e91e63", "#8bc34a", "#ffc107", "#9e9e9e", "#ff5722", "#00bcd4", "#673ab7", "#3f51b5"],
      random: true
    },
    opacity: { value: 1, random: true },
    move: { enable: true, speed: 2 },
    line_linked: {
      enable: true,
      distance: 100,
      color: "#ffffff",
      opacity: 0.2,
      width: 1
    }
  }
});


// reveal-on-scroll
const obs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) e.target.classList.add('appear');
  });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach((el, index) => {
  el.style.transitionDelay = `${index * 100}ms`;
  obs.observe(el);
});


// scrollToTop
const scrollBtn = document.getElementById("scrollToTop");

window.addEventListener("scroll", () => {
  if (window.pageYOffset > 300) {
    scrollBtn.classList.add("show");
  } else {
    scrollBtn.classList.remove("show");
  }
});

scrollBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// FAQ Toggle
document.querySelectorAll('.faq-question').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.closest('.faq-item');
    const answer = item.querySelector('.faq-answer');
    const isActive = item.classList.contains('active');

    // Collapse
    document.querySelectorAll('.faq-item').forEach(other => {
      const otherAnswer = other.querySelector('.faq-answer');
      other.classList.remove('active');
      otherAnswer.style.maxHeight = null;
      otherAnswer.style.paddingTop = null;
      otherAnswer.style.paddingBottom = null;
    });

    if (!isActive) {
      answer.style.maxHeight = 'none';
      answer.style.paddingTop = '0.75rem';
      answer.style.paddingBottom = '0.75rem';

      const fullHeight = answer.scrollHeight;

      answer.style.maxHeight = '0px';

      requestAnimationFrame(() => {
        item.classList.add('active');
        answer.style.maxHeight = fullHeight + 'px';
      });
    }
  });
});



// Contact form submission (AJAX or Formspree)
document
  .getElementById("contactForm")
  .addEventListener("submit", async (e) => {
    e.preventDefault();
    const btn = e.target.querySelector('button[type="submit"]');
    btn.disabled = true;
    btn.textContent = "Sending…";
    const data = {
      name: e.target.name.value.trim(),
      email: e.target.email.value.trim(),
      message: e.target.message.value.trim(),
    };
    // Example: Formspree API
    try {
      const resp = await fetch("https://formspree.io/f/YOUR_FORM_ID", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: JSON.stringify(data),
      });
      if (resp.ok) {
        showAlert("Message sent successfully!", "success");
        e.target.reset();
      } else {
        throw new Error("Submission failed");
      }
    } catch (err) {
      showAlert(
        "Oops! Something went wrong, please try later.",
        "danger"
      );
    } finally {
      btn.disabled = false;
      btn.innerHTML = "<span>Send Message</span>";
    }
  });
function showAlert(msg, type) {
  const div = document.getElementById("formAlert");
  div.innerHTML = msg;
  div.className = `alert alert-${type}`;
  div.style.display = "block";
  setTimeout(() => (div.style.display = "none"), 6000);
}

function showImage(src, title) {
  document.getElementById('modalImage').src = src;
  document.getElementById('projectModalLabel').textContent = title;
}