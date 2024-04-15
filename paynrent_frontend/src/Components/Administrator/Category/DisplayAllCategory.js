import MaterialTable from '@material-table/core';
import { Grid, TextField, Button, Avatar } from "@mui/material"
import { useStyles } from "./DisplayAllCategoryCss"
import { useState, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { getData, isValidAuth, postData, ServerURL } from "../../../Services/FetchNodeServices";

import Swal from 'sweetalert2'
import { useNavigate } from "react-router-dom";

export default function DisplayAllCategory() {

  var navigate=useNavigate()
  var classes = useStyles()

  const [category, setCategory] = useState([])
  const [open, setOpen] = useState(false)
  const [icon, setIcon] = useState({ filename: '/assets/defaultcar.png', bytes: '' });
  const [prevIcon, setPrevIcon] = useState('')
  const [oldIcon, setOldIcon] = useState('')
  const [categoryName, setCategoryName] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [buttonStatus, setButtonStatus] = useState({ upload: true })        // false used for button don't show
 
    const fetchAllCategory = async () => {
    var result = await getData('category/display_all_category')
    setCategory(result.data)
  }

    const checkAuth=async()=>{
        var result=await isValidAuth()
        if(result.auth)
        {
           { fetchAllCategory() }
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
   fetchAllCategory()
  }, [])

  const handleSetDataForDialog = (rowData) => {
    setCategoryId(rowData.categoryid)
    setCategoryName(rowData.categoryname)
    setOldIcon(rowData.icon)
    setIcon({ filename: `${ServerURL}/images/${rowData.icon}`, bytes: '' })
    setPrevIcon(`${ServerURL}/images/${rowData.icon}`)
    setOpen(true)
  }

  const handleSavePicture = async () => {
    var formData = new FormData()
    formData.append('categoryid', categoryId)
    formData.append('oldicon', oldIcon)
    formData.append('icon', icon.bytes)
    var response = await postData('category/edit_picture', formData, true)
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

      })
    }
    setButtonStatus({ upload: true })
    setOpen(false)
    fetchAllCategory()
  }

  const handleEditData = async () => {
    var body = { categoryname: categoryName, categoryid: categoryId }
    var response = await postData('category/edit_data', body, true)
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

      })
    }
    setOpen(false)
    fetchAllCategory()
  }

  const handleDelete = async () => {
    var body = { categoryid: categoryId, oldicon: oldIcon }
    var response = await postData('category/delete_data', body, false)
    if (response.status) {
      Swal.fire({
        icon: 'success',
        title: 'Category Deleted Succesfully',
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
    fetchAllCategory()
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
    )
  }

  function displayCategories() {
    return (
      <MaterialTable
        title="List Of Categories"
        columns={[
          { title: 'Category Id', field: 'categoryid' },
          { title: 'Category Name', field: 'categoryname' },
          { title: 'Icon', field: 'icon', render: (rowData) => <Avatar src={`${ServerURL}/images/${rowData.icon}`} style={{ width: 55, height: 55 }} variant="rounded"></Avatar> },

        ]}
        data={category}
        actions={[
          {
            icon: 'edit',
            tooltip: 'Edit Category',
            onClick: (event, rowData) => handleSetDataForDialog(rowData)
          },
           {
            icon: 'add',
            tooltip: 'Add Category',
            isFreeAction: true,
            onClick: () => navigate('/dashboard/category')
          }
        ]}
      />
    )
  }

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
                  Category
                </Grid>

                <Grid xs={12} item>
                  <TextField value={categoryName} fullWidth onChange={(event) => setCategoryName(event.target.value)} label="Category Name"></TextField>
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
                  <Button onClick={handleEditData} fullWidth variant="contained"  >Update</Button>
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
        {displayCategories()}
      </div>
      {showDialog()}
    </div>
  )
}