

import React, {useEffect, useRef } from 'react'
import {gsap} from 'gsap'


 const Title = ({lineContext, lineContext2})=>{
    let line1 = useRef(null)
    let line2 = useRef(null)

    useEffect(()=>{
        gsap.from([line1,line2], {duration: 0.8, delay: 0.8, ease: "power3.out", yPercent: 400, stagger: {amount: 0.15} })
    },[line1,line2])
   
    
     return(
         <h1 className='page-title'>
             <div className='line-wrap'>
                 <div ref={el => (line1 = el)} className='line'>
                     {lineContext}
                 </div>
             </div>
             <div className='line-wrap'>
                 <div ref={el => (line2 = el)} className='line'>
                     {lineContext2}
                 </div>
             </div>
         </h1>
     )
 }


 export default Title;