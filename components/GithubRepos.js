import React, { Component } from "react";
import axios from "axios";
import { Table, Pane, Spinner } from "evergreen-ui";
import { MOCK_URL } from "../mock/config.json";

const API_URL = MOCK_URL
  ? MOCK_URL
  : `https://api.github.com/search/repositories?q=stars:>1+language:javascript&sort=stars&order=desc&type=Repositories`;

const Repo = ({ repo, index }) => (
  <Table.Row key={index} isSelectable onSelect={() => alert(repo.name)}>
    <Table.TextCell flexBasis="8vw" flexShrink={0} flexGrow={0}>
      {index + 1}
    </Table.TextCell>
    <Table.TextCell flexBasis="40vw" flexShrink={0} flexGrow={0}>
      <span className="repo-name">{repo.name}</span>
    </Table.TextCell>
    <Table.TextCell flexBasis="20vw" flexShrink={0} flexGrow={1} isNumber>
      {repo.stargazers_count}
    </Table.TextCell>

    <style jsx>{`
      .repo-name {
        font-weight: bold;
      }
    `}</style>
  </Table.Row>
);

export default class GitHubRepos extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      repos: [],
      loading: true,
      error: null,
      query: ""
    };
  }

  componentDidMount() {
    axios
      .get(window.encodeURI(API_URL))
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
    return (
      <Pane>
        <Spinner delay={1} marginX="auto" marginY={120} />
      </Pane>
    );
  }

  renderNoneFound() {
    return <div>None Found...</div>;
  }

  renderError() {
    return (
      <div>
        <div>Sorry, an error ocurred: {this.state.error.response.data.message}</div>
      </div>
    );
  }

  onChangeQuery = e => {
    this.setState({ query: e });
  };

  render() {
    const { error, loading, repos, query } = this.state;

    if (error) return this.renderError();

    if (loading) return this.renderLoading();

    if (repos.length === 0) return this.renderNoneFound();

    return (
      <Table border="default" borderRadius={5} width="80vw">
        <Table.Head>
          <Table.TextHeaderCell flexBasis="8vw" flexShrink={0} flexGrow={0}>
            #
          </Table.TextHeaderCell>
          <Table.SearchHeaderCell
            flexBasis="40vw"
            flexShrink={0}
            flexGrow={0}
            onChange={this.onChangeQuery}
            placeholder="Search by name..."
          />
          <Table.TextHeaderCell flexBasis="20vw" flexShrink={0} flexGrow={1}>
            Stars Count
          </Table.TextHeaderCell>
        </Table.Head>
        <Table.Body maxHeight={400}>
          {repos
            .filter(repo => repo.name.startsWith(query))
            .map((repo, index) => (
              <Repo repo={repo} index={index} key={index} />
            ))}
        </Table.Body>
      </Table>
    );
  }
}
