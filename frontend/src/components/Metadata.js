import React from "react";
import { MetadataSection, MetadataItem } from "../styles/AppStyles";
import { FaFileAlt } from "react-icons/fa";

const Metadata = ({ metadata, file }) => (
  <MetadataSection>
    {file && (
      <>
        <strong>
          <FaFileAlt /> Selected File Metadata:
        </strong>
        <MetadataItem>Name: {file.name}</MetadataItem>
        <MetadataItem>Size: {(file.size / 1024).toFixed(2)} KB</MetadataItem>
        <MetadataItem>Type: {file.type}</MetadataItem>
      </>
    )}
    {metadata && (
      <>
        <strong>Converted File Metadata:</strong>
        <MetadataItem>Name: {metadata.convertedFile?.name}</MetadataItem>
        <MetadataItem>Size: {metadata.convertedFile?.size} bytes</MetadataItem>
        <MetadataItem>
          Created At: {new Date(metadata.convertedFile?.createdAt).toLocaleString()}
        </MetadataItem>
      </>
    )}
  </MetadataSection>
);

export default Metadata;
