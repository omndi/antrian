import React, {useEffect, useState} from 'react'
import styled from '@emotion/styled'

import { DisplayScreen } from 'screens'
import ControllerContainer from './ControllerContainer'
import useVoice from 'features/useVoice'

export default function DisplayContainer() {
  const [counter, setCounter] = useState(1)
  // const [second, setSecond] = useState(0)
  const [windowPortal, toggleWindowPortal] = useState(false)

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

    // window.setInterval(() => {
    //   setSecond(prev => prev + 1)
    // }, 1000);
  
    return () => {
      window.removeEventListener('beforeunload', () => {
        closeWindowPortal()
      })
    }
  }, [])

  const play = useVoice()

  const updateCounter = (value = 1) => {
    setCounter(prev => {
      const counter = prev + value
      const finalCounter = counter === 0 ? prev : counter
      play(finalCounter)
      return finalCounter
    })
  }

  return (
    <Base>
      <DisplayScreen
        counter={counter}
        openPortal={openWindowPortal}
      />
      <ControllerPortal
        closeWindowPortal={closeWindowPortal}
        counter={counter}
        play={play}
        setCounter={setCounter}
        updateCounter={updateCounter}
        windowPortal={windowPortal}
      />
    </Base>
  )
}

type ControllerPortalProps = {
  closeWindowPortal: () => void
  counter: number
  play: (counter:number) => void
  setCounter: React.Dispatch<React.SetStateAction<number>>
  updateCounter: () => void
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
