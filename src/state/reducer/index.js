import { combineReducers } from 'redux'
import log from './log'
import endpoints from './endpoints'
import request from './request'

export default combineReducers( { endpoints, log, request } )
