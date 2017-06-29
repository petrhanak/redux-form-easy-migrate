import React from 'react'
import RF6Form from './RF6Form'
import RF5Form from './RF5Form'

export const App = () => (
  <div>
    <RF6Form title="v6 api" />
    <RF5Form title="legacy api" />
  </div>
);