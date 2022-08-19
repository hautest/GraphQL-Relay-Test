import { useState, useEffect } from "react";
import fetchGraphQL from "./fetchGraphQL";

function App() {
  const [name, setName] = useState(null);

  useEffect(() => {
    let isMounted = true;
    fetchGraphQL(`
      query RepositoryNameQuery {
        # feel free to change owner/name here
        repository(owner: "facebook" name: "relay") {
          name
        }
      }
    `)
      .then((response) => {
        if (!isMounted) {
          return;
        }
        const data = response.data;
        setName(data.repository.name);
      })
      .catch((error) => {
        console.error(error);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <p>{name != null ? `Repository: ${name}` : "Loading"}</p>
      </header>
    </div>
  );
}

export default App;
