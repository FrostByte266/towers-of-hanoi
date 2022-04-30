import { createStack } from './tower.js'

import "../styles/style.css" // Styles linked by webpack via imports

createStack(3, document.querySelector('div[data-towerNumber="0"]'))
