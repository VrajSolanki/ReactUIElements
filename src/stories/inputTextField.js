import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import InputTextField from '../components/InputTextField';
import { withConsole } from '@storybook/addon-console';

const styles ={
    container: {
        padding: "32px",
        display: "flex",
        flexDirection: "row",
        width: "50%",
        height: "64px",
        justifyContent: "space-between"
    },
}

function customAnswerValidation(value){
    if(value.length>10){
      return 'Maximum answer length should be 10';
    }
    else if(checkWordLength(value)>1){
      return 'Maximum word length should be 1';
    }
    else{
      return '';
    }
  };

function updateAnswer(params){
    console.log("Response of InputTextField Component", params)
}

storiesOf('InputTextField', module)
    .addDecorator((storyFn, context) => withConsole()(storyFn)(context))
  .add('InputTextField edit Mode', () => (
    <div style={styles.container}>
        <InputTextField 
            label="Sample Text Field *" 
            name="sample" 
            value={"Hello world"} 
            editTextField={updateAnswer} 
            placeholder="Enter text"
            mode={'edit'}
            customValidation={this.customAnswerValidation} />
    </div>  
  ));
