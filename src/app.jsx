import { useState, useRef } from "preact/hooks";

import small from "./assets/small.jpg";
import large from "./assets/large.jpg";
// import large from "./assets/hd.jpg";
import "./app.scss";
let smallOffset = { top: 0, left: 0 };

export function App() {
  const smallRef = useRef(null);
  const largeRef = useRef(null);
  const [zoomArea, setZoomArea] = useState(100);
  const [zoomRadius, setZoomRadius] = useState(50);

  const checkoutImgRef = () => {
    if (smallRef) {
      smallOffset.top = smallRef?.current?.offsetTop;
      smallOffset.left = smallRef?.current?.offsetLeft;
    }
  };

  const showMagnified = (e) => {
    largeRef.current.className = "large show";
    smallOffset.top = smallRef.current?.offsetTop;
    smallOffset.left = smallRef.current?.offsetLeft;

    // e.pageX,e.pageY=> pointer and page top left
    // e.offsetX,e.offsetX=> pointer and image top left
    const tX = Math.max(
      zoomRadius,
      Math.min(smallRef.current.width - zoomRadius, e.offsetX)
    );
    const tY = Math.max(
      zoomRadius,
      Math.min(smallRef.current.height - zoomRadius, e.offsetY)
    );
    // Ratios
    var ratioX =
      (largeRef.current.width - window.innerWidth * 0.7) /
      (smallRef.current.width - zoomArea);
    var ratioY =
      (largeRef.current.height - window.innerHeight) /
      (smallRef.current.height - zoomArea);

    // Margin to be set in the original
    var marginLeft = -Math.floor((tX - zoomRadius) * ratioX);
    var marginTop = -Math.floor((tY - zoomRadius) * ratioY);
    // Apply zoom efect
    largeRef.current.style.marginLeft = `${marginLeft}px`;
    largeRef.current.style.marginTop = `${marginTop}px`;
  };

  return (
    <div className="container">
      <div className="subject">
        <h2>Magnifying Glass</h2>
        <img
          onMouseMove={(e) => {
            console.log("enter");
            showMagnified(e);
          }}
          onMouseLeave={() => {
            largeRef.current.className = "large";
          }}
          className="small"
          src={small}
          alt="chameleon small"
          ref={smallRef}
          onLoad={checkoutImgRef}
        />
        <h3>Hover over the image to see magnified view</h3>
      </div>
      <div className="magnified">
        <img
          className="large"
          ref={largeRef}
          src={large}
          alt="chameleon large"
          style={{ minHeight: window.innerHeight }}
        />
      </div>
    </div>
  );
}
