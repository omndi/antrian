import { Portal } from 'features'
import { ControllerScreen } from 'screens'

export default function ControllerContainer(props) {
  return (
    <Portal closeWindowPortal={props.closeWindowPortal} >
      <ControllerScreen {...props} />
    </Portal>
  )
}
