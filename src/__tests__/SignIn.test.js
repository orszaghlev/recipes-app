import { render, fireEvent, act, waitFor } from '@testing-library/react'
import { BrowserRouter as Router } from 'react-router-dom'
import SignIn from '../components/SignIn'
import FirebaseContext from '../contexts/FirebaseContext'
import { Context as ResponsiveContext } from 'react-responsive'

describe('<SignIn/>', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('Megjelenik a bejelentkezés mobilon', async () => {
    const succeededToLogin = jest.fn(() => Promise.resolve('Sikeres bejelentkezés!'))
    const firebase = {
      auth: jest.fn(() => ({
        signInWithEmailAndPassword: succeededToLogin
      }))
    };

    render(
      <Router>
        <FirebaseContext.Provider value={{ firebase }}>
          <ResponsiveContext.Provider value={{ width: 300 }}>
            <SignIn />
          </ResponsiveContext.Provider>
        </FirebaseContext.Provider>
      </Router>
    )
  })

  it('Sikeres bejelentkezés asztali eszközön', async () => {
    const succeededToLogin = jest.fn(() => Promise.resolve('Sikeres bejelentkezés!'))
    const firebase = {
      auth: jest.fn(() => ({
        signInWithEmailAndPassword: succeededToLogin
      }))
    };

    const { getByTestId } = render(
      <Router>
        <FirebaseContext.Provider value={{ firebase }}>
          <SignIn />
        </FirebaseContext.Provider>
      </Router>
    )

    await act(async () => {
      await fireEvent.change(getByTestId('input-email'), {
        target: { value: 'orszaghlev@gmail.com' }
      });
      await fireEvent.change(getByTestId('input-password'), {
        target: { value: 'test1234' }
      });
      fireEvent.submit(getByTestId('login'))
    })
  })

  it('Sikertelen bejelentkezés asztali eszközön', async () => {
    jest.useFakeTimers()
    const failToLogin = jest.fn(() => Promise.reject(new Error('Sikertelen bejelentkezés!')))
    const firebase = {
      auth: jest.fn(() => ({
        signInWithEmailAndPassword: failToLogin
      }))
    };
    const { getByTestId, queryByTestId } = render(
      <Router>
        <FirebaseContext.Provider value={{ firebase }}>
          <SignIn />
        </FirebaseContext.Provider>
      </Router>
    );

    await act(async () => {
      await fireEvent.change(getByTestId('input-email'), {
        target: { value: 'orszaghlev.com' }
      });
      await fireEvent.change(getByTestId('input-password'), {
        target: { value: 'test1234' }
      });
      fireEvent.submit(getByTestId('login'))
      jest.advanceTimersByTime(5001)
    })
  })
})