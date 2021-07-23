import React from 'react'
import Logo from '../global_ui/logo'
import './aboutStyles.css'

function About() {
    return (
        <div
        className="about"        
        >
            <nav 
            style={{
                backgroundColor:'darkgreen',
                width:'100%',
                height:'60px',
                textAlign:'center',
                display:'grid',
                alignContent:'center',
                alignItems:'center',
                fontSize:'20px',
                color:'white'
            }}>
                <span>
                   About Us
                </span>
            </nav> 

            <div style={{margin:'15px auto'}}>
                <Logo/>
            </div>

            <p
            className="quoted-text">
            Lorem ipsum dolor sit amet consectetur ipsum!
            </p>                  

            <section 
            className="aboutContent"
            style={{
                backgroundImage: `url('/assets/blurredlogo.png')` ,
                backgroundSize:'contain',
                backgroundRepeat:'no-repeat',
                backgroundPosition:'center',
                minWidth:'350px',
                padding:'20px',
                marginBottom:'30px'
            }}
            >               
                <p 
                style={{
                    boxShadow: '2px #888888',
                    borderRadius:'5px',
                    minWidth:'300px',
                    maxWidth:'450px',
                    textAlign:'center',
                    backgroundColor:'transparent', 
                    fontSize:'30px'               
                }}>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vel porro, id magni exercitationem architecto asperiores iure consequuntur nesciunt facere. Voluptatibus minus ipsum eaque rerum laboriosam ex? Ab necessitatibus totam ratione.
                </p>
            </section>

            <section className="founder" >
            <div className="founderNote">
                <div className="founderContent">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid nostrum repudiandae eum corrupti, nisi, earum recusandae rerum dolore minima suscipit saepe dolores, quas quisquam praesentium. Dolorum totam consequuntur illum nemo?
                </div>
                <img 
                className="founderImg"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNEr-saR2xBf7GrT5wx3oL_o8M-ZodrZtDnQ&usqp=CAU" alt="" />

            

            </div>
            

            </section>

            <footer >
                <h2>Relief Riders</h2>
                <p className="footer-container-1">
                    <i className="fab fa-instagram"></i>
                    <i className="fab fa-facebook"></i>

                </p>
            </footer>
            
                                                        
        </div>
    )
}

export default About
