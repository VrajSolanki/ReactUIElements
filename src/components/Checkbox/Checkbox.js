import PropTypes from 'prop-types';
import React from 'react';
import classes from './Checkbox.scss';
import CheckboxOn from '../../svgImages/CheckboxOn';
import CheckboxOff from '../../svgImages/CheckboxOff';
import classNames from 'classnames';

class Checkbox extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
      let isChecked = this.props.isChecked;
      let label = this.props.label;
      let isDisabled = this.props.isDisabled;
      let checkboxContainer = classNames({[classes.checkboxContainer]:true},{[classes.checkboxContainerActive]:isChecked})
      let checkboxContainerDisable = classNames({[classes.checkboxContainerDisable]:true},{[classes.checkboxContainerDisableActive]:isChecked})
      return (
          <div className={isDisabled?checkboxContainerDisable:checkboxContainer}>
            <div className={isDisabled?classes.disableCheckbox:classes.checkbox}>
              {isChecked
              ? <div style={{fill:this.props.fill,opacity:isDisabled?0.3:1, height: this.props.style.height, width: this.props.style.width}}> <CheckboxOn /></div>
              : <div style={{fill:this.props.fill,opacity:isDisabled?0.3:1, height: this.props.style.height, width: this.props.style.width}}><CheckboxOff/> </div>}
            </div>
            <div className={classes.checkboxLabel}>{label}</div>
          </div>
      )
  }
}

export default Checkbox

Checkbox.defaultProps = {
  fill: 'black',
  style: {
    height: '16px',
     width: '16px'
    }
};
