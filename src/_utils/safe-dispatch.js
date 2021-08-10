import React from 'react'

/**
 * 
 * @param {function} dispatch - Function to invoke only when in a page that is currently mounted
 */
const useSafeDispatch = (dispatch) => {
    const mounted = React.useRef(false);
    React.useLayoutEffect(() => {
        mounted.current = true;
        return () => (mounted.current = false)
    },[])

    return React.useCallback((...args) => (
        mounted.current ? dispatch(...args) : void 0
    ), [dispatch])
}

export default useSafeDispatch;