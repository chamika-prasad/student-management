import React, { useState, useRef } from "react";
import { TextField, Typography, Button, Modal, Box } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import Webcam from "react-webcam";
import { idImg, userImg } from "assets";
import "./index.css";
import { BorderAllRounded } from "@mui/icons-material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export const SecurityHome = () => {
  const [isIdDetailsShow, setIsIdDetailsShow] = useState(false);
  const webcamRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setCapturedImage(null);
  };

  const capturePhoto = () => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      setCapturedImage(imageSrc); // Save captured image
    }
  };

  const handleScanValueChange = (event) => {
    setIsIdDetailsShow(true);
  };

  return (
    <div className="security-attendance-wrapper">
      <TextField
        label="Scan here.."
        id="outlined-size-small"
        size="small"
        onChange={handleScanValueChange}
        className="security-attendance-scan-input"
      />

      <div className="btn-wrapper">
        <Button
          variant="outlined"
          size="large"
          onClick={handleScanValueChange}
          className="id-details-btn"
        >
          SUBMIT
        </Button>
        <Button
          variant="outlined"
          size="large"
          onClick={handleOpen}
          className="id-details-btn"
        >
          COMPARE
        </Button>
      </div>

      {isIdDetailsShow ? (
        <div className="security-attendance-id-details">
          <img src={idImg} className="id-image" />

          <div className="id-details">
            <div className="id-details-row">
              <Typography variant="h5" className="detail-key">
                Name
              </Typography>
              <Typography variant="h5" className="detail-separator">
                :
              </Typography>
              <Typography variant="h5" className="detail-value">
                Test Test
              </Typography>
            </div>
            <div className="id-details-row">
              <Typography variant="h5" className="detail-key">
                Identy Number
              </Typography>
              <Typography variant="h5" className="detail-separator">
                :
              </Typography>
              <Typography variant="h5" className="detail-value">
                1111 1111 1111
              </Typography>
            </div>
            <div className="id-details-row">
              <Typography variant="h5" className="detail-key">
                Index Number
              </Typography>
              <Typography variant="h5" className="detail-separator">
                :
              </Typography>
              <Typography variant="h5" className="detail-value">
                124578
              </Typography>
            </div>
            <div className="id-details-row">
              <Typography variant="h5" className="detail-key">
                Faculty
              </Typography>
              <Typography variant="h5" className="detail-separator">
                :
              </Typography>
              <Typography variant="h5" className="detail-value">
                Information Technology
              </Typography>
            </div>
          </div>
        </div>
      ) : null}

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="modal-wrapper"
      >
        <Box sx={style}>
          <div className="close-icon-holder">
            <CloseIcon onClick={handleClose} />
          </div>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            className="capture-Image-text"
          >
            Image Comparison
          </Typography>
          {!capturedImage ? (
            <>
              <Webcam
                ref={webcamRef}
                screenshotFormat="image/png"
                videoConstraints={{ facingMode: "user" }} // Use "environment" for the back camera
                style={{ width: "100%", maxWidth: "400px" }}
                className="camera-holder"
              />
              <div className="capture-btn-wrapper">
                <Button
                  variant="outlined"
                  size="large"
                  onClick={capturePhoto}
                  className="id-details-img-capture-btn"
                >
                  Capture Photo
                </Button>
              </div>
            </>
          ) : (
            <div className="image-comparison-holder">
              <div className="img-holder">
                <img
                  src={userImg}
                  className="id-image"
                  style={{ width: "100px", maxWidth: "100px" }}
                />
                <CompareArrowsIcon />
                <img
                  src={capturedImage}
                  className="id-image"
                  style={{ width: "100%", maxWidth: "100px" }}
                />
              </div>
              <Typography
                id="modal-modal-title"
                variant="h4"
                component="h2"
                className="compare-text"
              >
                80%
              </Typography>
            </div>
          )}
        </Box>
      </Modal>
    </div>
  );
};
