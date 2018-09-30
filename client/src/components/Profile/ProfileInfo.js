import React, { Component } from "react";

class ProfileAction extends Component {
  render() {
    return (
      <div className="profile-card-inf">
        <div className="profile-card-inf__item">
          <div className="profile-card-inf__title">1598</div>
          <div className="profile-card-inf__txt">Followers</div>
        </div>

        <div className="profile-card-inf__item">
          <div className="profile-card-inf__title">65</div>
          <div className="profile-card-inf__txt">Following</div>
        </div>

        <div className="profile-card-inf__item">
          <div className="profile-card-inf__title">123</div>
          <div className="profile-card-inf__txt">Articles</div>
        </div>
      </div>
    );
  }
}

export default ProfileAction;
