import React from 'react';
import { client } from './api-client';

export function useClient(){
    return React.useCallback((endpoint, config) => client(endpoint, {...config}),[])
}