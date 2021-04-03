import { useState, useCallback, useMemo } from 'react'

import Header from './components/Header'
import Footer from './components/Footer'

function App() {
  const [lang, setLang] = useState('en-US')
  const [speed, setSpeed] = useState(1)
  const [text, setText] = useState('')
  const [isLoadingSpeak, setIsLoadingSpeak] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)

  const languages = useMemo(() => ([
    {
      name: 'English',
      value: 'en-US'
    },
    {
      name: 'Português',
      value: 'pt-BR'
    }
  ]), [])

  const onPlay = useCallback(function() {
    setIsLoadingSpeak(true)
    setIsSpeaking(false)

    const utterance = new SpeechSynthesisUtterance();

    utterance.lang = lang
    utterance.rate = speed
    utterance.text = text
    utterance.onstart = () => {
      setIsLoadingSpeak(false)
      setIsSpeaking(true)
    }
    utterance.onend = () => {
      setIsSpeaking(false)
    }

    speechSynthesis.speak(utterance)
  }, [lang, speed, text])

  const onStop = useCallback(function () {    
    setIsSpeaking(false)

    speechSynthesis.pause()
  }, [])

  return (
    <div>
      <Header />

      <div className="container is-fluid">
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

          <div className="column field">
            <label className="label">Speed</label>
            <div className="select is-fullwidth is-primary is-medium">
              <select
                value={speed}
                onChange={({ target: { value } }) => setSpeed(value)}
              >
                <option value={0.25}>0.25x</option>
                <option value={0.5}>0.5x</option>
                <option value={0.75}>0.75x</option>
                <option value={1}>1x</option>
                <option value={1.25}>1.25x</option>
                <option value={1.5}>1.50x</option>
                <option value={1.75}>1.75x</option>
                <option value={2}>2x</option>
              </select>
            </div>
          </div>
        </div>

        <div className="field">
          <label className="label">Text</label>
          <textarea
            className="textarea is-primary"
            placeholder="O Captain! my Captain! our fearful trip is done; The ship has weathered every rack, the prize we sought is won;"
            rows="15"
            value={text}
            onChange={({ target: { value } }) => setText(value)}
            disabled={isLoadingSpeak}
          >
          </textarea>
        </div>

        <div className="field has-addons has-text-centered is-justify-content-center">
          <div className="control">
            <button
              className="button is-danger is-medium px-6"
              onClick={onStop}
              disabled={!isSpeaking}
            >
              <span class="icon is-small">
                <i class="fas fa-pause"></i>
              </span>
              <span>Stop</span>
            </button>
          </div>
          <div className="control">
            <button
              className={`button is-primary is-medium px-6 ${isLoadingSpeak && 'is-loading'}`}
              onClick={onPlay}
              disabled={!text.length}
            >
              <span>Play</span>
              <span className="icon is-small">
                <i className="fas fa-play"></i>
              </span>
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default App;
