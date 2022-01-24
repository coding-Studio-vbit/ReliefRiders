import React,{useState,useEffect,useContext} from 'react';
import Navbar from './../../global_ui/nav'
import './feedBackForm.css'
import TextArea from './../../global_ui/textarea/textArea'

import Button from './../../global_ui/buttons/button'
import {LoadingScreen, Spinner} from './../../global_ui/spinner';
import {Dialog} from './../../global_ui/dialog/dialog'
import { AuthContext } from '../../context/auth/authProvider';
import axios from 'axios';

function FeedbackForm() {
  const [pageLoad, setPageLoad] = useState(true);  
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState("");
  const { token } = useContext(AuthContext);

  const [questions,setQuestions] = useState({
      ques:[
          {id:1,question:"Was the rider wearing a mask ?",value:true},
          {id:2,question:"Was the rider polite to you?",value:true},
          {id:3,question:"Was the rider hygienic?",value:false},
          {id:4,question:"Was the application accessible to use ?",value:true},
          {id:5,question:"Are you satisfied with the service ?",value:true},    
      ],
      query:""
  });

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

  async function getQuestions() {
    const options = {
        headers: {
            authorization: "Bearer " + token,
        },
    };
    axios.get(process.env.REACT_APP_URL + "/questionsList", options)
    .then(
        (response) => {
            if(response.data.status==="success"){
                if(response.data.message!=null){
                    setError(null);
                    console.log(response.data);
                    //set questions
                }else{
                    setError("Failed to Fetch Feedback Form")
                    console.log("Failed to Fetch Feedback Form")
                    
                }
            }else{
                setError("Failed to Fetch Feedback Form")
                console.log("Failed to Fetch Feedback Form")
            }
            setPageLoad(false)          
        },
        (error) => {
            setError(error);
            setPageLoad(false)
            console.log(error);
        }
    ).catch(()=>{
        setError(error);
        setPageLoad(false)
        console.log(error);
    })        
  }
  
  useEffect(() => {
      getQuestions();
  }, []);
  
  return(
      !pageLoad?
        <div>
            <Navbar title='Feedback'/>
            {
                <Dialog isShowing={response.length>0} title="Alert" msg={response} onOK={()=>{}} />
            }
            {
                error==null?
                <div className='feedBackForm'>
                    {
                        questions.ques.map((q)=>{
                            return <div key={q.id}  className='radioButton' >                
                                        <label>
                                            {q.question}
                                        </label>
                                        <span >
                                            <input type="radio" value={true} name={q.id}
                                                    checked={q.value === true}
                                                    onChange={
                                                        function() {
                                                            let updatedQues = questions.ques;
                                                            const uQ = (element) => element.id==q.id;
                                                            const i = updatedQues.findIndex(uQ)
                                                            updatedQues[i]={id:q.id,question:q.question,value:true},
                                                            setQuestions({...questions,ques:updatedQues})   
                                                        }                                                
                                                    }
                                                />Yes
                                            <input type="radio" value={false} name={q.id} 
                                                checked={q.value === false}
                                                onChange={
                                                    function() {
                                                        let updatedQues = questions.ques;
                                                        const uQ = (element) => element.id==q.id;
                                                        const i = updatedQues.findIndex(uQ)
                                                        updatedQues[i]={id:q.id,question:q.question,value:false},
                                                        setQuestions({...questions,ques:updatedQues})   
                                                    }                                                
                                                }
                                            /> No
                                        </span>             
                                    </div> 
                        })
                    }    
                    <div style={{marginTop:'40px'}}>
                        <label >Any other things you want to mention ?</label>
                        <TextArea value={questions.query} onChange={(e)=>setQuestions({...questions,query:e.target.value})}/>
                    </div>
                
                    <div style={{width:'200px',margin:'35px auto'}}>
                        {
                            loading?
                            <Spinner radius={2}/>:
                            <Button isBlock={true} isRounded={true} text={'SUBMIT'} 
                                paddingTB={"20px"} fontSize={"20px"} marginTB={"20px"} 
                                onClick={()=>submitFeedBackForm()}/>
                        }
                    </div>
                </div>  
                :<div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                    {error}
                </div>          
            }
             
        </div>:
        <LoadingScreen/>
    );
}

export default FeedbackForm;
// {
//     "questions":[
//         "Was the rider wearing a mask?",
//         "Was the rider polite to you?",
//         "Was the rider hygienic?",
//         "Was the application accessible to use?",
//         "Are you satisfied with the service?"
//     ]
// }