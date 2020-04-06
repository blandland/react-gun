import Gun from "gun/browser"
import Sea from "gun/sea"
import unset from "gun/lib/unset"
import path from "gun/lib/path"

let gun 

const setupGun = ( serverList ) => {
	gun = Gun( serverList )
	return gun
}

const getGun = () => {
    return gun 
}

window.___IMPLICIT_IMPORTS = [unset, path, Sea]

export { getGun, setupGun, Gun }