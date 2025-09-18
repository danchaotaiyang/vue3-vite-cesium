import * as Cesium from 'cesium';


//≡≡≡  属性  ≡≡≡//
export const graphicFill = '#dbda6f';
export const graphicWidth = 10;
export const graphicStrokeWidth = 2;
export const graphicStroke = `rgba(0, 0, 0, 1)`;
export const labelShowBackground = false;
export const labelBackgroundPadding = [ 0, 0 ];
export const labelBackgroundColor = `rgba(0, 0, 0, .5)`;
export const labelStrokeWidth = 3;
export const labelStroke = `rgba(0, 0, 0, 1)`;
export const labelFill = `rgba(255, 255, 255, 1)`;
export const labelFontWeight = 500;
export const labelFontSize = 12;
export const labelFontFamily = 'Microsoft YaHei';
export const labelFont = `${ labelFontWeight } ${ labelFontSize }px ${ labelFontFamily }`;
export const modifyAlpha = .2;
export const style = Cesium.LabelStyle.FILL_AND_OUTLINE;
export const heightReference = Cesium.HeightReference.CLAMP_TO_GROUND;
export const verticalOrigin = Cesium.VerticalOrigin.TOP;
export const pointPixelSize = 6;
