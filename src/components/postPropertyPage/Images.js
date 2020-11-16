import React from "react";
import Typography from "@material-ui/core/Typography";
import UploadImages from "./UploadImages";

export default function Images(props) {
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Upload up to 5 images
      </Typography>
      <UploadImages setFileList={props.setFileList} fileList={props.fileList} />
    </React.Fragment>
  );
}
