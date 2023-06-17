import React from 'react';
import classes from './Home.module.css';
import TableBox from 'components/TableBox/TableBox';
import Breadcrumb from 'components/Breadcrumb/Breadcrumb';

const Home: React.FC = () => {
    return (
        <div className={classes.MainContainer}>
            <Breadcrumb />
            <TableBox />
        </div>
    );
};

export default Home;
