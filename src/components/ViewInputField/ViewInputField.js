import PropTypes from 'prop-types';
import React from 'react';
import classes from './ViewInputField.scss';
import classNames from 'classnames';

class ViewInputField extends React.Component{
  constructor(props){
    super(props);
  }

  render() {
      return(
      <div className={classes.container}>
        <label className={classes.inputLabel}>{this.props.label}</label>
        <div className={classes.inputText} style={this.props.textAreaStyles}>{this.props.value}</div>
      </div>
    )
  }
}

export default ViewInputField;

ViewInputField.propTypes = {
  
  value:PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
  ]),
  label:PropTypes.string,
  textAreaStyles:PropTypes.object
};

ViewInputField.defaultProps = {
  textAreaStyles:{},
};
