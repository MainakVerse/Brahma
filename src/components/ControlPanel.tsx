'use client';

import { useRef, useState } from 'react';
import { Slider, Label, Button } from '@/components';
import {
  Sparkles,
  Circle,
  GitBranch,
  RotateCcw,
  Shuffle,
  Power,
  Palette,
  
} from 'lucide-react';
import type { GalaxyParams } from '@/lib/types';

interface ControlPanelProps {
  galaxyParams: GalaxyParams;
  setGalaxyParams: (params: GalaxyParams) => void;
  onClickButton: () => void;
}

const ControlPanel = ({ galaxyParams, setGalaxyParams, onClickButton }: ControlPanelProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const updateParam = (param: keyof GalaxyParams, value: number | string) => {
    setGalaxyParams({
      ...galaxyParams,
      [param]: value,
    });
  };

  return (
    <div className="h-full bg-gray-900/90 backdrop-blur-sm px-6 overflow-y-auto flex flex-col justify-around space-y-4">
      <h2 className="text-xl font-semibold text-white mb-6">Galaxy Parameters</h2>

      {/* Audio Element */}
      <audio ref={audioRef} loop>
        <source src="OM.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>

      <div className="space-y-6">
        <div className="space-y-1 md:space-y-2">
          <div className="flex items-center justify-between">
            <Label className="flex items-center text-gray-300">
              <Sparkles size={16} className="mr-2 text-purple-400" />
              Stars
            </Label>
            <span className="text-sm text-gray-400">
              {galaxyParams.stars.toLocaleString('en-US')}
            </span>
          </div>
          <Slider
            value={galaxyParams.stars}
            min={1000}
            max={50000}
            step={1000}
            onChange={(value: number) => updateParam('stars', value)}
            className="[&>span]:bg-purple-500"
          />
        </div>

        <div className="space-y-1 md:space-y-2">
          <div className="flex items-center justify-between">
            <Label className="flex items-center text-gray-300">
              <Circle size={16} className="mr-2 text-cyan-400" />
              Galaxy Radius
            </Label>
            <span className="text-sm text-gray-400">{galaxyParams.radius.toFixed(1)}</span>
          </div>
          <Slider
            value={galaxyParams.radius}
            min={1}
            max={20}
            step={0.1}
            onChange={(value: number) => updateParam('radius', value)}
            className="[&>span]:bg-cyan-500"
          />
        </div>

        <div className="space-y-1 md:space-y-2">
          <div className="flex items-center justify-between">
            <Label className="flex items-center text-gray-300">
              <GitBranch size={16} className="mr-2 text-blue-400" />
              Spiral Branches
            </Label>
            <span className="text-sm text-gray-400">{galaxyParams.branches}</span>
          </div>
          <Slider
            value={galaxyParams.branches}
            min={2}
            max={20}
            step={1}
            onChange={(value: number) => updateParam('branches', value)}
            className="[&>span]:bg-blue-500"
          />
        </div>

        <div className="space-y-1 md:space-y-2">
          <div className="flex items-center justify-between">
            <Label className="flex items-center text-gray-300">
              <RotateCcw size={16} className="mr-2 text-indigo-400" />
              Spin
            </Label>
            <span className="text-sm text-gray-400">{galaxyParams.spin.toFixed(1)}</span>
          </div>
          <Slider
            value={galaxyParams.spin}
            min={-5}
            max={5}
            step={0.1}
            onChange={(value: number) => updateParam('spin', value)}
            className="[&>span]:bg-indigo-500"
          />
        </div>

        <div className="space-y-1 md:space-y-2">
          <div className="flex items-center justify-between">
            <Label className="flex items-center text-gray-300">
              <Shuffle size={16} className="mr-2 text-pink-400" />
              Randomness
            </Label>
            <span className="text-sm text-gray-400">{galaxyParams.randomness.toFixed(2)}</span>
          </div>
          <Slider
            value={galaxyParams.randomness}
            min={0}
            max={2}
            step={0.01}
            onChange={(value: number) => updateParam('randomness', value)}
            className="[&>span]:bg-pink-500"
          />
        </div>

        <div className="space-y-1 md:space-y-2">
          <div className="flex items-center justify-between">
            <Label className="flex items-center text-gray-300">
              <Power size={16} className="mr-2 text-orange-400" />
              Randomness Power
            </Label>
            <span className="text-sm text-gray-400">{galaxyParams.randomnessPower.toFixed(1)}</span>
          </div>
          <Slider
            value={galaxyParams.randomnessPower}
            min={1}
            max={10}
            step={0.1}
            onChange={(value: number) => updateParam('randomnessPower', value)}
            className="[&>span]:bg-orange-500"
          />
        </div>

        <div className="flex flex-row justify-around">
          <div className="space-y-1 md:space-y-2">
            <Label className="flex items-center text-gray-300">
              <Palette size={16} className="mr-2 text-blue-400" />
              Inside Color
            </Label>
            <div className="flex items-center space-x-2">
              <label className="flex items-center text-gray-300 space-x-2 cursor-pointer relative w-fit group">
                <div
                  className="w-8 h-8 rounded-full border border-gray-700"
                  style={{ backgroundColor: galaxyParams.insideColor }}
                />
                <span className="text-sm font-mono px-2 py-1 rounded bg-gray-800 border border-gray-700 text-white">
                  {galaxyParams.insideColor.toUpperCase()}
                </span>

                <input
                  type="color"
                  value={galaxyParams.insideColor}
                  onChange={(e) => updateParam('insideColor', e.target.value)}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  aria-label="Pick inside color"
                />
              </label>
            </div>
          </div>

          <div className="space-y-1 md:space-y-2">
            <Label className="flex items-center text-gray-300">
              <Palette size={16} className="mr-2 text-blue-400" />
              Outside Color
            </Label>
            <div className="flex items-center space-x-2">
              <label className="flex items-center text-gray-300 space-x-2 cursor-pointer relative w-fit group">
                <div
                  className="w-8 h-8 rounded-full border border-gray-700"
                  style={{ backgroundColor: galaxyParams.outsideColor }}
                />
                <span className="text-sm font-mono px-2 py-1 rounded bg-gray-800 border border-gray-700 text-white">
                  {galaxyParams.outsideColor.toUpperCase()}
                </span>

                <input
                  type="color"
                  value={galaxyParams.outsideColor}
                  onChange={(e) => updateParam('outsideColor', e.target.value)}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  aria-label="Pick outside color"
                />
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-center space-x-4 mt-4">
        <Button onClick={onClickButton}>View Galaxy</Button>
        <Button onClick={toggleMusic} className="flex items-center space-x-2">
          {isPlaying ? (
            <>
              
              <span>Pause Music</span>
            </>
          ) : (
            <>
              
              <span>Play Music</span>
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default ControlPanel;
