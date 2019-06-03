import React, { Fragment } from "react";
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";

class Notification extends React.Component {
    constructor(props) {
        super(props);
      this.notificationDOMRef = React.createRef();

      // console.log(this.props);

    if(this.props.type === true)
        this.addNotification('success','Success',this.props.message);
    else 
        this.addNotification('danger','Error',this.props.message);


      
    }
  
    addNotification(type, title, message) {
      if(this.props.elementRef.current) {
        this.props.elementRef.current.addNotification({
            title: title,
            message: message,
            type: type,
            insert: "top",
            container: "bottom-right",
            animationIn: ["animated", "fadeIn"],
            animationOut: ["animated", "fadeOut"],
            dismiss: { duration: 2000 },
            dismissable: { click: true }
        });
      }
    }
  
    render() {
      return (
        <Fragment>
          <ReactNotification ref="notificationRef" />
        </Fragment>
      );
    }
  }

  export default Notification;