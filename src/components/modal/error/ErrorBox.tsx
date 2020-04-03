import React, { useState, useEffect } from "react";
import { CSSTransition } from "react-transition-group";

export type ErrorBoxType = {
  children: any;
};

function ErrorBox({ children }: ErrorBoxType) {
  const [view, setView] = useState(true);
  const [callCss, setCallCss] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setCallCss(true), 200);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setCallCss(false), 2800);
    const timer2 = setTimeout(() => setView(false), 3000);

    return () => {
      clearTimeout(timer);
      clearTimeout(timer2);
    };
  }, [view]);

  return (
    <>
      {view && (
        <CSSTransition in={callCss} timeout={10} classNames="error">
          <div className="px-3 bg-red-500 text-white text-center mb-3 rounded shadow py-1 text-2xl opacity-0">
            {children}
          </div>
        </CSSTransition>
      )}
    </>
  );
}

export default ErrorBox;
