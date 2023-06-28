import styles from "../../styles/loginAndSignup/ProfileModal.module.css";
import React, { PropsWithChildren, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Rootstate } from "../../index";
import AddressChange from "./Settings/AddressChange";
import NickNameChange from "./Settings/NickNameChange";
import PasswordChange from "./Settings/PasswordChange";
import UserDelete from "./Settings/UserDelete";
import { useLocation } from "react-router-dom";

interface ModalDefaultType {
  onClickToggleModal: () => void;
  num: number;
}
interface AddressType {
  userId: Number;
  addressName: string;
  postalAddress: string; //우편번호
  latitude: string;
  longitude: string;
}

function SettingModal({
  onClickToggleModal,
  num,
}: PropsWithChildren<ModalDefaultType>) {
  const { state } = useLocation();
  console.log("state확인좀 하자ㅏㅏㅏㅏㅏㅏ", state);
  console.log("num 확인 하자ㅏㅏㅏㅏㅏㅏ", num);

  const addressR = useSelector((state: Rootstate) => {
    return state.userAddressInfoReducer;
  });

  const [selectList, setSelectList] = useState(1);
  console.log("주소1이 잘 들어갔나", addressR);
  useEffect(() => {
    if (state && state.num) {
      setSelectList(state.num);
    }
  }, [state]);
  useEffect(() => {
    if (num == 3) {
      setSelectList(num);
    }
  }, [num]);
  return (
    <div className={styles.box1}>
      <div className={styles.box2}>
        <div className={styles.left}>
          <button
            className={
              selectList === 1 ? `${styles.left_1_active}` : `${styles.left_1}`
            }
            onClick={() => {
              setSelectList(1);
            }}
          >
            닉네임 변경
          </button>
          <button
            className={
              selectList === 2 ? `${styles.left_1_active}` : `${styles.left_1}`
            }
            onClick={() => {
              setSelectList(2);
            }}
          >
            비밀번호 변경
          </button>
          <button
            className={
              selectList === 3 ? `${styles.left_1_active}` : `${styles.left_1}`
            }
            onClick={() => {
              setSelectList(3);
            }}
          >
            주소 변경
          </button>
          <button
            className={
              selectList === 5 ? `${styles.left_1_active}` : `${styles.left_1}`
            }
            onClick={() => {
              setSelectList(5);
            }}
          >
            계정 탈퇴
          </button>
          <div className={styles.left_2}>
            <div className={styles.left_21}>COKIRI</div>
            <div className={styles.left_22}>계정 센터</div>
            <div className={styles.left_23}>
              개인정보 변경 및 회원 탈퇴 등 COKIRI 설정을 관리하세요.
            </div>
          </div>
        </div>
        <div className={styles.right}>
          {selectList == 1 ? <NickNameChange /> : <></>}
          {selectList == 2 ? <PasswordChange /> : <></>}
          {selectList == 3 ? <AddressChange /> : <></>}
          {selectList == 5 ? <UserDelete /> : <></>}
        </div>
      </div>
      <div
        className={styles.box3}
        onClick={(e: React.MouseEvent) => {
          e.preventDefault();
          if (onClickToggleModal) {
            onClickToggleModal();
          }
        }}
      />
    </div>
  );
}

export default SettingModal;
