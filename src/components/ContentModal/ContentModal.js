import React, { useEffect, useState } from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { unavailable,img_500,unavailableLandscape } from '../../config/config';
import YouTubeIcon from '@mui/icons-material/YouTube';

import "./ContentModal.css";
import Carousel from '../Carousel/Carousel';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "85%",
  bgcolor: '#39445a',
  border: '5px solid #282c34',
  boxShadow: 24,
  p: 4,
  height:"100%",
  color:"white",
 
  borderRadius:10,
};


export default function Dialog({children, media_type,id}) {
    console.log(children,media_type);
  const [open, setOpen] = useState(false);
 
  const [content,setContent] = useState();
  const[video,setVideo]= useState();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);



  useEffect(()=>{
fetchData()
fetchVideo()
  },[])

  const fetchData = async()=>{
    const {data}=await axios.get(
        `https://api.themoviedb.org/3/${media_type}/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    );
    setContent(data);
  }
    const fetchVideo = async()=>{
        const {data}=await axios.get(
            `https://api.themoviedb.org/3/${media_type}/${id}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
        );

        console.log(data.results[0]?.key)
        setVideo(data.results[0]?.key);

  };
  useEffect(()=>{
    fetchData();
    fetchVideo();

  },[]);
 
 
console.log(children,'childreen')
  return (
    <>
    <div
        className="media"
        style={{ cursor: "pointer" }}
        color="inherit"
        onClick={handleOpen}
      >
        {children}
      </div>
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={handleClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={open}>
        
       {content &&(
        <Box sx={style}>
          
          <div className="ContentModal">
                <img
                  src={
                    content.poster_path
                      ? `${img_500}/${content.poster_path}`
                      : unavailable
                  }
                  alt={content.name || content.title}
                  className="ContentModal__portrait"
                />
                <img
                  src={
                    content.backdrop_path
                      ? `${img_500}/${content.backdrop_path}`
                      : unavailableLandscape
                  }
                  alt={content.name || content.title}
                  className="ContentModal__landscape"
                />
                <div className="ContentModal__about">
                  <span className="ContentModal__title">
                    {content.name || content.title} (
                    {(
                      content.first_air_date ||
                      content.release_date ||
                      "-----"
                    ).substring(0, 4)}
                    )
                  </span> 
                        <br></br>
                  {content.tagline && (
                    <i className="tagline">{content.tagline}</i>
                  )}

                  <span className="ContentModal__description">
                    {content.overview}
                  </span>

                  <div>
                    <Carousel id={id} media_type={media_type} />
                  </div>

                  <Button
                    variant="contained"
                    startIcon={<YouTubeIcon />}
                    color="secondary"
                    target="__blank"
                    href={`https://www.youtube.com/watch?v=${video}`}
                  >
                    Watch the Trailer
                  </Button>
                </div>
              </div>
        </Box>
        )}
      </Fade>
    </Modal>
    </>
  );
}