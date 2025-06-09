import { Html } from '@react-three/drei';

const Loader = () => {
  return (
    <Html center>
      <div className="flex flex-col items-center space-y-6 text-white">
        <div className="relative w-16 h-16">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-white rounded-full"
              style={{
                top: '50%',
                left: '50%',
                transform: `rotate(${i * 45}deg) translate(30%)`,
                transformOrigin: 'center left',
                animation: 'spin 1s linear infinite',
                animationDelay: `${i * 0.1}s`,
              }}
            />
          ))}
        </div>

        <p className="text-sm text-gray-300 font-mono animate-typing whitespace-nowrap overflow-hidden border-r border-white">
          Generating galaxy...
        </p>

        <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg) translate(30%); }
          100% { transform: rotate(360deg) translate(30%); }
        }
        @keyframes typing {
          from { width: 0; }
          to { width: 100%; }
        }
        @keyframes blink {
          50% { border-color: transparent; }
        }
        .animate-typing {
          width: 15ch;
          animation: typing 2s steps(15), blink 0.7s step-end infinite;
        }
      `}</style>
      </div>
    </Html>
  );
};

export default Loader;
