import React, {useEffect, useRef, useState} from 'react'
import styled from '@emotion/styled'

import { DisplayScreen } from 'screens'
import ControllerContainer from './ControllerContainer'
import useVoice from 'features/useVoice'

export default function DisplayContainer() {
  const [counter, setCounter] = useState(1)
  const [windowPortal, toggleWindowPortal] = useState(false)
  const videoRef = useRef(null)

  const openWindowPortal = () => {
    toggleWindowPortal(true)
  }

  const closeWindowPortal = () => {
    toggleWindowPortal(false)
  }

  useEffect(() => {
    window.addEventListener('beforeunload', () => {
      closeWindowPortal()
    })
  
    return () => {
      window.removeEventListener('beforeunload', () => {
        closeWindowPortal()
      })
    }
  }, [])

  const [call, {calling}] = useVoice()

  const updateCounter = (value = 1) => {
    setCounter(prev => {
      const counter = prev + value
      const finalCounter = counter === 0 ? prev : counter
      call(finalCounter)
      return finalCounter
    })
  }

  return (
    <Base>
      <DisplayScreen
        calling={calling}
        counter={counter}
        openPortal={openWindowPortal}
        videoRef={videoRef}
      />
      <ControllerPortal
        closeWindowPortal={closeWindowPortal}
        counter={counter}
        call={call}
        setCounter={setCounter}
        updateCounter={updateCounter}
        videoRef={videoRef}
        windowPortal={windowPortal}
      />
    </Base>
  )
}

type ControllerPortalProps = {
  closeWindowPortal: () => void
  counter: number
  call: (counter:number) => void
  setCounter: React.Dispatch<React.SetStateAction<number>>
  updateCounter: () => void
  videoRef: React.MutableRefObject<null>
  windowPortal: boolean
}

function ControllerPortal(props: ControllerPortalProps) {
  if (!props.windowPortal) return null
  return (
    <ControllerContainer {...props} />
  )
}

const Base = styled.div`
  background-color: #000;
  color: #fff;
  height: 100%;
  width: 100%;
`
