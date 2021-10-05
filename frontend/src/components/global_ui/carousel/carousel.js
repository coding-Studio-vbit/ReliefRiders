import React,{useState} from 'react'
import styles from './carousel.module.css'

function Carousel({list,title}) {
    const [current, setcurrent] = useState(0);
    function forward(){
        if(current!=list.length-1){
            setTimeout(() => {
                setcurrent(current+1)        
            }, 100);
              
        }         
    }
    function backward(){
        if(current!=0){
            setTimeout(() => {
                setcurrent(current-1) 
            }, 100);           
        }            
    }

    return (
        <div>
            <h3 style={{textAlign:'center',margin:'7px'}}>{title}</h3>

            <div className={styles.container}> 
                <i 
                className={"fas fa-chevron-left"+` ${styles.move}`}  
                onClick={()=>backward()} 
                style={{color:current==0?'lightgray':'black'}}
                ></i>  
                <div>
                    {
                        list.map((item)=>{
                            return(
                                list[current]==item &&
                                <img key={item} className={styles.carouselImage} src={process.env.REACT_APP_URL+item}/> 
                            )
                        })
                    }
                </div>   
                   
                <i 
                className={"fas fa-chevron-right"+` ${styles.move}`} 
                onClick={()=>forward()}
                style={{color:current==list.length-1?'lightgray':'black'}}
                ></i>
            </div>
        </div>
        
    )
}


export default Carousel;
