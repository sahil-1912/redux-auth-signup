import React,{useState, useEffect} from 'react'
import userServices from '../../services/user.service'
const BoardModerator = () => {
    const [content,setContent]=useState();

    useEffect(()=>{
        userServices.getModeratorBoard().then(
            (response)=>{
                setContent(response.data);
            },
            (error)=>{
              const _content= (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString();
    
            setContent(_content);
            
            }
        )
    })
  return (
    <div>{content}</div>
  )
}

export default BoardModerator;