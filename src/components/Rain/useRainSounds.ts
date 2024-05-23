import { Howl } from "howler";
import { useEffect, useMemo } from "react";
import { useApp } from "../../useApp";

export function useRainSounds() {
  const started = useApp((s) => s.started);

  const { rainSound, nightSound, beatSound } = useMemo(
    () => ({
      rainSound: new Howl({
        src: "/audio/light-rain-109591.mp3",
        loop: true,
        volume: 0.5,
      }),
      nightSound: new Howl({
        src: "/audio/night-ambience-17064.mp3",
        loop: true,
        volume: 0.5,
      }),
      beatSound: new Howl({
        src: "/audio/minimal-109310.mp3",
        loop: true,
        volume: 0.5,
      }),
    }),
    []
  );

  useEffect(() => {
    if (started) {
      rainSound.fade(0, 0.5, 2000).play();
      nightSound.fade(0, 0.5, 2000).play();

      setTimeout(() => {
        beatSound.fade(0, 0.25, 2000).play();
      }, 13000);
    }
  }, [started]);
}
