# SeaJS

Welcome to the SeaJS! SeaJS is a lightweight UI framework designed to provide essential functionalities for building modern web applications. The core features of SeaJS, include state management, hooks, context, signals, stores, routing, rendering and more. SeaJS might just be the most lightweight frontend framework.

## Table of Contents

1. [Core Concepts](#core-concepts)
2. [Hooks](#hooks)
    - [useState](#usestate)
    - [useEffect](#useeffect)
    - [useReducer](#usereducer)
    - [useMemo](#usememo)
    - [useRef](#useref)
    - [useCallback](#usecallback)
    - [useContext](#usecontext)
    - [useFetch](#usefetch)
    - [useLocalStorage](#uselocalstorage)
    - [usePrevious](#useprevious)
    - [useAnimation](#useanimation)
    - [useTransition](#usetransition)
    - [useForm](#useform)
3. [Context](#context)
4. [Signals](#signals)
5. [Store](#createStore)
6. [Routing](#createRouter)
7. [Rendering](#rendering)
8. [Custom Hooks](#custom-hooks)
9. [API Reference](#api-reference)

## Custom Hooks

SeaJS offers additional custom hooks to extend its functionality, making it easier to manage data fetching, local storage, animations, transitions, and forms.

### `useFetch`

`useFetch` is a hook for fetching data from an API and managing the loading and error states.

**Usage:**

```javascript
const { data, loading, error } = useFetch(url);
```

- `url`: The URL of the API endpoint to fetch data from.
- Returns:
  - `data`: The fetched data.
  - `loading`: A boolean indicating if the data is still loading.
  - `error`: Any error that occurred during the fetch operation.

### `useLocalStorage`

`useLocalStorage` is a hook for managing state that is synchronized with `localStorage`.

**Usage:**

```javascript
const [storedValue, setStoredValue] = useLocalStorage(key, initialValue);
```

- `key`: The key under which the value is stored in `localStorage`.
- `initialValue`: The initial value if no value is found in `localStorage.
- Returns:
  - `storedValue`: The current value from `localStorage`.
  - `setStoredValue`: A function to update the value in `localStorage`.

### `usePrevious`

`usePrevious` is a hook that provides the previous value of a state or prop.

**Usage:**

```javascript
const previousValue = usePrevious(value);
```

- `value`: The current value to keep track of.
- Returns: The previous value of `value`.

### `useAnimation`

`useAnimation` is a hook for managing animations on a DOM element using the Web Animations API.

**Usage:**

```javascript
const elementRef = useAnimation(keyframes, options);
```

- `keyframes`: The keyframes for the animation.
- `options`: Options for the animation (e.g., duration, easing).
- Returns: A ref object that should be attached to the DOM element to animate.

### `useTransition`

`useTransition` extends the functionality of `useAnimation` by applying CSS transitions.

**Usage:**

```javascript
const elementRef = useTransition(ref, transitionProps);
```

- `ref`: A ref object pointing to the DOM element to apply the transition.
- `transitionProps`: An object containing CSS transition properties.
- Returns: The ref object with the transition applied.

### `useForm`

`useForm` is a hook for managing form state, validation, and submission.

**Usage:**

```javascript
const {
    values,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm,
    isSubmitting,
    isValid,
} = useForm({ initialValues, validate, onSubmit });
```

- `initialValues`: The initial values for the form fields.
- `validate`: A function to validate the form values and return errors.
- `onSubmit`: A function to handle form submission.

Returns:
- `values`: The current values of the form fields.
- `errors`: The current validation errors.
- `handleChange`: A function to handle changes in form fields.
- `handleBlur`: A function to handle field blur events for validation.
- `handleSubmit`: A function to handle form submission.
- `resetForm`: A function to reset the form to its initial state.
- `isSubmitting`: A boolean indicating if the form is currently being submitted.
- `isValid`: A boolean indicating if the form is valid.

## API Reference

- **`useState(initialValue)`**: Manages local state.
- **`useEffect(callback, deps)`**: Handles side effects.
- **`useReducer(reducer, initialState)`**: State management with a reducer.
- **`useMemo(factory, deps)`**: Memoizes values.
- **`useRef(initialValue)`**: Persistent values between renders.
- **`useCallback(callback, dependencies)`**: Memoizes callback functions.
- **`useContext(context)`**: Accesses context values.
- **`createContext(defaultValue)`**: Creates a context object.
- **`createSignal(initialValue)`**: Manages reactive values.
- **`createStore(initialState)`**: Manages global state.
- **`createRouter(routes)`**: Creates a routing API.
- **`render(vnode, container)`**: Renders virtual nodes.

---

Certainly! Here’s a detailed overview of the upcoming features for SeaJS:

---

## Features in Development

### i18n and i10n Support

**Internationalization (i18n)** and **Localization (i10n)** are essential for creating applications that can cater to multiple languages and regions. This feature aims to integrate support for:
- **Dynamic Language Switching**: Enable users to switch languages on-the-fly.
- **Translation Management**: Provide tools for managing and loading translations from various sources.
- **Date/Number Formatting**: Adapt date, number, and currency formats based on locale.
- **Planned Support**: Integration with existing i18n libraries or developing a custom solution for seamless localization.

### SeaRouter

**SeaRouter** will be an advanced routing API that enhances SeaJS's current routing capabilities. Planned features include:
- **Enhanced Routing API**: A more flexible and powerful routing system that offers features such as nested routes, route guards, and lazy loading.
- **SSR Support**: Server-side rendering support for improved performance and SEO. This will allow developers to opt into SSR as needed, providing an option for pre-rendering pages on the server.
- **Dynamic Routing**: Ability to handle dynamic routes and parameters, facilitating more complex routing scenarios.
- **Integration with SeaJS**: Seamless integration with existing SeaJS components and state management.

### SeaState

**SeaState** will be a dedicated state management library for SeaJS, providing:
- **Enhanced State Management**: A more sophisticated state management solution tailored specifically for SeaJS, with features like:
  - **State Persistence**: Mechanisms to persist and restore state across sessions.
  - **State Composition**: Support for composing state from multiple sources.
  - **Middleware**: Ability to intercept and handle state changes with middleware.
- **Integration**: Smooth integration with existing SeaJS hooks and components.

### Strict Mode for Accessibility Checks

**Strict Mode** will be a feature focused on ensuring accessibility compliance across applications built with SeaJS:
- **Automatic Accessibility Checks**: Integrate tools to automatically check for common accessibility issues during development.
- **Guidelines and Warnings**: Provide guidelines and warnings related to accessibility best practices.


### TypeScript Support

**TypeScript Support** will enhance the SeaJS development experience by:
- **Type Definitions**: Providing comprehensive type definitions to improve development efficiency and catch errors early.
- **Integration**: Ensuring seamless integration with TypeScript for all SeaJS features, including components, hooks, and libraries.
- **Documentation**: Offering TypeScript examples and documentation to assist developers in leveraging SeaJS with TypeScript effectively.

---

These features aim to extend SeaJS’s capabilities and provide developers with more tools to build robust, accessible, and internationalized applications.

---

``` bash
Note - the framework isnt production ready yet. Tests are yet to be integrated. Some of the dependencies are also deprecated as of 5th August 2024 01:43 A.M (IST) and this has to be sorted out before the framework is usable and can be deployed to npm. Please understand that as of now I am the sole person working on this and I am fairly inexperienced so it may take a while before I can fix the issue.
```

---

## Tech Stack

SeaJS utilizes a range of technologies and tools to ensure efficient development, testing, and build processes. Below is an overview of the tech stack employed:

### Core Framework

- **JavaScript**: The most popular language to make UIs. 

- **Vite**: A fast build tool and development server used for building and previewing the project. Vite provides a modern development experience with features like hot module replacement (HMR) and fast builds.

### Build Tools and Transpilation

- **Babel**: A JavaScript compiler used to transform modern JavaScript and JSX syntax into code compatible with older environments.
  - **@babel/core**: The core Babel compiler.
  - **@babel/plugin-transform-react-jsx**: Transforms JSX syntax into React.createElement calls.
  - **@babel/preset-env**: Compiles modern JavaScript to a format compatible with older browsers.
  - **@babel/preset-react**: Compiles React JSX syntax.

### Testing

- **Jest**: A JavaScript testing framework used for running tests and ensuring code quality.
  - **jest-environment-jsdom**: Provides a simulated browser environment for testing.
  - **babel-jest**: A Babel transformer for Jest, allowing Jest to process Babel code.
  - **@testing-library/react**: A testing library for React components that helps ensure they behave as expected.

### Development and Preview

- **Vite**: Also used for the development server and previewing the application. Vite provides fast and efficient build processes and development experiences.
  - **@vitejs/plugin-react**: Vite plugin for integrating React, enabling features like JSX support and fast refresh.

### Deployment

- **Serve**: A static file server used for serving the built application. It provides a simple way to serve static files in production.

### Scripts

- **`test`**: Runs the Jest testing suite.
- **`dev`**: Starts the Vite development server.
- **`build`**: Builds the project for production using Vite.
- **`preview`**: Previews the production build using Vite.

---

## Contributing Guidelines

Check out the [CONTRIBUTING.md]() for more information.

---
## License

This project is licensed under the [MIT License](#license)

