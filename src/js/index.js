'use strict';

const createListTrailers = (parrent, list) => {

  const ul = document.createElement('ul');
  ul.classList.add('trailers__list');

  const trailerWrappers = [];
  const trailerFrames = [];

  list.forEach(src => {
    const li = document.createElement('li');
    li.classList.add('trailers__item');

    const div = document.createElement('div');
    div.classList.add('trailers__wrapper');
    trailerWrappers.push(div);

    const iframe = document.createElement('iframe');
    iframe.classList.add('trailers__video');
    iframe.dataset.src = src;
    trailerFrames.push(iframe);

    div.append(iframe);
    li.append(div);
    ul.append(li);

    const idVideo = src.match(/\/embed\/([^/\?]+)/)[1];
    console.dir(iframe);
    iframe.srcdoc = `
      <style>
        * {
          padding: 0;
          margin: 0;
          overflow: hidden;
        }

        html, body {
          width: 100%;
          height: 100%;
        }

        img, svg {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }

        #button {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate( -50%, -50%);
          z-index: 5;
          width: 64px;
          height: 64px;
          border: none;
          background-color: transparent;
          cursor: pointer;
        }

        @media (width <= 900) {
          button {
            width: 36px;
            height: 36px;

          }
        }
      </style>
      <a href="https://www.youtube.com/embed/${idVideo}?autoplay=1">
        <img src="https://img.youtube.com/vi/${idVideo}/maxresdefault.jpg">
        <div id="button">
          <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="32" cy="32" r="32" fill="#FF3D00"/>
            <path d="M42.5 31.134C43.1667 31.5189 43.1667 32.4811 42.5 32.866L27.5 41.5263C26.8333 41.9112 26 41.4301 26 40.6603V23.3397C26 22.5699 26.8333 22.0888 27.5 22.4737L42.5 31.134Z" fill="white"/>
          </svg>
        </div>      
      </a>
    `;
  });

  parrent.append(ul);
  return { trailerWrappers, trailerFrames };
}

const controlTrailer = (trailerWrappers, trailerFrames, i = 0, j = 0) => {
  if (i !== j) {
    trailerWrappers[i].style.display = 'none';
    trailerFrames[i].src = '';
  } else {
    trailerWrappers[i].style.display = 'block';
    trailerFrames[i].src = trailerFrames[i].dataset.src;
  }
};

const init = () => {
  const trailersContainer = document.querySelector('.trailers__container');
  const trailersButtons = document.querySelectorAll('.trailers__button');

  const srcList = [];

  trailersButtons.forEach(btn => {
    srcList.push(btn.dataset.src);
  });

  const { trailerWrappers, trailerFrames } = createListTrailers(trailersContainer, srcList);

  trailersButtons.forEach((trailerBtn, j) => {
    trailerBtn.addEventListener('click', (event) => {
      trailersButtons.forEach((tBtn, i) => {
        if (trailerBtn === tBtn) {
          tBtn.classList.add('trailers__button_active');
        } else {
          tBtn.classList.remove('trailers__button_active');
        }

        controlTrailer(trailerWrappers, trailerFrames, i, j);
      })
    });
  });

  controlTrailer(trailerWrappers, trailerFrames);
};

init();

