import PropTypes from 'prop-types';
import React from 'react';
import classes from './ProgressBar.scss'
import _ from 'lodash'

const TYPES = ['capsule','rectangular'];

class ProgressBar extends React.Component {

  constructor(props){
    super(props);
    this.state={
      partsWidth: 100,  //percent width of each part
    }
  }

  componentWillMount() {
    const partsWidth = 100/(this.props.partitions+1);
     this.setState({partsWidth: partsWidth});
  }

  getColorToDisplay = (colorsPallete, value) => {
    let colorObj = {};
    for(let j=0;j<colorsPallete.length;j++){
      if(colorsPallete[j].threshold >= value){
        colorObj.color1 = colorsPallete[j].color1;
        colorObj.color2 = colorsPallete[j].color2;
        break;
      }
    }
    return colorObj
  }

  sortColorArray = () => {
    let ascSortedList = _.sortBy(this.props.colorsPallete, 'threshold');
    return ascSortedList;
  }

  render () {
    const sortedColorsPallete = this.sortColorArray();
    const partitions = this.props.partitions;
    const value = this.props.value;
    let partsArray = [];
    const colorsToDisplay = this.getColorToDisplay(sortedColorsPallete, value)
    let gradientStyle = {background: `linear-gradient(to right, ${colorsToDisplay.color1} 2%, ${colorsToDisplay.color2})`, width: `${value}%`}

    for(let i=0; i<partitions; i++){
      if(i<partitions){partsArray.push(<div key={i} className={classes.lineCuts} style={{left: `${this.state.partsWidth*(i+1)}%`}}></div>)}
      else{partsArray.push(<div key={i} className={classes.lastLineCut} style={{left: `${this.state.partsWidth*(i+1)}%`}}></div>)}
    }
    return (
      <div ref={'container'} className={this.props.type == "capsule" ? classes.capsuleContainer : classes.rectangularContainer}>
        <div className={this.props.type == "capsule" ? classes.capsuleColorFill : classes.rectangularColorFill} style={gradientStyle}></div>
        {partsArray}
      </div>
    )
  }
}

ProgressBar.propTypes = {
    value: PropTypes.number,
    partitions: PropTypes.number,
    type:PropTypes.oneOf(TYPES),
    colorsPallete: PropTypes.array,
}

ProgressBar.defaultProps = {
    type:'capsule',
    partitions:1,
    value:0,
    colorsPallete:[{color1:'#10ACBD', color2: '#10ACBD', threshold: 100}]
}

export default ProgressBar
