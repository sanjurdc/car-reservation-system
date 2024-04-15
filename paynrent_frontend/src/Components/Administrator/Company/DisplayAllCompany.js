import { useEffect,useState } from "react";
import { useStyles } from "./DisplayAllCompanyCss";
import { Grid,Button,TextField,Avatar } from "@mui/material";
import { postData,getData,ServerURL,isValidAuth } from "../../../Services/FetchNodeServices";
import MaterialTable from '@material-table/core';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Swal from 'sweetalert2'
import Select  from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { useNavigate } from "react-router-dom";

export default function DisplayAllCompany(){
  
  const navigate=useNavigate() 
  const classes = useStyles()
  
  const [company, setCompany] = useState([])
  const [open, setOpen] = useState(false)
  const [icon, setIcon] = useState({ filename: '/assets/defaultcar.png', bytes: '' });
  const [prevIcon, setPrevIcon] = useState('')
  const [oldIcon, setOldIcon] = useState('')
  const [companyName, setCompanyName] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [subCategoryId, setSubCategoryId] = useState('');
  const [companyId, setCompanyId] = useState('');
  const [buttonStatus, setButtonStatus] = useState({ upload: true })   
  const [categoryList,setCategoryList] =useState([])
  const [subCategoryList,setSubCategoryList] =useState([])

 

  useEffect(function () {
   fetchAllCompany()
  }, [])

    const fetchAllCompany = async () => {
    var result = await getData('company/display_all_company')
    setCompany(result.data)
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
          fetchAllSubCategoryByCategory(event.target.value)
      }
    
       // Fetch All Sub Category  //

       const fetchAllSubCategoryByCategory = async (category_id) => {
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
        }

        const handleSetDataForDialog=(rowData)=>{
        fetchAllSubCategoryByCategory(rowData.categoryid)
        setCategoryId(rowData.categoryid)
        setSubCategoryId(rowData.subcategoryid)
        setCompanyId(rowData.companyid)
        setCompanyName(rowData.companyname)
        setOldIcon(rowData.icon)
        setIcon({filename:`${ServerURL}/images/${rowData.icon}`,bytes:''})
        setPrevIcon(`${ServerURL}/images/${rowData.icon}`)
        setOpen(true)
      }

           //  Picture //

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
        
      const handleSavePicture = async () => {
        var formData = new FormData()
        formData.append('companyid', companyId)
        formData.append('oldicon', oldIcon)
        formData.append('icon', icon.bytes)
        var response = await postData('company/edit_picture', formData, true)
        
        if (response.status) 
        {
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
         })
        }
        setOpen(false)
        fetchAllCompany()
    }   
     
    const handleDiscard = () => {
        setIcon({ filename: prevIcon, bytes: '' })
        setButtonStatus({ upload: true })
     }

           //  Edit Button //

           const handleEditData = async () => {
            var body = { companyname:companyName,companyid:companyId,categoryid:categoryId,subcategoryid:subCategoryId }
            var response = await postData('company/edit_data', body)
             
            if (response.status) 
            {
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
        fetchAllCompany()
           }  

                //  Delete Button  //

                const handleDelete = async () => {
                    var body = { companyid: companyId, companyname:companyName, oldicon: oldIcon }
                    var response = await postData('company/delete_data', body, false)
                    if (response.status) {
                      Swal.fire({
                        icon: 'success',
                        title: 'Company Deleted Succesfully',
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
                    fetchAllCompany()
                   }
                

      function displaycompanies(){
        return(

            <MaterialTable
        title="List Of Companies"
        columns={[
          { title: 'Company Id', field: 'companyid' },
          { title: 'Category Name', field: 'categoryname' },
          { title: 'SubCategory Name', field: 'subcategoryname' },
          { title: 'Company Name', field: 'companyname' },
          { title: 'Icon', field: 'icon', render: (rowData) => <Avatar src={`${ServerURL}/images/${rowData.icon}`} style={{ width: 55, height: 55 }} variant="rounded"></Avatar> },
         ]}
        data={company}
        actions={[
          {
            icon: 'edit',
            tooltip: 'Edit Category',
            onClick: (rowData) => handleSetDataForDialog(rowData)
          },
           {
            icon: 'add',
            tooltip: 'Add Category',
            isFreeAction: true,
            onClick: () => navigate('/dashboard/company')
          }
        ]}
      />
     )}
    
      const handleClose=()=>{
        setOpen(false)
      }

        const handlePicture = (event) => {
        setIcon({ filename: URL.createObjectURL(event.target.files[0]), bytes: event.target.files[0] })
        setButtonStatus({ upload: false })
      }

      const showDialog =()=>{
        return(
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
                      Company
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
                        <TextField value={companyName} fullWidth onChange={(event) => setCompanyName(event.target.value)} label="Company Name"></TextField>
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
    
    return(
        <div className={classes.mainContainer}>
        <div className={classes.box}>
          {displaycompanies()}
        </div>
        {showDialog()}
      </div>
    )
    }