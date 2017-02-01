/**
 * Created by Uncle Charlie, 2017/01/31
 */

import React from 'react'
import {render} from 'react-dom'

class App extends React.Component {
  render() {
    return (
      <p>Yo react!</p>
    )
  }
}

render(<App />, document.getElementById('app'))