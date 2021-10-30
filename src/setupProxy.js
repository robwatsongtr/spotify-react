const { createProxyMiddleware } = require('http-proxy-middleware');

// Proxy API setup. We need to tell the React app where to find the server when
// doing API calls.

// This way, all petitions with the /auth/** pattern will be redirected to the backend.

module.exports = (app) => {

    app.use('/auth/**', 
        createProxyMiddleware({ 
            target: 'http://localhost:5000'
        })
    );
    
};