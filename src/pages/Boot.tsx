import { onMount } from 'solid-js'
import { WiiApp } from '../components/WiiApp'
import gsap, { Power2 } from 'gsap'

export default {
  name: 'Boot',
  visible: false,
  component: (b) => {
    let bootRef!: HTMLDivElement
    let continueRef!: HTMLParagraphElement
    let continuable = false
    let tl: gsap.core.Timeline
    onMount(async () => {
      await import('./Boot.scss')
      b.ready()
      tl = gsap
        .timeline()
        .set(continueRef, {
          opacity: 0,
        })
        .to(
          continueRef,
          {
            opacity: 1,
            duration: 0.7,
            repeat: -1,
            yoyo: true,
            onStart: () => {
              continuable = true
            },
          },
          '1.5',
        )
    })

    return (
      <div
        ref={bootRef}
        class="boot"
        onMouseDown={() => {
          if (!continuable) return
          tl.clear()
          gsap.set(continueRef, {
            opacity: 0,
          })
          gsap.to(bootRef, {
            opacity: 0,
            ease: Power2.easeIn,
            onComplete: () => {
              setTimeout(() => import('./Menu').then((a) => b.launch(a.default)), 1000)
            },
          })
        }}
      >
        <h1>WARNING-HEALTH AND SAFETY</h1>
        <p>
          BEFORE PLAYING, READ YOUR OPERATIONS <br />
          MANUAL FOR IMPORTANT INFORMATION <br />
          ABOUT YOUR HEALTH AND SAFETY.
        </p>
        <p>This project is not associated with Nintendo.</p>
        <p ref={continueRef} class="highlight">
          Press to continue.
        </p>
      </div>
    )
  },
} as WiiApp
