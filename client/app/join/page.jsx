"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import React from "react";
import { useAccount } from "wagmi";

import { $JoinWrapper } from "./style";

function Page() {
  const router = useRouter();
  const { isConnected, address } = useAccount();
  const inputRef = useRef();

  const onClickBtn = async () => {
    if (isConnected) {
      console.log(inputRef.current.value);
      try {
        await axios.post("http://3.34.138.199:8080/api/signup", {
          userWallet: address,
          userNickname: inputRef.current.value,
        });
        const response = await axios.post(
          "http://3.34.138.199:8080/api/login",
          {
            userWallet: address,
          }
        );
        const data = response.data;
        if (response.status === 200) {
          // 로그인 성공
          setCookie("id", data, 1);
          router.push("/");
        }
        console.log(response.data);
      } catch (error) {
        console.log(error.response.status);
      }
    }
  };

  return (
    <$JoinWrapper>
      <div className="signal_box">
        <h1>Write NickName</h1>
        <textarea
          name="textarea"
          id="textarea"
          cols="30"
          rows="10"
          maxLength={140}
          ref={inputRef}
        />
        <div className="button_box">
          <button onClick={onClickBtn}>join us</button>
        </div>
      </div>
    </$JoinWrapper>
  );
}

export default Page;
