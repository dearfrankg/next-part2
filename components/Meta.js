import NextHead from "next/head";

const Head = props => (
  <div>
    <NextHead>
      <meta charSet="UTF-8" />
      <title>{props.title || ""}</title>
      <meta name="description" content={props.description || ""} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />

      <link
        href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"
        rel="stylesheet"
      />
    </NextHead>
  </div>
);

export default Head;
