import React,{useState,useEffect} from 'react'
import userServices from '../../services/user.service'
const BoardUser = () => {
    const [content,setContent]=useState("");
    useEffect(()=>{
      userServices.getUserBoard().then(
        (response)=>{
            setContent(response.data);
        },
        (error)=>{
           const _content=  (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setContent(_content);
        }
      )

    },[])
  return (
    <div className='container'>
        <div className='jumbotron'>
            {content}
        </div>
    </div>
  )
}

export default BoardUser