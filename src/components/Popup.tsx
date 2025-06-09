import { useRouter } from 'next/router';
import React from 'react';
import { store } from './Scene';

type PopupProps = {
  setShowVRModal: (value: boolean) => void;
};
type ButtonProps = {
  text: string;
  onClickButton: (value?: boolean) => void;
};

const Button = ({ text, onClickButton }: ButtonProps) => {
  return (
    <button
      className="text-sm px-4 py-2 bg-white/10 hover:bg-white/20 rounded cursor-pointer w-full h-full"
      onClick={() => onClickButton()}
    >
      {text}
    </button>
  );
};

const Popup = ({ setShowVRModal }: PopupProps) => {
  const router = useRouter();
  const handleHome = () => {
    router.push(`/`);
  };

  const handleVR = () => {
    requestAnimationFrame(() => {
      store.enterVR();
      setShowVRModal(false);
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
      <div className="w-full max-w-md mx-4 p-6 rounded-xl bg-gray-900 border border-gray-700 text-white space-y-4 shadow-xl opacity-90 pointer-events-auto">
        <h2 className="text-lg font-semibold text-center">Explore in VR</h2>
        <p className="text-sm text-gray-300">
          Ready to explore beyond? Dive into a spiral of stars and darkness — your galaxy awaits in
          immersive 3D.
        </p>
        <div className="flex justify-center">
          <Button text={'Enter Immersive Mode'} onClickButton={handleVR} />
        </div>
        <div className="h-px w-full bg-white/50 my-6" />
        <div className="flex justify-around space-x-2">
          <div className="w-1/2">
            <Button text={'Forge a Galaxy'} onClickButton={handleHome} />
          </div>
          <div className="w-1/2">
            <Button text={'Close'} onClickButton={() => setShowVRModal(false)} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Popup;
