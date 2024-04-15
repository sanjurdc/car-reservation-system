import MaterialTable from '@material-table/core';
import { Grid, TextField, Button, Avatar } from "@mui/material"
import { useStyles } from "./DisplayAllSubCategoryCss"
import { useState, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { getData, postData, ServerURL,isValidAuth } from "../../../Services/FetchNodeServices";
import Swal from 'sweetalert2'
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { useNavigate } from "react-router-dom";

export default function DisplayAllSubCategory(){

  const navigate=useNavigate()
  const classes = useStyles()
  
 
  const [subcategory, setSubCategory] = useState([])
  const [open, setOpen] = useState(false)
  const [icon, setIcon] = useState({ filename: '/assets/defaultcar.png', bytes: '' });
  const [prevIcon, setPrevIcon] = useState('')
  const [oldIcon, setOldIcon] = useState('')
  const [categoryName, setCategoryName] = useState('');
  const [subCategoryName, setSubCategoryName] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [subCategoryId, setSubCategoryId] = useState('');
  const [priority, setPriority] = useState('')
  const [buttonStatus, setButtonStatus] = useState({ upload: true })
  const [categoryList, setCategoryList] = useState([])        // false used for button don't show
 
     const fetchAllSubCategory = async () => {
     var result = await getData('subcategory/display_all_subcategory')
     setSubCategory(result.data)
     }

     const checkAuth=async()=>{
     var result=await isValidAuth()
     if(result.auth)
      {
         { fetchAllSubCategory() }
      }
      else
      {
        Swal.fire({
          icon: 'error',
          title: 'Oops',
          text: result.message,
       })
      }
  }

  useEffect(function () {
  //  fetchAllSubCategory()
    checkAuth()
  }, [])

   const handleSetDataForDialog = (rowData) => {
    fetchAllCategory(rowData.categoryid)
    setCategoryId(rowData.categoryid)
    setSubCategoryId(rowData.subcategoryid)
    setCategoryName(rowData.categoryname)
    setSubCategoryName(rowData.subcategoryname)
    setPriority(rowData.priority)
    setOldIcon(rowData.icon)
    setIcon({ filename: `${ServerURL}/images/${rowData.icon}`, bytes: '' })
    setPrevIcon(`${ServerURL}/images/${rowData.icon}`)
    setOpen(true)
  }

    //  For Fill Category  //     
    
    useEffect(function () {
    fetchAllCategory()             // for fill Category DropDown
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

       //  End Fill Category  //

   const handleSavePicture = async () => {
    var formData = new FormData()
    formData.append('subcategoryid', subCategoryId)
    formData.append('oldicon', oldIcon)
    formData.append('icon', icon.bytes)
    var response = await postData('subcategory/edit_picture', formData, true)
    if (response.status) {
      Swal.fire({
        icon: 'success',
        title: 'Icon Saved Succesfully',
        showConfirmButton: false,
        timer: 2500
      })
    }
    else {
      Swal.fire({
        icon: 'error',
        title: 'Oops',
        text: 'Something went wrong!',
   })}
    setButtonStatus({ upload: true })
    setOpen(false)
    fetchAllSubCategory()
  }

  const handleEditData = async () => {
    var body = { subcategoryname: subCategoryName, priority:priority, subcategoryid: subCategoryId }
    alert(priority)
    var response = await postData('subcategory/edit_data', body)
    if (response.status) {
      Swal.fire({
        icon: 'success',
        title: 'Category Saved Succesfully',
        showConfirmButton: false,
        timer: 2500
      })
    }
    else {
      Swal.fire({
        icon: 'error',
        title: 'Oops',
        text: 'Something went wrong!',
  })}
    setOpen(false)
    fetchAllSubCategory()
  }

   const handleDelete = async () => {
    var body = { subcategoryid: subCategoryId, oldicon: oldIcon,subcategoryname:subCategoryName,priority:priority }
    var response = await postData('subcategory/delete_data', body, false)
    if (response.status) {
      Swal.fire({
        icon: 'success',
        title: 'SubCategory Deleted Succesfully',
        showConfirmButton: false,
        timer: 2500
      })
    }
    else {
      Swal.fire({
        icon: 'error',
        title: 'Oops',
        text: 'Something went wrong!',
      })
    }
    setButtonStatus({ upload: true })
    setOpen(false)
    fetchAllSubCategory()
  }


   const handleDiscard = () => {
    setIcon({ filename: prevIcon, bytes: '' })
    setButtonStatus({ upload: true })
   }

   const showHidePictureButtons = () => {
    return (<div>
      {buttonStatus.upload ? <><Button variant="contained" fullWidth component="label">
          Upload
        <input onChange={handlePicture} hidden accept="image/*" multiple type="file" />
      </Button></> : <>
        <Button onClick={handleSavePicture} variant="contained" color="primary" >Save</Button >  <Button onClick={handleDiscard} variant="contained" color="secondary" Padding='10' >Discard</Button></>}
    </div>
    )}

  
   function displayAllSubCategories() {
    return (
      <MaterialTable
        title="List Of SubCategories"
        columns={[
          { title: 'SubCategory Id', field: 'subcategoryid' },
          { title: 'Category Name', field: 'categoryname' },
          { title: 'SubCategory Name', field: 'subcategoryname' },
          { title: 'Priority', field: 'priority' },
          { title: 'Icon', field: 'icon', render: (rowData) => <Avatar src={`${ServerURL}/images/${rowData.icon}`} style={{ width: 55, height: 55 }} variant="rounded"></Avatar> },
      ]}
        data={subcategory}
        actions={[
          {
            icon: 'edit',
            tooltip: 'Edit SubCategory',
            onClick: (event, rowData) => handleSetDataForDialog(rowData)
          },
           {
            icon: 'add',
            tooltip: 'Add SubCategory',
            isFreeAction: true,
            onClick: (event) => navigate('/dashboard/subcategory')
          }
        ]}
      />
    )}

   const handleClose = () => {
    setOpen(false)
  }

    const handlePicture = (event) => {
      setIcon({ filename: URL.createObjectURL(event.target.files[0]), bytes: event.target.files[0] })
      setButtonStatus({ upload: false })
   }

  const showDialog = () => {
    return (
      <div>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
        <DialogContent>
           <div className={classes.dialogbox}>
              <Grid container spacing={2}>
                <Grid xs={12} item className={classes.headingStyle}>
                  SubCategory
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

                    <Grid item xs={6}>
                       {showHidePictureButtons()}
                    </Grid>

                    <Grid xs={6} item className={classes.center}>
                        <Avatar
                         alt="Category Icon"
                         src={icon.filename}
                         variant="rounded"
                         sx={{ width: 70, height: 50 }}
                        />
                    </Grid>

                    <Grid xs={6} item>
                       <Button onClick={handleEditData} fullWidth variant="contained"  >Edit</Button>
                    </Grid>

                    <Grid xs={6} item>
                      <Button onClick={handleDelete} fullWidth variant="contained" >Delete</Button>
                    </Grid>
              </Grid>
            </div>
          </DialogContent>

          <DialogActions>
              <Button onClick={handleClose} autoFocus>
                 Close
              </Button>
          </DialogActions>
      </Dialog>
    </div>
  )}

  return (
    <div className={classes.mainContainer}>
       <div className={classes.box}>
           {displayAllSubCategories()}
       </div>
          {showDialog()}
    </div>
  )
}