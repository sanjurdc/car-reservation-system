import { useEffect, useState } from "react";
import { Grid, TextField, Button, Avatar } from "@mui/material"
import { useStyles } from "./CompanyCss"
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Swal from 'sweetalert2'
import { postData, getData, ServerURL } from "../../../Services/FetchNodeServices";
import ListAltIcon from '@mui/icons-material/ListAlt';
import { useNavigate } from "react-router-dom";


export default function Company(){

  const classes = useStyles()
  const navigate=useNavigate()

  const [icon, setIcon] = useState({ filename: '/assets/defaultcar.png', bytes: '' });
  const [categoryId, setCategoryId] = useState([])
  const [subCategoryId, setSubCategoryId] = useState([]);
  const [companyName, setCompanyName] = useState('')
  const [categoryList, setCategoryList] = useState([])
  const [subCategoryList, setSubCategoryList] = useState([])
   

  //   Set  Category Data  //

  useEffect(function () {
    fetchAllCategory()
  }, [])

  const fetchAllCategory = async () => {
    var result = await getData('category/display_all_category')
    setCategoryList(result.data)
  }

  const fillCategoryDropDown = () => {
    return categoryList.map((item) => {
      return (
        <MenuItem value={item.categoryid}>{item.categoryname}</MenuItem>
      )
    })
  }

  const handleChange = (event) => {
    setCategoryId(event.target.value)
    fetchAllSubCategoryByCategory(event.target.value)

  }

  //   Set Sub Category Data  //

  const fetchAllSubCategoryByCategory = async (category_id) => {
    var body = { categoryid: category_id }
    var response = await postData('subcategory/fetch_all_subcategory_by_category', body)
    setSubCategoryList(response.result)
  }

  const fillSubCategoryDropDown = () => {
    return subCategoryList.map((item) => {
      return (
        <MenuItem value={item.subcategoryid}>{item.subcategoryname}</MenuItem>
      )
    })
  }

    const handleChangeSubCategory = (event) => {
    setSubCategoryId(event.target.value)
    }

  //  End Sub Category   //

  // Submit Button  //

  const handleSumbit = async () => {
    var formData = new FormData()
    formData.append('categoryid', categoryId)
    formData.append('subcategoryid', subCategoryId)
    formData.append('companyname', companyName)
    formData.append('icon', icon.bytes)
    var response = await postData('company/companysubmit', formData,true)
    if (response.status) {
      Swal.fire({
        icon: 'success',
        title: 'Company Saved Succesfully',
        showConfirmButton: false,
        timer: 2500
      })
      setCategoryId(" ")
      setSubCategoryId(" ")
      setCompanyName(" ")
      setIcon({ filename: '/assets/defaultcar.png', bytes: '' })
    }
    else {
      Swal.fire({
        icon: 'error',
        title: 'Oops',
        text: 'Something went wrong!',
      })
    }
  }

  

  //    Reset Button  //

  const clearValues = () => {
    setCategoryId('')
    setSubCategoryId('')
    setCompanyName('')
    setIcon({ filename: '/assets/defaultcar.png', icon: '' })

  }

 
   const handleShowCompanyList=()=>{
    navigate('/dashboard/displayallcompany')
    }
     
    // Upload Picture  //
    
    const handlePicture = (event) => {
      setIcon({ filename: URL.createObjectURL(event.target.files[0]), bytes: event.target.files[0] })
   }
 
     
   
  return (
    <div className={classes.mainContainer}>
      <div className={classes.box}>
        <Grid container spacing={2}>
          <Grid xs={12} item className={classes.headingStyle}>
            <div className={classes.leftCenter} >
              <ListAltIcon onClick={handleShowCompanyList} />
              <div style={{ marginLeft: 8 }}>
                Company Interface
              </div>
            </div>
          </Grid>

          <Grid xs={6} item>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Select Category</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={categoryId}
                label="Select Category"
                onChange={handleChange}
              >
                {fillCategoryDropDown()}
              </Select>
            </FormControl>
          </Grid>

          <Grid xs={6} item >
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Select SubCategory</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={subCategoryId}
                label="Select SubCategory"
                onChange={handleChangeSubCategory}
              >
                {fillSubCategoryDropDown()}
              </Select>
            </FormControl>
          </Grid>

          <Grid xs={12} item style={{ paddingTop: 10 }}>
            <TextField value={companyName} fullWidth onChange={(event) => setCompanyName(event.target.value)} label="Company Name"></TextField>
          </Grid>

          <Grid xs={6} item style={{ paddingTop: 20 }}>
              <Button variant="contained" fullWidth component="label">
                            Upload
               <input hidden accept="image/*" multiple type="file"  onChange={handlePicture} />
              </Button>
          </Grid>

          <Grid xs={6} item className={classes.center}>
             <Avatar
             alt="Company Icon"
             value={icon}
             src={icon.filename}
            variant="rounded"
            sx={{ width: 100, height: 50 }}
            />
          </Grid>

          <Grid xs={6} item>
             <Button onClick={handleSumbit} fullWidth variant="contained" >Submit</Button>
          </Grid>

          <Grid xs={6} item>
            <Button onClick={clearValues} fullWidth variant="contained" >Reset</Button>
          </Grid>
        </Grid>
      </div>
    </div>
  )}


