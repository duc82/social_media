import { useEffect, useState } from "react";

const classNameScore: Record<number, string> = {
  0: "",
  1: "psms-20",
  2: "psms-40",
  3: "psms-60",
  4: "psms-80",
  5: "psms-100"
};

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
      password.length >= length
    ].filter(Boolean).length;
    setScore(scores);
  }, [password]);

  return { pwdScore: score, pwdScoreClassName: classNameScore[score] };
}
