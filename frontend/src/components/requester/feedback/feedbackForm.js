import React,{useState} from 'react';
import Navbar from './../../global_ui/nav'
import './feedBackForm.css'
import TextArea from './../../global_ui/textarea/textArea'

import Button from './../../global_ui/buttons/button'
import {Spinner} from './../../global_ui/spinner';
import {Dialog} from './../../global_ui/dialog/dialog'


function FeedbackForm() {
  const [isWearingMask, setIsWearingMask] = useState(true);
  const [isPolite, setIsPolite] = useState(true);
  const [isHygienic, setisHygienic] = useState(true);
  const [isAccessible, setisAccessible] = useState(true);
  const [isSatisFied, setisSatisFied] = useState(true);
  const [feedBack, setFeedBack] = useState('rgegg');

  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState("");

  async function submitFeedBackForm() {
      setLoading(true);
    //   const res = await console.log();
    //TODO change response w
    setResponse("Feedback submission successful")
    setLoading(false);
    setTimeout(() => {
        setResponse("");
    }, 3000);
  }
  
  return(
    <div>
        <Navbar title='Feedback'/>
        
        {/* <p>{isWearingMask.toString()}</p>
        <p>{isPolite.toString()}</p>
        <p>{isHygienic.toString()}</p> */}

        {
            <Dialog isShowing={response.length>0} title="Alert" msg={response} onOK={()=>{}} />
        }
        <div className='feedBackForm'>

            
            <div className='radioButton' id='isWearingMask'>                
                <label>
                    Was the rider wearing a mask ?
                </label>
                <span>
                    <input type="radio" value={true} name="isWearingMask"
                            checked={isWearingMask=== true}
                            onChange={()=>setIsWearingMask(true)}
                        />Yes
                    <input type="radio" value={false} name="isWearingMask" 
                        checked={isWearingMask=== false}
                        onChange={()=>setIsWearingMask(false)}
                    /> No
                </span>             
            </div>   


            <div className='radioButton' id='isPolite'>                
                <label>
                    Was the rider polite to you?
                </label>
                <span>
                    <input type="radio" value={true} name="isPolite"
                            checked={isPolite=== true}
                            onChange={()=>setIsPolite(true)}
                        />Yes
                    <input type="radio" value={false} name="isPolite" 
                        checked={isPolite=== false}
                        onChange={()=>setIsPolite(false)}
                    /> No
                </span>             
            </div> 

            <div className='radioButton' id='isHygienic'>                
                <label>
                    Was the rider hygienic?
                </label>
                <span>
                    <input type="radio" value={true} name="isHygienic"
                            checked={isHygienic=== true}
                            onChange={()=>setisHygienic(true)}
                        />Yes
                    <input type="radio" value={false} name="isHygienic" 
                        checked={isHygienic=== false}
                        onChange={()=>setisHygienic(false)}
                    /> No
                </span>             
            </div> 

            <div className='radioButton' id='isWearingMask'>                
                <label>
                    Was the application accessible to use ?
                </label>
                <span>
                    <input type="radio" value={true} name="isAccessible"
                            checked={isAccessible=== true}
                            onChange={()=>setisAccessible(true)}
                        />Yes
                    <input type="radio" value={false} name="isAccessible" 
                        checked={isAccessible=== false}
                        onChange={()=>setisAccessible(false)}
                    /> No
                </span>             
            </div>

            <div className='radioButton' id='isWearingMask'>                
                <label>
                    Are you satisfied with the service ?
                </label>
                <span>
                    <input type="radio" value={true} name="isSatisfied"
                            checked={isSatisFied=== true}
                            onChange={()=>setisSatisFied(true)}
                        />Yes
                    <input type="radio" value={false} name="isSatisfied" 
                        checked={isSatisFied=== false}
                        onChange={()=>setisSatisFied(false)}
                    /> No
                </span>             
            </div>

            
            <div style={{marginTop:'40px'}}>
            <label >Any other things you want to mention ?</label>
            <TextArea value={feedBack} onChange={(e)=>setFeedBack(e.target.value)}/>
            </div>
           

            <div style={{width:'200px',marginTop:'35px'}}>
                {
                    loading?
                    <Spinner radius={2}/>:
                    <Button isBlock={true} isRounded={true} text={'SUBMIT'} 
                        paddingTB={"20px"} fontSize={"20px"} marginTB={"20px"} 
                        onClick={()=>submitFeedBackForm()}/>
                }
            </div>

        </div>
            


                        
    </div>
  );
}

export default FeedbackForm;
