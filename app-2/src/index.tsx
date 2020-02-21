import * as React from 'react';
import * as ReactDOM from 'react-dom'
import {Hello} from './components/Hello/Hello';


let version = "";
let securityRealm = "";
async function init() {
    let rti = await fin.System.getRuntimeInfo();
    version = rti.version;
    securityRealm = rti.securityRealm;
    ReactDOM.render(<Hello version={version} securityRealm={securityRealm}/>, document.getElementById('app'));
}

init();

