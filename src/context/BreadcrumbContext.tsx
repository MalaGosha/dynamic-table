import React from 'react';

export type DataType = {
    propertyNames: string[],
    values: any[];
}

export type BreadcrumbType = {
    nameTable: string;
    data: DataType;
} 

export type BreadcrumbContextType = {
    arrayBreadcrumb: BreadcrumbType[];
    addBreadcrumb: (breadcrumb: BreadcrumbType) => void;
    removeBreadcrumb: (index: number) => void;
};

const BreadcrumbContext = React.createContext<BreadcrumbContextType>({
    arrayBreadcrumb: [],
    addBreadcrumb: () => ({nameTable: '', data: {propertyNames: [], values: []}}),
    removeBreadcrumb: () => ({}),
});

export default BreadcrumbContext;