/**
 * Created by Uncle Charlie, 2017/01/31
 */

import React from 'react'

export default function TitleInput({title, placeHolder}) {
  return (
    <div style={{flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center'}}>
      <span>{title}</span>
      <input />
    </div>
  )
}