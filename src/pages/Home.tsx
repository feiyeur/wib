import Cursor from '../components/Cursor'
import { WiiApp } from '../libs/WiiApp'
import { onCleanup, onMount } from 'solid-js'

export default {
  name: 'Home Menu',
  component: (b) => {
    onMount(async () => {
      await import('./Home.scss')
      b.ready()
      console.log('menu: hi')
    })
    onCleanup(() => console.log('menu: bye'))
    return (
      <>
        <Cursor />
        <div class="menu">
          <div class="channels">
            <div class="channel-page">
              <div class="channel">
                <h1
                  style={{
                    'font-size': '.8rem',
                    color: '#000',
                  }}
                >
                  yipee
                </h1>
              </div>
            </div>
          </div>
          <div class="navs">
            <div class="nav">
              <button
                onClick={() => {
                  import('./Test').then((a) => b.launch(a.default))
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
