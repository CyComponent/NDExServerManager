
import React from 'react'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'

import ServerCards from './ServerCards'
import ServerEditorDialog from './ServerEditorDialog'

import RaisedButton from 'material-ui/RaisedButton'
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar'


export default class NDexServerManager extends React.Component {

  static defaultProps = {
    style: {
      width: '100%',
      height: '100%',
      overflow: 'hidden'
    },
    theme: {}
  }

  constructor(props) {
    super(props)
    this.defaultEditorFields = {
      serverId: "",
      serverAddress: "",
      user: "",
      pass: ""
    }
    this.state = {
      editorOpen: false,
      editorFields: this.defaultEditorFields
    }
  }

  updateField = (field, value) => {
    var update = {}
    this.state.editorFields[field] = value
    this.setState(this.state)
  }

  editServer = (serverId, serverInfo) => {
    this.setState({
      editorOpen: true,
      editing: serverId || "",
      editorFields: serverInfo ? {
        serverId: serverId,
        serverAddress: serverInfo.address,
        user: serverInfo.login.user,
        pass: serverInfo.login.pass
      } : this.defaultEditorFields
    })
  }

  removeServer = (serverId) =>  {
    console.log(serverId)
    console.log(this.props.settings.get('server'))
    if (serverId != this.props.settings.get('server')) {
      this.props.serverActions.remove(serverId)
    } else {
      window.alert("Cannot deleted the active server")
    }
  }

  submitServer = () => {
    var edits = this.state.editorFields
    console.log(this.state)
    if (edits.serverId && edits.serverAddress) {
      this.props.serverActions.remove(this.state.editing)
      this.props.serverActions.add(
        edits.serverId,
        edits.serverAddress,
        edits.user,
        edits.pass
      )
    } else {
      window.alert('Could not create Server entry, invalid name or address.')
    }
  }

  closeEditor = () => {
    this.setState({ editorOpen: false })
  }

  render() {
    const theme = getMuiTheme(this.props.theme)
    return (
      <MuiThemeProvider muiTheme={theme}>
        <div>
          <Toolbar>
           <ToolbarGroup firstChild={true}>
             <RaisedButton
               label="Add New Server"
               primary={true}
               onClick={this.editServer}
                />
           </ToolbarGroup>
         </Toolbar>
          <ServerCards
            servers={this.props.servers}
            defaultServer={this.props.settings.get('server')}
            edit={this.editServer}
            remove={this.props.serverActions.remove}
            setDefault={this.props.settingActions.setServer}
          />
          {this.state.editorOpen ?
          <ServerEditorDialog
            open={this.state.editorOpen}
            fields={this.state.editorFields}
            updateField={this.updateField}
            submit={this.submitServer}
            close={this.closeEditor}
          /> : null}
        </div>
      </MuiThemeProvider>
    )
  }

}
