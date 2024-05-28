import * as React from "react";
// 雨滴
import { Drops } from "./Drops"; 
// 水花
import { Splashes } from "./Splashes";
// 雨声播放
import { useRainSounds } from "./useRainSounds";

// Rain 组件接受一个 children 属性，类型为 React.PropsWithChildren，这意味着它可以包含子组件。
export function Rain({ children }: React.PropsWithChildren) {
  useRainSounds();

  const splashRef = React.useRef<THREE.Group>(null!);
  const dropsRef = React.useRef<THREE.Group>(null!);

  

  return (
    <group>
      <Drops ref={dropsRef} />
      <Splashes ref={splashRef}>
        {/* 克隆并添加属性 */}
        
        {React.cloneElement(children as any, {
          splashRef,
          dropsRef,
        })}
      </Splashes>
    </group>
  );
}
