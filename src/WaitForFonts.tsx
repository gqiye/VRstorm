import { PropsWithChildren, useLayoutEffect, useState } from "react";

export function WaitForFonts({ children }: PropsWithChildren) {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useLayoutEffect(() => {
    document.fonts.ready.then(() => {
      setFontsLoaded(true);
    });
  }, []);

  return fontsLoaded ? <>{children}</> : null!;
}
