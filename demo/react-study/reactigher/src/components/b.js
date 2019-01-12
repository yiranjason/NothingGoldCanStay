import React, { Component } from 'react';
import simpleHoc from './a.js';

class Usual extends Component {
  render() {
    console.log(this.props, 'props');
    return (
      <div>
        我是最胖的
      </div>
    )
  }
}
export default simpleHoc(Usual);