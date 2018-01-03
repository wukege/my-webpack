//import React,{Component} from 'react';
//import ReactDOM,{render} from 'react-dom';
//require('es5-shim/es5-sham');
////require('es5-shim');
//require('console-polyfill');

//让IE6-8支持CSS3 Media Query
//require('respond');
require('es5-shim');
require('es5-shim/es5-sham');
require('console-polyfill');



const React = require('react');
const ReactDOM = require('react-dom');
let Button = require('antd/lib/button');
require('antd/lib/button/style');

console.log(Button);
//import Test from './../../component/test';
// // require('./style/test')
import './../../style/css/test'
// import './style/less/index'
// import './style/scss/index'
// print('hello');
// import react

//render(
//    <Test />,
//    document.getElementById('main')
//)

var HelloMessage = React.createClass({
  render: function() {
    return <div>
      Hello {this.props.name}
      <Button type="primary">Primary</Button>
      <Button>Default</Button>
      <Button type="ghost">Ghost</Button>
      <Button type="dashed">Dashed</Button>
    </div>;
  }
});



ReactDOM.render(
    <HelloMessage name="John" />,
    document.getElementById('main')
);

console.log($(document))