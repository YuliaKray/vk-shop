import './App.css'
import { Card } from './components/Card';

function App(): JSX.Element {

  return (
    <>
      <header>
        <h1 className='title'>Корзина</h1>
      </header>
      <main className='main'>
        <Card/>
      </main>
    </>
  )
}

export default App
