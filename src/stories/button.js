import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import UIButton from '../components/UIButton';

const styles ={
    buttonContainer: {
        display: "flex",
        flexDirection: "row",
        width: "100%",
        height: "64px",
        justifyContent: "space-between"
    },
}

storiesOf('Button', module)
  .add('Button Types', () => (
    <div style={styles.buttonContainer}>
        <UIButton style={styles.buttonStyle} color='grey' size='lg' type={'hollow'} onClick={action('clicked')}>Hollow</UIButton>
        <UIButton color='grey' size='lg' type={"filled"} onClick={action('clicked')}>Filled</UIButton>
        <UIButton color='grey' size='lg' isDisabled={true} onClick={action('clicked')}>Disabled</UIButton>
    </div>  
    
  ));
