import {
    EditOutlined,
    DeleteOutlined,
    AttachFileOutlined,
    GifBoxOutlined,
    ImageOutlined,
    MicOutlined,
    MoreHorizOutlined,
  } from "@mui/icons-material";
  import {
    Box,
    Divider,
    Typography,
    InputBase,
    useTheme,
    Button,
    IconButton,
    useMediaQuery,
  } from "@mui/material";
  import FlexBetween from "components/FlexBetween";
  import Dropzone from "react-dropzone";
  import UserImage from "components/UserImage";
  import WidgetWrapper from "components/WidgetWrapper";
  import { useState } from "react";
  import { useDispatch, useSelector } from "react-redux";
  import { setPosts } from "state";
import { toast } from "react-toastify";
  
  const MyPostWidget = ({ picturePath }) => {
    const dispatch = useDispatch();
    const [isImage, setIsImage] = useState(false);
    const [image, setImage] = useState(null);
    const [cloudPicUrl, setCloudPicUrl] = useState("");
    const [imageUploaded,setImageUploaded] = useState(false);
    const [post, setPost] = useState("");
    const { palette } = useTheme();
    const { _id } = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
    const mediumMain = palette.neutral.mediumMain;
    const medium = palette.neutral.medium;
  
    const handleUpload = async () => {
      const imageData = new FormData();
      imageData.append("file", image)
      imageData.append("upload_preset","social-sphere")
      imageData.append("cloud_name","drpqiy5c5")

      await fetch("https://api.cloudinary.com/v1_1/drpqiy5c5/image/upload", {
        method: "post",
        body: imageData
        }) 
        .then((res)=> res.json())
        .then((data)=>{
          console.log(data);
          setCloudPicUrl(data.secure_url);
          setImageUploaded(true);
          toast.success("Image uploaded.")
        })
        .catch((err)=>{
          toast.error("Error uploading the image.")
          return;
        })
    }
    const handlePost = async () => {
      const formData = new FormData();
      formData.append("userId", _id);
      formData.append("description", post);
      console.log(image)
      if (image) {
        formData.append("picture", image);
        formData.append("picturePath", cloudPicUrl);
      }

      var object = {};
    formData.forEach((value, key) => object[key] = value);

      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/posts`, {
        method: "POST",
        headers: { 
          Authorization: `Bearer ${token}`,
        "Content-Type": "application/json" 
      },
        body: JSON.stringify(object),
      });
      const posts = await response.json();
      dispatch(setPosts({ posts }));
      setImage(null);
      setPost("");
      setCloudPicUrl("");
      setImageUploaded(false);
      toast.success("Post created.")
    };
  
    return (
      <WidgetWrapper>
        <FlexBetween gap="1.5rem" position="static" zIndex="-10">
          <UserImage image={picturePath} />
          <InputBase
            placeholder="What's on your mind..."
            onChange={(e) => setPost(e.target.value)}
            value={post}
            sx={{
              width: "100%",
              backgroundColor: palette.neutral.light,
              borderRadius: "2rem",
              padding: "1rem 2rem",
              position:"static",
            }}
          />
        </FlexBetween>
        {isImage && (
          <Box
            border={`1px solid ${medium}`}
            borderRadius="5px"
            mt="1rem"
            p="1rem"
          >
            <Dropzone
              acceptedFiles=".jpg,.jpeg,.png"
              multiple={false}
              onDrop={(acceptedFiles) => setImage(acceptedFiles[0])}
            >
              {({ getRootProps, getInputProps }) => (
                <FlexBetween>
                  <Box
                    {...getRootProps()}
                    border={`2px dashed ${palette.primary.main}`}
                    p="1rem"
                    width="100%"
                    sx={{ "&:hover": { cursor: "pointer" } }}
                  >
                    <input {...getInputProps()} />
                    {!image ? (
                      <p>Add Image Here</p>
                    ) : (
                      <FlexBetween>
                        <Typography>{image.name}</Typography>
                        <EditOutlined />
                      </FlexBetween>
                    )}
                  </Box>
                  {image && (
                    <IconButton
                      onClick={() => setImage(null)}
                      sx={{ width: "15%" }}
                    >
                      <DeleteOutlined />
                    </IconButton>
                  )}
                </FlexBetween>
              )}
            </Dropzone>
          </Box>
        )}
  
        <Divider sx={{ margin: "1.25rem 0" }} />
  
        <FlexBetween>
          <FlexBetween gap="0.25rem" onClick={() => setIsImage(!isImage)}>
            <ImageOutlined sx={{ color: mediumMain }} />
            <Typography
              color={mediumMain}
              sx={{ "&:hover": { cursor: "pointer", color: medium } }}
            >
              Image
            </Typography>
          </FlexBetween>
  
          {isNonMobileScreens ? (
            <>
              <FlexBetween gap="0.25rem">
                <GifBoxOutlined sx={{ color: mediumMain }} />
                <Typography color={mediumMain}>Clip</Typography>
              </FlexBetween>
  
              <FlexBetween gap="0.25rem">
                <AttachFileOutlined sx={{ color: mediumMain }} />
                <Typography color={mediumMain}>Attachment</Typography>
              </FlexBetween>
  
              <FlexBetween gap="0.25rem">
                <MicOutlined sx={{ color: mediumMain }} />
                <Typography color={mediumMain}>Audio</Typography>
              </FlexBetween>
            </>
          ) : (
            <FlexBetween gap="0.25rem">
              <MoreHorizOutlined sx={{ color: mediumMain }} />
            </FlexBetween>
          )}
          <div>
          {
            imageUploaded ?
            (<Button
            disabled={!post}
            onClick={handlePost}
            sx={{
              color: palette.background.alt,
              backgroundColor: palette.primary.main,
              borderRadius: "3rem",
              position:"static",
            }}
          >
            POST
          </Button>)
            :
          (<Button
          disabled={!image}
          onClick={handleUpload}
          sx={{
            color: palette.background.alt,
            backgroundColor: palette.primary.main,
            borderRadius: "3rem",
            position:"static",
          }}
        >
          Upload Image
        </Button>)
          }
          </div>
        </FlexBetween>
      </WidgetWrapper>
    );
  };
  
  export default MyPostWidget;