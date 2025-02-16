module.exports = (err, req, res, next) => {
    let error = { ...err };

    if (err?.name === 'CastError') {
        error.StatusCode = 404;
        error.message = `Không tìm thấy tài nguyên`;
    }

    if (err.StatusCode === 400) {
        error.StatusCode = 400;
        error.message = err.message;
    }

    if (err.StatusCode === 401) {
        error.StatusCode = 401;
        error.message = err.message;
    }

    if (err.StatusCode === 403) {
        error.StatusCode = 403;
        error.message = err.message;
    }

    if (err.StatusCode === 404) {
        error.StatusCode = 404;
        error.message = err.message;
    }

    if (err?.code === 11000) {
        error.StatusCode = 400;
        error.message = 'Tài khoản đã tồn tại';
    }

    const StatusCode = error.StatusCode || 500;
    const message = error.message || err.message || 'Lỗi Server. Hãy thử lại sau.';

    return res.status(StatusCode).json({
        StatusCode,
        message,
    });
};