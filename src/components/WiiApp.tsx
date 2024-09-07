import { createEffect, JSX } from 'solid-js'

// WiiApp -> WiiAppBridge -> WiiAppWrapper

interface WiiAppBridge {
  launch: (app: WiiApp) => void
}

export interface WiiApp {
  name: string
  visible?: boolean
  cover?: () => JSX.Element
  component: (bridge: WiiAppBridge) => JSX.Element
}

interface WiiAppWrapperProps {
  app: WiiApp
  onAppChange: (to: WiiApp) => void
}

export default function WiiAppWrapper(props: WiiAppWrapperProps) {
  createEffect(() => {
    document.title = props.app.name
  })
  return <>{props.app.component({ launch: (app) => props.onAppChange(app) })}</>
}
