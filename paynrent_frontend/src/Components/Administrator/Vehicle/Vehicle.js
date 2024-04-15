import { useStyles } from "./VehicleCss";
import { Grid,TextField,Avatar,Button } from '@mui/material'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Swal from 'sweetalert2'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Typography from '@mui/material/Typography';
import FormLabel from '@mui/material/FormLabel';
import { postData, getData } from "../../../Services/FetchNodeServices";
import ListAltIcon from '@mui/icons-material/ListAlt';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Rating from '@mui/material/Rating';
export default function Vehicle(){

    const classes = useStyles()
    const navigate=useNavigate()

    const [categoryId,setCategoryId]=useState('')
    const [subCategoryId,setSubCategoryId]=useState('')
    const [companyId,setCompanyId]=useState('')
    const [modelId,setModelId]=useState('')
    const [ratings,setRatings]=useState('')
    const [vendor,setVendor]=useState('')
    const [registrationNo,setRegistrationNo]=useState('')
    const [color,setColor]=useState('')
    const[fuelType,setFuelType]=useState([])
    const[average,setAverage]=useState('')
    const [capacity,setCapacity]=useState([])
    const [feature,setFeature]=useState('')
    const [remark,setRemark]=useState('')
    const [stat,setStat]=useState('')
    const [fare,setFare]=useState('')
    var [icon, setIcon] = useState({ filename: '/assets/defaultcar.png', bytes: '' });
    var [categoryList, setCategoryList] = useState([])
    var [subCategoryList, setSubCategoryList] = useState([])
    var [companyList, setCompanyList] = useState([])
    var [modelList, setModelList] = useState([])
    const[fuelTypeId,setFuelTypeId]=useState('')
    const [capacityId,setCapacityId]=useState('')

    //  Fetch Category //

    useEffect(function(){
    fetchAllCategory()
    },[])

    const fetchAllCategory =async()=>{
    var result= await getData('category/display_all_category')
    setCategoryList(result.data) 
    }

    const fillCategoryDropDown=()=>{
    return categoryList.map((item)=>{
    return(
          <MenuItem value={item.categoryid}>{item.categoryname}</MenuItem>
    )
    })}

    const handleChange=(event)=>{
    setCategoryId(event.target.value)
    fetchAllSubCategory(event.target.value)
    }

    //  Fetch SubCategory //

    useEffect(function(){
    fetchAllSubCategory()
    },[])

    const fetchAllSubCategory = async (category_id) => {
    var body = { categoryid: category_id }
    var response = await postData('subcategory/fetch_all_subcategory_by_category', body)
    setSubCategoryList(response.result)
    }

    const fillSubCategoryDropDown=()=>{
    return subCategoryList.map((item)=>{
    return(
          <MenuItem value={item.subcategoryid}>{item.subcategoryname}</MenuItem>
    )
    })}

    const handleChangeSubCategory =(event)=>{
    setSubCategoryId(event.target.value)
    fetchAllCompany(event.target.value)
    }   

            //  Fetch Company //

    useEffect(function(){
    fetchAllCompany()
    },[])

    const fetchAllCompany = async (subcategory_id) => {
    var body = { subcategoryid: subcategory_id }
    var response = await postData('company/fetch_all_company_by_subcategory', body)
    setCompanyList(response.result)
    }

    const fillCompanyDropDown=()=>{
    return companyList.map((item)=>{
    return(
    <MenuItem value={item.companyid}>{item.companyname}</MenuItem>
    )
    })}
  
    const handleChangeCompany=(event)=>{
    setCompanyId(event.target.value)
    fetchAllModel(event.target.value)
    }


    useEffect(function(){
    fetchAllFuelType()
    },[])
      
    const fetchAllFuelType=async()=>{
    var response=await getData('vehicle/display_all_fueltype')
    setFuelType(response.data)
    }

    const fillFuelTypeDropDown=()=>{
    return fuelType.map((item)=>{
    return(
    <MenuItem value={item.fueltypeid}>{item.fueltypename}</MenuItem>
    )
    })}

    const handleChangeFuelType=(event)=>{
    setFuelTypeId(event.target.value)
    }
     
    useEffect(function(){
    fetchAllCapacity()
    },[])

    const fetchAllCapacity=async()=>{
    var response= await getData('vehicle/display_all_capacity')
    setCapacity(response.data)
    }

    const fillCapacityDropDown=()=>{
    return capacity.map((item)=>{
    return(
    <MenuItem value={item.capacityid}>{item.capacityno}</MenuItem>
    )
    })}
      
    const handleChangeCapacity=(event)=>{
    setCapacityId(event.target.value)
    }  

    //  Fetch Model  //
       
       

    useEffect(function(){
    fetchAllModel()
    },[])

    const fetchAllModel = async (company_id) => {
    var body = {companyid:company_id }
    var response = await postData('model/fetch_all_model_by_company', body)
    setModelList(response.result)
    }

    const fillModelDropDown=()=>{
    return modelList.map((item)=>{
    return(
        <MenuItem value={item.modelid}>{item.modelname}</MenuItem>
    )
    })}

    const handleChangeModel=(event)=>{
    setModelId(event.target.value)
    }

    // Save Picture  //
   
    const handlePicture =(event)=>{
    setIcon({filename:URL.createObjectURL(event.target.files[0]),bytes:event.target.files[0]})
    }

    // Submit Button //

    const handleSumbit=async()=>{
    var formData=new FormData()
        formData.append('categoryid',categoryId)
        formData.append('subcategoryid',subCategoryId)
        formData.append('companyid',companyId)
        formData.append('modelid',modelId)
        formData.append('vendor',vendor)
        formData.append('registrationno',registrationNo)
        formData.append('color',color)
        formData.append('fueltypeid',fuelTypeId)
        formData.append('average',average)
        formData.append('capacityid',capacityId)
        formData.append('feature',feature)
        formData.append('remark',remark)
        formData.append('fare',fare)
        formData.append('stat',stat)
        formData.append('ratings',ratings)
        formData.append('icon',icon.bytes)
        var response=await postData('vehicle/vehiclesubmit', formData ,true)
        if(response.status)
             {
                Swal.fire({
                    icon: 'success',
                    title: 'Record Saved Succesfully',
                    showConfirmButton: false,
                    timer: 800
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
            window.location.reload()
           }

    //   Reset Button //

    const clearValues=()=>{
    setCategoryId('')
    setSubCategoryId('')
    setCompanyId('')
    setModelId('')
    setVendor('')
    setAverage('')
    setCapacity('')
    setColor('')
    setFeature('')
    setFuelType('')
    setRegistrationNo('')
    setRatings('')
    setFeature('')
    setStat('')
    setFare('')
    setIcon({ filename: '/assets/defaultcar.png', bytes: '' })
    }

    const handleShowModelList=()=>{
    navigate('/dashboard/displayallvehicle')
    }

    //  Radio Button //

    const handleChangeStat=(event)=>{
    setStat(event.target.value)
    }

    //  Ratings Button //

    const handleRatings=(event)=>{
    setRatings(event.target.value)
    }

    return(
        <div>
            <div className={classes.mainContainer}>
               <div className={classes.box}>
                  <Grid container spacing={2}>
                     <Grid xs={12} item className={classes.headingStyle}>
                       <div className={classes.leftcenter} >
                          { <ListAltIcon onClick={handleShowModelList} />}
                             <div style={{marginLeft:8}}>
                                Vehicle Interface
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
                                  { fillCategoryDropDown()}
                                 </Select>
                        </FormControl>
                     </Grid>

                     <Grid xs={6} item>
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

                     <Grid xs={6} item>
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

                     <Grid xs={6} item>
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

                      <Grid xs={6} item>
                         <TextField value={vendor} fullWidth onChange={(event) => setVendor(event.target.value)} label="Vender Id"></TextField>
                      </Grid>

                      <Grid xs={6} item>
                         <TextField value={registrationNo} fullWidth onChange={(event) => setRegistrationNo(event.target.value)} label="Registration Number"></TextField>
                      </Grid>

                       <Grid xs={6} item>
                          <TextField value={color} fullWidth onChange={(event) => setColor(event.target.value)} label="Color"></TextField>
                       </Grid>

                       <Grid xs={6} item>
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

                       <Grid xs={6} item>
                         <TextField value={average} fullWidth onChange={(event) => setAverage(event.target.value)} label="Average"></TextField>
                       </Grid>

                        <Grid xs={6} item>
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

                        <Grid xs={6} item>
                          <TextField value={feature} fullWidth onChange={(event) => setFeature(event.target.value)} label="Feature"></TextField>
                         </Grid>

                         <Grid xs={6} item>
                            <TextField value={remark} fullWidth onChange={(event) => setRemark(event.target.value)} label="Remark"></TextField>
                         </Grid>

                         <Grid item xs={3} >
                             <TextField value={fare} fullWidth onChange={(event) => setFare(event.target.value)} label="Fare"></TextField>
                         </Grid>

                         <Grid xs={6} item>
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
                         
                          <Grid xs={3} item>
                             <Typography component="legend">Rating</Typography>
                                 <Rating
                                    name="simple-controlled"
                                    value={ratings}
                                     onChange={handleRatings}
                                   /> 
                          </Grid>

                          <Grid xs={6} item>
                              <Button variant="contained" fullWidth component="label">
                                 Upload
                                 <input hidden accept="image/*" multiple type="file" onChange={handlePicture} />
                               </Button>
                          </Grid>

                          <Grid xs={6} item className={classes.center}>
                             <Avatar
                              alt="Vehicle Icon"
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
          </div>
    )} 