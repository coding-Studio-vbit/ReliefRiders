import React from 'react';
import { useState,} from 'react';
import styles from './Upload_images.module.css';
import Navbar from '../../global_ui/nav';

const uploadImages =()=>{

    const [files, setFiles]= useState([]);
    const [num, setNum] = useState(0);
    const [error, setError] = useState(null);
    const [preview, setPreview] = useState([]);
    const [Medicine, setMedicine] = useState(false);
    const [Grocery, setGrocery] = useState(false);    
    const [Misc,setMisc] = useState(false);
    const [categories,setcategories] = useState([]);
  
    

    const onInputChange = (e)=>{
       
        if(num + e.target.files.length<=3)
        {
            
            for(let i=0;i<e.target.files.length;i++){
            
            var t=e.target.files[i].type.split('/').pop().toLowerCase();
            
            if(t!= "jpeg" && t!="jpg" && t!="png")
            {
                setError("Please select a valid image file");
            }
            else{

            if(e.target.files[i].size>10240000){
                setError("Maximum file size is 10MB");         
                
            }else{

                setNum(num => num + 1)
                setFiles(files=> [...files, e.target.files[i]]);
                setPreview(preview=> [...preview, URL.createObjectURL(e.target.files[i])])    
                setError(" ");    
            }
            }
  
            }
        }
        else{
            
            setError("More than 3 files are not allowed");           
        }
       
        }


    const onSubmit = (e) =>{
        e.preventDefault();
       
        if(num===0)
        {
            setError("No file uploaded");
        }

        if(Medicine===true)
        {
            setcategories(categories=> [...categories,"MEDICINES"]);
        }
        if(Grocery===true)
        {
            setcategories(categories=> [...categories,"GROCERIES"]);            
        }
        if(Misc===true)
        {
            setcategories(categories=> [...categories,"MISC."]);           
        }

         if(categories.length==0)
         {
             setError("Please select the category")
         }

        //console.log(categories.length);
        for(let i=0; i<categories.length; i++)
        {
            //console.log(categories[i]);
        }        

        const data = new FormData();

        for(let i=0; i<files.length; i++){
            data.append('file',files[i]);
        }
        }  

        const onCancel = ()=>{

        }


    return(
       
        <>
        <Navbar style={{backgroundColor:'#79CBC5',marginBottom:"10px"}} back={true} backStyle={{ color: 'white' }} 
        title="Upload Images" titleStyle={{ color: 'white' }} />       
            
            
            <div className={styles.content_up}>
                   
           
               
            <p className={styles.up_img_header}>Please choose the items you want to request</p>
             <p className={styles.up_error_msg}>{error ? error : ""}</p>
                          
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
            
 
             <div className={styles.up_img_preview}>         
             <Display previewImages={preview}/>
           </div>
           


          <div className={styles.up_list}> 
               
                  <div>
                     <label className={styles.up_check_label}>Medicine
                      <input type="checkbox" name="Medicine" 
                       onChange = {()=>setMedicine(!Medicine)} />
                      <span className={`${styles.up_check} ${styles.check_1}`}></span>
                      </label>
                  </div>
                  <div> 
                     <label className={styles.up_check_label}>Grocery
                      <input type="checkbox" name="Grocery" 
                      onChange = {()=>setGrocery(!Grocery)} />
                      <span className={`${styles.up_check} ${styles.check_2}`}></span>
                      </label>
                  </div>
                  <div> 
                      <label className={styles.up_check_label}>Misc.
                      <input type="checkbox" name="Misc" 
                       onChange = {()=>setMisc(!Misc)}/>
                      <span className={`${styles.up_check} ${styles.check_3}`}></span>
                      </label>
                  </div>
             

          </div>

          <div className={styles.buttonscontrol}>
          <button onClick={onCancel} className={styles.up_img_cancel}>Cancel Request</button>
           <button onClick={onSubmit} className={styles.up_img_button}>Proceed Request</button>          
           </div>
    
       </div>         
       
      
      </>
    );
}

export default uploadImages;

const Display = ({previewImages}) => {

    if(!previewImages){
        return null;
    }

    return previewImages.map((image, index) => <img className={styles.img_style} style={{ maxHeight:'350px'}} key={index} src={image}/>);
};
