import {gun, setupGun, Gun} from "./gun"
import useGun from "./useGun"


const logGun = async (path) => {
    gun.get(path).once(value => {
        console.log("get", {path, value})
    })

    gun.path(path).once(value => {
        console.log("path", {path, value})
    })
}

export {Gun, gun, setupGun, logGun, useGun}