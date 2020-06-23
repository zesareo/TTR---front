import React from 'react';
import styled from 'style-components';

//const Button = styled.button
 
const FileUploader = props => {  const handleClick = event => {
    document.getElementById('hiddenFileInput').click();
  };  const handleChange = event => {
    const fileUploaded = event.target.files[0];
    props.handleFile(fileUploaded);
  };  return (
    <>
      <Button onClick={handleClick}>
        Upload a file
      </Button>
      <input
        type="file"
        id="hiddenFileInput"
        onChange={handleChange}
        style={{display: 'none'}}
      />
    </>
  );
export default FileUploader;