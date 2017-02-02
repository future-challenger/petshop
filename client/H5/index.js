/**
 * Created by Uncle Charlie, 2017/01/31
 */

import React from 'react'
import {render} from 'react-dom'

import TitleInput from './TitleInput'

class App extends React.Component {

  constructor(props) {
    super(props)

    this._handleSubmit = this._handleSubmit.bind(this)
  }

  componentDidMount() {
    this.testAsync().then(val => console.log(val))
  }

  _handleSubmit() {
    /**
     * for now the http request is just direct requested the dev server aka the localhsot.
     * this will refactored later.
     */
    fetch('localhost:3090/api/v1/users', {
      method: 'POST',
      body: {}
    })
  }

  render() {
    return (
      <div>
        <p>Yo react!</p>
        <TitleInput title='user name' />
        <TitleInput title='password' />
        <input type='button' onClick={this._handleSubmit} />
      </div>
    )
  }
}

render(<App />, document.getElementById('app'))