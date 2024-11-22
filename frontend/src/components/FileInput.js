import React from "react";
import { FaFileUpload } from "react-icons/fa";
import { FileInputLabel, HiddenFileInput } from "../styles/AppStyles";

const FileInput = ({ onFileChange }) => (
  <div>
    <FileInputLabel>
      <FaFileUpload /> Select a Word File
      <HiddenFileInput type="file" accept=".doc,.docx" onChange={onFileChange} />
    </FileInputLabel>
  </div>
);

export default FileInput;
