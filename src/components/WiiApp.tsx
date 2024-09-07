import gsap from 'gsap'
import { createEffect, JSX } from 'solid-js'

// WiiApp -> WiiAppBridge -> WiiAppWrapper

interface WiiAppBridge {
  launch: (app: WiiApp) => void
  ready: () => void
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
  let fadeLayerRef!: HTMLDivElement
  createEffect(() => {
    document.title = props.app.name
    gsap.set(fadeLayerRef, { opacity: 1 })
  })
  return (
    <>
      <div ref={fadeLayerRef} class="fade-layer" />
      {props.app.component({
        launch: (app) => props.onAppChange(app),
        ready: () => {
          gsap.fromTo(
            fadeLayerRef,
            {
              opacity: 1,
            },
            {
              opacity: 0,
              duration: 1,
            },
          )
        },
      })}
    </>
  )
}
