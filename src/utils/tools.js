class Tools {
  static arrToObj(arr, key = 'id') {
    let obj = Object.create(null);
    arr.forEach((item) => {
      obj[item[key]] = item;
    });
    return obj;
  }

  static _throttle(fn, interval) {
    var last;
    var timer;
    var intervals = interval || 200;
    return function () {
      var th = this;
      var args = arguments;
      var now = +new Date();
      if (last && now - last < intervals) {
        clearTimeout(timer);
        timer = setTimeout(function () {
          last = now;
          fn.apply(th, args);
        }, intervals);
      } else {
        last = now;
        fn.apply(th, args);
      }
    }
  }
}

export {
  Tools
}
