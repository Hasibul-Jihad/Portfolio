/* -----------------------------------------
  Have focus outline only for keyboard users 
 ---------------------------------------- */
const handleFirstTab = (e) => {
  if(e.key === 'Tab') {
    document.body.classList.add('user-is-tabbing');
    window.removeEventListener('keydown', handleFirstTab);
    window.addEventListener('mousedown', handleMouseDownOnce);
  }
};

const handleMouseDownOnce = () => {
  document.body.classList.remove('user-is-tabbing');
  window.removeEventListener('mousedown', handleMouseDownOnce);
  window.addEventListener('keydown', handleFirstTab);
};

window.addEventListener('keydown', handleFirstTab);

/* -----------------------------------------
  Back to Top Button
 ---------------------------------------- */
const backToTopButton = document.querySelector(".back-to-top");
let isBackToTopRendered = false;

let alterStyles = (isBackToTopRendered) => {
  backToTopButton.style.visibility = isBackToTopRendered ? "visible" : "hidden";
  backToTopButton.style.opacity = isBackToTopRendered ? 1 : 0;
  backToTopButton.style.transform = isBackToTopRendered
    ? "scale(1)"
    : "scale(0)";
};

window.addEventListener("scroll", () => {
  if (window.scrollY > 700) {
    isBackToTopRendered = true;
    alterStyles(isBackToTopRendered);
  } else {
    isBackToTopRendered = false;
    alterStyles(isBackToTopRendered);
  }
});

/* -----------------------------------------
  Smooth Scroll for Navigation Links
 ---------------------------------------- */
const navLinks = document.querySelectorAll('.nav__link');

navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const targetId = link.getAttribute('href');
    const targetSection = document.querySelector(targetId);
    
    if (targetSection) {
      targetSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

/* -----------------------------------------
  Active Navigation Highlight on Scroll
 ---------------------------------------- */
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav__link');

const highlightNav = () => {
  let current = '';
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    
    if (window.scrollY >= (sectionTop - 200)) {
      current = section.getAttribute('id');
    }
  });
  
  navItems.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
};

window.addEventListener('scroll', highlightNav);

/* -----------------------------------------
  Fade-in Animation on Scroll
 ---------------------------------------- */
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fade-in');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe project boxes, skill categories, and achievement items
const animateElements = document.querySelectorAll(
  '.work__box, .skills__category, .achievement__item, .vision__content'
);

animateElements.forEach(el => {
  observer.observe(el);
});

/* -----------------------------------------
  Skills Category Hover Effect Enhancement
 ---------------------------------------- */
const skillCategories = document.querySelectorAll('.skills__category');

skillCategories.forEach(category => {
  category.addEventListener('mouseenter', function() {
    this.style.transform = 'translateY(-10px) scale(1.02)';
  });
  
  category.addEventListener('mouseleave', function() {
    this.style.transform = 'translateY(0) scale(1)';
  });
});

/* -----------------------------------------
  Dynamic Year in Footer
 ---------------------------------------- */
const updateFooterYear = () => {
  const footerText = document.querySelector('.footer p');
  if (footerText) {
    const currentYear = new Date().getFullYear();
    footerText.innerHTML = footerText.innerHTML.replace(/\d{4}/, currentYear);
  }
};

updateFooterYear();

/* -----------------------------------------
  Project Links External Indicator
 ---------------------------------------- */
const projectLinks = document.querySelectorAll('.work__links a[target="_blank"]');

projectLinks.forEach(link => {
  link.setAttribute('rel', 'noopener noreferrer');
});

/* -----------------------------------------
  Loading Animation
 ---------------------------------------- */
window.addEventListener('load', () => {
  document.body.classList.add('loaded');
  
  // Add staggered animation to header elements
  const headerElements = document.querySelectorAll('.header__text > *');
  headerElements.forEach((el, index) => {
    setTimeout(() => {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }, index * 200);
  });
});

/* -----------------------------------------
  Contact Button Interaction
 ---------------------------------------- */
const contactButtons = document.querySelectorAll('a[href="#contact"]');

contactButtons.forEach(button => {
  button.addEventListener('click', (e) => {
    e.preventDefault();
    const contactSection = document.querySelector('#contact');
    contactSection.scrollIntoView({ behavior: 'smooth' });
    
    // Add pulse effect to email button
    setTimeout(() => {
      const emailButton = document.querySelector('.contact .btn');
      if (emailButton) {
        emailButton.style.animation = 'pulse 0.5s ease-in-out';
        setTimeout(() => {
          emailButton.style.animation = '';
        }, 500);
      }
    }, 800);
  });
});

/* -----------------------------------------
  Typing Effect for Header Subtitle (Optional)
 ---------------------------------------- */
const typeWriter = (element, text, speed = 100) => {
  let i = 0;
  element.textContent = '';
  
  const type = () => {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  };
  
  type();
};

// Uncomment to activate typing effect
// const subtitle = document.querySelector('.header__subtitle');
// if (subtitle) {
//   const originalText = subtitle.textContent;
//   setTimeout(() => {
//     typeWriter(subtitle, originalText, 80);
//   }, 1000);
// }

/* -----------------------------------------
  Console Easter Egg
 ---------------------------------------- */
console.log(
  '%c👋 Hello there! ',
  'background: #0066cc; color: #00d4aa; font-size: 20px; padding: 10px; border-radius: 5px;'
);
console.log(
  '%cLooking for something? Feel free to reach out! 🚀',
  'color: #00d4aa; font-size: 14px;'
);
console.log(
  '%c📧 Email: jihad@example.com',
  'color: #e5e5e6da; font-size: 12px;'
);

/* -----------------------------------------
  Performance: Debounce Scroll Events
 ---------------------------------------- */
const debounce = (func, wait = 10) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// Apply debounce to scroll-intensive functions
window.addEventListener('scroll', debounce(highlightNav, 50));

/* -----------------------------------------
  Mobile Menu Toggle (if needed in future)
 ---------------------------------------- */
const createMobileMenu = () => {
  if (window.innerWidth < 600) {
    const nav = document.querySelector('.nav');
    // Mobile menu functionality can be added here if needed
  }
};

window.addEventListener('resize', debounce(createMobileMenu, 100));
createMobileMenu();
