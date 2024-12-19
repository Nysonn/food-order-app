import { useEffect } from "react";

function App() {
  useEffect(() => {
    fetch("http://localhost:3000/meals")
      .then((res) => res.json())
      .then(console.log);
  }, []);

  return (
    <>
      <h1>You got this 💪</h1>
      <p>Stuck? Not sure how to proceed?</p>
      <p>Don't worry - we've all been there. Let's build it together!</p>
    </>
  );
}

export default App;
