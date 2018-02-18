function make(args) {
  var file = '';
  if (args != null)
  {
      file = args;
  }
  if (process.env.ENV === 'production') {
    return '/Veracity/' + file;
  } else {
    return 'http://localhost:8080/' + file;
  }
}
exports.make = make;
