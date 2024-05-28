import { useEffect } from 'react';
import { VRButton } from 'three/examples/jsm/webxr/VRButton.js';
import { useThree } from '@react-three/fiber';

export function VRbutton() {
  const { gl } = useThree();

  useEffect(() => {
    // Check if VRButton is already created
    if (!document.querySelector('.vr-button')) {
      const button = VRButton.createButton(gl);
      button.classList.add('vr-button');
      document.body.appendChild(button);
      gl.xr.enabled = true;
    }
    const handleResize = () => {
      if (!gl.xr.isPresenting) {
        const width = window.innerWidth;
        const height = window.innerHeight;
        gl.setSize(width, height);
      }
    };
    window.addEventListener('resize', handleResize);

    // Clean up function to remove the VRButton on component unmount
    return () => {
      const vrButton = document.querySelector('.vr-button');
      if (vrButton) {
        document.body.removeChild(vrButton);
      }
      window.removeEventListener('resize', handleResize);
    };
  }, [gl]);

  return null;
}

export default VRbutton;