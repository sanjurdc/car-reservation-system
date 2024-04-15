import { TextField ,Grid} from "@mui/material";
import { useState } from "react";
import { useStyles } from "./FeaturedCss";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import { postData } from "../../../Services/FetchNodeServices";
import Swal from 'sweetalert2'
import ListAltIcon from '@mui/icons-material/ListAlt';
import { useNavigate } from "react-router-dom";

export default function Featured(){

    const classes = useStyles()
    const navigate=useNavigate()

    const [icon,setIcon]=useState({ filename: '/assets/defaultcar.png', bytes: '' })
    const [link,setLink]=useState('')

   
    const handlePicture = (event) => {
        setIcon({ filename: URL.createObjectURL(event.target.files[0]), bytes: event.target.files[0] })
      }
        
      const handleSubmit=async()=>{
        var formData=new FormData()
        formData.append('link',link)
        formData.append('icon',icon.bytes)
         var response=await postData('featured/submitdata',formData,true)
         if (response.status) {
            Swal.fire({
      
              icon: 'success',
              title: 'Record Saved Succesfully',
              showConfirmButton: false,
              timer: 1500
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

      const handleShowModelList=()=>{
        navigate('/dashboard/displayallfeatured')
      }
  
      const clearValues = () => {
      setLink('')
        setIcon({ filename: '/assets/defaultcar.png', icon: '' })
      }

    return(
        <div className={classes.mainContainer}>
            <div className={classes.box}>
                <Grid container spacing={2}>
                   <Grid>   
                  <div className={classes.altcenter} >
             { <ListAltIcon onClick={handleShowModelList} />}
             <div style={{marginLeft:8,fontWeight:'bold'}}>
              Model Interface
            </div>
            </div>
            </Grid>

         <Grid item xs={12}>
             <TextField fullWidth value={link} label="Link" onChange={(event) => setLink(event.target.value)} />
        </Grid>

          <Grid xs={6} item>
            <Button variant="contained" fullWidth component="label" style={{marginTop:7}}>
              Upload
              <input hidden accept="image/*" multiple type="file" onChange={handlePicture} />
            </Button>
          </Grid>

          <Grid xs={6} item className={classes.center}>
            <Avatar
              alt="Featured Icon"
              src={icon.filename}
              variant="rounded"
              sx={{ width: 100, height: 50 }}
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