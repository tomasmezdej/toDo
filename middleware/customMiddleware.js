export default function ({ app, route }) {
  // Add the userAgent property to the context
  if (!app.store.state.userName && route.path !== '/login') {
    console.log('log in pls :(')
    app.router.push('/login')
  }
}