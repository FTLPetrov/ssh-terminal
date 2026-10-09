import './themes/app/vscode-dark-modern.css'
import './styles/base.css'
import './styles/layout.css'
import { mountApp } from './app/app'

const root = document.getElementById('app')

if (!root) {
  throw new Error('The application root is missing.')
}

mountApp(root)
