import React, { Component } from 'react'

class Logo extends Component {
    home(){
      window.location="/";
    }

    render() {
      let className = "logo ";
      if (this.props.className) {
          className += this.props.className;
      }
      return (
          <div>
            {this.props.arena ? <div className={className}>Quizio</div>
                              : <div className={className} onClick={this.home}>Quizio</div>
            }
          </div>
        );
    }
}

export default Logo
