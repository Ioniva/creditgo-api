const invalidPathHandler = (req, res, next) => {
  res.redirect('/404');
};

export default invalidPathHandler;
