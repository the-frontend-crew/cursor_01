const allLink = document.querySelectorAll('a, input, .ginput_container_radio label, textarea')
const cursor = document.querySelector('.cursor')
let mouse =  { x: 0.5, y: 1 } 
let cursorPosition =  {x: 0, y: 0}
let isHover =  false
let allowMove = true

const hover = () => {
  allLink.forEach(element => {
    element.addEventListener('mouseenter', (e) => {
      if(allowMove === true) {
        const left = `calc(-50% + ${element.offsetLeft + element.offsetWidth / 2}px)`;
        const top = `calc(-50% + ${element.offsetTop + element.offsetHeight / 2}px)`;
          allowMove = false
          cursor.style.transition = 'all ease 0.5s'
          cursor.style.transform = `translate3d(${left}, ${top}, 0)`;
          cursor.classList.add('hover')
        }
      })
      element.addEventListener('mouseleave', (e) => {
        if(allowMove === false) {
          allowMove = true
          cursor.classList.remove('hover');
          cursor.style.transition = ''
        }
      })
  });
}

const mouseEvent = () => {
  window.addEventListener('mousemove', (event) => {
    if (allowMove === true) {
      mouse.x = event.clientX;
      mouse.y = event.clientY;
    }
  });
}

const followMouse = () => {
  if(allowMove) {
    const distX = mouse.x - cursorPosition.x - (cursor.offsetHeight / 2);
    const distY = mouse.y - cursorPosition.y -(cursor.offsetWidth / 2);

    cursorPosition.x += distX/5;
    cursorPosition.y += distY/2;

    cursor.style.transform = `translate3d(${cursorPosition.x}px, ${cursorPosition.y}px, 0)`;
  }
}

const init = () => {
  setInterval(followMouse, 30);
  mouseEvent()
  hover()
}

window.onload = init()