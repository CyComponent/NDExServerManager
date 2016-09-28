import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';

export default class ServerCards extends React.Component {

  getStyle(serverId) {
    if (serverId == this.props.defaultServer) {
      return { backgroundColor: "grey" }
    } else {
      return {}
    }
  }

  render() {
    return (
      <div>
        {this.props.servers.map((serverInfo, serverId) =>
          <Card style={this.getStyle(serverId)}>
            <CardHeader
              title={serverId}
              subtitle={serverInfo.login.name || <i>Browsing Anonymously</i>}
            />
            <CardText>{"Address: " + serverInfo.address}</CardText>
            <CardActions>
              <RaisedButton
                label="Edit"
                onClick={this.props.edit.bind(this, serverId, serverInfo)}
              />
              <RaisedButton
               label="Delete"
               onClick={this.props.remove.bind(this, serverId)}
              />
              <RaisedButton
               label="Activate"
               onClick={this.props.setDefault.bind(this, serverId)}
              />
            </CardActions>
          </Card>
        )
      }
      </div>
    )
  }

}
