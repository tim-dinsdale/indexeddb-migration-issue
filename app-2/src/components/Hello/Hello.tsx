import * as React from 'react';
import * as Styles from './Hello.module.scss';
const uuidv4 = require('uuid/v4');

interface HelloProps { 
    version: string;   
    securityRealm: string;
}

export const Hello: React.FC<HelloProps> = (props) => {
    const {version, securityRealm} = props;
    const write = () => {
        let db: any = null;
        var request = window.indexedDB.open("MyTestDatabase", 3);
        request.onerror = function(event: any) {
            // Do something with request.errorCode!
        };
        request.onsuccess = function(event: any) {
            db = event.target.result;
            db.onerror = function(event: any) {
                // Generic error handler for all errors targeted at this database's
                // requests!
                console.error("Database error: " + event.target.errorCode);
            };
            let transaction = db.transaction(["theStore"], "readwrite");
            var objectStore = transaction.objectStore("theStore");
            objectStore.add({myKey: uuidv4(), version: version, securityRealm: securityRealm});            
        }
        
        request.onupgradeneeded = function(event: any) { 
            // Save the IDBDatabase interface 
            let db = event.target.result;
  
            // Create an objectStore for this database
            let objectStore = db.createObjectStore("theStore", { keyPath: "myKey" });
        };

        
    }

    return (
        <div className={Styles['hello']}> 
            <h1>App 2</h1>
            <button onClick={write}>WRITE</button>            
        </div>
    )
}