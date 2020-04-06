import create from "zustand"
import {getGun} from "./gun"

const stores = new Map()

const memoStore = ( key ) => {
  let gun = getGun()
  
  let store = stores.get( key )
  if ( store ) return store
  const entry = gun.get( key )
  
  store = create( set => {
    // Subscribe to gun db
    
    entry.on( ( data, key ) => {
      set( { ...data } )
    } )
    return {}
  } )
  
  entry.once( ( data, key ) => {
    const [, api] = store
    api.setState( { ...data } )
  } )
  
  stores.set( key, [store, entry] )
  return [store, entry]
}

const useGun = ( key, selectFx ) => {
  let [store, entry] = memoStore( key )
  const [use, api] = store
  
  return [use( selectFx ), entry]
}


export default useGun