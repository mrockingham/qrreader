/* eslint-disable array-callback-return */
import { useState } from 'react';
import { Html5Qrcode } from '@cosva-lab/html5-qrcode';

import {
  Text,
  // Menu,
  // MenuButton,
  // MenuList,
  // MenuItem,
  Button,
  Link,
  Box,
} from '@chakra-ui/react';
import './App.css';

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

// interface CameraProps {
//   CamName: CameraList;
// }

function App() {
  const [camLabel, setCamLabel] = useState<CameraList>([]);
  const [camMessage, setCamMessage] = useState('');
  const [scan, setScan] = useState(false);

  const openQRScanner = () => {
    Html5Qrcode.getCameras().then(devices => {
      setCamLabel(devices);
      if (devices && devices.length) {
        const html5QrCode = new Html5Qrcode('reader');
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
    setScan(true);
  };

  // useEffect(() => {
  //   const starts = Html5Qrcode.getCameras().then(devices => {
  //     setCamLabel(devices);
  //     if (devices && devices.length) {
  //       const html5QrCode = new Html5Qrcode('reader');
  //       const qrCodeSuccessCallback = message => {
  //         console.log(message);
  //         setCamMessage(message);
  //       };
  //       const config = { fps: 10, qrbox: 250 };
  //       html5QrCode.start(
  //         { facingMode: 'environment' },
  //         config,
  //         qrCodeSuccessCallback
  //       );
  //     }
  //   });

  //   console.log('starting', starts);
  // }, []);

  // console.log('starting', starts);
  console.log('labels', camLabel);

  return (
    <Box mt={10} className="App">
      <div id="reader"></div>
      <Text>Click to Scan Profile</Text>
      <Button colorScheme="teal" size="md" onClick={openQRScanner}>
        Profile
      </Button>
      {/* <Menu>
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
      </Menu> */}
      <Text visibility={scan === false ? 'hidden' : 'visible'}>
        Scanning...
      </Text>
      <Box visibility={camMessage.length === 0 ? 'hidden' : 'visible'}>
        <Link href={camMessage}>Click To Go To Profile</Link>
      </Box>
      <div id="reader2"></div>
    </Box>
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
