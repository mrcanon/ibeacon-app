import { createStore, compose, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { logger } from 'redux-logger'
import reducerUser from './services/users/reducer'

const rootReducer = combineReducers({
    user: reducerUser
})

export default function configureStore() {
    let finalCreateStore = compose(
        global.devToolsExtension ? global.devToolsExtension() : f => f,
    )(createStore)

    const store = createStore(rootReducer, applyMiddleware(thunk, logger))

    return store
}