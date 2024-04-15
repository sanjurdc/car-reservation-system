import { useStyles } from "./DisplayAllVehicleCss";
import { Grid,TextField,Avatar,Button } from '@mui/material'
import MaterialTable from '@material-table/core';
import { useEffect, useState } from "react";
import { getData,postData,ServerURL,isValidAuth } from "../../../Services/FetchNodeServices";
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Swal from 'sweetalert2'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useNavigate } from "react-router-dom";
import FormLabel from '@mui/material/FormLabel';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';
  export default function DisplayAllVehicle(){

  const navigate=useNavigate()
  const classes=useStyles()
  const [categoryId,setCategoryId]=useState('')
  const [subCategoryId,setSubCategoryId]=useState('')
  const [companyId,setCompanyId]=useState('')
  const [modelId,setModelId]=useState()
  const [vehicleId,setVehicleId]=useState('')
  const [vendor,setVendor]=useState('')
  const [registrationNo,setRegistrationNo]=useState('')
  const [color,setColor]=useState('')
  const [fuelType,setFuelType]=useState('')
  const [average,setAverage]=useState('')
  const [capacity,setCapacity]=useState([])
  const [feature,setFeature]=useState('')
  const [remark,setRemark]=useState('')
  const [stat,setStat]=useState('')
  const [icon,setIcon]=useState({filename: '/assets/defaultcar.png', bytes: '' })
  const [oldIcon,setOldIcon]=useState('')
  const [prevIcon,setPrevIcon]=useState('')
  const [open,setOpen]=useState(false)
  const [categoryList,setCategoryList]=useState([])
  const [subCategoryList,setSubCategoryList]=useState([])
  const [companyList,setCompanyList]=useState([])
  const [modelList,setModelList]=useState([])
  const [vehicle,setVehicle]=useState([])
  const[fuelTypeId,setFuelTypeId]=useState('')
  const [fuelTypeList,setFuelTypeList]=useState([])
  const [capacityList,setCapacityList]=useState([])
  const [fare,setFare]=useState('')
  const [buttonStatus, setButtonStatus] = useState({ upload: true }) 
  const [ratings,setRatings]=useState('')
  const [capacityId,setCapacityId]=useState('')
  
 
   //  Fetch Vehicle //

     useEffect(function(){
     fetchAllVehicle()
     },[])

   const fetchAllVehicle=async()=>{
   var response=await getData('vehicle/display_all_vehicle')
   console.log(response.data)
       setVehicle(response.data)
   }
 

  const handleSetDataForDialog=(rowData)=>{
  fetchAllCategory()
  fetchAllSubCategory()
  fetchAllCompany()
  fetchAllModel()
  fetchAllFuelType()
  setVehicleId(rowData.vehicleid)
  setCategoryId(rowData.categoryid)
  setSubCategoryId(rowData.subcategoryid)
  setCompanyId(rowData.companyid)
  setModelId(rowData.modelid)
  setVendor(rowData.vendor)
  setRegistrationNo(rowData.registrationno)
  setColor(rowData.color)
  setFuelTypeId(rowData.fueltypeid)
  setAverage(rowData.average)
  setCapacityId(rowData.capacityid)
  setFeature(rowData.feature)
  setRemark(rowData.remark) 
  setStat(rowData.stat)
  setRatings(rowData.ratings)
  setFare(rowData.fare)
  setOldIcon(rowData.icon)
  setIcon({filename:`${ServerURL}/images/${rowData.icon}`,bytes:''})
  setPrevIcon(`${ServerURL}/images/${rowData.icon}`)
   setOpen(true)
  }
      
           //   Hide Picture Button  //

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

   
 function DisplayAllVehicle() {
    return (
      <MaterialTable
        title="List of Vehicle"
        columns={[
          { title: 'Vehicle Id', render:(rowData)=><div>{rowData.vehicleid}<br/>{rowData.vendor}<br/></div> },
          { title: 'Category', render:(rowData)=><div>{rowData.categoryname}<br/>{rowData.subcategoryname}<br/></div> },
          { title: 'Company', render:(rowData)=><div>{rowData.companyname}<br/>{rowData.modelname}<br/></div>},
          { title: 'Color', render:(rowData)=><div>{rowData.color}<br/>{rowData.registrationno}<br/></div>},
          { title: 'Fuel', render:(rowData)=><div>{rowData.fueltypename}<br/>{rowData.average}<br/></div>},
          { title: 'Feature', render:(rowData)=><div>{rowData.feature}<br/>{rowData.capacityno}<br/></div>},
          { title: 'Status', render:(rowData)=><div>{rowData.stat}<br/>{rowData.remark}<br/>{rowData.ratings}<br/></div>},
          { title: 'Picture', field: 'icon', render: (rowData) => <Avatar src={`${ServerURL}/images/${rowData.icon}`} style={{ width: 95, height: 55 }} variant="rounded"></Avatar>  },
        ]}
        data={vehicle}        
        actions={[
          {
            icon: 'edit',
            tooltip: 'Edit Vehicle',
            onClick: (rowData) => handleSetDataForDialog(rowData)
          },
          {
            icon: 'add',
            tooltip: 'Add Category',
            isFreeAction: true,
            onClick: () => navigate('/dashboard/vehicle')
          }
        ]}
      />
    )
  }
       
    const handleClose=()=>{
    setOpen(false)
   }
 
    //         Fetch ALL CATEGORY //

    useEffect(function(){
        fetchAllCategory()
       },[])
    
       const fetchAllCategory=async()=>{
        var response=await getData('category/display_all_category')
        setCategoryList(response.data)
       }
    
        const fillCategoryDropDown=()=>{
        return categoryList.map((item)=>{
         console.log(categoryList)
        return(
          <MenuItem value={item.categoryid}>{item.categoryname}</MenuItem>
       )
      })
      }
    
       const handleChange=(event)=>{
        setCategoryId(event.target.value)
        fetchAllSubCategory(event.target.value)
       }
      
      //  Fetch ALL SUBCATEGORY //
      
      useEffect(function(){
        fetchAllSubCategory()
       },[])
    
       const fetchAllSubCategory=async()=>{
        var response=await getData('subcategory/display_all_subcategory')
        setSubCategoryList(response.data)
       }
    
       const fillSubCategoryDropDown=()=>{
        return subCategoryList.map((item)=>{
                return(
                    <MenuItem value={item.subcategoryid}>{item.subcategoryname}</MenuItem>
                )
            })
       }
    
       const handleChangeSubCategory =(event)=>{
        setSubCategoryId(event.target.value)
        fetchAllCompany(event.target.value)
       }
      
      //  Fetch ALL COMPANY //
      
      useEffect(function(){
        fetchAllCompany()
       },[])
    
       const fetchAllCompany=async()=>{
        var response=await getData('company/display_all_company')
        setCompanyList(response.data)
        }
    
       const fillCompanyDropDown = () => {
      return companyList.map((item) => {
      return (
            <MenuItem value={item.companyid}>{item.companyname}</MenuItem>
          )
        })
      }
    
      const handleChangeCompany=(event)=>{
      setCompanyId(event.target.value)
      fetchAllModel(event.target.value)
  }
    
       //  Fetch ALL Model //
      
      useEffect(function(){
      fetchAllModel()
       },[])
    
       const fetchAllModel=async()=>{
       var response=await getData('model/display_all_model')
       setModelList(response.data)
      }
    
       const fillModelDropDown=()=>{
        return modelList.map((item)=>{
         return(
               <MenuItem value={item.modelid}>{item.modelname}</MenuItem>
        )
      })
      }
    
      const handleChangeModel=(event)=>{
      setModelId(event.target.value)
     }
    
    useEffect(function(){
    fetchAllFuelType()
    },[])
          
    const fetchAllFuelType=async()=>{
    var response=await getData('vehicle/display_all_fueltype')
    setFuelTypeList(response.data)
    }
    
     const fillFuelTypeDropDown=()=>{
     return fuelTypeList.map((item)=>{
     return( 
           <MenuItem value={item.fueltypeid}>{item.fueltypename}</MenuItem>
    )
    })
   }

     const handleChangeFuelType=(event)=>{
     setFuelTypeId(event.target.value)
    }
            
     useEffect(function(){
     fetchAllCapacity()
     },[])
            
     const fetchAllCapacity=async()=>{
     var response=await getData('vehicle/display_all_capacity')
     setCapacityList(response.data)
    }

     const fillCapacityDropDown=()=>{
     return capacityList.map((item)=>{
     return(
       <MenuItem value={item.capacityid}>{item.capacityno}</MenuItem>
      )
      })
    }

     const handleChangeCapacity=(event)=>{
     setCapacity(event.target.value)
    }


        // Delete Button //
             
     const handleDelete =async()=>{
     var body = {vehicleid:vehicleId,vendor:vendor, color:color,registrationno:registrationNo,fueltype:fuelType,average:average,capacity:capacity,feature:feature,remark:remark,stat:stat,ratings:ratings, oldicon:oldIcon}
     var response=await postData('vehicle/delete_data',body,false)
     if(response.status)
    {
    Swal.fire({
        icon: 'success',
        title: 'Record Deleted Succesfully',
        showConfirmButton: false,
        timer: 2500
      })
  }
  else 
  {
    Swal.fire({
      icon: 'error',
      title: 'Oops',
      text: 'Something went wrong!',
    })
  }
  setOpen(false)
    fetchAllVehicle()
  }

  // Update Button (Edit Data) //
    
    const handleEditData = async () => {
    var body = { registrationno:registrationNo, vendor: vendor, color:color,fueltype:fuelType,average:average,capacity:capacity,feature:feature,remark:remark,stat:stat,ratings:ratings,vehicleid:vehicleId }
    var response = await postData('vehicle/edit_data', body)
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
   fetchAllVehicle()
  }


   // Save Picture  //

   const handleSavePicture=async()=>{
                            
    var formData = new FormData()
        formData.append('vehicleid', vehicleId)
        formData.append('oldicon', oldIcon)
       formData.append('icon', icon.bytes)
    var response = await postData('vehicle/edit_picture', formData,true)
      if(response.result)
     {
       Swal.fire({
       icon: 'success',
       title: 'Record Change Succesfully',
       showConfirmButton: false,
       timer: 2500
      })
      }
      else 
     {
      Swal.fire({
      icon: 'error',
      title: 'Oops',
      text: 'Something went wrong!',
      })
       }   
   setButtonStatus({ upload: true })
   setOpen(false)
   fetchAllVehicle()
   }
   
   const handlePicture =(event)=>{
    setIcon({filename:URL.createObjectURL(event.target.files[0]),bytes:event.target.files[0]})
    setButtonStatus(true)
   }
     

   const handleDiscard=()=>{
    setIcon({filename:prevIcon,bytes:''})
    setButtonStatus(true)
  }  


//  Radio Button //

     const handleChangeStat=(event)=>{
    setStat(event.target.value)
}


 //  Ratings Button //

   const handleRatings=(event)=>{
    setRatings(event.target.value) 
 }
console.log(categoryId)
  const showDialog = () => {
    return (
      <div >
        <Dialog
          open={open}
          onClose={handleClose}
          >
           <DialogContent>
              <div >
                 <Grid container spacing={2}>
                    <Grid item xs={12}  className={classes.headingStyle}>
                      Vehicle
                 </Grid>

                <Grid item xs={6} >
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

                  <Grid item xs={6} >
                      <FormControl fullWidth>
                          <InputLabel id="demo-simple-select-label">Select SubCategory</InputLabel>
                             <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={subCategoryId}
                                label="Select SubCategory"
                                onChange={handleChangeSubCategory}
                               >
                                { fillSubCategoryDropDown()}
                             </Select>
                        </FormControl>
                  </Grid>

                  <Grid item xs={6} >
                      <FormControl fullWidth>
                          <InputLabel id="demo-simple-select-label">Select Company</InputLabel>
                             <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={companyId}
                                label="Select Company"
                                onChange={handleChangeCompany}
                               >
                                { fillCompanyDropDown()}
                             </Select>
                      </FormControl>
                  </Grid>

                  <Grid item xs={6}>
                      <FormControl fullWidth>
                          <InputLabel id="demo-simple-select-label">Select Model</InputLabel>
                              <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={modelId}
                                label="Select Model"
                                onChange={handleChangeModel}
                                >
                                {fillModelDropDown()}
                              </Select>
                      </FormControl>
                  </Grid>

                  <Grid item xs={6} >
                     <TextField value={vendor} fullWidth onChange={(event) => setVendor(event.target.value)} label="Vender Id"></TextField>
                  </Grid>

                  <Grid item xs={6}>
                    <TextField value={registrationNo} fullWidth onChange={(event) => setRegistrationNo(event.target.value)} label="Registration Number"></TextField>
                 </Grid>

                  <Grid item xs={6} >
                    <TextField value={color} fullWidth onChange={(event) => setColor(event.target.value)} label="Color"></TextField>
                  </Grid>

                  <Grid item xs={6} >
                      <FormControl fullWidth>
                          <InputLabel id="demo-simple-select-label">Select Fuel Type</InputLabel>
                              <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={fuelTypeId}
                                label="Select Fuel Type"
                                onChange={handleChangeFuelType}
                               >    
                               {fillFuelTypeDropDown()}
                              </Select>
                      </FormControl>
                  </Grid>

                  <Grid item xs={6}>
                      <TextField value={average} fullWidth onChange={(event) => setAverage(event.target.value)} label="Average"></TextField>
                  </Grid>

                  <Grid item xs={6} >
                      <FormControl fullWidth>
                          <InputLabel id="demo-simple-select-label">Select Capacity</InputLabel>
                              <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={capacityId}
                                label="Select Capacity"
                                onChange={handleChangeCapacity}
                               >
                               {fillCapacityDropDown()}
                              </Select>
                      </FormControl>
                  </Grid>

                  <Grid item xs={4} >
                     <TextField value={feature} fullWidth onChange={(event) => setFeature(event.target.value)} label="Feature"></TextField>
                  </Grid>

                  <Grid item xs={4} >
                     <TextField value={remark} fullWidth onChange={(event) => setRemark(event.target.value)} label="Remark"></TextField>
                  </Grid>

                  <Grid item xs={4} >
                      <TextField value={fare} fullWidth onChange={(event) => setFare(event.target.value)} label="Fare"></TextField>
                  </Grid>

                  <Grid item xs={7} >
                     <FormControl>
                        <FormLabel id="demo-row-radio-buttons-group-label">Status</FormLabel>
                           <RadioGroup
                              row
                              aria-labelledby="demo-row-radio-buttons-group-label"
                              name="row-radio-buttons-group"
                              value={stat}
                              onChange={handleChangeStat}
                            >
                                <FormControlLabel value="continue" control={<Radio />} label="Continue" />
                                <FormControlLabel value="discontinue" control={<Radio />} label="Discontinue" />
                           </RadioGroup>
                      </FormControl>
                  </Grid>
      
                <Grid item xs={5} >
                    <Typography component="legend">Rating</Typography>
                        <Rating
                          name="simple-controlled"
                          value={ratings}
                          onChange={handleRatings}
                          /> 
                </Grid>

                <Grid item xs={6}>
                  {showHidePictureButtons()}
                </Grid>

                <Grid item xs={6}  className={classes.center}>
                  <Avatar
                    alt="Vehicle Icon"
                    src={icon.filename}
                    variant="rounded"
                    sx={{ width: 90, height: 50 }}
                  />
                </Grid>

                <Grid item xs={6} >
                  <Button onClick={handleEditData} fullWidth variant="contained"  >Update</Button>
                </Grid>

                <Grid item xs={6} >
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

    return(
     <div className={classes.mainContainer} >
         <div className={classes.box}>
            {DisplayAllVehicle()}
         </div>
            {showDialog()}
        </div>
    )
}
