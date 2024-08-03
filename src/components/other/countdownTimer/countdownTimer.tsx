import React, { useState, useEffect } from "react";

interface CountdownTimerProps {
  initialMinutes?: number;
  initialSeconds?: number;
  changeEndState: () => void;
  isRestart: number;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({
  initialMinutes = 1,
  initialSeconds = 0,
  changeEndState,
  isRestart,
}) => {
  const [minutes, setMinutes] = useState<number>(initialMinutes);
  const [seconds, setSeconds] = useState<number>(initialSeconds);
  const [isRunning, setIsRunning] = useState<boolean>(true);

  useEffect(() => {
    let timerInterval: NodeJS.Timeout | null = null;

    if (isRunning) {
      if (minutes > 0 || seconds > 0) {
        timerInterval = setInterval(() => {
          if (seconds === 0) {
            if (minutes > 0) {
              setMinutes(minutes - 1);
              setSeconds(59);
            }
          } else {
            setSeconds(seconds - 1);
          }
        }, 1000);
      } else if (minutes === 0 && seconds === 0) {
        setIsRunning(false);
        changeEndState();
        if (timerInterval) {
          clearInterval(timerInterval);
        }
      }
    }

    return () => {
      if (timerInterval) {
        clearInterval(timerInterval);
      }
    };
  }, [minutes, seconds, isRunning]);

  const formatTime = (value: number): string => {
    return value < 10 ? `0${value}` : value.toString();
  };

  const handleRestart = () => {
    setMinutes(initialMinutes);
    setSeconds(initialSeconds);
    setIsRunning(true);
  };

  useEffect(() => {
    if (isRestart) {
      handleRestart();
    }
  }, [isRestart]);

  return <span>{`${formatTime(minutes)}:${formatTime(seconds)}`}</span>;
};

export default CountdownTimer;
