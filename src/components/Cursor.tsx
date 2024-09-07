import './Cursor.scss'
import { createSignal, onCleanup, onMount } from 'solid-js'

export default function Cursor() {
  const [pos, setPos] = createSignal([0, 0])
  const onMove = (ev: MouseEvent) => {
    setPos([ev.x, ev.y])
  }
  onMount(() => {
    document.addEventListener('mousemove', onMove)
  })
  onCleanup(() => {
    document.removeEventListener('mousemove', onMove)
  })
  return (
    <img
      class="cursor"
      src="/textures/cursor.png"
      alt="wii cursor"
      style={{ transform: `translate(${pos()[0]}px,${pos()[1]}px)` }}
    />
  )
}
