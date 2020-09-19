import Head from 'next/head';
import Button from '../Components/Button';
import React, { useState, useEffect } from "react";
import Cards from '../Components/Cards';

export default function Home() {
    const [hasError, setErrors] = useState(false);
    const [initialData, setInitialData] = useState([]);
    const [launchYear, setLaunchYear] = useState(null);
    const [launchSuccess, setLaunchSuccess] = useState(null);
    const [landingSuccess, setLandingSucess] = useState(null);
    const url = "https://api.spacexdata.com/v3/launches?limit=100";
    const defaultLaunchYears = [
        2006,
        2007,
        2008,
        2009,
        2010,
        2011,
        2012,
        2013,
        2014,
        2015,
        2016,
        2017,
        2018,
        2019,
        2020
    ];
  
    async function fetchData() {
      const res = await fetch(getNewApiUrl());
      res
        .json()
        .then(response => setInitialData(response))
        .catch(err => setErrors(err));
    }
  
    useEffect(() => {
      fetchData();
    },[launchYear, landingSuccess, launchSuccess]);

    function getNewApiUrl() {
        let newURL = url;
        if(launchYear) {
            newURL = newURL.concat('&launch_year=', launchYear);
        }
        if(launchSuccess) {
            newURL = newURL.concat('&launch_success=', launchSuccess);
        }
        if(landingSuccess) {
            newURL = newURL.concat('&landing_success=', landingSuccess);
        }
        return newURL;
    }

    function onLaunchYearClick(event) {
        setLaunchYear(event.target.value);
    }

    function onLaunchSuccessClick(event) {
        setLaunchSuccess(event.target.value.toString().toLowerCase());
    }

    function onLandingSuccessClick(event) {
        setLandingSucess(event.target.value.toString().toLowerCase());
    }

    return (
        <React.Fragment>
            <Head>
                <title>XT Space App</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div>
                <div className="col-12 col-s-12 main" ><h1>SpaceX Launch Programs</h1></div>
                <div className="filterMenu col-3 col-s-6">
                    <span className="lblText">Filters</span>
                    <div className="menuLblText">Launch Year</div>
                    <hr/>
                    {   
                        defaultLaunchYears.map(year => 
                        <Button className={"button"} value={year} onClick={onLaunchYearClick}/>
                    )}
                    <div className="menuLblText">Successful Launch</div>
                    <hr/>
                    <Button className={"button"} value={"True"} onClick={onLaunchSuccessClick}/>
                    <Button className={"button"} value={"False"} onClick={onLaunchSuccessClick}/>
                    <div className="menuLblText">Successful Landing</div>
                    <hr/>
                    <div>
                    <Button className={"button"} value={"True"} onClick={onLandingSuccessClick}/>
                    <Button className={"button"} value={"False"} onClick={onLandingSuccessClick}/>
                    </div>
                </div>
                <div className="cardsContainer">
                    <Cards data={initialData} />
                </div>
                { hasError ? <span>{JSON.stringify(hasError)}</span> : null }
                <div className="footer col-12 col-s-12">Developed By:Pawan Gupta</div>
            </div>
        </React.Fragment>
    )
}