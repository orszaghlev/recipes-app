import ReactDOM from 'react-dom'
import App from './App'
import FirebaseContext from './contexts/FirebaseContext'
import { firebase } from './lib/Firebase'

ReactDOM.render(
  <FirebaseContext.Provider value={{ firebase }}>
    <App />
  </FirebaseContext.Provider>,
  document.getElementById('root')
)