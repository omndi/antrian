import { Global } from '@emotion/react'

import { DisplayContainer } from 'containers'

const global = `
  @font-face {
    font-family: 'Montserrat';
    src: url('/fonts/montserrat_regular.woff2') format('woff2'), url('/fonts/montserrat_regular.woff') format('woff');
    font-weight: 400;
    font-style: normal;
  }

  @font-face {
    font-family: 'Montserrat';
    src: url('/fonts/montserrat_medium.woff2') format('woff2'), url('/fonts/montserrat_medium.woff') format('woff');
    font-weight: 500;
    font-style: normal;
  }


  @font-face {
    font-family: 'Montserrat';
    src: url('/fonts/montserrat_bold.woff2') format('woff2'), url('/fonts/montserrat_bold.woff') format('woff');
    font-weight: 700;
    font-style: normal;
  }

  body {
    font-family: 'Montserrat', sans-serif;
    margin: 0;
  }
`;

function App() {
  return (
    <>
      <Global styles={global} />
      <DisplayContainer />
    </>
  )
}

export default App
