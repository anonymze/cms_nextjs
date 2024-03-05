"use client"

import { useEffect, useSyncExternalStore } from "react"

const register = () => () => {};

function TransitionServerToClientLoader() {	
	const isServer = useSyncExternalStore(
		register,
		() => false,
		() => true,
	)

	console.log(typeof window === "undefined");

	useEffect(() => {
		if (isServer) {
			console.log("je viens de rentrer dans le loading du server");
		}

		if (!isServer) {
			console.log("je viens de rentrer dans le loading du client");
		}
		return () => {
			if (isServer) {
				console.log('je leaveee le côté server');
			}

			if (!isServer) {
				console.log('je leaveee le côté client');
			}
		}
	}, [isServer])
	return (
		<div className="bg-slate-400">{isServer ? "server" : "client"}</div>
	)
}

export { TransitionServerToClientLoader }