import createHistory from '../createMemoryHistory'
import * as TestSequences from './TestSequences'

describe('a memory history', () => {
  describe('by default', () => {
    let history
    beforeEach(() => {
      history = createHistory()
    })

    describe('listen', () => {
      it('does not immediately call listeners', (done) => {
        TestSequences.Listen(history, done)
      })
    })

    describe('the initial location', () => {
      it('does not have a key', (done) => {
        TestSequences.InitialLocationNoKey(history, done)
      })
    })

    describe('push a new path', () => {
      it('calls change listeners with the new location', (done) => {
        TestSequences.PushNewLocation(history, done)
      })
    })

    describe('push the same path', () => {
      it('calls change listeners with the new location', (done) => {
        TestSequences.PushSamePath(history, done)
      })
    })

    describe('replace a new path', () => {
      it('calls change listeners with the new location', (done) => {
        TestSequences.ReplaceNewLocation(history, done)
      })
    })

    describe('replace the same path', () => {
      it('calls change listeners with the new location', (done) => {
        TestSequences.ReplaceSamePath(history, done)
      })
    })

    describe('goBack', () => {
      it('calls change listeners with the previous location', (done) => {
        TestSequences.GoBack(history, done)
      })
    })

    describe('goForward', () => {
      it('calls change listeners with the next location', (done) => {
        TestSequences.GoForward(history, done)
      })
    })
  })

  describe('that denies all transitions', () => {
    const getUserConfirmation = (_, callback) => callback(false)

    let history
    beforeEach(() => {
      history = createHistory({
        getUserConfirmation
      })
    })

    describe('push', () => {
      it('does not update the location', (done) => {
        TestSequences.DenyPush(history, done)
      })
    })

    describe('goBack', () => {
      it('does not update the location', (done) => {
        TestSequences.DenyGoBack(history, done)
      })
    })

    describe('goForward', () => {
      it('does not update the location', (done) => {
        TestSequences.DenyGoForward(history, done)
      })
    })
  })

  describe('a transition hook', () => {
    const getUserConfirmation = (_, callback) => callback(true)

    let history
    beforeEach(() => {
      history = createHistory({
        getUserConfirmation
      })
    })

    it('receives the next location and action as arguments', (done) => {
      TestSequences.TransitionHookArgs(history, done)
    })

    it('cancels the transition when it returns false', (done) => {
      TestSequences.ReturnFalseTransitionHook(history, done)
    })
  })
})
