
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

window.addEventListener('scroll', function() {
  var elements = document.querySelectorAll('.containerTitleIdent');
  var windowHeight = window.innerHeight;

  elements.forEach(function(element) {
    var elementTop = element.getBoundingClientRect().top;

    if (elementTop < windowHeight - 100) {
      element.classList.add('show');
    }
  });
});
window.addEventListener('scroll', function() {
  var elements = document.querySelectorAll('.containerTitleIdent, .containerlogoFCytIdentidad-img');
  var windowHeight = window.innerHeight;

  elements.forEach(function(element) {
    var elementTop = element.getBoundingClientRect().top;

    if (elementTop < windowHeight - 100) {
      element.classList.add('show');
    }
  });
});
window.addEventListener('scroll', function() {
  var elements = document.querySelectorAll('.containerTitleIdent, .containerlogoFCytIdentidad-img, .containerisologoinst-img');
  var windowHeight = window.innerHeight;

  elements.forEach(function(element) {
    var elementTop = element.getBoundingClientRect().top;

    if (elementTop < windowHeight - 100) {
      element.classList.add('show');
    }
  });
});
window.addEventListener('scroll', function() {
  var elements = document.querySelectorAll('.containerTitleIdent, .containerlogoFCytIdentidad-img, .containerisologoinst-img, .containerconstrucymodu-img');
  var windowHeight = window.innerHeight;

  elements.forEach(function(element) {
    var elementTop = element.getBoundingClientRect().top;

    if (elementTop < windowHeight - 100) {
      element.classList.add('show');
    }
  });
});
window.addEventListener('scroll', function() {
  var elements = document.querySelectorAll('.containerTitleIdent, .containerlogoFCytIdentidad-img, .containerisologoinst-img, .containerconstrucymodu-img, .containersecurityredutc-img');
  var windowHeight = window.innerHeight;

  elements.forEach(function(element) {
    var elementTop = element.getBoundingClientRect().top;

    if (elementTop < windowHeight - 100) {
      element.classList.add('show');
    }
  });
});
window.addEventListener('scroll', function() {
  var elements = document.querySelectorAll('.containerTitleIdent, .containerlogoFCytIdentidad-img, .containerisologoinst-img, .containerconstrucymodu-img, .containersecurityredutc-img, .containercolorimetria-img');
  var windowHeight = window.innerHeight;

  elements.forEach(function(element) {
    var elementTop = element.getBoundingClientRect().top;

    if (elementTop < windowHeight - 100) {
      element.classList.add('show');
    }
  });
});
window.addEventListener('scroll', function() {
  var elements = document.querySelectorAll('.containerTitleIdent, .containerlogoFCytIdentidad-img, .containerisologoinst-img, .containerconstrucymodu-img, .containersecurityredutc-img, .containercolorimetria-img, .containerapliccorrect-img');
  var windowHeight = window.innerHeight;

  elements.forEach(function(element) {
    var elementTop = element.getBoundingClientRect().top;

    if (elementTop < windowHeight - 100) {
      element.classList.add('show');
    }
  });
});
window.addEventListener('scroll', function() {
  var elements = document.querySelectorAll('.containerTitleIdent, .containerlogoFCytIdentidad-img, .containerisologoinst-img, .containerconstrucymodu-img, .containersecurityredutc-img, .containercolorimetria-img, .containerapliccorrect-img, .containertipografia-img');
  var windowHeight = window.innerHeight;

  elements.forEach(function(element) {
    var elementTop = element.getBoundingClientRect().top;

    if (elementTop < windowHeight - 100) {
      element.classList.add('show');
    }
  });
});
window.addEventListener('scroll', function() {
  var elements = document.querySelectorAll('.containerTitleIdent, .containerlogoFCytIdentidad-img, .containerisologoinst-img, .containerconstrucymodu-img, .containersecurityredutc-img, .containercolorimetria-img, .containerapliccorrect-img, .containertipografia-img, .containerrestric-img');
  var windowHeight = window.innerHeight;

  elements.forEach(function(element) {
    var elementTop = element.getBoundingClientRect().top;

    if (elementTop < windowHeight - 100) {
      element.classList.add('show');
    }
  });
});
window.addEventListener('scroll', function() {
  var elements = document.querySelectorAll('.containerTitleIdent, .containerlogoFCytIdentidad-img, .containerisologoinst-img, .containerconstrucymodu-img, .containersecurityredutc-img, .containercolorimetria-img, .containerapliccorrect-img, .containertipografia-img, .containerrestric-img, .containerTextAnim');
  var windowHeight = window.innerHeight;

  elements.forEach(function(element) {
    var elementTop = element.getBoundingClientRect().top;

    if (elementTop < windowHeight - 100) {
      element.classList.add('show');
    }
  });
});
window.addEventListener('scroll', function() {
  var elements = document.querySelectorAll('.containerTitleIdent, .containerlogoFCytIdentidad-img, .containerisologoinst-img, .containerconstrucymodu-img, .containersecurityredutc-img, .containercolorimetria-img, .containerapliccorrect-img, .containertipografia-img, .containerrestric-img, .containerTextAnim');
  var windowHeight = window.innerHeight;

  elements.forEach(function(element) {
    var elementTop = element.getBoundingClientRect().top;

    if (elementTop < windowHeight - 100) {
      element.classList.add('show');
    }
  });
});
/**
   * Tables
   */

// Selección de elementos del DOM
const search = document.querySelector(".input-group input");
const tableRows = document.querySelectorAll("tbody tr");
const tableHeadings = document.querySelectorAll("thead th");

// Función para manejar la búsqueda en la tabla
if (search){
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
}

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
// Selección de elementos del DOM
const calendar = document.querySelector(".calendar"),
    date = document.querySelector(".date"),
    todayBtn = document.querySelector(".today-btn"),
    daysContainer = document.querySelector(".days"),
    prev = document.querySelector(".prev"),
    next = document.querySelector(".next"),
    gotoBtn = document.querySelector(".goto-btn"),
    dateInput = document.querySelector(".date-input"),
    eventDay = document.querySelector(".event-day"),
    eventDate = document.querySelector(".event-date"),
    eventsContainer = document.querySelector(".events");

let today = new Date(),
    month = today.getMonth(),
    year = today.getFullYear(),
    activeDay;

const months = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
];

const eventsArr = [
    // Enero
    { day: 1, month: 1, year: 2024, events: [{ title: "Feriado Año Nuevo", time: "" }] },
    { day: 29, month: 1, year: 2024, events: [{ title: "Últimos días de inscripción para el examen de admisión", time: "" }] },
    { day: 30, month: 1, year: 2024, events: [{ title: "Últimos días de inscripción para el examen de admisión", time: "" }] },

    // Febrero
    { day: 1, month: 2, year: 2024, events: [{ title: "Inicio de clases", time: "" }] },
    { day: 26, month: 2, year: 2024, events: [{ title: "Inicio Matriculación Académica y Administrativa", time: "" },] },
    { day: 26, month: 2, year: 2024, events: [{ title: "Inicio de Recepción de Documentos para Beneficiarios Ley N° 6628/2020", time: "" }] },

    // Marzo
    { day: 1, month: 3, year: 2024, events: [{ title: "Feriado Nacional Día de los Héroes", time: "" }] },
    { day: 18, month: 3, year: 2024, events: [{ title: "Fecha límite para Entrega de Plan Semestral", time: "" }] },
    { day: 22, month: 3, year: 2024, events: [{ title: "Fin Matriculación Académica", time: "" },] },
    { day: 22, month: 3, year: 2024, events: [{ title: "Fin recepción de documentos para el registro de beneficiarios Ley N°6628/2020", time: "" }] },
    { day: 25, month: 3, year: 2024, events: [{ title: "Inicio 1era. Evaluación Parcial", time: "" }] },
    { day: 28, month: 3, year: 2024, events: [{ title: "Jueves Santo", time: "" }] },
    { day: 29, month: 3, year: 2024, events: [{ title: "Viernes Santo", time: "" }] },

    // Abril
    { day: 3, month: 4, year: 2024, events: [{ title: "Publicación Nómina de Beneficiarios Ley N° 6628/2020", time: "" }] },
    { day: 8, month: 4, year: 2024, events: [{ title: "Fin Periodo de Pago Ordinario Matriculación Administrativa", time: "" }] },
    { day: 9, month: 4, year: 2024, events: [{ title: "Inicio Periodo de Pago Extraordinario Matriculación Administrativa", time: "" }] },
    { day: 19, month: 4, year: 2024, events: [{ title: "Fin 1era. Evaluación Parcial", time: "" }] },
    { day: 30, month: 4, year: 2024, events: [{ title: "Asueto Institucional Día del Maestro", time: "" }] },

    // Mayo
    { day: 1, month: 5, year: 2024, events: [{ title: "Feriado Nacional - Día del trabajador", time: "" }] },
    { day: 2, month: 5, year: 2024, events: [{ title: "Inicio Periodo de 3era. Evaluación Final 2023-2", time: "" }] },
    { day: 4, month: 5, year: 2024, events: [{ title: "Asueto Universitario - Aniversario Fundacional UNCA", time: "" }] },
    { day: 14, month: 5, year: 2024, events: [{ title: "Día de la Madre", time: "" }] },
    { day: 14, month: 5, year: 2024, events: [{ title: "Feriado Nacional - Independencia Nacional", time: "" },] },
    { day: 20, month: 5, year: 2024, events: [{ title: "Inicio 2da. Evaluación Parcial", time: "" }] },

    // Junio
    { day: 10, month: 6, year: 2024, events: [{ title: "Traslado de Feriado Nacional - Paz del Chaco", time: "" }] },
    { day: 14, month: 6, year: 2024, events: [{ title: "Fin - Desarrollo de Clases 1er. Periodo 2024", time: "" },] },
    { day: 14, month: 6, year: 2024, events: [{ title: "Fin 2da. Evaluación Parcial", time: "" }] },
    { day: 17, month: 6, year: 2024, events: [{ title: "Socialización de planilla de procesos y entrega de planillas a secretaria académica.", time: "" }] },

    // Julio
    { day: 1, month: 7, year: 2024, events: [{ title: "Inicio 1era. Evaluación Final - Periodo 2024/1", time: "" }] },
    { day: 26, month: 7, year: 2024, events: [{ title: "Fin 1era. Evaluación Final Periodo 2024/2", time: "" }] },

    // Agosto
    { day: 1, month: 8, year: 2024, events: [{ title: "Inicio Periodo de Clases 2024/2", time: "" },] },
    { day: 1, month: 8, year: 2024, events: [{ title: "Inicio Matriculación Académica y Administrativa 2024/2", time: "" }] },
    { day: 5, month: 8, year: 2024, events: [{ title: "Inicio Periodo de 2da. Evaluación Final 2024/1", time: "" }] },
    { day: 15, month: 8, year: 2024, events: [{ title: "Feriado Nacional - Fundación de Asunción", time: "" }] },
    { day: 19, month: 8, year: 2024, events: [{ title: "Fecha límite para Entrega de Plan Semestral", time: "" }] },

    // Septiembre
    { day: 2, month: 9, year: 2024, events: [{ title: "Inicio 1era. Evaluación Parcial", time: "" }] },
    { day: 13, month: 9, year: 2024, events: [{ title: "Fin Matriculación Académica", time: "" },] },
    { day: 13, month: 9, year: 2024, events: [{ title: "Fin Periodo de Pago Ordinario Matriculación Administrativa", time: "" }] },

    { day: 16, month: 9, year: 2024, events: [{ title: "Inicio Periodo de Pago Extraordinario Matriculación Administrativa", time: "" }] },
    { day: 20, month: 9, year: 2024, events: [{ title: "Asueto Institucional Día de la Juventud", time: "" }] },
    { day: 23, month: 9, year: 2024, events: [{ title: "Fin Periodo de Pago Extraordinario Matriculación Administrativa", time: "" }] },
    { day: 27, month: 9, year: 2024, events: [{ title: "Fin 1era. Evaluación Parcial", time: "" }] },
    { day: 29, month: 9, year: 2024, events: [{ title: "Feriado Nacional - Batalla de Boquerón", time: "" }] },

    // Octubre
    { day: 1, month: 10, year: 2024, events: [{ title: "Inicio Periodo 3era. Evaluación Final 2024/1", time: "" }] },
    { day: 7, month: 10, year: 2024, events: [{ title: "Asueto Distrital - Fundación de Coronel Oviedo", time: "" }] },
    { day: 21, month: 10, year: 2024, events: [{ title: "Inicio 2da. Evaluación Parcial", time: "" }] },

    // Noviembre
    { day: 1, month: 11, year: 2024, events: [{ title: "Inicio Periodo de 1era. Evaluación Final 2024/2", time: "" }] },
    { day: 12, month: 11, year: 2024, events: [{ title: "Fin 2da. Evaluación Parcial", time: "" }] },
    { day: 12, month: 11, year: 2024, events: [{ title: "Fin Desarrollo de Clases", time: "" }] },

    { day: 13, month: 11, year: 2024, events: [{ title: "Inicio Actividades en conmemoración al aniversario Fundacional de la FCyT", time: "" }] },
    { day: 17, month: 11, year: 2024, events: [{ title: "Aniversario Fundación FCyT", time: "" }] },
    { day: 18, month: 11, year: 2024, events: [{ title: "Socialización de Planillas de Procesos y Entrega de Planillas a la Secretaria Académica", time: "" }] },
    { day: 27, month: 11, year: 2024, events: [{ title: "Inicio Periodo 1era. Evaluación Final 2024/2", time: "" }] },

    // Diciembre
    { day: 8, month: 12, year: 2024, events: [{ title: "Feriado Nacional - Festividad de Caacupé", time: "" }] },
    { day: 23, month: 12, year: 2024, events: [{ title: "Fin 1era. Evaluación Final Periodo 2024/2", time: "" }] },
    { day: 25, month: 12, year: 2024, events: [{ title: "Feriado Nacional - Navidad", time: "" }] },
];


// Inicializa el calendario
function initCalendar() {
    const firstDay = new Date(year, month, 1),
        lastDay = new Date(year, month + 1, 0),
        prevLastDay = new Date(year, month, 0),
        prevDays = prevLastDay.getDate(),
        lastDate = lastDay.getDate(),
        day = firstDay.getDay(),
        nextDays = 7 - lastDay.getDay() - 1;

    date.textContent = `${months[month]} ${year}`;
    let days = "";

    // Días del mes anterior
    for (let x = day; x > 0; x--) {
        days += `<div class="day prev-date">${prevDays - x + 1}</div>`;
    }

    // Días del mes actual
    for (let i = 1; i <= lastDate; i++) {
        const isToday = i === today.getDate() && month === today.getMonth() && year === today.getFullYear();
        const hasEvent = eventsArr.some(event => event.day === i && event.month === month + 1 && event.year === year);
        const dayClass = isToday ? "today active" : "";
        const eventClass = hasEvent ? "event" : "";

        if (isToday) {
            activeDay = i;
            getActiveDay(i);
            updateEvents(i);
        }

        days += `<div class="day ${dayClass} ${eventClass}">${i}</div>`;
    }

    // Días del próximo mes
    for (let j = 1; j <= nextDays; j++) {
        days += `<div class="day next-date">${j}</div>`;
    }

    daysContainer.innerHTML = days;
    addListeners();
}

// Cambia al mes anterior
function prevMonth() {
    month = (month === 0) ? 11 : month - 1;
    initCalendar();
}

// Cambia al mes siguiente
function nextMonth() {
    month = (month === 11) ? 0 : month + 1;
    initCalendar();
}

// Navega a una fecha específica
function gotoDate() {
    const [monthInput, yearInput] = dateInput.value.split("/").map(Number);
    if (monthInput > 0 && monthInput <= 12 && yearInput === today.getFullYear()) {
        month = monthInput - 1;
        year = yearInput;
        initCalendar();
    } else {
        alert("Fecha inválida");
    }
}

// Muestra la información del día seleccionado
function getActiveDay(date) {
    const day = new Date(year, month, date);
    eventDay.textContent = day.toLocaleString("es-ES", {weekday: "short"});
    eventDate.textContent = `${date} ${months[month]} ${year}`;
}

// Actualiza la lista de eventos para el día seleccionado
function updateEvents(date) {
    const events = eventsArr.filter(event =>
        event.day === date && event.month === month + 1 && event.year === year
    );

    eventsContainer.innerHTML = events.length ? events.map(event => `
        <div class="event">
            <div class="title"><i class="fas fa-circle"></i><h3 class="event-title">${event.events[0].title}</h3></div>
            <div class="event-time">${event.events[0].time || ""}</div>
        </div>`).join("") : `<div class="no-event"><h3>No hay eventos</h3></div>`;
}

// Agrega listeners para los días del calendario
function addListeners() {
    document.querySelectorAll(".day").forEach(day => {
        day.addEventListener("click", e => {
            const clickedDay = Number(e.target.textContent);
            if (e.target.classList.contains("prev-date")) prevMonth();
            else if (e.target.classList.contains("next-date")) nextMonth();
            else {
                activeDay = clickedDay;
                getActiveDay(clickedDay);
                updateEvents(clickedDay);
                document.querySelectorAll(".day").forEach(d => d.classList.remove("active"));
                e.target.classList.add("active");
            }
        });
    });
}

// Listeners para botones de navegación
prev.addEventListener("click", prevMonth);
next.addEventListener("click", nextMonth);
todayBtn.addEventListener("click", () => {
    today = new Date();
    month = today.getMonth();
    year = today.getFullYear();
    initCalendar();
});
gotoBtn.addEventListener("click", gotoDate);

// Inicializar el calendario al cargar la página
initCalendar();

// Manejo de la entrada del campo de fecha
dateInput.addEventListener("input", e => {
    let value = dateInput.value.replace(/[^0-9]/g, "");
    if (value.length > 2) {
        value = value.slice(0, 2) + "/" + value.slice(2);
    }
    if (value.length > 7) {
        value = value.slice(0, 7);
    }
    dateInput.value = value;
});

