import { useEffect, useState } from 'react'
import { Button, HStack, Input, VStack } from '@chakra-ui/react'
import { ArrowLeftIcon, ArrowRightIcon } from '@chakra-ui/icons'

import { Layout } from 'features'

export default function ControllerScreen({ counter, ...props }) {
  const [number, setNumber] = useState(counter)
  useEffect(() => {
    setNumber(counter)
    props.call(counter)
  }, [counter])

  return (
    <Layout.ViewPortCentered>
      <VStack align="center" spacing={4}>
        <HStack>
          <Button
            colorScheme="teal"
            variant="outline"
            onClick={() => props.updateCounter(-1)}
            leftIcon={<ArrowLeftIcon />}
          >
            Previous
          </Button>
          <Input type="number" name="number" onChange={event => setNumber(parseInt(event.target.value))} value={number} />
          <Button
            colorScheme="teal"
            variant="outline"
            onClick={() => props.updateCounter()}
            rightIcon={<ArrowRightIcon />}
          >
            Next
          </Button>
        </HStack>
        <HStack>
          <Button color="warning" onClick={() => props.call(counter)}>Re-call</Button>
          <Button type="button" color="danger" onClick={() => props.setCounter(number)}>Set</Button>
        </HStack>
        <Button color="danger" onClick={props.closeWindowPortal}>Close Window</Button>
      </VStack>
    </Layout.ViewPortCentered>
  )
}
