import React, { useEffect, useState } from 'react';
import {  Button } from '@material-ui/core';
import { Box, Divider, InputBase, useTheme } from '@mui/material';
import { Close, Search } from '@mui/icons-material';
import axios from 'axios';
import { useSelector } from 'react-redux';
import Friend from './Friend';

const SearchComponent = () => {
  const [searchText, setSearchText] = useState('');
  const [allusers, setAllUsers] = useState(null);
  const [filteredUsers, setFilteredUsers] = useState(null);
  const { palette } = useTheme();

  const token = useSelector((state) => state.token);

  useEffect(() => {
    const getAllUsers = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/users/allusers`,{
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setAllUsers(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getAllUsers();
  }, []);

  const clearSearch = ()=>{
    setFilteredUsers(null);
    setSearchText('')
  }

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    performSearch();
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      performSearch();
    }
  };

  const filterUsers = (searchTerm) => {
    const filteredUsers = allusers.filter((user) =>
      user.firstName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(filteredUsers);
  };

  const performSearch = async() => {
    if (searchText.trim() === '') {
      return; // Empty search, do nothing
    }
    filterUsers(searchText);
  };

  return (
    <div style={{display: "flex" ,
    flexDirection: "column", 
    position: "absolute", 
    width:"350px", 
    top: "1.4rem",
    backgroundColor: palette.neutral.light,
    borderRadius: "0.5rem",
    padding: "0 1rem 0.3rem 1rem",
    fontSize: "1rem"
    }}>
      <form 
        onSubmit={handleSearchSubmit} style={{ display: 'flex', gap: "1rem"}}
      >
        <InputBase
          value={searchText}
          onChange={handleSearchChange}
          onKeyDown={handleKeyDown}
          sx={{
            width: "100%",
            textAlign: "center",
            paddingTop: "0.5rem",
            fontSize: "1rem",
            marginBottom: "0.5rem"
          }}
        />
        <div onClick={()=>clearSearch()} style={{display: "flex", gap: "0"}}>
        {searchText && <Button sx={{padding: "0"}}>
          <Close sx={{fontSize: "25px", color: palette.neutral.dark}}/>
        </Button>}
        <Button type="submit" sx={{padding: "0"}}>
          <Search sx={{fontSize: "25px", color: palette.neutral.dark}}/>
        </Button>
        </div>
      </form>
      { filteredUsers && <>
      <Divider sx={{marginBottom: "1rem"}}/>
      <Box display="flex" flexDirection="column" gap="1.5rem">
        {filteredUsers.map((user) => (
          <Friend
            key={user._id}
            friendId={user._id}
            name={`${user.firstName} ${user.lastName}`}
            subtitle={user.occupation}
            userPicturePath={user.picturePath}
          />
        ))}
      </Box>
      </>}
    </div>
  );
};

export default SearchComponent;