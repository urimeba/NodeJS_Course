exports.get404page = (req, res, next) => {
    res.status(404).render('404', {
        path: '/404',
        docTitle: 'Page not found',
        isAuthenticated: req.session.isLoggedIn
    });
};

exports.get500page = (req, res, next) => {
    res.status(500).render('500', {
        path: '/500',
        docTitle: 'Error',
        isAuthenticated: req.session.isLoggedIn
    });
}; 