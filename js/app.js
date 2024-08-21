document.addEventListener('DOMContentLoaded', () => {
  const $cursor = document.querySelector('.cursor__circle');
  const $hover = document.querySelectorAll('a');

  document.body.addEventListener('mousemove', onMouseMove);
  document.body.addEventListener('scroll', onScroll);

  for (let i = 0; i < $hover.length; i++) {
    $hover[i].addEventListener('mouseenter', onMouseHover);
    $hover[i].addEventListener('mouseleave', onMouseHoverOut);
  }

  function onMouseMove(e) {
    const scrollX = window.scrollX || document.documentElement.scrollLeft;
    const scrollY = window.scrollY || document.documentElement.scrollTop;

    gsap.to($cursor, {
      duration: 0.4,
      x: e.pageX - 16 - scrollX,
      y: e.pageY - 16 - scrollY
    });
  }

  function onScroll() {
    // When scrolling, we need to update the cursor's position to ensure it remains visible.
    const mouseEvent = new MouseEvent('mousemove', {
      clientX: window.innerWidth / 2,
      clientY: window.innerHeight / 2
    });
    document.body.dispatchEvent(mouseEvent);
  }

  function onMouseHover() {
    gsap.to($cursor, { scale: 1.5 });
  }

  function onMouseHoverOut() {
    gsap.to($cursor, { scale: 1 });
  }
});

jQuery(function () {
  var markers = $(".marker"); // marker selector
  var widthGain = 1; // 1 default
  var heightGain = 1; // 1 default

  // repeat for all markers
  markers.each(function () {
    // Define variables
    var marker = $(this),
      width = marker.width(),
      height = 2 * marker.height(),
      ns = "http://www.w3.org/2000/svg";

    var svg = document.createElementNS(ns, "svg");

    $(svg)
      .css({
        width: width,
        height: height,
        transform:
          "scale(" + (2 * widthGain * width) / height + "," + heightGain + ")"
      })
      .attr({
        width: width,
        height: height,
        viewBox: "-1 -1 2 2"
      });

    marker[0].appendChild(svg);

    var path = document.createElementNS(ns, "path");

    $(path)
      .attr({
        pathLength: 100,
        "vector-effect": "non-scaling-stroke"
      })
    svg.appendChild(path);

    setCircle(false);
    setCircle(false);

    marker.mouseover(function () {
      setCircle(true);
    });

    function setCircle(show_element) {
      if (show_element) {
        $(path).css("visibility", "visible");
      } else {
        $(path).css("visibility", "hidden");
      }

      var pathLength = 1000 * path.getTotalLength();

      $(path)
        .attr({
          d: circlePath(-0.15,0.05,150,190,0.05,0.3)
        })
        .attr({
          "stroke-dasharray": pathLength,
          "stroke-dashoffset": pathLength
        });
    }

    function circlePath(dr_min, dr_max, θ0_min, θ0_max, dθ_min, dθ_max) {
      var c = 0.551915024494,
        β = Math.atan(c),
        d = Math.sqrt(c * c + 1 * 1),
        r = 0.9,
        θ = ((θ0_min + Math.random() * (θ0_max - θ0_min)) * Math.PI) / 180,
        path = "M";

      path += [r * Math.sin(θ), r * Math.cos(θ)];
      path += " C" + [d * r * Math.sin(θ + β), d * r * Math.cos(θ + β)];

      for (var i = 0; i < 4; i++) {
        θ += (Math.PI / 2) * (1 + dθ_min + Math.random() * (dθ_max - dθ_min));
        r *= 1 + dr_min + Math.random() * (dr_max - dr_min);
        path +=
          " " +
          (i ? "S" : "") +
          [d * r * Math.sin(θ - β), d * r * Math.cos(θ - β)];
        path += " " + [r * Math.sin(θ), r * Math.cos(θ)];
      }
      return path;
    }
  });
});
