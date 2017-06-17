import * as React from 'react'

import { Password } from './components/password'

class App extends React.Component<{}, null> {
  render() {
    return (
      <div className='App'>
        <Password passwordLength={6} />
      </div>
    )
  }
}

export default App
