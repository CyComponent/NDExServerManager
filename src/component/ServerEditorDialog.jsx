
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import TextField from 'material-ui/TextField'

export default class ServerEditorDialog extends React.Component {

  handleSubmit = () => {
    this.props.submit()
    this.props.close()
  };

  update(field, event)  {
    this.props.updateField(field, event.target.value)
  }

  render() {
    const {
      open,
      close,
      fields,
      updateField
    } = this.props
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={close}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.handleSubmit}
      />,
    ]
    return (
      <div>
          <Dialog
            title="NDEx Server Editor"
            actions={actions}
            modal={false}
            open={open}
            onRequestClose={close}
          >
            <TextField
              hintText="Server Name"
              floatingLabelText="Server Name"
              fullWidth={true}
              value={fields.serverId}
              onChange={this.update.bind(this, 'serverId')}
            />
            <TextField
              hintText="Server Address"
              floatingLabelText="Server Address"
              fullWidth={true}
              value={fields.serverAddress}
              onChange={this.update.bind(this, 'serverAddress')}
            />
            <TextField
              hintText="Username Field"
              floatingLabelText="Username"
              fullWidth={true}
              value={fields.user || "Anonymous"}
              onChange={this.update.bind(this, 'user')}
            />
              <TextField
              hintText="Password Field"
              floatingLabelText="Password"
              type="password"
              fullWidth={true}
              value={fields.pass}
              onChange={this.update.bind(this, 'pass')}
            />
        </Dialog>
      </div>
    )
  }
}
