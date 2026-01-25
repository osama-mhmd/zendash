import { cn } from "@/utils";
import { Close } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import React from "react";
import { createPortal } from "react-dom";

interface CommonProps {
  children?: React.ReactNode;
  className?: string;
}
interface PanelProps extends CommonProps {
  defaultValue?: boolean;
  onClose?: () => void;
  onOpen?: () => void;
  overlayClose?: boolean;
}
interface PanelBodyProps extends CommonProps {
  layer?: number;
}

const ctx = React.createContext({
  visible: false,
  setVisiblity: (() => {}) as React.Dispatch<React.SetStateAction<boolean>>,
  onClose: () => {},
  onOpen: () => {},
  overlayClose: true,
});

function Panel({
  children,
  defaultValue,
  onOpen,
  onClose,
  overlayClose,
}: PanelProps) {
  const [visible, setVisiblity] = React.useState(defaultValue ?? false);

  return (
    <ctx.Provider
      value={{
        visible,
        setVisiblity,
        onOpen: onOpen ?? (() => {}),
        onClose: onClose ?? (() => {}),
        overlayClose: overlayClose ?? true,
      }}
    >
      {children}
    </ctx.Provider>
  );
}

function PanelAction({ children }: { children?: React.ReactNode }) {
  const { setVisiblity, onOpen } = React.useContext(ctx);

  return (
    <div
      onClick={() => {
        onOpen();
        setVisiblity(true);
      }}
      className="w-fit"
    >
      {children}
    </div>
  );
}

function PanelBody({ children, className, layer }: PanelBodyProps) {
  const { visible, setVisiblity, onClose, overlayClose } =
    React.useContext(ctx);

  return createPortal(
    <>
      {visible && (
        <div
          className="overlay"
          onMouseDown={(e) => {
            if (!overlayClose) return;
            if (e.currentTarget !== e.target) return;
            onClose();
            setVisiblity(false);
          }}
        >
          <div
            className={cn("panel", className)}
            onClick={(e) => e.stopPropagation()}
            style={{
              zIndex: (layer ?? 1) * 10,
            }}
          >
            <HugeiconsIcon
              icon={Close}
              size={30}
              onClick={() => {
                onClose();
                setVisiblity(false);
              }}
              className="p-1.5 cursor-pointer rounded-full border absolute right-2 top-2"
            />
            {children}
          </div>
        </div>
      )}
    </>,
    document.body,
  );
}

export { Panel, PanelAction, PanelBody };
