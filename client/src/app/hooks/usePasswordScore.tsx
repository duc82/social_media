import { useEffect, useState } from "react";

export default function usePasswordScore(password: string) {
  const [score, setScore] = useState(0);

  useEffect(() => {
    if (!password) {
      setScore(0);
      return;
    }
    // regex one lowercase
    const lowerCaseLetters = /[a-z]/g;
    // regex one uppercase
    const upperCaseLetters = /[A-Z]/g;
    // regex one number
    const numbers = /[0-9]/g;
    // regex one special character
    const special = /[^A-Za-z0-9]/g;
    // regex length 8
    const length = 8;

    const scores = [
      password.match(lowerCaseLetters),
      password.match(upperCaseLetters),
      password.match(numbers),
      password.match(special),
      password.length >= length,
    ].filter(Boolean).length;
    setScore(scores);
  }, [password]);

  return score;
}
