import { TextField ,Grid} from "@mui/material";
import { useState } from "react";
import { useStyles } from "./OfferCss";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import { postData } from "../../../Services/FetchNodeServices";
import Swal from 'sweetalert2'
import { useNavigate } from "react-router-dom";
import ListAltIcon from '@mui/icons-material/ListAlt';


export default function Offer(){

    const classes = useStyles()
    const navigate=useNavigate() 

    const [icon,setIcon]=useState({ filename: '/assets/defaultcar.png', bytes: '' })
    const [title,setTitle]=useState('')
    const [description,setDescription]=useState('')

   
      const handlePicture = (event) => {
            setIcon({ filename: URL.createObjectURL(event.target.files[0]), bytes: event.target.files[0] })
      }
        
      const handleSubmit=async()=>{
        var formData=new FormData()
        formData.append('title',title)
        formData.append('description',description)
        formData.append('icon',icon.bytes)
         var response=await postData('offer/submitdata',formData,true)
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
  } 

      const clearValues = () => {
         setTitle('')
        setDescription('')
        setIcon({ filename: '/assets/defaultcar.png', icon: '' })
      }
           
      const handleShowOfferList=()=>{
        navigate('/dashboard/displayalloffer')
        }

    return(
        <div className={classes.mainContainer}>
          <div className={classes.box}>
            <Grid container spacing={2}>
                <Grid container xs={12} className={classes.headingStyle}>
                  <div className={classes.altcenter} >
                      <ListAltIcon  onClick={handleShowOfferList} />
                         <span style={{ marginLeft: 8 }}>
                             Offer Interface
                         </span>
                  </div>
                </Grid>

                <Grid item xs={12}>
                    <TextField fullWidth value={title} label="Title" onChange={(event) => setTitle(event.target.value)} />
                </Grid>
         
                <Grid item xs={12}>
                   <TextField fullWidth value={description} label="Description" onChange={(event) => setDescription(event.target.value)} />
                </Grid>

                <Grid xs={6} item>
                   <Button variant="contained" fullWidth component="label" style={{marginTop:12}}>
                        Upload
                        <input hidden accept="image/*" multiple type="file" onChange={handlePicture} />
                   </Button>
                </Grid>

                <Grid xs={6} item className={classes.center}>
                   <Avatar
                    alt="Featured Icon"
                    src={icon.filename}
                    variant="rounded"
                    sx={{ width: 100, height: 60 }}
                    />
                </Grid>

                <Grid xs={6} item>
                    <Button fullWidth variant="contained" onClick={handleSubmit} >Submit</Button>
                </Grid>

                <Grid xs={6} item>
                    <Button fullWidth variant="contained" onClick={clearValues}>Reset</Button>
                </Grid>
            </Grid>
         </div>
      </div>
   )}