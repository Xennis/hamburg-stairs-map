module.exports = {
    publicPath: '/hamburg-stairs-map/',
    chainWebpack: config => {
        config
            .plugin('html')
            .tap(args => {
                args[0].title = 'Hamburger Treppen Karten / Stairs Map';
                return args;
            })
    }
}