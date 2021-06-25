module.exports = {
  plugins: {
    autoprefixer: {},
		"postcss-px-to-viewport":{
			viewportWidth:375,
			viewportHeight:667,
			unitPrecision:5,
			viewportUnit:'vw',
			selectorBlackList:['ignore','tar-bar','tar-bar-item'],
			mixPixelValue:1,
			mediaQuery:false
		}
  }
}