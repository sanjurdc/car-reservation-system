  import MaterialTable from '@material-table/core';
  import { useEffect, useState } from "react";
  import { Grid, TextField, Button, Avatar } from "@mui/material"
  import { useStyles } from "./DisplayAllModelCss"
  import InputLabel from '@mui/material/InputLabel';
  import MenuItem from '@mui/material/MenuItem';
  import FormControl from '@mui/material/FormControl';
  import Select from '@mui/material/Select';
  import Swal from 'sweetalert2'
  import Dialog from '@mui/material/Dialog';
  import DialogActions from '@mui/material/DialogActions';
  import DialogContent from '@mui/material/DialogContent';
  import { postData, getData, ServerURL,isValidAuth } from "../../../Services/FetchNodeServices";
  import { useNavigate } from "react-router-dom";

   export default function DisplayAllModel(){

    const classes = useStyles()
    const navigate=useNavigate() 

    const [icon, setIcon] = useState({ filename: '/assets/defaultcar.png', bytes: '' });
    const [categoryId, setCategoryId] = useState([])
    const [companyId, setCompanyId] = useState([])
    const [subCategoryId, setSubCategoryId] = useState([]);
    const [model,setModel]=useState([])
    const [modelId,setModelId]=useState('')
    const [year,setYear]=useState('')
    const[open,setOpen]=useState(false)
    const [oldIcon,setOldIcon]=useState('')
    const [prevIcon,setPrevIcon]=useState('')
    const [modelName,setModelName]=useState('')
    const [categoryList, setCategoryList] = useState([])
    const [subCategoryList, setSubCategoryList] = useState([])
    const [companyList, setCompanyList] = useState([])
    const [buttonStatus, setButtonStatus] = useState({ upload: true }) 
    
              
     //  Fetch Models  //

     const checkAuth=async()=>{
      var result=await isValidAuth()
          if(result.auth)
      {
         { fetchAllModels() }
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
             
     useEffect(function(){
       // fetchAllModels()
       checkAuth()
     },[])

     const fetchAllModels =async()=>{
       var response=await getData('model/display_all_model')
           setModel(response.data)
         }

      const handleSetDataForDialog=(rowData)=>{
            fetchAllSubCategory(rowData.categoryid)
            setModelId(rowData.modelid)
            setCategoryId(rowData.categoryid)
            setSubCategoryId(rowData.subcategoryid)
            setCompanyId(rowData.companyid)
            setModelName(rowData.modelname)
            setYear(rowData.year)
            setOldIcon(rowData.icon)
            setIcon({filename:`${ServerURL}/images/${rowData.icon}`,bytes:''})
            setPrevIcon(`${ServerURL}/images/${rowData.icon}`)
            setOpen(true)
        }
 
  
       function displayAllModels() {
          return (
            <MaterialTable
              title="List Of Model"
              columns={[
                { title: 'Model Id', field: 'modelid' },
                { title: 'Category ', field: 'categoryname' },
                { title: 'SubCategory ', field: 'subcategoryname' },
                { title: 'Company ', field: 'companyname' },
                { title: 'Model ', field: 'modelname' },
                { title: 'Year', field: 'year' },
                { title: 'Icon', field: 'icon', render: (rowData) => <Avatar src={`${ServerURL}/images/${rowData.icon}`} style={{ width: 55, height: 55 }} variant="rounded"></Avatar> },
                    ]}
              data={model}
              actions={[
                {
                  icon: 'edit',
                  tooltip: 'Edit Model',
                  onClick: (rowData) => handleSetDataForDialog(rowData)
                },
                 {
                  icon: 'add',
                  tooltip: 'Add SubCategory',
                  isFreeAction: true,
                  onClick: () => navigate('/dashboard/model')
                }
              ]}
            />
          )
        }
        
        const handleClose=()=>{
            setOpen(false)
        }
         
          // Delete Button //
    
       const handleDelete =async()=>{
        var body={modelid:modelId, modelname:modelName, oldicon:oldIcon}
        var response = await postData('model/delete_data', body, false)
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
         fetchAllModels()
       }
    
    // Update Button (Edit Data) //
    
    const handleEditData = async () => {
      var body = { modelname: modelName,year:year, modelid:modelId }
      var response = await postData('model/edit_data', body)
      if (response.status) {
        Swal.fire({
  
          icon: 'success',
          title: 'Model Saved Succesfully',
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
     fetchAllModels()
    }
    
          //   Hide Picture Button  //
    
      const showHidePictureButtons =()=>{
           return(
              <div>
                {buttonStatus.upload ? <><Button variant="contained" fullWidth component="label">
                    Upload
                  <input onChange={handlePicture} hidden accept="image/*" multiple type="file" />
                    </Button></> : <>
                 <Button onClick={handleSavePicture} variant="contained" color="primary" >Save</Button >  <Button onClick={handleDiscard} variant="contained" color="secondary" Padding='10' >Discard</Button></>}
              </div>
        )}
                    // Pictue Save/change  //
    
      const handleSavePicture=async()=>{
        var formData = new FormData()
            formData.append('modelid', modelId)
            formData.append('oldicon', oldIcon)
            formData.append('icon', icon.bytes)
        var response = await postData('model/edit_picture', formData,true)
            if(response.result)
            {
                Swal.fire({
                    icon: 'success',
                    title: 'Picture Change Succesfully',
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
                 fetchAllModels()
               }
    
      const handlePicture=(event)=>{
            setIcon({filename:URL.createObjectURL(event.target.files[0]),bytes:event.target.files[0]})
            setButtonStatus(false)
       }
    
      const handleDiscard=()=>{
            setIcon({filename:prevIcon,bytes:''})
            setButtonStatus(true)
       }
    
           // Fetch All Category //

        useEffect(function(){
          fetchAllCategory()
        },[])
    
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
        fetchAllSubCategory(event.target.value)
      }
    
       // Fetch All Sub Category  //

       useEffect(function(){
        fetchAllSubCategory()
      },[])

       const fetchAllSubCategory = async (category_id) => {
        var body = { categoryid: category_id }
        var response = await postData('subcategory/fetch_all_subcategory_by_category', body)
        setSubCategoryList(response.result)
       }
            
      const fillSubCategoryDropDown =()=> {
        return subCategoryList.map((item) => {
          return (
            <MenuItem value={item.subcategoryid}>{item.subcategoryname}</MenuItem>
          )
        })
      }
    
        const handleChangeSubCategory = (event) => {
        setSubCategoryId(event.target.value)
        fetchAllCompany(event.target.value)
        }

         // Fetch All Company //

         useEffect(function(){
          fetchAllCompany()
        },[])
    
      const fetchAllCompany = async () => {
        var result = await getData('company/display_all_company')
        setCompanyList(result.data)
      }
    
      const fillCompanyDropDown = () => {
        return companyList.map((item) => {
          return (
            <MenuItem value={item.companyid}>{item.companyname}</MenuItem>
          )
        })
      }
    
      const handleChangeCompany = (event) => {
        setCompanyId(event.target.value)
      }

                 //  Show Dialog //
    
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
                      Model
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

                        <Grid xs={12} item>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Select </InputLabel>
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

                    <Grid xs={12} item>
                       <TextField value={modelName} fullWidth onChange={(event) => setModelName(event.target.value)} label="Model Name"></TextField>
                    </Grid>

                    <Grid xs={12} item>
                       <TextField value={year} fullWidth onChange={(event) => setYear(event.target.value)} label="Year"></TextField>
                    </Grid>

                    <Grid item xs={6}>
                      {showHidePictureButtons()}
                    </Grid>

                    <Grid xs={6} item className={classes.center}>
                       <Avatar
                        alt="Model Icon"
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
      
    return(
     <div className={classes.mainContainer}>
        <div className={classes.box}>
          {displayAllModels()}
        </div>
          {showDialog()}
     </div>
 )}