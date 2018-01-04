require('es5-shim');
require('es5-shim/es5-sham');
require('console-polyfill');

const React = require('react');
const ReactDOM = require('react-dom');
let Button = require('antd/lib/button');
let Input = require('antd/lib/input');

require('antd/lib/button/style');
require('antd/lib/input/style');

require('css/car.styl')
console.log(process.env,111111)

console.log($(document));
var HelloMessage = React.createClass({
  render: function() {
    return <div>
      Hello {this.props.name}
      <Button type="primary">Primaryadfasdfsfsaf</Button>
      <Input placeholder="基本使用" />
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

