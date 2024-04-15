import { useEffect, useState } from "react";
import { Grid, TextField, Button, Avatar } from "@mui/material"
import { useStyles } from "./SubCategoryCss"
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Swal from 'sweetalert2';
import ListAltIcon from '@mui/icons-material/ListAlt';
import { useNavigate } from "react-router-dom";
import { postData ,getData} from "../../../Services/FetchNodeServices";


export default function SubCategory(){

    const classes = useStyles()
    const navigate=useNavigate()

    const [icon, setIcon] = useState({ filename: '/assets/defaultcar.png', bytes: '' });
    const [categoryId, setCategoryId] = useState('')
    const [subCategoryName, setSubCategoryName] = useState('');
    const [priority, setPriority] = useState('')
    const [categoryList, setCategoryList] = useState([])

    useEffect(function () {
        fetchAllCategory()
    }, [])

         const fetchAllCategory = async () => {
         var result = await getData('category/display_all_category')
         setCategoryList(result.data)
    }

        const fillCategoryDropDown = () =>{
         return categoryList.map((item)=>{ 
         return(
             <MenuItem value={item.categoryid}>{item.categoryname}</MenuItem>
         )
        })}
        
        const handleChange=(event)=>{
        setCategoryId(event.target.value)
        }
          
        const handlePicture = (event) => {
        setIcon({ filename: URL.createObjectURL(event.target.files[0]), bytes: event.target.files[0] })
        }

        const handleSumbit = async () => {
        var formData = new FormData()
        formData.append('categoryid', categoryId)
        formData.append('subcategoryname', subCategoryName)
        formData.append('priority', priority)
        formData.append('icon', icon.bytes)
        var response = await postData('subcategory/subcategorysumbit', formData, true)
        if (response.status) {
            Swal.fire({
                icon: 'success',
                title: 'Sub Category Saved Succesfully',
                showConfirmButton: false,
                timer: 1000
            })
            setCategoryId(" ")
            setSubCategoryName(" ")
            setPriority(" ")
            setIcon({ filename: '/assets/defaultcar.png', bytes: '' })
        }
        else 
         {
            Swal.fire({
            icon: 'error',
            title: 'Oops',
            text: 'Something went wrong!',
         })
        }}
         
        const handleShowSubCategoryList=()=>{
        navigate('/dashboard/displayallsubcategory')
        }

        const clearValues = () => {
        setSubCategoryName('')
        setPriority('')
        setIcon({ filename: '/assets/defaultcar.png', icon: '' })
        }

    return (
        <div className={classes.mainContainer}>
            <div className={classes.box}>
                <Grid container spacing={2}>
                    <Grid xs={12} item className={classes.headingStyle}>
                    <div className={classes.leftcenter} >
                      <ListAltIcon onClick={handleShowSubCategoryList} /> 
                        <div style={{marginLeft:8}} >
                           Sub Category
                        </div>
                    </div>
                </Grid>

                <Grid xs={12} item>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Select Category</InputLabel>
                            <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={categoryId}
                            label="Select Category"
                            onChange={handleChange}
                            >
                                { fillCategoryDropDown()}
                           </Select>
                    </FormControl>
                </Grid>

                <Grid xs={12} item>
                    <TextField value={subCategoryName} fullWidth onChange={(event) => setSubCategoryName(event.target.value)} label="Sub Category Name"></TextField>
                </Grid>

                <Grid xs={12} item>
                    <TextField value={priority} fullWidth onChange={(event) => setPriority(event.target.value)} label="Priority"></TextField>
                </Grid>

                <Grid xs={6} item>
                    <Button variant="contained" fullWidth component="label">
                         Upload
                        <input hidden accept="image/*" multiple type="file" onChange={handlePicture} />
                    </Button>
                </Grid>

                <Grid xs={6} item className={classes.center}>
                    <Avatar
                    alt="Sub Category Icon"
                    value={icon}
                    src={icon.filename}
                    variant="rounded"
                    sx={{ width: 70, height: 50 }}
                    />
                </Grid>

                <Grid xs={6} item>
                    <Button fullWidth variant="contained" onClick={handleSumbit} >Submit</Button>
                </Grid>

                <Grid xs={6} item>
                    <Button fullWidth variant="contained" onClick={clearValues}>Reset</Button>
                </Grid>
            </Grid>
        </div>
    </div>
)}