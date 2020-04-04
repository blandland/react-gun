import Gun from "gun/browser"
import Sea from "gun/sea"
import unset from "gun/lib/unset"
import path from "gun/lib/path"

let gun = Gun()

const setupGun = (serverList) => {
    gun = Gun(serverList)
}

window.___IMPLICIT_IMPORTS = [unset, path, Sea]

export { gun, setupGun, Gun }