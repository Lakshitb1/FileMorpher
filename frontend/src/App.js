import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { FaFileUpload, FaFileAlt } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Styled Components
const AppContainer = styled.div`
  background: linear-gradient(135deg, #2c3e50, #2980b9);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
  font-family: "Poppins", sans-serif;
`;

const Header = styled.div`
  text-align: center;
  padding: 60px 20px;
  background: linear-gradient(135deg, #2980b9, #2c3e50);
  width: 100%;
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2);
  border-bottom: 4px solid #fff;
`;

const AppName = styled.h1`
  font-size: 48px;
  color: white;
  font-weight: bold;
  letter-spacing: 3px;
  margin: 0;
  text-shadow: 0px 4px 8px rgba(0, 0, 0, 0.4);
`;

const Tagline = styled.p`
  font-size: 20px;
  margin: 20px 0 0 0;
  color: #ecf0f1;
  font-style: italic;
  letter-spacing: 2px;
`;

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  width: 90%;
  max-width: 1200px;
  align-items: center;
  padding: 40px 0;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
  }
`;

const Column = styled.div`
  flex: 1;
  background: #ecf0f1;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  color: #333;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  }
`;

const Title = styled.h2`
  color: #2980b9;
  font-size: 32px;
  text-align: center;
  font-weight: bold;
  letter-spacing: 2px;
  margin-bottom: 20px;
`;

const FileInputContainer = styled.div`
  margin: 20px 0;
  text-align: center;
`;

const FileInputLabel = styled.label`
  display: inline-block;
  background-color: #3498db;
  color: white;
  padding: 12px 25px;
  font-size: 18px;
  border-radius: 8px;
  cursor: pointer;
  width: auto;
  min-width: 230px;
  text-align: center;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #2980b9;
  }
`;

const HiddenFileInput = styled.input`
  display: none;
`;

const Button = styled.button`
  background-color: #3498db;
  color: white;
  padding: 12px 25px;
  font-size: 18px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
  margin-top: 30px;
  width: auto;
  min-width: 230px;
  text-align: center;

  &:hover {
    background-color: #2980b9;
    transform: scale(1.05);
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const PreviewButton = styled(Button)`
  background-color: #f39c12;

  &:hover {
    background-color: #e67e22;
  }
`;

const MetadataSection = styled.div`
  margin-top: 30px;
  font-size: 16px;
  color: #333;
  background: #ecf0f1;
  padding: 20px;
  border-radius: 8px;
  border: 1px solid #ddd;
`;

const MetadataItem = styled.div`
  margin: 10px 0;
  font-size: 14px;
`;

const Spinner = styled.div`
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-top: 4px solid #3498db;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;


function App() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [metadata, setMetadata] = useState(null);
  const [pdfUrl, setPdfUrl] = useState("");
  

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setMetadata(null);
    setPdfUrl("");
  };

  const handleUpload = async () => {
    if (!file) {
      toast.error("Please select a Word file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    setLoading(true);

    try {
      const response = await axios.post("http://localhost:3000/convertFile", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const { convertedFileMetadata, fileDownloadUrl } = response.data;
      setPdfUrl(`http://localhost:3000${fileDownloadUrl}`);
      setMetadata({ convertedFile: convertedFileMetadata });

      toast.success("Conversion successful! Your PDF is ready for preview.");
    } catch (err) {
      console.error(err);
      toast.error("Failed to convert the file. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handlePreviewPdf = () => {
    if (pdfUrl) {
      window.open(pdfUrl, "_blank");
    }
  };

  return (
    <AppContainer>
      <Header>
        <AppName>FileMorpher</AppName>
        <Tagline>Effortless Word to PDF Conversion</Tagline>
      </Header>
      <Layout>
        {/* Input and Conversion Section */}
        <Column>
          <Title>Upload and Convert</Title>
          <FileInputContainer>
            <FileInputLabel>
              <FaFileUpload /> Select a Word File
              <HiddenFileInput type="file" accept=".doc,.docx" onChange={handleFileChange} />
            </FileInputLabel>
          </FileInputContainer>

          {file && (
            <MetadataSection>
              <strong>
                <FaFileAlt /> Selected File Metadata:
              </strong>
              <MetadataItem>Name: {file.name}</MetadataItem>
              <MetadataItem>Size: {(file.size / 1024).toFixed(2)} KB</MetadataItem>
              <MetadataItem>Type: {file.type}</MetadataItem>
            </MetadataSection>
          )}

          <Button onClick={handleUpload} disabled={loading}>
            {loading ? <Spinner /> : "Convert to PDF"}
          </Button>
        </Column>

        {/* Metadata and Preview Section */}
        <Column>
          <Title>Preview and Metadata</Title>
          {metadata && (
            <MetadataSection>
              <strong>Converted File Metadata:</strong>
              <MetadataItem>Name: {metadata.convertedFile?.name}</MetadataItem>
              <MetadataItem>Size: {metadata.convertedFile?.size} bytes</MetadataItem>
              <MetadataItem>
                Created At: {new Date(metadata.convertedFile?.createdAt).toLocaleString()}
              </MetadataItem>
            </MetadataSection>
          )}

          <PreviewButton onClick={handlePreviewPdf} disabled={!pdfUrl}>
            Preview PDF
          </PreviewButton>
        </Column>
      </Layout>
      <ToastContainer />
    </AppContainer>
  );
}

export default App;
