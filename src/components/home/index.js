import React,{useState,useEffect} from 'react'
import userServices from '../../services/user.service'

const Home = () => {
    const [content,setContent]=useState();

    useEffect(()=>{
        userServices.getPublicContent().then(
            (response)=>{
                setContent(response.data)
            },
            (error)=>{
                const _content=(error.response && error.response.data) ||
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

export default Home