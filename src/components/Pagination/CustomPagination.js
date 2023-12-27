import { Pagination, } from '@mui/material'
import React from 'react'




const CustomPagination = ({setPage,numOfPages=10}) => {

    const handlePageChange =(event,page)=>{
      // console.log(event);
      // console.log(page);
        setPage(page);
        window.scroll(0,0);
    }
  return (
    <div style={
        {
         width: "100",
         display:"flex",
         justifyContent: "center",
         marginTop: 10,   
        }
    }>
        <Pagination
        count={numOfPages} 
        shape='rounded'
        color='secondary'
        //  onChange={(e)=>handlePageChange(e.target.textContent)}/>
        onChange={(event, page) => handlePageChange(event, page)} />
         </div>
  )
}

export default CustomPagination