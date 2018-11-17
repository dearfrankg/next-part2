import GitHubRepos from "../components/GithubRepos";
import { Pane } from "evergreen-ui";

const App = () => (
  <div>
    <h1>Popular GitHub Javascript Repositories</h1>
    <Pane display="flex" alignItems="center" justifyContent="center" paddingTop={40}>
      <GitHubRepos />
    </Pane>

    <style jsx global>{`
      body {
        padding: 30px;
      }
    `}</style>
  </div>
);

export default App;
