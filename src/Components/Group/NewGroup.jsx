import { Avatar, Button, CircularProgress } from "@mui/material";
import React, { useState } from "react";
import { BsArrowLeft, BsCheck2 } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { createGroupChat } from "../../Redux/Chat/Action";


const NewGroup = ({groupMember, setIsGroup}) => {
  const [isImageUploading, setIsImageUploading] = useState(false);
  const [groupName, setGroupName] = useState();
  const [groupImage, setGroupImage] = useState(null);
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  

  const uploadToCloudinary = (pics) => {
    setIsImageUploading(true);
    const data = new FormData();
    data.append("file", pics);
    data.append("upload_preset", "whatsapp");
    data.append("cloud_name", "ddwty7auo");

    fetch("https://api.cloudinary.com/v1_1/ddwty7auo/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        setGroupImage(data.url.toString());
        setIsImageUploading(false);
      })
  };

  const handleCreateGroup = () => {
    let userIds = [];
  
    for (let user of groupMember) {
      userIds.push(user.id);
    }
  
    const group = {
      userIds,
      chat_name: groupName,
      chat_image: groupImage,
    };
  
    const data = {
      group,
      token,
    };
  
    dispatch(createGroupChat(data));
    setIsGroup(false);
  };
  

  return (
    <div className="w-full h-full">
      <div className="flex items-center space-x-10 bg-[#008069] text-white pt-16 px-10 pb-5">
        <BsArrowLeft className="cursor-pointer text-2xl font-bold" />
        <p className="text-xl font-semibold">New Group</p>
      </div>

      <div className="flex flex-col justify-center items-center my-12">
        <label htmlFor="imgInput" className="relative">
          {/* <img
            className="h-33 w-33 rounded-full"
            src={groupImage || "https://cdn.pixabay.com/photo/2020/07/11/06/27/diversity-5392891_640.png"}
            alt=""
          /> */}
          <Avatar sx={{width:"15rem", height:"15rem"}} alt="group icon" src={groupImage || "https://cdn.pixabay.com/photo/2020/07/11/06/27/diversity-5392891_640.png"} />
          {isImageUploading && (
            <CircularProgress className="absolute top-[5rem] left-[-6rem]" />
          )}
        </label>
        <input
          type="file"
          id="imgInput"
          className="hidden"
          onChange={(e) => uploadToCloudinary(e.target.files[0])}
          value={""}
        />
      </div>
      <div className="w-full flex justify-between items-center py-2 px-5">
        <input
          className="w-full outline-none border-b-2 border-green-700 px-2 bg-transparent"
          placeholder="Group Subject"
          value={groupName}
          type="text"
          onChange={(e) => setGroupName(e.target.value)}
        />
      </div>
      {groupName && (
        <div className="py-10 bg-slate-200 flex items-center justify-center ">
          <Button onClick={handleCreateGroup}>

            <div className="bg-[#0c977d] rounded-full p-4">
              <BsCheck2 className="text-white font-bold text-3xl" />
            </div>
          </Button>
        </div>
      )}
    </div>
  );
};

export default NewGroup;
