exports.get404page = (req, res, next) => {
    res.status(404).render('404', {
        path: '/404',
        docTitle: 'Page not found'
    });
};