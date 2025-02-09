import ReactDOM from 'react-dom/client'
import Popup from './components/Popup'
import { selectorProps } from '../../global'
import { AutoFillingWebsites } from './config'
import { RecoilRoot } from 'recoil'
let linkElement = document.createElement('link')
linkElement.rel = 'stylesheet'
linkElement.type = 'text/css'
linkElement.href = chrome.runtime.getURL('/src/styles/output.css')

let rootElement = document.createElement('div')
rootElement.id = 'auto-filling-modal'
document.body.prepend(rootElement)
const shadowDOM = rootElement.attachShadow({ mode: 'open' })

AutoFillingWebsites.map((selector: selectorProps) => {
  if (selector.regex.test(window.location.href)) {
    shadowDOM.append(linkElement)
    ReactDOM.createRoot(shadowDOM).render(
      <RecoilRoot>
        <Popup />
      </RecoilRoot>,
    )
  }
})
