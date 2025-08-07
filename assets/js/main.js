import './bootstrap.bundle.js';
import './language.js';
import './DOMlist.js';
import './content.js';
import './layout.js';
import './book.js';

import { rednerLanguage } from './language.js';
import { renderLayout } from './layout.js';

rednerLanguage.init();
renderLayout.init();