import GitHubRepos from "../components/GithubRepos";
import Meta from "../components/Meta";

const App = () => (
  <div>
    <Meta />
    <h1>Popular GitHub Javascript Repositories</h1>
    <GitHubRepos />

    <style jsx global>{`
      body {
        padding: 30px;
      }
    `}</style>
  </div>
);

export default App;
