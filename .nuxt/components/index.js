export const Footer = () => import('../..\\components\\General\\Footer.vue' /* webpackChunkName: "components/footer" */).then(c => wrapFunctional(c.default || c))
export const Header = () => import('../..\\components\\General\\Header.vue' /* webpackChunkName: "components/header" */).then(c => wrapFunctional(c.default || c))
export const ListCreate = () => import('../..\\components\\List\\ListCreate.vue' /* webpackChunkName: "components/list-create" */).then(c => wrapFunctional(c.default || c))
export const ListElement = () => import('../..\\components\\List\\ListElement.vue' /* webpackChunkName: "components/list-element" */).then(c => wrapFunctional(c.default || c))
export const TaskCreate = () => import('../..\\components\\Task\\TaskCreate.vue' /* webpackChunkName: "components/task-create" */).then(c => wrapFunctional(c.default || c))
export const TaskElement = () => import('../..\\components\\Task\\TaskElement.vue' /* webpackChunkName: "components/task-element" */).then(c => wrapFunctional(c.default || c))

// nuxt/nuxt.js#8607
function wrapFunctional(options) {
  if (!options || !options.functional) {
    return options
  }

  const propKeys = Array.isArray(options.props) ? options.props : Object.keys(options.props || {})

  return {
    render(h) {
      const attrs = {}
      const props = {}

      for (const key in this.$attrs) {
        if (propKeys.includes(key)) {
          props[key] = this.$attrs[key]
        } else {
          attrs[key] = this.$attrs[key]
        }
      }

      return h(options, {
        on: this.$listeners,
        attrs,
        props,
        scopedSlots: this.$scopedSlots,
      }, this.$slots.default)
    }
  }
}
