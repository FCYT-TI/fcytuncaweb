
(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    if (all) {
      select(el, all).forEach(e => e.addEventListener(type, listener))
    } else {
      select(el, all).addEventListener(type, listener)
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Navbar links active state on scroll
   */
let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let header = select('#header')
    let offset = header.offsetHeight

    if (!header.classList.contains('header-scrolled')) {
      offset -= 10
    }

    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos - offset,
      behavior: 'smooth'
    })
  }

  /**
   * Toggle .header-scrolled class to #header when page is scrolled
   */
  let selectHeader = select('#header')
  if (selectHeader) {
    const headerScrolled = () => {
      if (window.scrollY > 100) {
        selectHeader.classList.add('header-scrolled')
      } else {
        selectHeader.classList.add('header-scrolled')
      }
    }
    window.addEventListener('load', headerScrolled)
    onscroll(document, headerScrolled)
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('#navbar').classList.toggle('navbar-mobile')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Mobile nav dropdowns activate
   */
  on('click', '.navbar .dropdown > a', function(e) {
    if (select('#navbar').classList.contains('navbar-mobile')) {
      e.preventDefault()
      this.nextElementSibling.classList.toggle('dropdown-active')
    }
  }, true)

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault()

      let navbar = select('#navbar')
      if (navbar.classList.contains('navbar-mobile')) {
        navbar.classList.remove('navbar-mobile')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Clients Slider
   */
  new Swiper('.clients-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    breakpoints: {
      320: {
        slidesPerView: 2,
        spaceBetween: 40
      },
      480: {
        slidesPerView: 3,
        spaceBetween: 60
      },
      640: {
        slidesPerView: 4,
        spaceBetween: 80
      },
      992: {
        slidesPerView: 6,
        spaceBetween: 120
      }
    }
  });

  /**
   * Porfolio isotope and filter
   */
  window.addEventListener('load', () => {
    let portfolioContainer = select('.portfolio-container');
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item',
        layoutMode: 'fitRows'
      });

      let portfolioFilters = select('#portfolio-flters li', true);

      on('click', '#portfolio-flters li', function(e) {
        e.preventDefault();
        portfolioFilters.forEach(function(el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        aos_init();
      }, true);
    }

  });

  /**
   * Initiate portfolio lightbox 
   */
  const portfolioLightbox = GLightbox({
    selector: '.portfokio-lightbox'
  });

  /**
   * Portfolio details slider
   */
  new Swiper('.portfolio-details-slider', {
    speed: 400,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Testimonials slider
   */
  new Swiper('.testimonials-slider', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 40
      },

      1200: {
        slidesPerView: 3,
      }
    }
  });

  /**
   * Animation on scroll
   */
  function aos_init() {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', () => {
    aos_init();
  });

  /**
   * Initiate Pure Counter 
   */
  new PureCounter();

})();

document.addEventListener('DOMContentLoaded', (event) => {
  let currentIndex = 0;
  const images = document.querySelectorAll('.carousel-image');
  const carouselBottonNext = document.querySelector('.btnNext');
  const carouselBottonPrevius = document.querySelector('.btnPrevius');
  let intervalId;

  function startInterval() {
    intervalId = setInterval(showNextImage, 8000);
  }

  function resetInterval() {
    clearInterval(intervalId);
    startInterval();
  }

  carouselBottonNext.addEventListener('click', function(){
      showNextImage();
      resetInterval();
    });
  carouselBottonPrevius.addEventListener('click', function(){
    showPreviusImage();
    resetInterval();
  })

  function showPreviusImage(){
    if(currentIndex == 0){
      images[currentIndex].classList.remove('active');
      currentIndex = images.length-1;
      console.log(currentIndex);
      images[currentIndex].classList.add('active');
    }else{
      images[currentIndex].classList.remove('active');
      currentIndex = (currentIndex - 1);
      images[currentIndex].classList.add('active');
    }

  }
  function showNextImage() {
      images[currentIndex].classList.remove('active'); // Oculta la imagen actual
      currentIndex = (currentIndex + 1) % images.length; // Incrementa el índice y hace que se reinicie al llegar al final
      images[currentIndex].classList.add('active'); // Muestra la siguiente imagen
  }
  // Inicializa el carrusel mostrando la primera imagen
  images[currentIndex].classList.add('active');

  // Cambia la imagen cada 3 segundos
  startInterval();
});

/**
   * Tables
   */

// Selección de elementos del DOM
const search = document.querySelector(".input-group input");
const tableRows = document.querySelectorAll("tbody tr");
const tableHeadings = document.querySelectorAll("thead th");

// Función para manejar la búsqueda en la tabla
search.addEventListener("input", function () {
  const searchData = search.value.toLowerCase();

  tableRows.forEach((row, i) => {
    const rowData = row.textContent.toLowerCase();
    const isVisible = rowData.indexOf(searchData) >= 0;

    row.classList.toggle("hide", !isVisible);
    row.style.setProperty("--delay", `${i / 25}s`);
  });

  // Alternar color de fondo para las filas visibles
  const visibleRows = document.querySelectorAll("tbody tr:not(.hide)");
  visibleRows.forEach((visibleRow, i) => {
    visibleRow.style.backgroundColor = i % 2 === 0 ? "transparent" : "#0000000b";
  });
});

// Función para manejar la ordenación de columnas
tableHeadings.forEach((heading, index) => {
  let sortAsc = true;

  heading.addEventListener("click", () => {
    // Activar la cabecera seleccionada
    tableHeadings.forEach((head) => head.classList.remove("active"));
    heading.classList.add("active");

    // Activar la columna seleccionada
    document.querySelectorAll("td").forEach((cell) => cell.classList.remove("active"));
    tableRows.forEach((row) => {
      row.querySelectorAll("td")[index].classList.add("active");
    });

    // Alternar el orden de clasificación
    heading.classList.toggle("asc", sortAsc);
    sortAsc = !sortAsc;

    // Ordenar la tabla
    sortTable(index, sortAsc);
  });
});

// Función para ordenar las filas de la tabla
function sortTable(columnIndex, sortAsc) {
  const sortedRows = [...tableRows].sort((a, b) => {
    const firstRowData = a.querySelectorAll("td")[columnIndex].textContent.toLowerCase();
    const secondRowData = b.querySelectorAll("td")[columnIndex].textContent.toLowerCase();

    return sortAsc
      ? firstRowData.localeCompare(secondRowData)
      : secondRowData.localeCompare(firstRowData);
  });

  const tableBody = document.querySelector("tbody");
  sortedRows.forEach((row) => tableBody.appendChild(row));
}