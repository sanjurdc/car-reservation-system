import MaterialTable from '@material-table/core';
import { useState,useEffect } from 'react';
import { getData,ServerURL,postData,isValidAuth } from '../../../Services/FetchNodeServices';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Button from '@mui/material/Button';
import { Grid,TextField ,Avatar} from '@mui/material';
import Swal from 'sweetalert2'
import { useNavigate } from "react-router-dom";
import { useStyles } from './DisplayAllWhypnrCss';

export default function DisplayAllWhypnr(){

    const classes=useStyles()
    const navigate=useNavigate()

    const [whypnr,setWhypnr]=useState([])
    const [whypnrId,setWhypnrId]=useState('')
    const [title,setTitle]=useState('')
    const [description,setDescription]=useState('')
    const [icon,setIcon]=useState({filename:'assets/car.png',bytes:''})
    const [prevIcon,setPrevIcon]=useState('')
    const [oldIcon,setOldIcon]=useState('')
    const [open,setOpen]=useState(false)
    const [buttonStatus,setButtonStatus]=useState({ upload: true })
    
    const checkAuth=async()=>{
    var result=await isValidAuth()
    alert(JSON.stringify(result))
    if(result.auth)
    {
    { fetchAllWhypnr() }
    }
    else
    {
    Swal.fire({
    icon: 'error',
    title: 'Oops',
    text: result.message,
    })
    }}

    useEffect(function(){
    // fetchAllWhypnr()
    checkAuth()
    },[])

    const fetchAllWhypnr=async()=>{
    const response=await getData('whypnr/display_all_whypnr')
    setWhypnr(response.data)
    }

    function showWhyPnr() {
    return (
          <MaterialTable
            title="List of Why PaynRent"
            columns={[
              { title: 'Id', field: 'whypnrid' },
              { title: 'Title', field: 'title' },
              { title: 'Description', field: 'description' },
              { title: 'Picture', field: 'image' }
            ]}
            data={whypnr}
            actions={[
              {
                icon: 'edit',
                tooltip: 'Edit ',
                onClick: (rowData) =>  handleSetDataForDialog(rowData) 
              },
              {
                icon: 'add',
                tooltip: 'Add Category',
                isFreeAction: true,
                onClick: () => navigate('/dashboard/whypnr')
              }
            ]}
          />
        )}

    const handleClose=()=>{
    setOpen(false)
    }

    const handleSetDataForDialog=(rowData)=>{
      setWhypnrId(rowData.whypnrid)
      setTitle(rowData.title)
      setDescription(rowData.description)
      setIcon({filename:`${ServerURL}/images/${rowData.image}`,bytes:''})
      setPrevIcon(`${ServerURL}/images/${rowData.image}`)
      setOldIcon(rowData.image)
      setOpen(true)
      }

     
    const handleDelete = async () => {
    var body = { whypnrid: whypnrId, oldicon: oldIcon }
    var response = await postData('whypnr/delete_data', body, false)
    if (response.status)
         {
          Swal.fire({
            icon: 'success',
            title: 'Record Deleted Succesfully',
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
        fetchAllWhypnr()
    }

    const handleEditData = async () => {
    var body = { title: title, description: description,whypnrid:whypnrId }
    var response = await postData('whypnr/edit_data', body)
    if (response.status) {
    Swal.fire({
    
            icon: 'success',
            title: 'Record Saved Succesfully',
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
        fetchAllWhypnr()
      }
 
    const handleSavePicture = async () => {
    const formData = new FormData()
          formData.append('whypnrid', whypnrId)
          formData.append('oldicon', oldIcon)
          formData.append('icon', icon.bytes)
    var response = await postData('whypnr/edit_picture', formData, true)
    if (response.status) {
          Swal.fire({
    
            icon: 'success',
            title: 'Record Saved Succesfully',
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
        fetchAllWhypnr()
    }

    const handlePicture = (event) => {
    setIcon({ filename: URL.createObjectURL(event.target.files[0]), bytes: event.target.files[0] })
    setButtonStatus({ upload: false })
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

    const handleDiscard = () => {
    setIcon({ filename: prevIcon, bytes: '' })
    setButtonStatus({ upload: true })
    }

    const showDialog=()=>{
 
     return(
  
      <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      >
     <DialogContent>
         <div className={classes.mainContainer}>
            <div className={classes.box}>
               <Grid container spacing={2}>
                     <Grid container xs={12} className={classes.headingStyle}>
               </Grid>

               <Grid item xs={12}>
                   <TextField fullWidth value={title} label="Title" onChange={(event) => setTitle(event.target.value)} />
               </Grid>
         
               <Grid item xs={12}>
                  <TextField fullWidth value={description} label="Description" onChange={(event) => setDescription(event.target.value)} />
               </Grid>

               <Grid item xs={6} style={{marginTop:15}}>
                  {showHidePictureButtons()}
                </Grid>

               <Grid xs={6} item className={classes.center}>
                  <Avatar
                   alt="Whypnr Icon"
                   src={icon.filename}
                   variant="rounded"
                   sx={{ width: 100, height: 60 }}
                  />
               </Grid>

               <Grid xs={6} item>
                  <Button fullWidth variant="contained" onClick={handleEditData} >Update</Button>
               </Grid>

               <Grid xs={6} item>
                  <Button fullWidth variant="contained" onClick={handleDelete} >Delete</Button>
               </Grid>
            </Grid>
          </div>
       </div>
    </DialogContent>
    <DialogActions>
        <Button onClick={handleClose} autoFocus>
          Close
        </Button>
    </DialogActions>
  </Dialog>
)}

    return(
        <div>
            <div>
               {showWhyPnr()}
            </div>
               {showDialog()}
        </div>
    )
}