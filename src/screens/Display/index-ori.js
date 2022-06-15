import styled from '@emotion/styled'
import { Flex } from "@chakra-ui/react"

function DisplayScreen({ counter, openPortal }) {
  return (
    <Flex h="100vh">
      <Flex w="full" alignItems="center" justifyContent="center" flexDirection="column">
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

export default DisplayScreen
