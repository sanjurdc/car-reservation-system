import { useStyles } from "./ModelCss";
import { Grid,TextField,Avatar,Button } from '@mui/material'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Swal from 'sweetalert2'
import { postData, getData } from "../../../Services/FetchNodeServices";
import ListAltIcon from '@mui/icons-material/ListAlt';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


export default function Model(){

    const classes = useStyles()
    const navigate=useNavigate()

    const [categoryId,setCategoryId]=useState('')
    const [subCategoryId,setSubCategoryId]=useState('')
    const [companyId,setCompanyId]=useState('')
    const [year,setYear]=useState('')
    const [modelName,setModelName]=useState('')
    const [icon,setIcon] = useState({ filename: '/assets/defaultcar.png', bytes: '' });
    const [categoryList,setCategoryList] = useState([])
    const [subCategoryList,setSubCategoryList] = useState([])
    const [companyList,setCompanyList] = useState([])

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
            })
       }

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
            })
       }

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
            })
       }

       const handleChangeCompany=(event)=>{
            setCompanyId(event.target.value)
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
             formData.append('modelname',modelName)
             formData.append('year',year)
             formData.append('icon',icon.bytes)
             var response=await postData('model/modelsubmit', formData ,true)
             
             if(response.status)
             {
                Swal.fire({

                    icon: 'success',
                    title: 'Record Saved Succesfully',
                    showConfirmButton: false,
                    timer: 1000
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
            window.location.reload();
           }

             //   Reset Button //

    const clearValues=()=>{
        setCategoryId('')
        setSubCategoryId('')
        setCompanyId('')
        setModelName('')
        setYear('')
        setIcon({ filename: '/assets/defaultcar.png', bytes: '' })
    }

    const handleShowModelList=()=>{
      navigate('/dashboard/displayallmodel')
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
                                   Model Interface
                                </div>
                            </div>
                        </Grid>

                     <Grid xs={4} item>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Select Category</InputLabel>
                               <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={categoryId}
                                label="Select Category"
                                onChange={handleChange}
                                >
                                  {fillCategoryDropDown()}
                               </Select>
                        </FormControl>
                      </Grid>

                      <Grid xs={4} item>
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

                    <Grid xs={4} item>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Select Company</InputLabel>
                               <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={companyId}
                                label="Select Company"
                                onChange={handleChangeCompany}
                                >
                                  {fillCompanyDropDown()}
                                </Select>
                        </FormControl>
                    </Grid>

                    <Grid xs={6} item>
                        <TextField value={modelName} fullWidth onChange={(event) => setModelName(event.target.value)} label="Model Name"></TextField>
                    </Grid>

                   <Grid xs={6} item>
                       <TextField value={year} fullWidth onChange={(event) => setYear(event.target.value)} label="Year"></TextField>
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
                         src={icon.filename}
                         variant="rounded"
                         sx={{ width: 100, height: 50 }}
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