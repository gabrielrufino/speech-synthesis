import { useState, useCallback, useMemo } from 'react'

import Header from './components/Header'

function App() {
  const [lang, setLang] = useState('en-US')
  const [text, setText] = useState('')

  const languages = useMemo(() => ([
    {
      name: 'English',
      value: 'en-US'
    },
    {
      name: 'Português',
      value: 'pt-BR'
    }
  ]))

  const onPlay = useCallback(function() {
    const utterance = new SpeechSynthesisUtterance();

    utterance.text = text
    utterance.lang = lang

    speechSynthesis.speak(utterance)
  }, [text, lang])

  const onStop = useCallback(function () {
    speechSynthesis.pause()
  }, [])

  return (
    <div>
      <Header />

      <div className="container">
        <div className="columns">
          <div className="column field">
            <label className="label">Language</label>
            <div className="select is-fullwidth is-primary is-medium">
              <select onChange={({ target: { value } }) => setLang(value)}>
                {languages.map(language => (
                  <option value={language.value} key={language.value}>{language.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="column">
            <label className="label">Voice</label>
            <div className="select is-fullwidth is-primary is-medium">
              <select>
                <option value="default">Default</option>
              </select>
            </div>
          </div>
        </div>

        <div className="field">
          <label className="label">Text</label>
          <textarea
            className="textarea is-primary"
            placeholder="O Captain! my Captain! our fearful trip is done; The ship has weathered every rack, the prize we sought is won;"
            rows="10"
            value={text}
            onChange={({ target: { value } }) => setText(value)}>
          </textarea>
        </div>

        <div className="buttons are-medium">
          <button className="button is-danger" onClick={onStop}>Stop</button>
          <button className="button is-primary" onClick={onPlay}>Play</button>
        </div>
      </div>
    </div>
  );
}

export default App;
