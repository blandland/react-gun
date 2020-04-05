import {gun, setupGun, Gun} from "./gun"
import create from "zustand"
import useGun from "./useGun"

const createGunSet = ( objectKey ) => {

    const [useStore, storeApi] = create( set => ({
        count: 0,
        byId: new Map(),
        set: ( id, entry ) => {
            set( state => {
                let gunObject = gun.get( `${id}` ).put( entry ) // add single entry
                gun.get( objectKey ).set( gunObject ) // add to set
            } )
        },
        clear: () => {
            // TODO
            console.log( "TODO: implement unset all " )
            gun.get( objectKey ).map().once( ( data, key ) => {
                console.log( "DELETE data map", data, key )
            } )
        },
        delete: ( id ) => {
            gun.get( objectKey ).path( id ).put( null )
        },
    }) )

// INITIALIZE GUN SET W/LOCAL STORE & SUBSCRIBE
    console.log( "SUBSCRIBE ONCE" )
    gun.get( objectKey ).map().on( ( data, key ) => {
        storeApi.setState( state => {
            if ( !data ) {
                state.byId.delete( key )
            } else {
                state.byId.set( key, data )
            }
            return { byId: state.byId }
        } )
    } )

    return [useStore, storeApi]
}

const logGun = async (path) => {
    gun.get(path).once(value => {
        console.log("get", {path, value})
    })

    gun.path(path).once(value => {
        console.log("path", {path, value})
    })
}

export {Gun, gun, setupGun, createGunSet, logGun, useGun}