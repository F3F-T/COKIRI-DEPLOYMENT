import React, { useState, useEffect, useMemo, useCallback } from "react";
import styles from "../../styles/loginAndSignup/EmailCheckOK.module.css";
import loginImg from "../../img/cokkiriLogo.png";
import { useNavigate } from "react-router-dom";
import Button from "../../component/common/Button";
import Api from "../../utils/api";
import { setToken } from "../../store/jwtTokenReducer";
import { setOnelineIntro, setUserInfo } from "../../store/userInfoReducer";
import {
  parcelAddress1,
  parcelAddress2,
  setAddressName1,
  setAddressName2,
  setLat1,
  setLat2,
  setLng1,
  setLng2,
  setUserAddressInfo1,
  setUserAddressInfo2,
} from "../../store/userAddressInfoReducer";
import { useDispatch, useSelector } from "react-redux";
import { Rootstate } from "../../index";
import Modal from "./ModalList";
import toastMsg from "../../styles/Toast";

const EmailCheckOK = () => {
  const navigate = useNavigate();
  const store = useSelector((state: Rootstate) => state);
  const dispatch = useDispatch();
  const startCokiri = () => {
    postLoginData();
    // onClickToggleModal();
    navigate(`/`);
  };

  const [isOpenModal, setOpenModal] = useState<boolean>(false);
  const onClickToggleModal = useCallback(() => {
    setOpenModal(!isOpenModal);
  }, [isOpenModal]);
  //회원가입 동시에 자동으로 로그인
  async function postLoginData() {
    //interceptor를 사용한 방식 (header에 token값 전달)
    try {
      const userInfo = {
        email: store.userInfoReducer.email,
        password: store.userInfoReducer.password,
      };
      const res = await Api.post("/login", userInfo);
      const accessToken = res.data;
      //jwt 토큰 redux에 넣기
      const jwtToken = accessToken.tokenInfo;
      dispatch(setToken(jwtToken));
      dispatch(setUserInfo(res.data.userInfo.userDetail));
      dispatch(setOnelineIntro(res.data.userInfo.userDetail.description));

      navigate(`/`);
    } catch (err) {
      console.log(err);
      toastMsg(
        "로그인에 실패하였습니다." +
          `\n` +
          "아이디 혹은 비밀번호를 다시 확인해주세요"
      );
    }
    // console.log(store.jwtTokenReducer);
    // console.log(store.jwtTokenReducer.accessToken);
    // console.log(store.jwtTokenReducer.authenticated);
    // console.log(store.jwtTokenReducer.accessTokenExpiresIn);
  }

  return (
    <>
      <div className={styles.EmailCheckAllContent}>
        <section className={styles.header}>
          <img src={loginImg} className={styles.loginImg}></img>
          <h1>코끼리에 오신걸 환영해요.</h1>
          <h2>동네 주민들과 물물교환을 시작해보세요!</h2>
        </section>
        <section className={styles.contents}>
          <Button
            content={"코끼리 시작하기"}
            className={"black"}
            onClick={startCokiri}
          />
        </section>
      </div>
    </>
  );
};

export default EmailCheckOK;
