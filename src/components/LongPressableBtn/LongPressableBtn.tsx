import { FC, useRef, useState } from "react";
import { Button } from "../ui/button";

const LongPressableBtn: FC<any> = ({
  onLongPress,
  onClick,
  delay = 500,
  className,
  children,
}) => {
  const [isLongPress, setIsLongPress] = useState(false);
  const timeoutRef = useRef<any>(null);

  const startPress = () => {
    setIsLongPress(false);
    timeoutRef!.current = setInterval(() => {
      setIsLongPress(true);
      onLongPress();
    }, delay);
  };

  const endPress = () => {
    clearTimeout(timeoutRef.current);
    if (!isLongPress && onClick) {
      onClick();
    }
  };

  return (
    <Button
      onMouseDown={startPress}
      onMouseUp={endPress}
      onMouseLeave={endPress} // Handle the case where the user drags the pointer out of the button
      onTouchStart={startPress}
      onTouchEnd={endPress}
      className={className}
    >
      {children}
    </Button>
  );
};

export default LongPressableBtn;
