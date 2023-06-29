import React, { useEffect } from "react";
import { BrowserView, MobileView } from "react-device-detect";
import Home from "./routes/Home";
import { Route, Routes } from "react-router-dom";
import MyPage from "./routes/MyPage";
import MulmulTrade from "./routes/물물교환, 끼리끼리 화면/MulmulTrade";
import MulmulTrade2 from "./routes/물물교환, 끼리끼리 화면/MulmulTrade2";
import KiriKiriTrade from "./routes/물물교환, 끼리끼리 화면/KiriKiriTrade";
import Nav from "./component/Nav";
import NotFound from "./component/NotFound";
import Login from "./routes/로그인 & 회원가입/Login";
import SignUp from "./routes/로그인 & 회원가입/SignUp";
import EmailCheck from "./routes/로그인 & 회원가입/EmailCheck";
import PostUpload from "./routes/게시글/PostUpload";
import Zzim from "./routes/Zzim";
import NeighborAuth from "./routes/로그인 & 회원가입/NeighborAuth";

import styles from "./styles/App.module.css";
import EmailCheckOK from "./routes/로그인 & 회원가입/EmailCheckOK";
import PostDetail from "./routes/게시글/PostDetail";
import MulmulTrade1 from "./routes/물물교환, 끼리끼리 화면/MulMulTrade1";
import { useDispatch, useSelector } from "react-redux";
import { Rootstate } from "./index";
import MyPageSet from "./component/MyPageSet";
import TagSearch from "./routes/물물교환, 끼리끼리 화면/TagSearch";
import PostEdit from "./routes/게시글/PostEdit";
import FindID from "./routes/로그인 & 회원가입/아이디 찾기/FindID";
import FindIDResponse from "./routes/로그인 & 회원가입/아이디 찾기/FindIDResponse";
import FindPW from "./routes/로그인 & 회원가입/비밀번호 찾기/FindPW";
import FindPWResponse from "./routes/로그인 & 회원가입/비밀번호 찾기/FindPWResponse";
import Footer from "./routes/Footer";
import KokiriTalk2 from "./routes/코끼리톡/KokiriTalk_Euisung";
import StyledContainer from "./styles/Toast/container";
import { ToastContainer } from "react-toastify";
import Api from "./utils/api";
import { setAuthenticated, setToken } from "./store/jwtTokenReducer";

function App() {
  const store = useSelector((state: Rootstate) => state);
  const dispatch = useDispatch();

  // 현재 시간과 액세스 토큰의 만료 시간을 비교하여 유효성을 검증하는 함수
  function isAccessTokenValid(accessTokenExpiresIn) {
    // 현재 시간을 가져옵니다.
    const currentTime = new Date().getTime();

    // 액세스 토큰의 만료 시간을 계산합니다.
    const expirationTime = currentTime + accessTokenExpiresIn;

    console.log(currentTime);
    console.log(expirationTime);
    console.log(accessTokenExpiresIn);
    // 액세스 토큰이 만료되었는지 검증합니다.
    if (expirationTime <= currentTime) {
      // 만료되었으면 false를 반환합니다.
      return false;
    }

    // 유효한 액세스 토큰이면 true를 반환합니다.
    return true;
  }

  // 액세스 토큰의 유효성을 검증하는 예시

  async function reissue() {
    //interceptor를 사용한 방식 (header에 token값 전달)
    try {
      const jsonObj = { accessToken: store.jwtTokenReducer.accessToken };
      const data = await Api.post("/auth/reissue", jsonObj);
      dispatch(setToken(data.data));
      console.log("reissue성공");
    } catch (err) {
      console.log(err);
      alert("get 실패");
    }
  }

  useEffect(() => {
    const accessTokenExpiresIn = store.jwtTokenReducer.accessTokenExpiresIn; // 액세스 토큰의 유효 기간 (밀리초 단위)
    const isValid = isAccessTokenValid(accessTokenExpiresIn);

    if (isValid) {
      console.log("액세스 토큰이 유효합니다.");
    } else {
      console.log("액세스 토큰이 만료되었습니다.");
      dispatch(setAuthenticated());
    }
  }, []);

  useEffect(() => {
    if (store.jwtTokenReducer.authenticated) {
      //처음 들어갈때 reissue해준다

      reissue();
    } else {
      console.log("비 로그인 상태 ");
      console.log(store.jwtTokenReducer);
    }
  }, [store.jwtTokenReducer.authenticated]);

  return (
    <div className="App">
      <BrowserView>
        <Nav />
        <div className={styles.content_1}>
          <div className={styles.content}>
            <StyledContainer position="top-center" closeButton={false} />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/findid" element={<FindID />} />

              <Route path="/findid/response" element={<FindIDResponse />} />
              <Route path="/findpw" element={<FindPW />} />
              <Route path="/findpw/response" element={<FindPWResponse />} />

              <Route path="/signup" element={<SignUp />} />
              <Route path="/signup/emailcheck" element={<EmailCheck />} />
              <Route path="/signup/emailcheck/ok" element={<EmailCheckOK />} />

              <Route path="/mulmultrade" element={<MulmulTrade />}>
                <Route path="" element={<MulmulTrade1 />} />
                <Route path="mulmultrade2" element={<MulmulTrade2 />} />
              </Route>

              <Route path="/kirikiritrade" element={<KiriKiriTrade />} />
              <Route path="/tagsearch" element={<TagSearch />} />

              <Route path="/mypage/" element={<MyPageSet />}>
                <Route path=":id" element={<MyPage />} />
                <Route path="zzim/:id" element={<Zzim />} />
              </Route>
              <Route path="/kokiritalk/:id" element={<KokiriTalk2 />} />
              <Route path="/post/:id" element={<PostDetail />} />
              <Route path="/upload" element={<PostUpload />} />
              <Route path="/post/:id/edit" element={<PostEdit />} />
              <Route path="/neighborauth" element={<NeighborAuth />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </BrowserView>

      <MobileView>
        <Nav />
        <div className={styles.content_1}>
          <div className={styles.content}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/findid" element={<FindID />} />

              <Route path="/findid/response" element={<FindIDResponse />} />
              <Route path="/findpw" element={<FindPW />} />
              <Route path="/findpw/response" element={<FindPWResponse />} />

              <Route path="/signup" element={<SignUp />} />
              <Route path="/signup/emailcheck" element={<EmailCheck />} />
              <Route path="/signup/emailcheck/ok" element={<EmailCheckOK />} />

              <Route path="/mulmultrade" element={<MulmulTrade />}>
                <Route path="" element={<MulmulTrade1 />} />
                <Route path="mulmultrade2" element={<MulmulTrade2 />} />
              </Route>

              <Route path="/kirikiritrade" element={<KiriKiriTrade />} />
              <Route path="/tagsearch" element={<TagSearch />} />

              <Route path="/mypage/" element={<MyPageSet />}>
                <Route path=":id" element={<MyPage />} />
                <Route path="zzim/:id" element={<Zzim />} />
              </Route>
              {/*<Route path="/mypage" element={<MyPage/>}/ >*/}
              {/*<Route path="/mypage/zzim" element={<Zzim/>} />*/}

              <Route path="/kokiritalk/:id" element={<KokiriTalk2 />} />

              <Route path="/post/:id" element={<PostDetail />} />
              <Route path="/upload" element={<PostUpload />} />
              <Route path="/post/:id/edit" element={<PostEdit />} />
              <Route path="/neighborauth" element={<NeighborAuth />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </MobileView>
    </div>
  );
}

export default App;
