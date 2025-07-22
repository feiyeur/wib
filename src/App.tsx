import { createSignal } from 'solid-js'
import WiiAppWrapper from './libs/WiiApp'
import Boot from './pages/Boot'

function App() {
  const [currentApp, setCurrentApp] = createSignal(Boot)
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
