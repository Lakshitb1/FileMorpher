import styled from "styled-components";

export const AppContainer = styled.div`
  background: linear-gradient(135deg, #1a252f, #1b3a5b);
  background-size: 400% 400%; /* Allows the gradient to have a flowing effect */
  animation: gradientShift 8s ease infinite; /* 8-second infinite animation */
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2);
  color: white;
  font-family: "Poppins", sans-serif;

  @keyframes gradientShift {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
`;


export const Header = styled.div`
  text-align: center;
  padding: 60px 20px;
  background: linear-gradient(135deg, #1a252f, #1b3a5b);
  animation: gradientShift 8s ease infinite; 
  width: 100%;
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2);
  border-bottom: 4px solid #fff;
  @keyframes gradientShift {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
`;

export const AppName = styled.h1`
  font-size: 48px;
  color: white;
  font-weight: bold;
  letter-spacing: 3px;
  margin: 0;
  text-shadow: 0px 4px 8px rgba(0, 0, 0, 0.4);
`;

export const Tagline = styled.p`
  font-size: 20px;
  margin: 20px 0 0 0;
  color: #ecf0f1;
  font-style: italic;
  letter-spacing: 2px;
`;

export const Layout = styled.div`
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

export const Column = styled.div`
  flex: 1;
  background: #ecf0f3;
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
    transform: translateY(-20px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  }
`;

export const Title = styled.h2`
  color: #2980b9;
  font-size: 32px;
  text-align: center;
  font-weight: bold;
  letter-spacing: 2px;
  margin-bottom: 20px;
`;

export const FileInputLabel = styled.label`
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
    background-color:  #e67e22 ;
  }
`;

export const HiddenFileInput = styled.input`
  display: none;
`;

export const Button = styled.button`
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
    background-color: #e67e22;
    transform: scale(1.05);
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

export const PreviewButton = styled(Button)`
  background-color: #f39c12;

  &:hover {
    background-color: #e67e22;
  }
`;

export const MetadataSection = styled.div`
  margin-top: 30px;
  font-size: 16px;
  color: #333;
  background: #ecf0f1;
  padding: 20px;
  border-radius: 8px;
  border: 1px solid #ddd;
`;

export const MetadataItem = styled.div`
  margin: 10px 0;
  font-size: 14px;
`;

export const Spinner = styled.div`
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
