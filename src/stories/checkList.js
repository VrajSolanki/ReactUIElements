import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import CheckList from '../components/CheckListContainer';
import update from 'immutability-helper'

const styles = {
    containerStyleCol:{
        flexDirection:'column',
        height:'100%',
        flexWrap: 'nowrap',
        flexShrink: 0,
    },
    containerStyleRow:{
        flexDirection:'row',
        height:'100%',
        // flexWrap: 'nowrap',
        flexBasis: "40%",
        flexShrink: 0,
    }
};

const completeList = [
    {label:"Item 1", value: "1"},
    {label:"Item 2", value: "2"},
    {label:"Item 3", value: "3"},
    {label:"Item 4", value: "4"},
    {label:"Item 5", value: "5"},
]

let selectedList = ["2", "1"]

const disabledList = ["3"]

function onAdd(params) {
    let item = params;
    if(item.value && !_.includes(selectedList, item.opt)){
        selectedList = update(selectedList, {$push: [item.opt]});   
    }
    else if(!item.value && _.includes(selectedList, item.opt)){
        selectedList = update(selectedList, {$splice: [[item.index ,item.opt]]});   
    }
    console.log("Selected List", selectedList)
}

// const 

storiesOf('CheckList', module)
  .add('provides the checklist', () => (
    <CheckList checkBoxStyles={{width: '24px', height: '24px'}} containerStyle={styles.containerStyleCol} completeList={completeList} selectedList={selectedList}
                toggleCheckbox={onAdd} disabledList = {disabledList} disabled ={false}/>
  ))
  .add('provides the checklist with row style', () => (
    <CheckList checkBoxStyles={{width: '24px', height: '24px'}} containerStyle={styles.containerStyleRow} completeList={completeList} selectedList={selectedList}
            toggleCheckbox={onAdd} disabledList = {disabledList} disabled ={false}/>          
  ))
  .add('provides the checklist with disabled item', () => (
    <CheckList checkBoxStyles={{width: '24px', height: '24px'}} containerStyle={styles.containerStyleCol} completeList={completeList} selectedList={selectedList}
                toggleCheckbox={onAdd} disabledList = {[]} disabled ={false}/>  
  ));