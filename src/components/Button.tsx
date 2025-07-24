import { JSX } from 'solid-js'
import './Button.scss'

export default function Button(props: JSX.HTMLAttributes<HTMLButtonElement>) {
  return <button {...props} class="button" />
}
