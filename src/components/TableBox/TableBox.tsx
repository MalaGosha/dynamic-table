import React, { useContext, useEffect, useState } from 'react';
import classes from './TableBox.module.css';
import BreadcrumbContext from 'context/BreadcrumbContext';
import { getRowColor, handleClickToLink } from 'utils/functions';
import { getDataToTable, getValuesFromObject, getPropertyNames, getRow } from 'utils/functionsToTransformData';
import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material';

const TableBox: React.FC = () => {
    const [rowsData, setRowsData] = useState<any>([]);
    const [headers, setHeaders] = useState<string[]>([]);
    const [searchedValue, setSearchedValue] = useState<string>('');
    const [selectedRows, setSelectedRows] = useState<number[]>([]);
    const breadcrumbCtx  = useContext(BreadcrumbContext);

    useEffect(() => {
        if (breadcrumbCtx.arrayBreadcrumb.length === 1) {
            setData(breadcrumbCtx.arrayBreadcrumb[0].data.propertyNames, breadcrumbCtx.arrayBreadcrumb[0].data)
        } else if (breadcrumbCtx.arrayBreadcrumb.length > 1) { 
            breadcrumbCtx.arrayBreadcrumb.forEach(breadcrumb => {
                setData(breadcrumb.data.propertyNames, breadcrumb.data)
        })}
        setSelectedRows([])
    },[breadcrumbCtx, searchedValue]);

    const setData = (propertyNames: string[], data: any) => {
        setHeaders(propertyNames);
        const [rows] = getDataToTable(data);
        setRowsData(rows);
    };

    const keys = Array.from(rowsData.keys());

    const handleClick = (nameCell: string, nestedData: any) => {
        const searchedValue = nameCell.substring(5);
        const nameBreadcrumb = searchedValue.charAt(0).toUpperCase() + searchedValue.slice(1);
        setSearchedValue(searchedValue);
        
        let propertyNames: string[] = [];
        const rows: any[] = [];

        if (Array.isArray(nestedData) && nestedData.length > 0) {
            nestedData.forEach((data: any) => {
                propertyNames = getPropertyNames(data);
                const values = getValuesFromObject(data);
                const row = getRow(values);
                rows.push(row);
            })
        } else {
            propertyNames = getPropertyNames(nestedData);
            const values = getValuesFromObject(nestedData);
            const row = getRow(values);
            rows.push(row);
        } 

        breadcrumbCtx.addBreadcrumb({ nameTable: nameBreadcrumb, data: { propertyNames: propertyNames, values: rows }});     
    }

    const addHighlight = (rowIndex: number) => {
        if (selectedRows.includes(rowIndex)) {
            setSelectedRows(selectedRows.filter(row => row !== rowIndex));
        } else {
            setSelectedRows([...selectedRows, rowIndex]);
        }
    };

    return (
        <div className={classes.TableBox}>
        <TableContainer className={classes.Table}>
            <Table stickyHeader>
                <TableHead >
                    <TableRow>
                        {headers.map((header:string, index: number) => {
                            return (
                                <TableCell
                                    key={index}
                                    align="center"
                                    style={{fontWeight: 'bold', fontSize: '16px'}}
                                >
                                    {header.toUpperCase()}
                                </TableCell>
                            )
                        })}
                    </TableRow>
                </TableHead>
                <TableBody >
                    {keys.map((key, index) => (
                    <TableRow 
                        key={index} 
                        onClick={() => addHighlight(index)}
                        style={{ backgroundColor: getRowColor(index, selectedRows)}}
                        >
                        {rowsData.get(key).map((row: any) => {
                            if (row.cellName.substring(0,4) === 'Show') {
                                return (
                                    <TableCell 
                                        key={Math.random()}
                                        align="center"
                                        className={classes.TableShowNextData}
                                        onClick={() => handleClick(row.cellName, row.data)}
                                    >
                                        {row.cellName}
                                    </TableCell>
                                )
                            } else if (row.cellName.substring(0,4) === 'http') {
                                return (
                                    <TableCell 
                                        key={Math.random()}
                                        align="center"
                                        className={classes.TableLinkCell}
                                        onClick={() => handleClickToLink(row.cellName)}
                                    >
                                        {row.cellName}
                                    </TableCell>
                                )
                            } else {
                                return (
                                    <TableCell 
                                        key={Math.random()}
                                        align="center"
                                    >
                                        {row.cellName}
                                    </TableCell>
                                );
                            }
                            
                        })}
                    </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
        </div>
    );
};

export default TableBox;
