import {useCallback, useEffect, useRef} from 'react'
import styled from '@emotion/styled'
import { Flex } from "@chakra-ui/react"

import Video from './Video'

function DisplayScreen({ calling, counter, openPortal }) {
  const videoRef = useRef(null)

  useEffect(() => {
    videoRef.current.muted = calling
  }, [calling])

  const onCounterClick = useCallback(() => {
    if (videoRef.current.paused) videoRef.current.play()
    openPortal()
  }, [openPortal, videoRef])

  return (
    <Flex h="100vh">
      <Flex w="70%" h="100%">
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
        paddingRight={32}
        w="30%"
      >
        <Header>Nomor Antrian</Header>
        <Counter onClick={onCounterClick}>{counter}</Counter>
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

const StyledVideo = styled(Video)`
  transition: opacity, 1.25s ease-in-out;
`

export default DisplayScreen
