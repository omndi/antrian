import React from 'react'
import ReactDOM from 'react-dom'

class Portal extends React.PureComponent {
  constructor(props) {
    super(props)
    this.containerEl = document.createElement('div')
    this.externalWindow = null
  }

  componentDidMount() {
    this.externalWindow = window.open()
    copyStyles(document, this.externalWindow.document)
    this.externalWindow.document.body.appendChild(this.containerEl)
    
    this.externalWindow.document.title = 'A React portal window'
    
    this.externalWindow.addEventListener('beforeunload', () => {
      this.props.closeWindowPortal()
    })
  }

  componentWillUnmount() {
    this.externalWindow.close()
  }

  render() {
    return ReactDOM.createPortal(this.props.children, this.containerEl)
  }
}

const copyStyles = (sourceDoc, targetDoc) => {
  Array.from(sourceDoc.styleSheets).forEach(styleSheet => {
    if (styleSheet.cssRules) { // for <style> elements
      const newStyleEl = sourceDoc.createElement('style');

      Array.from(styleSheet.cssRules).forEach(cssRule => {
        // write the text of each rule into the body of the style element
        newStyleEl.appendChild(sourceDoc.createTextNode(cssRule.cssText));
      });

      targetDoc.head.appendChild(newStyleEl);
    } else if (styleSheet.href) { // for <link> elements loading CSS from a URL
      const newLinkEl = sourceDoc.createElement('link');

      newLinkEl.rel = 'stylesheet';
      newLinkEl.href = styleSheet.href;
      targetDoc.head.appendChild(newLinkEl);
    }
  });
}

export default Portal
