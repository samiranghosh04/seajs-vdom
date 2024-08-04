let currentComponent = null;
const hooks = [];
let hookIndex = 0;

// useState : BASIC State Management
function useState(initialValue) {
    const _hookIndex = hookIndex;
    const state = hooks[hookIndex] || initialValue;
    const setState = newState => {
        hooks[_hookIndex] = newState;
        currentComponent.update();
    };
    hookIndex++;
    return [state, setState];
}

// useEffect : side effects
function useEffect(callback, deps) {
    const hasChanged = hooks[hookIndex] ? deps.some((dep, i) => dep !== hooks[hookIndex][i]) : true;
    if (hasChanged) {
        callback();
        hooks[hookIndex] = deps;
    }
    hookIndex++;
}

// useReducer :
function useReducer(reducer, initialState) {
    const _hookIndex = hookIndex;
    const [state, dispatch] = hooks[_hookIndex] || [initialState, action => {
        hooks[_hookIndex][0] = reducer(hooks[_hookIndex][0], action);
        currentComponent.update();
    }];
    hooks[_hookIndex] = [state, dispatch];
    hookIndex++;
    return hooks[_hookIndex];
}

// useMemo : Memoization
function useMemo(factory, deps) {
    const _hookIndex = hookIndex;
    if (!hooks[_hookIndex] || deps.some((dep, i) => dep !== hooks[_hookIndex][1][i])) {
        hooks[_hookIndex] = [factory(), deps];
    }
    hookIndex++;
    return hooks[_hookIndex][0];
}

// useRef :
function useRef(initialValue) {
    const _hookIndex = hookIndex;
    if (!hooks[_hookIndex]) {
        hooks[_hookIndex] = { current: initialValue };
    }
    hookIndex++;
    return hooks[_hookIndex - 1];
}

// useCallback hook
function useCallback(callback, dependencies) {
    const [memoizedCallback, setMemoizedCallback] = useState(() => callback);
    const [prevDependencies, setPrevDependencies] = useState(dependencies);

    const dependenciesChanged = dependencies.some(
        (dep, index) => !Object.is(dep, prevDependencies[index])
    );

    if (dependenciesChanged) {
        setMemoizedCallback(() => callback);
        setPrevDependencies(dependencies);
    }

    return memoizedCallback;
}

// useContext
function useContext(context) {
    return context[Context];
}

const Context = Symbol('context');

// createContext
function createContext(defaultValue) {
    const context = {
        [Context]: defaultValue,
        Provider: ({ value, children }) => {
            context[Context] = value;
            return children;
        },
        Consumer: ({ children }) => children(context[Context])
    };
    return context;
}

// Signals
function createSignal(value) {
    let currentValue = value;
    const subscribers = new Set();

    const get = () => currentValue;
    const set = newValue => {
        currentValue = newValue;
        subscribers.forEach(callback => callback());
    };
    const subscribe = callback => {
        subscribers.add(callback);
        return () => subscribers.delete(callback);
    };

    return [get, set, subscribe];
}

// createStore
function createStore(initialState) {
    let state = initialState;
    const subscribers = new Set();

    const getState = () => state;
    const setState = newState => {
        state = { ...state, ...newState };
        subscribers.forEach(callback => callback());
    };
    const subscribe = callback => {
        subscribers.add(callback);
        return () => subscribers.delete(callback);
    };

    return { getState, setState, subscribe };
}

// createRouter : Basic Routing API
function createRouter(routes) {
    return function Router({ path }) {
        const Component = routes[path] || routes['/'];
        return <Component />;
    };
}

function h(type, props, ...children) {
    return { type, props: props || {}, children };
}

function render(vnode, container) {
    const component = createElement(vnode);
    container.appendChild(component);
    return component;
}

function createElement(vnode) {
    if (typeof vnode === 'string') {
        return document.createTextNode(vnode);
    }

    if (typeof vnode.type === 'function') {
        currentComponent = vnode;
        hookIndex = 0;
        const component = vnode.type(vnode.props);
        const domElement = createElement(component);
        currentComponent.update = () => {
            const newComponent = vnode.type(vnode.props);
            updateDom(domElement, newComponent);
        };
        return domElement;
    }

    const domElement = document.createElement(vnode.type);
    const { props, children } = vnode;

    Object.keys(props).forEach(key => {
        if (key.startsWith('on')) {
            domElement.addEventListener(key.slice(2).toLowerCase(), props[key]);
        } else {
            domElement[key] = props[key];
        }
    });

    children.forEach(child => domElement.appendChild(createElement(child)));

    return domElement;
}

function updateDom(dom, newVNode) {
    const parent = dom.parentNode;
    const newDom = createElement(newVNode);
    parent.replaceChild(newDom, dom);
}

export {
    useState,
    useEffect,
    useReducer,
    useMemo,
    useRef,
    useCallback,
    useContext,
    createContext,
    createSignal,
    createStore,
    createRouter,
    h,
    render
};
