Hello! This demonstrates the indexeddb migration problem we have. It is... probably not the best code you have ever seen. It uses React because that
is what the terrible starter project I have uses, and I was too lazy to pull that out. I am sorry.

To reproduce, you should open two shells. `cd app-1` in one, `cd app-2` in the other. `npm install` in both.

Now you are ready to rumble. Open both `app.json` files, one in `app-1/res`, the other in one in `app-2/res`. You should see they are both in the same 
security realm. 

Launch both apps by `npm start` in both shells. They will appear. Hit the 'write' button a few times. That will dump some data into indexeddb. 
You can inspect that the usual way (right click inspect, applications tab, indexeddb on the right, drill down into the db called 'MyTestDatabase'). 
Have some fun pressing the button, refreshing the db, and seeing it being written. Great.

Now, close both the apps, kill the node instances.

You are going to force a cache migration. Open app 1's `app.json`, and change the security realm to something else. 
Launch app 1 again. If you inspect the indexeddb again, you should see the same data you had before - OpenFin has migrated the cache.

Now, *without changing app 2's realm* launch that. So your apps are on different realms. Now hammer the write button on app 2 
so you dump some more data into the indexeddb.

Great, kill everything again. Now open app 2's `app.json` and change the realm, so that it is now the same as app 1. Launch it one last time. Inspect the indexeddb.
Oh noes! The most recent data you dumped into indexeddb has vanished! Everyone is cross with you and it is the end of the world.

What happened? When you migrated app 1, it also migrated app 2, despite app 2 not being on that realm. So when we then changed the rev of app 2, it was like, 
bonza, I am migrated, no need to do anything, and the data that had been written between those two times was lost. This also happens with runtime versions, but because they are a pain to test we use realms.