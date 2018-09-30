import React, { Component } from "react";
import { Link } from "react-router-dom";
import propTypes from "prop-types";

class ProfileGithub extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clientId: "8deef25e259ae6d1b74b",
      clientSecret: "b89660aecc02a5b36051165c57fc9c7263bfbaae",
      count: 5,
      sort: "created: asc",
      repo: []
    };
    this.fetchGithubData = this.fetchGithubData.bind(this);
  }

  componentDidMount() {}

  fetchGithubData(username) {
    const { count, sort, clientId, clientSecret } = this.state;
    fetch(
      `https://api.github.com/users/${username}/repos?per_page=${count}&sort=${sort}&client_id=${clientId}&client_secret=${clientSecret}`
    )
      .then(res => res.json())
      .then(data => {
        this.setState({ repo: data });
      })
      .catch(err => console.log(err));
  }

  render() {
    const { username } = this.props;
    this.fetchGithubData(username);
    const { repo } = this.state;
    const repoItems = repo.map(rep => {
      return (
        <div key={rep.id} className="card card-body mb-2">
          <div className="row">
            <div className="col-md-6">
              <h4>
                <a href={rep.html_url} className="text-info" target="_blank">
                  {rep.name}
                </a>
              </h4>
              <p>{repo.description}</p>
            </div>
            <div className="col-md-6">
              <span className="badge badge-info mr-1">
                <strong>Stars:</strong> {rep.stargazers_count}
              </span>
              <span className="badge badge-secondary mr-1">
                <strong>Watchers:</strong> {rep.watchers_count}
              </span>
              <span className="badge badge-sucsess ">
                <strong>Forks:</strong> {rep.forks_count}
              </span>
            </div>
          </div>
        </div>
      );
    });
    return (
      <div refs="myref">
        <hr />
        <h3 className="mb-4">Latest github repos</h3>
        {repoItems}
      </div>
    );
  }
}

ProfileGithub.propTypes = {
  username: propTypes.string.isRequired
};

export default ProfileGithub;
