export const statusCode = (res, status) => {
    res.writeHead(status, { 'Content-Type': 'text/plain' });
    // status code is a dynamic number
}