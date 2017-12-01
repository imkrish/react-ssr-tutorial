import 'babel-polyfill'
import express from 'express'
import proxy from 'express-http-proxy'
import { matchRoutes } from 'react-router-config'
import Routes from './client/Routes'
import renderer from './helpers/renderer'
import createStore from './helpers/createStore'

const app = express()
app.use('/api', proxy('http://react-ssr-api.herokuapp.com', {
    proxyReqOptDecorator(opts) {
        opts.headers['x-forwarded-host'] = 'localhost:3000'
        return opts
    }
}))
app.use(express.static('public'))

app.get('*', (req, res) => {
    const store = createStore(req)

    // Some logic to initialize
    // and load data into the store

    const promises = matchRoutes(Routes, req.path)
        .map(({ route }) => {
            return route.loadData ? route.loadData(store) : null
        })
        .filter(promise => promise)
        .map(promise => {
            return new Promise((res, reject) => {
                promise.then(res).catch(res)
            })
        })

    const render = () => {
        const context = { }
        const content = renderer(req, store, context) // mutate context

        // Requite Auth (</Redirect />)
        if (context.url === '/') {
            return res.redirect(302, '/')
        }
        
        if (context.notFound) {
            res.status(404)
        }
        res.send(content)
    }
    
    Promise.all(promises)
        .then(render)
        .catch(render)
})

app.listen(3000, () => {
    console.log('Listening on port: 3000')
})