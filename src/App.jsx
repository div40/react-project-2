import React, { useState, useCallback, useEffect, useRef } from "react";
import "./index.css";

const App = () => {
  //useState hook
  const [length, setLength] = useState(8);
  const [allowNumber, setAllowNumber] = useState(false);
  const [allowCharacters, setAllowCharacters] = useState(false);
  const [password, setPassword] = useState("");

  //useRef hook
  const passwordRef = useRef(null);

  //useCallback hook
  const passwordGenerator = useCallback(() => {
    let pass = ""; //generated password stored here which is given to setPassword
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"; //data to generate password
    if (allowNumber) str += "0123456789"; //adds number to data in str if user checks numbers
    if (allowCharacters) str += "!@#$%^&*()_+-="; //adds special characters to data if user checks character

    //password generation
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, allowNumber, allowCharacters, setPassword]); //dependencies is for optimization (cached)

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select(); //selects/highlights the generated password
    passwordRef.current?.setSelectionRange(0, 20); //define the selection range i.e no. of characters
    window.navigator.clipboard.writeText(password); //window obj not available in nextjs as it uses SSR
  }, [password]);
  //useEffect hook
  useEffect(() => {
    passwordGenerator();
  }, [length, allowNumber, allowCharacters, passwordGenerator]); //for rerun ~ if any change then rerun(for now)

  return (
    <>
      <div className="bg-gray-700 h-screen w-full flex justify-center">
        <div className="bg-zinc-800 w-3/4 max-w-xl h-fit px-10 py-5 rounded-none my-56 shadow-2xl">
          <h1 className="text-4xl text-white my-10 text-center">
            PASSWORD GENERATOR
          </h1>
          <div className="overflow-hidden flex ">
            <input
              type="text"
              value={password}
              placeholder="Password"
              readOnly
              ref={passwordRef}
              className="w-full outline-none py-2 px-3 mb-20 rounded-none shadow-lg font-normal text-lg"
            />
            <button
              onClick={copyPasswordToClipboard}
              className="flex justify-center text-center text-white bg-sky-500 hover:bg-sky-700 shadow-lg h-fit w-fit px-5 py-2.5 rounded-none"
            >
              COPY
            </button>
          </div>
          <div className="text-lg flex gap-x-10">
            <div className="flex items-center justify-center gap-x-1">
              <input
                type="range"
                min={6}
                max={20}
                value={length}
                className="cursor-pointer"
                onChange={(e) => {
                  setLength(e.target.value); //takes event e and changes value of length using setlength by taking value e.target.value
                }}
              />
              <label className="text-sky-500">Length: {length}</label>
            </div>
            <div className="flex items-center justify-center gap-x-1">
              <input
                type="checkbox"
                id="numberInput"
                defaultChecked={allowNumber} //default value
                onChange={() => {
                  setAllowNumber((prev) => !prev); //checkbox working-reverse of previous value
                }}
              />
              <label htmlFor="numberInput" className="text-sky-500">
                Numbers
              </label>
            </div>
            <div className="flex items-center justify-center gap-x-1">
              <input
                type="checkbox"
                id="characterInput"
                defaultChecked={allowCharacters} //default value
                onChange={() => {
                  setAllowCharacters((prev) => !prev); //checkbox working-reverse of previous value
                }}
              />
              <label htmlFor="characterInput" className="text-sky-500">
                Characters
              </label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
