import React, { useEffect, useState } from "react";
import { getData } from "../../../Services/FetchNodeServices";
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Button } from "@material-ui/core";
import { useStyles } from "./FilterSidebarCss";


export default function FilterSideBar(props) {

    const classes = useStyles()



    const [company, setCompany] = useState([])
    const [fuelType, setFuelType] = useState([])
    const [capacity, setCapacity] = useState([])
    const [filterList, setFilterList] = useState({})
    const [companies, setCompanies] = useState({})
    const [fuelTypes, setFuelTypes] = useState({})
    const [capacityno, setCapacityNo] = useState({})



    const fetchAllCompany = async () => {
    const response = await getData('user/display_all_company')
    setCompany(response.data)
    }

    useEffect(function () {
        fetchAllCompany()
    }, [])

    const showCompany = () => {
        return company.map((item) => {
            return (
                <div style={{position:'relative',left:70}} key={item.companyid}>
                    <FormControlLabel onChange={handleCompany} control={<Checkbox value={item.companyid} />} label={item.companyname} />
                </div>
            )
        }
        )
    }

    const handleCompany = (event) => {
        var segment = companies
        if (event.target.checked)
        segment[event.target.value] = event.target.value
        else
            delete segment[event.target.value]
          var filter=filterList
          filter={...filter,'company':segment}
          setFilterList(filter)
          props.filterOperations(filter)
    }

    const fetchAllFuelType = async () => {
        const response = await getData('user/display_all_fueltype')
        setFuelType(response.data)
    }

    useEffect(function () {
        fetchAllFuelType()
    }, [])

    const showFuelType = () => {
        return fuelType.map((item) => {
            console.log("x",item)
            return (
                <div style={{ position: 'relative', left: -3 }} >
                    <FormControlLabel control={<Checkbox value={item.fueltypeid} />} label={item.fueltypename} onChange={handleFuelType} />
                </div>
            )
        }
        )
    }

    const handleFuelType = (event) => {
    if (event.target.checked)
    fuelTypes[event.target.value] = event.target.value
    else
    delete fuelTypes[event.target.value]
    var filter=filterList
    var filter = { ...filter, 'fuel': fuelTypes }

    setFilterList(filter)
    props.filterOperations(filter)
    }

    const fetchAllCapacity = async () => {
    const response = await getData('user/display_all_capacity')
    setCapacity(response.data)
    }

    useEffect(function(){
    fetchAllCapacity()
    },[])

    const showCapacity = () => {
        return capacity.map((item) => {
            
            return (
                <div style={{ position: 'relative', left: -60 }} >
                    <FormControlLabel control={<Checkbox  value={item.capacityid} />} label={item.capacityno} onChange={handleCapacity} />
                </div>
            )
        })
    }

    const handleCapacity = (event) => {
        if (event.target.checked)
        capacityno[event.target.value] = event.target.value
        else
        delete capacityno[event.target.value]
        var filter=filterList
        var filter = { ...filter, 'capacity': capacityno }
        setFilterList(filter)
        props.filterOperations(filter)
    }

    const handleClear = () => {
    window.location.reload()
    }

    return (
        <div className={classes.mainContainer}>
            <div className={classes.subContainer}>
                <span className={classes.filter}>Filter</span>
                <Button className={classes.clearValue} onClick={handleClear}>Clear All</Button>
            </div>
            <div style={{ display: 'flex' }}>
                <span className={classes.company}>Company</span>
            </div>
            <div style={{ paddingTop: 25 }}>{showCompany()}</div>
            <div style={{ display: 'flex' }}>
                <span className={classes.fuel}>Fuel Type</span>
                <div style={{ paddingTop: 50 }}>{showFuelType()}</div>
            </div>
            <div style={{ display: 'flex' }}>
                <span className={classes.capacity}>Seating Capacity</span>
                <div style={{ paddingTop: 50 }}>{showCapacity()}</div>
            </div>
        </div>
    )
}