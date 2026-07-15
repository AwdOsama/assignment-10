// ^ Write your JavaScript code here
var themeToggleBtn = document.getElementById("theme-toggle-button");
var htmlElement = document.documentElement;
var navLinks = document.querySelectorAll(".nav-links a");
var header = document.getElementById("header");
var sections = document.querySelectorAll("section");
var heightHeader = header.offsetHeight;
var bar = document.getElementById("settings-sidebar");
var barBtn = document.getElementById("settings-toggle");
var colorBtns = document.querySelectorAll("#theme-colors-grid button");
var closeBar = document.getElementById("close-settings");
var fontBtns = document.querySelectorAll(".font-option");
var primary = localStorage.getItem("primaryColor");
var secondary = localStorage.getItem("secondaryColor");
var accent = localStorage.getItem("accentColor");
var rocketScroll = document.getElementById("scroll-to-top");
var navsTapsBtns = document.querySelectorAll(".portfolio-filter");
var portfolioItem = document.querySelectorAll(".portfolio-item");
var slider = document.getElementById("testimonials-carousel");
var nextBtn = document.getElementById("next-testimonial");
var prevBtn = document.getElementById("prev-testimonial");
var indicators = document.querySelectorAll(".carousel-indicator");

if (primary && secondary && accent) {
  document.documentElement.style.setProperty("--color-primary", primary);
  document.documentElement.style.setProperty("--color-secondary", secondary);
  document.documentElement.style.setProperty("--color-accent", accent);
}

themeToggleBtn.addEventListener("click", function () {
  htmlElement.classList.toggle("dark");
});

window.addEventListener("scroll", function () {
  var currentSection = "";
  for (var i = 0; i < sections.length; i++) {
    var section = sections[i];
    if (window.scrollY + heightHeader >= section.offsetTop) {
      currentSection = section.id;
    }
  }

  for (var i = 0; i < navLinks.length; i++) {
    navLinks[i].classList.remove("active");

    if (navLinks[i].getAttribute("href") === "#" + currentSection) {
      navLinks[i].classList.add("active");
    }
  }
});

barBtn.addEventListener("click", function () {
  bar.classList.toggle("translate-x-full");
  if (bar.classList.contains("translate-x-full")) {
    barBtn.style.transform = "translateY(-50%)";
  } else {
    barBtn.style.transform = "translate(-320px, -50%)";
  }
});
closeBar.addEventListener("click", function () {
  bar.classList.add("translate-x-full");
  barBtn.style.transform = "translate(0%, -50%)";
});

for (var i = 0; i < colorBtns.length; i++) {
  colorBtns[i].addEventListener("click", function () {
    for (var j = 0; j < colorBtns.length; j++) {
      colorBtns[j].classList.remove(
        "ring-2",
        "ring-primary",
        "ring-offset-2",
        "ring-offset-white",
        "dark:ring-offset-slate-900",
      );
    }

    this.classList.add(
      "ring-2",
      "ring-primary",
      "ring-offset-2",
      "ring-offset-white",
      "dark:ring-offset-slate-900",
    );

    document.documentElement.style.setProperty(
      "--color-primary",
      this.dataset.primary,
    );

    document.documentElement.style.setProperty(
      "--color-secondary",
      this.dataset.secondary,
    );

    document.documentElement.style.setProperty(
      "--color-accent",
      this.dataset.accent,
    );
    localStorage.setItem("primaryColor", this.dataset.primary);
    localStorage.setItem("secondaryColor", this.dataset.secondary);
    localStorage.setItem("accentColor", this.dataset.accent);
  });
}

for (var i = 0; i < fontBtns.length; i++) {
  fontBtns[i].addEventListener("click", function () {
    document.body.classList.remove("alexandria", "cairo", "tajawal");

    for (var j = 0; j < fontBtns.length; j++) {
      fontBtns[j].classList.remove("active");

      var iconCheack = fontBtns[j].querySelector(".btn-font-icon");

      iconCheack.classList.remove("opacity-100", "text-primary");
      iconCheack.classList.add("opacity-0");
    }

    document.body.classList.add(this.dataset.font);

    this.classList.add("active");

    var iconCheack = this.querySelector(".btn-font-icon");

    iconCheack.classList.remove("opacity-0");
    iconCheack.classList.add("opacity-100", "text-primary");
  });
}

window.addEventListener("scroll", function () {
  if (window.scrollY >= 400) {
    rocketScroll.classList.remove("opacity-0", "invisible");
  } else {
    rocketScroll.classList.add("opacity-0", "invisible");
  }
});

rocketScroll.addEventListener("click", function () {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

for (var i = 0; i < navsTapsBtns.length; i++) {
  navsTapsBtns[i].addEventListener("click", function () {
    for (var j = 0; j < navsTapsBtns.length; j++) {
      navsTapsBtns[j].classList.remove("filter-active");
      navsTapsBtns[j].classList.add("filter-inactive");
    }
    this.classList.add("filter-active");
    this.classList.remove("filter-inactive");
    var filter = this.dataset.filter;
    for (var k = 0; k < portfolioItem.length; k++) {
      if (filter === "all" || filter === portfolioItem[k].dataset.category) {
        portfolioItem[k].classList.remove("hidden");
      } else {
        portfolioItem[k].classList.add("hidden");
      }
    }
  });
}

var current = 0;
var max = 3;
function moveSlider() {
  slider.classList.remove(
    "translate-0",
    "translate-100",
    "translate-200",
    "translate-300",
  );
  slider.classList.add("translate-" + current + "00");
  updateIndicators();
}
nextBtn.addEventListener("click", function () {
  current++;
  if (current > max) {
    current = 0;
  }
  moveSlider();
});
prevBtn.addEventListener("click", function () {
  current--;
  if (current < 0) {
    current = max;
  }
  moveSlider();
});

function updateIndicators() {
  for (var i = 0; i < indicators.length; i++) {
    indicators[i].classList.remove("active");
  }
  indicators[current].classList.add("active");
}
for (var i = 0; i < indicators.length; i++) {
  indicators[i].addEventListener("click", function () {
    current = Number(this.dataset.index);

    moveSlider();
  });
}
