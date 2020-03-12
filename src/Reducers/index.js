import { combineReducers } from 'redux'

import productosReducer from './productosReducer'
import alertReducers from './alertReducers'

export default combineReducers({
    productos: productosReducer,
    alertas: alertReducers
})