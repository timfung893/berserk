import React from "react";
import { Alert, AlertContainer } from "react-bs-notifier";
import { connect } from "react-redux";
import "./Noti.css";
const Noti = (props) => {
  function showNoti() {
    if (props.showNoti === false) return null;
  }
  showNoti();

  function onDismiss() {
    props.OffNoti();
  }

  return (
    <AlertContainer>
      <Alert type={props.notiType} onDismiss={() => onDismiss()} timeout={700}>
        {props.notiContent}
      </Alert>
    </AlertContainer>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    showNoti: state.showNoti,
    notiContent: state.notiContent,
    notiType: state.notiType,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    OffNoti: () => {
      dispatch({ type: "NOTI_OFF" });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Noti);
