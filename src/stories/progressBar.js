import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import ProgressBar from '../components/ProgressBar';

storiesOf('ProgressBar', module)
  .add('indicates Percentage based color for provided color pallete', () => (
    <div>
      <div style={{height: "40px"}}><ProgressBar partitions={5} value={56}/></div>
      <div style={{height: "40px", width:"50%"}}><ProgressBar partitions={5} value={6} type={"rectangular"}/></div>
      <div style={{height: "40px"}}><ProgressBar partitions={3} value={78} colorsPallete={[{color1:'#ff2d55',color2:'#FFD200', color3:'#10ACBD', threshold: 100}]}/></div>
    </div>
  ));