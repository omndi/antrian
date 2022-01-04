import React from 'react'
// import Sound from 'react-sound'

class Voice extends React.PureComponent {
  state = {
    isNomorAntrianPlaying: Sound.status.STOPPED,
    charPlaying: {
      0: Sound.status.STOPPED,
    },
    nbSyllable: 0,
    strCounter: '',
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.counter !== nextProps.counter || this.props.reCall !== nextProps.reCall) {
      const counter     = nextProps.counter
      const strCounter  = counter.toString()
      const nbChar      = strCounter.length
      const nbSyllable  = counter > 20 && counter % 10 > 0 ? nbChar + 1 : nbChar

      this.setState({ isNomorAntrianPlaying: Sound.status.PLAYING, nbSyllable, strCounter })
    }
  }

  render() {
    const stopCharPlaying = (charPosition) => {
      // STOP current, PLAY next if any
      const playNext = charPosition + 1 >= this.state.nbSyllable ? {} : { [charPosition + 1]: Sound.status.PLAYING }
      const charPlaying = {
        ...this.state.charPlaying,
        ...playNext,
        [charPosition]: Sound.status.STOPPED,
      }
      this.setState({ charPlaying })
    }

    const playChar = () => {
      // STOP nomorantrian, PLAY nomor
      const charPlaying = {
        0: Sound.status.PLAYING
      }
      this.setState({ isNomorAntrianPlaying: Sound.status.STOPPED, charPlaying })
    }

    return (
      <Call
        {...this.state}
        {...this.props}
        playChar        = {playChar}
        stopCharPlaying = {stopCharPlaying}
      />
    )
  }
}

const Call = props => {
  const map = ['nol', 'satu', 'dua', 'tiga', 'empat', 'lima', 'enam', 'tujuh', 'delapan', 'sembilan']
  const { counter, nbSyllable, strCounter } = props

  return (
    <div>
      <CallNomorAntrian {...props} />
      {
        Array.from(Array(nbSyllable).keys()).map(charPosition => {
          let fileName = 'satu'
          if (counter === 10) {
            if (charPosition === 0) fileName = 'sep'
            else fileName = 'puluh'
          } else if (counter === 11) {
            if (charPosition === 0) fileName = 'seb'
            else fileName = 'belas'
          } else if (counter >= 12 && counter <= 19) {
            if (charPosition === 0) fileName = map[strCounter[charPosition + 1]]
            else fileName = 'belas'
          } else if (counter % 10 >= 1 && counter %10 <= 9) {
            // 21-29, 31-39
            if (charPosition === 0) fileName = map[strCounter[charPosition]]
            else if (charPosition === 1) fileName = 'puluh'
            else fileName = map[strCounter[charPosition -1 ]]
          } else if (counter > 10 & counter % 10 === 0) {
            // 20, 30
            if (charPosition === 0) fileName = map[strCounter[charPosition]]
            else fileName = 'puluh'
          } else {
            fileName = map[counter]
          }

          return (
            <CallNomor
              key           = {charPosition}
              charPosition  = {charPosition}
              fileName      = {fileName}
              {...props}
            />
          )
        })
      }
    </div>
  )
}

const CallNomorAntrian = ({ isNomorAntrianPlaying, playChar }) => (
  <Sound
    url               = "Voice/nomorantrian.wav"
    playStatus        = {isNomorAntrianPlaying}
    playFromPosition  = {0}
    onFinishedPlaying = {playChar}
  />
)

const CallNomor = ({ fileName = 'satu', charPlaying, charPosition, stopCharPlaying }) => {
  return null
  // return (
  //   <Sound
  //     url               = {`Voice/${fileName}.wav`}
  //     playStatus        = {charPlaying[charPosition]}
  //     playFromPosition  = {0}
  //     onFinishedPlaying = {() => stopCharPlaying(charPosition)}
  //   />
  // )
}

export default Voice
