import PropTypes from 'prop-types';
import React from 'react';
import classes from './CheckListContainer.scss'
import classNames from 'classnames';
import Checkbox from '../Checkbox';
import ViewInputField from '../ViewInputField';

class CheckList extends React.Component {

    constructor(props){
        super(props);
        this.state = {error:""}
    }

    generateStringFromArray = (array) => {
        let string = "";
        array.map((element,key) => {
            string = string+element;
            if(array.length-1!=key){
                if(array.length-2==key){
                    string = string +" and ";
                }
                else{
                    string=string+", ";
                }
            }
        });
        return string;
    }

    isAllSelected = () => {
        return this.props.completeList.length == this.props.selectedList.length;
    };

    isSelected = (opt) => {
        return !(this.props.selectedList.indexOf(opt)==-1);
    };

    toggleAllCheckbox = (e,isChecked) => {
        e.stopPropagation();
        let value =!isChecked;
        this.props.toggleAllCheckbox(value);
        if(this.state.error!=""){
            //this.props.errorResolve();
            this.setState({error:""});
        }
    };

    isDisabled = (val) =>{
         return this.props.disabledList.indexOf(val)>=0;
    }

    toggleCheckbox = (e,opt,isChecked) => {
        e.stopPropagation();
        let value =!isChecked;
        let param={value,index:this.props.selectedList.indexOf(opt),opt};
        this.props.toggleCheckbox(param);
        if(this.state.error!=""){
            //this.props.errorResolve();
            this.setState({error:""});
        }
    };

    isValid = () => {
        if(this.props.selectedList.length==0){
            this.setState({error:this.props.error});
            return 1;
        }
        else{
            return 0;
        }
    };

    getSelectedLabel = () => {
        let selectedLabel = [];
        const {completeList,selectedList} = this.props ;
        selectedList.map((value,index) => {
            selectedLabel.push((_.find(completeList,{'value':value})).label);
        });
        return selectedLabel
    };

    render(){
        if(this.props.mode!='view'){
            let checkList = this.props.completeList.map((opt, index) => {
                let isChecked = this.isSelected(opt.value);
                let disabled = this.isDisabled(opt.value) || this.props.disabled;
                let fillColor = _.get(this.props, `fillColorList`, false) ? this.props.fillColorList[opt.value] : 'black'
                return (
                    <div key={index} className={classes.label} style={this.props.labelStyle}
                        onClick={disabled ? null : (e) => this.toggleCheckbox(e,opt.value,isChecked)}>
                        <Checkbox style={this.props.checkBoxStyles} fill={fillColor} label={opt.label} isChecked={isChecked} isDisabled={disabled}/>
                    </div>
                )
            });

            let isAllChecked = this.isAllSelected();
            let isAllDisable = this.props.disabled || this.props.disabledList.length>0;
            return (
                <div className={classes.container}>
                    <div className={classes.checkListContainer} style={this.props.containerStyle}>
                        <div className={classes.label} style={this.props.labelStyle}
                            onClick={isAllDisable ? null : (e) => this.toggleAllCheckbox(e,isAllChecked)}>
                            { this.props.showAllOption ? <Checkbox style={this.props.checkBoxStyles} label={'All'} isChecked={isAllChecked} isDisabled={isAllDisable}/> : null }
                        </div>
                        {checkList}
                    </div>
                    {this.props.disabled || this.state.error=='' ? null : <span className={classes.error} style={this.props.errorStyle}>{this.state.error}</span>}
                </div>
            )
        }
        else{
            let selectedLabel = this.getSelectedLabel();
            let value="No Selected"
            if(selectedLabel.length>0){
                value = this.generateStringFromArray(selectedLabel);
            }
             return (
                <ViewInputField value={value}/>
             )   
        }
}
}

export default CheckList

CheckList.defaultProps = {
    disabled:false,
    labelStyle:{},
    containerStyle:{},
    errorStyle:{},
    mode:'edit',
    disabledList:[],
    showAllOption: true,
};

CheckList.propTypes = {
    disabled: PropTypes.bool,
    toggleAllCheckbox:PropTypes.func,
    toggleCheckbox:PropTypes.func,
    error:PropTypes.string,
    mode:PropTypes.string,
    labelStyle:PropTypes.object,
    containerStyle:PropTypes.object,
    errorStyle:PropTypes.object,
    completeList:PropTypes.array,
    selectedList:PropTypes.array,
    disabledList:PropTypes.array,
    showAllOption: PropTypes.bool,
};
