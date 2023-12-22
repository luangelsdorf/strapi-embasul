// @ts-ignore
import icon from './extensions/Favicon.png';

const config = {
  locales: ['pt-BR'],
  tutorials: false,
  notifications: { releases: false },
  head: { favicon: icon },
};

const bootstrap = (app) => {
  if (document) {
    let styleEl = document.createElement('style');
    styleEl.innerText = 'textarea{resize:vertical!important;}';
    document.head.appendChild(styleEl);
  } else {
    console.log('NO DOCUMENT!');
  }
  console.log(app);
};

export default {
  config,
  bootstrap,
};
