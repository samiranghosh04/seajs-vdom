class SeaState {
    constructor(reducer, initialState) {
        this.reducer = reducer;
        this.state = initialState;
        this.listeners = new Set();
    }

    getState() {
        return this.state;
    }

    dispatch(action) {
        if (typeof action === 'function') {
            action(this.dispatch.bind(this), this.getState.bind(this));
        } else {
            this.state = this.reducer(this.state, action);
            this.listeners.forEach(listener => listener());
        }
    }

    subscribe(listener) {
        this.listeners.add(listener);
        return () => {
            this.listeners.delete(listener);
        };
    }
}

function createSeaState(reducer, initialState) {
    return new SeaState(reducer, initialState);
}

// Hook to use the SeaState store in components
import { useState, useEffect } from './framework';

function useSeaState(store) {
    const [state, setState] = useState(store.getState());

    useEffect(() => {
        const handleChange = () => setState(store.getState());
        const unsubscribe = store.subscribe(handleChange);
        return unsubscribe;
    }, [store]);

    return [state, store.dispatch.bind(store)];
}

export { createSeaState, useSeaState };
