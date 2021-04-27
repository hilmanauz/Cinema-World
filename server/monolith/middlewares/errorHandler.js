const errorHandler = (err, req, res, next) => {
  if (err.name === 'test') {
    console.log('ini errornya');
  } else {
    console.log('ini error else');
  }
}

module.exports = errorHandler
