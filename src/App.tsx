import { createSignal } from 'solid-js'
import WiiAppWrapper from './components/WiiApp'
import Menu from './pages/Menu'

function App() {
  const [currentApp, setCurrentApp] = createSignal(Menu)
  return (
    <WiiAppWrapper
      app={currentApp()}
      onAppChange={(app) => {
        setCurrentApp(app)
      }}
    />
  )
}

export default App
