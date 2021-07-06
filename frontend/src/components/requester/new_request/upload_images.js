import React from 'react';
import { useState,} from 'react';
import styles from './Upload_images.module.css';
import { useSessionStorageState } from "../../../utils/useLocalStorageState";
import Navbar from '../../global_ui/nav';
import { useHistory } from 'react-router-dom';

const uploadImages =()=>{

    const [files, setFiles]= useSessionStorageState("images",[]);
    const [num, setNum] = useSessionStorageState("num",0);
    const [err, setErr] = useState({
        input:null ,
        check:null
    })
    const [preview, setpreview] = useSessionStorageState("preview",[]);
   const [Medicine, setMedicine] = useState(sessionStorage.getItem('Medicine')==='true'); 
   const [Grocery, setGrocery] = useState(sessionStorage.getItem('Grocery')==='true');    
   const [Misc,setMisc] = useState(sessionStorage.getItem('Misc')==='true'); 
    const [categories,setcategories] = useSessionStorageState("tags",[]);
    const history= useHistory();  
         

     const onInputChange = (e) =>{
       
        if(num + e.target.files.length<=3)
        {
            
            for(let i=0;i<e.target.files.length;i++){
            
            var t = e.target.files[i].type.split('/').pop().toLowerCase();
            
            if(t!= "jpeg" && t!="jpg" && t!="png")
            {
                
                setErr({
                    ...err,
                    input:"Please select a valid image file"
                })
            }
            else{

            if(e.target.files[i].size > 10240000){
                
                setErr({
                    ...err,
                    input:"Maximum file size is 10MB"
                })     
                
            }else{
                const reader = new FileReader();
                setNum(num => num + 1);                
                
                reader.onload = async function(){
                    
                    const base64Response = await fetch(reader.result);
                    const blob = await base64Response.blob();
                    const blobUrl = URL.createObjectURL(blob);
                    //var byteString = reader.result.split(',')[1];
                    // let blob1 = await fetch(blobUrl).then(r => r.blob());
                    // console.log(blob1)
                    // console.log(blob)
                    setFiles(files=> [...files, blobUrl])
                    setpreview(preview=>[...preview, reader.result]);
                }
                   
                 reader.readAsDataURL(e.target.files[i])
                   
                 setErr({
                    ...err,
                    input:""
                })  
            }
            }
  
            }
        }
        else{
            
              
            setErr({
                ...err,
                input:"More than 3 files are not allowed"
            })         
        }
       
        }   

        

    const onSubmit = (e) =>{
        e.preventDefault();
       
       
        if(num!=0)
        {
            
            setErr({
                ...err,
                input:""
            }) 

            if(categories.length!=0)
            {
                setErr({
                    ...err,
                    check:""
                })
                history.push('/address');
            }
            else{
                setErr({
                    input:"",
                    check:"Select the categories"
                })
            }      

        }else{

        
        setErr({
            ...err,
            input:"Please upload images"
        })
        
        }
        
        }  

        const OnCheckBox = (e)=>
        {
            if(e.target.name === "Medicine"){
                sessionStorage.setItem('Medicine',`${e.target.checked}`);
                setMedicine(e.target.checked); 

                if(e.target.checked === true)
                {                    
                    setcategories( categories=>[...categories,"MEDICINES"]);
                   
                }else
                {
                    let displayItems = JSON.parse(sessionStorage.getItem("tags"));
                    displayItems = displayItems.filter(e => e !== "MEDICINES");
                    setcategories([...displayItems])
                     sessionStorage.setItem("tags",JSON.stringify(displayItems))
                }
            }

            if(e.target.name === "Grocery"){
                sessionStorage.setItem('Grocery',`${e.target.checked}`);
                setGrocery(e.target.checked); 

                if(e.target.checked === true)
                {                     
                    setcategories( categories=>[...categories,"GROCERY"]);
                   
                }else
                {
                    let displayItems = JSON.parse(sessionStorage.getItem("tags"));
                    displayItems = displayItems.filter(e => e !== "GROCERY");
                    setcategories([...displayItems])
                     sessionStorage.setItem("tags",JSON.stringify(displayItems))
                }
            }

            if(e.target.name === "Misc"){
                sessionStorage.setItem('Misc',`${e.target.checked}`);
                setMisc(e.target.checked); 

                if(e.target.checked === true)
                {                     
                    setcategories( categories=>[...categories,"MISC."]);
                    
                }else
                {
                    let displayItems = JSON.parse(sessionStorage.getItem("tags"));
                    displayItems = displayItems.filter(e => e !== "MISC.");
                    setcategories([...displayItems])
                     sessionStorage.setItem("tags",JSON.stringify(displayItems))
                }
            }
            

        }

        const onCancel = ()=>{
            history.push('/');
        }

        const ButtonEffect = (index)=>{
            const list = [...preview];
            list.splice(index, 1);
            setpreview(list);

            const list1 = [...files];
            list1.splice(index, 1);
            setFiles(list1);
            
            setNum(num => num - 1);
        }
    

        

    return(
       
        <>
        <Navbar style={{backgroundColor:'#79CBC5',marginBottom:"10px"}} back='/list_type' backStyle={{ color: 'white' }} 
        title="Upload Images" titleStyle={{ color: 'white' }} />       
            
            
            <div className={styles.content_up}>
                   
           
               
            <p className={styles.up_img_header}>Please choose the items you want to request</p>
             {/* <p className={styles.up_error_msg}>{error ? error : ""}</p> */}
             <p className={styles.up_error_msg}>{err.input ? err.input : ""}</p>

           
                          
             <label htmlFor="file" className={styles.labels}>
             <p className={styles.up_msg}>Upload Images: </p>
             <div className={styles.form_group}>
                <i className="fa fa-upload"></i>
                <p>Tap to add Image</p>
             <input type="file" id="file" name="files"
             onChange={onInputChange} 
             multiple />  
                      
            </div>
            </label>
            
 
             {/* <div className={styles.up_img_preview}>         
             <Display previewImages={preview}/>             
             </div> */}

             <div className={styles.up_img_preview}>         
             {preview.map((image,index) =>{
                 return (
                 <div key={index}>
                     <img className={styles.img_style} style={{ maxHeight:'350px'}} key={index} src={image}/>
                     <button className={styles.img_button} key={index} onClick={()=> ButtonEffect(index)}>Delete</button>
                 </div>
                 )
             })

             }           
             </div>
           
             <p className={styles.up_error_msg}>{err.check ? err.check : ""}</p>

          <div className={styles.up_list}> 
               
                  <div>
                     <label className={styles.up_check_label}>Medicine
                      <input type="checkbox" name="Medicine" checked={Medicine}
                       onChange = {OnCheckBox} />
                      <span className={`${styles.up_check} ${styles.check_1}`}></span>
                      </label>
                  </div>
                  <div> 
                     <label className={styles.up_check_label}>Grocery
                      <input type="checkbox" name="Grocery" checked={Grocery}
                      onChange = {OnCheckBox} />
                      <span className={`${styles.up_check} ${styles.check_2}`}></span>
                      </label>
                  </div>
                  <div> 
                      <label className={styles.up_check_label}>Misc.
                      <input type="checkbox" name="Misc" checked={Misc}
                       onChange = {OnCheckBox}/>
                      <span className={`${styles.up_check} ${styles.check_3}`}></span>
                      </label>
                  </div>
             

          </div>

          <div className={styles.buttonscontrol}>
          <button onClick={onCancel} className={styles.up_img_cancel}>Cancel </button>
           <button onClick={onSubmit} className={styles.up_img_button}>Proceed</button>          
           </div>
    
       </div>         
       
      
      </>
    );
}

export default uploadImages;

// const Display = ({previewImages}) => {

//     if(!previewImages){
//         return null;
//     }

//     return  previewImages.map((image, index) => <img className={styles.img_style} style={{ maxHeight:'350px'}} key={index} src={image}/> )   
// };





