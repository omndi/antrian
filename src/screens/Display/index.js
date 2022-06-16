import {useEffect, useRef} from 'react'
import styled from '@emotion/styled'
import { Flex } from "@chakra-ui/react"

import CDVideo from './CDVideo'

function DisplayScreen({ calling, counter, openPortal }) {
  const videoRef = useRef(null)

  useEffect(() => {
    videoRef.current.muted = calling
  }, [calling])

  return (
    <Flex h="100vh">
      <Flex w="75%" h="100%">
        <StyledVideo
          style={{opacity: calling ? 0.3 : 1, width: '100%', height: '100%'}}
          ref={videoRef}
        />
      </Flex>
      <Flex
        alignItems="center"
        flexDirection="column"
        justifyContent="center"
        px={4}
        w="25%"
      >
        <Header>Nomor Antrian</Header>
        <Counter onClick={openPortal}>{counter}</Counter>
      </Flex>
    </Flex>
  )
}

const Counter = styled.span`
  font-size: 400px;
  line-height: 0.8;
  text-align: center;
`

const Header = styled.h1`
  font-size: 60px;
  letter-spacing: 5px;
  text-align: center;
`

const StyledVideo = styled(CDVideo)`
  transition: opacity, 1.25s ease-in-out;
`

export default DisplayScreen
