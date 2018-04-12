import PropTypes from 'prop-types';
import React from 'react';
import classes from './InputTextField.scss';
import classNames from 'classnames';
import ViewInputField from '../ViewInputField';

class InputTextField extends React.Component {

  constructor(props){
    super(props);
    this.state = {error:""}
  }
  editTextField = (e) => {
    let param = {};
    param[e.target.name]=e.target.value;
    this.props.editTextField(param);
    if(this.state.error!=""){
      //this.props.errorResolve();
      this.setState({error:""});
    }

  };

  removeAsterisk = (data) => {
    let index = data.indexOf("*");
    if(index>=0){
      data = data.replace("*","");
    }
    return data;
  }

  handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      let param = {};
      param[e.target.name]=e.target.value;
      if(this.props.onEnter){
        this.props.onEnter(param);
      }
    }
  };

  onBlur = (e) => {
    if(this.props.onBlur){
      let params = {};
      params[e.target.name] = e.target.value;
      this.props.onBlur(params)
    }
  }
  isValid = () => {
    if(this.props.value==null || this.props.value.trim()==""){
      this.setState({error:this.props.error});
      return 1;
    }
    else if(this.props.customValidation){
      let customError = this.props.customValidation(this.props.value);
      if(customError!=""){
          this.setState({error:customError});
          return 1
      }
      else{
          return 0
      }
    }
    else{
      return 0;
    }
  };
  render() {
    if(this.props.mode!='view'){
      let inputText = classNames({[classes.inputText]:true},{[classes.disabledInputBox]:this.props.disabled},{[classes.errorBorder]:this.state.error!=""})
      return(
        <div className={classes.container}>
          { this.props.labelComponent ? this.props.labelComponent :
            <label className={classes.inputLabel}>{this.props.label}</label>
          }
          <input onKeyPress={(e) => this.handleKeyPress(e)} disabled={this.props.disabled} style={this.props.inputStyle} className={inputText} type="text" value={this.props.value} onChange={(e)=>this.editTextField(e)} name={this.props.name} placeholder={this.props.placeholder} onBlur={(e)=>this.onBlur(e)} />
          {this.props.disabled || this.state.error=='' ? null : <span className={classes.error} style={this.props.errorStyle}>{this.state.error}</span>}
        </div>
      )
    }else{
      let label = this.removeAsterisk(this.props.label);
      let value = this.props.value;
      if(value==''){
        value = `No ${this.props.label} Text`;
      }
      return(
        <ViewInputField label={label} value={value}/>
      )
    }
  }


}

InputTextField.defaultProps = {
  mode:'edit',
  inputStyle:{},
  errorStyle:{},
  disabled:false,
};

InputTextField.propTypes = {
  disabled: PropTypes.bool,
  value:PropTypes.string,
  editTextField:PropTypes.func,
  onBlur:PropTypes.func,
  name: PropTypes.string,
  placeholder:PropTypes.string,
  label:PropTypes.string,
  labelComponent:PropTypes.element,
  error:PropTypes.string,
  mode:PropTypes.string,
  inputStyle:PropTypes.object,
  errorStyle:PropTypes.object,
  customValidation:PropTypes.func,
  onEnter:PropTypes.func
  };

export default InputTextField;
