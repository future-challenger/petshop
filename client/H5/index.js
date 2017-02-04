/**
 * Created by Uncle Charlie, 2017/01/31
 */

import React from 'react'
import { render } from 'react-dom'

import TitleInput from './TitleInput'

class App extends React.Component {

  constructor(props) {
    super(props)

    this._handleSubmit = this._handleSubmit.bind(this)
  }

  componentDidMount() {
    // this.testAsync().then(val => console.log(val))
  }

  _handleSubmit() {
    console.log('=====>_handleSubmit', JSON.stringify({
      data: { username: 'test111', password: '123456' }
    }))

    let data = { data: { username: 'webuser', password: '123456' } }
    /**
     * for now the http request is just direct requested the dev server aka the localhsot.
     * this will refactored later.
     */
    let header = new Headers({
      'Access-Control-Allow-Origin': '*',
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    });

    fetch('http://127.0.0.1:3090/api/v1/users', {
      method: 'POST',
      // mode: 'cors', // use default
      // headers: new Headers({
      //   'Access-Control-Allow-Origin': '*',
      //   'Accept': 'application/json',
      //   'Content-Type': 'application/json',
      // }),
      headers: header,
      body: JSON.stringify(data || {}),
    }).then(v => {
      console.log('=====>fetched value', v.json())
    }).catch(err => {
      console.log('=====>fetch error', err)
    })
  }

  render() {
    return (
      <div>
        <p>Yo react!</p>
        <TitleInput title='user name' placeHolder='input username' />
        <TitleInput title='password' placeHolder='input password' type='password' />
        <input type='button' value='click to register' onClick={this._handleSubmit} />
      </div>
    )
  }
}

render(<App />, document.getElementById('app'))