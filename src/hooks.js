import { useState, useEffect, useRef, useCallback } from './framework';

// useFetch: Fetch data from an API
function useFetch(url) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(url)
            .then(response => response.json())
            .then(data => {
                setData(data);
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            });
    }, [url]);

    return { data, loading, error };
}

// useLocalStorage: Manage state in local storage
function useLocalStorage(key, initialValue) {
    const [storedValue, setStoredValue] = useState(() => {
        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            console.error(error);
            return initialValue;
        }
    });

    const setValue = value => {
        try {
            const valueToStore = value instanceof Function ? value(storedValue) : value;
            setStoredValue(valueToStore);
            window.localStorage.setItem(key, JSON.stringify(valueToStore));
        } catch (error) {
            console.error(error);
        }
    };

    return [storedValue, setValue];
}

// usePrevious: Get the previous value of a state or prop
function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
        ref.current = value;
    }, [value]);
    return ref.current;
}

// useAnimation : AnimationAPI
function useAnimation(keyframes, options) {
    const elementRef = useRef(null);

    useEffect(() => {
        if (elementRef.current) {
            const animation = elementRef.current.animate(keyframes, options);
            return () => animation.cancel();
        }
    }, [keyframes, options]);

    return elementRef;
}

// useTransition : extends the utility of the useAnimation API
function useTransition(ref, transitionProps) {
    useEffect(() => {
        const node = ref.current;
        if (node) {
            Object.assign(node.style, transitionProps);
        }
    }, [transitionProps]);

    return ref;
}

// // useForm : Basic API to handle forms (TODO: Extend the functionality further. Rn this is fucking horseshit when compared to react-hook-forms or zod)
// function useForm(initialValues, validate) {
//     const [values, setValues] = useState(initialValues);
//     const [errors, setErrors] = useState({});

//     function handleChange(event) {
//         const { name, value } = event.target;
//         setValues(prevValues => ({ ...prevValues, [name]: value }));
//         if (validate) {
//             const validationErrors = validate(values);
//             setErrors(validationErrors);
//         }
//     }

//     return { values, errors, handleChange };
// }


// new implementation of useForm
function useForm({ initialValues = {}, validate, onSubmit }) {
    const [values, setValues] = useState(initialValues);
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isValid, setIsValid] = useState(true);

    const handleChange = useCallback((event) => {
        const { name, value } = event.target;
        setValues(prevValues => ({ ...prevValues, [name]: value }));

        if (validate) {
            const validationErrors = validate({ ...values, [name]: value });
            setErrors(validationErrors);
            setIsValid(Object.keys(validationErrors).length === 0);
        }
    }, [values, validate]);

    const handleBlur = useCallback((event) => {
        const { name, value } = event.target;
        if (validate) {
            const validationErrors = validate({ ...values, [name]: value });
            setErrors(validationErrors);
            setIsValid(Object.keys(validationErrors).length === 0);
        }
    }, [values, validate]);

    const handleSubmit = useCallback((event) => {
        event.preventDefault();
        if (validate) {
            const validationErrors = validate(values);
            setErrors(validationErrors);
            setIsValid(Object.keys(validationErrors).length === 0);

            if (Object.keys(validationErrors).length === 0) {
                setIsSubmitting(true);
                onSubmit(values)
                    .then(() => setIsSubmitting(false))
                    .catch(err => {
                        setIsSubmitting(false);
                        console.error(err);
                    });
            }
        } else {
            setIsSubmitting(true);
            onSubmit(values)
                .then(() => setIsSubmitting(false))
                .catch(err => {
                    setIsSubmitting(false);
                    console.error(err);
                });
        }
    }, [values, validate, onSubmit]);

    const resetForm = useCallback(() => {
        setValues(initialValues);
        setErrors({});
        setIsSubmitting(false);
        setIsValid(true);
    }, [initialValues]);

    return {
        values,
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
        resetForm,
        isSubmitting,
        isValid,
    };
}

export { useFetch, useLocalStorage, usePrevious, useAnimation, useTransition, useForm };