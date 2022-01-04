import { useCallback, useEffect, useMemo } from 'react'
import {Howl, Howler} from 'howler';

export default function useVoice(counter: number) {
  const files = useMemo(() => {
    return getFiles(counter)
  }, [counter])

  const play = useCallback(() => {
    Howler.stop()
    const locateFiles = ['nomorantrian', ...files].map(voiceDir)
    queueSound(locateFiles, 0)
  }, [files])

  useEffect(() => {
    play()
  }, [counter, play])

  return play
}

const voiceDir = (f:string) => process.env.PUBLIC_URL + `/voice/${f}.wav`
const dict = ['nol', 'satu', 'dua', 'tiga', 'empat', 'lima', 'enam', 'tujuh', 'delapan', 'sembilan']
const getFiles = (counter: number) => {
  const counterStr = counter.toString()
  const nbChar = counterStr.length
  const nbSyllable = counter > 20 && counter % 10 > 0 ? nbChar + 1 : nbChar
  return Array.from(Array(nbSyllable).keys()).map(charPosition => {
    let fileName = 'satu'
    if (counter === 10) {
      if (charPosition === 0) fileName = 'sep'
      else fileName = 'puluh'
    } else if (counter === 11) {
      if (charPosition === 0) fileName = 'seb'
      else fileName = 'belas'
    } else if (counter >= 12 && counter <= 19) {
      if (charPosition === 0) fileName = dict[parseInt(counterStr[charPosition + 1])]
      else fileName = 'belas'
    } else if (counter % 10 >= 1 && counter %10 <= 9) {
      // 21-29, 31-39
      if (charPosition === 0) fileName = dict[parseInt(counterStr[charPosition])]
      else if (charPosition === 1) fileName = 'puluh'
      else fileName = dict[parseInt(counterStr[charPosition -1 ])]
    } else if (counter > 10 && counter % 10 === 0) {
      // 20, 30
      if (charPosition === 0) fileName = dict[parseInt(counterStr[charPosition])]
      else fileName = 'puluh'
    } else {
      fileName = dict[counter]
    }
    return fileName
  })
}

const queueSound = (files:string[], index:number) => {
  new Howl({
    autoplay: true,
    src: [files[index]],
    onend: () => {
      if (index < files.length) {
        queueSound(files, index+1)
      }    
    }
  })
  // sound.play()
}
