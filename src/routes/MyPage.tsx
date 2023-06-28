import React, { useEffect, useState } from "react";
import styles from "../styles/loginAndSignup/MyPage.module.css";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Card from "../component/tradeCard/Card";
import Api from "../utils/api";
import { useDispatch, useSelector } from "react-redux";
import { Rootstate } from "../index";

// interface TextInputProps {
//     init: string;
// }
interface PostType {
  content: [
    {
      postId?: number;
      title?: string;
      thumbNail?: string;
      likeCount: number;
      tradeStatus: string;
      wishCategory?: string;
    }
  ];
}

const MyPage = () => {
  const [tab1, setTab] = useState<string>("curr");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { state } = useLocation(); //다른 유저꺼 받을 때

  const params = useParams();
  let paramsId = parseInt(params.id);

  const [otherPost, setOtherPostList] = useState(null);

  const detail = useSelector((state: Rootstate) => {
    return state.postDetailReducer;
  });
  const info = useSelector((state: Rootstate) => {
    return state.userInfoReducer;
  });
  const store = useSelector((state: Rootstate) => state);
  const [postList, setPostList] = useState<PostType[]>(null);

  async function getMyPostList() {
    try {
      const res = await Api.get("/user/posts");
      setPostList((prevState) => {
        return [...res.data.content];
      });
    } catch (err) {
      console.log(err);
      alert("내 게시글 불러오기 실패");
    }
  }

  async function getUserPost_2() {
    try {
      const res = await Api.get(`/post/user/${paramsId}`);
      setOtherPostList((prevState) => {
        return [...res.data.content];
      });
    } catch (err) {
      console.log(err);
      alert("실패인가");
    }
  }

  //TODO: 의성) state로 하는게 아니라 useParams 로 하는거임 /289 뒤에 id를 검증해야지

  // useEffect(() => {
  //     if (state == null || state == info.id) {
  //         getMyPostList();
  //     }
  // }, [])
  // useEffect(() => {
  //     if (state != null && state != info.id) {
  //         getUserPost_2();
  //     }
  // }, [])

  useEffect(() => {
    if (paramsId === info.id) {
      getMyPostList();
    }
  }, []);
  useEffect(() => {
    if (paramsId != info.id) {
      getUserPost_2();
    }
  }, []);

  // getMyPostList();

  if (paramsId === info.id) {
    if (!postList) {
      return null;
    }
  }

  if (paramsId != info.id) {
    if (!otherPost) {
      return null;
    }
  }

  const onClickPost = (post) => {
    navigate(`/post/${post.postId}`);
  };

  return (
    <div className={styles.wrap}>
      <div className={styles.MyPage}>
        {/*<div className={styles.menu}>*/}
        {/*    <button className={`${styles["post"+(tab1 ==="curr"? "" : "active")]}`}  onClick={() =>{ setDealTab('curr'); navigate('/mypage');}}>게시글</button>*/}
        {/*    <button className={styles.zzimactive} onClick={()=>{navigate('/mypage/zzim')}}>관심 상품</button>*/}
        {/*</div>*/}
        <div className={styles.container}>
          {
            // state == null ?
            //   postList.reverse().map((SingleObject: Object) => (
            //     <Card className={'forMypage'} postTitle={SingleObject['title']}
            //           like={SingleObject['likeCount']} wishCategory={SingleObject['wishCategory']}
            //           thumbnail={SingleObject['thumbNail']}
            //           onClick={() => {
            //             onClickPost(SingleObject);
            //           }} />
            //   ))
            //
            //
            //   :

            paramsId === info.id
              ? postList.reverse().map((SingleObject: Object) => (
                  <Card
                    className={"forMypage"}
                    postTitle={SingleObject["title"]}
                    like={SingleObject["likeCount"]}
                    wishCategory={SingleObject["wishCategory"]}
                    thumbnail={SingleObject["thumbNail"]}
                    onClick={() => {
                      onClickPost(SingleObject);
                    }}
                  />
                ))
              : otherPost.reverse().map((SingleObject: Object) => (
                  <Card
                    className={"forMypage"}
                    postTitle={SingleObject["title"]}
                    like={SingleObject["likeCount"]}
                    wishCategory={SingleObject["wishCategory"]}
                    thumbnail={SingleObject["thumbNail"]}
                    onClick={() => {
                      onClickPost(SingleObject);
                    }}
                  />
                ))

            // postList.map((post)=>(
            //     <Card  className={"forMypage"} postTitle={post['title']} like={20} wishCategory={postList['wishCategory']}
            //            onClick={() => {onClickPost(post)}}/>
            // ))
            // https://velog.io/@op032/%EB%A0%8C%EB%8D%94%EB%A7%81-%EB%AC%B8%EC%A0%9C%EB%A5%BC-%ED%95%B4%EA%B2%B0%ED%95%B4%EB%B3%B4%EC%9E%90-TypeError-Cannot-read-property-title-of-undefined
          }
        </div>
      </div>

      {/*<Footer/>*/}
    </div>
  );
};

export default MyPage;
