/**
 * Created by Uncle Charlie, 2017/01/31
 */

import React from 'react'
import {render} from 'react-dom'

import TitleInput from './TitleInput'

class App extends React.Component {
  render() {
    return (
      <div>
        <p>Yo react!</p>
        <TitleInput title='user name' />
        <TitleInput title='password' />
      </div>
    )
  }
}

render(<App />, document.getElementById('app'))