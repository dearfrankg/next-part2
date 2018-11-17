import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from "axios";

const Repo = ({ repo, index }) => (
  <tr>
    <td>{index + 1}</td>
    <td className="repo-name">{repo.name}</td>
    <td>{repo.stargazers_count} Stars</td>
    <style jsx>{`
      .repo-name {
        font-weight: bold;
      }
    `}</style>
  </tr>
);

export default class GitHubRepos extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      repos: [],
      loading: true,
      error: null
    };
  }

  componentDidMount() {
    axios
      .get(
        window.encodeURI(
          `https://api.github.com/search/repositories?q=stars:>1+language:javascript&sort=stars&order=desc&type=Repositories`
        )
      )
      .then(response => {
        const repos = response.data.items;
        this.setState({
          repos,
          loading: false
        });
      })
      .catch(error => {
        this.setState({
          error: error,
          loading: false
        });
      });
  }

  renderLoading() {
    return <div>...</div>;
  }

  renderError() {
    return (
      <div>
        <div>Sorry, an error ocurred: {this.state.error.response.data.message}</div>
      </div>
    );
  }

  render() {
    const { error, loading, repos } = this.state;

    if (error) return this.renderError();

    if (loading) return this.renderLoading();

    return (
      <table className="table table-striped">
        <thead>
          <tr>
            <th>#</th>
            <th>Repo Name</th>
            <th>Stars Count</th>
          </tr>
        </thead>
        <tbody>
          {repos.map((repo, index) => (
            <Repo repo={repo} index={index} key={repo.id} />
          ))}
        </tbody>
      </table>
    );
  }
}
