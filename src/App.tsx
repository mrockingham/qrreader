/* eslint-disable array-callback-return */
import { useState, useEffect } from 'react';
import { Html5Qrcode } from '@cosva-lab/html5-qrcode';

import {
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
} from '@chakra-ui/react';
import './App.css';
import { idText } from 'typescript';

// function onScanSuccess(decodedText: any, decodedResult: any) {
//   // Handle on success condition with the decoded text or result.
//   console.log(`Scan result: ${decodedText}`, decodedResult);
// }
// function onScanError(errorMessage: any) {
//   // handle on error condition, with error message
//   console.log(errorMessage);
// }

// var html5QrcodeScanner = new Html5QrcodeScanner('reader', {
//   fps: 10,
//   qrbox: 250,
// });
// html5QrcodeScanner.render(onScanSuccess, onScanError);

interface CameraProps {
  CamName: CameraList;
}

function App() {
  const [camLabel, setCamLabel] = useState<CameraList>([]);
  const [camMessage, setCamMessage] = useState('');
  const [camError, setCamError] = useState('');

  const openQRScanner = () => {
    Html5Qrcode.getCameras()
      .then(devices => {
        setCamLabel(devices);
        if (devices && devices.length) {
          var cameraId = devices[0].id;
          // .. use this to start scanning.
        }
      })
      .catch(err => {
        // handle err
      });
  };

  useEffect(() => {
    const html5QrCode = new Html5Qrcode('reader');

    const starts = Html5Qrcode.getCameras().then(devices => {
      setCamLabel(devices);
      if (devices && devices.length) {
        var cameraId = devices[0].id;
        const html5QrCode = new Html5Qrcode(/* element id */ 'reader');
        const qrCodeSuccessCallback = message => {
          console.log(message);
          setCamMessage(message);
        };
        const config = { fps: 10, qrbox: 250 };
        html5QrCode.start(
          { facingMode: 'environment' },
          config,
          qrCodeSuccessCallback
        );
      }
    });
    {
    }
    console.log('starting', starts);
  }, []);

  // console.log('starting', starts);
  console.log('labels', camLabel);

  return (
    <div className="App">
      Something
      <div id="reader"></div>
      <Text>Select Camera</Text>
      <Button colorScheme="teal" size="md" onClick={openQRScanner}>
        OpenQR
      </Button>
      <Menu>
        {({ isOpen }) => (
          <>
            <MenuButton size="lg" isActive={isOpen} as={Button}>
              {isOpen ? 'Close' : 'Open'}
            </MenuButton>
            <MenuList>
              <MenuItem onClick={() => alert('Kagebunshin')}>pizza</MenuItem>
              <MenuItem onClick={() => alert('Kagebunshin')}>pizza</MenuItem>
              {camLabel.map(camera => (
                <MenuItem key={+camera.id} onClick={() => alert('Kagebunshin')}>
                  {camera.label} pizza
                </MenuItem>
              ))}
            </MenuList>
          </>
        )}
      </Menu>
      <div>cam:message {camMessage}</div>
      <div>cam:error{camError}</div>
      <div id="reader2"></div>
    </div>
  );
}

export default App;

// <Menu>
//   {({ isOpen }) => (
//     <>
//       <MenuButton isActive={isOpen} as={Button}>
//         {isOpen ? 'Close' : 'Open'}
//       </MenuButton>
//       <MenuList>
//         {/* {camLabel.map(camera => {
//           <div>
//           </div>;
//         })} */}
//         <MenuItem onClick={() => alert('Kagebunshin')}>
//           {/* {camera.label} */}pi
//         </MenuItem>
//         <MenuItem onClick={() => alert('Kagebunshin')}>
//           {/* {camera.label} */}pi
//         </MenuItem>
//       </MenuList>
//     </>
//   )}
// </Menu>
