import Prism from 'prismjs';
import axios from 'axios';
import Markdown from 'react-markdown'
import 'prismjs/themes/prism-tomorrow.css';
import "prismjs/components/prism-javascript";
import Editor from 'react-simple-code-editor'
import './App.css'
import { useState, useEffect } from "react"



function App() {
  const [review, setReview] = useState(``)
  const [code, setCode] = useState(` function sum() {
                return 1+1;
                }`)

  useEffect(() => {
    Prism.highlightAll();
  });

  async function codeReview() {
    const response = await axios.post('https://backend-production-ee75a.up.railway.app/ai/get-review', { code })
    setReview(response.data);
  }
  return (
    <>
      <main>
        <div className="left">
          <div className="code">
            <Editor
              value={code}
              onValueChange={setCode}
              highlight={code => Prism.highlight(code, Prism.languages.javascript, 'javascript')}
              padding={10}
              style={{
                height: "100%",
                width: "100%",
                border: "1px solid #ddd",
                borderRadius: "5px",
                fontFamily: '"Fira code", "Fira Mono", monospace',
                fontSize: 16,
                backgroundColor: "#282c34"
              }}
            />
          </div>
          <div onClick={codeReview} className="review-btn">Review</div>
        </div>
        <div className="right"><Markdown>{review}</Markdown></div>
      </main>
    </>
  )
}

export default App
