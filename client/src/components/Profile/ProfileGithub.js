import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';

class ProfileGithub extends Component {
    constructor(props) {
        super(props)
        this.state = {
            clientId: '8deef25e259ae6d1b74b',
            clientSecret: 'b89660aecc02a5b36051165c57fc9c7263bfbaae',
            count: 5,
            sort: 'created: asc',
            repo: []
        }
    }
    componentDidMount() {
        const { username } = this.props
        const { count, sort, clientId, clientSecret } = this.state
        fetch(`https://api.github.com/users/${username}/repos?per_page=${count}&sort=${sort}&client_id=${clientId}&client_secret=${clientSecret}`)
            .then((res) => res.json())
            .then((data) => {
                if (this.refs.myRef) {
                    this.setState({ repo: data })
                }


            })
            .catch((err) => console.log(err))

    }
    render() {
        const { repo } = this.state;
        const repoItems = repo.map((rep) => {
            <div key={repo.id} className="card card-body mb-2">
                <div className="row">
                    <div className="col-md-6">
                        <h4>
                            <Link to={repo.html_url} className="text-info" target="_blank">{repo.name}</Link>
                        </h4>
                        <p>{repo.description}</p>

                    </div>
                    <div className="col-md-6">
                        <span className="badge badge-info mr-1"><strong>STARS:</strong> {repo.stargazers_count}</span>
                        <span className="badge badge-secondary mr-1"><strong>Watchers:</strong> {repo.watchers_count}</span>
                        <span className="badge badge-sucsess "><strong>Forks:</strong> {repo.forks_count}</span>

                    </div>

                </div>
            </div>
        })
        return (
            <div refs="myref">
                <hr />
                <h3 className="mb-4">Latest github repos</h3>
                {repoItems}

            </div>
        )
    }
}

ProfileGithub.propTypes = {
    username: propTypes.string.isRequired
}

export default ProfileGithub;