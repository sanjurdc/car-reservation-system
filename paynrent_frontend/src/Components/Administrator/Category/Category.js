import { useState } from "react";
import { Grid, TextField, Button, Avatar } from "@mui/material"
import { useStyles } from "./CategoryCss"
import Swal from 'sweetalert2'
import { useNavigate } from "react-router-dom";
import ListAltIcon from '@mui/icons-material/ListAlt';
import { postData } from "../../../Services/FetchNodeServices";

export default function Category() {
  
  const classes = useStyles()
  var navigate=useNavigate()

  var [icon, setIcon] = useState({ filename: '/assets/defaultcar.png', bytes: '' });
  var [categoryName, setCategoryName] = useState('');

  
    const handlePicture = (event) => {
    console.log({ filename: URL.createObjectURL(event.target.files[0]), bytes: event.target.files[0] })
    setIcon({ filename: URL.createObjectURL(event.target.files[0]), bytes: event.target.files[0] })
   }

    const handleSumbit = async () => {
    var formData = new FormData()
    formData.append('categoryname', categoryName)
    formData.append('icon', icon.bytes)
    var response = await postData('category/categorysumbit', formData, true)
    if (response.status) {
      Swal.fire({

        icon: 'success',
        title: 'Category Saved Succesfully',
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
    setCategoryName(" ")
    setIcon({ filename: '/assets/defaultcar.png', bytes: '' })
  }
    
    const handleShowCategoryList=()=>{
    navigate('/dashboard/displayallcategory')
    }

    const clearValues = () => {
    setCategoryName('')
    setIcon({ filename: '/assets/defaultcar.png', icon: '' })
  }

  return (
    <div className={classes.mainContainer}>
      <div className={classes.box}>
        <Grid container spacing={2}>
          <Grid xs={12} item className={classes.headingStyle}>
            <div className={classes.center} >
              <ListAltIcon onClick={handleShowCategoryList} />
             <div style={{marginLeft:8}}>
              Category Interface
            </div>
            </div>
          </Grid>

          <Grid xs={12} item>
            <TextField fullWidth value={categoryName} onChange={(event) => setCategoryName(event.target.value)} label="Category Name"></TextField>
          </Grid>

          <Grid xs={6} item>
            <Button variant="contained" fullWidth component="label">
              Upload
              <input hidden accept="image/*" multiple type="file" onChange={handlePicture} />
            </Button>
          </Grid>

          <Grid xs={6} item className={classes.center}>
            <Avatar
              alt="Category Icon"
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
  )
}