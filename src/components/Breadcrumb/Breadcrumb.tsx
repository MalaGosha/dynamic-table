import React, { useContext } from 'react';
import classes from './Breadcrumb.module.css';
import BreadcrumbContext, { BreadcrumbType } from 'context/BreadcrumbContext';
import { Breadcrumbs, Link } from '@mui/material';

const Breadcrumb: React.FC = () => { 
    const breadcrumbCtx = useContext(BreadcrumbContext);

    const handleClick = (item: string) => {
        breadcrumbCtx.arrayBreadcrumb.forEach((element: BreadcrumbType, index: number) => {
            if (element.nameTable === item) {
                breadcrumbCtx.removeBreadcrumb(index);
            }
        });
    }

    return (
        <div className={classes.BreadcrumbContainer}>
            <Breadcrumbs>
                {breadcrumbCtx.arrayBreadcrumb.map((breadcrumb:BreadcrumbType, index:number) => {
                    return (
                        <Link 
                            underline="hover"
                            color="black"
                            style={{fontSize: '18px'}}
                            key={index}
                            onClick={(() => handleClick(breadcrumb.nameTable))}
                        >
                                {breadcrumb.nameTable}
                        </Link>
                    )
                })}
            </Breadcrumbs>
        </div>
    );
};

export default Breadcrumb;
