import React, { useState, useEffect, useMemo, useCallback } from "react";
import styles from "../../styles/loginAndSignup/Login.module.scss";
import loginImg from "../../img/cokkiriLogo.png";
import { useNavigate } from "react-router-dom";
import TextInput from "../../component/common/TextInput";
import Button from "../../component/common/Button";
import axios from "axios";
import { useGoogleLogin } from "@react-oauth/google";
import { useDispatch, useSelector } from "react-redux";
import { setToken, logoutToken } from "../../store/jwtTokenReducer";
import { Rootstate } from "../../index";
import {
  setUserInfo,
  setOnelineIntro,
  logoutUserInfo,
  setPW,
} from "../../store/userInfoReducer";
import {
  parcelAddress1,
  parcelAddress2,
  setAddressName1,
  setAddressName2,
  setLat1,
  setLat2,
  setLng1,
  setLng2,
  setOneWord1,
  setUserAddressInfo1,
  setUserAddressInfo2,
} from "../../store/userAddressInfoReducer";
import toastMsg from "../../styles/Toast";

const Login = () => {
  //성공기원
  const store = useSelector((state: Rootstate) => state);
  const dispatch = useDispatch();

  const [isOpenModal, setOpenModal] = useState<boolean>(false);

  const onClickToggleModal = useCallback(() => {
    setOpenModal(!isOpenModal);
  }, [isOpenModal]);

  const [email, setEmail] = useState("");
  const [google, setGoogle] = useState("");
  interface UserInfo {
    email: string;
    password: string;
  }

  const [passwordCheck, setpasswordCheck] = useState<boolean>(undefined);
  const [userInfo, setuserInfo] = useState<UserInfo>(null);
  const [postResult, setPostResult] = useState(null);
  const navigate = useNavigate();

  const signInClick = () => {
    navigate(`/signup`);
  };

  const onChangeEmail = (e) => {
    setuserInfo((prevState) => {
      return { ...prevState, email: e.target.value };
    });
  };

  const onChangePassword = (e) => {
    setuserInfo((prevState) => {
      return { ...prevState, password: e.target.value };
    });
    dispatch(setPW(e.target.value));
  };
  async function postLoginData() {
    //interceptor를 사용한 방식 (header에 token값 전달)
    try {
      const res = await axios.post("https://f3f-cokiri.site/login", userInfo);
      const accessToken = res.data;
      //jwt 토큰 redux에 넣기
      const jwtToken = accessToken.tokenInfo;
      dispatch(setToken(jwtToken));
      dispatch(setUserInfo(res.data.userInfo.userDetail));
      dispatch(setOnelineIntro(res.data.userInfo.userDetail.description));
      if (res.data.userInfo.address[0] != null) {
        dispatch(setUserAddressInfo1(res.data.userInfo.address[0].id));
        dispatch(setAddressName1(res.data.userInfo.address[0].addressName));
        dispatch(parcelAddress1(res.data.userInfo.address[0].postalAddress));
        const oneWord1 = res.data.userInfo.address[0].postalAddress.split(" ");
        const dongName1 = oneWord1[2];
        dispatch(setOneWord1(dongName1));
        dispatch(setLat1(res.data.userInfo.address[0].latitude));
        dispatch(setLng1(res.data.userInfo.address[0].longitude));
      }
      if (res.data.userInfo.address[1] != null) {
        dispatch(setUserAddressInfo2(res.data.userInfo.address[1].id));
        dispatch(setAddressName2(res.data.userInfo.address[1].addressName));
        dispatch(parcelAddress2(res.data.userInfo.address[1].postalAddress));
        const oneWord2 = res.data.userInfo.address[0].postalAddress.split(" ");
        const dongName2 = oneWord2[2];
        dispatch(setOneWord1(dongName2));
        dispatch(setLat2(res.data.userInfo.address[1].latitude));
        dispatch(setLng2(res.data.userInfo.address[1].longitude));
      }
      toastMsg("로그인 성공");
      navigate(`/`);
    } catch (err) {
      toastMsg(
        "로그인에 실패했어요. 아이디 혹은 비밀번호를 다시 확인해주세요!"
      );
      console.log(err);
    }
  }
  const handleClick = () => {
    console.log(userInfo);
    postLoginData();
  };
  const googleLogin = useGoogleLogin({
    onSuccess: async (response) => {
      try {
        const res = await axios.get(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: {
              Authorization: `Bearer ${response.access_token}`,
            },
          }
        );
        const data = res.data;
        const googleUserInfo1 = {
          token: response.access_token,
        };
        const res1 = await axios.post(
          "https://f3f-cokiri.site/auth/social_login/google",
          googleUserInfo1
        );
        const jwtToken = res1.data.tokenInfo;
        dispatch(logoutToken());
        dispatch(setToken(jwtToken));
        dispatch(logoutUserInfo());
        dispatch(setUserInfo(res1.data.userInfo.userDetail));
        dispatch(setOnelineIntro(res1.data.userInfo.userDetail.description));

        if (res1.data.userInfo.address[0] != null) {
          dispatch(setUserAddressInfo1(res1.data.userInfo.address[0].id));
          dispatch(setAddressName1(res1.data.userInfo.address[0].addressName));
          dispatch(parcelAddress1(res1.data.userInfo.address[0].postalAddress));
          dispatch(setLat1(res1.data.userInfo.address[0].latitude));
          dispatch(setLng1(res1.data.userInfo.address[0].longitude));
        }
        if (res1.data.userInfo.address[1] != null) {
          dispatch(setUserAddressInfo2(res1.data.userInfo.address[1].id));
          dispatch(setAddressName2(res1.data.userInfo.address[1].addressName));
          dispatch(parcelAddress2(res1.data.userInfo.address[1].postalAddress));
          dispatch(setLat2(res1.data.userInfo.address[1].latitude));
          dispatch(setLng2(res1.data.userInfo.address[1].longitude));
        }
        // dispatch(setUserNick(res1.data.userInfo.nickname))//얘는 뱉는거로
        // dispatch(setUserName(res1.data.userInfo.userName))
        // dispatch(setUserProfile(res1.data.userInfo.imageUrl))
        // dispatch(setOnelineIntro(res1.data.userInfo.description))
        navigate(`/`);
      } catch (err) {
        console.log(err);
      }
    },
  });

  const findId = () => {
    navigate(`/findid`);
  };

  const findPw = () => {
    navigate("/findpw");
  };

  return (
    <>
      <div className={styles.box}>
        <div className={styles.loginAllContent}>
          <section className={styles.header}>
            <img src={loginImg} className={styles.loginImg}></img>
            <h1>코끼리로 물물교환 시작하기</h1>
            <h2>간편하게 가입하고 우리동네 물건들을 확인하세요</h2>
          </section>
          <section className={styles.contents}>
            <div className={styles.loginContents}>
              <fieldset>
                <div className={styles.idAndPassword}>
                  <TextInput
                    type={"text"}
                    placeholder={"코끼리 ID(이메일)을 입력해주세요."}
                    onBlur={onChangeEmail}
                  />
                  <div className={styles.password}>
                    <TextInput
                      type={"password"}
                      placeholder={"비밀번호를 입력해주세요."}
                      onBlur={onChangePassword}
                    />
                  </div>
                </div>
                <div className={styles.savedIdCheck}>
                  <label>
                    <input type="checkbox" /> 로그인 상태 유지
                  </label>
                </div>
                <Button
                  className={"black"}
                  onClick={handleClick}
                  content={"코끼리 로그인"}
                />
              </fieldset>
            </div>
            <div className={styles.loginMenu}>
              <span className={styles.signup} onClick={signInClick}>
                회원가입
              </span>
              <span className={styles.findId} onClick={findId}>
                ID 찾기
              </span>
              <span className={styles.findPw} onClick={findPw}>
                비밀번호 찾기
              </span>
            </div>
          </section>
          {/*<Button className={"white"} onClick={()=>{  onClickToggleModal(); }} content={"구글 로그인"}/>*/}
          {/*@ts-ignore*/}
          <Button
            className={"white"}
            /*@ts-ignore*/
            onClick={googleLogin}
            content={"구글 로그인"}
          />
        </div>
      </div>
    </>
  );
};
//

export default Login;
