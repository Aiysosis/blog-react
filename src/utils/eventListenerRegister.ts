export type EventHandler = (e: Event) => void;

export type EventListenerRegister = {
	scroll: EventHandler[];
};
