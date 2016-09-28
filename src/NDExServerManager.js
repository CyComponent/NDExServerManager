
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import NDExServerManager from './component/NDExServerManager'

import {
  serverActions,
  settingActions
} from 'ndex-store'

function mapStateToProps(state) {
  return {
    servers: state.ndex.servers,
    settings: state.ndex.settings
  }
}

function mapDispatchToProps(dispatch) {
  return {
    serverActions: bindActionCreators(serverActions, dispatch),
    settingActions: bindActionCreators(settingActions, dispatch)
  }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(NDExServerManager)
