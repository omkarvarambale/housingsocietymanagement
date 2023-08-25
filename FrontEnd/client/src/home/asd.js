// import React, { useState, useEffect } from 'react';

// function YourComponent() {
//   const [uploadProgress, setUploadProgress] = useState(0);
//   const [isButtonDisabled, setIsButtonDisabled] = useState(true);
//   const [isUploadStarted, setIsUploadStarted] = useState(false);

//   const handleSaveImageClick = () => {
//     setIsUploadStarted(true);
//     setUploadProgress(0);
//     setIsButtonDisabled(true);

//     setTimeout(() => {
//       setIsButtonDisabled(false);
//     }, 5000);
//   };

//   useEffect(() => {
//     if (isUploadStarted) {
//       const interval = setInterval(() => {
//         if (uploadProgress < 100) {
//           setUploadProgress(uploadProgress + 1);
//         } else {
//           setIsButtonDisabled(false);
//           clearInterval(interval);
//         }
//       }, 50);

//       setTimeout(() => {
//         clearInterval(interval);
//       }, 5000);

//       return () => {
//         clearInterval(interval);
//       };
//     }
//   }, [uploadProgress, isUploadStarted]);

//   return (
//     <div>
//       <input
//         type="range"
//         min="0"
//         max="100"
//         value={uploadProgress}
//         readOnly
//         style={{ display: isUploadStarted ? 'block' : 'none' }}
//       />

//       <button
//         onClick={handleSaveImageClick}
//         disabled={isButtonDisabled}
//       >
//         {isButtonDisabled ? 'Disabled' : 'Enabled'} Button
//       </button>
//     </div>
//   );
// }

// export default YourComponent;
