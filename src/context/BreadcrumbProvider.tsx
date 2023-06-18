import React, { useEffect, useReducer } from 'react';
import BreadcrumbContext, { BreadcrumbContextType, BreadcrumbType } from './BreadcrumbContext';
import { getAllGames } from 'api/getAllGames';
import { displayError } from 'utils/functions';
import { getPropertyNames, getRow, getValuesFromObject } from 'utils/functionsToTransformData';

type BreadcrumbAction =
    | { type: 'SET_INITIAL_STATE'; payload: BreadcrumbType[] }
    | { type: 'ADD_BREADCRUMB'; payload: BreadcrumbType }
    | { type: 'REMOVE_BREADCRUMB'; payload: number };

const breadcrumbReducer = (state: BreadcrumbType[], action: BreadcrumbAction) => {
    switch (action.type) {
        case 'SET_INITIAL_STATE':
            return action.payload;
        case 'ADD_BREADCRUMB':
            return [...state, action.payload];
        case 'REMOVE_BREADCRUMB':
            return state.slice(0, action.payload + 1);
        default:
            return state;
    }
};

type BreadcrumbProviderType = {
    children: JSX.Element;
};

const BreadcrumbProvider: React.FC<BreadcrumbProviderType> = (props: BreadcrumbProviderType) => {
    const [breadcrumbState, dispatchBreadcrumbAction] = useReducer(breadcrumbReducer, []);

    useEffect(() => {
        getAllGames()
            .then(response => {
                const propertyNames: string[] = getPropertyNames(response);
                const values: any[] = getValuesFromObject(response);
                const rows: any = [getRow(values)];
                const initialState: BreadcrumbType[] = [{ nameTable: 'Main', data: { propertyNames: propertyNames, values: rows }}];
                dispatchBreadcrumbAction({ type: 'SET_INITIAL_STATE', payload: initialState });
            })
            .catch(error => {
                displayError('Error fetching data from API: ', error);
            });
    }, []);

    const addBreadcrumb = (breadcrumb: BreadcrumbType) => {
        dispatchBreadcrumbAction({ type: 'ADD_BREADCRUMB', payload: breadcrumb });
    };

    const removeBreadcrumb = (index: number) => {
        dispatchBreadcrumbAction({ type: 'REMOVE_BREADCRUMB', payload: index });
    };

    const breadcrumbContextValue: BreadcrumbContextType = {
        arrayBreadcrumb: breadcrumbState,
        addBreadcrumb: addBreadcrumb,
        removeBreadcrumb: removeBreadcrumb,
    };

    return (
        <BreadcrumbContext.Provider value={breadcrumbContextValue}>
            {props.children}
        </BreadcrumbContext.Provider>
    );
};

export default BreadcrumbProvider;
