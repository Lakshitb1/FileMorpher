import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AppContainer, Header, AppName, Tagline, Layout, Column, Title, Button, PreviewButton } from "./styles/AppStyles";
import FileInput from "./components/FileInput";
import Metadata from "./components/Metadata";

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
      const response = await axios.post("https://file-morpher.vercel.app/convertFile", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const { convertedFileMetadata, fileDownloadUrl } = response.data;
      setPdfUrl(`https://file-morpher.vercel.app${fileDownloadUrl}`);
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
        <Column>
          <Title>Upload and Convert</Title>
          <FileInput onFileChange={handleFileChange} />
          <Metadata file={file} />
          <Button onClick={handleUpload} disabled={loading}>
            {loading ? "Loading..." : "Convert to PDF"}
          </Button>
        </Column>

        <Column>
          <Title>Converted File</Title>
          <Metadata metadata={metadata} />
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
