import logo from './logo.svg';
import './App.css';
import { Dialog, DialogContent } from '@material-ui/core';
import { BiArrowBack } from 'react-icons/bi';
import { FaFileUpload } from 'react-icons/fa';
import { TiTick } from 'react-icons/ti';
import React, { useRef, useState } from 'react';

function App() {
  const inputRef = useRef(null);
  const [jsonDataString, setJsonDataString] = useState('');
  const [showDialog, setShowDialog] = useState(false);
  const [error, setError] = useState('');

  const onChangeFile = async (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();

      reader.onload = function (event) {
        const fileContent = event.target.result;
        try {
          const jsonData = JSON.parse(fileContent);
          const jsonDataString = JSON.stringify(jsonData, null, 2);
          setJsonDataString(jsonDataString);
          setError('');
        } catch (error) {
          setError('Invalid JSON file. Please select a valid JSON file.');
        }
      };

      reader.readAsText(file);
    }
  };

  const handleImage = () => {
    inputRef.current.click();
  };

  const handleSubmit = () => {
    setShowDialog(true);
  };

  const handleCancel = () => {
    setShowDialog(false);
  };

  return (
    <div className="container">
      <div className="containerBox">
        <Dialog open={showDialog}>
          <DialogContent className="dialog">
            <TiTick style={{ fontSize: '100px', color: '#4381FF' }} />
            <p style={{ color: '#4381FF', fontWeight: '600' }}>Success</p>
            <p>524 entries successfully uploaded</p>
            <button className="btn1">Go to My Entries</button>
            <button className="btn2" onClick={handleCancel}>
              Cancel
            </button>
          </DialogContent>
        </Dialog>
        <div className="background">
          <div className="header">
            <BiArrowBack style={{ fontSize: '1.4rem', marginTop: '2px' }} />
            <p style={{ fontWeight: '500', fontSize: '1.4rem' }}>Submit form</p>
          </div>
          <div className="textfeild">
            <p style={{ fontSize: '1.0rem' }}>Full name</p>
            <input className="input" placeholder="Full name" />
            <p style={{ fontSize: '1.0rem' }}>Email</p>
            <input className="input" placeholder="Email" />
            <p style={{ fontSize: '1.0rem' }}>Upload JSON file</p>
            <div className="upload">
              <FaFileUpload
                onClick={handleImage}
                style={{ color: '#4381FF', fontSize: '1.9rem', cursor: 'pointer' }}
              />
              <input type="file" ref={inputRef} onChange={onChangeFile} id="input_json" style={{ display: 'none' }} />
            </div>
            {error && <p className="error">{error}</p>}
            <p style={{ fontSize: '1.0rem' }}>File Contents</p>
            <textarea value={jsonDataString} className="inputJSON" readOnly />
            <button className="btn" onClick={handleSubmit}>
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
