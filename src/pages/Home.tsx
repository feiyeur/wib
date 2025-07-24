import gsap, { Power3 } from 'gsap'
import Cursor from '../components/Cursor'
import { WiiApp } from '../libs/WiiApp'
import { createEffect, createSignal, For, JSX, onCleanup, onMount } from 'solid-js'
import Button from '../components/Button'

interface WiiChannel {
  app: WiiApp
  channelItemRef: HTMLDivElement
}

interface ChannelFullscreenLayerProps {
  channel: null | WiiChannel
  menuRef: null | HTMLElement
  onCloseRequest?: () => void
}
function ChannelFullscreenLayer(props: ChannelFullscreenLayerProps) {
  let ref!: HTMLDivElement
  let prevChannelPos = [0, 0]
  const scale = 5
  let tl: null | gsap.core.Timeline = null

  createEffect(() => {
    if (tl) tl.clear()

    if (!props.channel) {
      tl = gsap
        .timeline({ defaults: { ease: Power3.easeOut, duration: 0.6 } })
        .to(
          props.menuRef,
          {
            scale: 1,
            translateX: 0,
            translateY: 0,
          },
          '<',
        )
        .to(
          ref.children,
          {
            translateX: prevChannelPos[0],
            translateY: prevChannelPos[1],
            scale: 1 / scale,
          },
          '<',
        )
        .to(ref, { opacity: 0, duration: 0.2, ease: 'none' }, '<')
      return
    }

    const centerX = ref.clientWidth / 2
    const centerY = ref.clientHeight / 2
    const chan = props.channel.channelItemRef
    const chanCenterX = chan.offsetLeft + chan.clientWidth / 2
    const chanCenterY = chan.offsetTop + chan.clientHeight / 2
    prevChannelPos = [chanCenterX - centerX, chanCenterY - centerY]

    tl = gsap
      .timeline({ defaults: { ease: Power3.easeIn, duration: 0.6 } })
      .set(ref.children, {
        translateX: prevChannelPos[0],
        translateY: prevChannelPos[1],
        scale: 1 / scale,
      })
      .set(ref, { opacity: 0 })
      .to(
        props.menuRef,
        {
          scale: scale,
          translateX: (centerX - chanCenterX) * scale,
          translateY: (centerY - chanCenterY) * scale,
        },
        '<',
      )
      .to(
        ref,
        {
          opacity: 1,
          duration: 0.3,
        },
        '<',
      )
      .to(
        ref.children,
        {
          translateX: 0,
          translateY: 0,
          scale: 1,
        },
        '<',
      )
  })
  return (
    <div
      class="channel-full-layer"
      ref={ref}
      style={{ 'pointer-events': props.channel ? 'all' : 'none' }}
    >
      <div class="channel-full">
        <div class="buttons">
          <Button onMouseDown={() => props.onCloseRequest && props.onCloseRequest()}>
            Wii Menu
          </Button>
          <Button onMouseDown={() => props.onCloseRequest && props.onCloseRequest()}>Start</Button>
        </div>
      </div>
    </div>
  )
}

function Channel(props: JSX.HTMLAttributes<HTMLDivElement>) {
  return <div {...props} class="channel" />
}

const apps: WiiApp[] = [(await import('./Test')).default, (await import('./Boot')).default]

export default {
  name: 'Home Menu',
  component: (bridge) => {
    let menuRef!: HTMLDivElement
    const [fullChannel, setFullChannel] = createSignal<null | WiiChannel>(null)
    const [fullMenuRef, setFullMenuRef] = createSignal<null | HTMLElement>(null) // or you'll get undefined

    onMount(async () => {
      await import('./Home.scss')
      setFullMenuRef(menuRef)
      bridge.ready()
      console.log('menu: hi')
    })
    onCleanup(() => console.log('menu: bye'))

    return (
      <>
        <Cursor />
        <ChannelFullscreenLayer
          channel={fullChannel()}
          menuRef={fullMenuRef()}
          onCloseRequest={() => setFullChannel(null)}
        />
        <div class="menu" ref={menuRef}>
          <div class="channels">
            <div class="channel-page">
              <div>
                <For each={apps}>
                  {(item) => {
                    let chanRef!: HTMLDivElement
                    return (
                      <Channel
                        ref={chanRef}
                        onMouseDown={() => {
                          setFullChannel({ app: item, channelItemRef: chanRef })
                        }}
                      >
                        <h1 style={{ 'font-size': '.8rem', color: '#000' }}>{item.name}</h1>
                      </Channel>
                    )
                  }}
                </For>
              </div>
            </div>
          </div>
          <div class="navs">
            <div class="nav">
              <button
                onClick={() => {
                  import('./Test').then((a) => bridge.launch(a.default))
                }}
              ></button>
            </div>
            <div class="nav"></div>
          </div>
        </div>
      </>
    )
  },
} as WiiApp
