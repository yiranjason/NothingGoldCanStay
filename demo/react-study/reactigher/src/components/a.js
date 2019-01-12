import React, { Component } from 'react';

const simpleHoc = WrappedComponent => {
  console.log('simpleHoc');
  return class extends Component {
    render() {
    	return (<div>
    		我其实不胖，也就100多斤
    		<WrappedComponent {...this.props}/>
    		</div>)
    }
  }
}
export default simpleHoc;