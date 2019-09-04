(function (factory) {
	if (typeof module === 'object' && module.exports) {
		module.exports = factory;
	} else if (typeof define === 'function' && define.amd) {
		define(function () {
			return factory;
		});
	} else {
		factory(Highcharts);
	}
}(function (Highcharts) {

(function(H) {

  //internal functions
  function stopEvent(e) {
    if (e) {
      if (e.preventDefault) {
        e.preventDefault();
      }
      if (e.stopPropagation) {
        e.stopPropagation();
      }
      e.cancelBubble = true;
    }
  }

  //the wrap
  H.wrap(H.Chart.prototype, 'render', function(proceed) {
    var chart = this,
      mapNavigation = chart.options.mapNavigation;

    proceed.call(chart);

    // Add the mousewheel event
    H.addEvent(chart.container, 'wheel', function(event) {

      var delta, extr, step, newMin, newMax, axis = chart.xAxis[0];
      var dataMax = chart.xAxis[0].dataMax,
        dataMin = chart.xAxis[0].dataMin,
        newExtrMin,
        newExtrMax;

      e = chart.pointer.normalize(event);
      delta = e.detail || -(e.deltaY / 120);
      delta = delta < 0 ? 1 : -1;

      if (chart.isInsidePlot(e.chartX - chart.plotLeft, e.chartY - chart.plotTop)) {
        extr = axis.getExtremes();    
        step = (extr.max - extr.min) / 6 * delta;
        if ((extr.min + step) < dataMin) {
          newExtrMin = dataMin;
          newExtrMax = extr.max;
        } else if ((extr.max + step) > dataMax) {
          newExtrMin = extr.min;
          newExtrMax = dataMax;
        } else {
          newExtrMin = extr.min + step;
          newExtrMax = extr.max + step;
        }

        axis.setExtremes(newExtrMin, newExtrMax, true, false);

      }

      stopEvent(event); // Issue #5011, returning false from non-jQuery event does not prevent default
      return false;
    });
  });
}(Highcharts));


	return (function () {

	}());
}));