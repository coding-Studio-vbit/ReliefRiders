import React,{useState,useEffect,useContext} from 'react';
import Navbar from './../../global_ui/nav'
import './feedBackForm.css'
import TextArea from './../../global_ui/textarea/textArea'
import { useHistory } from 'react-router-dom';
import Button from './../../global_ui/buttons/button'
import {LoadingScreen, Spinner} from './../../global_ui/spinner';
import {Dialog} from './../../global_ui/dialog/dialog'
import { AuthContext } from '../../context/auth/authProvider';
import axios from 'axios';

function FeedbackForm() {
  const history = useHistory();
  const [questionID, setquestionID] = useState(null);
  const [pageLoad, setPageLoad] = useState(true);  
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState("");
  const { token } = useContext(AuthContext);

  const [questions,setQuestions] = useState({
      ques:[],
      query:""
  });

  async function submitFeedBackForm() {
    setLoading(true);
    let answers =[];
    questions.ques.forEach(q=>answers.push(q.value));
    const options = {
        headers: {
            authorization: "Bearer " + token,
        },
    };
    // console.log(user);
    axios.post(process.env.REACT_APP_URL + "/feedback",
        {
            questionsID:questionID,
            answers:answers,
            optionalFeedback:questions.query
        },
        options)
    .then((response)=>{
        console.log(response);
        setResponse(response.data.message);
    })

    setLoading(false);
    
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
                    setquestionID(response.data.message._id);
                    const ques =response.data.message.questions;
                    let q=[];
                    for (let i = 0; i < ques.length; i++) {
                        q.push({id:i,question:ques[i],value:true},)  
                    }
                    setQuestions({...questions,ques:q});
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
                <Dialog isShowing={response.length>0}
                 title="Alert" msg={response} 
                 onOK={()=>{
                     setResponse("");
                     history.replace("/my_requests")
                     //TODO route somewhere
                 }} />
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