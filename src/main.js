import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import './assets/main.css'

const app = createApp(App)
const pinia = createPinia()

//for persistant values -> plugin 
pinia.use((context) => {
    //console.log(context);

    const storeId = context.store.$id;

    console.log(storeId);

    const serializer = {
        serialize: JSON.stringify,
        deserialize: JSON.parse
    }

    // sync store from local storage

    const fromStorage = serializer.deserialize(window.localStorage.getItem(storeId))

    if(fromStorage){
        context.store.$patch(fromStorage)
    }

    // listen for changes and update local storage
    context.store.$subscribe((mutation, state) => {
        window.localStorage.setItem(storeId, serializer.serialize(state));
    })
})

app.use(pinia)
app.use(router)

app.mount('#app')
