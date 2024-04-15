import { useEffect, useState } from "react";
import MaterialTable from '@material-table/core';
import { Button,Grid,TextField } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import { getData ,ServerURL} from "../../../Services/FetchNodeServices";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { useNavigate } from "react-router-dom";
import { useStyles } from './DisplayAllFeaturedCss'
import {postData,isValidAuth } from "../../../Services/FetchNodeServices";
import Swal from 'sweetalert2'

export default function DisplayAllFeatured(){

    const classes=useStyles()
    var navigate=useNavigate()

    const [featured,setFeatured]=useState([])
    const [link,setLink]=useState('')
    const [prevIcon,setPrevIcon]=useState('')
    const [oldIcon,setOldIcon]=useState('')
    const [featuredId,setFeaturedId]=useState('')
    const [buttonStatus,setButtonStatus]=useState({ upload: true })
    const [open,setOpen]=useState(false)
    const [icon,setIcon]=useState({ filename: '/assets/defaultcar.png', bytes: '' })

  /*  const checkAuth=async()=>{
      var result=await isValidAuth()
           if(result.auth)
      {
         { fetchAllFeatured() }
      }
      else
      {
        Swal.fire({
          icon: 'error',
          title: 'Oops',
          text: result.message,
       })
      }
  } */

   useEffect(function(){
   fetchAllFeatured()
   //  checkAuth()
   },[])

     const fetchAllFeatured=async()=>{
        var response=await getData('featured/display_all_featured')
        setFeatured(response.data)
      }
    
       const handleSetDataForDialog=(rowData)=>{
        setFeaturedId(rowData.featuredid)
        setLink(rowData.link)
        setIcon({ filename: `${ServerURL}/images/${rowData.image}`, bytes: '' })
        setPrevIcon(`${ServerURL}/images/${rowData.image}`)
        setOldIcon(rowData.image)
        setOpen(true)
      }

       const handleClose=()=>{
        setOpen(false)
       }

    function showTable() {
        return (
          <MaterialTable
            title="List of Featured"
            columns={[
              { title: 'Featured Id', field: 'featuredid' },
              { title: 'Link', field: 'link' },
              {
                title: 'Picture',
                field: 'image',
                render: (rowData) => <Avatar src={`${ServerURL}/images/${rowData.image}`} style={{ width: 100, height: 60 }} variant="rounded"></Avatar> 
              },
            ]}
            data={featured}
            
            actions={[
              {
                icon: 'edit',
                tooltip: 'Offer Edit',
                onClick: (rowData) => handleSetDataForDialog(rowData)
              },
              {
                icon: 'add',
                tooltip: 'Add Category',
                isFreeAction: true,
                onClick: () => navigate('/dashboard/featured')
              }
              
            ]}
            options={{
              actionsColumnIndex: -1
            }}
          />
        )
      }

      
      const handleDelete = async () => {
        var body = { featuredid: featuredId, oldicon: oldIcon }
        var response = await postData('featured/delete_data', body, false)
        
        if (response.status)
         {
          Swal.fire({
            icon: 'success',
            title: 'Record Deleted Succesfully',
            showConfirmButton: false,
            timer: 1000
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
        fetchAllFeatured()
    }

    const handleEditData = async () => {
        var body = { link: link, featuredid:featuredId }
        var response = await postData('featured/edit_data', body)
        if (response.status) {
          Swal.fire({
  
            icon: 'success',
            title: 'Record Saved Succesfully',
            showConfirmButton: false,
            timer: 1000
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
        fetchAllFeatured()
      }
 
      

      const handleSavePicture = async () => {
        var formData = new FormData()
        formData.append('featuredid', featuredId)
        formData.append('oldicon', oldIcon)
        formData.append('icon', icon.bytes)
        var response = await postData('featured/edit_picture', formData, true)
       
          if (response.status) {
          Swal.fire({
    
            icon: 'success',
            title: 'Record Saved Succesfully',
            showConfirmButton: false,
            timer: 1000
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
        fetchAllFeatured()
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
        )
      }

      const handleDiscard = () => {
        setIcon({ filename: prevIcon, bytes: '' })
        setButtonStatus({ upload: true })
         }

      const showDialog=()=>{
      return(
            <div>
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
                        <Grid> 
                           <div style={{paddingLeft:15,paddingTop:10 ,fontSize:20,fontWeight:'bold'}}>Featured</div>
                        </Grid>

                       <Grid item xs={12}>
                               <TextField fullWidth value={link} label="Link" onChange={(event) => setLink(event.target.value)} />
                       </Grid>
         
                       <Grid item xs={6} style={{marginTop:15}}>
                         {showHidePictureButtons()}
                       </Grid>

                        <Grid xs={6} item className={classes.center}>
                               <Avatar
                               alt="Offer Icon"
                               src={icon.filename}
                               variant="rounded"
                               sx={{ width: 130, height: 60 }}
                               />
                        </Grid>

                        <Grid xs={6} item>
                           <Button fullWidth variant="contained" onClick={handleEditData} >Update</Button>
                        </Grid>

                        <Grid xs={6} item>
                           <Button fullWidth variant="contained" onClick={handleDelete}>Delete</Button>
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
      </div>
   )}

      return(
           <div className={classes.mainContainer}>
              <div className={classes.box}>
                 {showTable()}
              </div>
                 {showDialog()}
            </div>
    )}