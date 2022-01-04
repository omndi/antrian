import React from 'react'
import styled from '@emotion/styled'

function ViewPortCentered({ children }) {
  return <Layout>{ children }</Layout>
}

const Layout = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 100vh;
  justify-content: center;
  width: 100vw;
`

export default ViewPortCentered
