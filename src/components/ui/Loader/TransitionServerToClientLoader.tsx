"use client"

import { useSyncExternalStore } from "react"
import { useProgress } from "../progress-bar/ProgressBar";

const register = () => () => {};

function TransitionServerToClientLoader() {	
	const isServer = useSyncExternalStore(
		register,
		() => false,
		() => true,
	);

	return (
		<div className="bg-slate-400">{isServer ? "server" : "client"}</div>
	)
}

export { TransitionServerToClientLoader }