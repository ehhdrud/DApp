import { useEffect, useRef } from "react";
import MetaFox from "@metamask/logo";
import "./styles/metamask.css";

const MetamaskLogo = () => {
  const metaFox = useRef(null);
  const metaFoxOn = useRef(false);

  useEffect(() => {
    if (
      window.document !== null &&
      window.document !== undefined &&
      !metaFoxOn.current
    ) {
      metaFox.current = MetaFox({
        pxNotRatio: true,
        width: 30,
        height: 30,
        followMouse: true,
      });

      const divMetaFox = document.getElementsByClassName("metafox");

      if (divMetaFox.length > 0) {
        divMetaFox[0].insertBefore(
          metaFox.current.container,
          divMetaFox[0].firstChild
        );
      }

      metaFoxOn.current = true;
    }

    return () => {
      delete metaFox.current;
    };
  }, []);

  return <div className="metafox" />;
};

export default MetamaskLogo;
