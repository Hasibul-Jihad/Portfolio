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
    this.style.transform = 'translateY(-5px)';
  });
  
  category.addEventListener('mouseleave', function() {
    this.style.transform = 'translateY(0)';
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
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease-out';
    
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
  Enhanced Project Card Interactions
 ---------------------------------------- */
const projectBoxes = document.querySelectorAll('.work__box');

projectBoxes.forEach(box => {
  // Add subtle tilt effect on mouse move
  box.addEventListener('mousemove', (e) => {
    const rect = box.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 30;
    const rotateY = (centerX - x) / 30;
    
    box.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
  });
  
  box.addEventListener('mouseleave', () => {
    box.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
  });
});

/* -----------------------------------------
  Skill Items Counter Animation
 ---------------------------------------- */
const skillItems = document.querySelectorAll('.skills__list li');

skillItems.forEach((item, index) => {
  item.style.opacity = '0';
  item.style.transform = 'translateX(-20px)';
  item.style.transition = `all 0.4s ease-out ${index * 0.05}s`;
});

const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const items = entry.target.querySelectorAll('.skills__list li');
      items.forEach(item => {
        item.style.opacity = '1';
        item.style.transform = 'translateX(0)';
      });
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

skillCategories.forEach(category => {
  skillObserver.observe(category);
});

/* -----------------------------------------
  Achievement Items Animation
 ---------------------------------------- */
const achievementItems = document.querySelectorAll('.achievement__item');

achievementItems.forEach((item, index) => {
  item.style.opacity = '0';
  item.style.transform = 'translateX(-30px)';
  item.style.transition = `all 0.5s ease-out ${index * 0.15}s`;
});

const achievementObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateX(0)';
      achievementObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

achievementItems.forEach(item => {
  achievementObserver.observe(item);
});

/* -----------------------------------------
  Parallax Effect for Header
 ---------------------------------------- */
const header = document.querySelector('.header');

if (header) {
  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const headerText = document.querySelector('.header__text');
    
    if (headerText && scrolled < window.innerHeight) {
      headerText.style.transform = `translateY(calc(-50% + ${scrolled * 0.5}px))`;
      headerText.style.opacity = 1 - (scrolled / 700);
    }
  });
}

/* -----------------------------------------
  CV Button Hover Effect
 ---------------------------------------- */
const cvButton = document.querySelector('.about .btn');

if (cvButton) {
  cvButton.addEventListener('mouseenter', function() {
    this.innerHTML = '📄 Download CV';
  });
  
  cvButton.addEventListener('mouseleave', function() {
    this.innerHTML = 'Download CV';
  });
}

/* -----------------------------------------
  Social Links Animation
 ---------------------------------------- */
const socialLinks = document.querySelectorAll('.footer__social-link-item');

socialLinks.forEach((link, index) => {
  link.style.animation = `fadeInUp 0.6s ease-out ${index * 0.1}s forwards`;
  link.style.opacity = '0';
});

/* -----------------------------------------
  Email Copy Functionality
 ---------------------------------------- */
const emailButton = document.querySelector('.contact .btn');

if (emailButton) {
  emailButton.addEventListener('click', (e) => {
    // Allow default mailto: behavior
    const email = 'hasibulnowhere2848@gmail.com';
    
    // Show tooltip
    const tooltip = document.createElement('span');
    tooltip.textContent = 'Opening email client...';
    tooltip.style.cssText = `
      position: absolute;
      top: -40px;
      left: 50%;
      transform: translateX(-50%);
      background: var(--accent-teal);
      color: var(--black);
      padding: 8px 16px;
      border-radius: 4px;
      font-size: 1.4rem;
      white-space: nowrap;
      pointer-events: none;
      animation: fadeInUp 0.3s ease-out;
    `;
    
    emailButton.style.position = 'relative';
    emailButton.appendChild(tooltip);
    
    setTimeout(() => {
      tooltip.remove();
    }, 2000);
  });
}

/* -----------------------------------------
  Typing Effect for Header Subtitle
 ---------------------------------------- */
const typeWriter = (element, text, speed = 100) => {
  let i = 0;
  const originalText = text;
  element.textContent = '';
  element.style.borderRight = '2px solid var(--accent-teal)';
  
  const type = () => {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(type, speed);
    } else {
      // Remove cursor after typing
      setTimeout(() => {
        element.style.borderRight = 'none';
      }, 500);
    }
  };
  
  type();
};

// Activate typing effect for subtitle
window.addEventListener('load', () => {
  const subtitle = document.querySelector('.header__subtitle');
  if (subtitle) {
    const originalText = subtitle.textContent;
    setTimeout(() => {
      typeWriter(subtitle, originalText, 80);
    }, 1500);
  }
});

/* -----------------------------------------
  Navigation Bar Scroll Effect
 ---------------------------------------- */
const nav = document.querySelector('.nav');
const navItems = document.querySelector('.nav__items');

window.addEventListener('scroll', () => {
  if (window.scrollY > 100) {
    if (navItems) {
      navItems.style.background = 'rgba(0, 26, 51, 0.95)';
      navItems.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.4)';
    }
  } else {
    if (navItems) {
      navItems.style.background = 'rgba(0, 26, 51, 0.7)';
      navItems.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
    }
  }
});

/* -----------------------------------------
  Console Easter Egg
 ---------------------------------------- */
console.log(
  '%c👋 Hello there, curious developer! ',
  'background: #0066cc; color: #00d4aa; font-size: 20px; padding: 10px; border-radius: 5px; font-weight: bold;'
);
console.log(
  '%c🚀 Welcome to my portfolio! Looking under the hood?',
  'color: #00d4aa; font-size: 16px; font-weight: bold;'
);
console.log(
  '%c📧 Let\'s connect: hasibulnowhere2848@gmail.com',
  'color: #e5e5e6da; font-size: 14px;'
);
console.log(
  '%c💼 GitHub: github.com/Hasibul-Jihad',
  'color: #e5e5e6da; font-size: 14px;'
);
console.log(
  '%c⚡ Built with passion for Electronics & Telecommunication Engineering',
  'color: #0066cc; font-size: 12px; font-style: italic;'
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
const debouncedHighlightNav = debounce(highlightNav, 50);
window.removeEventListener('scroll', highlightNav);
window.addEventListener('scroll', debouncedHighlightNav);

/* -----------------------------------------
  Lazy Load Images
 ---------------------------------------- */
const images = document.querySelectorAll('img[data-src]');

const imageObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src;
      img.removeAttribute('data-src');
      imageObserver.unobserve(img);
    }
  });
});

images.forEach(img => imageObserver.observe(img));

/* -----------------------------------------
  Add Pulse Animation to CSS
 ---------------------------------------- */
const style = document.createElement('style');
style.textContent = `
  @keyframes pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.05); }
  }
  
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  .nav__link.active {
    color: var(--accent-teal);
  }
  
  .nav__link.active::after {
    right: 0;
  }
`;
document.head.appendChild(style);

/* -----------------------------------------
  Mobile Menu Toggle
 ---------------------------------------- */
const createMobileMenu = () => {
  if (window.innerWidth < 600) {
    const nav = document.querySelector('.nav');
    // Mobile menu functionality - keep nav functional on small screens
    if (nav) {
      nav.style.position = 'sticky';
      nav.style.top = '0';
      nav.style.zIndex = '100';
    }
  }
};

window.addEventListener('resize', debounce(createMobileMenu, 100));
createMobileMenu();

/* -----------------------------------------
  Accessibility: Skip to Content
 ---------------------------------------- */
const createSkipLink = () => {
  const skipLink = document.createElement('a');
  skipLink.href = '#vision';
  skipLink.textContent = 'Skip to content';
  skipLink.className = 'skip-link';
  skipLink.style.cssText = `
    position: absolute;
    top: -40px;
    left: 0;
    background: var(--accent-teal);
    color: var(--black);
    padding: 8px;
    text-decoration: none;
    z-index: 1000;
  `;
  
  skipLink.addEventListener('focus', () => {
    skipLink.style.top = '0';
  });
  
  skipLink.addEventListener('blur', () => {
    skipLink.style.top = '-40px';
  });
  
  document.body.insertBefore(skipLink, document.body.firstChild);
};

createSkipLink();

/* -----------------------------------------
  Performance Monitor (Development Only)
 ---------------------------------------- */
if (window.performance && console.table) {
  window.addEventListener('load', () => {
    setTimeout(() => {
      const perfData = window.performance.timing;
      const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
      const connectTime = perfData.responseEnd - perfData.requestStart;
      const renderTime = perfData.domComplete - perfData.domLoading;
      
      console.log(
        '%c⚡ Performance Metrics',
        'background: #0066cc; color: white; font-size: 14px; padding: 5px 10px; border-radius: 3px;'
      );
      console.table({
        'Page Load Time': `${pageLoadTime}ms`,
        'Server Response': `${connectTime}ms`,
        'Render Time': `${renderTime}ms`
      });
    }, 0);
  });
}
