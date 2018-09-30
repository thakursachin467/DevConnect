import React, { Component } from "react";

class ProfileAction extends Component {
  render() {
    return (
      <div className="profile-card-ctr">
        <button className="profile-card__button button--blue js-message-btn">
          Message
        </button>
        <button className="profile-card__button button--orange">Follow</button>
      </div>
    );
  }
}

export default ProfileAction;
