function ChartUpdateAnimationStrategyEmpty () {}
ChartUpdateAnimationStrategyEmpty.prototype.hook = function (path) {
  path.appendChild(
    createSVGNode('animate', {
      attributeName: 'd',
      dur: '0.3s',
      fill: 'freeze',
    })
  );
};
ChartUpdateAnimationStrategyEmpty.prototype.trigger = function (path, oldLine, newLine) {
  const shouldRenderOld = oldLine.shouldRender;
  const shouldRenderNew = newLine.shouldRender;

  if (shouldRenderNew) {
    this.raf(function () {
      if (shouldRenderOld) {
          const animate = path.querySelector('animate');
          animate.setAttributeNS(null, 'from', 'M' + oldLine.points);
          animate.setAttributeNS(null, 'to', 'M' + newLine.points);
          animate.beginElement();
      }

      path.setAttributeNS(null, 'd', 'M' + newLine.points);
    }.bind(this));
  }
};
ChartUpdateAnimationStrategyEmpty.prototype.raf = typeof requestAnimationFrame === 'function'
? requestAnimationFrame.bind(window)
: function (cb) {
  cb();
};

function ChartUpdateAnimationStrategySmooth () {}
ChartUpdateAnimationStrategySmooth.prototype.hook = function (path) {
  path.appendChild(
    createSVGNode('animate', {
      attributeName: 'd',
      dur: '0.3s',
      fill: 'freeze',
    })
  );
};
ChartUpdateAnimationStrategySmooth.prototype.trigger = function (path, oldLine, newLine) {
  this.raf(function () {
    const animate = path.querySelector('animate');
    animate.setAttributeNS(null, 'from', 'M' + oldLine.points);
    animate.setAttributeNS(null, 'to', 'M' + newLine.points);
    animate.beginElement();

    path.setAttributeNS(null, 'd', 'M' + newLine.points);
  }.bind(this));
};
ChartUpdateAnimationStrategySmooth.prototype.raf = typeof requestAnimationFrame === 'function'
? requestAnimationFrame.bind(window)
: function (cb) {
  cb();
};