import {useEffect, useRef, useState} from 'react'
import styled from '@emotion/styled'
import { Flex } from "@chakra-ui/react"

import Video from './Video'

function DisplayScreen({ counter, openPortal }) {
  const [mute, setMute] = useState(false)
  const [videoIdx, setVideoIdx] = useState(1)
  const videoRef = useRef(null)

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.addEventListener('ended', (event) => {
        setVideoIdx(v => v < 2 ? v+1 : 1)
      });
    }
  }, [videoRef])

  useEffect(() => {
    if (videoRef.current) {
      setMute(true)
      setTimeout(() => {
        setMute(false)
      }, 3000);
    }
  }, [counter])

  useEffect(() => {
    videoRef.current.muted = mute
  }, [mute])

  return (
    <Flex h="100vh">
      <StyledVideo file={'video'+videoIdx} style={{opacity: mute ? 0.4 : 1}} flex="4" ref={videoRef} />
      <Flex w="500px" alignItems="center" justifyContent="center" flexDirection="column">
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

const StyledVideo = styled(Video)`
  transition: opacity, .75s ease-in-out;
`

export default DisplayScreen
