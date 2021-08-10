import React from 'react'
import { asyncConstants } from '_helpers/constants'
import useSafeDispatch from './safe-dispatch'

const defaultInitialState = {status: asyncConstants.IDLE, data: null, error: null}
const useAsync = (initialState) => {
    const initialStateRef = React.useRef({
        ...defaultInitialState,
        ...initialState,
    })

    const [{status, data, error}, setState] = React.useReducer( (s, a) => ({...s, ...a}), initialStateRef.current)

    const safeSetState = useSafeDispatch(setState);

    const setData = React.useCallback( 
        data => safeSetState({status: asyncConstants.RESOLVED, data}), [safeSetState]
    )

    const setError = React.useCallback(
        error => safeSetState({error, status: asyncConstants.REJECTED}),[safeSetState]
    )

    const reset = React.useCallback(
        () => safeSetState(initialStateRef.current), [safeSetState]
    )

    const run = React.useCallback(
        promise => {
            if(!promise || !promise.then){
                throw new Error(
                    `The argument passed to useAsync().run must be a promise. Maybe a function that's passed isn't returning anything?`,
                )
            }
            safeSetState({status: asyncConstants.PENDING});
            return promise.then(
                data => {
                    setData(data);
                    return data;
                },
                error => {
                    setError(error);
                    return Promise.reject(error);
                }
            )
        }, [safeSetState, setData, setError]
    )

    return {
        isIdle: status === asyncConstants.IDLE,
        isLoading: status === asyncConstants.PENDING,
        isError: status === asyncConstants.REJECTED,
        isSuccess: status === asyncConstants.RESOLVED,

        setData,
        setError,
        error,
        status,
        data,
        run,
        reset,
    }
}

export default useAsync
