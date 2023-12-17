import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";

//
import WhatshotIcon from "@mui/icons-material/Whatshot";
import MovieIcon from "@mui/icons-material/Movie";
import SearchIcon from "@mui/icons-material/Search";
import LiveTvIcon from "@mui/icons-material/LiveTv";

import { colors } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function SimpleBottomNavigation() {
  const [value, setValue] = useState(0);
  const navigate = useNavigate();
  useEffect(() => {
    if (value === 0) {
      navigate("/");
    }
    else if(value==1){
      navigate("/movies")
    }
    else if(value==2){
      navigate("/series")
    }
    else if(value==3){
      navigate("/search")
    }
  }, [value,navigate]);

  return (
    <Box sx={{ width: "100%" }}>
      <BottomNavigation
        sx={{ backgroundColor: "#2d313a", bottom: 0, zIndex: 100 }}
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction
          style={{ color: "white" }}
          label="Trending"
          icon={<WhatshotIcon />}
        />

        <BottomNavigationAction
          style={{ color: "white" }}
          label="Movies"
          icon={<MovieIcon />}
        />

        <BottomNavigationAction
          style={{ color: "white" }}
          label="TV Series"
          icon={<LiveTvIcon />}
        />

        <BottomNavigationAction
          style={{ color: "white" }}
          label="Search"
          icon={<SearchIcon />}
        />
      </BottomNavigation>
    </Box>
  );
}
